import LanguageSwitcher from "@/components/language-switcher";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-svw h-svh grid place-content-center bg-gray-100">
      <div className="absolute right-6 top-6">
        <LanguageSwitcher />
      </div>
      {children}
    </main>
  );
}
