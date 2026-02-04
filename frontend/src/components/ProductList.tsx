import styled from "@emotion/styled";
import type { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
