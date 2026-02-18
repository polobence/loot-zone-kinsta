import { ProductList } from "../components/ProductList";
import { useState, useMemo } from "react";
import { PageSizeSelect } from "../components/PageSizeSelect";
import { Pagination } from "../components/Pagination";
import { CategoryFilter } from "../components/CategoryFilter";
import { SortSelect } from "../components/SortSelect";
import type { SortOption } from "../types/Sort";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";
import type { GetProductsData } from "../types/Product";

export function AllProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<"all" | string>("all");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  const { data, loading, error } = useQuery<GetProductsData>(GET_PRODUCTS);

  const products = data?.products ?? [];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

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

      <SortSelect
        value={sortOption}
        onChange={(value) => {
          setSortOption(value);
          setCurrentPage(1);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      />

      <CategoryFilter
        categories={["all", "keyboard", "mouse", "headset", "controller", "other"]}
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
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      />
    </>
  );
}
