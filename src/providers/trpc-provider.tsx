"use client";

import { trpc } from "@/lib/trpc";
import { getBaseUrl } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";

export function TrpcProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: (() => {
            return `${getBaseUrl()}/api/trpc`;
          })(),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
