import { requestLngSet } from "@/apis";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LanguageContextType {
  lngSets: DefaultLngSets;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

// Provider 컴포넌트에 children prop 추가
interface LanguageContextProviderProps {
  children: ReactNode;
}

export const LanguageContext = createContext<LanguageContextType>({
  lngSets: {
    dapp_favorite_title: "",
    dapp_favorite_delete: "",
    dapp_favorite_delete_confirm: "",
    dapp_list_title: "",
    go_to_dapp: "",
    button_cancel: "",
    button_confirm: "",
  },
  currentLanguage: "ko",
  setLanguage: () => {},
});

export const LanguageContextProvider = ({
  children,
}: LanguageContextProviderProps) => {
  const validLanguages = ["ko", "en"] as const;

  const isValidLanguage = (lang: string): lang is Language => {
    return validLanguages.includes(lang as Language);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const lngParam = urlParams.get("lng");
  const lng = lngParam && isValidLanguage(lngParam) ? lngParam : "ko";

  const [language, setLanguage] = useState<Language>(lng);
  const [lngSets, setLngSets] = useState<DefaultLngSets>({
    dapp_favorite_title: "",
    dapp_favorite_delete: "",
    dapp_favorite_delete_confirm: "",
    dapp_list_title: "",
    go_to_dapp: "",
    button_cancel: "",
    button_confirm: "",
  });

  useEffect(() => {
    const getLngSet = async () => {
      try {
        const data = await requestLngSet(language);
        if (data) {
          setLngSets(data);
        }
      } catch (e) {
        throw e;
      } finally {
      }
    };
    getLngSet();
  }, [language]);

  const value: LanguageContextType = {
    lngSets,
    currentLanguage: language,
    setLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
