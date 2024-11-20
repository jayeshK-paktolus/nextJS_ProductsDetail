import backendInstance from "@/lib/backend-instance";
import { HttpStatusCode } from "axios";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  me: publicProcedure.query(async () => {
    try {
      const response = await backendInstance.get<{
        email: string;
        firstName: string;
        lastName: string;
      }>("/users/me");

      if (response.status !== HttpStatusCode.Ok) {
        return null;
      }

      return {
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }),
});
