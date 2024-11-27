"use client";

import { Locale } from "@/lib/enums/locale.enum";
import { trpc } from "@/lib/trpc/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const [locale, setLocale] = useState<Locale | undefined>(undefined);
  const { mutate, data } = trpc.locale.switch.useMutation();

  const handleLocaleChange = (value: Locale) => {
    mutate(value);
  };

  useEffect(() => {
    if (document) {
      setLocale(document.documentElement.lang as Locale);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setLocale(data);
      router.refresh();
    }
  }, [data, router]);

  return (
    <Select onValueChange={handleLocaleChange} value={locale}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder={t("placeholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Locale.en}>English</SelectItem>
        <SelectItem value={Locale.es}>Español</SelectItem>
      </SelectContent>
    </Select>
  );
}
