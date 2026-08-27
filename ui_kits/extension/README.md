# Extension UI Kit — WATSON Chrome Widget

Recreación del widget flotante de Chrome que el médico ve sobre Dinámica Gerencial durante la consulta.

## Estructura
- `index.html` — el widget en sus tres estados (idle, escuchando, validando) sobre un fondo simulando el HIS.
- `widget.jsx` — componentes del widget.

## Estados cubiertos
- `idle` — esperando, mic apagado, indicador discreto.
- `listening` — escuchando, ondas de audio activas, transcripción streaming.
- `review` — transcripción terminada, resumen estructurado, CTA de inyectar.

## Notas
- El "fondo HIS" es una simulación visual genérica de Dinámica Gerencial (no asset real). Sustituir cuando se tenga acceso al producto.
- El widget respeta el dark mode del design system; el fondo del HIS imita la apariencia clínica clara típica del HIS instalado.
