import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@kinsta/stratus";
import styled from "@emotion/styled";
import { useCart } from "../context/cart/useCart";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT } from "../graphql/queries";
import type { GetProductData } from "../types/Product";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const BackButton = styled(Button)`
  margin-bottom: 1rem;
`;

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productIdInt = parseInt(productId ?? "0");

  const { data, loading, error } = useQuery<GetProductData>(GET_PRODUCT, {
    variables: { id: productIdInt },
  });

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;
  if (!data?.product) return <h2>Product not found</h2>;

  const product = data.product;

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <Wrapper>
      <div>
        <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>

        <Image src={product.imageUrl} alt={product.name} />
      </div>

      <div>
        <h1>{product.name}</h1>
        <p>{product.details}</p>
        <h2>${product.price.toFixed(2)}</h2>

        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </div>
    </Wrapper>
  );
}
