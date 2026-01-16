import { useCart } from "../context/cart/useCart";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";

export const PageWrapper = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f7f7ff;
  border: 1px solid #ddd;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ItemName = styled.strong`
  font-size: 1.1rem;
`;

export const ItemPrice = styled.span`
  color: #555;
`;

export const Quantity = styled.span`
  font-weight: bold;
`;

export const Summary = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
`;

export const Total = styled(SummaryRow)`
  font-weight: bold;
  font-size: 1.3rem;
  color: #6c5ce7;
`;

export const EmptyMessage = styled.div`
  margin-top: 5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #6c5ce7;
`;

export function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <EmptyMessage>Your cart is empty 🛒</EmptyMessage>;
  }

  return (
    <PageWrapper>
      <Title>Your Cart</Title>

      <CartList>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
            </ItemInfo>

            <Quantity>x {item.quantity}</Quantity>

            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </CartItem>
        ))}
      </CartList>

      <Summary>
        <SummaryRow>
          <span>Total items</span>
          <span>{totalItems}</span>
        </SummaryRow>

        <Total>
          <span>Total price</span>
          <span>${totalPrice.toFixed(2)}</span>
        </Total>

        <Button onClick={clearCart}>Clear Cart</Button>
      </Summary>
    </PageWrapper>
  );
}
