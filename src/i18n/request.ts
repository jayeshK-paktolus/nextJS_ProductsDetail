import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from "@/lib/constants";
import { Locale } from "@/lib/enums/locale.enum";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import en from "../../messages/en";
import es from "../../messages/es";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = localeCookie ? (localeCookie as Locale) : DEFAULT_LOCALE;

  const resources = {
    en,
    es,
  };

  return {
    locale,
    messages: {
      ...resources[locale],
    },
  };
});
