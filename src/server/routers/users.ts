import backendInstance from "@/lib/backend-instance";
import { HttpStatusCode } from "axios";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { accountFormSchema } from "@/schemas/account";

export const usersRouter = router({
  me: privateProcedure.query(async () => {
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
    } catch {
      return null;
    }
  }),


  updateAccount: privateProcedure
    .input(accountFormSchema) 
    .mutation(async ({ input }: { input: z.infer<typeof accountFormSchema> }) => {
      try {  
        const response = await backendInstance.patch<{
          email: string;
          firstName: string;
          lastName: string;
        }>("/users/me", input); 

        if (response.status !== HttpStatusCode.Ok) {
          return null;
        }

        return {
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        };
      } catch {
        return null;
      }
    }),
});

