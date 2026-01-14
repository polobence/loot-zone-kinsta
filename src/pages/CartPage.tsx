import { useCart } from "../context/useCart";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) return <p>Your cart is empty</p>;

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
