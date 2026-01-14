import { StratusProvider } from "@kinsta/stratus";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";

function App() {
  return (
    <StratusProvider language="en">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
        </Routes>
      </BrowserRouter>
    </StratusProvider>
  );
}

export default App;
