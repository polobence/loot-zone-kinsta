import { ProductList } from "../components/ProductList";
import { useState, useMemo, useEffect } from "react";
import { PageSizeSelect } from "../components/PageSizeSelect";
import { Pagination } from "../components/Pagination";
import { CategoryFilter } from "../components/CategoryFilter";
import { SortSelect } from "../components/SortSelect";
import type { SortOption } from "../types/Sort";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";
import type { GetProductsData, GetProductsVariables } from "../types/Product";

export function AllProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<"all" | string>("all");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  const { data, loading, error } = useQuery<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
    variables: {
      page: currentPage,
      pageSize,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      sort: sortOption,
    },
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.products.items ?? [];
  const totalCount = data?.products.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

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

      <ProductList products={products} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      />
    </>
  );
}
