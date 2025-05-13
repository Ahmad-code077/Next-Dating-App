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
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address</p>
      <a href="${link}">Verify email</a>
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
      <h1>You have requested to reset your password</h1>
      <p>Click the link below to reset password</p>
      <a href="${link}">Reset password</a>
    `,
  });
}
