import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, AlertTriangle, Leaf, Stethoscope } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/diagnose")({
  head: () => ({
    meta: [
      { title: "Hive disease checker — Naryn Bee" },
      { name: "description", content: "Upload a photo of your hive. AI detects varroatosis, nosematosis, ascospherosis, foulbrood and suggests honey-safe natural remedies." },
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

function DiagnosePage() {
  const { t, lang } = useI18n();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    if (f.size > 8 * 1024 * 1024) { toast.error("Max 8 MB"); return; }
    const r = new FileReader();
    r.onload = () => setPreview(String(r.result));
    r.readAsDataURL(f);
    setResult(null);
  };

  const analyze = async () => {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview, lang }),
      });
      if (!res.ok) {
        const e = await res.text();
        if (res.status === 429) toast.error(lang === "ky" ? "Сурам өтө көп" : "Rate limit");
        else if (res.status === 402) toast.error(lang === "ky" ? "AI кредити түгөндү" : "AI credits exhausted");
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
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => { setPreview(null); setResult(null); }}>
                  {t("diag.upload")}
                </Button>
                <Button className="bg-honey text-honey-foreground hover:bg-honey/90" disabled={loading} onClick={analyze}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("diag.analyzing")}</> : t("diag.analyze")}
                </Button>
              </div>
            </div>
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
                  {lang === "ky" ? "Байкоолор" : "Observations"}
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
                <strong>{lang === "ky" ? "Кийинки кадам: " : "Next step: "}</strong>{result.followUp}
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
