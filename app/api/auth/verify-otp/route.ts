import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find OTP
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check if expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Check if this is the admin email
      const isAdmin = email === process.env.ADMIN_EMAIL;
      user = await User.create({
        email,
        role: isAdmin ? "admin" : "user",
      });
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Create JWT token
    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
