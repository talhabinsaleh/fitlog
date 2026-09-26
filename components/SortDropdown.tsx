import { LuChevronDown } from "react-icons/lu";
import { SortKey } from "@/lib/types";

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 text-xs text-muted">
      Sort By
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="cursor-pointer appearance-none rounded-lg border border-line bg-[#13161d] py-2 pr-9 pl-3 text-xs font-medium text-white outline-none focus:border-accent"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <LuChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white" />
      </span>
    </label>
  );
}
