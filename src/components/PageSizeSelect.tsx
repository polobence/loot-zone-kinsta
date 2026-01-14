import styled from "@emotion/styled";

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

interface PageSizeSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <Label>
      Products per page:
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </Label>
  );
}
