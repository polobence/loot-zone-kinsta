import styled from "@emotion/styled";

const FooterWrapper = styled.footer`
  margin-top: 4rem;
  padding: 1rem;
  background-color: #1e1e2f;
  color: #ccc;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h4`
  color: #fff;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: #6c5ce7;
  }
`;

const BottomBar = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  border-top: 1px solid #333;
  padding-top: 1rem;
`;

export function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <Column>
          <Title>LootZone</Title>
          <p>Premium gaming accessories for every setup.</p>
        </Column>

        <Column>
          <Title>Shop</Title>
          <Link href="/products">All Products</Link>
          <Link href="/cart">Cart</Link>
        </Column>

        <Column>
          <Title>Account</Title>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </Column>

        <Column>
          <Title>Support</Title>
          <Link href="#">Contact</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Terms</Link>
        </Column>
      </FooterContent>

      <BottomBar>© {new Date().getFullYear()} LootZone. All rights reserved.</BottomBar>
    </FooterWrapper>
  );
}
