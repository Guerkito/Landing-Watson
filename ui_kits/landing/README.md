# Landing UI Kit — WATSON

Recreación hi-fi de la landing comercial pública. Página única, scroll narrativo, modo oscuro por defecto.

## Estructura
- `index.html` — entrada. Monta toda la landing.
- `components.jsx` — componentes reutilizables (`Header`, `Hero`, `StatCard`, `Section`, `Pricing`, `Footer`, etc).
- `landing.jsx` — composición de la página completa.
- `landing.css` — estilos específicos del kit (todo lo que no son tokens base).

## Beats narrativos cubiertos
01 Hero · 02 Problema · 03 Costo real · 04 A quién afecta · 05 La solución · 06 Por qué funciona · 07 Antes y después · 08 Beneficio por rol · 09 ONYX vs Nube · 10 Planes · 11 Decisión · 12 CTA final · 13 Footer.

## Notas
- Se cubren todos los beats con un sample interactivo. Las animaciones scroll-driven están simuladas con Intersection Observer (suficiente para el preview); en producción usar `animation-timeline: scroll(), view()` nativo donde se pueda.
- Los iconos son SVG inline estilo Lucide (stroke 1.5px). En producción usar `lucide-react` o el sprite descargado.
- Sin emoji, sin gradientes saturados, sin imágenes stock.
