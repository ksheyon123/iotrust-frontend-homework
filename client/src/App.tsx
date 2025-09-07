import React from "react";
import "@/index.css";
import Discovery from "./pages/Discovery";
import { LanguageContextProvider } from "./contexts/LanguageContext";
import Test from "./pages/Test";
import { ModalContextProvider } from "./contexts/ModalContext";

const App: React.FC = () => {
  return (
    <LanguageContextProvider>
      <ModalContextProvider>
        <Discovery />
      </ModalContextProvider>
    </LanguageContextProvider>
  );
};

export default App;
