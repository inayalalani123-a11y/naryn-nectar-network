import { Link } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import { Hexagon } from "lucide-react";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ky", label: "КЫ" },
];

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-forest">
          <Hexagon className="h-6 w-6 fill-honey stroke-forest" strokeWidth={1.5} />
          {t("brand")}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground" activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium bg-secondary text-foreground" }} activeOptions={{ exact: true }}>
            {t("nav.learn")}
          </Link>
          <Link to="/diagnose" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground" activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium bg-secondary text-foreground" }}>
            {t("nav.diagnose")}
          </Link>
          <Link to="/market" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground" activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium bg-secondary text-foreground" }}>
            {t("nav.market")}
          </Link>
        </nav>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${lang === l.code ? "bg-honey text-honey-foreground" : "text-muted-foreground"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <nav className="flex items-center justify-around border-t border-border/60 px-4 py-2 md:hidden">
        <Link to="/" className="text-sm font-medium" activeProps={{ className: "text-sm font-medium text-honey" }} activeOptions={{ exact: true }}>{t("nav.learn")}</Link>
        <Link to="/diagnose" className="text-sm font-medium" activeProps={{ className: "text-sm font-medium text-honey" }}>{t("nav.diagnose")}</Link>
        <Link to="/market" className="text-sm font-medium" activeProps={{ className: "text-sm font-medium text-honey" }}>{t("nav.market")}</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
      <p>Naryn Bee · Made for the beekeepers of the Tien Shan 🐝</p>
    </footer>
  );
}
