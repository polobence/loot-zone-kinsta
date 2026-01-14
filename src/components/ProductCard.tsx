import styled from "@emotion/styled";
import { Card, Button } from "@kinsta/stratus";
import type { Product } from "../types/Product";
import { useCart } from "../context/cart/useCart";

const StyledCard = styled(Card)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #000;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <StyledCard>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <Button onClick={() => addToCart(product)}>Add to cart</Button>
    </StyledCard>
  );
}
