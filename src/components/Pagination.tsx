import styled from "@emotion/styled";

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ currentPage, totalPages, onPrev, onNext }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <PaginationControls>
      <button disabled={currentPage === 1} onClick={onPrev}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </button>
    </PaginationControls>
  );
}
