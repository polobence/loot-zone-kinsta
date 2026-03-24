import styled from "@emotion/styled";
import type { SortOption } from "../types/Sort";
import { Select } from "@kinsta/stratus";

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  font-size: 1.5rem;
`;

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Wrapper>
      <label>Sort by:</label>
      <Select value={value} onChange={(value) => onChange(value as SortOption)}>
        <Select.Option value="price-asc">Price: Low → High</Select.Option>
        <Select.Option value="price-desc">Price: High → Low</Select.Option>
        <Select.Option value="name-asc">Name: A → Z</Select.Option>
        <Select.Option value="name-desc">Name: Z → A</Select.Option>
      </Select>
    </Wrapper>
  );
}
