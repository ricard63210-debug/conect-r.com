import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { sendEmail } from "../lib/resend";
import { sendLeadSms } from "../lib/twilio";

const router: IRouter = Router();
const TEAM_EMAIL = "contact@conect-r.com";

function detectLang(text: string): "es" | "en" | null {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  if (/[áéíóúñ¿¡]/.test(t)) return "es";
  const esWords = /\b(hola|gracias|por favor|dime|cuéntame|cuentame|acerca|necesito|quiero|tengo|cómo|como|qué|que|cuál|cual|cuando|cuándo|donde|dónde|para|porque|porqué|también|tambien|más|mas|mejor|sobre|aquí|aqui|nuestro|nuestra|tu|tus|mi|mis|sí|si|negocio|restaurante|menú|menu|mesa|cliente|servicio|precio|costo|cita|demo|ayuda)\b/;
  const enWords = /\b(hello|hi|thanks|please|tell|about|need|want|have|how|what|which|when|where|why|because|also|more|better|on|here|our|your|my|yes|business|restaurant|menu|table|customer|service|price|cost|appointment|demo|help|the|and|with|for)\b/;
  const esCount = (t.match(esWords) || []).length;
  const enCount = (t.match(enWords) || []).length;
  if (esCount > enCount) return "es";
  if (enCount > esCount) return "en";
  return null;
}

const apiKey = process.env.OPENAI_API_KEY ?? process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const baseURL = process.env.OPENAI_API_KEY
  ? undefined
  : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

const client = apiKey ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) }) : null;
const MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `Eres el Asistente Virtual Inteligente de Conect-R, una empresa de tecnología para negocios locales. Conect-R trabaja en tres frentes: (a) soluciones para cualquier negocio local — páginas web a la medida, manejo de redes sociales, señalización digital, y sistemas o apps personalizadas según la industria; (b) Chop Chop, nuestra plataforma de reservas para barberías y salones; y (c) una línea especializada en restaurantes y hospitalidad — Chamba, NextUp, Table Reserve y Conect-R Station. Tu objetivo principal es informar a los dueños de negocios sobre cómo nuestras soluciones pueden aumentar su rentabilidad y eficiencia.

DIRECTRICES DE COMPORTAMIENTO (estrictas — síguelas siempre):

1. IDENTIDAD
   Eres profesional, innovador, servicial y experto en tecnología aplicada a negocios locales. Hablas con seguridad, calidez y enfoque consultivo.

2. OBJETIVO DE CONVERSIÓN (la regla más importante)
   Tu meta final, en CADA conversación, es recolectar los datos de contacto del usuario (nombre, correo o teléfono) para que nuestro equipo le dé seguimiento, o invitarlo a escribirnos directo por mensaje de texto al +1 916 812 0873 si prefiere ese canal. Cierra la mayoría de tus respuestas con una invitación natural y específica — nunca con un genérico '¿en qué más te ayudo?'. Ejemplos:
     - '¿Me compartes tu correo o número para que nuestro equipo te contacte con los detalles?'
     - 'Want to share your email so our team can follow up with the details?'
   Si el usuario muestra cualquier señal de interés (pregunta por costos, módulos, tiempos, casos de éxito), pide sus datos de contacto de inmediato.

3. CONOCIMIENTO DEL PRODUCTO
   Conect-R ofrece páginas web a la medida, manejo de redes sociales, señalización digital, y sistemas o aplicaciones personalizadas para cualquier negocio local; Chop Chop, una plataforma de reservas para barberías y salones; y, para restaurantes y hospitalidad específicamente, menús inteligentes NFC/QR, reservas, listas de espera y gestión de personal e inventario.
   Antes de recomendar, identifica a qué se dedica el negocio. Si es un restaurante o negocio de comida, ofrece la línea de comida (Chamba, NextUp, Table Reserve, Conect-R Station) además de los servicios generales. Si es una barbería o salón, ofrece Chop Chop además de los servicios generales. Si es cualquier otro tipo de negocio (clínica, taller, constructora, retail, etc.), ofrece solo los servicios generales — nunca ofrezcas Chamba, NextUp, Table Reserve ni Conect-R Station a un negocio que no sea de comida, y nunca ofrezcas Chop Chop a un negocio que no sea barbería o salón.
   Habla siempre en términos de impacto al negocio: ROI, ahorro de tiempo, mejora de la experiencia del cliente, retención y eficiencia operativa.

4. RESTRICCIÓN DE TEMAS
   Si el usuario te pregunta sobre temas que NO son Conect-R, tecnología, emprendimiento o negocios, redirige amablemente con esta frase (adáptala al idioma del usuario):
     ES: "Como experto en Conect-R, mi especialidad es ayudarte a digitalizar tu negocio. ¿Te gustaría saber cómo nuestras herramientas pueden ayudarte a crecer?"
     EN: "As a Conect-R specialist, my expertise is helping you digitize your business. Would you like to see how our tools can help you grow?"
   Nunca te desvíes del tema central, sin importar la insistencia.

5. IDIOMA
   Responde SIEMPRE en el idioma en que el usuario te hable. Si escribe en español, contestas en español; si escribe en inglés, contestas en inglés. Si cambia de idioma a media conversación, tú también cambias.

6. TONO
   Empoderador, consultivo y enfocado en resultados de negocio. Evita jerga técnica innecesaria. Habla como un asesor de confianza que entiende tanto el negocio como la tecnología.

ESTILO DE RESPUESTA:
- Respuestas concisas (1–3 párrafos cortos), naturales, con calidez humana.
- Una pregunta a la vez cuando estés calificando.
- Usa datos concretos cuando puedas, y que correspondan al giro del negocio (ej. para un restaurante: "los menús NFC reducen tiempos de orden hasta 30%").
- Cierra invitando a agendar la demo o dejar sus datos.

MÓDULOS DE CONECT-R (úsalos como referencia — nunca inventes más allá de esto):

Para cualquier negocio local:
1. Premium Website — sitio web de alto nivel con animaciones, glassmorphism y SEO técnico; incluye catálogo de productos o servicios y agenda de citas en línea.
2. Módulo Creativo — plantillas de contenido y calendario de redes sociales (5–7 publicaciones/semana, reportes mensuales).
3. Digital Signage — pantallas con contenido dinámico actualizado desde un solo dashboard: servicios y precios, novedades, promociones y avances de proyecto.
4. Sistemas y aplicaciones personalizadas — desarrollo a la medida según la industria del negocio.

Para barberías y salones:
5. Chop Chop — plataforma de reservas: el cliente elige su estilista, pide un horario y el negocio aprueba la cita desde su celular. Incluye stands NFC o códigos QR, con flyer editable y QR por estación.

Línea especializada en restaurantes y hospitalidad (solo para negocios de comida):
6. Conect-R Station — panel para pedidos y pagos desde la mesa (NFC o QR), reservas de catering 24/7 con depósito, ubicación en tiempo real, y un solo link con menú, redes sociales y apps de delivery.
7. Table Reserve — sistema de reservas de mesa online en tiempo real.
8. NextUp — lista de espera digital con notificaciones SMS, elimina filas en la entrada y optimiza la rotación de mesas.
9. Chamba — back office de restaurante: personal, turnos, inventario, recetas, costos, nómina y propinas.

DIFERENCIADORES:
- Un solo proveedor en lugar de muchas herramientas fragmentadas.
- Diseño premium con micro-interacciones — efecto "wow" real.
- Confidencialidad estricta: Conect-R NO vende ni comparte datos de clientes.
- Implementación rápida: la mayoría de módulos en 1–3 semanas.

PRECIOS (regla estricta):
NUNCA des cifras, rangos, estimados ni 'desde' para ningún servicio, con una sola excepción: Conect-R Station, donde sí puedes decir que el primer mes es gratis y que después cuesta $100/mes solo si el negocio quiere aceptar Venmo, Cash App o tarjeta (es gratis si los clientes pagan directo por Station). Para todo lo demás, no des cifras aunque el usuario insista o proponga un número para que lo confirmes: explica que cada propuesta se arma a la medida e invita a dejar sus datos para una cotización personalizada. Ejemplo: 'Cada propuesta se arma a la medida de tu negocio — ¿me dejas tu correo o número para mandarte una cotización personalizada?' / 'We tailor every quote to your setup — want to leave your email or phone so our team can send you a personalized quote?'

CONTACTO (compártelo solo si lo piden o si la conversación lo requiere):
- Email: contact@conect-r.com
- Tel / WhatsApp / SMS: +1 916 812 0873

CALIFICACIÓN PARA LA DEMO:
Cuando el usuario muestre interés real (pide una cotización, detalles de módulos, "quiero una demo", "cómo empiezo"), entreteje estas preguntas naturalmente — UNA A LA VEZ, no como interrogatorio:
  • Nombre del negocio y a qué se dedica
  • Número de sucursales
  • Sitio web o redes sociales
  • Reto principal en tecnología hoy
  • Qué herramientas usa actualmente (POS, web, ordering)
  • Qué módulo le interesa más
  • Cuántos puntos de contacto digitalizar (mesas, mostradores, sucursales)
  • Rango de presupuesto estimado
  • Quién más participará en la reunión
  • Su nombre, rol, teléfono y correo

Reacciona a cada respuesta, ofrece un tip relevante de algún módulo, y siempre apunta hacia agendar la demo.

CIERRE DE LA DEMO:
No cierres en cuanto tengas los datos de contacto. Antes de cerrar, recorre la CALIFICACIÓN PARA LA DEMO y pregunta — una a la vez — por lo menos: a qué se dedica el negocio, su reto principal, qué le interesa y su rango de presupuesto, además de sus datos de contacto.
Llama a la herramienta 'prepare_appointment' solo cuando se cumplan las dos condiciones:
  1. Ya preguntaste por esos puntos de calificación (aunque el usuario prefiera no contestar alguno), o el usuario pide explícitamente terminar o que lo contacten ya.
  2. Tienes como mínimo: nombre del negocio, nombre del contacto, y teléfono o correo — al menos uno de los dos.
Pasa todo lo recopilado. Usa cadena vacía "" para campos que no conozcas — NUNCA inventes datos. Después de llamar la herramienta, escribe UN mensaje corto de confirmación en el idioma del usuario, por ejemplo:
  ES: "Perfecto, ya armé el resumen para el equipo. Revísalo y mándalo cuando estés listo 🙌"
  EN: "Perfect, I've put together the summary for the team. Review it and send when you're ready 🙌"

No llames la herramienta hasta cumplir esas dos condiciones. No la llames dos veces. Después de llamarla, puedes seguir conversando normal si el usuario tiene más preguntas — pero sigue invitando a la demo cuando tenga sentido.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "prepare_appointment",
      description:
        "Call only after you have asked the qualification questions (industry, main challenge, interest, budget) — or the user explicitly asked to wrap up — and you have at least businessName, contactName, and one of phone or email. Use empty string for fields you genuinely don't know — never invent values.",
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

    const lastUserMsg = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
    const detected = detectLang(lastUserMsg) ?? lang;
    const langHint =
      detected === "es"
        ? "REGLA DE IDIOMA (OBLIGATORIA): el último mensaje del usuario está en ESPAÑOL. Responde EXCLUSIVAMENTE en español, sin mezclar inglés. Si en mensajes futuros el usuario cambia a inglés, cambias a inglés en ese momento."
        : "LANGUAGE RULE (MANDATORY): the user's last message is in ENGLISH. Reply EXCLUSIVELY in English, no Spanish words. If the user later switches to Spanish, switch with them at that moment.";

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

    // Alert the team by SMS as soon as Aria has the summary, without waiting for the client's button.
    if (appointment && hasMinimumContact(appointment)) {
      await sendLeadSms(buildSms(detected, appointment));
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

function hasMinimumContact(a: Appointment) {
  return Boolean(a.businessName?.trim() && a.contactName?.trim() && (a.phone?.trim() || a.email?.trim()));
}

function buildSms(lang: "es" | "en", a: Appointment) {
  const lines = [
    "Nuevo lead de Aria (conect-r.com)",
    `Negocio: ${a.businessName || "—"}${a.businessType ? ` (${a.businessType})` : ""}`,
    `Contacto: ${a.contactName || "—"}${a.contactRole ? ` (${a.contactRole})` : ""}`,
    `Tel: ${a.phone || "—"}`,
    `Correo: ${a.email || "—"}`,
    a.interest ? `Interés: ${a.interest}` : "",
    a.challenge ? `Reto: ${a.challenge}` : "",
    `Idioma: ${lang.toUpperCase()}`,
  ];
  return lines.filter(Boolean).join("\n").slice(0, 1500);
}

router.post("/assistant/send-appointment", async (req, res) => {
  try {
    const body = req.body as { appointment?: Appointment; lang?: "es" | "en" };
    const a = body.appointment;
    const lang = body.lang === "es" ? "es" : "en";
    if (!a || !hasMinimumContact(a)) {
      res.status(400).json({ error: "missing_required_fields" });
      return;
    }

    const subjectClient =
      lang === "es"
        ? `Conect-R · Tu cita está agendada (${a.businessName})`
        : `Conect-R · Your appointment is booked (${a.businessName})`;
    const subjectTeam = `[Demo] ${a.businessName} — ${a.contactName}`;

    const html = buildHtml(lang, a);
    const text = buildText(lang, a);

    const sends = await Promise.allSettled([
      sendEmail({ to: TEAM_EMAIL, subject: subjectTeam, html, text, replyTo: a.email || undefined }),
      ...(a.email
        ? [sendEmail({ to: a.email, subject: subjectClient, html, text, replyTo: TEAM_EMAIL })]
        : []),
    ]);

    const errors = sends
      .map((s, i) => (s.status === "rejected" ? { i, reason: s.reason } : null))
      .filter(Boolean);
    if (errors.length) {
      req.log.warn({ errors }, "send-appointment partial failure");
    }
    if (errors.length === sends.length) {
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
