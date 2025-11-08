import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { ThemeProvider } from "./components/theme-provider";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ssm-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
