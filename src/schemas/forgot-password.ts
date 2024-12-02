import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const OtpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  otp: z.string().length(6, "OTP must contain 6 digits").trim(),
});
