import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPrev: () => {},
    onNext: () => {},
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPrev: () => {},
    onNext: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPrev: () => {},
    onNext: () => {},
  },
};

export const SinglePageHidden: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPrev: () => {},
    onNext: () => {},
  },
};

function InteractiveComponent(args: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      {...args}
      currentPage={page}
      onPrev={() => setPage((p) => Math.max(1, p - 1))}
      onNext={() => setPage((p) => Math.min(args.totalPages, p + 1))}
    />
  );
}

export const Interactive: Story = {
  render: (args) => <InteractiveComponent {...args} />,
  args: {
    totalPages: 7,
  },
};
