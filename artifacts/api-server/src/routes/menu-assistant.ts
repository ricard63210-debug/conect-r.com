import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const apiKey = process.env.OPENAI_API_KEY ?? process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const baseURL = process.env.OPENAI_API_KEY
  ? undefined
  : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

const client = apiKey ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) }) : null;
const MODEL = "gpt-4o-mini";

type ChatMsg = { role: "user" | "assistant"; content: string };

type MenuItem = {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  tags?: string[];
};

type MenuCategory = {
  category?: string;
  items?: MenuItem[];
};

function detectLang(text: string): "es" | "en" | null {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  if (/[áéíóúñ¿¡]/.test(t)) return "es";
  const esWords = /\b(hola|gracias|por favor|dime|cuéntame|cuentame|acerca|necesito|quiero|tengo|cómo|como|qué|que|cuál|cual|cuando|cuándo|donde|dónde|para|porque|porqué|también|tambien|más|mas|mejor|sobre|aquí|aqui|nuestro|nuestra|tu|tus|mi|mis|sí|si|negocio|restaurante|menú|menu|mesa|cliente|servicio|precio|costo|cita|demo|ayuda|comida|platillo|bebida|picante|recomienda|recomiendas)\b/;
  const enWords = /\b(hello|hi|thanks|please|tell|about|need|want|have|how|what|which|when|where|why|because|also|more|better|on|here|our|your|my|yes|business|restaurant|menu|table|customer|service|price|cost|help|the|and|with|for|food|dish|drink|spicy|recommend)\b/;
  const esCount = (t.match(esWords) || []).length;
  const enCount = (t.match(enWords) || []).length;
  if (esCount > enCount) return "es";
  if (enCount > esCount) return "en";
  return null;
}

function buildSystemPrompt(menu: MenuCategory[], lang: "es" | "en"): string {
  const langInstruction =
    lang === "es"
      ? "REGLA DE IDIOMA (OBLIGATORIA): el último mensaje del cliente está en ESPAÑOL. Responde EXCLUSIVAMENTE en español, con tono cálido, cercano y mexicano. Si más adelante el cliente cambia a inglés, cambias a inglés en ese momento."
      : "LANGUAGE RULE (MANDATORY): the customer's last message is in ENGLISH. Reply EXCLUSIVELY in English, warm and friendly tone. If they later switch to Spanish, switch with them at that moment.";

  const formattedMenu = menu
    .map((cat) => {
      const items = (cat.items ?? [])
        .map((it) => {
          const tags = (it.tags ?? []).join(", ");
          return `  - ${it.title ?? "?"} ($${(it.price ?? 0).toFixed(2)})${tags ? ` [${tags}]` : ""}\n      ${it.description ?? ""}`;
        })
        .join("\n");
      return `## ${cat.category ?? "?"}\n${items}`;
    })
    .join("\n\n");

  return `You are "Maya", the in-house AI host of Maya Cantina (Cocina Mexicana Auténtica) located at 455 Bercut Dr, Sacramento, CA 95811. Open Mon–Sun, 9am–10pm.

${langInstruction}

YOUR JOB:
- Answer ANY question about the current menu: ingredients, prices, spice level, vegetarian/vegan options, allergens (based on listed ingredients), recommendations by mood, occasion, group size or dietary need.
- Suggest pairings (drink + dish), highlight Chef Favorites (⭐), spicy items (🌶) and vegetarian (🌿).
- If asked about something NOT on the menu, say so honestly and suggest the closest option from the menu.
- Recommend events when relevant (Friday Mariachi 8pm, Saturday Banda Machos 9pm, Sunday Bad Bunny tribute 8:30pm, Sundays Pajares family show 1pm). Reservations: tablereserve.conect-r.com/book/roosters-on-the-river.
- Keep replies short (2–4 sentences) and conversational. Use emoji sparingly (🌮🥑🔥).
- Never invent dishes or prices that aren't in the menu below.

CURRENT MENU (this is the live source of truth — always reference exact names and prices):

${formattedMenu}

If the user asks about hours, address, parking, reservations, or events, answer with the info above. For anything beyond the restaurant scope, gently redirect to the menu/experience.`;
}

router.post("/menu-assistant/chat", async (req, res) => {
  try {
    if (!client) {
      res.status(503).json({ error: "AI not configured" });
      return;
    }

    const body = req.body as {
      messages?: ChatMsg[];
      lang?: "es" | "en";
      menu?: MenuCategory[];
    };

    const history = Array.isArray(body.messages) ? body.messages : [];
    const lang = body.lang === "es" ? "es" : "en";
    const menu = Array.isArray(body.menu) ? body.menu : [];

    if (history.length === 0) {
      res.status(400).json({ error: "messages required" });
      return;
    }

    const trimmed = history.slice(-20).map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content ?? "").slice(0, 1500),
    }));

    const lastUserMsg = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
    const effectiveLang = detectLang(lastUserMsg) ?? lang;

    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 600,
      temperature: 0.7,
      messages: [
        { role: "system", content: buildSystemPrompt(menu, effectiveLang) },
        ...trimmed,
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    res.json({ reply });
  } catch (err: unknown) {
    req.log.error({ err }, "menu assistant chat failed");
    res.status(500).json({ error: "menu_assistant_failed" });
  }
});

export default router;
