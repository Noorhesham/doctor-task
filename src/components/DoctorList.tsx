import { DOCTORS, PAGELIMIT, SPECIALTIES, LOCATIONS } from "@/constants";
import React, { useMemo } from "react";
import Doctor from "./Doctor";
import { PaginationDemo } from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { FilterState } from "@/types";

import GridContainer from "./GridContainer";
import SearchBar from "./SearchBar";
import { Filters } from "./Filters";

const DoctorList = () => {
  // State management
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState<FilterState>({
    specialties: [],
    locations: [],
    searchQuery: "",
  });

  /**
   * Toggle filter selection
   */
  // Handle filter changes for any filter group
  const handleFilterChange = (filterKey: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [filterKey]: values }));
  };

  // Reset all filters
  const resetAllFilters = () => {
    setFilters({
      specialties: [],
      locations: [],
      searchQuery: filters.searchQuery, // Preserve search
    });
  };

  /**
   * Filters doctors based on all active filters
   */
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      // 1. Check specialty filters (skip if none selected)
      const specialtyMatch = filters.specialties.length === 0 || filters.specialties.includes(doctor.specialty);

      // 2. Check location filters (skip if none selected)
      const locationMatch = filters.locations.length === 0 || filters.locations.includes(doctor.location);

      // 3. Check search query
      const searchMatch =
        filters.searchQuery.trim() === "" || doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return specialtyMatch && locationMatch && searchMatch;
    });
  }, [filters.specialties, filters.locations, filters.searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex py-5 lg:py-12   flex-col gap-5">
      <GridContainer className=" relative  gap-8" cols={7}>
        <div className="space-y-4 sticky lg:bg-blue-50 h-fit lg:px-4 lg:rounded-2xl lg:shadow-sm  lg:py-3 top-0 col-span-full lg:col-span-2">
          {/* Dynamic filters component */}
          <Filters
            filters={[
              {
                key: "specialties",
                label: "Specialties",
                options: SPECIALTIES,
                selectedValues: filters.specialties,
              },
              {
                key: "locations",
                label: "Locations",
                options: LOCATIONS,
                selectedValues: filters.locations,
              },
            ]}
            onFilterChange={handleFilterChange}
            onResetAll={resetAllFilters}
          />{" "}
        </div>

        <div className="flex min-h-screen flex-col gap-4  col-span-full lg:col-span-5">
          {/* Search Input */}
          <SearchBar filters={filters} setFilters={setFilters} />
          {/* Results Summary */}
          <div className="text-base text-muted-foreground">
            {filteredDoctors.length === 0 ? (
              "No doctors found"
            ) : (
              <>
                Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
                {/* {filters.specialties.length > 0 && ` in ${filters.specialties.join(", ")}`}
                {filters.locations.length > 0 && ` from ${filters.locations.join(", ")}`}
                {filters.searchQuery && ` matching "${filters.searchQuery}"`} */}
              </>
            )}
          </div>
          {/* Animated Doctors List */}
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.slice((page - 1) * PAGELIMIT, page * PAGELIMIT).map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="hover:-translate-y-2 duration-200"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Doctor doctor={doctor} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 text-muted-foreground"
                >
                  No doctors found matching your criteria
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Pagination Controls */}
          {filteredDoctors.length > PAGELIMIT && (
            <PaginationDemo
              totalPages={Math.ceil(filteredDoctors.length / PAGELIMIT)}
              currentPage={page}
              setCurrentPage={setPage}
            />
          )}
        </div>
      </GridContainer>
    </div>
  );
};

export default DoctorList;
