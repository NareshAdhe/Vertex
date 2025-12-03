import {
  getOtpEmailTemplate,
  getWelcomeEmailTemplate,
  getResetEmailTemplate,
} from "./mailTemplates.js";
import transporter from "./transporter.js";

export const sendOtpEmail = async (email, otp, subject) => {
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
