import backendInstance from "@/lib/backend-instance";
import { HttpStatusCode } from "axios";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { ChangeAccountPasswordFromSchema, UpdateAccountFormSchema } from "@/schemas/account";

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
    .input(UpdateAccountFormSchema) 
    .mutation(async ({ input }: { input: z.infer<typeof UpdateAccountFormSchema> }) => {
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

    changePassword: privateProcedure
    .input(ChangeAccountPasswordFromSchema) 
    .mutation(async ({ input }: { input: z.infer<typeof ChangeAccountPasswordFromSchema> }) => {
      try {  
        const response = await backendInstance.put<{
          oldPassword: string;
          password: string;
          confirmPassword: string;
        }>("/users/me/change-password", input); 

        if (response.status !== HttpStatusCode.Ok) {
         return null
        }

        return {
          oldPassword: response.data.oldPassword,
          password: response.data.password,
          confirmPassword: response.data.confirmPassword,
        };
      } catch (error) {
        throw error; 
      }
    }),
});

