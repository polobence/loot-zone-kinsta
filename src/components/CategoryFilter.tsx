import styled from "@emotion/styled";

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: ${({ isActive }) => (isActive ? "#6c5ce7" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #6c5ce7;
    color: white;
  }
`;

interface CategoryFilterProps<T extends string> {
  categories: readonly T[];
  selected: T;
  onSelect: (category: T) => void;
}

export function CategoryFilter<T extends string>({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps<T>) {
  return (
    <FilterBar>
      {categories.map((category) => (
        <FilterButton
          key={category}
          isActive={selected === category}
          onClick={() => onSelect(category)}>
          {category.toUpperCase()}
        </FilterButton>
      ))}
    </FilterBar>
  );
}
