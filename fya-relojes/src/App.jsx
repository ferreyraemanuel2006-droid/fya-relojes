import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// BRAND: F&A RELOJES
// Paleta: Azul marino profundo (#0D1B2A) + Dorado (#C9A84C / #E8C97A)
// Tipografía: Playfair Display (serif elegante) + DM Sans (body)
// ============================================================

const WATCHES = [
  { id: 1, name: "Rolex Daytona", category: "Deportivos", price: 850000, originalPrice: 950000, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=90", desc: "Potencia y precisión en tu muñeca. El favorito de los campeones.", badge: "MÁS VENDIDO", stock: 3, views: 247 },
  { id: 2, name: "Rolex Datejust", category: "Elegantes", price: 1200000, originalPrice: null, image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=90", desc: "Elegancia atemporal. Cada detalle habla de distinción.", badge: "EXCLUSIVO", stock: 2, views: 189 },
  { id: 3, name: "Tag Heuer Formula 1", category: "Deportivos", price: 320000, originalPrice: 380000, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=90", desc: "La adrenalina de la pista en cada segundo.", badge: "OFERTA", stock: 5, views: 312 },
  { id: 4, name: "Omega Seamaster", category: "Elegantes", price: 750000, originalPrice: null, image: "https://images.unsplash.com/photo-1548171916-7cf9e3e01b5a?w=600&q=90", desc: "Nacido en las profundidades. Elegido por los elegantes.", badge: null, stock: 4, views: 156 },
  { id: 5, name: "Patek Philippe Nautilus", category: "Luxury", price: 4500000, originalPrice: null, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=90", desc: "La joya que se hereda. Poseer uno es un privilegio.", badge: "LUXURY", stock: 1, views: 421 },
  { id: 6, name: "Casio G-Shock", category: "Deportivos", price: 85000, originalPrice: 110000, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=90", desc: "Indestructible. Para quien no conoce límites.", badge: "OFERTA", stock: 8, views: 534 },
  { id: 7, name: "Hublot Big Bang", category: "Luxury", price: 2800000, originalPrice: null, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=90", desc: "Arte en movimiento. Diseño que rompe esquemas.", badge: "PREMIUM", stock: 2, views: 289 },
  { id: 8, name: "Citizen Eco-Drive", category: "Casual", price: 95000, originalPrice: 120000, image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&q=90", desc: "Tecnología solar. Elegancia cotidiana sin límites.", badge: "OFERTA", stock: 6, views: 178 },
  { id: 9, name: "Audemars Piguet Royal Oak", category: "Luxury", price: 3800000, originalPrice: null, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&q=90", desc: "Ícono absoluto. El reloj que define el lujo moderno.", badge: "ICÓNICO", stock: 1, views: 367 },
  { id: 10, name: "Tommy Hilfiger Classic", category: "Casual", price: 65000, originalPrice: 85000, image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=90", desc: "Estilo americano. Fresco, moderno y siempre vigente.", badge: "OFERTA", stock: 7, views: 143 },
  { id: 11, name: "Rolex Submariner", category: "Luxury", price: 1900000, originalPrice: null, image: "https://images.unsplash.com/photo-1490608897129-79da98d15969?w=600&q=90", desc: "El reloj de los conquistadores. Profundidad sin límites.", badge: "ICÓNICO", stock: 2, views: 498 },
  { id: 12, name: "Casio Edifice", category: "Casual", price: 75000, originalPrice: 95000, image: "https://images.unsplash.com/photo-1461018836345-45f71cdb5bc5?w=600&q=90", desc: "Inteligente, versátil y siempre a tiempo.", badge: "OFERTA", stock: 9, views: 201 },
];

const TESTIMONIALS = [
  { name: "Martín G.", city: "Buenos Aires", text: "Compré el Submariner y quedé impactado. Calidad increíble y atención personalizada.", stars: 5 },
  { name: "Lucía F.", city: "Córdoba", text: "El Datejust llegó perfecto. El packaging es de primera. Lo recomiendo 100%.", stars: 5 },
  { name: "Diego R.", city: "Rosario", text: "Consulté por WhatsApp y me asesoraron muy bien. Compré el G-Shock y es brutal.", stars: 5 },
  { name: "Valentina M.", city: "Mendoza", text: "El Seamaster superó todas mis expectativas. Ya quiero el siguiente.", stars: 5 },
];

const NOTIFICATIONS = [
  "👑 Carlos de Córdoba consultó el Submariner hace 3 min",
  "👀 5 personas ven el Patek Philippe ahora mismo",
  "✅ Juan de Tucumán compró el Daytona hace 1 hora",
  "⚡ Oferta especial activa — termina hoy",
  "🌟 Valentina de Mendoza guardó el Royal Oak en favoritos",
  "🔥 Modelo Hublot Big Bang: últimas 2 unidades",
];

// ============================================================
// CONFIGURACIÓN — Editá estos valores
// ============================================================
const WA_NUMBER = "543816229294"; // Argentina (+54) + número sin 0 ni 15
const ADMIN_EMAIL = "ferreyrasanty08@gmail.com";
const ADMIN_PASS = "Em@nuel2006";

// ============================================================
// EMAILJS — Seguí estos pasos para activar notificaciones:
// 1. Creá cuenta gratis en https://www.emailjs.com
// 2. Creá un "Email Service" conectando tu Gmail
// 3. Creá un "Email Template" con estas variables:
//      {{from_name}}, {{event_type}}, {{details}}, {{timestamp}}
// 4. Copiá tu Service ID, Template ID y Public Key abajo
// ============================================================
const EMAILJS_SERVICE_ID  = "TU_SERVICE_ID";   // ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";  // ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "TU_PUBLIC_KEY";   // ej: "abcDEF_ghiJKL"

// Función que envía el email vía EmailJS (carga el SDK dinámicamente)
async function sendNotification(eventType, details) {
  // Si no está configurado aún, no hace nada
  if (
    EMAILJS_SERVICE_ID === "TU_SERVICE_ID" ||
    EMAILJS_TEMPLATE_ID === "TU_TEMPLATE_ID" ||
    EMAILJS_PUBLIC_KEY === "TU_PUBLIC_KEY"
  ) {
    console.info("[F&A Relojes] EmailJS no configurado — notificación omitida:", eventType, details);
    return;
  }

  try {
    // Carga el SDK de EmailJS solo una vez
    if (!window.emailjs) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:   ADMIN_EMAIL,
      from_name:  "F&A Relojes Web",
      event_type: eventType,
      details:    details,
      timestamp:  new Date().toLocaleString("es-AR", {
        dateStyle: "full", timeStyle: "short"
      }),
    });
  } catch (err) {
    console.error("[F&A Relojes] Error enviando notificación:", err);
  }
}

const fmt = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

// ============================================================
// HOOKS
// ============================================================
function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : init;
    } catch {
      return init;
    }
  });
  const set = useCallback(
    (v) => {
      setVal((prev) => {
        const next = typeof v === "function" ? v(prev) : v;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );
  return [val, set];
}

// ============================================================
// CSS GLOBAL
// ============================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#0D1B2A;
  --navy2:#0F2035;
  --navy3:#142640;
  --navy4:#1A3050;
  --gold:#C9A84C;
  --gold2:#E8C97A;
  --gold3:#A8873A;
  --gold-light:rgba(201,168,76,.15);
  --gold-glow:rgba(201,168,76,.3);
  --text:#EDE8DC;
  --text2:#B8B0A0;
  --text3:#6E6860;
  --white:#F5F0E8;
  --red:#C0392B;
  --green:#27AE60;
  --border:rgba(201,168,76,.2);
  --border2:rgba(201,168,76,.08);
}
html{scroll-behavior:smooth}
body{background:var(--navy);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden;min-height:100vh}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--navy)}
::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
.serif{font-family:'Playfair Display',serif}
.gold{color:var(--gold)}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes toastIn{from{opacity:0;transform:translateX(-120%)}to{opacity:1;transform:translateX(0)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes gearSpin{to{transform:rotate(360deg)}}

.btn-gold{
  background:linear-gradient(135deg,var(--gold3) 0%,var(--gold) 40%,var(--gold2) 70%,var(--gold) 100%);
  background-size:200% auto;
  color:var(--navy);border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  transition:all .4s;
}
.btn-gold:hover{background-position:right center;transform:translateY(-2px);box-shadow:0 10px 35px var(--gold-glow)}
.btn-navy{
  background:var(--navy3);border:1px solid var(--border);
  color:var(--gold);cursor:pointer;font-family:'DM Sans',sans-serif;
  font-weight:500;letter-spacing:.08em;text-transform:uppercase;transition:all .3s;
}
.btn-navy:hover{background:var(--gold-light);border-color:var(--gold)}
.btn-wa{
  background:linear-gradient(135deg,#1a9e4f,#25D366);
  color:#fff;border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-weight:600;
  letter-spacing:.05em;display:flex;align-items:center;gap:8px;transition:all .3s;
}
.btn-wa:hover{transform:translateY(-2px);box-shadow:0 10px 35px rgba(37,211,102,.35)}

.watch-card{
  background:var(--navy2);
  border:1px solid var(--border2);
  overflow:hidden;transition:all .4s;cursor:pointer;
  position:relative;
}
.watch-card:hover{
  border-color:var(--gold);
  transform:translateY(-10px);
  box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 40px var(--gold-glow);
}
.watch-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(201,168,76,.05) 0%,transparent 60%);
  opacity:0;transition:opacity .4s;pointer-events:none;z-index:1;
}
.watch-card:hover::before{opacity:1}

.modal-overlay{
  position:fixed;inset:0;
  background:rgba(7,13,20,.92);
  backdrop-filter:blur(12px);
  z-index:1000;display:flex;align-items:center;justify-content:center;
  animation:fadeIn .3s ease;
}

input,select,textarea{
  background:var(--navy3);border:1px solid var(--border);
  color:var(--text);font-family:'DM Sans',sans-serif;
  border-radius:2px;outline:none;transition:all .3s;
}
input:focus,select:focus,textarea:focus{border-color:var(--gold);box-shadow:0 0 0 3px var(--gold-light)}
input::placeholder{color:var(--text3)}

.tag{display:inline-block;padding:3px 10px;font-size:.55rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.tag-gold{background:linear-gradient(135deg,var(--gold3),var(--gold2));color:var(--navy)}
.tag-red{background:var(--red);color:#fff}
.tag-navy{background:var(--navy4);color:var(--gold);border:1px solid var(--border)}

.gold-line{width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.gold-line-full{height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}

.stat-card{background:var(--navy2);border:1px solid var(--border2);padding:24px;transition:border-color .3s}
.stat-card:hover{border-color:var(--border)}

@media(max-width:768px){
  .hide-mobile{display:none!important}
  .stack-mobile{flex-direction:column!important}
  .full-mobile{width:100%!important;grid-column:1/-1!important}
}
`;

// ============================================================
// ICONS
// ============================================================
function CrownIcon({ size = 28, color = "var(--gold)" }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" fill="none">
      <path d="M10 60 L20 20 L35 45 L50 10 L65 45 L80 20 L90 60 Z" fill={color} stroke="var(--navy)" strokeWidth="1" />
      <ellipse cx="20" cy="20" rx="5" ry="5" fill={color} />
      <ellipse cx="50" cy="10" rx="5" ry="5" fill={color} />
      <ellipse cx="80" cy="20" rx="5" ry="5" fill={color} />
      <rect x="10" y="60" width="80" height="8" rx="1" fill={color} />
    </svg>
  );
}

function GearIcon({ size = 18, color = "var(--gold)", spin = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      style={spin ? { animation: "gearSpin 8s linear infinite" } : {}}
    >
      <path d="M43.5 5.5h13l2.5 10.5a32 32 0 0 1 10.5 6.1l10.5-3.3 9.2 9.2-3.3 10.5A32 32 0 0 1 92 49v1a32 32 0 0 1-6.1 10.5l3.3 10.5-9.2 9.2L69.5 77a32 32 0 0 1-10.5 6.1L56.5 94h-13l-2.5-10.5A32 32 0 0 1 30 77.5L19.5 80.8l-9.2-9.2 3.3-10.5A32 32 0 0 1 8 50v-1a32 32 0 0 1 5.6-10.5L10.3 28l9.2-9.2L30 22.1A32 32 0 0 1 40.5 16L43.5 5.5z" />
      <circle cx="50" cy="50" r="16" fill="var(--navy2)" />
    </svg>
  );
}

function WaIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LogoFull({ compact = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: compact ? 2 : 4 }}>
      {!compact && <CrownIcon size={28} />}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          className="serif"
          style={{
            fontSize: compact ? "1.3rem" : "1.7rem",
            fontWeight: 700,
            background: "linear-gradient(135deg,#A8873A,#C9A84C,#E8C97A,#C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: ".08em",
            lineHeight: 1,
          }}
        >
          F&A
        </span>
      </div>
      <div
        style={{
          fontSize: compact ? ".45rem" : ".55rem",
          letterSpacing: ".45em",
          color: "var(--gold3)",
          textTransform: "uppercase",
          fontWeight: 500,
          marginTop: -2,
        }}
      >
        RELOJES
      </div>
    </div>
  );
}

// ============================================================
// NOTIFICATION TOAST
// ============================================================
function NotifToast() {
  const [msg, setMsg] = useState(null);
  const [vis, setVis] = useState(false);
  const i = useRef(0);
  useEffect(() => {
    const show = () => {
      i.current = (i.current + 1) % NOTIFICATIONS.length;
      setMsg(NOTIFICATIONS[i.current]);
      setVis(true);
      setTimeout(() => setVis(false), 4500);
    };
    const t = setInterval(show, 7500);
    setTimeout(show, 3500);
    return () => clearInterval(t);
  }, []);
  if (!vis || !msg) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 110,
        left: 24,
        zIndex: 990,
        background: "var(--navy3)",
        border: "1px solid var(--gold)",
        padding: "14px 20px",
        maxWidth: 310,
        fontSize: ".78rem",
        animation: "toastIn .4s ease",
        lineHeight: 1.4,
        boxShadow: "0 8px 40px rgba(0,0,0,.6), 0 0 20px var(--gold-glow)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <GearIcon size={12} />
        <span style={{ fontSize: ".5rem", letterSpacing: ".2em", color: "var(--gold)", textTransform: "uppercase" }}>
          F&A Relojes
        </span>
      </div>
      <div style={{ color: "var(--text)" }}>{msg}</div>
    </div>
  );
}

// ============================================================
// FLOATING WA
// ============================================================
function FloatWA({ onClick }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 990 }}>
      {pulse && (
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 50,
            border: "2px solid #25D366",
            animation: "pulse 1s ease-out forwards",
            opacity: 0,
          }}
        />
      )}
      <button
        onClick={onClick}
        className="btn-wa"
        style={{
          borderRadius: 50,
          width: 62,
          height: 62,
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(37,211,102,.5)",
          fontSize: "1.5rem",
        }}
      >
        <WaIcon size={26} />
      </button>
    </div>
  );
}

// ============================================================
// TICKER
// ============================================================
function Ticker() {
  const items = [
    "👑 F&A RELOJES",
    "✦ ENVÍOS A TODO EL PAÍS",
    "✦ GARANTÍA OFICIAL",
    "✦ ATENCIÓN PERSONALIZADA",
    "✦ MODELOS EXCLUSIVOS",
    "✦ PAGOS EN CUOTAS SIN INTERÉS",
    "✦ ENVÍO EXPRESS 48HS",
  ];
  const txt = [...items, ...items].join("      ");
  return (
    <div
      style={{
        background: "linear-gradient(90deg,var(--gold3),var(--gold),var(--gold2),var(--gold))",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "9px 0",
        zIndex: 1000,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "ticker 30s linear infinite",
          fontSize: ".6rem",
          fontWeight: 700,
          letterSpacing: ".2em",
          color: "var(--navy)",
        }}
      >
        {txt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{txt}
      </div>
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ onNav, view, user, onLogin }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 34,
        left: 0,
        right: 0,
        zIndex: 900,
        background: sc ? "rgba(13,27,42,.97)" : "transparent",
        borderBottom: sc ? "1px solid var(--border2)" : "1px solid transparent",
        backdropFilter: sc ? "blur(24px)" : "none",
        transition: "all .5s",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <div onClick={() => onNav("home")} style={{ cursor: "pointer" }}>
          <LogoFull compact={sc} />
        </div>

        <nav className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {[
            ["home", "Inicio"],
            ["catalog", "Catálogo"],
            ["offers", "Ofertas"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => onNav(v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: ".75rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 500,
                color: view === v ? "var(--gold)" : "var(--text2)",
                position: "relative",
                padding: "4px 0",
                transition: "color .3s",
              }}
            >
              {l}
              {view === v && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--gold)",
                    borderRadius: 1,
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 50,
                  background: "var(--gold)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span style={{ fontSize: ".72rem", color: "var(--gold)", letterSpacing: ".05em" }}>
                {user.type === "registered" ? `👑 ${user.name.split(" ")[0]}` : "Invitado"}
              </span>
            </div>
          ) : (
            <button
              className="btn-navy hide-mobile"
              style={{ padding: "9px 22px", fontSize: ".68rem", borderRadius: 2 }}
              onClick={onLogin}
            >
              Acceder
            </button>
          )}
          <button
            className="btn-wa"
            style={{ padding: "9px 20px", fontSize: ".68rem", borderRadius: 2 }}
            onClick={() =>
              window.open(
                `https://wa.me/${WA_NUMBER}?text=Hola F%26A Relojes, quiero información`,
                "_blank"
              )
            }
          >
            <WaIcon size={14} /> <span className="hide-mobile">WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ onNav }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1800&q=90",
      tag: "Colección Deportivos 2025",
      title: "Tu estilo comienza en tu muñeca",
      sub: "Modelos exclusivos con entrega inmediata en todo el país.",
    },
    {
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1800&q=90",
      tag: "Luxury Collection",
      title: "Elegancia, presencia y carácter",
      sub: "Relojes que hablan por vos antes de que abras la boca.",
    },
    {
      img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1800&q=90",
      tag: "Colección Ejecutivos",
      title: "El tiempo es tuyo — dominalo",
      sub: "Para quienes saben que cada segundo cuenta.",
    },
  ];
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[slide];

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {slides.map((sl, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transition: "opacity 1.5s ease",
            opacity: i === slide ? 1 : 0,
            backgroundImage: `url(${sl.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(13,27,42,.94) 35%, rgba(13,27,42,.55) 70%, rgba(13,27,42,.3) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(24px, 8vw, 96px)",
          maxWidth: 760,
        }}
      >
        <div key={`tag-${slide}`} style={{ marginBottom: 20, animation: "slideLeft .8s ease" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 16px",
              border: "1px solid var(--border)",
              background: "var(--gold-light)",
            }}
          >
            <GearIcon size={10} />
            <span
              style={{
                fontSize: ".55rem",
                letterSpacing: ".3em",
                color: "var(--gold)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {s.tag}
            </span>
          </div>
        </div>

        <h1
          key={`t-${slide}`}
          className="serif"
          style={{
            fontSize: "clamp(2.2rem,4.5vw,4.2rem)",
            fontWeight: 600,
            lineHeight: 1.08,
            marginBottom: 24,
            animation: "slideLeft .8s .1s ease both",
            background: "linear-gradient(135deg, var(--white) 60%, var(--gold2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {s.title}
        </h1>

        <p
          key={`s-${slide}`}
          style={{
            fontSize: ".95rem",
            color: "var(--text2)",
            marginBottom: 44,
            lineHeight: 1.75,
            maxWidth: 460,
            animation: "slideLeft .8s .2s ease both",
          }}
        >
          {s.sub}
        </p>

        <div
          key={`b-${slide}`}
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            animation: "slideLeft .8s .3s ease both",
          }}
        >
          <button
            className="btn-gold"
            style={{ padding: "17px 38px", fontSize: ".75rem", borderRadius: 2 }}
            onClick={() => onNav("catalog")}
          >
            Explorar Catálogo
          </button>
          <button
            className="btn-navy"
            style={{ padding: "17px 32px", fontSize: ".75rem", borderRadius: 2 }}
            onClick={() => onNav("offers")}
          >
            Ofertas del Día
          </button>
          <button
            className="btn-wa"
            style={{ padding: "17px 28px", fontSize: ".75rem", borderRadius: 2 }}
            onClick={() =>
              window.open(
                `https://wa.me/${WA_NUMBER}?text=Hola F%26A Relojes, quiero comprar un reloj`,
                "_blank"
              )
            }
          >
            <WaIcon /> Comprar ahora
          </button>
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 16,
            animation: "slideLeft .8s .4s ease both",
          }}
        >
          <div className="gold-line" />
          <CrownIcon size={18} />
          <span
            style={{
              fontSize: ".6rem",
              letterSpacing: ".25em",
              color: "var(--gold3)",
              textTransform: "uppercase",
            }}
          >
            Desde 2018 · Argentina
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: "clamp(24px,8vw,96px)",
          display: "flex",
          gap: 8,
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{
              height: 2,
              width: i === slide ? 40 : 10,
              background: i === slide ? "var(--gold)" : "rgba(201,168,76,.3)",
              border: "none",
              cursor: "pointer",
              transition: "all .5s",
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// SOCIAL PROOF BAND
// ============================================================
function SocialBand() {
  const stats = [
    { n: "2.400+", l: "Clientes satisfechos", icon: "👑" },
    { n: "5.800+", l: "Relojes vendidos", icon: "⌚" },
    { n: "48 hs", l: "Envío express", icon: "📦" },
    { n: "100%", l: "Atención personalizada", icon: "✦" },
  ];
  return (
    <section
      style={{
        background: "linear-gradient(135deg,var(--navy2),var(--navy3))",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "52px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 0,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.l}
            style={{
              textAlign: "center",
              padding: "0 24px",
              borderRight: i < stats.length - 1 ? "1px solid var(--border2)" : "none",
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{s.icon}</div>
            <div
              className="serif"
              style={{
                fontSize: "2.6rem",
                fontWeight: 600,
                marginBottom: 6,
                background: "linear-gradient(135deg,var(--gold3),var(--gold2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontSize: ".65rem",
                letterSpacing: ".18em",
                color: "var(--text3)",
                textTransform: "uppercase",
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WATCH CARD
// ============================================================
function WatchCard({ w, onSelect, onWA, isFav, onFav }) {
  const [hov, setHov] = useState(false);
  const disc = w.originalPrice ? Math.round((1 - w.price / w.originalPrice) * 100) : null;
  return (
    <div
      className="watch-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "1",
          overflow: "hidden",
          background: "var(--navy3)",
        }}
      >
        <img
          src={w.image}
          alt={w.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "transform .7s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,27,42,.7) 0%, transparent 50%)",
            opacity: hov ? 1 : 0.4,
            transition: "opacity .4s",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            zIndex: 2,
          }}
        >
          {w.badge && (
            <span className={`tag ${w.badge === "OFERTA" ? "tag-red" : "tag-gold"}`}>
              {w.badge}
            </span>
          )}
          {disc && <span className="tag tag-red">-{disc}%</span>}
        </div>

        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            background: "rgba(13,27,42,.8)",
            padding: "4px 10px",
            fontSize: ".58rem",
            color: "var(--text2)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ color: "var(--gold)" }}>👁</span> {w.views}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav(w.id);
          }}
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            zIndex: 2,
            background: isFav ? "var(--gold)" : "rgba(13,27,42,.8)",
            border: `1px solid ${isFav ? "var(--gold)" : "var(--border)"}`,
            borderRadius: 50,
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            color: isFav ? "var(--navy)" : "var(--gold)",
            transition: "all .3s",
          }}
        >
          {isFav ? "♥" : "♡"}
        </button>

        {w.stock <= 2 && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              zIndex: 2,
              background: "rgba(192,57,43,.9)",
              padding: "4px 10px",
              fontSize: ".55rem",
              color: "#fff",
              letterSpacing: ".1em",
            }}
          >
            ¡Solo {w.stock}!
          </div>
        )}
      </div>

      <div style={{ padding: "22px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: ".55rem",
              letterSpacing: ".2em",
              color: "var(--gold3)",
              textTransform: "uppercase",
            }}
          >
            {w.category}
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
        </div>
        <h3 className="serif" style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: 8 }}>
          {w.name}
        </h3>
        <p style={{ fontSize: ".73rem", color: "var(--text3)", lineHeight: 1.55, marginBottom: 18 }}>
          {w.desc}
        </p>

        <div style={{ marginBottom: 18, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              background: "linear-gradient(135deg,var(--gold),var(--gold2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {fmt(w.price)}
          </span>
          {w.originalPrice && (
            <span style={{ fontSize: ".75rem", color: "var(--text3)", textDecoration: "line-through" }}>
              {fmt(w.originalPrice)}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 8 }}>
          <button
            className="btn-navy"
            style={{ padding: "10px 6px", fontSize: ".6rem", borderRadius: 2 }}
            onClick={() => onSelect(w)}
          >
            Ver detalles
          </button>
          <button
            className="btn-wa"
            style={{ padding: "10px 8px", fontSize: ".6rem", borderRadius: 2 }}
            onClick={() => onWA(w)}
          >
            <WaIcon size={13} /> Consultar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CATALOG
// ============================================================
function Catalog({ onSelect, favs, onFav, onWA, filterCat }) {
  const cats = ["Todos", "Deportivos", "Elegantes", "Casual", "Luxury", "Ofertas"];
  const [cat, setCat] = useState(filterCat || "Todos");
  const [search, setSearch] = useState("");

  const filtered = WATCHES.filter((w) => {
    const mc =
      cat === "Todos" ? true : cat === "Ofertas" ? !!w.originalPrice : w.category === cat;
    const ms = w.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  return (
    <section style={{ padding: "88px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div className="gold-line" />
          <CrownIcon size={20} />
          <div className="gold-line" />
        </div>
        <div
          style={{
            fontSize: ".55rem",
            letterSpacing: ".35em",
            color: "var(--gold3)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Nuestra Selección
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 500, marginBottom: 16 }}>
          Catálogo Premium
        </h2>
        <p style={{ color: "var(--text3)", maxWidth: 440, margin: "0 auto", fontSize: ".82rem", lineHeight: 1.75 }}>
          Cada reloj en nuestra colección es una declaración de estilo. Encontrá el tuyo con asesoramiento personalizado.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 40,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "9px 22px",
              fontSize: ".62rem",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderRadius: 2,
              transition: "all .3s",
              background:
                cat === c ? "linear-gradient(135deg,var(--gold3),var(--gold))" : "var(--navy2)",
              color: cat === c ? "var(--navy)" : "var(--text3)",
              border: `1px solid ${cat === c ? "var(--gold)" : "var(--border2)"}`,
            }}
          >
            {c}
          </button>
        ))}
        <div style={{ position: "relative" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar modelo..."
            style={{ padding: "9px 14px 9px 36px", fontSize: ".75rem", width: 210 }}
          />
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: ".75rem",
              color: "var(--gold3)",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      <div
        style={{
          fontSize: ".65rem",
          color: "var(--text3)",
          letterSpacing: ".1em",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        {filtered.length} modelo{filtered.length !== 1 ? "s" : ""} disponible
        {filtered.length !== 1 ? "s" : ""}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
          gap: 24,
        }}
      >
        {filtered.map((w) => (
          <WatchCard
            key={w.id}
            w={w}
            onSelect={onSelect}
            onWA={onWA}
            isFav={favs.includes(w.id)}
            onFav={onFav}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// MOST CHOSEN
// ============================================================
function MostChosen({ onSelect, favs, onFav, onWA }) {
  const top = [...WATCHES].sort((a, b) => b.views - a.views).slice(0, 4);
  return (
    <section
      style={{
        padding: "88px 48px",
        background: "var(--navy2)",
        borderTop: "1px solid var(--border2)",
        borderBottom: "1px solid var(--border2)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div className="gold-line" />
            <GearIcon size={20} />
            <div className="gold-line" />
          </div>
          <div
            style={{
              fontSize: ".55rem",
              letterSpacing: ".35em",
              color: "var(--gold3)",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Los preferidos
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 500 }}>
            Los más elegidos por nuestros clientes
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 22,
          }}
        >
          {top.map((w, i) => (
            <div key={w.id} style={{ position: "relative" }}>
              {i === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                  }}
                >
                  <CrownIcon size={22} />
                </div>
              )}
              <WatchCard
                w={w}
                onSelect={onSelect}
                onWA={onWA}
                isFav={favs.includes(w.id)}
                onFav={onFav}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section style={{ padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div className="gold-line" />
          <CrownIcon size={16} />
          <div className="gold-line" />
        </div>
        <div
          style={{
            fontSize: ".55rem",
            letterSpacing: ".35em",
            color: "var(--gold3)",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Testimonios
        </div>
        <div key={idx} style={{ animation: "fadeIn .7s ease" }}>
          <div
            style={{
              fontSize: "4rem",
              lineHeight: 1,
              color: "var(--gold)",
              fontFamily: "serif",
              marginBottom: 16,
              opacity: 0.6,
            }}
          >
            "
          </div>
          <p
            className="serif"
            style={{
              fontSize: "1.35rem",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.65,
              marginBottom: 28,
            }}
          >
            {t.text}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 16 }}>
            {[...Array(t.stars)].map((_, i) => (
              <span key={i} style={{ color: "var(--gold)", fontSize: "1.1rem" }}>★</span>
            ))}
          </div>
          <div style={{ fontSize: ".78rem" }}>
            <span style={{ fontWeight: 600 }}>{t.name}</span>
            <span style={{ color: "var(--text3)" }}> · {t.city}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 36 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                height: 3,
                width: i === idx ? 32 : 10,
                background: i === idx ? "var(--gold)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                borderRadius: 2,
                transition: "all .4s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function ProductModal({ w, onClose, onWA, isFav, onFav }) {
  const [viewers] = useState(Math.floor(Math.random() * 9) + 2);
  const [secs, setSecs] = useState(3600 * 5);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const disc = w.originalPrice ? Math.round((1 - w.price / w.originalPrice) * 100) : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--navy2)",
          border: "1px solid var(--border)",
          maxWidth: 920,
          width: "92%",
          maxHeight: "92vh",
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          animation: "fadeUp .5s ease",
          boxShadow: "0 40px 120px rgba(0,0,0,.8), 0 0 60px var(--gold-glow)",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", background: "var(--navy3)" }}>
          <img
            src={w.image}
            alt={w.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 480 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(13,27,42,.8) 0%, transparent 50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(13,27,42,.85)",
              padding: "8px 14px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 50,
                background: "#25D366",
                animation: "pulse 1.5s infinite",
              }}
            />
            <span style={{ fontSize: ".65rem", color: "var(--text2)" }}>
              {viewers} personas viendo ahora
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {w.badge && (
              <span className={`tag ${w.badge === "OFERTA" ? "tag-red" : "tag-gold"}`}>
                {w.badge}
              </span>
            )}
            {disc && <span className="tag tag-red">-{disc}% OFF</span>}
          </div>
        </div>

        <div style={{ padding: "40px 36px", overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GearIcon size={12} />
              <span
                style={{
                  fontSize: ".55rem",
                  letterSpacing: ".25em",
                  color: "var(--gold3)",
                  textTransform: "uppercase",
                }}
              >
                {w.category}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--text3)",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              ✕
            </button>
          </div>

          <h2 className="serif" style={{ fontSize: "1.9rem", fontWeight: 500, marginBottom: 14, lineHeight: 1.1 }}>
            {w.name}
          </h2>
          <p style={{ color: "var(--text3)", fontSize: ".83rem", lineHeight: 1.7, marginBottom: 24 }}>
            {w.desc}
          </p>

          <div
            style={{
              padding: "16px",
              background: "var(--navy3)",
              border: "1px solid var(--border2)",
              borderLeft: "3px solid var(--gold)",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: ".55rem",
                letterSpacing: ".2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Por qué elegirlo
            </div>
            {[
              "Garantía oficial incluida",
              "Entrega en 48 horas",
              "Asesoramiento personalizado",
              "Caja y documentación originales",
              "Pagos en cuotas disponibles",
            ].map((r) => (
              <div
                key={r}
                style={{
                  fontSize: ".76rem",
                  color: "var(--text2)",
                  marginBottom: 7,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "var(--gold)", fontSize: ".6rem" }}>✦</span> {r}
              </div>
            ))}
          </div>

          {w.originalPrice && (
            <div
              style={{
                marginBottom: 20,
                padding: "12px 16px",
                background: "rgba(192,57,43,.12)",
                border: "1px solid rgba(192,57,43,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: ".6rem",
                  color: "#e74c3c",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                ⏳ Oferta expira en:
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#e74c3c",
                  fontFamily: "monospace",
                }}
              >
                {hh}:{mm}:{ss}
              </span>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {fmt(w.price)}
              </span>
              {w.originalPrice && (
                <span
                  style={{
                    fontSize: ".85rem",
                    color: "var(--text3)",
                    textDecoration: "line-through",
                  }}
                >
                  {fmt(w.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              marginBottom: 24,
              fontSize: ".72rem",
              color: w.stock <= 2 ? "#e74c3c" : "var(--green)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{w.stock <= 2 ? "⚠️" : "✅"}</span>
            {w.stock <= 2
              ? `¡Solo ${w.stock} unidades disponibles!`
              : `${w.stock} unidades en stock`}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              className="btn-wa"
              style={{ padding: "15px", fontSize: ".77rem", justifyContent: "center", borderRadius: 2 }}
              onClick={() => onWA(w)}
            >
              <WaIcon /> Consultar este modelo por WhatsApp
            </button>
            <button
              onClick={() => onFav(w.id)}
              className="btn-navy"
              style={{ padding: "11px", fontSize: ".72rem", borderRadius: 2 }}
            >
              {isFav ? "♥ En tus favoritos" : "♡ Agregar a favoritos"}
            </button>
          </div>

          <div
            style={{
              marginTop: 22,
              padding: "14px",
              background: "var(--navy3)",
              border: "1px solid var(--border2)",
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "var(--gold)", fontSize: ".85rem" }}>★</span>
              ))}
            </div>
            <p
              style={{
                fontSize: ".72rem",
                color: "var(--text2)",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              "Exactamente lo que buscaba. La atención de F&A fue impecable."
            </p>
            <div style={{ fontSize: ".6rem", color: "var(--text3)", marginTop: 6 }}>
              — Cliente verificado · Buenos Aires
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LOGIN MODAL
// ============================================================
function LoginModal({ onClose, onLogin, onAdmin }) {
  const [mode, setMode] = useState("choose");
  const [form, setForm] = useState({ name: "", wa: "", email: "", city: "", bday: "", budget: "" });
  const [adm, setAdm] = useState({ email: "", pass: "" });
  const [err, setErr] = useState("");

  const doRegister = () => {
    if (!form.name || !form.wa) {
      setErr("Nombre y WhatsApp son obligatorios");
      return;
    }
    onLogin({ ...form, type: "registered", id: Date.now(), sessions: 1, waClicks: 0 });
    onClose();
  };
  const doAdmin = () => {
    if (adm.email === ADMIN_EMAIL && adm.pass === ADMIN_PASS) {
      onAdmin();
      onClose();
    } else setErr("Credenciales incorrectas");
  };

  return (
    <div className="modal-overlay">
      <div
        style={{
          background: "var(--navy2)",
          border: "1px solid var(--border)",
          padding: 48,
          maxWidth: 440,
          width: "92%",
          animation: "fadeUp .4s ease",
          position: "relative",
          boxShadow: "0 40px 100px rgba(0,0,0,.8), 0 0 60px var(--gold-glow)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "none",
            border: "none",
            color: "var(--text3)",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <LogoFull />
          <div className="gold-line-full" style={{ marginTop: 20 }} />
        </div>

        {err && (
          <div
            style={{
              background: "rgba(192,57,43,.15)",
              border: "1px solid var(--red)",
              padding: "10px 14px",
              fontSize: ".74rem",
              color: "#e74c3c",
              marginBottom: 16,
              borderRadius: 2,
            }}
          >
            {err}
          </div>
        )}

        {mode === "choose" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: ".82rem", color: "var(--text3)", lineHeight: 1.6, textAlign: "center", marginBottom: 8 }}>
              Ingresá para acceder a beneficios exclusivos, historial de favoritos y ofertas personalizadas.
            </p>
            <button
              className="btn-navy"
              style={{ padding: "15px", fontSize: ".77rem", borderRadius: 2 }}
              onClick={() => {
                onLogin({ name: "Invitado", type: "guest", id: Date.now() });
                onClose();
              }}
            >
              Continuar como Invitado
            </button>
            <button
              className="btn-gold"
              style={{ padding: "15px", fontSize: ".77rem", borderRadius: 2 }}
              onClick={() => setMode("register")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <CrownIcon size={14} color="var(--navy)" /> Crear Cuenta VIP
              </div>
            </button>
            <div className="gold-line-full" style={{ margin: "8px 0" }} />
            <button
              onClick={() => setMode("admin")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: ".62rem",
                color: "var(--text3)",
                textDecoration: "underline",
                letterSpacing: ".1em",
              }}
            >
              Acceso Administrador
            </button>
          </div>
        )}

        {mode === "register" && (
          <div>
            <div
              style={{
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Cuenta VIP — Beneficios Exclusivos
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                ["name", "Nombre completo", "1/-1"],
                ["wa", "WhatsApp", ""],
                ["email", "Correo electrónico", "1/-1"],
                ["city", "Ciudad", ""],
              ].map(([k, l, span]) => (
                <div key={k} style={{ gridColumn: span || undefined }}>
                  <label
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".12em",
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    {l}
                  </label>
                  <input
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", fontSize: ".8rem" }}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".12em",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  Cumpleaños
                </label>
                <input
                  type="date"
                  value={form.bday}
                  onChange={(e) => setForm({ ...form, bday: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", fontSize: ".78rem" }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".12em",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  Presupuesto
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", fontSize: ".78rem" }}
                >
                  <option value="">Seleccionar</option>
                  <option>Hasta $100.000</option>
                  <option>$100k - $500k</option>
                  <option>$500k - $1M</option>
                  <option>Más de $1M</option>
                </select>
              </div>
            </div>
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "14px", fontSize: ".77rem", borderRadius: 2 }}
              onClick={doRegister}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <CrownIcon size={13} color="var(--navy)" /> Crear mi cuenta VIP
              </div>
            </button>
            <button
              onClick={() => setMode("choose")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: ".62rem",
                color: "var(--text3)",
                textDecoration: "underline",
                marginTop: 12,
                display: "block",
                textAlign: "center",
                width: "100%",
              }}
            >
              Volver
            </button>
          </div>
        )}

        {mode === "admin" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <GearIcon size={28} />
              <div
                style={{
                  fontSize: ".6rem",
                  letterSpacing: ".2em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                Panel Administrador
              </div>
            </div>
            {[
              ["email", "Email", "email"],
              ["pass", "Contraseña", "password"],
            ].map(([k, l, t]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".12em",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  {l}
                </label>
                <input
                  type={t}
                  value={adm[k]}
                  onChange={(e) => setAdm({ ...adm, [k]: e.target.value })}
                  style={{ width: "100%", padding: "11px 12px", fontSize: ".82rem" }}
                />
              </div>
            ))}
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "14px", fontSize: ".77rem", borderRadius: 2, marginTop: 4 }}
              onClick={doAdmin}
            >
              Ingresar al Panel
            </button>
            <button
              onClick={() => setMode("choose")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: ".62rem",
                color: "var(--text3)",
                textDecoration: "underline",
                marginTop: 12,
                display: "block",
                textAlign: "center",
                width: "100%",
              }}
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDash({ customers, sales, onClose, onAddSale }) {
  const [tab, setTab] = useState("overview");
  const [sf, setSf] = useState({ client: "", watch: "", amount: "", origin: "", notes: "" });

  const total = sales.reduce((a, s) => a + Number(s.amount || 0), 0);
  const today = sales.filter(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  );
  const hot = customers.filter((c) => (c.waClicks || 0) > 0);
  const cold = customers.filter((c) => c.sessions > 2 && (c.waClicks || 0) === 0);
  const vip = customers.filter((c) => c.type === "registered");

  const tabs = [
    ["overview", "📊 Resumen"],
    ["funnel", "🔁 Embudo"],
    ["crm", "👥 CRM"],
    ["sales", "💰 Ventas"],
    ["products", "⌚ Productos"],
  ];

  // --- Métricas REALES desde localStorage ---
  const totalWAClicks = customers.reduce((a, c) => a + (c.waClicks || 0), 0);
  const totalPageViews = Number(localStorage.getItem("fya_pageviews") || 0);
  const totalProductViews = Number(localStorage.getItem("fya_productviews") || 0);

  const weekBars = (() => {
    const days = ["D","L","M","X","J","V","S"];
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `fya_views_${d.toISOString().slice(0, 10)}`;
      result.push({ l: days[d.getDay()], v: Number(localStorage.getItem(key) || 0) });
    }
    return result;
  })();
  const maxBar = Math.max(...weekBars.map((b) => b.v), 1);

  const funnelSteps = [
    { l: "Visitas a la página", v: totalPageViews },
    { l: "Vieron productos (detalle)", v: totalProductViews },
    { l: "Consultaron por WhatsApp", v: totalWAClicks },
    { l: "Ventas registradas", v: sales.length },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--navy)",
        zIndex: 2000,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: "var(--navy2)",
          borderBottom: "1px solid var(--border)",
          padding: "0 40px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <LogoFull compact />
            <div style={{ width: 1, height: 30, background: "var(--border)" }} />
            <span
              style={{
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: "var(--text3)",
                textTransform: "uppercase",
              }}
            >
              Panel Administrador Master
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".7rem", color: "var(--gold)" }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 50,
                  background: "var(--green)",
                  animation: "pulse 2s infinite",
                }}
              />
              {ADMIN_EMAIL}
            </div>
            <button
              className="btn-navy"
              style={{ padding: "8px 18px", fontSize: ".68rem", borderRadius: 2 }}
              onClick={onClose}
            >
              ✕ Salir
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            width: 210,
            background: "var(--navy2)",
            borderRight: "1px solid var(--border2)",
            flexShrink: 0,
            padding: "20px 0",
          }}
        >
          <div style={{ padding: "16px 20px 20px", textAlign: "center" }}>
            <GearIcon size={32} />
          </div>
          {tabs.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                width: "100%",
                padding: "13px 24px",
                background: tab === k ? "var(--navy3)" : "transparent",
                border: "none",
                borderLeft: `3px solid ${tab === k ? "var(--gold)" : "transparent"}`,
                color: tab === k ? "var(--gold)" : "var(--text3)",
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                textAlign: "left",
                transition: "all .2s",
                letterSpacing: ".05em",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
          {tab === "overview" && (
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 8 }}>
                Resumen General
              </h2>
              <p style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: 36 }}>
                Hoy —{" "}
                {new Date().toLocaleDateString("es-AR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18, marginBottom: 36 }}>
                {[
                  { l: "Visitas totales", v: String(totalPageViews), s: "P00e1ginas vistas", c: "var(--gold)" },
                  { l: "Ventas totales", v: fmt(total), s: `${sales.length} operaciones`, c: "#27AE60" },
                  { l: "Clics a WhatsApp", v: String(totalWAClicks), s: "Total acumulado", c: "#3498DB" },
                  { l: "Clientes VIP", v: String(vip.length), s: "Registrados", c: "var(--gold)" },
                ].map((s) => (
                  <div key={s.l} className="stat-card">
                    <div
                      style={{
                        fontSize: ".55rem",
                        letterSpacing: ".2em",
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      {s.l}
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 700, color: s.c, marginBottom: 6 }}>
                      {s.v}
                    </div>
                    <div style={{ fontSize: ".62rem", color: "var(--text3)" }}>{s.s}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
                <div className="stat-card">
                  <div
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".2em",
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      marginBottom: 20,
                    }}
                  >
                    Tráfico semanal (visitas)
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 90, marginBottom: 8 }}>
                    {weekBars.map((b, i) => (
                      <div
                        key={i}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                      >
                        <span style={{ fontSize: ".55rem", color: "var(--gold3)", fontWeight: 600 }}>{b.v}</span>
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "2px 2px 0 0",
                            height: `${(b.v / maxBar) * 72}px`,
                            background: "linear-gradient(to top, var(--gold3), var(--gold2))",
                            minHeight: 4,
                          }}
                        />
                        <span style={{ fontSize: ".5rem", color: "var(--text3)" }}>{b.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stat-card">
                  <div
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".2em",
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Fuentes de tráfico
                  </div>
                  {[
                    ["Instagram", 42],
                    ["WhatsApp Direct", 28],
                    ["Facebook", 15],
                    ["Directo", 10],
                    ["Google", 5],
                  ].map(([src, pct]) => (
                    <div key={src} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".7rem", marginBottom: 5 }}>
                        <span style={{ color: "var(--text2)" }}>{src}</span>
                        <span style={{ color: "var(--gold)", fontWeight: 600 }}>{pct}%</span>
                      </div>
                      <div style={{ height: 5, background: "var(--navy3)", borderRadius: 2, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: "linear-gradient(90deg,var(--gold3),var(--gold2))",
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "funnel" && (
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 8 }}>
                Embudo de Conversión
              </h2>
              <p style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: 40 }}>
                Analizá en qué etapa perdés clientes y optimizá tu proceso de venta.
              </p>
              <div style={{ maxWidth: 580 }}>
                {funnelSteps.map((f, i) => {
                  const pct = Math.round((f.v / funnelSteps[0].v) * 100);
                  const loss = i > 0 ? funnelSteps[i - 1].v - f.v : 0;
                  return (
                    <div key={f.l} style={{ marginBottom: 20 }}>
                      {i > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 0 10px 16px",
                            fontSize: ".65rem",
                            color: "#e74c3c",
                          }}
                        >
                          <span>↓</span> Se perdieron {loss.toLocaleString()} (
                          {Math.round((loss / funnelSteps[i - 1].v) * 100)}%) en este paso
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: ".73rem",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: "var(--text2)" }}>{f.l}</span>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ fontWeight: 700, color: "var(--gold)" }}>
                            {f.v.toLocaleString()}
                          </span>
                          {i > 0 && <span style={{ color: "var(--text3)" }}>{pct}% del total</span>}
                        </div>
                      </div>
                      <div
                        style={{
                          height: 44,
                          background: "var(--navy3)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, var(--gold3), var(--gold))",
                            opacity: 1 - i * 0.12,
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 14,
                            fontSize: ".72rem",
                            fontWeight: 700,
                            color: "var(--navy)",
                          }}
                        >
                          {f.v.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="stat-card" style={{ marginTop: 32 }}>
                  <div
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".2em",
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Tasas de conversión
                  </div>
                  {(() => {
                    const pct = (a, b) => b > 0 ? (a / b * 100).toFixed(1) + "%" : "—";
                    return [
                      ["Visitas → Productos", pct(totalProductViews, totalPageViews)],
                      ["Productos → WhatsApp", pct(totalWAClicks, totalProductViews)],
                      ["WhatsApp → Compra", pct(sales.length, totalWAClicks)],
                      ["Conversión total", pct(sales.length, totalPageViews)],
                    ];
                  })().map(([l, v]) => (
                    <div
                      key={l}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "9px 0",
                        borderBottom: "1px solid var(--border2)",
                        fontSize: ".76rem",
                      }}
                    >
                      <span style={{ color: "var(--text3)" }}>{l}</span>
                      <span style={{ color: "var(--gold)", fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "crm" && (
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 8 }}>
                CRM — Gestión de Clientes
              </h2>
              <p style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: 36 }}>
                Segmentá, analizá y contactá a tus clientes estratégicamente.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
                {[
                  { icon: "🔥", title: "Calientes", sub: "Fueron a WA", data: hot, c: "#e74c3c" },
                  { icon: "❄️", title: "Dormidos", sub: "+2 sesiones sin contacto", data: cold, c: "#3498db" },
                  { icon: "👑", title: "VIP", sub: "Cuentas registradas", data: vip, c: "var(--gold)" },
                ].map((g) => (
                  <div key={g.title} className="stat-card">
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontSize: "1.2rem" }}>{g.icon}</span>
                      <div>
                        <div style={{ fontSize: ".72rem", fontWeight: 600, color: g.c }}>{g.title}</div>
                        <div style={{ fontSize: ".58rem", color: "var(--text3)" }}>{g.sub}</div>
                      </div>
                    </div>
                    {g.data.length === 0 ? (
                      <div style={{ fontSize: ".72rem", color: "var(--text3)", fontStyle: "italic" }}>
                        Sin clientes aún
                      </div>
                    ) : (
                      g.data.slice(0, 4).map((c) => (
                        <div
                          key={c.id}
                          style={{ padding: "8px 0", borderBottom: "1px solid var(--border2)", fontSize: ".72rem" }}
                        >
                          <div style={{ fontWeight: 600 }}>{c.name}</div>
                          <div style={{ color: "var(--text3)", fontSize: ".6rem" }}>{c.city || "—"}</div>
                        </div>
                      ))
                    )}
                    <div style={{ marginTop: 12, fontSize: ".6rem", color: g.c, fontWeight: 600 }}>
                      {g.data.length} clientes
                    </div>
                  </div>
                ))}
              </div>

              <div className="stat-card">
                <div
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".2em",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Todos los clientes ({customers.length})
                </div>
                {customers.length === 0 ? (
                  <div style={{ fontSize: ".8rem", color: "var(--text3)", fontStyle: "italic" }}>
                    No hay clientes registrados aún.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".73rem" }}>
                      <thead>
                        <tr>
                          {["Nombre", "Tipo", "Ciudad", "WhatsApp", "Email", "Sesiones", "WA Clics", "Acción"].map(
                            (h) => (
                              <th
                                key={h}
                                style={{
                                  padding: "10px 12px",
                                  borderBottom: "1px solid var(--border)",
                                  textAlign: "left",
                                  fontWeight: 500,
                                  color: "var(--text3)",
                                  fontSize: ".6rem",
                                  letterSpacing: ".1em",
                                  textTransform: "uppercase",
                                }}
                              >
                                {h}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((c) => (
                          <tr key={c.id} style={{ borderBottom: "1px solid var(--border2)" }}>
                            <td style={{ padding: "11px 12px", fontWeight: 600 }}>{c.name}</td>
                            <td style={{ padding: "11px 12px" }}>
                              <span className={`tag ${c.type === "registered" ? "tag-gold" : "tag-navy"}`}>
                                {c.type === "registered" ? "VIP" : "Invitado"}
                              </span>
                            </td>
                            <td style={{ padding: "11px 12px", color: "var(--text3)" }}>{c.city || "—"}</td>
                            <td style={{ padding: "11px 12px", color: "var(--text3)" }}>{c.wa || "—"}</td>
                            <td style={{ padding: "11px 12px", color: "var(--text3)", fontSize: ".65rem" }}>
                              {c.email || "—"}
                            </td>
                            <td style={{ padding: "11px 12px", color: "var(--gold)", fontWeight: 600 }}>
                              {c.sessions || 1}
                            </td>
                            <td
                              style={{
                                padding: "11px 12px",
                                color: (c.waClicks || 0) > 0 ? "#27AE60" : "var(--text3)",
                              }}
                            >
                              {c.waClicks || 0}
                            </td>
                            <td style={{ padding: "11px 12px" }}>
                              {c.wa && (
                                <button
                                  className="btn-wa"
                                  style={{ padding: "5px 12px", fontSize: ".6rem", borderRadius: 2 }}
                                  onClick={() =>
                                    window.open(
                                      `https://wa.me/${c.wa.replace(/\D/g, "")}?text=Hola ${c.name}, te contactamos desde F%26A Relojes...`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <WaIcon size={11} /> WA
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "sales" && (
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 8 }}>
                Registro de Ventas
              </h2>
              <p style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: 36 }}>
                Registrá cada venta concretada y analizá tu rendimiento.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28 }}>
                <div className="stat-card">
                  <div
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".2em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CrownIcon size={12} color="var(--gold)" /> Registrar venta
                  </div>
                  {[
                    ["client", "Cliente"],
                    ["watch", "Reloj vendido"],
                    ["amount", "Monto ($)"],
                    ["origin", "Origen (Instagram, WA, etc.)"],
                    ["notes", "Observaciones"],
                  ].map(([k, l]) => (
                    <div key={k} style={{ marginBottom: 12 }}>
                      <label
                        style={{
                          fontSize: ".57rem",
                          letterSpacing: ".12em",
                          color: "var(--text3)",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: 5,
                        }}
                      >
                        {l}
                      </label>
                      <input
                        value={sf[k]}
                        onChange={(e) => setSf({ ...sf, [k]: e.target.value })}
                        style={{ width: "100%", padding: "10px 12px", fontSize: ".8rem" }}
                      />
                    </div>
                  ))}
                  <button
                    className="btn-gold"
                    style={{ width: "100%", padding: "13px", fontSize: ".75rem", borderRadius: 2, marginTop: 8 }}
                    onClick={() => {
                      if (sf.client && sf.watch) {
                        onAddSale({ ...sf, date: new Date().toISOString() });
                        setSf({ client: "", watch: "", amount: "", origin: "", notes: "" });
                      }
                    }}
                  >
                    Registrar venta
                  </button>
                </div>

                <div>
                  <div className="stat-card" style={{ marginBottom: 18 }}>
                    <div
                      style={{
                        fontSize: ".58rem",
                        letterSpacing: ".2em",
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      }}
                    >
                      Resumen
                    </div>
                    {[
                      ["Total acumulado", fmt(total), "var(--gold)"],
                      ["Ventas registradas", String(sales.length), "var(--text)"],
                      [
                        "Ticket promedio",
                        sales.length ? fmt(total / sales.length) : "$0",
                        "var(--text)",
                      ],
                      ["Ventas hoy", String(today.length), "var(--green)"],
                    ].map(([l, v, c]) => (
                      <div
                        key={l}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "9px 0",
                          borderBottom: "1px solid var(--border2)",
                          fontSize: ".78rem",
                        }}
                      >
                        <span style={{ color: "var(--text3)" }}>{l}</span>
                        <span style={{ color: c, fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="stat-card" style={{ maxHeight: 280, overflowY: "auto" }}>
                    <div
                      style={{
                        fontSize: ".58rem",
                        letterSpacing: ".2em",
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      Historial de ventas
                    </div>
                    {sales.length === 0 ? (
                      <div style={{ fontSize: ".75rem", color: "var(--text3)", fontStyle: "italic" }}>
                        Sin ventas registradas aún.
                      </div>
                    ) : (
                      [...sales].reverse().map((s, i) => (
                        <div
                          key={i}
                          style={{ padding: "11px 0", borderBottom: "1px solid var(--border2)", fontSize: ".73rem" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontWeight: 600 }}>{s.client}</span>
                            <span style={{ color: "var(--gold)", fontWeight: 700 }}>
                              {fmt(Number(s.amount || 0))}
                            </span>
                          </div>
                          <div style={{ color: "var(--text3)", fontSize: ".62rem" }}>
                            {s.watch} · {new Date(s.date).toLocaleDateString("es-AR")} · {s.origin || "—"}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "products" && (
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 8 }}>
                Análisis de Productos
              </h2>
              <p style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: 36 }}>
                Rankings y estadísticas de tu catálogo.
              </p>
              <div className="stat-card">
                <div
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".2em",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  Ranking por vistas
                </div>
                {[...WATCHES]
                  .sort((a, b) => b.views - a.views)
                  .map((w, i) => (
                    <div
                      key={w.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom: "1px solid var(--border2)",
                      }}
                    >
                      <span
                        className="serif"
                        style={{
                          fontSize: "1.1rem",
                          color: i === 0 ? "var(--gold)" : "var(--text3)",
                          fontWeight: 700,
                          width: 28,
                        }}
                      >
                        {i === 0 ? "👑" : `#${i + 1}`}
                      </span>
                      <img
                        src={w.image}
                        alt={w.name}
                        style={{
                          width: 52,
                          height: 52,
                          objectFit: "cover",
                          border: "1px solid var(--border2)",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: ".82rem", marginBottom: 3 }}>{w.name}</div>
                        <div style={{ fontSize: ".62rem", color: "var(--text3)" }}>
                          {w.category} · {fmt(w.price)}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", marginRight: 16 }}>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gold)" }}>{w.views}</div>
                        <div style={{ fontSize: ".58rem", color: "var(--text3)" }}>vistas</div>
                      </div>
                      <div style={{ width: 90 }}>
                        <div
                          style={{
                            height: 5,
                            background: "var(--navy3)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${(w.views / 534) * 100}%`,
                              height: "100%",
                              background: "linear-gradient(90deg,var(--gold3),var(--gold2))",
                              borderRadius: 2,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ onNav }) {
  return (
    <footer
      style={{
        background: "var(--navy2)",
        borderTop: "1px solid var(--border2)",
        padding: "64px 48px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div className="gold-line-full" style={{ flex: 1 }} />
          <CrownIcon size={24} />
          <div className="gold-line-full" style={{ flex: 1 }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <LogoFull />
            <p
              style={{
                fontSize: ".78rem",
                color: "var(--text3)",
                lineHeight: 1.8,
                maxWidth: 300,
                marginTop: 20,
              }}
            >
              Relojes de distinción para quienes valoran el tiempo. Atención personalizada, calidad
              premium y entrega a todo el país.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: ".55rem",
                letterSpacing: ".25em",
                color: "var(--gold3)",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Navegación
            </div>
            {[
              ["home", "Inicio"],
              ["catalog", "Catálogo Completo"],
              ["offers", "Ofertas del Día"],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => onNav(v)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: "var(--text3)",
                  cursor: "pointer",
                  fontSize: ".78rem",
                  marginBottom: 12,
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "color .3s",
                  textAlign: "left",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text3)")}
              >
                {l}
              </button>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: ".55rem",
                letterSpacing: ".25em",
                color: "var(--gold3)",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Contacto
            </div>
            <button
              className="btn-wa"
              style={{ padding: "11px 20px", fontSize: ".73rem", borderRadius: 2, marginBottom: 18 }}
              onClick={() =>
                window.open(`https://wa.me/${WA_NUMBER}?text=Hola F%26A Relojes!`, "_blank")
              }
            >
              <WaIcon /> Consultanos ahora
            </button>
            <div style={{ fontSize: ".73rem", color: "var(--text3)", lineHeight: 2 }}>
              <div>📍 Argentina — Todo el país</div>
              <div>📦 Envíos en 48 hs</div>
              <div>⏰ Lun–Sáb 9:00–21:00</div>
            </div>
          </div>
        </div>

        <div className="gold-line-full" style={{ marginBottom: 24 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: ".6rem",
            color: "var(--text3)",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>© {new Date().getFullYear()} F&A Relojes — Todos los derechos reservados</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GearIcon size={10} />
            <span className="serif" style={{ color: "var(--gold3)", letterSpacing: ".1em" }}>
              Elegancia en cada segundo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [view, setView] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selWatch, setSelWatch] = useState(null);

  const handleSelectWatch = (w) => {
    setSelWatch(w);
    // Tracking real de vistas de producto
    const pv = Number(localStorage.getItem("fya_productviews") || 0) + 1;
    localStorage.setItem("fya_productviews", pv);
  };
  const [user, setUser] = useLS("fya_user", null);
  const [customers, setCustomers] = useLS("fya_customers", []);
  const [favs, setFavs] = useLS("fya_favs", []);
  const [sales, setSales] = useLS("fya_sales", []);

  // ── Tracking de visitas reales ──────────────────────────────
  useEffect(() => {
    const total = Number(localStorage.getItem("fya_pageviews") || 0) + 1;
    localStorage.setItem("fya_pageviews", total);
    const today = new Date().toISOString().slice(0, 10);
    const dayKey = `fya_views_${today}`;
    localStorage.setItem(dayKey, Number(localStorage.getItem(dayKey) || 0) + 1);
    const visited = localStorage.getItem("fya_visited");
    if (!visited) {
      setTimeout(() => setShowLogin(true), 2500);
      localStorage.setItem("fya_visited", "1");
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    if (u.type === "registered" && !customers.find((c) => c.id === u.id)) {
      setCustomers((prev) => [...prev, { ...u, sessions: 1, waClicks: 0 }]);
      sendNotification(
        "🎉 Nuevo cliente VIP registrado",
        `Nombre: ${u.name}\nWhatsApp: ${u.wa || "—"}\nEmail: ${u.email || "—"}\nCiudad: ${u.city || "—"}\nPresupuesto: ${u.budget || "—"}`
      );
    }
  };

  const handleWA = (w) => {
    const msg = w
      ? `Hola, vengo desde la web de *F&A Relojes* y quiero consultar el modelo *${w.name}* — Precio: ${fmt(w.price)}`
      : `Hola, vengo desde la web de *F&A Relojes* y quiero información sobre su catálogo`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    if (user)
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === user.id ? { ...c, waClicks: (c.waClicks || 0) + 1 } : c
        )
      );
    const clientName = user ? user.name : "Visitante anónimo";
    sendNotification(
      "📲 Nueva consulta por WhatsApp",
      w
        ? `Modelo: ${w.name}\nPrecio: ${fmt(w.price)}\nCliente: ${clientName}\nCategoría: ${w.category}`
        : `Consulta general al catálogo\nCliente: ${clientName}`
    );
  };

  const handleFav = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const handleNav = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>

      {showAdmin ? (
        <AdminDash
          customers={customers}
          sales={sales}
          onClose={() => setShowAdmin(false)}
          onAddSale={(s) => setSales((prev) => [...prev, s])}
        />
      ) : (
        <>
          <Ticker />
          <Header onNav={handleNav} view={view} user={user} onLogin={() => setShowLogin(true)} />

          {view === "home" && (
            <>
              <Hero onNav={handleNav} />
              <SocialBand />
              <MostChosen onSelect={handleSelectWatch} favs={favs} onFav={handleFav} onWA={handleWA} />
              <Testimonials />
              <Catalog onSelect={handleSelectWatch} favs={favs} onFav={handleFav} onWA={handleWA} />
              <Footer onNav={handleNav} />
            </>
          )}
          {view === "catalog" && (
            <div style={{ paddingTop: 110 }}>
              <Catalog onSelect={handleSelectWatch} favs={favs} onFav={handleFav} onWA={handleWA} />
              <Footer onNav={handleNav} />
            </div>
          )}
          {view === "offers" && (
            <div style={{ paddingTop: 110 }}>
              <Catalog
                onSelect={handleSelectWatch}
                favs={favs}
                onFav={handleFav}
                onWA={handleWA}
                filterCat="Ofertas"
              />
              <Footer onNav={handleNav} />
            </div>
          )}

          {selWatch && (
            <ProductModal
              w={selWatch}
              onClose={() => setSelWatch(null)}
              onWA={handleWA}
              isFav={favs.includes(selWatch.id)}
              onFav={handleFav}
            />
          )}
          {showLogin && (
            <LoginModal
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
              onAdmin={() => setShowAdmin(true)}
            />
          )}

          <NotifToast />
          <FloatWA onClick={() => handleWA(null)} />
        </>
      )}
    </>
  );
}
