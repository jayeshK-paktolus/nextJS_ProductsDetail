"use client";

import { trpc } from "@/lib/trpc/client";

// NOTE: This is an example component.
// TODO: Remove this example component.
export function HelloClient() {
  const { isFetching, data } = trpc.users.me.useQuery();

  return (
    <h1 className="text-xl">Hello from a client component, {isFetching ? "..." : data?.firstName}</h1>
  );
}
