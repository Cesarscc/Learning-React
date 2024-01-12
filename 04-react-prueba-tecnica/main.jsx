import { createRoot } from "react-dom/client";
import { App } from "./src/App";

const root = createRoot(document.getElementById("app"));

/*
npm install @vitejs/plugin-react -E
npm install react react-dom -E
npm install standard -D
*/

root.render(<App />);
