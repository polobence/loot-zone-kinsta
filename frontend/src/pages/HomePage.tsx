import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 6rem auto;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #6c5ce7;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>Welcome to Loot Zone 🎮</Title>

      <Description>
        Loot Zone is your one-stop shop for premium gaming accessories. Browse keyboards, mice,
        headsets, controllers and more — built for gamers, by gamers.
      </Description>

      <Button onClick={() => navigate("/products")}>Browse All Products</Button>
    </Wrapper>
  );
}
