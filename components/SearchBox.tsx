import { LuSearch, LuX } from "react-icons/lu";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({ value, onChange, placeholder = "Search by name or tag…" }: Props) {
  return (
    <div className="relative w-full sm:w-64">
      <LuSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search workouts"
        className="w-full rounded-lg border border-line bg-[#13161d] py-2 pr-8 pl-9 text-xs text-white outline-none placeholder:text-dim focus:border-accent [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted hover:text-white"
        >
          <LuX />
        </button>
      )}
    </div>
  );
}
