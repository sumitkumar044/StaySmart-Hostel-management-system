import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Hostel Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Admin Login OTP",
    html: `
      <h2>Your Admin OTP</h2>
      <h1>${otp}</h1>
      <p>OTP valid for 5 minutes</p>
    `,
  });
};
