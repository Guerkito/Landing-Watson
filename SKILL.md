---
name: watson-design
description: Use this skill to generate well-branded interfaces and assets for WATSON (Inteligencia Clínica Local), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Hard rules — non-negotiable

- **Idioma:** español Colombia. Tono ejecutivo, directo. No tutear, no superlativos vacíos.
- **Cero emoji** — en código, copy, e iconografía. Sin excepciones.
- **Iconos:** Lucide stroke 1.5px exclusivamente. Nunca PNG, nunca emoji-fonts, nunca dingbats.
- **Modo oscuro por defecto** (`#0A0A0B`). Toggle a claro (`#FAFAF9`).
- **Sin gradientes saturados.** Sin imágenes stock cartoon. Sin glassmorphism.
- **Precios en COP** con punto separador (`$48.000.000 COP`). Nunca USD.
- **Citar normativa** cuando aplique: Ley 1581 de 2012 y Resolución 1995 de 1999.
- **Carga `colors_and_type.css`** en cualquier HTML que escribas — todos los tokens viven ahí.

## Lo que cubren los archivos

- `README.md` — fundamentos completos: contenido, visual, iconografía.
- `colors_and_type.css` — tokens base + semánticos + tipografías Geist/Geist Mono.
- `assets/logo.svg`, `assets/onyx-mark.svg` — wordmarks (provisorios).
- `preview/*.html` — cards individuales del Design System.
- `ui_kits/landing/` — landing comercial completa.
- `ui_kits/extension/` — widget flotante de Chrome.
- `ui_kits/dashboard/` — dashboard de IT clínico.
