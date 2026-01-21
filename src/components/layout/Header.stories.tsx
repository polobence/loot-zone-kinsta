import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { AuthContext } from "../../context/auth/AuthContext";
import type { User } from "../../types/User";
import { StratusProvider } from "@kinsta/stratus";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  render: () => (
    <StratusProvider language="en">
      <AuthContext.Provider value={{ user: null, login: () => false, logout: () => {} }}>
        <Header />
      </AuthContext.Provider>
    </StratusProvider>
  ),
};

const mockUser: User = { id: "1", username: "john", email: "john@example.com", password: "1234" };

export const LoggedIn: Story = {
  render: () => (
    <StratusProvider language="en">
      <AuthContext.Provider value={{ user: mockUser, login: () => true, logout: () => {} }}>
        <Header />
      </AuthContext.Provider>
    </StratusProvider>
  ),
};
