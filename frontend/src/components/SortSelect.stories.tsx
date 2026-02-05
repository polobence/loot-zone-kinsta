import type { Meta, StoryObj } from "@storybook/react";
import { SortSelect } from "./SortSelect";
import type { SortOption } from "../types/Sort";
import { useState } from "react";

const SortSelectWrapper = () => {
  const [value, setValue] = useState<SortOption>("price-asc");

  return (
    <div>
      <SortSelect value={value} onChange={setValue} />
      <p style={{ marginTop: "1rem" }}>Selected sort: {value}</p>
    </div>
  );
};

const meta: Meta<typeof SortSelect> = {
  title: "Components/SortSelect",
  component: SortSelect,
};

export default meta;

type Story = StoryObj<typeof SortSelect>;

export const Default: Story = {
  render: () => <SortSelectWrapper />,
};

export const PriceAscending: Story = {
  args: {
    value: "price-asc",
    onChange: () => {},
  },
};

export const PriceDescending: Story = {
  args: {
    value: "price-desc",
    onChange: () => {},
  },
};

export const NameAscending: Story = {
  args: {
    value: "name-asc",
    onChange: () => {},
  },
};

export const NameDescending: Story = {
  args: {
    value: "name-desc",
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => <SortSelectWrapper />,
};
