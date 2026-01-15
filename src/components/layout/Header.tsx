import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Button } from "@kinsta/stratus";
import { useAuth } from "../../context/auth/useAuth";

const HeaderWrapper = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled(Button)`
  background: none;
  box-shadow: none;
`;

export function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <HeaderInner>
        <strong>Loot Zone</strong>
        <Nav>
          <NavLink to="/">
            <NavButton>All Products</NavButton>
          </NavLink>
          <NavLink to="/cart">
            <NavButton>Cart</NavButton>
          </NavLink>
          {user ? (
            <NavButton onClick={logout}>Logout</NavButton>
          ) : (
            <>
              <NavLink to="/login">
                <NavButton isDisabled={false}>Login</NavButton>
              </NavLink>
              <NavLink to="/register">
                <NavButton isDisabled={false}>Register</NavButton>
              </NavLink>
            </>
          )}
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}
