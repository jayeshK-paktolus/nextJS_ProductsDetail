import { trpc } from "@/lib/trpc/server";

// NOTE: This is an example server component.
// TODO: Remove this example component.
export async function HelloServer() {
  const account = await trpc.users.me();

  return <h1 className="text-xl">Hello from a server component, {account?.firstName}</h1>;
}
