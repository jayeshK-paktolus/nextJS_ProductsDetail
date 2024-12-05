import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { createTRPCContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { createCallerFactory } from "@/server/trpc";
import { getQueryClient } from "./client";

const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
