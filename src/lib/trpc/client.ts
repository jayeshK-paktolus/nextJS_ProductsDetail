"use client";

import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "@/server/routers/_app";
import { makeQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient;
export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  return (clientQueryClientSingleton ??= makeQueryClient());
}

export const trpc = createTRPCReact<AppRouter>();
