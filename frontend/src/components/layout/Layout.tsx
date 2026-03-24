import styled from "@emotion/styled";
import { Header } from "./Header";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Stack } from "@kinsta/stratus";

const Main = styled.main`
  min-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Stack gap={50}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Stack>
  );
}
