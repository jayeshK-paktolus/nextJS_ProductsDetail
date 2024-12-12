import { router } from "../trpc";
import { authRouter } from "./auth";
import { localeRouter } from "./locale";
import { usersRouter } from "./users";

export const appRouter = router({
  users: usersRouter,
  auth: authRouter,
  locale: localeRouter,
});

export type AppRouter = typeof appRouter;
