import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { modules, starterKit, tr } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChatBot } from "@/components/ChatBot";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, ShoppingBag, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn beekeeping — Naryn Bee" },
      { name: "description", content: "Interactive modules for mountain beekeeping in Naryn, a starter kit, and an AI bee assistant in Kyrgyz and English." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  const active = modules.find((m) => m.id === open);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-3 inline-block rounded-full border border-honey/40 bg-honey/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest">
              {t("hero.tag")}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-forest md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{t("hero.sub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-honey text-honey-foreground hover:bg-honey/90" asChild>
                <a href="#modules">{t("hero.startLearn")} <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/market"><ShoppingBag className="mr-1 h-4 w-4" /> {t("hero.openMarket")}</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link to="/diagnose"><Stethoscope className="mr-1 h-4 w-4" /> {t("nav.diagnose")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-honey/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Beekeeper in Naryn mountains"
              width={1600}
              height={1024}
              className="relative rounded-3xl border border-border shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="honeycomb-bg py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">{t("learn.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("learn.sub")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Card key={m.id} className="group cursor-pointer border-border/70 bg-card transition hover:-translate-y-1 hover:border-honey hover:shadow-lg" onClick={() => setOpen(m.id)}>
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/15 text-2xl">{m.icon}</div>
                  <CardTitle className="text-xl text-forest">{tr(m.title, lang)}</CardTitle>
                  <CardDescription>{tr(m.summary, lang)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-honey group-hover:underline">{t("learn.read")} →</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kit */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">{t("kit.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("kit.sub")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {starterKit.map((k) => (
              <div key={k.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-honey">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">{k.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-forest">{tr(k.name, lang)}</h3>
                    <span className="rounded-full bg-honey/20 px-2 py-0.5 text-xs font-bold text-forest">{k.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{tr(k.note, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <section className="bg-forest/[0.03] py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-6 text-center">
            <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">{t("chat.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("chat.sub")}</p>
          </div>
          <ChatBot />
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/20 text-2xl">{active.icon}</div>
                <DialogTitle className="font-display text-2xl text-forest">{tr(active.title, lang)}</DialogTitle>
                <DialogDescription>{tr(active.summary, lang)}</DialogDescription>
              </DialogHeader>
              <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">{tr(active.body, lang)}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
