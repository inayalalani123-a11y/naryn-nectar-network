import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Mail, Phone, MessageCircle, Search } from "lucide-react";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Naryn honey marketplace — Naryn Bee" },
      { name: "description", content: "Buy mountain honey directly from beekeepers in Naryn, Kyrgyzstan." },
    ],
  }),
  component: MarketPage,
});

type Listing = {
  id: string;
  beekeeper: string;
  village: string;
  variety: { en: string; ky: string };
  description: { en: string; ky: string };
  price: string;
  emoji: string;
  email: string;
  phone: string;
  whatsapp: string;
};

const listings: Listing[] = [
  { id: "1", beekeeper: "Aibek Toktosunov", village: "At-Bashy", emoji: "🌼", variety: { en: "Wildflower mountain honey", ky: "Тоо гүл балы" }, description: { en: "Raw, unfiltered honey from alpine meadows at 2,200 m.", ky: "2200 м бийиктиктеги тоо шалбаасынан чийки бал." }, price: "$22 / kg", email: "aibek@narynbee.kg", phone: "+996 700 123 456", whatsapp: "996700123456" },
  { id: "2", beekeeper: "Gulnara Kasymova", village: "Naryn city", emoji: "🌿", variety: { en: "Esparcet (sainfoin) honey", ky: "Эспарцет балы" }, description: { en: "Light amber, mild floral aroma. EU food-grade certified.", ky: "Ачык кызгылт, жумшак гүл жыты. ЕБ сертификаты бар." }, price: "$28 / kg", email: "gulnara@narynbee.kg", phone: "+996 555 987 654", whatsapp: "996555987654" },
  { id: "3", beekeeper: "Tilek Bekov", village: "Kochkor", emoji: "💜", variety: { en: "Thyme & herbal honey", ky: "Кыйшык чөп балы" }, description: { en: "Aromatic, dark, rich in polyphenols. Limited harvest.", ky: "Жыттуу, караңгы, полифенолдорго бай. Чектелген жыйым." }, price: "$32 / kg", email: "tilek@narynbee.kg", phone: "+996 770 222 333", whatsapp: "996770222333" },
  { id: "4", beekeeper: "Nurzhan Asanov", village: "Jumgal", emoji: "🍯", variety: { en: "Clover honey", ky: "Беде балы" }, description: { en: "Classic sweet honey, perfect for everyday use.", ky: "Күнүмдүк колдонууга ылайык классикалык таттуу бал." }, price: "$18 / kg", email: "nurzhan@narynbee.kg", phone: "+996 552 111 222", whatsapp: "996552111222" },
  { id: "5", beekeeper: "Cholpon Sultanova", village: "Ak-Talaa", emoji: "🌸", variety: { en: "Spring blossom honey", ky: "Жазгы гүл балы" }, description: { en: "First spring harvest, delicate and floral.", ky: "Биринчи жазгы жыйым, назик жана гүлдүү." }, price: "$24 / kg", email: "cholpon@narynbee.kg", phone: "+996 700 555 666", whatsapp: "996700555666" },
  { id: "6", beekeeper: "Ermek Joldoshev", village: "Naryn city", emoji: "🌰", variety: { en: "Buckwheat honey", ky: "Карабуудай балы" }, description: { en: "Dark, robust, high in antioxidants. Bulk available.", ky: "Караңгы, бай даам, антиоксиданттарга бай. Көп санда бар." }, price: "$26 / kg", email: "ermek@narynbee.kg", phone: "+996 559 333 444", whatsapp: "996559333444" },
];

function MarketPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Listing | null>(null);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return listings.filter((l) =>
      !s ||
      l.beekeeper.toLowerCase().includes(s) ||
      l.village.toLowerCase().includes(s) ||
      l.variety.en.toLowerCase().includes(s) ||
      l.variety.ky.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-forest md:text-5xl">{t("market.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("market.sub")}</p>
      </div>

      <div className="mx-auto mb-8 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("market.search")}
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <Card key={l.id} className="overflow-hidden border-border/70 bg-card transition hover:-translate-y-1 hover:border-honey hover:shadow-lg">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-honey/30 to-honey/10 text-6xl">{l.emoji}</div>
            <CardContent className="p-5">
              <h3 className="font-display text-lg font-bold text-forest">{lang === "ky" ? l.variety.ky : l.variety.en}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{lang === "ky" ? l.description.ky : l.description.en}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
                <MapPin className="h-4 w-4 text-honey" /> {l.beekeeper} · {l.village}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-honey/20 px-3 py-1 text-sm font-bold text-forest">{l.price}</span>
                <Button size="sm" className="bg-forest text-primary-foreground hover:bg-forest/90" onClick={() => setActive(l)}>
                  {t("market.contact")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent>
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">{active.beekeeper}</DialogTitle>
                <p className="text-sm text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" /> {active.village}, Naryn</p>
              </DialogHeader>
              <div className="space-y-3">
                <a href={`mailto:${active.email}`} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-honey">
                  <Mail className="h-5 w-5 text-honey" />
                  <div><div className="text-xs text-muted-foreground">Email</div><div className="font-medium">{active.email}</div></div>
                </a>
                <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-honey">
                  <Phone className="h-5 w-5 text-honey" />
                  <div><div className="text-xs text-muted-foreground">Phone</div><div className="font-medium">{active.phone}</div></div>
                </a>
                <a href={`https://wa.me/${active.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-honey">
                  <MessageCircle className="h-5 w-5 text-honey" />
                  <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-medium">+{active.whatsapp}</div></div>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
