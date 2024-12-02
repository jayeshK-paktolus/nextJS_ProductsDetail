"use client";

import ChangePasswordForm from "./_components/change-password-form";
import AccountForm from "./_components/account-form";
import { trpc } from "@/lib/trpc/client";

export default function AccountPage() {
  const { isFetching, data } = trpc.users.me.useQuery();

  if (isFetching || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 justify-center">
      <div className="col-span-2">
        <AccountForm data={data} />
      </div>
      <div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
