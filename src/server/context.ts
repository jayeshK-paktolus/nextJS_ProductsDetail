import { cache } from "react";

import { auth } from "@/auth";

export const createTRPCContext = cache(async () => {
  const session = await auth();

  return {
    session,
  };
});

export type Context = typeof createTRPCContext;
