import type { Lang } from "@/lib/i18n";

export type Module = {
  id: string;
  icon: string;
  title: { en: string; ky: string };
  summary: { en: string; ky: string };
  body: { en: string; ky: string };
};

export const modules: Module[] = [
  {
    id: "getting-started",
    icon: "🐝",
    title: { en: "Getting started in the mountains", ky: "Тоодо аарычылыкты баштоо" },
    summary: { en: "Site selection, altitude, wind protection.", ky: "Жер тандоо, бийиктик, шамалдан коргоо." },
    body: {
      en: "Choose a sheltered south-facing slope between 1,800–2,400 m. Place hives 30 cm off the ground on wooden stands, with 3–4 m spacing and entrances facing morning sun. Provide fresh water within 100 m and a windbreak (juniper, willow, or a stone wall).",
      ky: "1800–2400 м бийиктикте, түштүккө караган жел тийбеген беттен жер танда. Уюктарды жыгач такта менен жерден 30 см бийик кой, 3–4 м аралыкта жайгаштырып, оозун эртең мененки күнгө каратып. 100 м ичинде таза суу жана шамал тосуу (арча, тал же таш дубал) болсун.",
    },
  },
  {
    id: "hive-setup",
    icon: "📦",
    title: { en: "Hive setup & equipment", ky: "Уюкту жабдуу" },
    summary: { en: "Dadant vs Langstroth, frames, foundation.", ky: "Дадан же Лангстрот, алкактар, негиз." },
    body: {
      en: "Dadant hives suit mountain climates well — thick walls retain heat in cold nights. Start with 1 hive body + 1 super, 10 frames each. Use wax foundation made from local cappings to avoid imported residues. Insulate the inner cover with felt for winters dropping below −25 °C.",
      ky: "Дадан уюгу тоо аба ырайына ылайык — калың дубалы суук түндөрдө жылуулукту сактайт. 1 негизги корпус + 1 магазин, ар бирине 10 алкак менен башта. Жергиликтүү момдон жасалган негизди колдон. Кышы −25 °C түшсө, ички капкакты кийиз менен жылыт.",
    },
  },
  {
    id: "seasons",
    icon: "🌸",
    title: { en: "Seasonal calendar for Naryn", ky: "Нарындын мезгилдик календары" },
    summary: { en: "What to do in each month, from May to October.", ky: "Май-октябрда айлык иштер." },
    body: {
      en: "Late April–May: spring inspection, feed if stores < 4 kg. June: super-up before alpine flow. July–August: main flow from esparcet, clover, and alpine herbs — extract once frames are 75% capped. September: requeen weak colonies, treat for varroa. October–March: wrap hives, ensure 18–22 kg of stores per colony.",
      ky: "Апрелдин аягы–май: жазгы текшерүү, кампасы 4 кгдан аз болсо тоюттан. Июнь: тоо чөбү башталганча магазинди кой. Июль–август: эспарцет, беде, тоо чөбү — алкактар 75% жабылганда жыйна. Сентябрь: алсыз уяларга жаңы эне, варроага каршы дары. Октябрь–март: уюкту орот, ар уяга 18–22 кг кампа калтыр.",
    },
  },
  {
    id: "wintering",
    icon: "❄️",
    title: { en: "Wintering at altitude", ky: "Бийикте кыштатуу" },
    summary: { en: "Surviving Naryn winters down to −30 °C.", ky: "−30 °C чейинки кышты өткөрүү." },
    body: {
      en: "Reduce entrances to 2 cm. Add upper ventilation to prevent condensation. Cluster on 6–8 frames maximum. Avoid disturbing hives between November and February. Provide candy boards by late January as emergency feed.",
      ky: "Оозун 2 смге чейин кыскарт. Жогорудан желдетүүнү кой — нымдан сактайт. Аарыларды 6–8 алкакка чогулт. Ноябрь–февраль арасында уюкту мазалаба. Январдын аягында тоют катары момдуу шекер тактасын кой.",
    },
  },
  {
    id: "honey-quality",
    icon: "🍯",
    title: { en: "Honey quality for export", ky: "Экспорт үчүн бал сапаты" },
    summary: { en: "HMF, moisture, residues — meeting EU & GCC standards.", ky: "HMF, нымдуулук, калдыктар — ЕБ жана GCC талаптары." },
    body: {
      en: "Harvest only capped frames. Keep extraction room below 35 °C to preserve enzymes. Filter through 200-micron mesh, not heat. Store in food-grade stainless steel at 14–18 °C. Test moisture < 18% with a refractometer. Avoid synthetic miticides 8 weeks before flow.",
      ky: "Жабылган алкактарды гана жыйна. Бөлмө 35 °C ылдый болсун, ферменттер сакталат. 200 микрон электен өткөр, ысытпа. Тамак-аштык тот баспас идиште 14–18 °C сакта. Нымдуулук < 18% болушун рефрактометр менен текшер. Чөп чыкканга 8 жума калганда химиялык дарыларды колдонбо.",
    },
  },
  {
    id: "selling",
    icon: "🌍",
    title: { en: "Selling your honey abroad", ky: "Балды чет өлкөгө сатуу" },
    summary: { en: "Branding, certification, shipping basics.", ky: "Бренд, сертификат, жөнөтүү." },
    body: {
      en: "Register a simple brand (village + family name works). Get laboratory analysis from Bishkek (ISO 17025 lab). For EU buyers, pursue organic certification through Bio.KG. Ship in 1 kg glass jars or 25 kg food-grade buckets; use Kyrgyz Post EMS or Asia Logistics for first orders.",
      ky: "Жөнөкөй бренд кат — айыл + үй-бүлө аты. Бишкектеги ISO 17025 лабораториядан анализ ал. ЕБ үчүн Bio.KG аркылуу органикалык сертификат ал. 1 кг айнек банкаларда же 25 кг чакага сал; биринчи буюртмаларга Kyrgyz Post EMS же Asia Logistics.",
    },
  },
];

export const starterKit: { id: string; icon: string; name: { en: string; ky: string }; price: string; note: { en: string; ky: string } }[] = [
  { id: "suit", icon: "👨‍🚀", name: { en: "Beekeeper suit with veil", ky: "Бет жабуусу менен костюм" }, price: "$45", note: { en: "Cotton, ventilated, full-zip", ky: "Пахта, желдетилген, толук сыдырмалуу" } },
  { id: "gloves", icon: "🧤", name: { en: "Leather gloves", ky: "Булгаары кол кап" }, price: "$12", note: { en: "Soft goatskin with long cuff", ky: "Жумшак эчки териси, узун манжет" } },
  { id: "smoker", icon: "💨", name: { en: "Stainless-steel smoker", ky: "Түтүн чыгаргыч" }, price: "$25", note: { en: "Bellows + heat shield", ky: "Үрлөгүч + жылуу калканы" } },
  { id: "tool", icon: "🪛", name: { en: "Hive tool (J-hook)", ky: "Уюк аспабы (J-илмек)" }, price: "$8", note: { en: "Pry & frame lifter in one", ky: "Ачкыч жана алкак көтөргүч" } },
  { id: "brush", icon: "🪶", name: { en: "Soft bee brush", ky: "Жумшак чөтөк" }, price: "$5", note: { en: "Horsehair, gentle on bees", ky: "Жылкы кылы, аарыга жумшак" } },
  { id: "feeder", icon: "🥣", name: { en: "Frame feeder", ky: "Алкак тоюткуч" }, price: "$10", note: { en: "For spring sugar syrup", ky: "Жазгы шекер сироп үчүн" } },
];

export const tr = <T,>(obj: { en: T; ky: T }, lang: Lang): T => obj[lang];
