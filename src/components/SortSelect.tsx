import styled from "@emotion/styled";
import type { SortOption } from "../types/Sort";

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`;

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Wrapper>
      <label>
        Sort by:{" "}
        <select value={value} onChange={(e) => onChange(e.target.value as SortOption)}>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
      </label>
    </Wrapper>
  );
}
