import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_EN = `You are "Naryn Bee Assistant", an expert helper for beekeepers in Naryn, Kyrgyzstan (high-altitude Tien Shan, cold winters, short summers, alpine pasture).
Audience: rural families, including beginners. Be warm, concrete, and practical.
Always prefer natural and locally available solutions. Give numeric guidance (kg, °C, m, days).
When a treatment could affect honey export quality, say so. Keep replies short (under 180 words) unless the user asks for detail.`;

const SYSTEM_KY = `Сен "Нарын Аары Жардамчысысың" — Нарын облусунун (Кыргызстан, Теңир-Тоо, суук кыш, кыска жай, тоо жайыты) аарычылары үчүн эксперт жардамчы.
Аудиторияң: айылдык үй-бүлөлөр, башталгычтарды кошуп. Жылуу, конкреттүү жана практикалык бол.
Дайыма табигый жана жергиликтүү жеткиликтүү чечимдерди сун. Сандык көрсөтмөлөрдү бер (кг, °C, м, күн).
Эгер дары бал сапатын төмөндөтсө, кеп. Жоопторуң кыска (180 сөздөн аз), эгер колдонуучу майда-чүйдөсүн сурабаса.
Дайыма таза кыргыз тилинде жооп бер.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, lang } = (await request.json()) as { messages: { role: string; content: string }[]; lang: "en" | "ky" };
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          if (!Array.isArray(messages) || messages.length === 0) return new Response("messages required", { status: 400 });

          const system = lang === "ky" ? SYSTEM_KY : SYSTEM_EN;

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: system },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
              ],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            return new Response(text || "AI error", { status: res.status });
          }
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content ?? "";
          return Response.json({ text });
        } catch (e) {
          return new Response(e instanceof Error ? e.message : "error", { status: 500 });
        }
      },
    },
  },
});
