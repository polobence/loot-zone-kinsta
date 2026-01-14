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

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const categories = ["all", "keyboard", "mouse", "headset", "controller", "other"] as const;

export function AllProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <h1>All Gaming Accessories</h1>

      <label>
        Products per page:{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </label>

      <PaginationControls>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </button>
      </PaginationControls>

      <FilterBar>
        {categories.map((category) => (
          <FilterButton
            key={category}
            isActive={selectedCategory === category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}>
            {category.toUpperCase()}
          </FilterButton>
        ))}
      </FilterBar>

      <ProductList products={currentProducts} />
    </>
  );
}
