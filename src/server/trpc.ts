import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { ZodError } from "zod";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(async function isAuthorized(
  opts
) {
  const { ctx } = opts;

  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session: ctx.session,
    },
  });
});
