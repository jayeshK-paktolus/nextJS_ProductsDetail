"use client";

import { trpc } from "@/lib/trpc";

// NOTE: This is an example component.
// TODO: Remove this example component.
export function Welcome() {
  const { isFetching, data } = trpc.users.me.useQuery();

  return (
    <h1 className="text-xl">Welcome, {isFetching ? "..." : data?.firstName}</h1>
  );
}
