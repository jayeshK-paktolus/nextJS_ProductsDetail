import type { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

function Search({ handleChange }: { handleChange: (value: string) => void }) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search by product name"
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Search;
