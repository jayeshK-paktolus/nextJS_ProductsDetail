import backendInstance from "@/lib/backend-instance";
import { HttpStatusCode } from "axios";
import { publicProcedure, router } from "../trpc";
import { ForgotPasswordFormSchema } from "@/schemas/forgot-password";

export const authRouter = router({
  sendOtp: publicProcedure
    .input(ForgotPasswordFormSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await backendInstance.post("/auth/send-otp", {
          email: input.email,
        });

        if (response.status !== HttpStatusCode.Accepted) return null;

        return { success: true };
      } catch {
        return null;
      }
    }),
});
