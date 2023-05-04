import { LinkButton } from "./LinkButton";
import { ReactEventHandler, useState } from "react";
export type PaginationButtonsProps = {
  pageCount: number;
  currentPage: number;
  onClick: (event: React.SyntheticEvent) => void;
};

export function PaginationButtons({
  pageCount,
  currentPage,
  onClick,
}: PaginationButtonsProps) {
  const pageList = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full justify-center">
      {pageList.map((page) => (
        <button
          key={page}
          className={
            currentPage === page
              ? "bg-blue-500 rounded-xl text-white px-2 py-1 page"
              : "rounded-xl px-2 py-1 hover:bg-blue-700 hover:text-white page"
          }
          onClick={onClick}
          value={page}
        >
          {page.toString()}
        </button>
      ))}
    </div>
  );
}
