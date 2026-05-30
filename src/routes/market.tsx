import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useI18n, formatPrice } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MapPin, Mail, Phone, MessageCircle, Search, Plus } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Naryn honey marketplace — Naryn Bee" },
      { name: "description", content: "Buy mountain honey directly from beekeepers in Naryn, Kyrgyzstan." },
    ],
  }),
  component: MarketPage,
});

type LocalText = { en: string; ky: string };
type Listing = {
  id: string;
  beekeeper: string;
  village: string;
  variety: LocalText;
  description: LocalText;
  /** Price in USD per kg as entered (e.g. "$22 / kg" or "22"). Converted to som on display for non-English. */
  price: string;
  emoji: string;
  email: string;
  phone: string;
  whatsapp: string;
  brand?: string;
};

const seedListings: Listing[] = [
  { id: "1", beekeeper: "Aibek Toktosunov", village: "At-Bashy", emoji: "🌼", variety: { en: "Wildflower mountain honey", ky: "Тоо гүл балы" }, description: { en: "Raw, unfiltered honey from alpine meadows at 2,200 m.", ky: "2200 м бийиктиктеги тоо шалбаасынан чийки бал." }, price: "$22 / kg", email: "aibek@narynbee.kg", phone: "+996 700 123 456", whatsapp: "996700123456" },
  { id: "2", beekeeper: "Gulnara Kasymova", village: "Naryn city", emoji: "🌿", variety: { en: "Esparcet (sainfoin) honey", ky: "Эспарцет балы" }, description: { en: "Light amber, mild floral aroma. EU food-grade certified.", ky: "Ачык кызгылт, жумшак гүл жыты. ЕБ сертификаты бар." }, price: "$28 / kg", email: "gulnara@narynbee.kg", phone: "+996 555 987 654", whatsapp: "996555987654" },
  { id: "3", beekeeper: "Tilek Bekov", village: "Kochkor", emoji: "💜", variety: { en: "Thyme & herbal honey", ky: "Кыйшык чөп балы" }, description: { en: "Aromatic, dark, rich in polyphenols. Limited harvest.", ky: "Жыттуу, караңгы, полифенолдорго бай. Чектелген жыйым." }, price: "$32 / kg", email: "tilek@narynbee.kg", phone: "+996 770 222 333", whatsapp: "996770222333" },
  { id: "4", beekeeper: "Nurzhan Asanov", village: "Jumgal", emoji: "🍯", variety: { en: "Clover honey", ky: "Беде балы" }, description: { en: "Classic sweet honey, perfect for everyday use.", ky: "Күнүмдүк колдонууга ылайык классикалык таттуу бал." }, price: "$18 / kg", email: "nurzhan@narynbee.kg", phone: "+996 552 111 222", whatsapp: "996552111222" },
  { id: "5", beekeeper: "Cholpon Sultanova", village: "Ak-Talaa", emoji: "🌸", variety: { en: "Spring blossom honey", ky: "Жазгы гүл балы" }, description: { en: "First spring harvest, delicate and floral.", ky: "Биринчи жазгы жыйым, назик жана гүлдүү." }, price: "$24 / kg", email: "cholpon@narynbee.kg", phone: "+996 700 555 666", whatsapp: "996700555666" },
  { id: "6", beekeeper: "Ermek Joldoshev", village: "Naryn city", emoji: "🌰", variety: { en: "Buckwheat honey", ky: "Карабуудай балы" }, description: { en: "Dark, robust, high in antioxidants. Bulk available.", ky: "Караңгы, бай даам, антиоксиданттарга бай. Көп санда бар." }, price: "$26 / kg", email: "ermek@narynbee.kg", phone: "+996 559 333 444", whatsapp: "996559333444" },
];

const STORAGE_KEY = "naryn-bee-listings";

const listingSchema = z.object({
  beekeeper: z.string().trim().min(1).max(80),
  brand: z.string().trim().min(1).max(80),
  village: z.string().trim().min(1).max(60),
  variety: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(400),
  price: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(4).max(40),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
});

const pickLang = (t: LocalText, lang: "en" | "ky") => t[lang] ?? t.en;

function MarketPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Listing | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserListings(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Listing[]) => {
    setUserListings(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const all = useMemo(() => [...userListings, ...seedListings], [userListings]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return all.filter((l) =>
      !s ||
      l.beekeeper.toLowerCase().includes(s) ||
      l.village.toLowerCase().includes(s) ||
      (l.brand?.toLowerCase().includes(s) ?? false) ||
      l.variety.en.toLowerCase().includes(s) ||
      l.variety.ky.toLowerCase().includes(s)
    );
  }, [q, all]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-forest md:text-5xl">{t("market.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("market.sub")}</p>
      </div>

      <div className="mx-auto mb-8 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("market.search")}
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <Button onClick={() => setFormOpen(true)} className="bg-honey text-forest hover:bg-honey/90">
          <Plus className="h-4 w-4" /> {t("market.list")}
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <Card key={l.id} className="overflow-hidden border-border/70 bg-card transition hover:-translate-y-1 hover:border-honey hover:shadow-lg">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-honey/30 to-honey/10 text-6xl">{l.emoji}</div>
            <CardContent className="p-5">
              {l.brand && <div className="text-xs font-semibold uppercase tracking-wide text-honey">{l.brand}</div>}
              <h3 className="font-display text-lg font-bold text-forest">{pickLang(l.variety, lang)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pickLang(l.description, lang)}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
                <MapPin className="h-4 w-4 text-honey" /> {l.beekeeper} · {l.village}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-honey/20 px-3 py-1 text-sm font-bold text-forest">{formatPrice(l.price, lang)}</span>
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
                {active.brand && <p className="text-sm font-semibold uppercase tracking-wide text-honey">{active.brand}</p>}
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
                {active.whatsapp && (
                  <a href={`https://wa.me/${active.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-honey">
                    <MessageCircle className="h-5 w-5 text-honey" />
                    <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-medium">+{active.whatsapp}</div></div>
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ListingFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={(l) => {
          persist([l, ...userListings]);
          setFormOpen(false);
          toast.success(t("market.listed"));
        }}
      />
    </div>
  );
}

const EMOJIS = ["🍯", "🌼", "🌿", "💜", "🌸", "🌰", "🐝", "🏔️"];

function ListingFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (l: Listing) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState({
    beekeeper: "", brand: "", village: "", variety: "", description: "",
    price: "", email: "", phone: "", whatsapp: "",
  });
  const [emoji, setEmoji] = useState("🍯");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = listingSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const d = parsed.data;
    // Normalize price: if user typed a plain number, store as "$N / kg".
    const priceTrim = d.price.trim();
    const normalizedPrice = /^\d+(?:[.,]\d+)?$/.test(priceTrim)
      ? `$${priceTrim} / kg`
      : priceTrim;
    onSubmit({
      id: `u-${Date.now()}`,
      beekeeper: d.beekeeper,
      brand: d.brand,
      village: d.village,
      variety: { en: d.variety, ky: d.variety },
      description: { en: d.description, ky: d.description },
      price: normalizedPrice,
      emoji,
      email: d.email,
      phone: d.phone,
      whatsapp: (d.whatsapp ?? "").replace(/\D/g, ""),
    });
    setForm({ beekeeper: "", brand: "", village: "", variety: "", description: "", price: "", email: "", phone: "", whatsapp: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-forest">{t("market.listTitle")}</DialogTitle>
          <p className="text-sm text-muted-foreground">{t("market.listSub")}</p>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={t("market.f.name")}><Input value={form.beekeeper} onChange={set("beekeeper")} maxLength={80} required /></Field>
            <Field label={t("market.f.brand")}><Input value={form.brand} onChange={set("brand")} maxLength={80} required /></Field>
            <Field label={t("market.f.village")}><Input value={form.village} onChange={set("village")} maxLength={60} required /></Field>
            <Field label={t("market.f.variety")}><Input value={form.variety} onChange={set("variety")} maxLength={80} required /></Field>
            <Field label={t("market.f.price")}><Input value={form.price} onChange={set("price")} placeholder="25" maxLength={40} required /></Field>
            <Field label={t("market.f.email")}><Input type="email" value={form.email} onChange={set("email")} maxLength={120} required /></Field>
            <Field label={t("market.f.phone")}><Input value={form.phone} onChange={set("phone")} placeholder="+996 …" maxLength={40} required /></Field>
            <Field label={t("market.f.whatsapp")}><Input value={form.whatsapp} onChange={set("whatsapp")} placeholder="996700123456" maxLength={40} /></Field>
          </div>
          <Field label={t("market.f.description")}>
            <Textarea value={form.description} onChange={set("description")} maxLength={400} rows={3} required />
          </Field>
          <div>
            <Label className="mb-2 block">{t("market.f.emoji")}</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <button key={e} type="button" onClick={() => setEmoji(e)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-2xl transition ${emoji === e ? "border-honey bg-honey/20" : "border-border hover:border-honey/60"}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{t("common.back")}</Button>
            <Button type="submit" className="bg-forest text-primary-foreground hover:bg-forest/90">{t("market.publish")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
