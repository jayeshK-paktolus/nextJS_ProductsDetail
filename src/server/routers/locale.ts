import { Locale } from "@/lib/enums/locale.enum";
import { cookies } from "next/headers";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const localeRouter = router({
  switch: publicProcedure.input(z.nativeEnum(Locale)).mutation(async (opts) => {
    const { input } = opts;

    const cookieStore = await cookies();
    cookieStore.set("locale", input, { path: "/" });

    return input;
  }),
});
