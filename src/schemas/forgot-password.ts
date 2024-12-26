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

export const ResetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    otp: z.string().length(6, "OTP must contain 6 digits").trim(),
    password: z
      .string()
      .min(8, { message: "Password length must be atleast 8" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*])(?=.*[^\s]).{8,}$/
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });
