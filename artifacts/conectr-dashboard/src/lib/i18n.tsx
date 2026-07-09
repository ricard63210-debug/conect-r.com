import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "es" | "en";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("lang") as Lang) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const toggle = () => setLang(l => (l === "en" ? "es" : "en"));
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

