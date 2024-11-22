import { initTRPC, TRPCError } from "@trpc/server";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
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
