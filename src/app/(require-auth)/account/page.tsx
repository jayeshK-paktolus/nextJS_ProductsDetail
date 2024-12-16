import { trpc } from "@/lib/trpc/server";
import AccountForm from "./_components/account-form";
import ChangePasswordForm from "./_components/change-password-form";

export default async function AccountPage() {
  const data = await trpc.users.me();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
      <div className="col-span-1 md:col-span-2">
        <AccountForm data={data} />
      </div>
      <ChangePasswordForm />
    </div>
  );
}
