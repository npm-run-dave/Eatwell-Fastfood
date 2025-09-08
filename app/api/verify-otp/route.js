import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/dbconnect/mongodb";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    const client = await clientPromise;
    const db = client.db("seafooddb");
    const otpCollection = db.collection("otp_verifications");
    const userRecord = await otpCollection.findOne({ email });

    if (!userRecord) return NextResponse.json({ ok: false, error: "No pending verification" }, { status: 400 });
    if (userRecord.expiresAt < Date.now()) return NextResponse.json({ ok: false, error: "OTP expired" }, { status: 400 });
    if (userRecord.otp !== otp) return NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 400 });

    const users = db.collection("users");
    const hashedPassword = await bcrypt.hash(userRecord.password, 10);

    await users.insertOne({
      name: userRecord.name,
      email: userRecord.email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await otpCollection.deleteOne({ email });

    return NextResponse.json({ ok: true, message: "User verified and created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
