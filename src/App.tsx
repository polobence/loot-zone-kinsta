import { Routes, Route } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
