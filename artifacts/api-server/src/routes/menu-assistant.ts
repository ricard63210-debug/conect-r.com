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

function buildSystemPrompt(menu: MenuCategory[], lang: "es" | "en"): string {
  const langInstruction =
    lang === "es"
      ? "Responde SIEMPRE en español, con tono cálido, cercano y mexicano."
      : "ALWAYS reply in English, in a warm, friendly tone.";

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

    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 600,
      temperature: 0.7,
      messages: [
        { role: "system", content: buildSystemPrompt(menu, lang) },
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
