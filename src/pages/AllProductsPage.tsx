import { ProductList } from "../components/ProductList";
import { useState } from "react";
import { products } from "../data/products";
import { PageSizeSelect } from "../components/PageSizeSelect";
import { Pagination } from "../components/Pagination";
import { CategoryFilter } from "../components/CategoryFilter";

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

      <PageSizeSelect
        value={pageSize}
        onChange={(value) => {
          setPageSize(value);
          setCurrentPage(1);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
      />

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      />

      <ProductList products={currentProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
      />
    </>
  );
}
