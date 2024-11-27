import LanguageSwitcher from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="grid place-content-center">
      <div className="flex items-center gap-x-2 p-6">
        <h1>{t("title")}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
