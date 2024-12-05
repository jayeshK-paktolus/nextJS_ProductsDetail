import { router } from "../trpc";
import { usersRouter } from "./users";
import { authRouter } from "./auth";

export const appRouter = router({
  users: usersRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
