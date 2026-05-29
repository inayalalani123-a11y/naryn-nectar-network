import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useI18n, dict } from "@/lib/i18n";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, AlertTriangle, Leaf, Stethoscope, ClipboardList } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/diagnose")({
  head: () => ({
    meta: [
      { title: "Hive disease checker — Naryn Bee" },
      { name: "description", content: "Upload a photo of your hive and answer a quick symptoms survey. AI detects varroatosis, nosematosis, ascospherosis, foulbrood and suggests honey-safe natural remedies." },
    ],
  }),
  component: DiagnosePage,
});

type Diagnosis = {
  disease: string;
  diseaseKy?: string;
  severity: "low" | "medium" | "high" | "none";
  confidence: number;
  observations: string[];
  remedies: { name: string; how: string }[];
  followUp: string;
};

type SymptomKey =
  | "sym.deadBees" | "sym.crawling" | "sym.deformedWings" | "sym.spottedBrood"
  | "sym.chalkMummies" | "sym.ropyBrood" | "sym.diarrhea" | "sym.varrоaMites"
  | "sym.weakColony" | "sym.webbing" | "sym.noQueen" | "sym.robbing";

const SYMPTOMS: SymptomKey[] = [
  "sym.deadBees", "sym.crawling", "sym.deformedWings", "sym.spottedBrood",
  "sym.chalkMummies", "sym.ropyBrood", "sym.diarrhea", "sym.varrоaMites",
  "sym.weakColony", "sym.webbing", "sym.noQueen", "sym.robbing",
];

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
type Season = typeof SEASONS[number];

function DiagnosePage() {
  const { t, lang } = useI18n();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [checked, setChecked] = useState<Set<SymptomKey>>(new Set());
  const [notes, setNotes] = useState("");
  const [season, setSeason] = useState<Season | "">("");
  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = (k: SymptomKey) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const onFile = (f: File) => {
    if (f.size > 8 * 1024 * 1024) { toast.error("Max 8 MB"); return; }
    const r = new FileReader();
    r.onload = () => setPreview(String(r.result));
    r.readAsDataURL(f);
    setResult(null);
  };

  const analyze = async () => {
    if (!preview) return;
    setResult(null);
    try {
      const symptomLabels = Array.from(checked)
        .map((k) => dict[k]?.en)
        .filter((v): v is string => Boolean(v));

      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: preview,
          lang,
          symptoms: symptomLabels,
          notes: notes.slice(0, 600),
          season: season || undefined,
        }),
      });
      if (!res.ok) {
        const e = await res.text();
        if (res.status === 429) toast.error(lang === "ky" ? "Сурам өтө көп" : lang === "ru" ? "Слишком много запросов" : "Rate limit");
        else if (res.status === 402) toast.error(lang === "ky" ? "AI кредити түгөндү" : lang === "ru" ? "Кредиты ИИ исчерпаны" : "AI credits exhausted");
        else toast.error(e || "Error");
        return;
      }
      const data = (await res.json()) as Diagnosis;
      setResult(data);
    } catch (e: any) {
      toast.error(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  const sevColor = (s: string) =>
    s === "high" ? "bg-destructive text-destructive-foreground"
    : s === "medium" ? "bg-honey text-honey-foreground"
    : s === "low" ? "bg-secondary text-secondary-foreground"
    : "bg-forest text-primary-foreground";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-honey/20"><Stethoscope className="h-7 w-7 text-forest" /></div>
        <h1 className="font-display text-4xl font-bold text-forest">{t("diag.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("diag.sub")}</p>
      </div>

      <Card className="border-border/70 bg-card">
        <CardContent className="p-6">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          {!preview ? (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-secondary/40 px-6 py-16 transition hover:border-honey hover:bg-honey/5"
            >
              <Upload className="h-10 w-10 text-honey" />
              <span className="font-medium text-forest">{t("diag.upload")}</span>
              <span className="text-xs text-muted-foreground">JPG / PNG · max 8 MB</span>
            </button>
          ) : (
            <div className="space-y-4">
              <img src={preview} alt="Hive preview" className="mx-auto max-h-[420px] rounded-xl border border-border object-contain" />
              <Button variant="outline" onClick={() => { setPreview(null); setResult(null); }}>
                {t("diag.upload")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/70 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-2xl text-forest">
            <ClipboardList className="h-5 w-5" /> {t("diag.survey.title")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t("diag.survey.sub")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {SYMPTOMS.map((k) => (
              <label key={k} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition hover:border-honey/60">
                <Checkbox checked={checked.has(k)} onCheckedChange={() => toggle(k)} className="mt-0.5" />
                <span className="text-sm text-foreground/90">{t(k)}</span>
              </label>
            ))}
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-forest">{t("diag.survey.season")}</Label>
            <div className="flex flex-wrap gap-2">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(season === s ? "" : s)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    season === s
                      ? "border-honey bg-honey text-honey-foreground"
                      : "border-border bg-secondary/40 text-foreground/80 hover:border-honey/60"
                  }`}
                >
                  {t(`diag.survey.season.${s}` as keyof typeof dict)}

                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="mb-2 block text-sm font-semibold text-forest">
              {t("diag.survey.notes")}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 600))}
              placeholder={t("diag.survey.notesPh")}
              rows={3}
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">{notes.length}/600</div>
          </div>

          <Button
            className="w-full bg-honey text-honey-foreground hover:bg-honey/90 sm:w-auto"
            disabled={loading || !preview}
            onClick={analyze}
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("diag.analyzing")}</> : t("diag.analyze")}
          </Button>
          {!preview && (
            <p className="text-xs text-muted-foreground">
              {lang === "ky" ? "Талдоо үчүн адегенде сүрөт жүктө." : lang === "ru" ? "Сначала загрузите фото, чтобы включить анализ." : "Upload a photo above to enable analysis."}
            </p>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6 border-honey/40 bg-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="font-display text-2xl text-forest">
                {t("diag.result")}: {lang === "ky" && result.diseaseKy ? result.diseaseKy : result.disease}
              </CardTitle>
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${sevColor(result.severity)}`}>
                {t("diag.severity")}: {result.severity} · {Math.round(result.confidence * 100)}%
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {result.observations.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {lang === "ky" ? "Байкоолор" : lang === "ru" ? "Наблюдения" : "Observations"}
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-foreground/90">
                  {result.observations.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            )}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-forest">
                <Leaf className="h-4 w-4" /> {t("diag.remedies")}
              </h4>
              <div className="space-y-3">
                {result.remedies.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <div className="font-semibold text-forest">{r.name}</div>
                    <p className="mt-1 text-sm text-foreground/85">{r.how}</p>
                  </div>
                ))}
              </div>
            </div>
            {result.followUp && (
              <p className="rounded-xl bg-forest/[0.04] p-4 text-sm text-foreground/80">
                <strong>{lang === "ky" ? "Кийинки кадам: " : lang === "ru" ? "Следующий шаг: " : "Next step: "}</strong>{result.followUp}
              </p>
            )}
            <p className="flex items-start gap-2 rounded-xl bg-honey/10 p-3 text-xs text-foreground/80">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-honey" /> {t("diag.disclaimer")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
