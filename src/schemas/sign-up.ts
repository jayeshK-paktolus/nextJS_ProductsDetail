import {z} from "zod";


export const SignUpFormSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(4),
});