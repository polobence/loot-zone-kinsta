import "./App.css";
import { Button, StratusProvider } from "@kinsta/stratus";

function App() {
  return (
    <StratusProvider language="en">
      <Button>Click Me</Button>
    </StratusProvider>
  );
}

export default App;
