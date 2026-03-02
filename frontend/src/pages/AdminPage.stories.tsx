import type { Meta, StoryObj } from "@storybook/react";
import { AdminPage } from "./AdminPage";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { StratusProvider } from "@kinsta/stratus";
import type { User } from "../types/User";

const meta: Meta<typeof AdminPage> = {
  title: "Pages/AdminPage",
  component: AdminPage,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof AdminPage>;

const admin: User = { id: "1", username: "admin", email: "admin@example.com", role: "ADMIN" };

export const Default: Story = {
  render: () => (
    <StratusProvider language="en">
      <AuthContext.Provider
        value={{ user: admin, setUser: () => {}, login: async () => false, logout: () => {} }}>
        <MemoryRouter>
          <AdminPage />
        </MemoryRouter>
      </AuthContext.Provider>
    </StratusProvider>
  ),
};
