import { useCart } from "../context/cart/useCart";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyMessage = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 4rem;
  color: #6c5ce7;
`;

export function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) return <EmptyMessage>Your cart is empty</EmptyMessage>;

  return (
    <div>
      <h1>Your Cart</h1>
      <List>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            <Button onClick={() => removeFromCart(item.id)}>Remove One</Button>
          </div>
        ))}
      </List>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
}
