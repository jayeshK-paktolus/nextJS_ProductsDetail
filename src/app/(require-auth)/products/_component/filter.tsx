import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Filter({
  options,
  selected,
  handleChange,
}: {
  options: string[];
  selected: string;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="w-60">
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, index) => {
              const updatedOption = option.split("-").join(" ");
              return (
                <SelectItem key={index} value={option.toLowerCase()}>
                  <span className="capitalize">{updatedOption}</span>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
