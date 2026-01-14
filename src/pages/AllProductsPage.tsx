import styled from "@emotion/styled";
import { ProductList } from "../components/ProductList";
import { useState } from "react";
import { products } from "../data/products";

const FilterBar = styled.div`
  display: flex;
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

const categories = ["all", "keyboard", "mouse", "headset", "controller", "other"] as const;

export function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <h1>All Gaming Accessories</h1>

      <FilterBar>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}>
            {category.toUpperCase()}
          </FilterButton>
        ))}
      </FilterBar>

      <ProductList products={filteredProducts} />
    </>
  );
}
