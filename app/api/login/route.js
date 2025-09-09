import clientPromise from "@/lib/dbconnect/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("seafooddb");
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );

    const userId = user._id.toString();
    const token = jwt.sign(
      { id: userId, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: userId, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("🔥 Login error details:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
