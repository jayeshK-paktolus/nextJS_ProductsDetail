import { account } from "@/lib/data/account";

export default async function Home() {
  const user = await account();

  return (
    <div className="grid place-content-center">
      <h1 className="text-xl">Welcome, {user?.firstName}</h1>
    </div>
  );
}
