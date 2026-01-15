import styled from "@emotion/styled";
import { Card, Button } from "@kinsta/stratus";
import type { Product } from "../types/Product";
import { useCart } from "../context/cart/useCart";
import { useNavigate } from "react-router-dom";

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

const Price = styled.strong`
  font-size: 1.4rem;
  margin-right: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <StyledCard>
      <ProductImage src={product.imageUrl} alt={product.name} />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <Price>${product.price.toFixed(2)}</Price>

      <Actions>
        <Button onClick={() => addToCart(product)}>Add to cart</Button>
        <Button onClick={() => navigate(`/products/${product.id}`)}>Show details</Button>
      </Actions>
    </StyledCard>
  );
}
