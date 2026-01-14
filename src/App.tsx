import { Routes, Route } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AllProductsPage />} />
    </Routes>
  );
}

export default App;
