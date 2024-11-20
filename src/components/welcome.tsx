"use client";

import { trpc } from "@/lib/trpc";

export function Welcome() {
  const { isFetching, data } = trpc.users.me.useQuery();

  return (
    <h1 className="text-xl">Welcome, {isFetching ? "..." : data?.firstName}</h1>
  );
}
