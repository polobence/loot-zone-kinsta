import type { Meta, StoryObj } from "@storybook/react";
import { CategoryFilter } from "./CategoryFilter";
import { useState } from "react";

type Category = "all" | "mouse" | "keyboard" | "headset";

const CategoryFilterWrapper = () => {
  const [selected, setSelected] = useState<Category>("all");
  const categories: readonly Category[] = ["all", "mouse", "keyboard", "headset"];

  return <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />;
};

const meta: Meta<typeof CategoryFilter> = {
  title: "Components/CategoryFilter",
  component: CategoryFilter,
};

export default meta;

type Story = StoryObj<typeof CategoryFilter>;

export const Default: Story = {
  render: () => <CategoryFilterWrapper />,
};

const TwoCategoriesWrapper = () => {
  const [selected, setSelected] = useState<"electronics" | "accessories">("electronics");
  return (
    <CategoryFilter
      categories={["electronics", "accessories"]}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const TwoCategories: Story = {
  render: () => <TwoCategoriesWrapper />,
};

const ManyCategoriesWrapper = () => {
  const [selected, setSelected] = useState<string>("mouse");
  const categories = ["mouse", "keyboard", "headset", "monitor", "mousepad", "deskmat"] as const;
  return <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />;
};

export const ManyCategories: Story = {
  render: () => <ManyCategoriesWrapper />,
};
