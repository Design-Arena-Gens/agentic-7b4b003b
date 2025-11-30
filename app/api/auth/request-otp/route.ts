import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";
import { generateOTP } from "@/lib/auth";
import { sendOTPEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email });

    // Generate new OTP
    const otp = generateOTP();

    // Save OTP to database
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send OTP email. Please check your email configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
