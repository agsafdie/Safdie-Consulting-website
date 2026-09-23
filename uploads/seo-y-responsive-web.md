# Skill: SEO, seguridad y diseño responsive para webs de consultoría (one-page o web de pocas páginas)

Extraído del trabajo real en la web de Longevity Initiatives y ampliado con las mejoras técnicas y de seguridad aplicadas en producción a befocusy.com (favicons/OG completos, cabeceras de seguridad, caché, consentimiento de cookies, multi-idioma, redirecciones, URLs limpias en Apache). Úsalo como checklist y banco de snippets al montar cualquier landing/one-page o web estática pequeña en HTML con estilos inline (sin hojas de estilo con clases), pensada para subirse tal cual a un **hosting Apache** o a **Cloudflare (Pages o Workers)**. El **Paso 0** decide cuál y, con él, qué secciones y qué ficheros aplican.

---

## 🧭 PASO 0 — Preguntas obligatorias antes de generar nada

Este manual es **condicional**: los ficheros de configuración, el formulario y parte de la seguridad cambian según **dónde se va a publicar la web**. Antes de escribir una sola línea, la herramienta que genera la web (Claude Design u otra) debe **tener respuesta a estas preguntas**. Si el brief ya las responde, no se vuelven a preguntar. Si falta alguna, se preguntan **todas las que falten en un único mensaje** y **no se genera nada hasta tener al menos la P1**. Nunca se da por hecha una respuesta.

| # | Pregunta | Opciones | Qué decide |
|---|---|---|---|
| **P1** | **¿Dónde se va a publicar la web?** | **A.** Hosting con Apache (hosting compartido, cPanel, Plesk…) · **B.** Cloudflare Pages · **C.** Cloudflare Workers · **D.** No lo sé | Ficheros de configuración, formulario, secciones que aplican (tabla de abajo) |
| **P2** | ¿Dominio y versión canónica? | `dominio.com` **con** `www` o **sin** `www` | `canonical`, `og:url`, sitemap, `robots.txt` y la redirección de dominio |
| **P3** | ¿A qué correo deben llegar los mensajes del formulario? | Una dirección | `contacto.php` (A) o el envío en Cloudflare (B/C) |
| **P3b** | *Solo si P1 = B o C:* ¿cómo se envía el formulario? | Worker con `send_email` (gratis a una dirección verificada; recomendado en C) · Pages Function + proveedor de email · servicio de formularios (Formspree, Web3Forms…) | El `action` del formulario y la CSP (`form-action`) |
| **P4** | ¿Habrá analítica o píxeles de terceros? | No (recomendado) · Sí, ¿cuál? | Banner de cookies (§12) y dominios en la CSP |
| **P5** | ¿En qué idiomas? | Solo español · varios (¿cuáles?) | Carpetas de idioma, `hreflang` y sitemap (§13) |
| **P6** | Datos legales del titular | Nombre o razón social, identificación fiscal y domicilio | Aviso legal y política de privacidad (§16.8). Si no se dan, se marcan como `[COMPLETAR]` y nunca se inventan |

**Si la respuesta a P1 es "D. No lo sé":**
1. Si el dominio ya tiene una web publicada, compruébalo con las cabeceras (§15.2):
   ```bash
   curl -sI https://{{dominio}}/ | grep -iE '^(server|cf-ray|access-control-allow-origin)'
   ```
   `Server: Apache` o `nginx` → **A**. `Server: cloudflare` **y** `/.htaccess` que no responde 403 → **B/C**. `Server: cloudflare` con Apache detrás (el `.htaccess` sí funciona) → **A** + los ajustes de proxy de la §15.2.
2. Si hay un **panel de hosting** (cPanel, Plesk) o se sube por **FTP** → **A**. Si se publica **arrastrando la carpeta al panel de Cloudflare** o conectando un repositorio de GitHub a Cloudflare → **B** (o **C** si el proyecto es un Worker).
3. Si aun así no se sabe, **pregunta a la persona**. No generes los ficheros de configuración de las dos plataformas "por si acaso": en Cloudflare, un `.htaccess` o un `.php` subidos quedan públicos, y en Apache, `_headers` y `_redirects` no hacen nada.

### Hoja de ruta según la respuesta a P1

| | **A. Apache** | **B. Cloudflare Pages** | **C. Cloudflare Workers** |
|---|---|---|---|
| **Secciones comunes** (aplicar siempre) | LEER PRIMERO, 0–9, 12, 13, 16.1–16.6, 16.8 | Igual | Igual |
| **Cabeceras de seguridad y caché** (qué cabeceras: §10 y §11) | En `.htaccess` (§15) | En `_headers` (§15.3, punto 2) | En `_headers` (§15.3, punto 2) |
| **URLs sin `.html`** (§0.3) | Reglas del `.htaccess` (301) | Automático (308) | Automático con `html_handling` (307) |
| **Redirecciones 301** (§14) | En `.htaccess` | En `_redirects` (siempre con `301`) | En `_redirects` |
| **`www` ↔ sin `www`** | En `.htaccess` (§15, paso 4) | En el panel: DNS `www` proxied + Bulk Redirect (§15.3) | Igual que Pages |
| **404** | `404.html` + `ErrorDocument` | `404.html` en la raíz (**sin él, soft-404 en todo el sitio**) | `404.html` + `not_found_handling: "404-page"` |
| **Formulario** (P3) | `contacto.php` (§16.7) | Según P3b (§15.3, punto 5) | Worker con `send_email` o según P3b |
| **Archivos privados** | `Require all denied` (§15.1) | **No existe: no subirlos** | `.assetsignore` |
| **Ajustes del panel** | Solo si hay nginx o Cloudflare delante (§15.2) | Obligatorios: §15.3, puntos 4, 6 y 7 | Igual + `workers_dev: false` |
| **Secciones que NO aplican** | 15.3 | 15, 15.1, 16.7 | 15, 15.1, 16.7 |

**Ficheros específicos que se entregan** (además de los comunes de la sección E):

| | Incluir | No incluir nunca |
|---|---|---|
| **A. Apache** | `.htaccess`, `contacto.php` | `_headers`, `_redirects`, `wrangler.jsonc` |
| **B. Cloudflare Pages** | `_headers`, `_redirects` | `.htaccess`, `contacto.php` ni ningún `.php` |
| **C. Cloudflare Workers** | `_headers`, `_redirects`, `.assetsignore` (en la carpeta publicada) + `wrangler.jsonc` (fuera de ella) + el Worker del formulario si P3b lo requiere | `.htaccess`, `.php` |

**Al entregar**, la respuesta final a la persona debe incluir, según P1, los **pasos de publicación** y los **ajustes del panel** que no se pueden dejar en ficheros. En A: subir por FTP con los archivos ocultos visibles y comprobar la cabecera `Server`. En B/C: Always Use HTTPS, TLS 1.2, HSTS, Bulk Redirect de `www` y de `*.pages.dev`, y desactivar Email Address Obfuscation, Rocket Loader y Bot Fight Mode (§15.3, punto 6). Incluye también la lista de `curl` de verificación de la sección correspondiente (§15 o §15.3).

---

## ⚠️ LEER PRIMERO — Formato de entrega obligatorio (para Claude Design o cualquier generador de webs)

Esta sección va dirigida a la herramienta o persona que **genera** la web. El objetivo es entregar en una sola pasada una carpeta que se sube tal cual al hosting elegido en el **Paso 0**, sin retoques posteriores. Todo lo que sigue es **obligatorio**. Si la herramienta trabaja internamente con otro formato (plantillas, componentes, runtime propio), el **entregable final** tiene que cumplir esto igualmente.

### A. HTML estático final, sin renderizado por JavaScript

La web es informativa y de pocas páginas: no necesita ningún framework. Cada `.html` entregado debe contener **ya escrito** todo lo que el visitante ve, tal como lo leería un buscador que no ejecuta JavaScript.

**Prohibido en el entregable:**

| No usar | Por qué | Usar en su lugar |
|---|---|---|
| Runtimes que pintan la página en el navegador (`support.js`, React/ReactDOM, Babel standalone, Vue, `new Function`/`eval`) | El contenido no existe en el HTML: peor SEO, la página tarda más en mostrarse y la CSP necesitaría `'unsafe-eval'` | El HTML final ya "renderizado" |
| Scripts desde CDNs de terceros (`unpkg.com`, `cdn.jsdelivr.net`…) | Dependencia externa, más lentitud, más superficie de ataque y la CSP tiene que abrirse a esos dominios | Ningún JS de terceros (salvo analítica tras consentimiento, sección 12) |
| Plantillas sin resolver: `{{ variable }}`, `<sc-if>`, `<sc-for>`, `<x-dc>`, `<x-import>`, `<helmet>`, `<image-slot>`, `data-dc-*`, `hint-*` | Son instrucciones para el editor, no HTML | El resultado ya expandido: los bucles escritos como elementos repetidos y las condiciones resueltas |
| Metadatos (`<title>`, `meta`, OG, JSON-LD) dentro de `<body>` o inyectados por JS | WhatsApp, LinkedIn y otros no ejecutan JS: la tarjeta social sale vacía | Todo en el `<head>` real del documento (sección 1) |
| Componentes JS de un design system (`Button`, `Card`, `Input`…) | Mismo problema que el runtime | Copiar el HTML y los estilos que produce cada componente como elementos normales con estilos en línea |
| Estados hover/focus gestionados con JS (`useState`, `onMouseEnter`) | Innecesario | CSS en el único bloque `<style>`, con selectores `[data-btn="primary"]:hover` |
| Manejadores en línea: `onclick="…"`, `onsubmit="…"` | La CSP con `script-src 'self'` los bloquea | Un único `/assets/js/main.js` con `addEventListener` |
| `@import` de fuentes dentro de un CSS | Carga en cadena y bloquea el primer pintado | `<link rel="preconnect">` + `<link rel="stylesheet">` en el `<head>`, solo con los pesos que se usan |
| Varios CSS de tokens separados (`colors.css`, `typography.css`…) | Varias peticiones para unos pocos KB | Un único `/assets/css/{{marca}}.css` con todas las variables (`:root{--…}`) y la base |

**JavaScript permitido:** solo `/assets/js/main.js` (con `defer`), para el menú hamburguesa (abrir y cerrar, `aria-expanded`, cerrar con `Esc` y al pulsar un enlace) y, si hace falta, para mostrar el aviso de error del formulario. La web tiene que poder leerse y navegarse entera con JavaScript desactivado.

### B. Formulario de contacto real

- **Nunca** un formulario que "simula" el envío (mostrar "Gracias" sin mandar nada) ni un `onSubmit` con `preventDefault`.
- **A. Apache:** `<form action="/contacto.php" method="post">`. **B/C. Cloudflare:** no hay PHP; el `action` depende de P3b (§15.3, punto 5). Cada campo lleva su `name`, `required`, `maxlength` y `autocomplete`, más un campo trampa oculto anti-spam. La casilla de consentimiento enlaza a `/politica-privacidad`. El HTML de la sección 16.7 sirve para todas las plataformas; el PHP, solo para A.
- Tras enviar, el envío (`contacto.php`, el Worker o el servicio de formularios) redirige a `/gracias`, con `noindex` (sección 16.8).

### C. Imágenes: nada de huecos vacíos

- No entregues marcadores de posición visibles (`image-slot`, cajas grises con el texto "Retrato de…"). Si la foto real no existe todavía, **maqueta la sección sin la imagen** y deja el `<img>` preparado dentro de un comentario HTML con la ruta, el tamaño recomendado y el ajuste de maquetación que hay que hacer al añadirla.
- Todo `<img>` lleva `width`, `height` y `alt`, y usa `loading="lazy"` si está por debajo de la primera pantalla.
- **El logo de la cabecera se sirve al doble de su tamaño en pantalla**, nunca el original de alta resolución: si se muestra a 40 px de alto, el archivo mide 80 px de alto.
- **Genera y entrega también** el set de favicons y el icono `maskable` a partir del isotipo (sección 2), y la imagen social de 1200×630 (sección 2.3) con logo + propuesta de valor. No reutilices el logo como `og:image`.

### D. Contraste y accesibilidad por defecto

- Nunca uses como color de **texto** un token pensado para bordes o con transparencia (`--border-on-dark: rgba(…,.18)`). Para texto secundario sobre fondo oscuro usa un neutro claro opaco con un contraste de al menos 4.5:1.
- Un solo `<h1>`. `<main>` envuelve el contenido y `<nav aria-label>` el menú. El botón del menú lleva `aria-label`, `aria-controls` y `aria-expanded`. Añade `:focus-visible` con un contorno visible.

### E. Carpeta entregable (estructura exacta)

```
index.html  404.html  gracias.html  politica-privacidad.html  aviso-legal.html
robots.txt  sitemap.xml  site.webmanifest
favicon.ico  favicon-16x16.png  favicon-32x32.png  apple-touch-icon.png
android-chrome-192x192.png  android-chrome-512x512.png  maskable-512x512.png  icon-source.png
.well-known/security.txt
assets/css/{{marca}}.css   assets/js/main.js   assets/img/…   (logo cabecera, logo grande, og-image-1200x630)

+ según P1 (Paso 0):
  A. Apache ............ .htaccess  contacto.php
  B. Cloudflare Pages .. _headers  _redirects
  C. Cloudflare Workers  _headers  _redirects  .assetsignore   (+ wrangler.jsonc fuera de la carpeta publicada)
```

Los ficheros que dependen del hosting y la regla de oro están en el **Paso 0**: nunca se entregan los de otra plataforma. En Cloudflare, **todo lo que se sube es público, incluidos los ficheros que empiezan por punto**.

**No incluyas** en el entregable: carpetas del design system (`_ds/`), `uploads/`, briefs ni documentos `.md`, archivos del runtime ni `.DS_Store`.

### F. Autocomprobación antes de entregar

Todas estas búsquedas sobre la carpeta entregada deben dar **cero resultados**:

```bash
grep -rlE 'unpkg\.com|react(-dom)?(\.production)?(\.min)?\.js|babel|support\.js|new Function' .
grep -rlE '\{\{|<sc-(if|for)|<x-(dc|import)|<helmet|<image-slot|data-dc-' --include='*.html' .
grep -rlE ' on(click|submit|change|mouseover)=' --include='*.html' .
grep -rlE 'href="[a-z][^":]*\.html|(src|href)="(\./)?assets/' --include='*.html' .   # enlaces con .html o rutas relativas
grep -rL '<link rel="canonical"' --include='*.html' . | grep -v -e 404 -e gracias   # páginas sin canonical
# Según P1 — ficheros de la otra plataforma (deben dar cero):
ls _headers _redirects wrangler.jsonc 2>/dev/null          # si P1 = A (Apache)
find . -name '.htaccess' -o -name '*.php' | head          # si P1 = B o C (Cloudflare)
test -f 404.html || echo "FALTA 404.html"                 # siempre
```

Y abriendo `index.html` con JavaScript desactivado, tienen que verse todo el texto, el menú (en escritorio), los servicios y el formulario.

---

## 0. Estructura del proyecto, nombres de archivo y URLs limpias (hacer ANTES de escribir HTML)

La web se entrega como una carpeta estática que se sube **tal cual** a la raíz pública del hosting (`public_html/`, `htdocs/`, `www/`…). Para que funcione sin tocar nada en el servidor y con URLs buenas para SEO, se respetan tres reglas desde el primer archivo.

### 0.1 La página principal se llama siempre `index.html`

- Apache sirve automáticamente `index.html` cuando alguien entra en `https://www.dominio.com/` (directiva `DirectoryIndex`). Si la home se llama `home.html`, `inicio.html` o `landing.html`, el dominio desnudo mostrará un listado de archivos, un 403 o la página por defecto del hosting.
- La home **no tiene slug**: su URL es directamente el dominio (`https://www.dominio.com/`). Nunca enlaces a `/index.html` ni a `/inicio` — en el menú, el logo y el JSON-LD se enlaza a `/`. El `.htaccess` (sección 15) redirige con 301 cualquier `/index.html` a `/` para que no exista contenido duplicado.
- Lo mismo aplica a cada carpeta de idioma: `/en/index.html` se sirve como `/en/`.

### 0.2 Nombres de archivo = slug = palabra clave

Cada página interior es un archivo `.html` en la raíz cuyo nombre **es** su slug, y el slug es la palabra clave principal por la que quieres posicionar esa página:

| ❌ Evitar | ✅ Usar | Por qué |
|---|---|---|
| `pagina2.html`, `servicios1.html` | `consultoria-ia.html` | El slug es una señal de relevancia y lo que el usuario lee en el resultado de Google |
| `Consultoría IA.html` | `consultoria-ia.html` | Sin mayúsculas, espacios, tildes ni `ñ` (`ñ`→`n`, `á`→`a`): evitan `%C3%AD` en la URL y errores en Linux, que distingue mayúsculas |
| `consultoria_ia.html` | `consultoria-ia.html` | Google trata el guion como separador de palabras; el guion bajo no |
| `servicios-de-consultoria-de-inteligencia-artificial-para-empresas.html` | `consultoria-ia-empresas.html` | 2–4 palabras. Quita artículos y preposiciones (`de`, `la`, `para`) |
| `ofertas-2026.html` | `formacion-notion.html` | Sin fechas ni números que caduquen: una URL estable acumula autoridad; cambiarla obliga a una redirección 301 (sección 14) |
| `sobre-nosotros.html` (si nadie lo busca) | `sobre-{{nombre-fundador}}.html` o `quienes-somos.html` | Para páginas institucionales, usa lo que la gente escribe de verdad |

Las páginas legales llevan slugs descriptivos estándar (`aviso-legal`, `politica-privacidad`, `politica-cookies`) y `<meta name="robots" content="noindex, follow">`: tienen que existir y estar enlazadas desde el pie, pero no aportan nada en Google.

### 0.3 URLs sin `.html` `[Todos — el mecanismo depende de P1]`

Los archivos se llaman `consultoria-ia.html` en disco, pero **la URL pública es `https://www.dominio.com/consultoria-ia`**. En **Cloudflare (B/C)** lo hace la plataforma sola (308 en Pages, 307 en Workers, §15.3). En **Apache (A)**, el `.htaccess` de la sección 15 hace tres cosas:

1. `/consultoria-ia` → sirve internamente `consultoria-ia.html` (el usuario nunca ve la extensión).
2. `/consultoria-ia.html` → redirige con **301** a `/consultoria-ia` (una sola URL por página, sin duplicados).
3. `/consultoria-ia/` (con barra final) → redirige con 301 a `/consultoria-ia`.

Convención resultante: **páginas sin barra final** (`/consultoria-ia`), **carpetas con barra** (`/en/`) y la **home es el dominio** (`/`).

Consecuencias para el HTML — la URL limpia se usa en **todas** partes, no solo en el navegador:
- Enlaces internos siempre con ruta absoluta desde la raíz y sin extensión: `href="/consultoria-ia"`, nunca `href="consultoria-ia.html"`.
- Enlaces a secciones de la home desde otras páginas: `href="/#servicios"` (con la `/` delante; `#servicios` a secas solo funciona dentro de la propia home).
- Recursos (imágenes, CSS, JS, iconos) con ruta desde la raíz: `/assets/img/hero.webp`. Las rutas relativas (`assets/…`) se rompen en cuanto una página vive en una subcarpeta como `/en/`.
- `canonical`, `og:url`, `hreflang`, JSON-LD, `sitemap.xml`: siempre la URL limpia absoluta (`https://www.dominio.com/consultoria-ia`).

**Probar en local:** abrir el HTML con doble clic (`file://`) no resuelve rutas `/…` ni URLs sin extensión. Usa un servidor local que imite las URLs limpias: `npx serve .` (activa `cleanUrls` por defecto). `python3 -m http.server` sirve la web pero **no** resuelve `/consultoria-ia` sin `.html`.

**Hosting sin `mod_rewrite` (poco habitual):** alternativa sin `.htaccess` → una carpeta por página con su `index.html` dentro (`consultoria-ia/index.html` → `/consultoria-ia/`). Funciona en cualquier servidor, pero todas las URLs llevan barra final; elige una convención y no mezcles.

### 0.4 Árbol de archivos de referencia

```
public_html/                      ← raíz pública del hosting (se sube el CONTENIDO de la carpeta)
├── index.html                    → https://www.dominio.com/
├── consultoria-ia.html           → /consultoria-ia
├── formacion-notion.html         → /formacion-notion
├── contacto.html                 → /contacto
├── aviso-legal.html              → /aviso-legal          (noindex)
├── politica-privacidad.html      → /politica-privacidad  (noindex)
├── politica-cookies.html         → /politica-cookies     (noindex)
├── 404.html                      → página de error (noindex), sección 16.5
├── en/                           (solo si hay otros idiomas, sección 13)
│   ├── index.html                → /en/
│   └── ai-consulting.html        → /en/ai-consulting     (slug en el idioma de la página)
├── assets/
│   ├── img/   css/   js/   fonts/
│   └── og-image-1200x630.jpg
├── favicon.ico  favicon-16x16.png  favicon-32x32.png  apple-touch-icon.png
├── android-chrome-192x192.png  android-chrome-512x512.png  maskable-512x512.png
├── icon-source.png               (original para regenerar iconos; no se enlaza)
├── site.webmanifest              → sección 2.2
├── robots.txt                    → sección 16.2
├── sitemap.xml                   → sección 16.3
├── .well-known/security.txt      → sección 16.4
├── .htaccess · contacto.php      → solo A. Apache (secciones 15 y 16.7)
└── _headers · _redirects         → solo B/C. Cloudflare (sección 15.3)
```

Al subir por FTP/SFTP, activa "mostrar archivos ocultos" en el cliente: `.htaccess` y `.well-known/` empiezan por punto y muchos clientes no los muestran ni los suben por defecto. No subas a producción archivos de trabajo (`.md`, `.zip`, `.psd`, `.git/`, `node_modules/`); el `.htaccess` los bloquea igualmente por si acaso.

## 1. `<head>` — bloque SEO completo (copiar y rellenar)

```html
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{Marca}} — {{Propuesta de valor corta}} | {{Nombre fundador/a}}</title>
<meta name="description" content="{{Descripción de 1-2 frases: qué hacéis, para quién, dónde. Máx ~160 caracteres}}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.{{dominio}}/">

<!-- En páginas interiores: canonical con la URL limpia, sin .html ni barra final (sección 0.3) -->
<!-- <link rel="canonical" href="https://www.{{dominio}}/{{slug}}"> -->

<!-- Solo si hay versiones en otros idiomas (ver sección 13) -->
<link rel="alternate" hreflang="es" href="https://www.{{dominio}}/">
<link rel="alternate" hreflang="en" href="https://www.{{dominio}}/en/">
<link rel="alternate" hreflang="x-default" href="https://www.{{dominio}}/">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="{{Marca}}">
<meta property="og:title" content="{{Marca}} — {{Propuesta de valor corta}}">
<meta property="og:description" content="{{Misma descripción o variante corta}}">
<meta property="og:url" content="https://www.{{dominio}}/">
<meta property="og:image" content="https://www.{{dominio}}/assets/{{imagen-social-1200x630}}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{Marca}} — {{Propuesta de valor corta}}">
<meta name="twitter:description" content="{{Misma descripción}}">
<meta name="twitter:image" content="https://www.{{dominio}}/assets/{{imagen-social}}">

<!-- Rendimiento: solo lo que realmente bloquea el primer pintado -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={{Fuente}}:wght@500;600;700&display=swap">
<link rel="preload" as="image" href="{{imagen-hero}}" fetchpriority="high">

<!-- Favicon e iconos — ver checklist completo en la sección 2 -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="{{color-marca}}">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "{{Marca}}",
      "url": "https://www.{{dominio}}/",
      "logo": "https://www.{{dominio}}/favicon-32x32.png",
      "description": "{{Descripción}}",
      "founder": {
        "@type": "Person",
        "name": "{{Nombre fundador/a}}",
        "url": "https://www.{{dominio}}/{{pagina-sobre}}"
      },
      "sameAs": ["https://www.linkedin.com/in/{{perfil}}/"]
    },
    { "@type": "WebSite", "name": "{{Marca}}", "url": "https://www.{{dominio}}/", "inLanguage": "es" }
  ]
}
</script>
</head>
```

**Por qué cada pieza importa:**
- `title` con el patrón `Marca — beneficio | Persona` cubre búsqueda por marca y por experto.
- `description` es lo que se muestra en Google bajo el título: que venda, no que describa.
- `canonical` evita contenido duplicado si la web se sirve por varias URLs (con/sin `www`, `?utm=`...).
- `og:*`/`twitter:*` controlan cómo se ve el link al compartirlo en LinkedIn/WhatsApp — sin esto, la tarjeta social sale vacía o con datos genéricos. Ver sección 2 para el icono/imagen en sí.
- El JSON-LD en formato **`@graph`** (un único bloque `<script>` con un array de entidades) es preferible a varios `<script type="application/ld+json">` sueltos: es más fácil de mantener y de ampliar según crece la web (añadir `FAQPage`, `Service`, `BreadcrumbList`... como entidades nuevas del mismo array en vez de bloques nuevos). Cambia `@type` a `LocalBusiness` si hay dirección física.
- `preconnect`/`preload`/`fetchpriority="high"` en la imagen del hero adelantan la conexión y la descarga de lo que el usuario ve primero — mejora LCP (Largest Contentful Paint) sin tocar el resto del rendimiento.

### JSON-LD adicional según la página

Añade estas entidades al mismo array `@graph` (no crees bloques `<script>` separados):

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "{{pregunta frecuente}}", "acceptedAnswer": { "@type": "Answer", "text": "{{respuesta}}" } }
  ]
}
```

```json
{
  "@type": "Service",
  "name": "{{Nombre del servicio}}",
  "description": "{{Qué incluye}}",
  "provider": { "@type": "Organization", "name": "{{Marca}}" },
  "areaServed": "Online",
  "offers": { "@type": "Offer", "price": "{{precio}}", "priceCurrency": "EUR", "url": "{{url de reserva/compra}}", "availability": "https://schema.org/InStock" }
}
```

En páginas que no sean la home, añade también un `BreadcrumbList` (como bloque `<script>` aparte está bien, ya que cambia por página):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.{{dominio}}/" },
    { "@type": "ListItem", "position": 2, "name": "{{Sección}}", "item": "https://www.{{dominio}}/{{slug}}" }
  ]
}
```

## 2. Identidad visual al compartir: favicon, iconos y tarjeta social

Esto es lo que decide **cómo se ve la marca fuera de la propia web**: la pestaña del navegador, el resultado en Google, la tarjeta al compartir en WhatsApp/LinkedIn/Slack, y el icono si alguien "instala" la web como app en el móvil. Se monta una sola vez a partir de un logo/isotipo cuadrado de alta resolución (≥512×512, fondo sólido o transparente según el destino) y luego se referencia desde el `<head>`.

### 2.1 Genera el set completo de iconos

A partir de un `icon-source.png` (recomendado 512×512 o mayor, cuadrado), genera:

| Archivo | Tamaño | Para qué sirve |
|---|---|---|
| `favicon.ico` | multi-tamaño (16+32 embebidos) | Pestaña del navegador, compatibilidad con navegadores antiguos |
| `favicon-16x16.png` | 16×16 | Pestaña en pantallas normales |
| `favicon-32x32.png` | 32×32 | Pestaña en pantallas de alta densidad, y también el `logo` del JSON-LD `Organization` |
| `apple-touch-icon.png` | 180×180 | Icono al "Añadir a pantalla de inicio" en iOS/Safari. **Siempre PNG, nunca SVG**: iOS no admite SVG en `apple-touch-icon` y muestra una captura de la página en su lugar |
| `android-chrome-192x192.png` | 192×192 | Icono de la PWA/atajo en Android |
| `android-chrome-512x512.png` | 512×512 | Splash screen / icono de alta resolución en Android |
| `maskable-512x512.png` | 512×512 | Icono "adaptable" de Android: el logo ocupa solo el 80 % central (zona segura) sobre fondo sólido de marca, para que Android lo recorte en círculo/squircle sin cortar el logo. Compruébalo en [maskable.app](https://maskable.app) |

Herramientas rápidas para generarlos todos de una vez a partir de un único PNG: [realfavicongenerator.net](https://realfavicongenerator.net) o `npx pwa-asset-generator`. Guarda siempre el `icon-source.png` original en el repo (no solo los derivados) para poder regenerar el set si cambia la paleta de marca.

Referencia todo desde el `<head>` (ver bloque de la sección 1):

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="{{color-marca}}">
```

### 2.2 `site.webmanifest` — icono en Android/PWA y color de la barra del navegador

```json
{
  "name": "{{Marca completa}}",
  "short_name": "{{Marca corta}}",
  "description": "{{Descripción corta}}",
  "lang": "es",
  "id": "/",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "{{color-marca}}",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "{{Página clave, p. ej. Contacto}}", "url": "/{{slug}}", "icons": [{ "src": "/android-chrome-192x192.png", "sizes": "192x192" }] }
  ]
}
```

- El archivo se llama `site.webmanifest`, vive en la raíz y se sirve con el tipo MIME `application/manifest+json` (lo fuerza el `.htaccess` de la sección 15; algunos Apache lo sirven como `text/plain` y Chrome lo ignora).
- Todas las rutas (`src`, `start_url`, `shortcuts.url`) desde la raíz y con URLs limpias, igual que el resto del sitio (sección 0.3).
- `shortcuts` es opcional: son los accesos directos que aparecen al mantener pulsado el icono instalado en Android. Uno o dos (contacto, reserva) como mucho.
- `"purpose": "maskable"` va en un icono **aparte**; no uses `"any maskable"` en el mismo archivo, porque el recorte o el margen quedan mal en uno de los dos contextos.

`theme_color` también se repite como `<meta name="theme-color">` en el `<head>`: colorea la barra de dirección en Chrome Android y la barra de estado al abrir la web como PWA. Usa el mismo tono que el CTA principal de la marca.

### 2.3 Imagen al compartir (Google, WhatsApp, LinkedIn, Slack…)

El favicon **no** es lo que se ve al compartir un link — para eso hace falta una imagen aparte, más grande, referenciada en `og:image`/`twitter:image`:

- Tamaño recomendado: **1200×630px** (ratio ~1.91:1, el que usan Facebook/LinkedIn para la vista previa grande). Para Twitter/X con `summary_large_image` sirve la misma imagen.
- Formato PNG o JPG, peso razonable (< 300 KB) — WhatsApp y LinkedIn cachean la primera versión que ven, así que si cambias la imagen después de compartir el link una vez, puede tardar en actualizarse (usa el [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) o el [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) para forzar el refresco).
- Contenido: logo + propuesta de valor en texto grande y legible incluso en miniatura — no repitas literalmente el favicon ampliado, esta imagen es la "portada" del link.
- URL siempre **absoluta** (`https://www.dominio.com/...`), nunca relativa — muchos scrapers de redes sociales no resuelven rutas relativas.

```html
<meta property="og:image" content="https://www.{{dominio}}/assets/{{imagen-social-1200x630}}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://www.{{dominio}}/assets/{{imagen-social-1200x630}}">
```

### 2.4 Verificación rápida antes de dar por cerrada la web

1. Pestaña del navegador (desktop y móvil): ¿se ve el favicon nítido, no pixelado?
2. Resultado en Google: la indexación tarda semanas, así que usa Google Search Console → Inspección de URL → "Solicitar indexación" para forzar el rastreo y ver cómo lo interpreta Google. El favicon en los resultados de búsqueda tarda aún más en actualizarse que el título.
3. Comparte el link en un chat de WhatsApp/Telegram a ti mismo: ¿aparece la tarjeta con imagen, título y descripción correctos?
4. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) y [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/): pega la URL y confirma que `og:image`, `og:title` y `og:description` se leen bien.
5. En Chrome Android, "Añadir a pantalla de inicio": confirma que sale el icono de `site.webmanifest` (192×192), no un recorte automático de la página.

## 3. Jerarquía semántica (para SEO y para lectores de pantalla)

- **Un único `<h1>`** por página, con la propuesta de valor principal (no el nombre de la marca — eso va en el logo/nav).
- `<h2>` para cada sección (`Servicios`, `Sectores`, `Casos`…), `<h3>` para las tarjetas/bloques dentro de cada sección.
- **`id` en cada `<section>`** que quieras enlazar desde el menú: `id="servicios"`, `id="casos"`… Sirve para el ancla del nav (`href="#servicios"`) y para compartir enlaces directos a una sección.
- `alt=""` en imágenes puramente decorativas (marcas de agua, formas de fondo) — así los lectores de pantalla las ignoran.
- `alt` descriptivo en imágenes con contenido real: portadas de libro, logos de clientes, iconos con significado (`alt="ODS 3: Salud y bienestar"`, no `alt="icono"`).
- `<html lang="es">` (o el idioma real) siempre.

## 4. La técnica clave: responsive con estilos 100% inline

Cuando no se pueden usar clases CSS, los estilos van inline en cada elemento (`style="..."`) — eso impide escribir media queries normales apuntando a una clase. La solución: **un único bloque `<style>` en el `<head>`/helmet con selectores de atributo** que capturan por:

1. **Marcadores `data-*` que tú añades a propósito** (la forma limpia, preferida):
   - `data-mobile-stack="true"` → en móvil ese grid pasa a 1 columna.
   - `data-mobile-cols2="true"` → pasa a 2 columnas en vez de 4.
   - `data-mobile-full="true"` → un elemento flex pasa a `flex-basis:100%`.
   - `data-mobile-left="true"` → texto centrado/derecha pasa a alineado a la izquierda.
   - `data-square-photo` / `data-photo-frame` → fotos cuadradas que se recolocan.
2. **Coincidencia sobre el propio valor del `style` inline** (atajo rápido cuando no quieres tocar cada elemento uno a uno): `[style*="font-size: 70px"]` engancha cualquier elemento cuyo `style` contenga ese fragmento literal y le pisa el tamaño con `!important`. Es frágil (depende del string exacto) pero muy rápido para titulares grandes que se repiten.

Plantilla de breakpoints lista para pegar en el `<style>` del `<head>` (ajusta los `[style*=...]` a los tamaños reales que uses):

```css
html{scroll-behavior:smooth}
#nav-toggle{display:none}

@media (max-width:860px){
  /* menú hamburguesa */
  #nav-toggle{display:flex;align-items:center;justify-content:center}
  #nav-links{position:absolute;top:100%;left:0;right:0;flex-direction:column;
    align-items:flex-start!important;gap:18px!important;background:#fff;
    padding:22px 28px 28px;box-shadow:0 10px 26px rgba(0,0,0,.07);display:none!important}
  #nav-links[data-open="true"]{display:flex!important}

  /* grids y layout */
  [data-mobile-stack]{grid-template-columns:1fr!important;gap:32px!important}
  [data-mobile-cols2]{grid-template-columns:repeat(2,1fr)!important}
  [data-mobile-left]{align-items:flex-start!important;text-align:left!important}

  /* titulares grandes: bajar un escalón */
  [style*="font-size: 70px"],[style*="font-size:70px"],
  [style*="font-size: 58px"],[style*="font-size:58px"]{font-size:44px!important}

  /* márgenes laterales de sección más ajustados */
  [style*="padding: 0px 48px"]{padding-left:32px!important;padding-right:32px!important}
}

@media (max-width:600px){
  /* segundo escalón de tipografía en móvil pequeño */
  [style*="font-size: 70px"],[style*="font-size:70px"],
  [style*="font-size: 58px"],[style*="font-size:58px"]{font-size:34px!important}
  [style*="font-size: 44px"]{font-size:30px!important}

  section{padding-top:64px!important;padding-bottom:64px!important}
  [style*="padding: 0px 48px"]{padding-left:20px!important;padding-right:20px!important}

  /* ocultar decoraciones de fondo que solo estorban en pantallas pequeñas */
  header img[alt=""]{display:none}

  [data-mobile-full]{flex-basis:100%!important;margin-top:0!important}
}

@media (prefers-reduced-motion: reduce) {
  /* respeta a quien pide menos animación a nivel de sistema — ver sección 8 */
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
```

**Reglas de oro:**
- Todo el CSS responsive vive en **un solo bloque**, no repartido — así se lee de un vistazo qué cambia en cada breakpoint.
- Dos breakpoints suelen bastar para un one-page: **~860px** (tablet: aparece el menú hamburguesa, los grids de 2 pasan a 1 columna) y **~600px** (móvil: segundo recorte de tipografía y padding).
- Prioriza `data-*` sobre `[style*=...]` en todo lo nuevo: es más legible y no se rompe si cambias un valor de estilo en un sitio y se te olvida en otro.
- Aplicar los breakpoints **no garantiza** que no haya desbordes: cuando termines, pasa la revisión de robustez de la sección 7 (sin scroll horizontal de 320px a pantalla grande).

## 5. Menú responsive (hamburguesa) — patrón completo

```html
<nav style="position:sticky;top:0;z-index:30;background:#fff">
  <div style="max-width:1180px;margin:0 auto;padding:0 40px;height:80px;display:flex;align-items:center;justify-content:space-between">
    <a href="#top">{{logo}}</a>
    <div id="nav-links" data-open="{{menuOpen}}" style="display:flex;gap:20px;white-space:nowrap">
      <a href="#servicios">Servicios</a>
      <a href="#casos">Casos</a>
      <!-- ... -->
    </div>
    <button id="nav-toggle" aria-label="Menú" onclick="/* toggle menuOpen */" style="background:none;border:none;cursor:pointer">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </div>
</nav>
```

- `position:sticky` + fondo sólido: el nav se mantiene visible al hacer scroll, ayuda a la conversión (CTA siempre a mano).
- El botón hamburguesa **solo existe en el DOM siempre**; es el CSS del breakpoint el que decide si se ve (`display:none` en escritorio, `display:flex` bajo 860px) — así no hay que duplicar el nav.
- `aria-label="Menú"` obligatorio: un botón que solo tiene un icono SVG, sin esto, es invisible para lectores de pantalla.

## 6. Grids que se adaptan solos, sin media queries

Para grids de tarjetas (servicios, hitos, equipo), usa `auto-fit`/`minmax` en vez de fijar columnas por breakpoint:

```css
display:grid; grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr)); gap:40px;
```

El navegador decide cuántas columnas caben según el ancho disponible — 3 en desktop, 2 en tablet, 1 en móvil, sin escribir una sola regla `@media` para ese grid en concreto. Resérvate `data-mobile-stack`/`data-mobile-cols2` para los grids donde necesites forzar un número exacto de columnas por diseño.

**Usa `minmax(min(260px,100%),1fr)`, no `minmax(260px,1fr)` a secas:** con el mínimo fijo, en un contenedor más estrecho que 260px (móvil de 320px con márgenes y padding anidados) la columna se niega a encogerse y provoca scroll horizontal. `min(260px,100%)` deja que la columna se adapte al ancho real disponible. Ver sección 7.

## 7. Robustez responsive: cero scroll horizontal accidental

Que la web "se vea bien" en un móvil no basta: tiene que aguantar **cualquier ancho y cualquier dispositivo** sin que la página se pueda arrastrar hacia los lados. **El scroll horizontal de la página en móvil es un bug**, salvo que sea estructuralmente necesario (ver 7.4). Da sensación de web rota, tapa contenido a la derecha, y falla el criterio de accesibilidad WCAG 1.4.10 *Reflow* (el contenido debe reorganizarse sin scroll horizontal hasta 320px de ancho). Se revisa siempre, en cada web y en cada cambio de maquetación — no solo al final.

### 7.1 Causas habituales y su solución

| Causa | Solución |
|---|---|
| Anchos fijos en px (`width:600px`) en contenedores, tarjetas o formularios | `max-width:100%` o `width:min(600px,100%)` |
| `width:100vw` — incluye el ancho de la barra de scroll y desborda | Usa `width:100%` |
| Imágenes, vídeos, `<iframe>` y embeds (newsletter, mapas, reproductores) sin límite | `max-width:100%;height:auto` (imágenes) · contenedor con `aspect-ratio` y `width:100%` (iframes) |
| Cadenas que no se parten: URLs largas, emails, palabras largas en titulares | `overflow-wrap:anywhere` (o `word-break:break-word`) en el texto afectado |
| `white-space:nowrap` en el menú o en botones | Solo si el elemento se oculta antes de desbordar. Comprueba la franja justo por encima del breakpoint (861–1000px), donde el menú de escritorio suele quedarse sin sitio |
| Hijos de grid/flex que se niegan a encogerse (`min-width:auto` por defecto) | `min-width:0` en el hijo · `minmax(0,1fr)` en vez de `1fr` a secas · `flex-wrap:wrap` en filas de botones |
| Grid `auto-fit` con mínimo fijo | `minmax(min(260px,100%),1fr)` (sección 6) |
| Decoraciones absolutas que se salen de la pantalla (`right:-160px`, gradientes, marcas de agua) | `overflow:hidden` en la `<section>` que las contiene (o `overflow:clip`), y `pointer-events:none` |
| Márgenes negativos y `transform:translateX(...)` | Revisa que el elemento siga dentro del contenedor a 320px |
| `padding` o `border` que se suman a `width:100%` | `*{box-sizing:border-box}` global |
| Titulares enormes con tamaño fijo | `font-size:clamp(28px,6vw,58px)` en vez de un px fijo en desktop |
| Tablas, bloques de código, `<pre>` | Contenedor propio con scroll (7.4) |
| Falta `<meta name="viewport" content="width=device-width, initial-scale=1">` | El móvil renderiza la página a ~980px y la escala: todo sale diminuto y con scroll |
| `min-height:100vh` en móvil (la barra del navegador aparece/desaparece) | `min-height:100dvh` (con `100vh` como respaldo anterior) |

### 7.2 Red de seguridad global (no sustituye a arreglar la causa)

```css
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
img,video,svg,iframe{max-width:100%}
img,video{height:auto}
body{margin:0;overflow-x:hidden}          /* respaldo para navegadores antiguos */
@supports (overflow:clip){ body{overflow-x:clip} }
```

- `overflow-x:hidden` en `body` **enmascara** el desborde: el usuario deja de poder arrastrar, pero el contenido que se sale sigue cortado e inaccesible. Úsalo como último recurso y **encuentra igualmente el elemento culpable** (7.3).
- Prefiere `overflow-x:clip` a `hidden`: no convierte `body` en contenedor de scroll, así que no rompe el `position:sticky` del menú. Con `hidden` aplicado a la vez en `html` y `body`, el nav sticky deja de quedarse pegado arriba.

### 7.3 Cómo detectar el elemento que desborda

Emula un móvil de 320–390px en las herramientas de desarrollo, abre la consola y ejecuta:

```js
// ¿hay scroll horizontal en la página?
document.documentElement.scrollWidth > document.documentElement.clientWidth

// ¿qué elementos se salen por la derecha?
[...document.querySelectorAll('body *')]
  .filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
  .map(e => [e.tagName, e.id, e.className, Math.round(e.getBoundingClientRect().right)])
```

Devuelve los elementos que sobrepasan el viewport. Suele bastar con arreglar el más externo de la lista (sus hijos aparecen por arrastre). Si el culpable es una decoración dentro de un contenedor con `overflow:hidden`, saldrá en la lista pero **no** provoca scroll: compruébalo con la primera línea, no solo con la segunda.

### 7.4 Cuándo el scroll horizontal SÍ es correcto (estructural)

Tablas de datos con muchas columnas, bloques de código, diagramas anchos, líneas de tiempo o carruseles con `scroll-snap`. En esos casos, **el scroll vive en su propio contenedor, nunca en la página**:

```html
<div role="region" aria-label="{{Descripción de la tabla}}" tabindex="0"
     style="max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch">
  <table style="min-width:640px">…</table>
</div>
```

- `max-width:100%` en el contenedor y `min-width` solo en el contenido interior.
- `tabindex="0"` + `role="region"` + `aria-label` para que quien navega con teclado o lector de pantalla pueda desplazarlo.
- Deja una pista visual de que hay más contenido (borde cortado, degradado en el lateral, o la siguiente tarjeta asomando) — si no, nadie sabe que puede arrastrar.
- Si la tabla es sencilla, valora antes convertirla en tarjetas apiladas en móvil: casi siempre se lee mejor que hacer scroll lateral.

### 7.5 Matriz de pruebas mínima

Pruébalo **en cada versión de idioma y en cada página**, no solo en la home:

| Qué probar | Anchos / situaciones |
|---|---|
| Móvil pequeño y estándar | **320**, 360, 375, 390, 414 px |
| Tablet y su franja crítica | 768, **861–1000** (justo tras el breakpoint del menú), 1024 |
| Portátil y monitor grande | 1280, 1440, 1920+ (que el contenido no se estire sin máximo) |
| Móvil en horizontal | ~667×375 y ~932×430 |
| Zoom y tamaño de letra | Zoom del navegador al 200 % · tamaño de fuente del sistema al máximo |
| Estados que cambian la altura/anchura | Menú hamburguesa abierto, menú de idioma desplegado, banner de cookies visible, textos largos en otros idiomas (el alemán o el polaco desbordan antes que el español) |
| Dispositivo real | Al menos un iPhone (Safari) y un Android (Chrome): el emulador no reproduce todos los comportamientos (barra de direcciones, `100vh`, teclado en pantalla) |

Criterio de aprobado: en cada ancho, **la primera línea de 7.3 devuelve `false`** y nada queda cortado ni tapado. Repite la comprobación tras cualquier cambio de contenido, de fuentes o de maquetación.

## 8. Accesibilidad rápida (mínimos no negociables)

- `aria-label` en todo botón que sea solo icono (menú, flechas de carrusel, cerrar modal).
- `aria-hidden="true"` en contenido decorativo duplicado (p. ej. la segunda copia de un carrusel/marquee infinito) — evita que el lector de pantalla lo anuncie dos veces.
- Contraste de texto: mínimo 4.5:1 sobre el fondo (3:1 solo para texto de titular grande). Nunca texto atenuado (`opacity`/`color-mix`) sobre fondos de color o foto.
- Objetivos táctiles (botones, links de nav) ≥ 44px de alto real en móvil.
- Respeta `prefers-reduced-motion` si usas animaciones de entrada — desactívalas o redúcelas para quien lo pida a nivel de sistema.

## 9. Imágenes y rendimiento

- `aspect-ratio:1` (o el ratio real) en imágenes dentro de grids — evita que la página "salte" mientras cargan.
- `fetchpriority="high"` + `<link rel="preload" as="image">` en la imagen del hero (la primera que ve el usuario): adelanta su descarga antes de que el navegador procese el resto del HTML.
- Favicon en SVG (`<link rel="icon" type="image/svg+xml">`) si solo necesitas un icono simple de un color; si la marca tiene detalle/color, usa el set PNG completo de la sección 2 — se ve mejor en más contextos (pestaña, iOS, Android, Google).
- En móvil, **oculta las decoraciones de fondo que no aportan** (marcas de agua grandes, formas superpuestas) con una regla simple como `header img[alt=""]{display:none}` — liberan espacio y peso visual donde la pantalla ya es pequeña.
- Si una foto es protagonista en desktop (columna lateral) pero estorba el orden de lectura en móvil, usa `order:-1` en el breakpoint para subirla antes del texto, en vez de duplicar el layout.
- `<link rel="preconnect">` a orígenes externos que sí o sí vas a usar (Google Fonts, CDN de analítica) — pero solo los imprescindibles: cada `preconnect` abre una conexión TCP/TLS que consume recursos, así que no lo uses "por si acaso".

## 10. Cabeceras de seguridad HTTP `[Todos]`

**Qué cabeceras** poner es igual en todas las plataformas; **dónde** se ponen depende de P1: en Apache, en el `.htaccess` (sintaxis de abajo); en Cloudflare, las mismas cabeceras en `_headers` (§15.3, punto 2). En Apache aplican a **todo el sitio** con un solo bloque en el `.htaccess` de la raíz (Apache fusiona los `.htaccess` de cada subcarpeta, así que no hace falta repetirlo en subdirectorios que tengan su propio `.htaccess` para otras reglas). El archivo completo, con estas cabeceras ya integradas, está en la sección 15:

```apache
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "0"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
    Header always set Cross-Origin-Opener-Policy "same-origin"
    Header unset X-Powered-By
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; frame-src 'self' https://{{dominio-iframe-permitido}}; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'"
</IfModule>
```

**Qué hace cada una:**
- `Strict-Transport-Security` (HSTS): obliga al navegador a usar siempre HTTPS con este dominio durante un año, incluidos subdominios — evita ataques de downgrade a HTTP.
- `X-Frame-Options: SAMEORIGIN`: impide que otra web te meta en un `<iframe>` (protege de clickjacking).
- `X-Content-Type-Options: nosniff`: impide que el navegador "adivine" el tipo de un archivo distinto al declarado — evita que un archivo subido por un usuario se interprete como script.
- `X-XSS-Protection: 0`: el antiguo filtro XSS de los navegadores ya no existe en Chrome/Edge y en algunos casos se podía usar para *provocar* fugas de información; la recomendación actual (OWASP) es desactivarlo explícitamente y confiar en la CSP.
- `Referrer-Policy: strict-origin-when-cross-origin`: no filtra la URL completa (con parámetros) como referrer al saltar a otro dominio, solo el origen.
- `Permissions-Policy`: desactiva APIs del navegador que una web informativa no necesita (cámara, micrófono, geolocalización, pagos). Si un script inyectado o un iframe de terceros intenta usarlas, el navegador lo bloquea. Quita de la lista solo lo que la web use de verdad.
- `Cross-Origin-Opener-Policy: same-origin`: aísla la pestaña de las ventanas que abra o que la abran (protege frente a ataques tipo *tabnabbing* y Spectre). Si la web usa un popup de login/pago de terceros que necesita comunicarse con la página (p. ej. OAuth en ventana emergente), cámbialo a `same-origin-allow-popups`.
- `Header unset X-Powered-By` + `ServerSignature Off` (en el `.htaccess` completo): no anuncian versión de PHP/Apache — no es seguridad real, pero no regala información a escáneres automáticos.
- **HSTS con cuidado:** actívalo solo cuando el certificado SSL ya funciona en el dominio y en **todos** sus subdominios (`includeSubDomains`). Si algún subdominio aún va por HTTP, quita `includeSubDomains` o dejará de ser accesible durante un año en los navegadores que hayan visitado la web.
- `Content-Security-Policy` (CSP): la más importante y la que más mantenimiento pide. Define explícitamente de qué orígenes puede cargar la página scripts, estilos, imágenes, fuentes y conexiones — bloquea por defecto cualquier script/recurso inyectado que no esté en la lista (mitiga XSS). **Constrúyela auditando el sitio real**: abre cada página, mira qué dominios de terceros carga de verdad (fuentes, analítica, iframes de terceros como newsletters) y añade solo esos a `script-src`/`connect-src`/`frame-src`. No copies una CSP de otro proyecto sin revisar qué usa el tuyo — una CSP demasiado permisiva no protege nada, y una demasiado estricta rompe la web en producción.
- **Web sin analítica ni scripts en línea** (el caso normal si se sigue la sección "LEER PRIMERO"): quita `'unsafe-inline'` y `https://www.googletagmanager.com` de `script-src` y deja `script-src 'self'`. El JSON-LD no se ve afectado, porque `<script type="application/ld+json">` es un bloque de datos y la CSP no lo trata como script. Ajusta también `connect-src 'self'` y `frame-src 'none'` si no hay iframes. `style-src 'unsafe-inline'` sí se mantiene: los estilos en línea son la base de esta forma de maquetar.
- `object-src 'none'` y `base-uri 'self'`: cierran dos vectores clásicos de inyección (plugins Flash/Java heredados, y redefinición de la base de rutas relativas de la página).

Deja un comentario en el propio `.htaccess` con la fecha de la última auditoría de la CSP y qué dominios se comprobaron — la CSP se queda desactualizada en silencio en cuanto añades un widget/iframe nuevo y nadie actualiza la cabecera.

## 11. Caché de navegador y CDN `[Todos — sintaxis Apache; en Cloudflare, §15.3 punto 2]`

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
    ExpiresByType text/javascript "access plus 1 week"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
<IfModule mod_headers.c>
    <FilesMatch "\.(jpe?g|png|webp|gif|svg|ico|woff2?|mp4)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    <FilesMatch "\.(css|js)$">
        Header set Cache-Control "public, max-age=604800, must-revalidate"
    </FilesMatch>
</IfModule>
```

**Criterio para elegir la duración:**
- **Nunca cachear HTML** (ni por `.htaccess` ni con meta tags) en una web que cambia contenido con cierta frecuencia — cada despliegue debe verse al instante.
- **CSS/JS: caché corta (1 semana) + `must-revalidate`**, salvo que generes nombres de archivo con hash de contenido (`styles.a3f9c1.css`) — sin hash, si cacheas un año y luego cambias el archivo, parte de tus visitantes seguirán viendo la versión vieja hasta que expire.
- **Imágenes, fuentes y vídeo: caché larga (1 año) + `immutable`** — son recursos pesados que casi nunca cambian una vez subidos; si necesitas reemplazar uno, sube un archivo con nombre distinto en vez de sobrescribir el mismo nombre.

## 12. Consentimiento de cookies y carga diferida de analítica

Patrón mínimo para cumplir RGPD/ePrivacy sin depender de una plataforma de terceros (CMP de pago): un banner propio, autocontenido, que **no carga Google Analytics/GTM hasta que el usuario acepta explícitamente**.

```js
// Solo carga el script de analítica tras consentimiento explícito
var GA_ID = '{{G-XXXXXXXXXX}}';
var COOKIE_KEY = 'consent_cookie_name';

function getCookie() {
  var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + COOKIE_KEY + '=([01])'));
  return m ? m[1] : null;
}
function setCookie(v) {
  document.cookie = COOKIE_KEY + '=' + v + ';path=/;max-age=' + (60 * 60 * 24 * 182) +
    ';samesite=Lax' + (location.protocol === 'https:' ? ';secure' : '');
}
function loadGA() {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}

// Respeta la señal Global Privacy Control como rechazo, sin mostrar banner
if (navigator.globalPrivacyControl) { setCookie('0'); }
else if (getCookie() === '1') { loadGA(); }
// si no hay decisión guardada, muestra el banner y solo llama a loadGA() al pulsar "Aceptar"
```

**Puntos clave del patrón:**
- El script del banner (`bf-notice.js` en el ejemplo real) es **autocontenido**: inyecta su propio CSS con `document.createElement('style')` en vez de depender de las hojas de estilo de cada página — así funciona igual en todas las páginas del sitio sin tener que sincronizar clases.
- Cookie de consentimiento con `samesite=Lax` y `secure` (solo si es HTTPS) — evita que se envíe en peticiones cross-site.
- Duración de la decisión: 180 días es un valor razonable (RGPD no fija un máximo, pero forzar a decidir cada sesión es mala UX).
- Detecta el idioma del visitante (`document.documentElement.lang`) para mostrar el banner en el idioma correcto en un sitio multi-idioma — no fuerces siempre español.
- La CSP de la sección 10 debe incluir el dominio del script de analítica (`https://www.googletagmanager.com` en `script-src`, `https://www.google-analytics.com` en `connect-src`) — si no, la CSP bloqueará el propio script de analítica aunque el usuario haya aceptado.

## 13. Multi-idioma: `hreflang`, sitemaps y `robots.txt`

Para un sitio con varias versiones de idioma, cada idioma adicional vive en **su propia carpeta** con su `index.html` (`/en/index.html` → `/en/`, `/pl/index.html` → `/pl/`) y sus páginas interiores con slug traducido a ese idioma (`/en/ai-consulting`, no `/en/consultoria-ia`: la palabra clave debe estar en el idioma en que se busca). El idioma principal queda en la raíz. Ver árbol en la sección 0.4.

> Variante que verás en webs ya publicadas (p. ej. befocusy.com): una carpeta por página con un fichero por idioma dentro (`/quienes-somos/` + `/quienes-somos/en.html`). Funciona, pero la URL de los idiomas lleva `.html` y el slug no se traduce. En una web nueva usa carpetas por idioma con URLs limpias. En una web existente no migres solo por esto: cambiar URLs que ya están indexadas exige una redirección 301 por cada URL, además de actualizar `hreflang` y el sitemap (sección 14).

**En cada versión de idioma**, declara todas las alternativas (incluida ella misma) más `x-default`:

```html
<link rel="alternate" hreflang="es" href="https://www.{{dominio}}/">
<link rel="alternate" hreflang="en" href="https://www.{{dominio}}/en/">
<link rel="alternate" hreflang="x-default" href="https://www.{{dominio}}/">
```

`x-default` le dice a Google qué versión mostrar a un idioma no cubierto explícitamente — normalmente la misma que el idioma principal del sitio.

**Repite las mismas alternativas en el sitemap** con `xhtml:link` (Google las lee de ambos sitios, pero es más robusto declararlo en los dos):

```xml
<url>
  <loc>https://www.{{dominio}}/</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://www.{{dominio}}/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.{{dominio}}/en/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.{{dominio}}/"/>
</url>
```

**Si el sitio crece y tiene varias secciones grandes** (p. ej. un blog aparte con su propio sitemap generado dinámicamente), usa un `sitemapindex` en la raíz en vez de un sitemap único gigante:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://www.{{dominio}}/sitemap-app.xml</loc></sitemap>
  <sitemap><loc>https://www.{{dominio}}/blog/sitemap.xml</loc></sitemap>
</sitemapindex>
```

**`robots.txt`**: permite el rastreo general y bloquea explícitamente solo lo que no debe indexarse (paneles internos, apps de cliente, zonas de staging):

```
User-agent: *
Allow: /
Disallow: /{{zona-privada}}/

Sitemap: https://www.{{dominio}}/sitemap.xml
```

(Versión completa de `robots.txt` y `sitemap.xml` para una web de pocas páginas en la sección 16.)

## 14. Redirecciones 301 y migraciones de URL `[Todos — sintaxis Apache; en Cloudflare, _redirects §15.3 punto 3]`

Cuando renombras o mueves una página, **redirige siempre la URL antigua a la nueva con un 301** (permanente) en vez de dejarla en 404 — conserva el "link juice" acumulado en Google y no rompe enlaces externos ya publicados:

```apache
RewriteEngine On
RewriteRule ^{{url-antigua}}(\.html)?/?$ /{{url-nueva}} [R=301,L]
```

`(\.html)?/?` recoge a la vez la versión con extensión y con barra final, en un solo salto. Estas reglas van en el bloque "Redirecciones 301 específicas" del `.htaccess` completo (sección 15), **antes** de las reglas genéricas de URLs limpias; si no, la URL vieja podría acabar sirviendo un `.html` que ya no existe o encadenando dos redirecciones.

Si mueves una sección entera a una URL pública distinta pero el contenido real sigue sirviéndose desde la carpeta original (p. ej. por un sistema de build/CMS que no puedes renombrar), usa una reescritura **interna** (sin `R=301`, solo `[L]`) para que la URL del navegador no cambie pero el servidor sirva el contenido de la carpeta real:

```apache
RewriteRule ^{{url-publica-nueva}}(/(.*))?$ /{{carpeta-real}}/$2 [L]
```

**Redirección a un dominio externo** (URL "de marca" en tu dominio que apunta a una tienda, agenda o herramienta de terceros — p. ej. la página de venta de un libro en TidyCal, o un formulario de contacto en otro subdominio). Se escribe igual, pero con la URL de destino completa:

```apache
# /{{url-de-marca}} -> {{destino externo}} ({{mes/año}}: {{motivo, p. ej. la venta pasa a vivir fuera de este dominio}})
RewriteRule ^{{url-de-marca}}/?$ https://{{dominio-externo}}/{{ruta}} [R=301,L]
```

Por qué merece la pena en vez de enlazar directamente al tercero:
- Puedes imprimir/compartir una URL corta y estable en tu dominio (`tudominio.com/libro`) y cambiar el destino real el día que cambies de plataforma, sin que se rompan libros impresos, firmas de correo ni enlaces ya publicados.
- La CSP de la sección 10 **no** afecta a estas redirecciones: `frame-src`/`connect-src` solo limitan lo que la página *carga*, no a dónde navega el usuario. No hace falta añadir el dominio externo a la CSP salvo que lo incrustes en un `<iframe>` o cargues scripts suyos.

**Antes de subir una redirección, comprueba tres cosas:**
1. **No hay una página real en esa ruta**: `find <sitio> -iname "*{{url}}*"`. Si existe la carpeta o el `.html`, Apache puede servirla en vez de redirigir (o al revés, dejarla huérfana).
2. **No quedan enlaces internos apuntando a la URL vieja**: `grep -rIl "{{url-antigua}}" <sitio> --include="*.html" --include="*.xml" --include="*.php"`. Si los hay (menú, sitemap, JSON-LD, pie), cámbialos al destino nuevo en vez de depender de la redirección — es más rápido para el usuario y no gasta un salto.
3. **Si la URL antigua estaba en el `sitemap.xml`, quítala**: un sitemap no debe listar URLs que redirigen.

Tras desplegar, verifica con `curl -sI https://tudominio.com/{{url-antigua}}/ | head -n 5`: debe salir `301` y la cabecera `location:` con el destino correcto (la caché del navegador recuerda los 301 mucho tiempo, así que prueba con `curl` o en ventana privada, no solo con el navegador).

Deja siempre un comentario explicando **por qué** existe cada redirección (qué se movió, cuándo, y si depende de que otra carpeta no se renombre) — sin contexto, la próxima persona que toque el `.htaccess` no sabe si puede borrar una regla que parece obsoleta.

## 15. `.htaccess` completo listo para subir (Apache 2.4) `[Solo P1 = A]`

Un único `.htaccess` en la raíz pública que reúne todo lo anterior: HTTPS + dominio canónico, URLs limpias sin `.html` (sección 0.3), `index.html` como home, cabeceras de seguridad (sección 10), caché (sección 11), compresión, tipos MIME del manifest y bloqueo de archivos sensibles. Sustituye `{{dominio}}` y revisa la CSP contra el sitio real antes de subirlo.

```apache
# =====================================================================
# .htaccess — {{dominio}}
# Última revisión: {{AAAA-MM-DD}} · CSP auditada contra: {{dominios de terceros comprobados}}
# =====================================================================

# --- 1. Básicos ------------------------------------------------------
# "Options" es la directiva que más hostings compartidos prohíben en
# .htaccess (Error 500 en TODO el sitio). Súbela activa y, si da 500,
# coméntala: comprueba antes que el servidor ya devuelve 403 al pedir una
# carpeta sin index.html (p. ej. /assets/) — muchos lo traen desactivado.
Options -Indexes -MultiViews
DirectoryIndex index.html
ServerSignature Off
AddDefaultCharset utf-8
ErrorDocument 404 /404.html

# --- 2. Tipos MIME (manifest, fuentes, imágenes modernas) -----------
<IfModule mod_mime.c>
    AddType application/manifest+json .webmanifest
    AddType image/webp .webp
    AddType image/avif .avif
    AddType font/woff2 .woff2
    AddCharset utf-8 .html .css .js .json .xml .txt .webmanifest
</IfModule>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # --- 3. Bloquear archivos y carpetas ocultos o de trabajo --------
    # (.git, .env, .DS_Store...), excepto /.well-known/ (security.txt, SSL)
    RewriteRule (^|/)\.(?!well-known/) - [F,L]
    # (.zip y .pdf NO se bloquean aquí: si hay descargas públicas, van en
    #  su propia carpeta con lista blanca — sección 15.1)
    RewriteRule \.(md|psd|ai|sketch|fig|bak|sql|log|ini|sh|env|lock|yml|yaml)$ - [F,L,NC]
    RewriteRule (^|/)(node_modules|src)(/|$) - [F,L]

    # --- 4. Forzar HTTPS y dominio canónico (un solo salto) ---------
    # Elige UNA de las dos variantes y borra la otra. Debe coincidir con el
    # dominio de canonical, og:url, hreflang, sitemap y robots.txt.
    #
    # Si el hosting pone nginx/CDN delante de Apache, ver sección 15.2
    # antes de activar la condición %{HTTPS} (riesgo de bucle).
    #
    # Variante A — canónico CON www (www.dominio.com):
    RewriteCond %{HTTPS} off [OR]
    RewriteCond %{HTTP_HOST} !^www\. [NC]
    RewriteRule ^ https://www.{{dominio}}%{REQUEST_URI} [R=301,L]
    #
    # Variante B — canónico SIN www (dominio.com), p. ej. befocusy.com:
    # RewriteCond %{HTTPS} off [OR]
    # RewriteCond %{HTTP_HOST} ^www\. [NC]
    # RewriteRule ^ https://{{dominio}}%{REQUEST_URI} [R=301,L]

    # --- 5. Redirecciones 301 específicas (sección 14) --------------
    # /{{url-antigua}} -> /{{url-nueva}} ({{fecha}}: {{motivo}})
    # RewriteRule ^{{url-antigua}}(\.html)?/?$ /{{url-nueva}} [R=301,L]

    # --- 6. /index.html, /index, /en/index.html -> / y /en/ ---------
    RewriteCond %{THE_REQUEST} \s/+(.*/)?index(\.html)?[\s?] [NC]
    RewriteRule ^(.*/)?index(\.html)?$ /$1 [R=301,L,NC]

    # --- 7. /pagina.html -> /pagina (solo si la pide el usuario) ----
    # THE_REQUEST evita el bucle con la reescritura interna del paso 9.
    RewriteCond %{THE_REQUEST} \s/+([^?\s]+?)\.html[\s?] [NC]
    RewriteRule ^ /%1 [R=301,L,NE]

    # --- 8. /pagina/ -> /pagina (quitar barra final si no es carpeta)
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.+)/$ /$1 [R=301,L]

    # --- 9. /pagina -> sirve pagina.html internamente ---------------
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}.html -f
    RewriteRule ^(.+)$ /$1.html [L]
</IfModule>

# --- 10. Cabeceras de seguridad (sección 10) -------------------------
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "0"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
    Header always set Cross-Origin-Opener-Policy "same-origin"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; frame-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; manifest-src 'self'; upgrade-insecure-requests"
    Header unset X-Powered-By

    # --- 11. Caché (sección 11) --------------------------------------
    # HTML: el navegador siempre revalida -> cada despliegue se ve al instante
    <FilesMatch "\.html$">
        Header set Cache-Control "no-cache"
    </FilesMatch>
    <FilesMatch "\.(webmanifest|xml|txt)$">
        Header set Cache-Control "public, max-age=86400"
    </FilesMatch>
    <FilesMatch "\.(css|js)$">
        Header set Cache-Control "public, max-age=604800, must-revalidate"
    </FilesMatch>
    <FilesMatch "\.(jpe?g|png|webp|avif|gif|svg|ico|woff2?|mp4)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
    ExpiresByType text/javascript "access plus 1 week"
    ExpiresByType application/manifest+json "access plus 1 day"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# --- 12. Compresión (texto; las imágenes ya van comprimidas) ---------
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml text/javascript application/javascript application/json application/xml application/manifest+json image/svg+xml
</IfModule>
```

**Notas de uso:**
- **Comprueba siempre las cuatro combinaciones** (http/https × con/sin www): solo una debe dar 200; las otras tres, 301 a esa. Si la versión no canónica responde 200, tienes la web duplicada (el `canonical` lo mitiga, pero lo correcto es el 301).
- **El orden importa**: bloqueo de archivos → HTTPS/dominio → redirecciones concretas → normalización de `index`/`.html`/barra final → reescritura interna. Si mueves bloques, puedes crear bucles o cadenas de varias redirecciones.
- `Options -Indexes`: si falta un `index.html` en una carpeta, Apache devuelve 403 en vez de listar sus archivos.
- `-MultiViews`: desactiva la negociación de contenido de Apache, que interfiere con las reglas de URLs limpias (puede servir `pagina.html` para `/pagina/loquesea`).
- `upgrade-insecure-requests` en la CSP: si algún recurso se quedó enlazado con `http://`, el navegador lo pide por `https://` en vez de bloquearlo como contenido mixto.
- Si el hosting devuelve **Error 500** al subir el archivo, casi siempre es una directiva no permitida por el proveedor (`Options`, `ServerSignature`): comenta esas líneas de una en una hasta dar con ella. Todo lo demás va en `<IfModule>` y no rompe si falta el módulo. **Ten a mano la versión anterior del `.htaccess` antes de subir la nueva**: un 500 tumba la web entera, no solo una página.
- Si el sitio no está en la raíz del dominio sino en una subcarpeta (`dominio.com/web/`), ajusta `RewriteBase /web/`, `ErrorDocument` y los destinos `/…` de las reglas.
- **Las reglas de reescritura NO se heredan en subcarpetas que tengan su propio `RewriteEngine On`** (comprobado en producción en befocusy.com con `/blog/`). Apache usa solo las `RewriteRule` del `.htaccess` más profundo que tenga el motor activo; las del raíz se ignoran para cualquier petición que resuelva dentro de esa carpeta. Consecuencias:
  - HTTPS, dominio canónico, URLs limpias y redirecciones del raíz **no se aplican** en esa carpeta. O las repites en su `.htaccess`, o añades `RewriteOptions Inherit` justo debajo de su `RewriteEngine On` (las reglas del padre se ejecutan *después* de las de la carpeta; pruébalo con `curl`, porque puede crear bucles con reescrituras internas).
  - Una redirección que afecte a URLs de dentro de esa carpeta (p. ej. `/blog/…` → `/jardin-digital/…`) tiene que vivir en **el `.htaccess` de la carpeta**, no en el raíz.
  - Las **cabeceras** (`Header`), `Expires` y los bloqueos (`Require`) sí se fusionan de padre a hijo: las cabeceras de seguridad del raíz cubren todo el sitio sin repetirlas.
  - Por eso, si hay subcarpetas con su propio `RewriteEngine` (un blog en PHP, p. ej.), **bloquea los ficheros internos con `<FilesMatch>` + `Require all denied`** en lugar de con las `RewriteRule … [F]` del paso 3: así el bloqueo llega también a esas carpetas. Ejemplo aplicado en befocusy.com: `<FilesMatch "(^\.|\.(md|bak|old|sql|log|ini|sh|env|yml|yaml|psd)$|~$)"> Require all denied </FilesMatch>` (un brief `.md` subido a `workos/uploads/` se podía descargar públicamente).
- Una URL pública que se sirve desde otra carpeta real (`/jardin-digital/` → carpeta `/blog/`, sin cambiar la URL en el navegador) necesita dos piezas coordinadas: la reescritura interna en el raíz (`[L]`, sin `R`) y, en la carpeta real, un 301 **solo para peticiones directas** del navegador a la ruta vieja (`RewriteCond %{THE_REQUEST} \s/+blog[/?\s]`), para que la reescritura interna no dispare otra vez la redirección y entre en bucle. Ver sección 14.

**Verificación tras subirlo** (con `curl`, porque el navegador cachea los 301):

```bash
curl -sI http://{{dominio}}/                          # 301 -> https://www.{{dominio}}/
curl -sI https://{{dominio}}/                         # 301 -> https://www.{{dominio}}/  (la versión NO canónica nunca da 200)
curl -sI https://www.{{dominio}}/                     # 200
curl -sI https://www.{{dominio}}/index.html           # 301 -> /
curl -sI https://www.{{dominio}}/consultoria-ia.html  # 301 -> /consultoria-ia
curl -sI https://www.{{dominio}}/consultoria-ia/      # 301 -> /consultoria-ia
curl -sI https://www.{{dominio}}/consultoria-ia       # 200 + cabeceras de seguridad
curl -sI https://www.{{dominio}}/en/                  # 200 + cabeceras de seguridad también en otros idiomas
curl -sI https://www.{{dominio}}/no-existe            # 404 (sirviendo 404.html)
curl -sI https://www.{{dominio}}/.htaccess            # 403
curl -sI https://www.{{dominio}}/site.webmanifest | grep -i content-type   # application/manifest+json
```

Y pasa la URL por [securityheaders.com](https://securityheaders.com) (objetivo: A o A+) y por [PageSpeed Insights](https://pagespeed.web.dev) para confirmar compresión y caché.

### 15.1 `.htaccess` de subcarpetas: privadas y de descargas `[Solo P1 = A]`

Patrones usados en producción (befocusy.com). Van en un `.htaccess` **dentro** de la carpeta afectada, no en el raíz. Incluyen el bloque `<IfModule !mod_authz_core.c>` para que funcionen también en los hostings que siguen con Apache 2.2.

**Carpeta privada** (cachés, entradas sin procesar, backups, configuración que un script lee pero nadie debe descargar):

```apache
# Bloquea el acceso directo por navegador a {{qué contiene la carpeta}}.
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
    Deny from all
</IfModule>
```

Los scripts del servidor (PHP, crons) siguen leyendo la carpeta con normalidad; solo se cierra el acceso por HTTP. Compruébalo con `curl -sI https://{{dominio}}/{{carpeta}}/{{fichero}}` → `403`. Si es posible, es aún mejor sacar esa carpeta **fuera** de la raíz pública.

**Carpeta de descargas públicas** (`/descargas/guia.pdf`) con **lista blanca**: todo denegado por defecto y solo se permiten nombres simples con una única extensión prevista.

```apache
# Descargas públicas: solo sirve ficheros .zip/.pdf con nombre simple.
# Para admitir otra extensión, añádela a FilesMatch Y a mod_mime.
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
    Order deny,allow
    Deny from all
</IfModule>

<IfModule mod_mime.c>
    AddType application/zip .zip
    AddType application/pdf .pdf
</IfModule>

# Letras, números, guion y guion bajo + UNA extensión: "algo.php.zip" queda
# fuera (algunos hostings ejecutan ese doble sufijo como PHP).
<FilesMatch "^[A-Za-z0-9][A-Za-z0-9_-]*\.(zip|pdf)$">
    <IfModule mod_authz_core.c>
        Require all granted
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order allow,deny
        Allow from all
    </IfModule>
    <IfModule mod_headers.c>
        Header set Content-Disposition "attachment"
        Header always set X-Content-Type-Options "nosniff"
        Header always set Content-Security-Policy "default-src 'none'; sandbox"
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </IfModule>
</FilesMatch>
```

- **Lista blanca, no lista negra**: el `.htaccess`, los ficheros ocultos, los scripts o las copias `.bak` quedan bloqueados sin tener que enumerarlos.
- `Content-Disposition: attachment` fuerza la descarga (el navegador no abre ni interpreta el fichero) y la CSP `sandbox` lo aísla si algún navegador llegara a mostrarlo.
- Caché corta (1 hora) en lugar del año de las imágenes, para poder sustituir un fichero manteniendo el nombre.
- No lleva `Options -Indexes` a propósito, para no arriesgar un 500 en la carpeta (ver sección 15). Verifica que `/descargas/` devuelve 403 al pedir la carpeta sin fichero.
- Cualquiera que tenga la URL puede descargar el fichero: aquí no se pone nada que no deba ser público.

### 15.2 Detectar el hosting y proxies delante de Apache (nginx o Cloudflare) `[Paso 0 · P1 = D, o A con proxy]`

Todo este manual da por hecho **Apache**, que lee el `.htaccess`. Antes de subir nada, comprueba qué servidor responde:

```bash
curl -sI https://{{dominio}}/ | grep -i '^server'
```

- `Server: Apache` → todo lo anterior aplica tal cual.
- `Server: nginx` → hay dos posibilidades, y el `.htaccess` se comporta de forma muy distinta en cada una:
  1. **nginx puro**: ignora el `.htaccess` por completo. Nada de este manual relativo a `.htaccess` funciona; las reglas equivalentes van en la configuración del `server {}` de nginx (fuera del alcance de este manual) o en el panel del hosting.
  2. **nginx delante de Apache** (Plesk, muchos cPanel/hostings compartidos): nginx hace de proxy y caché, y Apache sigue leyendo el `.htaccess`, **pero solo para las peticiones que nginx le pasa**. Para saber si es tu caso, sube un `.htaccess` con una cabecera de prueba (`Header always set X-Test "ok"`) y mira si aparece en `/` **y** en una página `.html` concreta.
- `Server: cloudflare` (+ cabecera `cf-ray`) → Cloudflare está delante, y otra vez hay dos casos muy distintos:
  1. **Cloudflare como proxy/CDN de un hosting Apache** (DNS con la "nube naranja"): el `.htaccess` **sí** funciona en el servidor de origen. Revisa el punto del proxy de la lista siguiente y, además, que el modo SSL de Cloudflare sea **Full (strict)**: en modo *Flexible*, Cloudflare habla con el origen por HTTP y la regla HTTPS del `.htaccess` entra en bucle.
  2. **Cloudflare Pages / Workers (hosting estático de Cloudflare)**: **no hay Apache ni `.htaccess`** (y un `.htaccess` subido por error queda publicado y descargable). Ve a la sección 15.3.

  Cómo distinguirlos en 10 segundos:

  ```bash
  curl -sI https://{{dominio}}/index.html | grep -iE '^(HTTP|location)'   # Pages: 308 -> / · Workers: 307 -> /
  curl -sI https://{{dominio}}/.htaccess  | head -1                       # Apache: 403 · Pages: 404, o 200 con la home
  curl -sI https://{{dominio}}/ | grep -iE 'access-control-allow-origin|cache-control'
  # Pages añade por defecto "access-control-allow-origin: *" y "cache-control: public, max-age=0, must-revalidate"
  ```

Si hay nginx delante de Apache (o Cloudflare como proxy de Apache), revisa estos tres puntos (vistos en producción en befocusy.com, Plesk, sept. 2026):

- **nginx sirve los `.html` sin pasar por Apache.** Con la opción de Plesk *"Servir archivos estáticos directamente mediante nginx"*, las peticiones a `/pagina.html` o `/index.html` no llegan a Apache: salen **sin CSP, sin HSTS y sin reglas de reescritura**, mientras que `/` (una carpeta) sí sale bien. Solución: en *Configuración de Apache y nginx*, quita `html` y `htm` de la lista de extensiones que sirve nginx (deja imágenes, CSS y JS). Con URLs limpias (sección 0.3) es imprescindible.
- **"Procesamiento inteligente de archivos estáticos" (Plesk, activado por defecto): las cabeceras de seguridad se pierden aunque Apache procese la petición.** Con esta opción, Apache aplica el `.htaccess` (reescrituras, bloqueos, `Header set`) y después **delega en nginx el envío del archivo** (mecanismo `X-Accel-Redirect`). En ese traspaso, nginx solo conserva unas pocas cabeceras de Apache (`Content-Type`, `Content-Disposition`, `Cache-Control`, `Expires`…) y **descarta la CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options` y `Referrer-Policy`**. Visto en befocusy.com (sept. 2026): las redirecciones 301 llevaban todas las cabeceras, pero las páginas con 200 no llevaban ninguna de seguridad, mientras que `bf-notice.js` sí recibía su `Cache-Control` del `.htaccess`. Cómo detectarlo: en las respuestas 200, la ETag tiene el formato de nginx (`"6ab01547-a5d6"`, fecha-tamaño) y solo aparecen las cabeceras de caché del `.htaccess`. Solución: **desactivar también esta opción** en *Configuración de Apache y nginx*. Para no perder velocidad, deja que nginx sirva directamente solo imágenes, fuentes y vídeo con las directivas del punto siguiente. Configuración final en Plesk: **modo proxy activado, "Procesamiento inteligente" desactivado, "Servir archivos estáticos directamente" desactivado** y las directivas adicionales de abajo.
- **Directivas adicionales de nginx (Plesk) con bloques `location`.** Cualquier `location ~* \.(…)$ { … }` sin `proxy_pass`, puesto en *Configuración de Apache y nginx → Directivas adicionales de nginx*, hace que nginx sirva **él mismo** esos archivos: el `.htaccess` deja de aplicarse a ellos, igual que con la opción anterior. En befocusy.com, un bloque con `pdf|html` dejaba todas las páginas sin CSP ni HSTS. Además, la lista por defecto de Plesk incluye `zip` y `pdf`, así que la carpeta de descargas se servía **sin su `.htaccess`** (sin lista blanca, sin `Content-Disposition` ni CSP `sandbox`). Criterio: **nginx sirve directamente solo imágenes, fuentes y vídeo; todo lo demás (HTML, CSS, JS, PDF, ZIP) pasa a Apache.** Plantilla para las directivas adicionales, con la opción *"Servir archivos estáticos directamente mediante nginx"* **desactivada**:

  ```nginx
  # nginx sirve directamente SOLO imágenes, fuentes y vídeo (rápido, caché 1 año).
  # HTML, CSS, JS, PDF, ZIP… pasan a Apache para que se aplique el .htaccess.
  # Requisito: desactivada "Servir archivos estáticos directamente mediante nginx".

  # Carpetas privadas: nginx no debe servir nada de aquí (ni imágenes)
  location ^~ /{{carpeta-privada}}/ { deny all; }

  location ~* \.(?:jpe?g|png|gif|webp|avif|svg|ico|woff2?|mp4)$ {
      add_header Cache-Control "public, max-age=31536000, immutable" always;
      add_header X-Content-Type-Options "nosniff" always;
      access_log off;
  }
  ```

  - Nada de `expires 1y` en CSS/JS sin hash en el nombre (los visitantes se quedarían hasta un año con la versión vieja), ni `etag off` + `if_modified_since off` (impiden revalidar). La caché de CSS/JS la pone el `.htaccess` (1 semana + `must-revalidate`).
  - Usa `add_header Cache-Control` en lugar de `expires`: `expires` genera su propio `Cache-Control` y con los dos salen cabeceras duplicadas.
  - En nginx, un `add_header` dentro de un `location` **anula** los `add_header` heredados del `server`. Por eso las cabeceras de seguridad del HTML se dejan en el `.htaccess` y no se mezclan aquí.
  - Una regla de imágenes solo funciona con rutas **reales** del disco. Si alguna imagen solo existe a través de una reescritura de Apache (URL pública distinta de la carpeta real), no la sirvas desde nginx.
  - Comprueba que se aplica: `curl -sI "https://{{dominio}}/{{imagen}}.png?nc=1" | grep -i cache-control` debe mostrar `max-age=31536000, immutable`; `curl -sI "https://{{dominio}}/pagina.html?nc=1" | grep -i content-security` debe mostrar la CSP del `.htaccess`. Si una directiva "no hace nada", probablemente Plesk ya tiene antes su propio `location` para esa extensión: vuelve a revisar la opción de archivos estáticos.
- **HTTPS ya forzado en nginx → bucle en Apache.** Si `curl -sI http://{{dominio}}/` devuelve un 301 a `https://` con `Server: nginx`, **borra** `RewriteCond %{HTTPS} off [OR]` del paso 4 del `.htaccess`: Apache recibe la petición de nginx por HTTP interno, `%{HTTPS}` siempre vale `off` y la regla entra en bucle (`ERR_TOO_MANY_REDIRECTS`). Deja solo la condición de host (o usa `%{HTTP:X-Forwarded-Proto} !https` si nginx la envía).
- **La caché de nginx oculta los cambios.** Si la respuesta lleva `x-cache-status: HIT` o `STALE`, es una copia guardada y el `.htaccess` nuevo aún no se ha aplicado. Prueba con un parámetro distinto cada vez (`curl -sI "https://{{dominio}}/?nc=123"`, que debe dar `MISS`) o vacía la caché desde el panel.

### 15.3 Cloudflare (Pages o Workers): mismo SEO y seguridad sin `.htaccess` `[Solo P1 = B o C]`

**Conclusión (verificado contra la documentación oficial de Cloudflare en sept. 2026):** en Cloudflare se consigue **el mismo resultado de SEO y seguridad** que con el `.htaccess`, e incluso algo más en seguridad (WAF y anti-DDoS gratuitos). Pero la configuración se reparte entre **ficheros de la carpeta publicada** (`_headers`, `_redirects`, `404.html`) y **ajustes del panel**, y hay cuatro trampas que en Apache no existían: la **soft-404 sin `404.html`**, el **duplicado en `*.pages.dev`**, los **ficheros "ocultos" que se publican** y las **funciones del panel que rompen la CSP**. No hay PHP: el formulario necesita otra solución.

> **¿Pages o Workers?** Cloudflare recomienda ahora **Workers (Static Assets)** para proyectos nuevos; Pages sigue funcionando y es más sencillo de configurar (arrastrar la carpeta). Los dos usan la misma sintaxis de `_headers` y `_redirects`. Las diferencias se marcan abajo. Referencia real en Pages: edusalado.com.

#### Equivalencias del `.htaccess`

| `.htaccess` (sección 15) | Cloudflare Pages | Cloudflare Workers (Static Assets) |
|---|---|---|
| `/pagina.html` → `/pagina` · `/index.html` → `/` | Automático, **308** (Google lo trata como permanente). No configurable | `assets.html_handling` (por defecto `auto-trailing-slash`). Usa **307** (temporal): la URL canónica y los enlaces internos deben ser siempre la versión limpia |
| 404 real con `404.html` | `404.html` **en la raíz, obligatorio**: sin él, **cualquier URL devuelve la home con 200** (Pages lo trata como SPA). Busca también `404.html` en subcarpetas y sube hasta la raíz | `"not_found_handling": "404-page"` (por defecto es `"none"`: 404 sin tu página) |
| HTTPS | Panel → SSL/TLS → Edge Certificates → **Always Use HTTPS** + **Minimum TLS 1.2** | Igual |
| HSTS | Panel (Edge Certificates → HSTS) **o** `_headers`, **solo en uno de los dos** | Igual |
| `www` ↔ sin `www` (un 301) | **No se puede en `_redirects`**. Registro DNS `A www 192.0.2.1` **proxied** + **Bulk Redirect** (o Redirect Rule) 301, conservando ruta y query | Igual |
| Cabeceras de seguridad y CSP | `_headers` | `_headers` |
| `Cache-Control` por tipo de archivo | `_headers` (es la caché del **navegador**; la del edge se invalida sola en cada despliegue) | `_headers` |
| Compresión y tipos MIME | Automáticos (Brotli/gzip; `.webmanifest` sale como `application/manifest+json`) | Automáticos |
| Redirecciones 301 (internas y a dominios externos) | `_redirects` | `_redirects` |
| Bloquear `.md`, `.env`, dotfiles, carpetas privadas | **No existe**: todo lo subido es público, **incluidos los ficheros que empiezan por punto** (un `.htaccess` olvidado se publica). Solo se excluyen `.git`, `node_modules`, `.DS_Store` y los propios `_headers`/`_redirects` | `.assetsignore` (sintaxis de `.gitignore`) |
| `.well-known/security.txt` | Se publica bien | Se publica bien (o panel → Security Center → Security.txt) |
| Quitar `X-Powered-By` | No aplica (solo sale `Server: cloudflare`) | No aplica |
| Formulario con PHP `mail()` | Ver punto 5 | Ver punto 5 |

#### 1. `404.html` en la raíz — imprescindible

Sin él, `/robots.txt`, `/sitemap.xml`, `/favicon.ico` o cualquier URL inventada devuelven la home con estado 200 (visto en producción en edusalado.com): Google no encuentra el sitemap y ve cientos de páginas duplicadas (soft-404).

#### 2. `_headers` (sin extensión, en la raíz de la carpeta publicada)

```
# Seguridad para todo el sitio (manual §10)
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 0
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; manifest-src 'self'; upgrade-insecure-requests
  ! Access-Control-Allow-Origin

# Caché del navegador (manual §11)
/assets/img/*
  Cache-Control: public, max-age=31536000, immutable
/assets/css/*
  Cache-Control: public, max-age=604800, must-revalidate
/assets/js/*
  Cache-Control: public, max-age=604800, must-revalidate

# Evita que la URL de producción en pages.dev se indexe como duplicado
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

- `! Access-Control-Allow-Origin` **elimina** el `Access-Control-Allow-Origin: *` que Pages añade por defecto (Pages también añade ya `nosniff` y `Referrer-Policy`; repetirlos no hace daño).
- **HSTS** no está en el ejemplo porque se activa en el panel. Si prefieres el fichero, añade `Strict-Transport-Security: max-age=31536000; includeSubDomains` y **no** lo actives también en el panel.
- Límites: **100 reglas** y **2.000 caracteres por línea** (vigila la longitud de la CSP). Un solo comodín `*` por ruta. Si varias reglas coinciden, las cabeceras se suman.
- `_headers` **no** se aplica a las respuestas de Pages Functions ni de código Worker: esas respuestas (p. ej., la del formulario) tienen que poner sus propias cabeceras.
- **`immutable` durante un año** solo en archivos que se **renombran** al cambiarlos (`logo-v2.png`). Si vas a sobrescribir con el mismo nombre, usa 1 semana.
- No añadas "Cache Rules" en el panel sobre un dominio de Pages: Cloudflare lo desaconseja (sirve contenido antiguo y puede romper redirecciones).

#### 3. `_redirects` (sin extensión, en la raíz)

```
# /url-antigua -> /url-nueva ({{fecha}}: {{motivo}})
/url-antigua   /url-nueva                              301
# URL de marca hacia un servicio externo
/libro         https://{{dominio-externo}}/{{ruta}}     301
```

- **El código por defecto es 302 (temporal)**: escribe **siempre `301`** al final de cada línea.
- Admite 301, 302, 303, 307, 308 y 200 (reescritura interna, solo hacia rutas del propio sitio). **No** admite devolver un 404 ni condiciones por query string, país o cookie.
- Una regla se aplica **aunque exista** el archivo en esa ruta. Límite: 2.000 reglas estáticas + 100 dinámicas.
- **No sirve para `www` → sin `www`** (redirección de dominio): eso se hace en el panel (tabla de arriba).

#### 4. Duplicado en `*.pages.dev` / `*.workers.dev`

La URL de producción `proyecto.pages.dev` **se puede indexar** y duplica la web (las previews sí llevan `noindex` por defecto). Soluciones: la regla `X-Robots-Tag: noindex` del `_headers` de arriba, o mejor una **Bulk Redirect 301** de `proyecto.pages.dev` al dominio propio. En Workers: `"workers_dev": false` en la configuración.

#### 5. Formulario de contacto sin PHP

| Opción | Coste | CSP | Notas |
|---|---|---|---|
| **Workers + binding `send_email`** (Cloudflare Email Service) | **Gratis** si el destinatario es una dirección **verificada** de la cuenta (justo el caso de un formulario de contacto) | `form-action 'self'` | Recomendada en Workers. Enviar a cualquier dirección requiere plan de pago |
| **Pages Function + API de un proveedor** (Resend, Postmark, MailChannels con cuenta propia) | Plan gratuito del proveedor | `form-action 'self'` | Clave API como variable de entorno y dominio de envío verificado. El envío gratuito de MailChannels para Workers **terminó en agosto de 2024** |
| **Servicio de formularios** (Formspree, Web3Forms…) | Plan gratuito limitado | Añadir su origen a `form-action` | Lo más sencillo. Nombra al proveedor en la política de privacidad |

Anti-spam: el campo trampa del §16.7 y, si hace falta, **Turnstile** (añadir `https://challenges.cloudflare.com` a `script-src` y `frame-src`). Limita además el endpoint con la regla de *rate limiting* gratuita (punto 7).

#### 6. Funciones del panel que rompen la CSP o tocan el SEO — revisar al conectar el dominio

| Función | Efecto | Qué hacer |
|---|---|---|
| **Email Address Obfuscation** (Scrape Shield) | **Activada por defecto.** Reescribe los `mailto:` e inyecta un script que exige `'unsafe-inline'` | **Desactivar** (con `script-src 'self'`, rompe los enlaces de correo) |
| **Rocket Loader** | Reescribe la carga de los scripts; exige `ajax.cloudflare.com` | Desactivar (con un solo `main.js` no aporta nada) |
| **Bot Fight Mode** | Inyecta un script de detección en línea que choca con `script-src 'self'` | No activarlo con una CSP estricta; usar WAF + rate limiting |
| **Web Analytics** (inyección automática) | Añade un script de `static.cloudflareinsights.com` | Si se usa: `script-src … https://static.cloudflareinsights.com` y `connect-src … https://cloudflareinsights.com` |
| **Zaraz** | Modifica la propia CSP | Evitar |
| **Managed robots.txt / AI Crawl Control** | **Antepone** su bloque (Content Signals, bots de IA) a tu `robots.txt` | Revisar el resultado con `curl https://{{dominio}}/robots.txt` y decidir |

#### 7. Seguridad extra que Apache no da (plan gratuito)

Activar: **WAF — Cloudflare Free Managed Ruleset**, **una regla de rate limiting** sobre el endpoint del formulario, **Always Use HTTPS**, **TLS mínimo 1.2** y **HSTS**. La protección DDoS es automática. **No** activar Bot Fight Mode con CSP estricta.

#### 8. Configuración de Workers (si se usa Workers en vez de Pages)

`wrangler.jsonc` en la raíz del proyecto (fuera de la carpeta publicada):

```jsonc
{
  "name": "{{proyecto}}",
  "compatibility_date": "2026-09-01",
  "workers_dev": false,
  "assets": {
    "directory": "./public",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

Y `public/.assetsignore` con lo que no debe publicarse (por ejemplo, `*.md`, `.htaccess` y `*.php`).

#### Verificación tras desplegar

```bash
curl -sI https://{{dominio}}/no-existe-xyz | head -1                          # 404 (no 200)
curl -sI https://{{dominio}}/robots.txt  | grep -i content-type               # text/plain (no text/html)
curl -sI https://{{dominio}}/sitemap.xml | grep -i content-type               # xml (no text/html)
curl -sI https://www.{{dominio}}/ | grep -iE '^(HTTP|location)'                # 301 -> dominio canónico
curl -sI http://{{dominio}}/ | grep -iE '^(HTTP|location)'                     # 301 -> https://
curl -sI https://{{dominio}}/pagina.html | grep -iE '^(HTTP|location)'         # 308 -> /pagina
curl -sI https://{{dominio}}/ | grep -iE 'content-security|strict-transport|access-control'  # CSP y HSTS sí; access-control no
curl -sI https://{{proyecto}}.pages.dev/ | grep -iE '^(HTTP|location|x-robots)' # 301 al dominio, o noindex
curl -sI https://{{dominio}}/.htaccess | head -1                              # 404 (si sale 200 con contenido, se ha publicado)
```

Comprueba también en esa primera prueba lo que la documentación no deja claro: si las cabeceras de `_headers` llegan también a la página 404 y a las redirecciones 308, y si `/pagina/` (con barra) redirige a `/pagina`.

## 16. Ficheros de la raíz: manifest, robots, sitemap, security.txt y 404

Además de las páginas, la raíz pública lleva estos ficheros. Todos usan URLs absolutas y limpias (sección 0.3).

### 16.1 `site.webmanifest`

Ver sección 2.2 (con icono `maskable` y `shortcuts`). Referenciado desde el `<head>` de **todas** las páginas con `<link rel="manifest" href="/site.webmanifest">` — ruta desde la raíz para que funcione también en `/en/`. Si hay varios idiomas, basta con un único manifest en el idioma principal.

### 16.2 `robots.txt`

```
User-agent: *
Allow: /
Disallow: /404.html

Sitemap: https://www.{{dominio}}/sitemap.xml
```

- No bloquees en `robots.txt` las páginas legales ni nada que quieras desindexar: si Google no puede rastrearla, tampoco lee su `noindex`. Para quitar algo de Google se usa `<meta name="robots" content="noindex">`; `robots.txt` solo controla el rastreo.
- No bloquees `/assets/` (CSS, JS, imágenes): Google necesita cargarlos para ver la página como un usuario y evaluar si es responsive.
- **Solo cuenta el `robots.txt` de la raíz del dominio.** Un `robots.txt` dentro de una subcarpeta (`/workos/robots.txt`) no lo lee ningún buscador, y su línea `Sitemap:` tampoco. Si una sección tiene sitemap propio, decláralo en el `robots.txt` raíz (puede haber varias líneas `Sitemap:`) o inclúyelo en el `sitemapindex` (sección 13).

### 16.3 `sitemap.xml`

Solo las páginas **indexables** (sin legales `noindex`, sin `404.html`, sin URLs que redirigen), con la URL limpia exacta que figura en el `canonical` de cada una:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.{{dominio}}/</loc>
    <lastmod>{{AAAA-MM-DD}}</lastmod>
  </url>
  <url>
    <loc>https://www.{{dominio}}/{{slug}}</loc>
    <lastmod>{{AAAA-MM-DD}}</lastmod>
  </url>
  <!-- Multi-idioma: añade los <xhtml:link hreflang> de la sección 13 dentro de cada <url> -->
</urlset>
```

- `<lastmod>` con la fecha real del último cambio de contenido de esa página (no la de hoy en todas: Google deja de fiarse si siempre cambia). `priority` y `changefreq` se pueden omitir; Google los ignora.
- Tras publicar, envía el sitemap en Google Search Console → Sitemaps (y en Bing Webmaster Tools, que también alimenta a varios buscadores y asistentes de IA).

### 16.4 `.well-known/security.txt` (estándar RFC 9116)

Dice a quien encuentre una vulnerabilidad en la web a quién avisar, en vez de que la publique o la ignore:

```
Contact: mailto:{{email-de-contacto}}
Expires: {{AAAA-MM-DD}}T00:00:00.000Z
Preferred-Languages: es, en
Canonical: https://www.{{dominio}}/.well-known/security.txt
```

- `Expires` es obligatorio: pon una fecha a menos de un año y apúntate renovarla (un `security.txt` caducado se considera inválido).
- La carpeta `.well-known/` empieza por punto: comprueba que el cliente FTP la sube (sección 0.4). El `.htaccess` la excluye expresamente del bloqueo de archivos ocultos.

### 16.5 `404.html` `[Todos — obligatorio]`

- Página propia con el mismo `<head>` básico, menú y pie que el resto, un mensaje claro y enlaces a la home y a las 2–3 páginas principales — recupera visitas que de otro modo se van.
- `<meta name="robots" content="noindex">` y **rutas desde la raíz** en todo (`/assets/…`, `/`): se muestra en cualquier URL inexistente, a cualquier profundidad, y con rutas relativas saldría sin estilos ni imágenes.
- **A. Apache:** enlazada en el `.htaccess` con `ErrorDocument 404 /404.html`; Apache sigue devolviendo el código 404 (no un 200), que es lo correcto para Google.
- **B. Cloudflare Pages:** basta con que exista en la raíz; **si falta, cualquier URL devuelve la home con 200** (soft-404). **C. Workers:** además, `"not_found_handling": "404-page"` en `wrangler.jsonc` (§15.3).

### 16.6 Opcionales

- **`llms.txt`** (raíz): resumen en Markdown de qué es la web y enlaces a sus páginas clave, pensado para asistentes de IA. Todavía no es un estándar adoptado por los grandes buscadores; útil pero no prioritario.
- **`humans.txt`**: créditos del equipo que ha hecho la web. Sin efecto en SEO.

### 16.7 Formulario de contacto: `contacto.php` (sin servicios externos) `[Solo P1 = A — en Cloudflare, §15.3 punto 5]`

En un hosting Apache con PHP, el formulario se envía con la función `mail()` del propio servidor: sin Formspree, sin JavaScript y sin abrir la CSP a terceros (`form-action 'self'`).

**HTML del formulario** (los estilos en línea salen del design system; se omiten aquí para que se lea mejor):

```html
<div id="form-error" role="alert" hidden>No se pudo enviar el mensaje. Revise los campos o escriba a <a href="mailto:{{email}}">{{email}}</a>.</div>
<form action="/contacto.php" method="post">
  <label>Nombre completo * <input type="text" name="nombre" required maxlength="120" autocomplete="name"></label>
  <label>Correo * <input type="email" name="email" required maxlength="160" autocomplete="email"></label>
  <label>¿En qué podemos ayudarle? * <textarea name="mensaje" rows="5" required maxlength="5000"></textarea></label>
  <!-- Campo trampa anti-spam: invisible para personas, los bots lo rellenan -->
  <div aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden">
    <label>No rellenar este campo <input type="text" name="web" tabindex="-1" autocomplete="off"></label>
  </div>
  <label><input type="checkbox" name="consentimiento" value="1" required> Acepto ser contactado y he leído la <a href="/politica-privacidad">política de privacidad</a>.</label>
  <button type="submit">Enviar mensaje</button>
</form>
```

**Aviso de error en `/assets/js/main.js`** (la página vuelve con `?error=1`):

```js
(function () {
  if (!/[?&]error=1(&|$)/.test(location.search)) return;
  var box = document.getElementById('form-error');
  if (box) box.hidden = false;
})();
```

**`contacto.php`** (en la raíz):

```php
<?php
// Envío del formulario de contacto de index.html (#contacto).
// - Solo acepta POST; cualquier otra petición vuelve al formulario.
// - Campo trampa "web": si viene relleno es un bot -> se simula éxito sin enviar.
// - Nombre y correo se limpian de saltos de línea (evita inyección de cabeceras).
// - Éxito -> /gracias · Error de validación -> /?error=1#contacto

const DESTINO   = '{{email-destino}}';
const REMITENTE = 'web@{{dominio}}'; // buzón del propio dominio (mejor entregabilidad que usar el correo del visitante como From)

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /#contacto', true, 303);
    exit;
}

function campo(string $clave, int $max): string {
    $v = trim((string)($_POST[$clave] ?? ''));
    return mb_substr($v, 0, $max, 'UTF-8');
}

if (campo('web', 200) !== '') {
    header('Location: /gracias', true, 303);
    exit;
}

$nombre  = preg_replace('/[\r\n]+/', ' ', campo('nombre', 120));
$email   = preg_replace('/[\r\n]+/', '', campo('email', 160));
$mensaje = campo('mensaje', 5000);
$acepta  = ($_POST['consentimiento'] ?? '') === '1';

if ($nombre === '' || $mensaje === '' || !$acepta || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /?error=1#contacto', true, 303);
    exit;
}

$asunto = '=?UTF-8?B?' . base64_encode('Nueva consulta web — ' . $nombre) . '?=';
$cuerpo = "Nombre: {$nombre}\nCorreo: {$email}\n\nMensaje:\n{$mensaje}\n\n--\nEnviado desde el formulario de https://www.{{dominio}}/ el " . date('Y-m-d H:i') . "\n";
$cabeceras = implode("\r\n", [
    'From: Web {{Marca}} <' . REMITENTE . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$ok = mail(DESTINO, $asunto, $cuerpo, $cabeceras, '-f' . REMITENTE);

header('Location: ' . ($ok ? '/gracias' : '/?error=1#contacto'), true, 303);
exit;
```

- **`REMITENTE` tiene que ser un buzón que exista en el dominio** (créalo en el panel del hosting). Si se usa el correo del visitante como `From`, los filtros SPF/DMARC mandan el mensaje a spam o lo rechazan. El correo del visitante va en `Reply-To`, para que "Responder" funcione.
- Quitar los saltos de línea de nombre y correo evita la **inyección de cabeceras** (que un bot use el formulario para enviar spam a terceros).
- Las redirecciones usan el código **303**: al recargar la página de gracias, el navegador no reenvía el formulario.
- **Prueba en producción** con un envío real y revisa también la carpeta de spam. En local, `mail()` puede dar el envío por bueno sin que el correo salga del ordenador, así que no te fíes de una prueba local.
- Si el hosting no tiene PHP (poco habitual en Apache compartido), usa un servicio de formularios y añade su dominio a `form-action` en la CSP.

### 16.8 `gracias.html` y páginas legales

- **`gracias.html`** (`/gracias`): confirmación tras el envío, con el mismo menú y pie, un mensaje con el plazo de respuesta y un botón para volver al inicio. `<meta name="robots" content="noindex, nofollow">` y fuera del sitemap.
- **`politica-privacidad.html`** y **`aviso-legal.html`**: obligatorias en cuanto hay formulario. Van enlazadas desde el pie de todas las páginas y desde la casilla de consentimiento. Llevan `noindex, follow` y no van en el sitemap. Contenido mínimo de la política: quién es el responsable, qué datos se recogen y para qué, base legal (el consentimiento), cuánto tiempo se conservan, a quién se ceden (proveedor de hosting y correo), cookies y cómo ejercer los derechos.
- Si falta algún dato del titular (identificación fiscal, domicilio), déjalo **marcado de forma visible** (`<mark>[COMPLETAR: …]</mark>`) para que no pase desapercibido antes de publicar. Nunca te inventes esos datos.
- Si la web no usa analítica ni cookies propias, dilo en la política y **no pongas banner de cookies**: no hace falta y empeora la experiencia.

## 17. Aplicarlo rápido a una web nueva

0. **Paso 0: responde a P1–P6** (sobre todo, dónde se publica) y sigue la hoja de ruta de esa respuesta. Después, **formato de entrega (sección "LEER PRIMERO")**: HTML estático sin runtime ni plantillas, metadatos en el `<head>` real, un solo CSS de tokens, un solo `main.js`, formulario real, sin huecos de imagen, y la autocomprobación con `grep` en cero.

1. **Estructura primero (sección 0)**: home en `index.html`, páginas interiores con nombre de archivo = slug con palabra clave (minúsculas, guiones, sin tildes), enlaces internos y recursos con rutas desde la raíz y sin `.html`. Prueba en local con `npx serve .`.
2. Copia el bloque `<head>` de la sección 1 y rellena los placeholders (marca, dominio, descripción, fundador). `canonical` y `og:url` con la URL limpia de cada página.
3. Genera el set completo de favicons/iconos y la imagen social 1200×630 (sección 2), y verifica con el checklist 2.4 antes de cerrar el proyecto.
4. Define tus dos breakpoints (860px / 600px) y pega la plantilla CSS de la sección 4 en tu único bloque `<style>`.
5. Marca con `data-mobile-*` los grids/flex que deban reflotar en móvil — no dependas solo de `[style*=...]`.
6. Añade `id` a cada `<section>` de nav antes de escribir el menú.
7. Repasa imágenes: `alt` correcto, `aspect-ratio`, decide qué ocultar/reordenar en móvil, y añade `preload`/`fetchpriority` a la imagen del hero.
8. **Revisa la robustez responsive (sección 7)**: prueba de 320px a pantalla grande, en cada página e idioma, y confirma que no hay scroll horizontal salvo en contenedores estructurales (tablas, código) con su propio `overflow-x:auto`.
9. Pasa la checklist de accesibilidad (sección 8) sobre botones e iconos antes de dar por cerrada la web.
10. Comprueba qué hosting es (`curl -sI` → cabecera `Server`; si sale nginx o cloudflare, secciones 15.2 y 15.3; **en Cloudflare usa `_headers` + `_redirects` + `404.html` y revisa los ajustes del panel de la §15.3, punto 6**). Si es Apache, sube el `.htaccess` completo de la sección 15 (URLs limpias, HTTPS, seguridad, caché, compresión) — audita la CSP contra el contenido real del sitio, no la copies a ciegas — y verifica con los `curl -sI` de esa sección.
11. Crea los ficheros de raíz de la sección 16: `site.webmanifest`, `robots.txt`, `sitemap.xml` (solo URLs limpias indexables), `.well-known/security.txt`, `404.html`, `contacto.php`, `gracias.html` y las páginas legales (16.7 y 16.8).
12. Si usas Google Analytics/GTM o cualquier píxel de terceros, monta el banner de consentimiento (sección 12) y verifica que no carga nada antes de que el usuario acepte (mira la pestaña Network con el banner recién cargado). Comprueba también que el banner no provoca desborde a 320px.
13. Si hay más de un idioma, completa `hreflang` + sitemap multi-idioma + `robots.txt` (sección 13) y repite la prueba de la sección 7 en cada idioma.
14. Si renombras o mueves algo que ya estaba publicado, o quieres una URL de marca que apunte a un servicio externo (tienda, agenda, formulario), añade la redirección 301 (sección 14), revisa que no queden enlaces internos a la URL vieja y verifica con `curl -sI` tras desplegar.
