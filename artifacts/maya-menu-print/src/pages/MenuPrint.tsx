import { useRef } from "react";
import { Printer } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const MENU = [
  {
    category: "BRUNCH",
    subtitle: "Domingos 11am – 3pm",
    icon: "🌅",
    items: [
      { name: "Chilaquiles Maya", description: "Tortillas de maíz fritas en salsa roja o verde, queso, arrachera, papas y frijoles", price: "19", star: true },
      { name: "Huevos Rancheros", description: "Huevos sobre tortilla con salsa roja casera, frijoles negros y chorizo", price: "16" },
      { name: "Pancakes de Cajeta", description: "Hot cakes esponjosos con cajeta artesanal, fresas y crema", price: "14" },
    ],
  },
  {
    category: "STARTERS",
    subtitle: "Antojitos para compartir",
    icon: "🫶",
    items: [
      { name: "Birria Egg Rolls", description: "Rollos crujientes rellenos de birria de res y queso, servidos con consomé, cebolla curtida y salsa molcajete", price: "13", star: true },
      { name: "Pork Belly Bites", description: "Chicharrón de cerdo crujiente con salsa de néctar de agave dulce y picante", price: "12", spicy: true },
      { name: "Guacamole Maya", description: "Aguacate fresco, jitomate, cilantro, cebolla morada y chile serrano", price: "11", veg: true },
      { name: "Elote Loco", description: "Elote asado con mayonesa, queso cotija, chile piquín y limón", price: "9", veg: true },
    ],
  },
  {
    category: "TACOS",
    subtitle: "Orden de 2 tacos",
    icon: "🌮",
    items: [
      { name: "Taco Maya", description: "Skirt steak, queso fresco, aguacate, cebolla curtida, inspirado en la dieta maya", price: "16", star: true },
      { name: "Taco de Birria", description: "Res estofada en consomé con queso, cebolla y cilantro", price: "15", spicy: true },
      { name: "Taco de Carnitas", description: "Cerdo confitado, salsa verde, cebolla y cilantro", price: "14" },
      { name: "Taco Vegano", description: "Hongos portobello al pastor, aguacate, pico de gallo", price: "13", veg: true },
    ],
  },
  {
    category: "MARISCOS",
    subtitle: "Del Océano a tu mesa",
    icon: "🦐",
    items: [
      { name: "Ceviche Maya", description: "Camarón y pulpo marinados en limón, jitomate, cebolla, cilantro y chile jalapeño", price: "18", spicy: true },
      { name: "Tostadas de Atún", description: "Atún fresco con aguacate, mayonesa de chipotle y masago", price: "17", star: true },
      { name: "Aguachile Verde", description: "Camarón crudo marinado en chile serrano, pepino y cebolla morada", price: "19", spicy: true },
    ],
  },
  {
    category: "PLATOS FUERTES",
    subtitle: "Cocina de autor",
    icon: "🍽",
    items: [
      { name: "Mole Negro", description: "Pechuga de pollo bañada en mole negro oaxaqueño, arroz y frijoles", price: "22", star: true },
      { name: "Arrachera a la Parrilla", description: "Arrachera marinada con chimichurri maya, papas rústicas y ensalada", price: "26" },
      { name: "Chile en Nogada", description: "Poblano relleno de picadillo, cubierto de nogada de nuez y granada", price: "24" },
      { name: "Camarones al Mezcal", description: "Camarones en mantequilla de ajo y mezcal, arroz negro y tortillas", price: "25", spicy: true },
    ],
  },
  {
    category: "DRINKS",
    subtitle: "Cócteles artesanales",
    icon: "🍹",
    items: [
      { name: "Margarita Clásica", description: "Tequila 100% agave, triple sec, limón fresco, sal", price: "12" },
      { name: "Margarita de Tamarindo", description: "Con pulpa de tamarindo y chile piquín", price: "13", spicy: true },
      { name: "Mezcal Negroni", description: "Mezcal, Campari, vermut rosso", price: "14" },
      { name: "Michelada Maya", description: "Cerveza con clamato, salsa valentina, limón y especias", price: "10" },
      { name: "Agua de Jamaica", description: "Hibisco fresco, sin azúcar añadida", price: "5", veg: true },
    ],
  },
];

const GOLD = "#c9a227";
const DARK_GREEN = "#1a2e1e";
const CREAM = "#fdf6e3";
const WARM_BROWN = "#5c3d1a";
const LIGHT_CREAM = "#faf2de";

function Divider({ color = GOLD, width = "100%" }: { color?: string; width?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width }}>
      <div style={{ flex: 1, height: 1, background: `${color}55` }} />
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={color} opacity="0.8" />
      </svg>
      <div style={{ flex: 1, height: 1, background: `${color}55` }} />
    </div>
  );
}

function OrnateCorner({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
    >
      <path d="M2 2 Q2 30 30 30" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      <path d="M2 2 Q30 2 30 30" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      <circle cx="2" cy="2" r="2.5" fill={GOLD} opacity="0.6" />
      <circle cx="30" cy="2" r="1.5" fill={GOLD} opacity="0.4" />
      <circle cx="2" cy="30" r="1.5" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function MenuItem({
  name,
  description,
  price,
  star,
  spicy,
  veg,
}: {
  name: string;
  description: string;
  price: string;
  star?: boolean;
  spicy?: boolean;
  veg?: boolean;
}) {
  return (
    <div style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: 11.5, color: DARK_GREEN, fontWeight: 600, letterSpacing: "0.03em" }}>
            {name}
          </span>
          {star && <span style={{ fontSize: 9, color: GOLD, fontWeight: 700 }}>★ CHEF</span>}
          {spicy && <span style={{ fontSize: 8.5, color: "#b03a2e" }}>● SPICY</span>}
          {veg && <span style={{ fontSize: 8.5, color: "#1a7a3c" }}>● VEG</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <div style={{ borderBottom: `1px dotted ${GOLD}88`, width: 30 }} />
          <span style={{ fontFamily: "Cinzel, serif", fontSize: 11.5, color: WARM_BROWN, fontWeight: 600 }}>${price}</span>
        </div>
      </div>
      <p style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 10.5, color: "#5a4a3a", margin: "2px 0 0 0", lineHeight: 1.45, fontStyle: "italic" }}>
        {description}
      </p>
    </div>
  );
}

function MenuSection({ category, subtitle, icon, items }: typeof MENU[0]) {
  return (
    <div style={{ marginBottom: 18, pageBreakInside: "avoid" }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: "Cinzel, serif", fontSize: 13.5, color: GOLD, letterSpacing: "0.18em", fontWeight: 700 }}>
          — {category} —
        </div>
        <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 10, color: "#7a6040", fontStyle: "italic", marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
      {items.map((item) => (
        <MenuItem key={item.name} {...item} />
      ))}
    </div>
  );
}

const PAGE_W = 816;
const PAGE_H = 1056;
const PAD = 56;

function CoverPage() {
  return (
    <div
      className="print-page"
      style={{
        width: PAGE_W,
        height: PAGE_H,
        background: DARK_GREEN,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: PAD,
      }}
    >
      {/* Texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(212,160,23,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(212,160,23,0.06) 0%, transparent 55%)`,
        pointerEvents: "none",
      }} />

      {/* Outer border */}
      <div style={{
        position: "absolute", inset: 24,
        border: `1px solid ${GOLD}55`,
        pointerEvents: "none",
      }} />
      {/* Inner border */}
      <div style={{
        position: "absolute", inset: 32,
        border: `1px solid ${GOLD}33`,
        pointerEvents: "none",
      }} />

      {/* Corner ornaments */}
      <div style={{ position: "absolute", top: 30, left: 30 }}><OrnateCorner /></div>
      <div style={{ position: "absolute", top: 30, right: 30, transform: "scaleX(-1)" }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 30, left: 30, transform: "scaleY(-1)" }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 30, right: 30, transform: "scale(-1,-1)" }}><OrnateCorner /></div>

      {/* Logo */}
      <div style={{ marginBottom: 28 }}>
        <img
          src={`${BASE}maya-logo.jpeg`}
          alt="Maya Cantina"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: `3px solid ${GOLD}`,
            objectFit: "cover",
            boxShadow: `0 0 40px ${GOLD}44`,
          }}
        />
      </div>

      {/* Restaurant name */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "Cinzel Decorative, Cinzel, serif",
          fontSize: 52,
          color: GOLD,
          letterSpacing: "0.12em",
          lineHeight: 1,
          textShadow: `0 2px 24px ${GOLD}55`,
        }}>
          MAYA
        </div>
        <div style={{
          fontFamily: "Cinzel Decorative, Cinzel, serif",
          fontSize: 18,
          color: `${GOLD}bb`,
          letterSpacing: "0.4em",
          marginTop: 6,
        }}>
          CANTINA
        </div>
      </div>

      {/* Ornamental divider */}
      <div style={{ width: 260, margin: "24px auto" }}>
        <Divider color={GOLD} />
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: "EB Garamond, Georgia, serif",
        fontSize: 17,
        color: `${CREAM}cc`,
        fontStyle: "italic",
        letterSpacing: "0.08em",
        textAlign: "center",
      }}>
        Cocina Mexicana Auténtica
      </div>
      <div style={{
        fontFamily: "Cinzel, serif",
        fontSize: 10.5,
        color: `${GOLD}99`,
        letterSpacing: "0.25em",
        marginTop: 8,
        textAlign: "center",
      }}>
        SACRAMENTO · CALIFORNIA
      </div>

      {/* Hours */}
      <div style={{ marginTop: 44, textAlign: "center" }}>
        <div style={{
          fontFamily: "Cinzel, serif",
          fontSize: 9.5,
          color: `${GOLD}88`,
          letterSpacing: "0.25em",
          marginBottom: 12,
        }}>
          HORARIO
        </div>
        <div style={{ display: "flex", gap: 48, justifyContent: "center" }}>
          {[
            { day: "Martes – Jueves", hours: "5:00 pm – 10:00 pm" },
            { day: "Viernes – Sábado", hours: "5:00 pm – 11:00 pm" },
            { day: "Domingo Brunch", hours: "11:00 am – 3:00 pm" },
          ].map((h) => (
            <div key={h.day} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, color: `${GOLD}99`, letterSpacing: "0.1em" }}>{h.day}</div>
              <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 11, color: `${CREAM}bb`, fontStyle: "italic", marginTop: 3 }}>{h.hours}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontFamily: "Cinzel, serif", fontSize: 9, color: `${GOLD}66`, letterSpacing: "0.2em" }}>
          LUNES CERRADO · HAPPY HOUR MAR–JUE 5–7 PM
        </div>
      </div>

      {/* Instagram / Contact */}
      <div style={{ position: "absolute", bottom: 56, textAlign: "center", width: "100%" }}>
        <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 11, color: `${GOLD}77`, fontStyle: "italic", letterSpacing: "0.05em" }}>
          @mayacantinasac &nbsp;·&nbsp; Mayarestaurantsac
        </div>
      </div>
    </div>
  );
}

function MenuPage({ left, right }: { left: typeof MENU; right: typeof MENU }) {
  return (
    <div
      className="print-page"
      style={{
        width: PAGE_W,
        height: PAGE_H,
        background: CREAM,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: PAD,
      }}
    >
      {/* Outer border */}
      <div style={{ position: "absolute", inset: 18, border: `1px solid ${GOLD}55`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 26, border: `0.5px solid ${GOLD}33`, pointerEvents: "none" }} />

      {/* Corner ornaments */}
      <div style={{ position: "absolute", top: 22, left: 22, opacity: 0.6 }}><OrnateCorner /></div>
      <div style={{ position: "absolute", top: 22, right: 22, transform: "scaleX(-1)", opacity: 0.6 }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 22, left: 22, transform: "scaleY(-1)", opacity: 0.6 }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 22, right: 22, transform: "scale(-1,-1)", opacity: 0.6 }}><OrnateCorner /></div>

      {/* Top header */}
      <div style={{ textAlign: "center", marginBottom: 18, flexShrink: 0 }}>
        <div style={{ fontFamily: "Cinzel Decorative, Cinzel, serif", fontSize: 22, color: DARK_GREEN, letterSpacing: "0.2em" }}>
          MAYA CANTINA
        </div>
        <div style={{ marginTop: 6 }}>
          <Divider color={GOLD} />
        </div>
      </div>

      {/* Two-column menu */}
      <div style={{ display: "flex", gap: 36, flex: 1 }}>
        {/* Left column */}
        <div style={{ flex: 1 }}>
          {left.map((section) => (
            <MenuSection key={section.category} {...section} />
          ))}
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, background: `${GOLD}33`, flexShrink: 0 }} />

        {/* Right column */}
        <div style={{ flex: 1 }}>
          {right.map((section) => (
            <MenuSection key={section.category} {...section} />
          ))}
        </div>
      </div>

      {/* Footer legend */}
      <div style={{ marginTop: 18, flexShrink: 0 }}>
        <Divider color={GOLD} />
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 10 }}>
          {[
            { badge: "★ CHEF", label: "Favorito del Chef", color: GOLD },
            { badge: "● SPICY", label: "Picante", color: "#b03a2e" },
            { badge: "● VEG", label: "Vegetariano / Vegano", color: "#1a7a3c" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: 8.5, color: l.color, fontWeight: 700 }}>{l.badge}</span>
              <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 9.5, color: "#7a6040", fontStyle: "italic" }}>{l.label}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: 7.5, color: `${GOLD}88`, letterSpacing: "0.2em" }}>
            SE APLICA CARGO POR SERVICIO DEL 18% · CONSULT A SU SERVIDOR SOBRE ALERGIAS
          </span>
        </div>
      </div>
    </div>
  );
}

function BackPage() {
  return (
    <div
      className="print-page"
      style={{
        width: PAGE_W,
        height: PAGE_H,
        background: DARK_GREEN,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: PAD,
      }}
    >
      <div style={{ position: "absolute", inset: 24, border: `1px solid ${GOLD}44`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 32, border: `0.5px solid ${GOLD}22`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 30, left: 30 }}><OrnateCorner /></div>
      <div style={{ position: "absolute", top: 30, right: 30, transform: "scaleX(-1)" }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 30, left: 30, transform: "scaleY(-1)" }}><OrnateCorner /></div>
      <div style={{ position: "absolute", bottom: 30, right: 30, transform: "scale(-1,-1)" }}><OrnateCorner /></div>

      <div style={{ textAlign: "center" }}>
        {/* Monogram */}
        <div style={{
          fontFamily: "Cinzel Decorative, Cinzel, serif",
          fontSize: 80,
          color: GOLD,
          opacity: 0.12,
          lineHeight: 1,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          letterSpacing: "0.1em",
          pointerEvents: "none",
          userSelect: "none",
        }}>M</div>

        <div style={{ fontFamily: "Cinzel, serif", fontSize: 11, color: `${GOLD}99`, letterSpacing: "0.3em", marginBottom: 28 }}>
          GRACIAS POR VISITARNOS
        </div>

        <div style={{ width: 200, margin: "0 auto 32px" }}>
          <Divider color={GOLD} />
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, color: `${GOLD}77`, letterSpacing: "0.2em", marginBottom: 16 }}>
            SÍGUENOS
          </div>
          <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 15, color: `${CREAM}cc`, fontStyle: "italic" }}>
            @mayacantinasac
          </div>
          <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 13, color: `${CREAM}99`, fontStyle: "italic", marginTop: 4 }}>
            Mayarestaurantsac
          </div>
        </div>

        <div style={{ width: 200, margin: "0 auto 32px" }}>
          <Divider color={GOLD} />
        </div>

        <div>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, color: `${GOLD}77`, letterSpacing: "0.2em", marginBottom: 12 }}>
            RESERVACIONES
          </div>
          <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: 13, color: `${CREAM}bb`, fontStyle: "italic" }}>
            tablereserve.conect-r.com/book/roosters-on-the-river
          </div>
        </div>

        <div style={{ width: 200, margin: "32px auto" }}>
          <Divider color={GOLD} />
        </div>

        <div style={{ fontFamily: "Cinzel Decorative, Cinzel, serif", fontSize: 28, color: GOLD, letterSpacing: "0.15em", opacity: 0.7 }}>
          MAYA
        </div>
        <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, color: `${GOLD}55`, letterSpacing: "0.35em", marginTop: 6 }}>
          SACRAMENTO · CALIFORNIA
        </div>
      </div>
    </div>
  );
}

export default function MenuPrint() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: "#2a2a2a", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Print button toolbar - hidden on print */}
      <div className="no-print" style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#1a1a1a",
        borderBottom: "1px solid #333",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: GOLD, fontFamily: "serif", fontSize: 16, fontWeight: 600 }}>Maya Cantina — Menú Imprimible</div>
          <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>3 páginas · US Letter (8.5" × 11") · 96 dpi</div>
        </div>
        <div style={{ color: "#666", fontSize: 11, textAlign: "right", lineHeight: 1.6 }}>
          Usa <strong style={{ color: "#aaa" }}>Ctrl+P</strong> / <strong style={{ color: "#aaa" }}>Cmd+P</strong><br />
          Selecciona "Sin márgenes" · Activar fondos de gráficos
        </div>
        <button
          onClick={handlePrint}
          style={{
            background: GOLD,
            color: "#1a1a1a",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            letterSpacing: "0.03em",
          }}
        >
          <Printer size={15} /> Imprimir
        </button>
      </div>

      {/* Pages */}
      <div ref={printRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "32px 0 64px" }}>
        {/* Page 1: Cover */}
        <div>
          <div className="no-print" style={{ color: "#666", fontSize: 10, textAlign: "center", marginBottom: 6, letterSpacing: "0.1em" }}>PÁGINA 1 — PORTADA</div>
          <CoverPage />
        </div>

        {/* Page 2: Menu */}
        <div>
          <div className="no-print" style={{ color: "#666", fontSize: 10, textAlign: "center", marginBottom: 6, letterSpacing: "0.1em" }}>PÁGINA 2 — MENÚ COMPLETO</div>
          <MenuPage
            left={[MENU[0], MENU[1], MENU[2]]}
            right={[MENU[3], MENU[4], MENU[5]]}
          />
        </div>

        {/* Page 3: Back */}
        <div>
          <div className="no-print" style={{ color: "#666", fontSize: 10, textAlign: "center", marginBottom: 6, letterSpacing: "0.1em" }}>PÁGINA 3 — CONTRAPORTADA</div>
          <BackPage />
        </div>
      </div>
    </div>
  );
}
