import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/dbconnect/mongodb";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("seafooddb");

    // 1️⃣ Check if user already exists
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "Email already exists" },
        { status: 409 }
      );
    }

    // 2️⃣ Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    // 3️⃣ Save OTP in temp collection
    const otpCollection = db.collection("otp_verifications");
    await otpCollection.updateOne(
      { email },
      { $set: { name, email, password, otp, expiresAt } },
      { upsert: true }
    );

    // 4️⃣ Send OTP
    await sendOTP(email, otp);

    return NextResponse.json({ ok: true, message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
