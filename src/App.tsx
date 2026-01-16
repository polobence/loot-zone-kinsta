import { Routes, Route, Navigate } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";
import { Layout } from "./components/layout/Layout";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuth } from "./context/auth/useAuth";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
