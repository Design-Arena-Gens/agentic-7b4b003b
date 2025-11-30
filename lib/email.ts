import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e5e5e5; padding: 40px; border-radius: 8px;">
          <h1 style="background: linear-gradient(90deg, #00fff9, #bf00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; margin-bottom: 20px;">
            AI Portfolio
          </h1>
          <p style="font-size: 16px; margin-bottom: 20px;">Your OTP code is:</p>
          <div style="background: rgba(26, 26, 36, 0.8); border: 1px solid rgba(0, 255, 249, 0.3); border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
            <h2 style="color: #00fff9; font-size: 36px; letter-spacing: 8px; margin: 0;">
              ${otp}
            </h2>
          </div>
          <p style="font-size: 14px; color: #a0a0a0; margin-top: 20px;">
            This code will expire in 10 minutes. Do not share this code with anyone.
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return false;
  }
}
