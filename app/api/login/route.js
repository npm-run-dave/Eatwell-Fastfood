import clientPromise from "@/lib/dbconnect/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(request) {
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    let client;
    try {
      // Connect to MongoDB with timeout
      client = await Promise.race([
        clientPromise,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Database connection timeout")),
            10000
          )
        ),
      ]);
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    const db = client.db("seafooddb");
    const users = db.collection("users");

    // Find user with case-insensitive email
    const user = await users.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      // Use the same error message for security (don't reveal if email exists)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const userId = user._id.toString();
    const token = jwt.sign(
      {
        id: userId,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Create response
    // app/api/login/route.js
    // ... (existing code)

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        // Add any other user fields you want to display
      },
      token: token, // Also return token in response for localStorage
    });

    // Set HTTP-only cookie with the token
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);

    // Specific error handling
    if (err.message === "Database connection timeout") {
      return NextResponse.json(
        { error: "Connection timeout. Please try again." },
        { status: 408 }
      );
    }

    if (
      err.name === "MongoNetworkError" ||
      err.name === "MongoServerSelectionError"
    ) {
      return NextResponse.json(
        { error: "Database connection error. Please try again later." },
        { status: 503 }
      );
    }

    // Generic error response for security
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
