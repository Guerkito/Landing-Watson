# Dashboard UI Kit — WATSON

Dashboard interno de mantenimiento. Audiencia: jefes de IT clínico.

## Vistas
- `index.html` — vista principal: estado de nodos ONYX, latencias, salud del clúster.
- `dashboard.jsx` — composición y componentes (sidebar, header, status card, table, log).

## Notas
Esta vista es para diagnóstico operativo, no para uso clínico. Todo el contenido es ilustrativo. Cuando exista API real, conectar tabla de nodos y log de auditoría a `/api/v1/cluster/*`.
