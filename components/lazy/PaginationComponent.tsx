"use client";

import React, { memo } from "react";
import ReactPaginate from "react-paginate";

interface PaginationComponentProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const PaginationComponent = memo(function PaginationComponent({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationComponentProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <ReactPaginate
        previousLabel={
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </span>
        }
        nextLabel={
          <span className="flex items-center">
            Next
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        }
        breakLabel="..."
        breakClassName="px-3 py-2 text-gray-500"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName="flex items-center justify-center gap-1"
        pageClassName="relative"
        pageLinkClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
        previousClassName="relative"
        previousLinkClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
        nextClassName="relative"
        nextLinkClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
        activeClassName="relative"
        activeLinkClassName="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="pointer-events-none"
        forcePage={currentPage}
      />
    </div>
  );
});

export default PaginationComponent;
