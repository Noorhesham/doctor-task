"use client";

import { X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import SheetCustom from "./SheetCustom";

/**
 * Type definition for filter configuration
 * @template T - The type of filter values (typically string)
 */
type FilterConfig<T extends string> = {
  /** Unique key to identify this filter group */
  key: string;
  /** Display label for the filter group */
  label: string;
  /** Available options for this filter */
  options: T[];
  /** Currently selected values */
  selectedValues: T[];
};

/**
 * Props for the Filters component
 * @template T - The type of filter values (typically string)
 */
interface FiltersProps<T extends string> {
  /** Array of filter configurations */
  filters: FilterConfig<T>[];
  /** Callback when filter selection changes */
  onFilterChange: (filterKey: string, values: T[]) => void;
  /** Callback to reset all filters */
  onResetAll: () => void;
}

/**
 * A reusable filters component with responsive design (desktop + mobile)
 * Supports multiple filter groups with dynamic configuration
 */
export const Filters = <T extends string>({ filters, onFilterChange, onResetAll }: FiltersProps<T>) => {
  /**
   * Toggles a filter value selection
   * @param filterKey - The filter group to modify
   * @param value - The value to toggle
   */
  const toggleFilterValue = (filterKey: string, value: T) => {
    const filter = filters.find((f) => f.key === filterKey);
    if (!filter) return;

    const newValues = filter.selectedValues.includes(value)
      ? filter.selectedValues.filter((v) => v !== value) // Remove if already selected
      : [...filter.selectedValues, value]; // Add if not selected

    onFilterChange(filterKey, newValues);
  };

  /**
   * Clears all selected values for a specific filter group
   * @param filterKey - The filter group to clear
   */
  const clearFilterGroup = (filterKey: string) => {
    onFilterChange(filterKey, []);
  };

  /** Calculates total number of active filters across all groups */
  const totalActiveFilters = filters.reduce((sum, filter) => sum + filter.selectedValues.length, 0);

  return (
    <>
      {/* Desktop Filters (always visible) */}
      <div className="hidden md:block space-y-4">
        {filters.map((filter) => (
          <FilterGroup
            key={filter.key}
            filter={filter}
            onToggle={toggleFilterValue}
            onClear={() => clearFilterGroup(filter.key)}
          />
        ))}

        {totalActiveFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={onResetAll} className="text-muted-foreground">
            Clear all filters
          </Button>
        )}
      </div>
      {/* Active Filters Badges */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2 my-2">
          {filters.flatMap((filter) =>
            filter.selectedValues.map((value) => (
              <Badge
                key={`${filter.key}-${value}`}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-red-500/90 transition-colors"
                onClick={() => toggleFilterValue(filter.key, value)}
              >
                {value}
                <X className="h-3 w-3" />
              </Badge>
            ))
          )}
          <Button variant="ghost" size="sm" onClick={onResetAll} className="text-muted-foreground h-8">
            Clear all
          </Button>
        </div>
      )}
      {/* Mobile Filters (sheet/drawer) */}

      <div className="md:hidden">
        <SheetCustom
          header="Filters"
          content={
            <div className="py-4 space-y-6">
              {filters.map((filter) => (
                <FilterGroup
                  key={filter.key}
                  filter={filter}
                  onToggle={toggleFilterValue}
                  onClear={() => clearFilterGroup(filter.key)}
                />
              ))}

              {totalActiveFilters > 0 && (
                <div className="flex justify-end">
                  <Button variant="ghost" onClick={onResetAll} className="text-muted-foreground">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          }
          btn={
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {totalActiveFilters > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {totalActiveFilters}
                </span>
              )}
            </Button>
          }
        />
        {/* Active filters indicator (mobile) */}
        <div className="md:hidden mt-5 flex flex-wrap gap-2">
          {filters.flatMap((filter) =>
            filter.selectedValues.map((value) => (
              <div key={`${filter.key}-${value}`} className="flex items-center gap-1">
                {value}
                <button onClick={() => toggleFilterValue(filter.key, value)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Component for an individual filter group
 */
const FilterGroup = <T extends string>({
  filter,
  onToggle,
  onClear,
}: {
  filter: FilterConfig<T>;
  onToggle: (filterKey: string, value: T) => void;
  onClear: () => void;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{filter.label}</h3>
        {filter.selectedValues.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
            Clear
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {filter.options.map((option) => (
          <Button
            key={option}
            variant={filter.selectedValues.includes(option) ? "default" : "outline"}
            size="sm"
            className="truncate"
            onClick={() => onToggle(filter.key, option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};
