import styled from "@emotion/styled";

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  border: 1px solid #6c5ce7;
  background-color: white;
  color: #6c5ce7;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #6c5ce7;
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-weight: 600;
  color: #2d3436;
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
      <PageButton disabled={currentPage === 1} onClick={onPrev}>
        Previous
      </PageButton>

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>

      <PageButton disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </PageButton>
    </PaginationControls>
  );
}
