import React from "react";
import "@/index.css";
import Discovery from "./pages/Discovery";
import { LanguageContextProvider } from "./contexts/LanguageContext";

const App: React.FC = () => {
  return (
    <LanguageContextProvider>
      <Discovery />
    </LanguageContextProvider>
  );
};

export default App;
