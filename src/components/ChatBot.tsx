import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Loader2, Bot, User } from "lucide-react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatBot() {
  const { t, lang } = useI18n();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const localeFor = (l: typeof lang) => (l === "ky" ? "ky-KG" : "en-US");

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = localeFor(lang);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const toggleMic = () => {
    const SR = (typeof window !== "undefined") && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      toast.error(lang === "ky" ? "Браузер үн таанууну колдобойт" : "Voice not supported in this browser");
      return;
    }
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = localeFor(lang);
    rec.interimResults = false;
    rec.onresult = (e: any) => setInput(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok) {
        const errText = await res.text();
        if (res.status === 429) toast.error(lang === "ky" ? "Сурам өтө көп, кийинчерээк аракет кыл" : "Rate limit, please wait a moment");
        else if (res.status === 402) toast.error(lang === "ky" ? "AI кредити түгөндү" : "AI credits exhausted");
        else toast.error(errText || "Error");
        setMessages(next);
        return;
      }
      const data = await res.json();
      const reply = data.text as string;
      setMessages([...next, { role: "assistant", content: reply }]);
      speak(reply);
    } catch (e: any) {
      toast.error(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      <div ref={scrollRef} className="max-h-[420px] min-h-[280px] space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <Bot className="mb-3 h-10 w-10 text-honey" />
            <p>{t("chat.empty")}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-honey/20 text-honey"><Bot className="h-4 w-4" /></div>}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-forest text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {m.content}
            </div>
            {m.role === "user" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground"><User className="h-4 w-4" /></div>}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> {t("chat.thinking")}
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-center gap-2 border-t border-border bg-background/60 p-3"
      >
        <Button type="button" size="icon" variant={listening ? "default" : "outline"} className={listening ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""} onClick={toggleMic} aria-label="Voice">
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-honey"
        />
        <Button type="submit" disabled={loading || !input.trim()} className="bg-honey text-honey-foreground hover:bg-honey/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
