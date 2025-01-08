import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const OtpFormSchema = z.object({
  otp: z.string().length(6, "OTP must contain 6 digits").trim(),
});

export const OtpMutationSchema = OtpFormSchema.extend({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const ResetPasswordBaseSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password length must be at least 8" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*])(?=.*[^\s]).{8,}$/,
      "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character."
    ),
  confirmPassword: z.string(),
});

export const ResetPasswordFormSchema = ResetPasswordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const ResetPasswordMutationSchema = ResetPasswordBaseSchema.extend({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  otp: z.string().length(6, "OTP must contain 6 digits").trim(),
});
