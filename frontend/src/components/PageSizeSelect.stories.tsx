import type { Meta, StoryObj } from "@storybook/react";
import { PageSizeSelect } from "./PageSizeSelect";
import { useState } from "react";

const PageSizeSelectWrapper = () => {
  const [value, setValue] = useState(10);

  return <PageSizeSelect value={value} onChange={setValue} />;
};

const meta: Meta<typeof PageSizeSelect> = {
  title: "Components/PageSizeSelect",
  component: PageSizeSelect,
};

export default meta;

type Story = StoryObj<typeof PageSizeSelect>;

export const Default: Story = {
  render: () => <PageSizeSelectWrapper />,
};

export const InitialValue10: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
};

export const InitialValue20: Story = {
  args: {
    value: 20,
    onChange: () => {},
  },
};

export const InitialValue30: Story = {
  args: {
    value: 30,
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
};

const InteractiveWrapper = () => {
  const [value, setValue] = useState(10);
  return (
    <div>
      <PageSizeSelect value={value} onChange={setValue} />
      <p style={{ marginTop: "1rem" }}>Selected: {value} products per page</p>
    </div>
  );
};
