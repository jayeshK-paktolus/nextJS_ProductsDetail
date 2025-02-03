import type { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

function Search({ handleChange }: { handleChange: (value: string) => void }) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };
  const t = useTranslations("products");
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder={t("searchbyproductname")}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Search;
