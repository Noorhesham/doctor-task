"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function PaginationDemo({
  totalPages = 5,
  currentPage,
  setCurrentPage,
}: {
  totalPages?: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Pagination className="mt-10 w-full flex justify-center overflow-hidden">
      <PaginationContent className="flex gap-1 sm:gap-2 px-2">
        {/* Previous Button */}
        <PaginationItem>
          <button
            className={`rounded-full ${
              currentPage <= 1 ? "cursor-not-allowed opacity-90" : ""
            } flex items-center px-1 py-1 lg:px-3 lg:py-3 text-sm md:text-base text-main2 bg-blue-200 duration-150 hover:text-white hover:bg-main2`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
          </button>
        </PaginationItem>

        {/* Page Numbers (visible up to 5 pages on small screens) */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const showPage = totalPages <= 5 || page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;

          return showPage ? (
            <PaginationItem key={page}>
              <PaginationLink
                className={`text-sm md:text-base px-3 py-2 ${
                  currentPage === page
                    ? "bg-main2 text-white rounded-full"
                    : "hover:bg-blue-200 hover:text-main2 rounded-full"
                }`}
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}

        {/* Ellipsis for hidden pages (mobile) */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem className=" hidden lg:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <Button
            className={`rounded-full ${
              currentPage >= totalPages ? "cursor-not-allowed opacity-90" : ""
            } flex items-center px-1 py-1 lg:px-3 lg:py-3 text-sm md:text-base text-main2 bg-blue-200 duration-150 hover:text-white hover:bg-main2`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
          >
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
