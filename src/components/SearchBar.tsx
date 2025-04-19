import React from "react";
import { Input } from "./ui/input";
import { FilterState } from "@/types";
import { SearchIcon } from "lucide-react";

const SearchBar = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  return (
    <div className="relative flex items-center gap-2">
      <Input
        className="py-6"
        placeholder="Search doctors by name..."
        value={filters.searchQuery}
        onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
      />
      <div className="p-2 bg-blue-500 rounded-full text-white absolute right-4">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
