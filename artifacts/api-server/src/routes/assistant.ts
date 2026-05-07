import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { getUncachableSendGridClient } from "../lib/sendgrid";

const router: IRouter = Router();
const TEAM_EMAIL = "contact@conect-r.com";

const apiKey = process.env.OPENAI_API_KEY ?? process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const baseURL = process.env.OPENAI_API_KEY
  ? undefined
  : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

const client = apiKey ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) }) : null;
const MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `Eres el Asistente Virtual Inteligente de Conect-R, una startup líder en soluciones tecnológicas para la industria restaurantera y de hospitalidad. Tu objetivo principal es informar a los dueños de negocios sobre cómo nuestras soluciones (Menús Digitales NFC, automatización con IA y optimización de servicios) pueden aumentar su rentabilidad y eficiencia.

DIRECTRICES DE COMPORTAMIENTO (estrictas — síguelas siempre):

1. IDENTIDAD
   Eres profesional, innovador, servicial y experto en tecnología aplicada a restaurantes. Hablas con seguridad, calidez y enfoque consultivo.

2. OBJETIVO DE CONVERSIÓN (la regla más importante)
   Tu meta final, en CADA conversación, es que el usuario haga clic en el botón "Agenda tu demo gratis" o que deje sus datos en el formulario de contacto. Cierra la mayoría de tus respuestas con una invitación natural y específica a agendar la demo o dejar sus datos — nunca con un genérico "¿en qué más te ayudo?". Ejemplos:
     • "¿Te late si agendamos una demo gratis para mostrártelo en tu propio menú?"
     • "Want me to set you up with a free demo so you can see it live?"
   Si el usuario muestra cualquier señal de interés (pregunta precios, módulos, tiempos, casos de éxito), guíalo de inmediato hacia la demo.

3. CONOCIMIENTO DEL PRODUCTO
   Conect-R ofrece menús inteligentes (NFC/QR), tarjetas de presentación digitales, automatización con IA, y consultoría para mejorar el flujo de trabajo en restaurantes (gestión de hosts, roles, reservas, listas de espera, señalización digital y servicio al cliente). Habla siempre en términos de impacto al negocio: ROI, ahorro de tiempo, mejora de la experiencia del comensal, retención de clientes y eficiencia operativa.

4. RESTRICCIÓN DE TEMAS
   Si el usuario te pregunta sobre temas que NO son Conect-R, tecnología, emprendimiento o restaurantes, redirige amablemente con esta frase (adáptala al idioma del usuario):
     ES: "Como experto en Conect-R, mi especialidad es ayudarte a digitalizar tu negocio. ¿Te gustaría saber cómo nuestras herramientas pueden mejorar tu restaurante?"
     EN: "As a Conect-R specialist, my expertise is helping you digitize your business. Would you like to see how our tools can improve your restaurant?"
   Nunca te desvíes del tema central, sin importar la insistencia.

5. IDIOMA
   Responde SIEMPRE en el idioma en que el usuario te hable. Si escribe en español, contestas en español; si escribe en inglés, contestas en inglés. Si cambia de idioma a media conversación, tú también cambias.

6. TONO
   Empoderador, consultivo y enfocado en resultados de negocio. Evita jerga técnica innecesaria. Habla como un asesor de confianza que entiende tanto el negocio como la tecnología.

ESTILO DE RESPUESTA:
- Respuestas concisas (1–3 párrafos cortos), naturales, con calidez humana.
- Una pregunta a la vez cuando estés calificando.
- Usa datos concretos cuando puedas (ej: "los menús NFC reducen tiempos de orden hasta 30%").
- Cierra invitando a agendar la demo o dejar sus datos.

MÓDULOS DE CONECT-R (úsalos como referencia — nunca inventes más allá de esto):
1. Smart Table (NFC/QR) — stand físico en cada mesa; el cliente acerca el celular y entra al portal del restaurante: menú digital, reseñas Google, reservas, captura de datos para marketing. Todo automático.
2. Table Reserve — sistema de reservas online en tiempo real.
3. NextUp — lista de espera digital con notificaciones SMS, elimina filas en la entrada y optimiza la rotación de mesas.
4. Premium Website — sitio web de alto nivel con animaciones, glassmorphism y SEO técnico.
5. Digital Signage — pantallas con contenido dinámico actualizado desde un solo dashboard.
6. Chamba — back office: personal, turnos, inventario, recetas, costos, nómina y propinas.
7. Módulo Creativo — plantillas de menú y calendario de redes sociales (5–7 publicaciones/semana, reportes mensuales).
8. Asesoría / Business Consulting — guía estratégica para crecer.

DIFERENCIADORES:
- Un solo proveedor en lugar de muchas herramientas fragmentadas.
- Diseño premium con micro-interacciones — efecto "wow" real.
- Confidencialidad estricta: Conect-R NO vende ni comparte datos de clientes.
- Implementación rápida: la mayoría de módulos en 1–3 semanas.

PRECIOS (solo cuando pregunten, siempre como rangos, y SIEMPRE invita a la demo después):
- $500 – $1,500 USD — implementaciones puntuales
- $1,500 – $5,000 USD — múltiples módulos
- $5,000+ USD — ecosistema completo / multi-sucursal

CONTACTO (compártelo solo si lo piden o si la conversación lo requiere):
- Email: contact@conect-r.com
- Tel / WhatsApp / SMS: +1 916 812 0873

CALIFICACIÓN PARA LA DEMO:
Cuando el usuario muestre interés real (precios, detalles de módulos, "quiero una demo", "cómo empiezo"), entreteje estas preguntas naturalmente — UNA A LA VEZ, no como interrogatorio:
  • Nombre del negocio y tipo de restaurante
  • Número de sucursales
  • Sitio web o redes sociales
  • Reto principal en tecnología hoy
  • Qué herramientas usa actualmente (POS, web, ordering)
  • Qué módulo le interesa más
  • Cuántos puntos de contacto digitalizar (mesas/counters)
  • Rango de presupuesto estimado
  • Quién más participará en la reunión
  • Su nombre, rol, teléfono y correo

Reacciona a cada respuesta, ofrece un tip relevante de algún módulo, y siempre apunta hacia agendar la demo.

CIERRE DE LA DEMO:
Cuando tengas como mínimo: nombre del negocio, nombre del contacto, teléfono y correo (extra si tienes tipo de negocio, reto e interés), llama a la herramienta 'prepare_appointment' con todo lo recopilado. Usa cadena vacía "" para campos que no conozcas — NUNCA inventes datos. Después de llamar la herramienta, escribe UN mensaje corto de confirmación en el idioma del usuario, por ejemplo:
  ES: "Perfecto, ya armé el resumen para el equipo. Revísalo y mándalo cuando estés listo 🙌"
  EN: "Perfect, I've put together the summary for the team. Review it and send when you're ready 🙌"

No llames la herramienta hasta tener esos campos mínimos. No la llames dos veces. Después de llamarla, puedes seguir conversando normal si el usuario tiene más preguntas — pero sigue invitando a la demo cuando tenga sentido.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "prepare_appointment",
      description:
        "Call when you have collected enough info to draft the appointment email. Required minimum: businessName, contactName, phone, email. Use empty string for fields you genuinely don't know — never invent values.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          businessName: { type: "string" },
          businessType: { type: "string" },
          locations: { type: "string" },
          website: { type: "string" },
          challenge: { type: "string" },
          currentTech: { type: "string" },
          interest: { type: "string" },
          touchpoints: { type: "string" },
          budget: { type: "string" },
          attendees: { type: "string" },
          contactName: { type: "string" },
          contactRole: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
        },
        required: [
          "businessName", "businessType", "locations", "website",
          "challenge", "currentTech", "interest", "touchpoints",
          "budget", "attendees", "contactName", "contactRole", "phone", "email",
        ],
      },
    },
  },
];

router.post("/assistant/chat", async (req, res) => {
  try {
    if (!client) {
      res.status(503).json({ error: "AI not configured" });
      return;
    }

    const body = req.body as { messages?: ChatMsg[]; lang?: "es" | "en" };
    const history = Array.isArray(body.messages) ? body.messages : [];
    const lang = body.lang === "es" ? "es" : "en";

    if (history.length === 0) {
      res.status(400).json({ error: "messages required" });
      return;
    }

    const trimmed = history.slice(-20).map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content ?? "").slice(0, 2000),
    }));

    const langHint =
      lang === "es"
        ? "The user is browsing the Spanish version of the site. Reply in Spanish unless they switch."
        : "The user is browsing the English version of the site. Reply in English unless they switch.";

    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 700,
      temperature: 0.7,
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${langHint}` },
        ...trimmed,
      ],
      tools: TOOLS,
      tool_choice: "auto",
    });

    const choice = completion.choices[0];
    const reply = choice?.message?.content?.trim() ?? "";
    let appointment: Record<string, string> | null = null;

    const toolCall = choice?.message?.tool_calls?.[0];
    if (toolCall && toolCall.type === "function" && toolCall.function?.name === "prepare_appointment") {
      try {
        const parsed = JSON.parse(toolCall.function.arguments || "{}") as Record<string, unknown>;
        appointment = Object.fromEntries(
          Object.entries(parsed).map(([k, v]) => [k, typeof v === "string" ? v : ""]),
        );
      } catch (e) {
        req.log.warn({ e }, "failed to parse tool args");
      }
    }

    res.json({ reply, appointment });
  } catch (err: unknown) {
    req.log.error({ err }, "assistant chat failed");
    res.status(500).json({ error: "assistant_failed" });
  }
});

type Appointment = {
  businessName?: string;
  businessType?: string;
  locations?: string;
  website?: string;
  challenge?: string;
  currentTech?: string;
  interest?: string;
  touchpoints?: string;
  budget?: string;
  attendees?: string;
  contactName?: string;
  contactRole?: string;
  phone?: string;
  email?: string;
};

function row(label: string, value: string | undefined) {
  const v = (value ?? "").trim();
  return v
    ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;vertical-align:top;width:200px">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:500">${v}</td></tr>`
    : "";
}

function buildHtml(lang: "es" | "en", a: Appointment) {
  const t =
    lang === "es"
      ? {
          intro:
            "¡Gracias por agendar tu demo con Conect-R! Aquí está el resumen que compartimos con el equipo.",
          profile: "Perfil del Negocio",
          diagnosis: "Diagnóstico",
          interest: "Interés",
          budgetSection: "Presupuesto y decisión",
          contact: "Contacto",
          businessName: "Nombre del negocio",
          businessType: "Giro",
          locations: "Ubicaciones",
          website: "Sitio / redes",
          challenge: "Reto actual",
          currentTech: "Tecnología actual",
          interestField: "Solución de interés",
          touchpoints: "Puntos a digitalizar",
          budget: "Presupuesto",
          attendees: "Participantes",
          contactName: "Contacto",
          role: "Cargo",
          phone: "Teléfono",
          email: "Correo",
          footer:
            "El equipo de Conect-R se pondrá en contacto contigo en las próximas 24 horas. Si necesitas algo antes, escríbenos a contact@conect-r.com o al +1 916 812 0873.",
        }
      : {
          intro:
            "Thanks for booking a demo with Conect-R! Here's the summary we shared with the team.",
          profile: "Business profile",
          diagnosis: "Diagnosis",
          interest: "Interest",
          budgetSection: "Budget & decision",
          contact: "Contact",
          businessName: "Business name",
          businessType: "Industry",
          locations: "Locations",
          website: "Website / social",
          challenge: "Current challenge",
          currentTech: "Current tech",
          interestField: "Solution of interest",
          touchpoints: "Touchpoints",
          budget: "Budget",
          attendees: "Attendees",
          contactName: "Contact",
          role: "Role",
          phone: "Phone",
          email: "Email",
          footer:
            "The Conect-R team will reach out within 24 hours. If you need anything sooner, email contact@conect-r.com or call +1 916 812 0873.",
        };

  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding:18px 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#f97316;text-transform:uppercase">${title}</td></tr>${rows}`;

  return `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px">
<tr><td style="padding:24px 28px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff">
<div style="font-size:11px;font-weight:700;letter-spacing:0.16em;opacity:0.85">CONECT-R</div>
<div style="font-size:22px;font-weight:800;margin-top:4px">${lang === "es" ? "Resumen de tu cita" : "Your appointment summary"}</div>
</td></tr>
<tr><td style="padding:24px 28px;color:#0f172a;font-size:14px;line-height:1.55">${t.intro}</td></tr>
<tr><td style="padding:0 28px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${section(t.profile, row(t.businessName, a.businessName) + row(t.businessType, a.businessType) + row(t.locations, a.locations) + row(t.website, a.website))}
${section(t.diagnosis, row(t.challenge, a.challenge) + row(t.currentTech, a.currentTech))}
${section(t.interest, row(t.interestField, a.interest) + row(t.touchpoints, a.touchpoints))}
${section(t.budgetSection, row(t.budget, a.budget) + row(t.attendees, a.attendees))}
${section(t.contact, row(t.contactName, a.contactName) + row(t.role, a.contactRole) + row(t.phone, a.phone) + row(t.email, a.email))}
</table></td></tr>
<tr><td style="padding:18px 28px 26px;color:#64748b;font-size:12px;line-height:1.55;border-top:1px solid #e2e8f0">${t.footer}</td></tr>
</table></td></tr></table></body></html>`;
}

function buildText(lang: "es" | "en", a: Appointment) {
  const lines = [
    lang === "es" ? "Resumen de cita — Conect-R" : "Appointment summary — Conect-R",
    "",
    `Business: ${a.businessName || "—"} (${a.businessType || "—"})`,
    `Locations: ${a.locations || "—"}`,
    `Website: ${a.website || "—"}`,
    `Challenge: ${a.challenge || "—"}`,
    `Current tech: ${a.currentTech || "—"}`,
    `Interest: ${a.interest || "—"}`,
    `Touchpoints: ${a.touchpoints || "—"}`,
    `Budget: ${a.budget || "—"}`,
    `Attendees: ${a.attendees || "—"}`,
    `Contact: ${a.contactName || "—"}${a.contactRole ? ` (${a.contactRole})` : ""}`,
    `Phone: ${a.phone || "—"}`,
    `Email: ${a.email || "—"}`,
  ];
  return lines.join("\n");
}

router.post("/assistant/send-appointment", async (req, res) => {
  try {
    const body = req.body as { appointment?: Appointment; lang?: "es" | "en" };
    const a = body.appointment;
    const lang = body.lang === "es" ? "es" : "en";
    if (!a || !a.email || !a.contactName || !a.businessName) {
      res.status(400).json({ error: "missing_required_fields" });
      return;
    }

    const { client, fromEmail } = await getUncachableSendGridClient();

    const subjectClient =
      lang === "es"
        ? `Conect-R · Tu cita está agendada (${a.businessName})`
        : `Conect-R · Your appointment is booked (${a.businessName})`;
    const subjectTeam = `[Demo] ${a.businessName} — ${a.contactName}`;

    const html = buildHtml(lang, a);
    const text = buildText(lang, a);

    const sends = await Promise.allSettled([
      client.send({
        to: a.email,
        from: fromEmail,
        subject: subjectClient,
        text,
        html,
        replyTo: TEAM_EMAIL,
      }),
      client.send({
        to: TEAM_EMAIL,
        from: fromEmail,
        subject: subjectTeam,
        text,
        html,
        replyTo: a.email,
      }),
    ]);

    const errors = sends
      .map((s, i) => (s.status === "rejected" ? { i, reason: s.reason } : null))
      .filter(Boolean);
    if (errors.length) {
      req.log.warn({ errors }, "send-appointment partial failure");
    }
    if (errors.length === 2) {
      res.status(502).json({ error: "send_failed" });
      return;
    }
    res.json({ ok: true, sent: sends.length - errors.length });
  } catch (err: unknown) {
    req.log.error({ err }, "send-appointment failed");
    res.status(500).json({ error: "send_failed" });
  }
});

export default router;
