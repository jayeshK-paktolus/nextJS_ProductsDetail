import { router } from "../trpc";
import { localeRouter } from "./locale";
import { usersRouter } from "./users";

export const appRouter = router({
  users: usersRouter,
  locale: localeRouter,
});

export type AppRouter = typeof appRouter;
