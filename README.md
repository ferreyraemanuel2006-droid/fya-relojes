# 👑 F&A Relojes — Sitio Web

Tienda online de relojes premium con panel de administración, CRM, notificaciones por email y tracking real de visitas.

---

## 🚀 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/fya-relojes.git
cd fya-relojes

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
```

Abrí `http://localhost:5173` en tu navegador.

---

## 📦 Deploy en Vercel (recomendado — gratis)

1. Subí el proyecto a GitHub
2. Entrá a [vercel.com](https://vercel.com) → **New Project**
3. Conectá tu repositorio de GitHub
4. Framework: **Vite** (lo detecta automático)
5. Click en **Deploy** — listo ✅

---

## 📧 Activar notificaciones por email (EmailJS)

Para recibir emails cuando alguien consulte por WhatsApp o se registre:

1. Creá cuenta gratis en [emailjs.com](https://www.emailjs.com) (200 emails/mes gratis)
2. Conectá tu Gmail en **Email Services**
3. Creá un **Email Template** con este contenido:

```
Asunto: {{event_type}} — F&A Relojes

Evento: {{event_type}}
Detalle:
{{details}}

Fecha: {{timestamp}}
```

4. Editá `src/App.jsx` y completá estas 3 líneas al principio del archivo:

```js
const EMAILJS_SERVICE_ID  = "service_XXXXXXX";   // tu Service ID
const EMAILJS_TEMPLATE_ID = "template_XXXXXXX";  // tu Template ID
const EMAILJS_PUBLIC_KEY  = "XXXXXXXXXXXXX";      // tu Public Key
```

---

## ⚙️ Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | `WA_NUMBER` en `src/App.jsx` |
| Email del admin | `ADMIN_EMAIL` en `src/App.jsx` |
| Contraseña del panel | `ADMIN_PASS` en `src/App.jsx` |
| Relojes del catálogo | Array `WATCHES` en `src/App.jsx` |
| Testimonios | Array `TESTIMONIALS` en `src/App.jsx` |

---

## 🔐 Panel de Administración

Accedé desde el botón **"Acceder"** → **"Acceso Administrador"**

- **📊 Resumen**: visitas reales, ventas, clics a WhatsApp
- **🔁 Embudo**: conversión real visita → producto → WA → venta
- **👥 CRM**: clientes registrados, segmentados por temperatura
- **💰 Ventas**: registro manual de cada venta
- **⌚ Productos**: ranking por vistas

---

## 🛠 Tecnologías

- React 18 + Vite
- CSS-in-JS (sin dependencias de estilos)
- LocalStorage para persistencia
- EmailJS para notificaciones
- Google Fonts (Playfair Display + DM Sans)
