# WATSON Design System

> **WATSON: Inteligencia Clínica Local**
> Asistente médico invisible. Escucha la consulta, transcribe en tiempo real con IA local (Whisper + Qwen 2.5 vía Ollama) y rellena automáticamente la historia clínica directamente en Dinámica Gerencial (HIS de SYAC). Cero nube, cero fuga de datos. Cumple Ley 1581 de 2012 y Resolución 1995 de 1999.

---

## Productos representados

WATSON es un sistema compuesto. Esta carpeta cubre la presentación visual de los tres frentes:

1. **Landing comercial** — página única, scroll narrativo de venta consultiva B2B (ticket: 48–180 millones COP). Audiencia: gerentes administrativos, jefes de IT clínico, directores médicos.
2. **Extensión de Chrome** — widget flotante que se monta sobre Dinámica Gerencial. Es la cara que ve el médico durante la consulta. Idle, escuchando, transcribiendo, validando.
3. **Dashboard de mantenimiento** — interfaz web para el área de IT clínico: estado de los nodos ONYX, mapeo de formularios por especialidad, latencias, auditoría de borrado de audio.

El motor de IA local que da soporte se llama **ONYX** (Whisper + Qwen 2.5 sobre Ollama). WATSON es la marca cara al cliente; ONYX es la mención técnica.

## Fuentes recibidas

- Brief de producto + estructura narrativa de la landing en español Colombia (un solo documento, ver historial del proyecto).
- No se entregó codebase, Figma, ni assets de marca previos. Todo el sistema visual de este folder es una **interpretación primaria** del brief — pendiente de validación con el equipo.

## Caveats

- No hay logo oficial de WATSON. Se incluye un wordmark provisional en `assets/logo.svg`; debe reemplazarse cuando exista marca definitiva.
- Tipografías: el brief pide **Geist o Inter** para display/body y **Geist Mono o JetBrains Mono** para mono. Usamos Geist + Geist Mono cargadas desde Google Fonts. Si la marca compra licencias de Inter Display, sustituir.
- Iconografía: Lucide vía CDN. Si se quiere fijar la versión, descargar el SVG sprite a `assets/icons/`.

---

## Índice de archivos

| Ruta | Qué contiene |
|---|---|
| `README.md` | Este archivo. Lectura obligatoria. |
| `SKILL.md` | Manifest para usar este folder como Agent Skill. |
| `colors_and_type.css` | Tokens base + tokens semánticos (CSS vars). Importar desde cualquier HTML. |
| `assets/logo.svg` | Wordmark WATSON provisional. |
| `assets/onyx-mark.svg` | Marca secundaria del motor ONYX. |
| `fonts/` | Webfonts. Por ahora vacío — se cargan vía Google Fonts en `colors_and_type.css`. |
| `preview/` | Cards individuales del Design System (renderizadas en la pestaña Design System). |
| `ui_kits/landing/` | Recreación hi-fi de la landing comercial. |
| `ui_kits/extension/` | Recreación del widget flotante de Chrome. |
| `ui_kits/dashboard/` | Recreación del dashboard de mantenimiento. |

---

## CONTENT FUNDAMENTALS

**Idioma:** Español Colombia exclusivamente. Cero anglicismos gratuitos. Términos técnicos en inglés solo cuando son nombres propios (Whisper, Ollama, Chrome, JSON).

**Persona y tratamiento:** Tercera persona / "su clínica", "sus médicos". Nunca tutear. Nunca "nosotros le ayudamos a…". El producto se comporta como un asesor senior que reporta a una junta directiva, no como un amigo.

**Tono:** Ejecutivo, directo, profesional clínico. La frase modelo del brief lo resume: *"Sus médicos están perdiendo 2 horas al día llenando formularios."* Es una afirmación, no un grito. No hay urgencia falsa. No hay "¡oferta limitada!". No hay "¡revoluciona tu clínica!".

**Casing:** Sentence case en todos los headings y CTAs. Nunca ALL CAPS para énfasis emocional. ALL CAPS solo en eyebrows técnicos cortos: `LEY 1581`, `ONYX`, `HIS`. Title Case está prohibido en español; los títulos siguen ortografía castellana (solo la primera palabra capitalizada).

**Pronombres y voz:**
- "Sus médicos", "su clínica", "su institución" — la audiencia es el comprador (gerente / IT / director médico), no el médico final.
- WATSON nunca dice "yo". WATSON es referido en tercera persona: "WATSON escucha", "WATSON transcribe".
- Evitar "nosotros" en marketing. Usar "el sistema", "la plataforma", "WATSON".

**Cifras y unidades:**
- Precios siempre en **COP** con punto separador de miles: `$48.000.000 COP`. Nunca USD, nunca abreviaturas tipo "48M".
- Tiempos en formato corto: `1.5 min`, `2 horas/día`, `< 24 h`.
- Porcentajes con espacio: `30 %` (uso colombiano formal).
- Latencias y datos técnicos en mono: `< 800 ms`, `8.800 consultas/mes`.

**Vocabulario obligatorio (palabras que SÍ entiende un gerente colombiano de clínica):**
- Glosas EPS, historia clínica, consultorio, médico tratante, HIS, Dinámica Gerencial, SYAC.
- Ley 1581 de 2012, Resolución 1995 de 1999.
- "Local-first", "cero nube" — usados con moderación, en contextos técnicos.

**Vocabulario prohibido:**
- "Revolucionario", "disruptivo", "increíble", "asombroso", "el futuro de…".
- Emoji de cualquier tipo. Cero. Ni en código, ni en copy, ni en iconografía.
- "Nube" como argumento agresivo contra competencia. Si se menciona IA en nube, se hace técnicamente: latencia, costo por token, datos viajando fuera de la red.

**Ejemplos de copy aprobado:**

> Hero: *Sus médicos están perdiendo 2 horas al día llenando formularios.*
> *Horas que podrían estar atendiendo pacientes. Existe una forma de recuperarlas sin cambiar cómo trabaja su equipo.*

> Cierre de problema: *Historias clínicas de menor calidad, médicos agotados, ingresos que se escapan.*

> Sobre privacidad: *El audio de un paciente nunca debe salir de su clínica.*

> Confirmación de formulario: *Un asesor lo contactará en menos de 24 horas hábiles.*

**Longitud:** Frases cortas. Un dato por oración. Si una sección necesita más de tres líneas seguidas de prosa, falta una stat card o una ilustración.

---

## VISUAL FOUNDATIONS

Referencias declaradas: **Linear, Vercel, Stripe, Arc Browser, Anthropic.com**. La estética colombiana de "salud + nube alegre" (azules cyan, gradientes saturados, cards con borde izquierdo de color) está **explícitamente prohibida**.

### Modo y fondo
- **Modo oscuro por defecto** (`#0A0A0B` casi negro). Toggle a claro disponible (`#FAFAF9` hueso).
- Sin gradientes saturados. Sí se permiten gradientes radiales sutiles de color de acento sobre fondo oscuro al 4–8 % de opacidad para iluminar un hero.
- Sin imágenes stock. Sin ilustraciones cartoon. La única "imagen" permitida es: producto real + SVG técnico (formularios, ondas de audio, JSON, diagramas de flujo).

### Color
- **Fondo dark:** `#0A0A0B` base, `#111113` para superficies elevadas, `#17171A` para cards.
- **Fondo light:** `#FAFAF9` base, `#FFFFFF` para superficies, `#F4F4F2` para cards.
- **Acento primario** `#2563EB` — azul clínico. Solo CTAs y datos clave.
- **Positivo** `#10B981` — verde señal. Validado / OK / cumplimiento.
- **Crítico** `#EF4444` — rojo. Alergia / glosa / dato no presente. Uso muy limitado, máximo un punto rojo por pantalla.
- **Neutros con tinte frío:** escala de 50 → 950 con un leve sesgo azul. No grises cálidos.

### Tipografía
- **Display:** Geist (700–900). Titulares enormes, tracking apretado (-0.02em a -0.04em en pesos altos). Line-height 0.95–1.05.
- **Body:** Geist Sans (400–500). Tamaño base 16px, line-height 1.6.
- **Mono:** Geist Mono (400–500). Para latencias, precios COP, identificadores técnicos, valores de API.
- Jerarquía con peso + tamaño, **nunca** con color saturado. Color solo para énfasis informativo (azul = dato clave, verde = confirmación).

### Espaciado
Escala 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`. Mucho aire. Las secciones de la landing respiran: padding vertical mínimo `128px` desktop, `64px` mobile.

### Borders, radii, shadows
- **Radii:** `4px` (inputs), `8px` (botones, badges), `12px` (cards), `16px` (paneles grandes), `24px` (heroes), `999px` (chips).
- **Borders:** 1px sólido. En dark `rgba(255,255,255,0.08)`; en light `rgba(0,0,0,0.08)`. Un solo peso de borde en todo el sistema.
- **Shadows:**
  - `sm` — `0 1px 2px rgba(0,0,0,0.04)` solo en light mode.
  - `md` — `0 4px 12px rgba(0,0,0,0.08)` para menús flotantes.
  - `lg` — `0 16px 48px rgba(0,0,0,0.16)` para modales.
  - En dark mode las shadows se sustituyen por **borde luminoso interior** `inset 0 1px 0 rgba(255,255,255,0.06)` — la profundidad en dark se construye con luz, no con sombra.

### Cards
- Dark: fondo `#17171A`, borde `1px solid rgba(255,255,255,0.08)`, radius `12px`, sin sombra, con highlight interno superior (1px de luz).
- Light: fondo `#FFFFFF`, borde `1px solid rgba(10,10,11,0.08)`, radius `12px`, shadow `sm` opcional.

### Estados
- **Hover (botón primario):** brillo +6 % (`color-mix(in oklch, var(--blue), white 6%)`). Sin scale.
- **Hover (link/tarjeta):** borde de `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.16)` + leve translate-y (`-1px`).
- **Press:** scale 0.98, duración 80ms.
- **Focus:** ring de 2px en `--blue` con offset 2px del fondo. Siempre visible para teclado.
- **Disabled:** opacity 0.4, cursor not-allowed.

### Animación
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-quint) para entradas; `cubic-bezier(0.4, 0, 0.2, 1)` para microinteracciones.
- **Duraciones:** 120ms (hover), 220ms (transiciones de estado), 600–900ms (entradas en viewport), 1200ms+ para sticky-scroll narratives.
- Sin bounces, sin springs exagerados, sin rebotes elásticos.
- Animaciones siempre triggered por scroll o hover. **Nunca** por timer pasivo (excepto el cursor del hero).
- Scroll-driven nativo (`animation-timeline: scroll(), view()`) con fallback Intersection Observer + GSAP ScrollTrigger.
- Ondas de audio, líneas de JSON, formularios llenándose: solo SVG con `stroke-dasharray`, `opacity` y `transform`.

### Layout
- Grid de 12 columnas, max-width `1280px`, gutter `24px` desktop / `16px` mobile.
- Sticky sections en "La solución" y "Cómo funciona" — texto izquierda fijo, visual derecha avanza.
- Header sticky translúcido con backdrop-blur 12px, fondo `rgba(10,10,11,0.6)` en dark.

### Transparencia y blur
- Backdrop-blur reservado para: header sticky, popovers, modales. Nunca decorativo en backgrounds.
- Nada de glassmorphism saturado. Si hay blur, el fondo detrás es contenido real, no un "fondo bonito".

### Vibe de la imagen
- Cuando haya screenshots de producto: marco oscuro, sin sombras dramáticas, sin reflejos. Estilo Linear/Vercel: producto sobre superficie, listo.
- Sin grain, sin warm tones. La paleta es fría, contenida, casi clínica.

---

## ICONOGRAPHY

**Sistema:** Lucide. Stroke 1.5px, line-cap `round`, line-join `round`. Tamaño base `20px`, escala fija `16 / 20 / 24 / 32`.

**Por qué Lucide:** stroke fino, geométrico, cero personalidad cartoon. Coincide con la estética Linear / Vercel / Anthropic. Phosphor (variante regular) sería sustituto aceptable; Heroicons outline también.

**Cómo se usan:**
- Vía CDN en HTML: `<script src="https://unpkg.com/lucide@latest"></script>` + `<i data-lucide="stethoscope"></i>` + `lucide.createIcons()`.
- En React: importar de `lucide-react`.
- Si se quiere fijar versión: descargar el sprite SVG a `assets/icons/lucide-sprite.svg` y referenciar con `<svg><use href="…#stethoscope"/></svg>`.

**Color:** `currentColor` siempre. Nunca pintar el icono con un color diferente al texto de su contexto, salvo en estados semánticos (verde para validado, rojo para alerta).

**Tamaño físico:** acompaña la altura de la x-height del texto adyacente. En un botón de 40px de alto, icono 20px. En un eyebrow de 12px, icono 14–16px.

**Iconos clave del producto:**
- `mic` / `mic-off` — estado de escucha del widget.
- `waveform` / `audio-lines` — transcripción en curso.
- `shield-check` — privacidad / Ley 1581.
- `lock` — datos locales.
- `stethoscope` — médico.
- `clipboard-list` — historia clínica.
- `building-2` — clínica / institución.
- `cpu` — motor ONYX local.
- `cloud-off` — cero nube (uso técnico, no agresivo).
- `check-circle-2` — validado.
- `alert-triangle` — glosa / inconsistencia.
- `arrow-right` — CTAs.

**Prohibido:** emoji (zero, ni en error states), unicode dingbats (✓ ✗ ★ etc), iconos de marca de redes sociales (no las usamos en el footer), iconos rellenos / duotone, iconos con esquinas redondeadas tipo iOS, PNG bitmap.

**Logos:** `assets/logo.svg` (wordmark WATSON) y `assets/onyx-mark.svg` (marca técnica del motor). Ambos con uso de `currentColor` para que adopten el color del contexto.
