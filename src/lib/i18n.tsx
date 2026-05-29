import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ky" | "ru";

type Entry = { en: string; ky: string; ru: string };
type Dict = Record<string, Entry>;

export const dict: Dict = {
  "nav.learn": { en: "Learn", ky: "Үйрөнүү", ru: "Обучение" },
  "nav.diagnose": { en: "Diagnose", ky: "Диагностика", ru: "Диагностика" },
  "nav.market": { en: "Marketplace", ky: "Базар", ru: "Рынок" },
  "brand": { en: "Naryn Bee", ky: "Нарын Аары", ru: "Нарын Би" },

  "hero.tag": { en: "For beekeepers of Naryn", ky: "Нарындын аарычылары үчүн", ru: "Для пчеловодов Нарына" },
  "hero.title": { en: "Mountain beekeeping, end to end.", ky: "Тоо аарычылыгы — баштан аяк.", ru: "Горное пчеловодство — от и до." },
  "hero.sub": { en: "Learn the craft, diagnose your hives, and sell your honey to the world.", ky: "Кесипти үйрөн, уюгуңду текшер жана балыңды дүйнөгө сат.", ru: "Изучайте ремесло, проверяйте ульи и продавайте мёд миру." },
  "hero.startLearn": { en: "Start learning", ky: "Үйрөнүүнү баштоо", ru: "Начать обучение" },
  "hero.openMarket": { en: "Visit marketplace", ky: "Базарга өтүү", ru: "Перейти на рынок" },

  "learn.title": { en: "Beekeeping modules", ky: "Аарычылык сабактары", ru: "Модули пчеловодства" },
  "learn.sub": { en: "Practical lessons for rural mountain families.", ky: "Тоодогу үй-бүлөлөр үчүн практикалык сабактар.", ru: "Практические уроки для сельских горных семей." },
  "learn.read": { en: "Start walkthrough", ky: "Кадам-кадам баштоо", ru: "Начать пошагово" },
  "learn.step": { en: "Step", ky: "Кадам", ru: "Шаг" },
  "learn.of": { en: "of", ky: "—", ru: "из" },
  "learn.next": { en: "Next", ky: "Кийинки", ru: "Дальше" },
  "learn.back": { en: "Back", ky: "Артка", ru: "Назад" },
  "learn.done": { en: "Done", ky: "Бүттү", ru: "Готово" },
  "learn.stepsCount": { en: "steps", ky: "кадам", ru: "шагов" },

  "kit.title": { en: "Starter kit (basic outfit)", ky: "Башталгыч топтом", ru: "Стартовый набор (базовая экипировка)" },
  "kit.sub": { en: "Minimum supplies to begin your first season.", ky: "Биринчи мезгилге керектүү минимум буюмдар.", ru: "Минимум снаряжения для начала первого сезона." },

  "chat.title": { en: "Ask the bee assistant", ky: "Аары жардамчысынан сура", ru: "Спросите пчелиного помощника" },
  "chat.sub": { en: "Voice or text, in Kyrgyz, Russian or English.", ky: "Үн же текст, кыргызча, орусча же англисче.", ru: "Голос или текст, на кыргызском, русском или английском." },
  "chat.placeholder": { en: "Type your question…", ky: "Сурооңду жаз…", ru: "Напишите ваш вопрос…" },
  "chat.send": { en: "Send", ky: "Жөнөтүү", ru: "Отправить" },
  "chat.listen": { en: "Speak", ky: "Сүйлөө", ru: "Говорить" },
  "chat.stop": { en: "Stop", ky: "Токтотуу", ru: "Остановить" },
  "chat.thinking": { en: "Thinking…", ky: "Ойлонуудамын…", ru: "Думаю…" },
  "chat.empty": { en: "Ask about pasture, swarming, wintering, or harvesting.", ky: "Жайыт, көчүү, кыштоо же бал жыйноо тууралуу сура.", ru: "Спросите о пастбище, роении, зимовке или сборе мёда." },

  "diag.title": { en: "Hive disease checker", ky: "Уюк ооруларын текшерүү", ru: "Проверка болезней улья" },
  "diag.sub": { en: "Upload a clear photo of your frame or hive. AI checks for varroa, nosema, chalkbrood, foulbrood and more.", ky: "Алкактын же уюктун ачык сүрөтүн жүктө. Жасалма интеллект варроатоз, нозематоз, аскосфероз, фулбродду текшерет.", ru: "Загрузите чёткое фото рамки или улья. ИИ проверит варроатоз, нозематоз, аскосфероз, гнилец и другие." },
  "diag.upload": { en: "Upload photo", ky: "Сүрөт жүктөө", ru: "Загрузить фото" },
  "diag.analyze": { en: "Analyze hive", ky: "Уюкту талдоо", ru: "Анализировать улей" },
  "diag.analyzing": { en: "Analyzing photo…", ky: "Сүрөт талдалууда…", ru: "Анализ фото…" },
  "diag.result": { en: "Diagnosis", ky: "Диагноз", ru: "Диагноз" },
  "diag.remedies": { en: "Natural remedies (honey-safe)", ky: "Табигый дарылоо (балга зыянсыз)", ru: "Натуральные средства (безопасны для мёда)" },
  "diag.severity": { en: "Severity", ky: "Оордугу", ru: "Степень" },
  "diag.disclaimer": { en: "AI guidance only — confirm with a local veterinarian before treatment.", ky: "Жасалма интеллект кеңеши гана — дарылоодон мурун жергиликтүү ветеринар менен текшер.", ru: "Только рекомендации ИИ — проконсультируйтесь с местным ветеринаром перед лечением." },

  "diag.survey.title": { en: "Symptoms survey", ky: "Симптомдор сурамжылоосу", ru: "Опрос симптомов" },
  "diag.survey.sub": { en: "Tick anything you've noticed. This improves diagnosis accuracy.", ky: "Байкаганыңды белгиле. Бул диагноздун тактыгын жогорулатат.", ru: "Отметьте всё, что заметили. Это улучшит точность диагноза." },
  "diag.survey.notes": { en: "Additional notes (optional)", ky: "Кошумча эскертүүлөр (милдеттүү эмес)", ru: "Дополнительные заметки (необязательно)" },
  "diag.survey.notesPh": { en: "e.g. unusual smell, dead bees at entrance, started 2 weeks ago…", ky: "мис. адаттан тыш жыт, киришинде өлгөн аарылар, 2 жума мурун башталды…", ru: "напр. необычный запах, мёртвые пчёлы у входа, началось 2 недели назад…" },
  "diag.survey.season": { en: "Season", ky: "Мезгил", ru: "Сезон" },
  "diag.survey.season.spring": { en: "Spring", ky: "Жаз", ru: "Весна" },
  "diag.survey.season.summer": { en: "Summer", ky: "Жай", ru: "Лето" },
  "diag.survey.season.autumn": { en: "Autumn", ky: "Күз", ru: "Осень" },
  "diag.survey.season.winter": { en: "Winter", ky: "Кыш", ru: "Зима" },

  "sym.deadBees": { en: "Dead bees in front of the hive", ky: "Уюктун алдында өлгөн аарылар", ru: "Мёртвые пчёлы перед ульем" },
  "sym.crawling": { en: "Crawling bees that can't fly", ky: "Уча албаган сойлогон аарылар", ru: "Пчёлы ползают и не могут летать" },
  "sym.deformedWings": { en: "Deformed or shrivelled wings", ky: "Бүрүшкөн же кемчиликтүү канаттар", ru: "Деформированные или скрученные крылья" },
  "sym.spottedBrood": { en: "Spotty / patchy brood pattern", ky: "Тегиз эмес, тешик курт катмары", ru: "Пёстрый / неровный расплод" },
  "sym.chalkMummies": { en: "White chalky mummies in cells / on bottom board", ky: "Уячаларда же түбүндө ак мумиялар", ru: "Белые меловые мумии в ячейках / на дне" },
  "sym.ropyBrood": { en: "Brood is brown, sunken, ropy or smells bad", ky: "Курт күрөң, чөгүп, чоюлуп, жаман жыттанат", ru: "Расплод бурый, провалившийся, тягучий или плохо пахнет" },
  "sym.diarrhea": { en: "Brown dysentery streaks on hive", ky: "Уюкта күрөң ич өткөк изи", ru: "Бурые полосы поноса на улье" },
  "sym.varrоaMites": { en: "Visible mites on bees or drone brood", ky: "Аарыларда же эркек куртта көрүнгөн кенелер", ru: "Видимые клещи на пчёлах или трутневом расплоде" },
  "sym.weakColony": { en: "Colony is unusually weak or shrinking", ky: "Үй-бүлө алсыз же кичирейүүдө", ru: "Семья необычно слаба или уменьшается" },
  "sym.webbing": { en: "Webbing or tunnels in comb (wax moth)", ky: "Балаарыда жип же туннелдер (мом көпөлөгү)", ru: "Паутина или туннели в сотах (восковая моль)" },
  "sym.noQueen": { en: "No eggs / queen seems missing", ky: "Жумуртка жок / эне аары жок окшойт", ru: "Нет яиц / матки нет" },
  "sym.robbing": { en: "Robbing or fighting at entrance", ky: "Киришинде талап-тоноо же чабышуу", ru: "Воровство или драки у летка" },

  "market.title": { en: "Naryn honey marketplace", ky: "Нарын бал базары", ru: "Рынок мёда Нарына" },
  "market.sub": { en: "Connect directly with beekeepers. No middlemen.", ky: "Аарычылар менен түз байланыш. Ортомчулар жок.", ru: "Связь напрямую с пчеловодами. Без посредников." },
  "market.contact": { en: "Contact beekeeper", ky: "Аарычы менен байланышуу", ru: "Связаться с пчеловодом" },
  "market.from": { en: "From", ky: "Кайдан", ru: "Откуда" },
  "market.variety": { en: "Variety", ky: "Түрү", ru: "Сорт" },
  "market.price": { en: "Price", ky: "Баасы", ru: "Цена" },
  "market.search": { en: "Search honey or village…", ky: "Бал же айыл боюнча издөө…", ru: "Поиск мёда или села…" },
  "market.list": { en: "List your honey", ky: "Балыңды жарыяла", ru: "Разместить мёд" },
  "market.listTitle": { en: "List your honey on the marketplace", ky: "Балыңды базарга кош", ru: "Разместите ваш мёд на рынке" },
  "market.listSub": { en: "Buyers will contact you directly using the details below.", ky: "Сатып алуучулар сени түз байланышат.", ru: "Покупатели свяжутся с вами напрямую." },
  "market.listed": { en: "Your listing is live", ky: "Жарыяң чыкты", ru: "Ваше объявление опубликовано" },
  "market.publish": { en: "Publish listing", ky: "Жарыялоо", ru: "Опубликовать" },
  "market.f.name": { en: "Your name", ky: "Атың", ru: "Ваше имя" },
  "market.f.brand": { en: "Brand / apiary name", ky: "Бренд / уюк аты", ru: "Бренд / название пасеки" },
  "market.f.village": { en: "Village / town", ky: "Айыл / шаар", ru: "Село / город" },
  "market.f.variety": { en: "Honey variety", ky: "Бал түрү", ru: "Сорт мёда" },
  "market.f.description": { en: "Short description", ky: "Кыскача баяндама", ru: "Краткое описание" },
  "market.f.price": { en: "Price (USD per kg, e.g. 25)", ky: "Баасы (USD/кг, мис. 25)", ru: "Цена (USD за кг, напр. 25)" },
  "market.f.email": { en: "Email", ky: "Email", ru: "Эл. почта" },
  "market.f.phone": { en: "Phone", ky: "Телефон", ru: "Телефон" },
  "market.f.whatsapp": { en: "WhatsApp (optional)", ky: "WhatsApp (милдеттүү эмес)", ru: "WhatsApp (необязательно)" },
  "market.f.emoji": { en: "Pick an icon", ky: "Белги тандоо", ru: "Выберите значок" },

  "common.back": { en: "Back", ky: "Артка", ru: "Назад" },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => String(k),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const v = localStorage.getItem("lang") as Lang | null;
    return v === "en" || v === "ky" || v === "ru" ? v : "en";
  });
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);
  const t = useCallback((k: keyof typeof dict) => dict[k]?.[lang] ?? dict[k]?.en ?? String(k), [lang]);
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);

/** USD → KGS rate used for non-English price display. */
export const USD_TO_KGS = 87;

/**
 * Format a price string for display. In English shows USD as entered.
 * In other languages converts to Kyrgyz som. Accepts inputs like
 * "$22 / kg", "22", "25 USD". Falls back to original string if no number found.
 */
export function formatPrice(price: string, lang: Lang): string {
  if (lang === "en") return price;
  const match = price.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return price;
  const usd = parseFloat(match[1].replace(",", "."));
  if (!Number.isFinite(usd)) return price;
  const som = Math.round(usd * USD_TO_KGS);
  const unit = lang === "ru" ? "сом / кг" : "сом / кг";
  return `${som.toLocaleString(lang === "ru" ? "ru-RU" : "ru-RU")} ${unit}`;
}
