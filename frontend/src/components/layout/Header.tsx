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

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BrandName = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #6c5ce7;
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  height: 40px;
  cursor: pointer;
`;

export function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoLink to="/">
          <Brand>
            <LogoImage src="/favicon.ico" alt="" />
            <BrandName>Loot Zone</BrandName>
          </Brand>
        </LogoLink>

        <Nav>
          <NavLink to="/products">
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
                <NavButton>Login</NavButton>
              </NavLink>
              <NavLink to="/register">
                <NavButton>Register</NavButton>
              </NavLink>
            </>
          )}
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}
