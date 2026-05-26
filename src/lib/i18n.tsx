import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ky";

type Dict = Record<string, { en: string; ky: string }>;

export const dict: Dict = {
  "nav.learn": { en: "Learn", ky: "Үйрөнүү" },
  "nav.diagnose": { en: "Diagnose", ky: "Диагностика" },
  "nav.market": { en: "Marketplace", ky: "Базар" },
  "brand": { en: "Naryn Bee", ky: "Нарын Аары" },

  "hero.tag": { en: "For beekeepers of Naryn", ky: "Нарындын аарычылары үчүн" },
  "hero.title": { en: "Mountain beekeeping, end to end.", ky: "Тоо аарычылыгы — баштан аяк." },
  "hero.sub": { en: "Learn the craft, diagnose your hives, and sell your honey to the world.", ky: "Кесипти үйрөн, уюгуңду текшер жана балыңды дүйнөгө сат." },
  "hero.startLearn": { en: "Start learning", ky: "Үйрөнүүнү баштоо" },
  "hero.openMarket": { en: "Visit marketplace", ky: "Базарга өтүү" },

  "learn.title": { en: "Beekeeping modules", ky: "Аарычылык сабактары" },
  "learn.sub": { en: "Practical lessons for rural mountain families.", ky: "Тоодогу үй-бүлөлөр үчүн практикалык сабактар." },
  "learn.read": { en: "Read module", ky: "Сабакты окуу" },

  "kit.title": { en: "Starter kit (basic outfit)", ky: "Башталгыч топтом" },
  "kit.sub": { en: "Minimum supplies to begin your first season.", ky: "Биринчи мезгилге керектүү минимум буюмдар." },

  "chat.title": { en: "Ask the bee assistant", ky: "Аары жардамчысынан сура" },
  "chat.sub": { en: "Voice or text, in Kyrgyz or English.", ky: "Үн же текст, кыргызча же англисче." },
  "chat.placeholder": { en: "Type your question…", ky: "Сурооңду жаз…" },
  "chat.send": { en: "Send", ky: "Жөнөтүү" },
  "chat.listen": { en: "Speak", ky: "Сүйлөө" },
  "chat.stop": { en: "Stop", ky: "Токтотуу" },
  "chat.thinking": { en: "Thinking…", ky: "Ойлонуудамын…" },
  "chat.empty": { en: "Ask about pasture, swarming, wintering, or harvesting.", ky: "Жайыт, көчүү, кыштоо же бал жыйноо тууралуу сура." },

  "diag.title": { en: "Hive disease checker", ky: "Уюк ооруларын текшерүү" },
  "diag.sub": { en: "Upload a clear photo of your frame or hive. AI checks for varroa, nosema, chalkbrood, foulbrood and more.", ky: "Алкактын же уюктун ачык сүрөтүн жүктө. Жасалма интеллект варроатоз, нозематоз, аскосфероз, фулбродду текшерет." },
  "diag.upload": { en: "Upload photo", ky: "Сүрөт жүктөө" },
  "diag.analyze": { en: "Analyze hive", ky: "Уюкту талдоо" },
  "diag.analyzing": { en: "Analyzing photo…", ky: "Сүрөт талдалууда…" },
  "diag.result": { en: "Diagnosis", ky: "Диагноз" },
  "diag.remedies": { en: "Natural remedies (honey-safe)", ky: "Табигый дарылоо (балга зыянсыз)" },
  "diag.severity": { en: "Severity", ky: "Оордугу" },
  "diag.disclaimer": { en: "AI guidance only — confirm with a local veterinarian before treatment.", ky: "Жасалма интеллект кеңеши гана — дарылоодон мурун жергиликтүү ветеринар менен текшер." },

  "market.title": { en: "Naryn honey marketplace", ky: "Нарын бал базары" },
  "market.sub": { en: "Connect directly with beekeepers. No middlemen.", ky: "Аарычылар менен түз байланыш. Ортомчулар жок." },
  "market.contact": { en: "Contact beekeeper", ky: "Аарычы менен байланышуу" },
  "market.from": { en: "From", ky: "Кайдан" },
  "market.variety": { en: "Variety", ky: "Түрү" },
  "market.price": { en: "Price", ky: "Баасы" },
  "market.search": { en: "Search honey or village…", ky: "Бал же айыл боюнча издөө…" },

  "common.back": { en: "Back", ky: "Артка" },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => String(k),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Lang) || "en";
  });
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);
  const t = useCallback((k: keyof typeof dict) => dict[k]?.[lang] ?? String(k), [lang]);
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
