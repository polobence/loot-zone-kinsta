import styled from "@emotion/styled";
import { Select } from "@kinsta/stratus";

const Label = styled.label`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

interface PageSizeSelectProps {
  value: number;
  onChange: (value: string) => void;
}

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <Label>
      Products per page:
      <Select value={String(value)} onChange={onChange}>
        <Select.Option value="10">10</Select.Option>
        <Select.Option value="20">20</Select.Option>
        <Select.Option value="30">30</Select.Option>
      </Select>
    </Label>
  );
}
