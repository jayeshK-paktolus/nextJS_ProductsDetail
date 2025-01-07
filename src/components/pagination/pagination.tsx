import type { Dispatch, SetStateAction } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { useBreakpoint } from "@/hooks/use-breakpoint";

import { BREAKPOINTS } from "@/lib/constants";

type ProductsPaginationProps = {
  totalNumberOfPages: number;
  currentPage: number;
  changePage: Dispatch<SetStateAction<number>>;
};

function ProductsPagination({
  totalNumberOfPages,
  currentPage,
  changePage,
}: ProductsPaginationProps) {
  const md = useBreakpoint(BREAKPOINTS.md);

  const visiblePages = md ? 5 : 3;
  const showEllipsis = currentPage + 3 < totalNumberOfPages;
  const showFarJumpButton = currentPage + 2 < totalNumberOfPages;
  const farJumpButtonCount =
    currentPage + 10 < totalNumberOfPages
      ? currentPage + 10
      : totalNumberOfPages;

  let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let end = Math.min(
    totalNumberOfPages,
    currentPage + Math.floor(visiblePages / 2)
  );

  if (end - start + 1 < visiblePages) {
    if (start === 1)
      end = Math.min(totalNumberOfPages, start + visiblePages - 1);
    else start = Math.max(1, end - visiblePages + 1);
  }

  const buttonCounts = new Array(end - start + 1)
    .fill("")
    .map((_, index) => start + index);

  const handlePrevious = () => currentPage > 1 && changePage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalNumberOfPages && changePage(currentPage + 1);
  const handlePageChange = (pageNumber: number) => changePage(pageNumber);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isOnlyIcon={!md}
            disabled={currentPage === 1}
            onClick={handlePrevious}
          />
        </PaginationItem>

        {buttonCounts.map((button) => (
          <PaginationItem key={button}>
            <PaginationButton
              isActive={button === currentPage}
              onClick={() => handlePageChange(button)}
            >
              {button}
            </PaginationButton>
          </PaginationItem>
        ))}

        {showEllipsis && <PaginationEllipsis />}
        {showFarJumpButton && (
          <PaginationItem>
            <PaginationButton onClick={() => handlePageChange(currentPage + 2)}>
              {farJumpButtonCount}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            isOnlyIcon={!md}
            disabled={currentPage === totalNumberOfPages}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { ProductsPagination as Pagination };
