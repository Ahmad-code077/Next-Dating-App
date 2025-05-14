import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function POST(request: Request) {
  const { email, token, type, timestamp } = await request.json();

  try {
    if (type === 'verification') {
      console.log('varification email trigger ☺☺☺☺');
      await sendVerificationEmail(email, token, timestamp);
    } else if (type === 'reset') {
      await sendPasswordResetEmail(email, token, timestamp);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to send email ${error}` },
      { status: 500 }
    );
  }
}

async function sendVerificationEmail(
  email: string,
  token: string,
  timestamp?: number
) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  const timeStr = timestamp ? ` [${new Date(timestamp).toLocaleString()}]` : '';

  return transporter.sendMail({
    from: `"Love Finder" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Verify your email address${timeStr}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7fafc; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
          <h1 style="color: #333; text-align: center; margin-bottom: 16px;">Welcome to <span style="color:#f97316">Love Finder!</span></h1>
          <p style="font-size: 16px; color: #333; text-align: center;">
            Please verify your email address to activate your account.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${link}" style="
              display: inline-block;
              background: #f97316;
              color: #fff;
              padding: 14px 32px;
              border-radius: 8px;
              font-size: 18px;
              text-decoration: none;
              font-weight: 600;
              box-shadow: 0 2px 6px rgba(225,29,72,0.15);
              transition: background 0.2s;
            ">Verify Email</a>
          </div>
          <p style="font-size: 14px; color: #888; text-align: center;">
            If you did not create an account, you can safely ignore this email.
          </p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #bbb; text-align: center;">
            &copy; ${new Date().getFullYear()} Love Finder. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}

async function sendPasswordResetEmail(
  email: string,
  token: string,
  timestamp?: number
) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const timeStr = timestamp ? ` [${new Date(timestamp).toLocaleString()}]` : '';

  return transporter.sendMail({
    from: `"Love Finder" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Reset your password ${timeStr}`,
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7fafc; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
          <h1 style="color: #333; text-align: center; margin-bottom: 16px;">Reset Your Password</h1>
          <p style="font-size: 16px; color: #333; text-align: center;">
            You have requested to reset your password. Click the button below to proceed.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${link}" style="
              display: inline-block;
              background: #f97316;
              color: #fff;
              padding: 14px 32px;
              border-radius: 8px;
              font-size: 18px;
              text-decoration: none;
              font-weight: 600;
              box-shadow: 0 2px 6px rgba(225,29,72,0.15);
              transition: background 0.2s;
            ">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #888; text-align: center;">
            If you did not request this, you can safely ignore this email.
          </p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #bbb; text-align: center;">
            &copy; ${new Date().getFullYear()} Love Finder. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
