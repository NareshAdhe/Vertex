import { getOtpEmailTemplate, getWelcomeEmailTemplate } from "./mailTemplates.js";
import transporter from "./transporter.js";

export const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Your Verification Code",
      html: getOtpEmailTemplate(otp),
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to Our Service",
      html: getWelcomeEmailTemplate(name),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email.");
  }
};
