import { createFileRoute } from "@tanstack/react-router";

const PROMPT = `You are a veterinary entomologist specializing in honey bee diseases. Analyze the attached photo of a beehive, frame, brood, or bees and decide if any of these are present:
- Varroatosis (Varroa destructor mites)
- Nosematosis (Nosema apis/ceranae)
- Ascospherosis (Chalkbrood)
- American or European Foulbrood
- Sacbrood
- Wax moth damage
- Healthy hive (none)

Respond ONLY with strict JSON matching:
{
  "disease": "string (English name, e.g. 'Varroatosis' or 'No disease detected')",
  "diseaseKy": "string (same in Kyrgyz, e.g. 'Варроатоз')",
  "severity": "none" | "low" | "medium" | "high",
  "confidence": number between 0 and 1,
  "observations": ["short bullet point", "..."],
  "remedies": [
    {"name": "Natural remedy name", "how": "1-3 sentences on application that is honey-safe and uses locally available materials in Kyrgyzstan (oxalic acid sublimation, formic acid pads, thymol from local thyme, screened bottom boards, sugar dusting, comb rotation, requeening, etc.)"}
  ],
  "followUp": "one sentence next step"
}

Rules:
- Use only honey-safe, residue-free remedies suitable for export-grade honey (no synthetic pyrethroids during flow).
- Prefer organic acids (oxalic, formic), essential oils (thymol), mechanical (drone trapping, screened boards), and biotechnical methods.
- If unsure, say so honestly with a low confidence and request a clearer photo in observations.
- If language is Kyrgyz, translate observations/remedies/followUp to Kyrgyz too. Otherwise English.
- Do not output anything except the JSON.`;

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON in response");
  return JSON.parse(raw.slice(start, end + 1));
}

export const Route = createFileRoute("/api/diagnose")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { image, lang } = (await request.json()) as { image: string; lang: "en" | "ky" };
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          if (!image?.startsWith("data:image/")) return new Response("invalid image", { status: 400 });

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
            body: JSON.stringify({
              model: "google/gemini-2.5-pro",
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: `${PROMPT}\n\nOutput language preference: ${lang === "ky" ? "Kyrgyz" : "English"} (but keep both "disease" in English and "diseaseKy" in Kyrgyz).` },
                    { type: "image_url", image_url: { url: image } },
                  ],
                },
              ],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            return new Response(text || "AI error", { status: res.status });
          }
          const data = await res.json();
          const text: string = data?.choices?.[0]?.message?.content ?? "";
          const parsed = extractJson(text);
          return Response.json(parsed);
        } catch (e) {
          return new Response(e instanceof Error ? e.message : "error", { status: 500 });
        }
      },
    },
  },
});
