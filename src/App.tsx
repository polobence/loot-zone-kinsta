import { Routes, Route } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";
import { Layout } from "./components/layout/Layout";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
