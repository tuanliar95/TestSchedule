import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { Day } from "./components/Day";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{ width: 900, height: 500, padding: 10, border: "1px solid #000" }}
    >
      <Day />
    </div>
  );
}
