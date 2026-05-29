import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { modules, starterKit, tr, type Module } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ChatBot } from "@/components/ChatBot";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, ShoppingBag, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn beekeeping — Naryn Bee" },
      { name: "description", content: "Interactive step-by-step modules for mountain beekeeping in Naryn, a starter kit, and an AI bee assistant in Kyrgyz and English." },
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
              <Card key={m.id} className="group cursor-pointer overflow-hidden border-border/70 bg-card transition hover:-translate-y-1 hover:border-honey hover:shadow-lg" onClick={() => setOpen(m.id)}>
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img src={m.steps[0].image} alt="" loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition group-hover:scale-105" />
                  <span className="absolute right-3 top-3 rounded-full bg-honey/95 px-2.5 py-1 text-xs font-bold text-honey-foreground shadow">
                    {m.steps.length} {t("learn.stepsCount")}
                  </span>
                </div>
                <CardHeader>
                  <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-honey/15 text-2xl">{m.icon}</div>
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
                  <h3 className="font-semibold text-forest">{tr(k.name, lang)}</h3>
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

      <ModuleDialog module={active ?? null} onClose={() => setOpen(null)} />
    </div>
  );
}

function ModuleDialog({ module: m, onClose }: { module: Module | null; onClose: () => void }) {
  const { t, lang } = useI18n();
  const [i, setI] = useState(0);

  // Reset to step 0 whenever a different module opens
  useEffect(() => {
    setI(0);
  }, [m?.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!m) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((p) => Math.min(p + 1, m.steps.length - 1));
      if (e.key === "ArrowLeft") setI((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [m]);

  if (!m) return null;
  const step = m.steps[i];
  const isLast = i === m.steps.length - 1;
  const progress = ((i + 1) / m.steps.length) * 100;

  return (
    <Dialog open={!!m} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-honey/20 text-2xl">{m.icon}</div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="font-display text-xl text-forest truncate">{tr(m.title, lang)}</DialogTitle>
              <p className="text-xs text-muted-foreground">
                {t("learn.step")} {i + 1} {t("learn.of")} {m.steps.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-1.5" />
        </DialogHeader>

        <div className="px-6 pb-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
            <img
              src={step.image}
              alt={tr(step.imageAlt, lang)}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
            />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-forest">{tr(step.title, lang)}</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">{tr(step.body, lang)}</p>
          {step.caption && (
            <p className="mt-3 rounded-lg border-l-4 border-honey bg-honey/10 px-3 py-2 text-sm italic text-forest">
              {tr(step.caption, lang)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-6 py-4">
          <Button variant="outline" onClick={() => setI((p) => Math.max(p - 1, 0))} disabled={i === 0}>
            <ChevronLeft className="mr-1 h-4 w-4" /> {t("learn.back")}
          </Button>
          <div className="flex gap-1.5">
            {m.steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`${t("learn.step")} ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-honey" : "w-2 bg-border hover:bg-honey/50"}`}
              />
            ))}
          </div>
          {isLast ? (
            <Button className="bg-honey text-honey-foreground hover:bg-honey/90" onClick={onClose}>
              {t("learn.done")}
            </Button>
          ) : (
            <Button className="bg-honey text-honey-foreground hover:bg-honey/90" onClick={() => setI((p) => Math.min(p + 1, m.steps.length - 1))}>
              {t("learn.next")} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
