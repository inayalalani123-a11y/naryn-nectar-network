import type { Lang } from "@/lib/i18n";

// Step images
import gs1 from "@/assets/learn/getting-started/1.jpg";
import gs2 from "@/assets/learn/getting-started/2.jpg";
import gs3 from "@/assets/learn/getting-started/3.jpg";
import gs4 from "@/assets/learn/getting-started/4.jpg";
import hs1 from "@/assets/learn/hive-setup/1.jpg";
import hs2 from "@/assets/learn/hive-setup/2.jpg";
import hs3 from "@/assets/learn/hive-setup/3.jpg";
import hs4 from "@/assets/learn/hive-setup/4.jpg";
import se1 from "@/assets/learn/seasons/1.jpg";
import se2 from "@/assets/learn/seasons/2.jpg";
import se3 from "@/assets/learn/seasons/3.jpg";
import se4 from "@/assets/learn/seasons/4.jpg";
import se5 from "@/assets/learn/seasons/5.jpg";
import wi1 from "@/assets/learn/wintering/1.jpg";
import wi2 from "@/assets/learn/wintering/2.jpg";
import wi3 from "@/assets/learn/wintering/3.jpg";
import wi4 from "@/assets/learn/wintering/4.jpg";
import hq1 from "@/assets/learn/honey-quality/1.jpg";
import hq2 from "@/assets/learn/honey-quality/2.jpg";
import hq3 from "@/assets/learn/honey-quality/3.jpg";
import hq4 from "@/assets/learn/honey-quality/4.jpg";
import hq5 from "@/assets/learn/honey-quality/5.jpg";
import sl1 from "@/assets/learn/selling/1.jpg";
import sl2 from "@/assets/learn/selling/2.jpg";
import sl3 from "@/assets/learn/selling/3.jpg";
import sl4 from "@/assets/learn/selling/4.jpg";
import sl5 from "@/assets/learn/selling/5.jpg";

type Bi = { en: string; ky: string };

export type ModuleStep = {
  title: Bi;
  body: Bi;
  image: string;
  imageAlt: Bi;
  caption?: Bi;
};

export type Module = {
  id: string;
  icon: string;
  title: Bi;
  summary: Bi;
  body: Bi;
  steps: ModuleStep[];
};

export const modules: Module[] = [
  {
    id: "getting-started",
    icon: "🐝",
    title: { en: "Getting started in the mountains", ky: "Тоодо аарычылыкты баштоо" },
    summary: { en: "Site selection, altitude, wind protection.", ky: "Жер тандоо, бийиктик, шамалдан коргоо." },
    body: {
      en: "Choose a sheltered south-facing slope between 1,800–2,400 m.",
      ky: "1800–2400 м бийиктикте, түштүккө караган беттен жер танда.",
    },
    steps: [
      {
        title: { en: "1. Survey the site", ky: "1. Жерди карап чык" },
        body: {
          en: "Walk the land in late morning. Look for a gentle south-facing slope, sheltered from north winds, with native flowering plants nearby (esparcet, clover, juniper). Avoid frost pockets at the valley bottom.",
          ky: "Эртең мененки убакта жерди айланып чык. Түштүккө караган, түндүк шамалынан корголгон, жанында чөп-чарбасы (эспарцет, беде, арча) бар жумшак бетти изде. Өрөөндүн түбүндөгү аяздуу жерлерден алыс бол.",
        },
        image: gs1,
        imageAlt: { en: "Alpine slope in Naryn", ky: "Нарындын тоо беттери" },
        caption: { en: "Tip: morning sun warms the cluster fastest.", ky: "Кеңеш: эртең мененки күн уюкту тез жылытат." },
      },
      {
        title: { en: "2. Pick the altitude", ky: "2. Бийиктикти танда" },
        body: {
          en: "Aim for 1,800–2,400 m. Below 1,800 m summers can be too dry; above 2,400 m the season is too short. Mark the spot where the sun first hits each morning — that is where the hive entrance should face.",
          ky: "1800–2400 м тандап ал. 1800 м төмөн жайы кургак, 2400 м жогору мезгил кыска. Күн эртең менен биринчи тийген жерди белгиле — уюктун оозу ошол жакка караш керек.",
        },
        image: gs2,
        imageAlt: { en: "Altitude band diagram", ky: "Бийиктик схемасы" },
      },
      {
        title: { en: "3. Build the windbreak", ky: "3. Шамал тосуу" },
        body: {
          en: "Behind the hives, plant juniper or willow, or build a low dry-stone wall (1–1.5 m). This breaks cold winds and prevents the cluster from losing heat in winter.",
          ky: "Уюктардын артына арча же тал тиг, же 1–1,5 м бийик таш дубал сал. Бул муздак шамалды бөгөйт жана кышында уюктун жылуулугун сактайт.",
        },
        image: gs3,
        imageAlt: { en: "Stone-wall windbreak with juniper", ky: "Арча менен таш дубал" },
      },
      {
        title: { en: "4. Water & spacing", ky: "4. Суу жана аралык" },
        body: {
          en: "Place hives 3–4 m apart on wooden stands 30 cm off the ground. Ensure a clean water source (stream, trough with floating wood) is within 100 m so bees don't waste energy searching.",
          ky: "Уюктарды жыгач такта менен жерден 30 см бийик, бири-биринен 3–4 м аралыкта кой. 100 м ичинде таза суу (булак, калкып турган жыгачы бар идиш) болсун — аарылар күчүн коротпойт.",
        },
        image: gs4,
        imageAlt: { en: "Apiary layout from above", ky: "Уя жайгашуусу" },
      },
    ],
  },
  {
    id: "hive-setup",
    icon: "📦",
    title: { en: "Hive setup & equipment", ky: "Уюкту жабдуу" },
    summary: { en: "Dadant vs Langstroth, frames, foundation.", ky: "Дадан же Лангстрот, алкактар, негиз." },
    body: { en: "Dadant hives suit mountain climates well.", ky: "Дадан уюгу тоо аба ырайына ылайык." },
    steps: [
      {
        title: { en: "1. Choose a Dadant hive", ky: "1. Дадан уюгун танда" },
        body: {
          en: "For Naryn, Dadant hives are best — thick wooden walls (35 mm+) hold heat in cold nights. Start with one brood box plus one super, each holding 10 frames.",
          ky: "Нарын үчүн Дадан уюгу эң ылайыктуу — калың (35 мм+) жыгач дубалы суук түндөрдө жылуулукту сактайт. Бир негизги корпус жана бир магазин менен башта, ар бирине 10 алкак.",
        },
        image: hs1,
        imageAlt: { en: "Traditional Dadant hive", ky: "Дадан уюгу" },
      },
      {
        title: { en: "2. Frames & foundation", ky: "2. Алкак жана негиз" },
        body: {
          en: "Use wax foundation pressed from your own cappings or from a trusted local supplier. Imported foundation can carry chemical residues that hurt export quality.",
          ky: "Өзүңдүн момуңдан же ишенимдүү жергиликтүү сатуучудан алынган негизди колдон. Чет өлкөнүн негизинде химиялык калдыктар болот, экспортко жарабайт.",
        },
        image: hs2,
        imageAlt: { en: "Wax foundation on a frame", ky: "Алкактагы момдуу негиз" },
      },
      {
        title: { en: "3. Stand & placement", ky: "3. Такта жана жайгашуу" },
        body: {
          en: "Set each hive on a sturdy wooden stand 30 cm off the ground. Tilt the hive 1–2° forward so rainwater drains out. Entrance faces morning sun (east / south-east).",
          ky: "Ар бир уюкту бекем жыгач тактага 30 см бийикте кой. Жамгыр суу агып кетсин үчүн алдыга 1–2° кыйшайт. Оозу эртең мененки күнгө (чыгышка / түштүк-чыгышка) карасын.",
        },
        image: hs3,
        imageAlt: { en: "Hive on a wooden stand diagram", ky: "Тактадагы уюк схемасы" },
      },
      {
        title: { en: "4. Insulate for winter", ky: "4. Кышка жылыт" },
        body: {
          en: "Add a 3–5 cm felt or wool pad above the inner cover. This prevents condensation dripping back on the cluster when night temps drop below −25 °C.",
          ky: "Ички капкактын үстүнө 3–5 см кийиз же жүн төшө. Түнү −25 °C түшкөндө бул нымдын аарыларга тамчылашынан сактайт.",
        },
        image: hs4,
        imageAlt: { en: "Winter insulation cutaway", ky: "Кышкы жылытуу" },
      },
    ],
  },
  {
    id: "seasons",
    icon: "🌸",
    title: { en: "Seasonal calendar for Naryn", ky: "Нарындын мезгилдик календары" },
    summary: { en: "What to do in each month, from May to October.", ky: "Май-октябрда айлык иштер." },
    body: { en: "Late April–May: spring inspection.", ky: "Апрель-май: жазгы текшерүү." },
    steps: [
      {
        title: { en: "Spring (Apr–May)", ky: "Жаз (апрель–май)" },
        body: {
          en: "First warm day above 12 °C: open the hive briefly. Check the queen, brood pattern, and stores. If less than 4 kg of honey remains, feed 1:1 sugar syrup.",
          ky: "12 °C ашкан биринчи жылуу күнү уюкту кыска ач. Энени, курттун катмарын, тоютту текшер. 4 кг балдан аз калса, 1:1 шекер сироп бер.",
        },
        image: se1,
        imageAlt: { en: "Spring inspection", ky: "Жазгы текшерүү" },
      },
      {
        title: { en: "Early summer (Jun)", ky: "Эрте жай (июнь)" },
        body: {
          en: "Alpine flow begins. Add the super before the brood box is full to prevent swarming. Watch for queen cells every 7–9 days.",
          ky: "Тоо чөбү башталат. Курт уячасы толгончо магазинди кой — көчүүнүн алдын алат. 7–9 күн сайын эне уячаларын карап тур.",
        },
        image: se2,
        imageAlt: { en: "Alpine pasture in bloom", ky: "Гүлдөгөн тоо жайыты" },
      },
      {
        title: { en: "Main flow (Jul–Aug)", ky: "Башкы агым (июль–август)" },
        body: {
          en: "Esparcet, clover, and alpine herbs all flower. Harvest frames only when at least 75% of cells are capped. Extract in batches; do not break the queen's rhythm.",
          ky: "Эспарцет, беде, тоо чөбү гүлдөйт. Алкактардын 75% жабылганда гана жыйна. Бөлүп-бөлүп ал; эненин ритмин бузба.",
        },
        image: se3,
        imageAlt: { en: "Capped honey frame", ky: "Жабылган бал алкагы" },
      },
      {
        title: { en: "Autumn (Sep)", ky: "Күз (сентябрь)" },
        body: {
          en: "Requeen weak colonies with this year's young queens. Treat for varroa using oxalic acid vapour or thymol — both honey-safe when applied after the last harvest.",
          ky: "Алсыз үй-бүлөлөргө ушул жылдын жаш энесин кой. Варроага каршы оксалик кислота буусу же тимол колдон — экөө тең акыркы жыйноодон кийин балга зыянсыз.",
        },
        image: se4,
        imageAlt: { en: "Autumn varroa treatment", ky: "Күзгү варроа дарылоо" },
      },
      {
        title: { en: "Winter prep (Oct–Mar)", ky: "Кышка даярдык (окт–март)" },
        body: {
          en: "Wrap hives with insulation. Ensure each colony has 18–22 kg of stores. Reduce entrances. Do not open the hive between November and February.",
          ky: "Уюктарды жылытуу менен орот. Ар бир үй-бүлөдө 18–22 кг тоют болсун. Ооздорун кыскарт. Ноябрь–февраль арасында уюкту ачпа.",
        },
        image: se5,
        imageAlt: { en: "Wrapped hives in winter", ky: "Кышта оролгон уюктар" },
      },
    ],
  },
  {
    id: "wintering",
    icon: "❄️",
    title: { en: "Wintering at altitude", ky: "Бийикте кыштатуу" },
    summary: { en: "Surviving Naryn winters down to −30 °C.", ky: "−30 °C чейинки кышты өткөрүү." },
    body: { en: "Reduce entrances to 2 cm.", ky: "Оозун 2 смге кыскарт." },
    steps: [
      {
        title: { en: "1. Reduce the entrance", ky: "1. Оозун кыскарт" },
        body: {
          en: "Narrow the entrance to about 2 cm wide. This keeps mice out and prevents cold drafts from chilling the cluster.",
          ky: "Оозун болжол менен 2 смге чейин кыскарт. Бул чычкандардан жана муздак шамалдан коргойт.",
        },
        image: wi1,
        imageAlt: { en: "Entrance reducer diagram", ky: "Ооз кыскарткыч схемасы" },
      },
      {
        title: { en: "2. Add upper ventilation", ky: "2. Жогору желдетүү" },
        body: {
          en: "Drill a small hole in the upper box or prop the inner cover with a matchstick. Warm moist air escapes upward — without this, water drips back onto the bees and kills them.",
          ky: "Жогорку корпуска кичинекей тешик ач же ички капкакты ширеңке менен бир аз көтөр. Жылуу нымдуу аба жогору чыгат — болбосо суу аарыга тамчылап, өлтүрөт.",
        },
        image: wi2,
        imageAlt: { en: "Ventilation airflow diagram", ky: "Желдетүү схемасы" },
      },
      {
        title: { en: "3. Cluster sizing", ky: "3. Уюк көлөмү" },
        body: {
          en: "A healthy winter colony covers 6–8 frames. Remove empty frames and use a follower board so the bees don't have to heat empty space.",
          ky: "Соо кышкы үй-бүлө 6–8 алкакты ээлейт. Бош алкактарды чыгар жана чектегич такта кой — аарылар бош жерди жылытпасын.",
        },
        image: wi3,
        imageAlt: { en: "Winter cluster on frames", ky: "Кышкы аары тобу" },
      },
      {
        title: { en: "4. Emergency candy boards", ky: "4. Шекер тактасы" },
        body: {
          en: "By late January, place a sugar candy board on top of the frames. It saves colonies that ran low on honey before spring flowers arrive.",
          ky: "Январдын аягында алкактардын үстүнө шекер тактасын кой. Жазгы гүлдөргө чейин балы азайган үй-бүлөлөрдү сактайт.",
        },
        image: wi4,
        imageAlt: { en: "Candy board on top of frames", ky: "Алкактардын үстүндөгү шекер тактасы" },
      },
    ],
  },
  {
    id: "honey-quality",
    icon: "🍯",
    title: { en: "Honey quality for export", ky: "Экспорт үчүн бал сапаты" },
    summary: { en: "HMF, moisture, residues — meeting EU & GCC standards.", ky: "HMF, нымдуулук, калдыктар." },
    body: { en: "Harvest only capped frames.", ky: "Жабылган алкактарды гана жыйна." },
    steps: [
      {
        title: { en: "1. Harvest timing", ky: "1. Жыйноо убактысы" },
        body: {
          en: "Hold the frame up to the sun. Only harvest when at least 75% of cells are sealed with white wax cappings. Uncapped honey has too much water and ferments.",
          ky: "Алкакты күнгө кар. Уячалардын 75% ак мом менен жабылгандан кийин гана жыйна. Жабылбаган бал нымы көп, ачыйт.",
        },
        image: hq1,
        imageAlt: { en: "Fully capped honey frame", ky: "Толук жабылган алкак" },
      },
      {
        title: { en: "2. Extraction temperature", ky: "2. Бөлүү температурасы" },
        body: {
          en: "Keep the extraction room below 35 °C. Higher temperatures destroy enzymes and raise HMF — EU buyers reject honey above 40 mg/kg HMF.",
          ky: "Бөлмө 35 °C ылдый болсун. Жогорку температура ферменттерди бузат жана HMFти жогорулатат — ЕБ 40 мг/кг ашкан балды кабыл албайт.",
        },
        image: hq2,
        imageAlt: { en: "Extraction room interior", ky: "Бөлүү бөлмөсү" },
      },
      {
        title: { en: "3. Filter cold", ky: "3. Суук чыпкалоо" },
        body: {
          en: "Pour honey through a 200-micron stainless mesh. Never heat to filter — heating destroys aroma and pollen, the very things that prove your honey is from Naryn.",
          ky: "Балды 200 микрон тот баспас элекке куй. Эч качан чыпкалоо үчүн ысытпа — жыты жана чаңы жоголот, алар сенин балыңдын Нарындыкы экенин далилдейт.",
        },
        image: hq3,
        imageAlt: { en: "Cold-filtering honey", ky: "Суук чыпкалоо" },
      },
      {
        title: { en: "4. Store properly", ky: "4. Туура сакта" },
        body: {
          en: "Use food-grade stainless steel drums or glass. Store at 14–18 °C, away from sunlight. Honey keeps for 2+ years this way without losing grade.",
          ky: "Тамак-аштык тот баспас идиш же айнек колдон. 14–18 °C, күн тийбеген жерде сакта. Бал сапатын жоготпой 2 жылдан ашык турат.",
        },
        image: hq4,
        imageAlt: { en: "Stainless steel storage tanks", ky: "Тот баспас идиштер" },
      },
      {
        title: { en: "5. Lab testing", ky: "5. Лабораториялык текшерүү" },
        body: {
          en: "Once per harvest, send a sample to an ISO 17025 lab in Bishkek. Confirm moisture < 18%, HMF < 15 mg/kg, no antibiotic residues. Keep the report — buyers will ask for it.",
          ky: "Ар жыйноодон кийин Бишкектеги ISO 17025 лабораторияга үлгү жөнөт. Нымдуулук < 18%, HMF < 15 мг/кг, антибиотик калдыгы жок экенин текшер. Отчетту сакта — сатып алуучулар сурайт.",
        },
        image: hq5,
        imageAlt: { en: "Refractometer testing honey", ky: "Рефрактометр" },
      },
    ],
  },
  {
    id: "selling",
    icon: "🌍",
    title: { en: "Selling your honey abroad", ky: "Балды чет өлкөгө сатуу" },
    summary: { en: "Branding, certification, shipping basics.", ky: "Бренд, сертификат, жөнөтүү." },
    body: { en: "Register a simple brand.", ky: "Жөнөкөй бренд кат." },
    steps: [
      {
        title: { en: "1. Build a simple brand", ky: "1. Жөнөкөй бренд жаса" },
        body: {
          en: "Combine your village name + family name + 'Honey'. Add a short story: altitude, flowers, family. Print labels with a Bishkek printer for ~10 KGS per jar.",
          ky: "Айылыңдын аты + үй-бүлөңдүн аты + 'Бал'. Кыска аңгеме жаз: бийиктик, гүлдөр, үй-бүлө. Бишкекте 1 банкага ~10 сом этикетка басып ал.",
        },
        image: sl1,
        imageAlt: { en: "Branded honey jar mockup", ky: "Бренд балы" },
      },
      {
        title: { en: "2. Get lab analysis", ky: "2. Лаборатория анализи" },
        body: {
          en: "Order full panel testing from an ISO 17025 lab in Bishkek (~3,000–5,000 KGS). You'll get a certificate buyers and customs need.",
          ky: "Бишкектеги ISO 17025 лабораториядан толук анализ заказ кыл (~3000–5000 сом). Сатып алуучуга жана бажыга керек сертификат аласың.",
        },
        image: sl2,
        imageAlt: { en: "Lab honey analysis", ky: "Лабораториялык анализ" },
      },
      {
        title: { en: "3. Pursue organic certification", ky: "3. Органикалык сертификат ал" },
        body: {
          en: "Apply through Bio.KG. Inspection covers your apiary, treatments, and surrounding land (no pesticides within 3 km). Adds 30–50% to your selling price.",
          ky: "Bio.KG аркылуу арыз бер. Уяң, дары-дармегиң жана айланасы (3 км ичинде пестициддер жок) текшерилет. Баасы 30–50% жогорулайт.",
        },
        image: sl3,
        imageAlt: { en: "Organic certification document", ky: "Органикалык сертификат" },
      },
      {
        title: { en: "4. Package for shipping", ky: "4. Жөнөтүүгө таңда" },
        body: {
          en: "Use 1 kg glass jars for retail or 25 kg food-grade plastic buckets for wholesale. Wrap each jar in bubble wrap; ship in double-walled cardboard.",
          ky: "Чекене үчүн 1 кг айнек банка, дүң үчүн 25 кг тамак-аштык пластик чака колдон. Ар банканы көбүкчөгө орот; кош катмарлуу картон кутуга сал.",
        },
        image: sl4,
        imageAlt: { en: "Glass jars packed for shipping", ky: "Жөнөтүүгө таңылган банкалар" },
      },
      {
        title: { en: "5. Ship abroad", ky: "5. Чет өлкөгө жөнөт" },
        body: {
          en: "First small orders: Kyrgyz Post EMS (5–15 day delivery, lab cert + invoice). Larger orders: Asia Logistics by truck via Almaty. Always include HS code 0409.",
          ky: "Биринчи кичине буюртма: Кыргыз почтасы EMS (5–15 күн, лаб сертификат + эсеп). Чоң буюртма: Алматы аркылуу жүк ташуучу Asia Logistics. Ар дайым HS коду 0409 кош.",
        },
        image: sl5,
        imageAlt: { en: "EMS shipping box", ky: "EMS кутусу" },
      },
    ],
  },
];

export const starterKit: { id: string; icon: string; name: Bi; note: Bi }[] = [
  { id: "suit", icon: "👨‍🚀", name: { en: "Beekeeper suit with veil", ky: "Бет жабуусу менен костюм" }, note: { en: "Cotton, ventilated, full-zip", ky: "Пахта, желдетилген, толук сыдырмалуу" } },
  { id: "gloves", icon: "🧤", name: { en: "Leather gloves", ky: "Булгаары кол кап" }, note: { en: "Soft goatskin with long cuff", ky: "Жумшак эчки териси, узун манжет" } },
  { id: "smoker", icon: "💨", name: { en: "Stainless-steel smoker", ky: "Түтүн чыгаргыч" }, note: { en: "Bellows + heat shield", ky: "Үрлөгүч + жылуу калканы" } },
  { id: "tool", icon: "🪛", name: { en: "Hive tool (J-hook)", ky: "Уюк аспабы (J-илмек)" }, note: { en: "Pry & frame lifter in one", ky: "Ачкыч жана алкак көтөргүч" } },
  { id: "brush", icon: "🪶", name: { en: "Soft bee brush", ky: "Жумшак чөтөк" }, note: { en: "Horsehair, gentle on bees", ky: "Жылкы кылы, аарыга жумшак" } },
  { id: "feeder", icon: "🥣", name: { en: "Frame feeder", ky: "Алкак тоюткуч" }, note: { en: "For spring sugar syrup", ky: "Жазгы шекер сироп үчүн" } },
];

export const tr = <T,>(obj: { en: T; ky: T }, lang: Lang): T =>
  (obj[lang] ?? obj.en) as T;

