import { Routes, Route, Navigate } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";
import { Layout } from "./components/layout/Layout";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuth } from "./context/auth/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
