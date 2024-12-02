
import { z } from "zod";


export const accountFormSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
});


export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long")
    .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
    .regex(/\d/, "New password must contain at least one number"),
  confirmPassword: z.string().min(6, "Confirm password must match the new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
