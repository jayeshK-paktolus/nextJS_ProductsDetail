import backendInstance from "@/lib/backend-instance";
import { encryptData } from "@/lib/utils";

import { HttpStatusCode } from "axios";
import { publicProcedure, router } from "../trpc";

import {
  ForgotPasswordFormSchema,
  OtpMutationSchema,
  ResetPasswordSchema,
} from "@/schemas/forgot-password";

export const authRouter = router({
  sendOtp: publicProcedure
    .input(ForgotPasswordFormSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await backendInstance.post("/auth/send-otp", {
          email: input.email,
        });

        if (response.status !== HttpStatusCode.Accepted) return null;

        const encryptedEmail = encryptData({ email: input.email });

        return { success: true, token: encryptedEmail };
      } catch {
        throw new Error("otp request failed.");
      }
    }),
  verifyOtp: publicProcedure
    .input(OtpMutationSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await backendInstance.post("/auth/verify-otp", {
          email: input.email,
          otp: input.otp,
        });

        if (response.status !== HttpStatusCode.Ok) return null;

        const encryptedEmailAndOtp = encryptData({
          email: input.email,
          otp: input.otp,
        });

        return { success: true, token: encryptedEmailAndOtp };
      } catch {
        throw new Error("otp verification failed.");
      }
    }),
  resetPassword: publicProcedure
    .input(ResetPasswordSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await backendInstance.post("/auth/reset-password", {
          email: input.email,
          otp: input.otp,
          password: input.password,
          confirmPassword: input.confirmPassword,
        });

        if (response.status !== HttpStatusCode.Ok) return null;

        return { success: true };
      } catch {
        throw new Error("reset password failed.");
      }
    }),
});
