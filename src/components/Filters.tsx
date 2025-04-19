"use client";

import { X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import SheetCustom from "./SheetCustom";
import { useRef, useEffect, KeyboardEvent } from "react";

type FilterConfig<T extends string> = {
  key: string;
  label: string;
  options: T[];
  selectedValues: T[];
};

interface FiltersProps<T extends string> {
  filters: FilterConfig<T>[];
  onFilterChange: (filterKey: string, values: T[]) => void;
  onResetAll: () => void;
}

export const Filters = <T extends string>({ filters, onFilterChange, onResetAll }: FiltersProps<T>) => {
  const firstFilterButtonRef = useRef<HTMLButtonElement | null | undefined>(null);
  const filterOptionRefs = useRef<Record<string, HTMLButtonElement[]>>({});

  const toggleFilterValue = (filterKey: string, value: T) => {
    const filter = filters.find((f) => f.key === filterKey);
    if (!filter) return;

    const newValues = filter.selectedValues.includes(value)
      ? filter.selectedValues.filter((v) => v !== value)
      : [...filter.selectedValues, value];

    onFilterChange(filterKey, newValues);
  };

  const clearFilterGroup = (filterKey: string) => {
    onFilterChange(filterKey, []);
  };

  const totalActiveFilters = filters.reduce((sum, filter) => sum + filter.selectedValues.length, 0);

  // Enhanced keyboard navigation for filter options
  const handleOptionKeyDown = (e: KeyboardEvent<HTMLButtonElement>, filterKey: string, value: T, index: number) => {
    const currentFilterOptions = filterOptionRefs.current[filterKey] || [];

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggleFilterValue(filterKey, value);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (index < currentFilterOptions.length - 1) {
          currentFilterOptions[index + 1]?.focus();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (index > 0) {
          currentFilterOptions[index - 1]?.focus();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (index + 2 < currentFilterOptions.length) {
          currentFilterOptions[index + 2]?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index - 2 >= 0) {
          currentFilterOptions[index - 2]?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        currentFilterOptions[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        currentFilterOptions[currentFilterOptions.length - 1]?.focus();
        break;
    }
  };

  const handleBadgeKeyDown = (e: KeyboardEvent<HTMLDivElement>, filterKey: string, value: T) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFilterValue(filterKey, value);
    }
  };

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Register filter option refs
  const registerOptionRef = (filterKey: string, ref: HTMLButtonElement | null, index: number) => {
    if (!ref) return;
    if (!filterOptionRefs.current[filterKey]) {
      filterOptionRefs.current[filterKey] = [];
    }
    filterOptionRefs.current[filterKey][index] = ref;
  };

  // Focus management for mobile drawer
  useEffect(() => {
    if (firstFilterButtonRef.current) {
      firstFilterButtonRef.current.focus();
    }
  }, []);

  return (
    <div role="search" aria-label="Doctor filters">
      {/* Desktop Filters */}
      <div className="hidden md:block space-y-4" role="group" aria-labelledby="desktop-filters-label">
        <h2 id="desktop-filters-label" className="sr-only">
          Desktop filters
        </h2>
        {filters.map((filter) => (
          <FilterGroup
            key={filter.key}
            filter={filter}
            onToggle={toggleFilterValue}
            onClear={() => clearFilterGroup(filter.key)}
            registerOptionRef={(ref, index) => registerOptionRef(filter.key, ref, index)}
            handleOptionKeyDown={handleOptionKeyDown}
          />
        ))}

        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetAll}
            onKeyDown={(e) => handleButtonKeyDown(e, onResetAll)}
            aria-label="Clear all filters"
            tabIndex={0}
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Active Filters Badges */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2 my-2" role="region" aria-label="Active filters">
          {filters.flatMap((filter) =>
            filter.selectedValues.map((value) => (
              <Badge
                key={`${filter.key}-${value}`}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:text-white hover:bg-red-500/90 transition-colors"
                onClick={() => toggleFilterValue(filter.key, value)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleBadgeKeyDown(e, filter.key, value)}
                tabIndex={0}
                role="button"
                aria-label={`Remove ${value} filter`}
              >
                {value}
                <X className="h-3 w-3" aria-hidden="true" />
              </Badge>
            ))
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetAll}
            onKeyDown={(e) => handleButtonKeyDown(e, onResetAll)}
            className="text-muted-foreground h-8"
            aria-label="Clear all filters"
            tabIndex={0}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Mobile Filters */}
      <div className="md:hidden">
        <SheetCustom
          side="bottom"
          header="Filters"
          content={
            <div className="py-4 space-y-6">
              {filters.map((filter, index) => (
                <FilterGroup
                  key={filter.key}
                  filter={filter}
                  onToggle={toggleFilterValue}
                  onClear={() => clearFilterGroup(filter.key)}
                  registerOptionRef={(ref, i) => registerOptionRef(filter.key, ref, i)}
                  handleOptionKeyDown={handleOptionKeyDown}
                  ref={index === 0 ? firstFilterButtonRef : null}
                />
              ))}

              {totalActiveFilters > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={onResetAll}
                    onKeyDown={(e) => handleButtonKeyDown(e, onResetAll)}
                    className="text-muted-foreground"
                    aria-label="Clear all filters"
                    tabIndex={0}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          }
          btn={
            <Button
              variant="outline"
              className="gap-2"
              aria-label={`Open filters panel (${totalActiveFilters} active filters)`}
              tabIndex={0}
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
              {totalActiveFilters > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {totalActiveFilters}
                </span>
              )}
            </Button>
          }
        />

        {/* Mobile active filters indicator */}
        <div className="md:hidden mt-5 flex flex-wrap gap-2" role="region" aria-label="Mobile active filters">
          {filters.flatMap((filter) =>
            filter.selectedValues.map((value) => (
              <Badge
                key={`mobile-${filter.key}-${value}`}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:text-white hover:bg-red-500/90 transition-colors"
                onClick={() => toggleFilterValue(filter.key, value)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleBadgeKeyDown(e, filter.key, value)}
                tabIndex={0}
                role="button"
                aria-label={`Remove ${value} filter`}
              >
                {value}
                <X className="h-3 w-3" aria-hidden="true" />
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const FilterGroup = <T extends string>({
  filter,
  onToggle,
  onClear,
  registerOptionRef,
  handleOptionKeyDown,
  ref,
}: {
  filter: FilterConfig<T>;
  onToggle: (filterKey: string, value: T) => void;
  onClear: () => void;
  registerOptionRef?: (ref: HTMLButtonElement | null, index: number) => void;
  handleOptionKeyDown?: (e: KeyboardEvent<HTMLButtonElement>, filterKey: string, value: T, index: number) => void;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div ref={ref} role="group" aria-labelledby={`${filter.key}-label`}>
      <div className="flex justify-between items-center mb-3">
        <h3 id={`${filter.key}-label`} className="font-medium">
          {filter.label}
        </h3>
        {filter.selectedValues.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClear();
              }
            }}
            className="text-muted-foreground"
            aria-label={`Clear ${filter.label} filters`}
            tabIndex={0}
          >
            Clear
          </Button>
        )}
      </div>
      <div
        className="grid grid-cols-2 gap-2"
        role="listbox"
        aria-multiselectable="true"
        aria-activedescendant={filter.selectedValues[0] || undefined}
      >
        {filter.options.map((option, index) => (
          <Button
            key={option}
            variant={filter.selectedValues.includes(option) ? "default" : "outline"}
            size="sm"
            className="truncate"
            onClick={() => onToggle(filter.key, option)}
            onKeyDown={(e) => handleOptionKeyDown?.(e, filter.key, option, index)}
            role="option"
            aria-selected={filter.selectedValues.includes(option)}
            tabIndex={0}
            aria-label={`${option} ${filter.selectedValues.includes(option) ? "selected" : "not selected"}`}
            ref={(ref) => registerOptionRef?.(ref, index)}
            id={`${filter.key}-option-${index}`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};
