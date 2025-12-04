import {
  getOtpEmailTemplate,
  getWelcomeEmailTemplate,
  getResetEmailTemplate,
} from "./mailTemplates.js";
import transporter from "./transporter.js";

export const sendOtpEmail = async (email, otp, subject) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] Skipping email send. OTP for ${email} is ${otp}`);
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject,
      html: getOtpEmailTemplate(otp),
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
};

export const sendResetEmail = async (email, resetUrl, subject) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] Skipping reset email send. Reset URL for ${email} is ${resetUrl}`);
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject,
      html: getResetEmailTemplate(resetUrl),
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset email.");
  }
};

export const sendWelcomeEmail = async (name, email) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] Skipping welcome email send for ${email}`);
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to Vertex",
      html: getWelcomeEmailTemplate(name),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email.");
  }
};
