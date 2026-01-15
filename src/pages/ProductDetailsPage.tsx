import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { Button } from "@kinsta/stratus";
import styled from "@emotion/styled";
import { useCart } from "../context/cart/useCart";

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

export function ProductDetailsPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <Wrapper>
      <div>
        <Button onClick={() => navigate(-1)}>← Go Back</Button>

        <Image src={product.imageUrl} alt={product.name} />
      </div>

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price.toFixed(2)}</h2>

        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </div>
    </Wrapper>
  );
}
