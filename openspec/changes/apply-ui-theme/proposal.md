## Why

El GUI actual no sigue el ui_theme.md definido en docs/. Necesitamos aplicar los tokens de diseño, fonts (Poppins), background con formas geométricas, y componentes del tema "Album Style" para mantener consistencia con la documentación del proyecto.

## What Changes

- Reemplazar completamente index.css con nuevos tokens CSS de ui_theme.md
- Actualizar todos los componentes (Button, Badge, Card, Panel, Input)
- Aplicar fondo con formas geométricas (green circle, orange shape)
- Cambiar fuente a Poppins
- Actualizar todos los screens para usar nuevas variantes de componentes

## Capabilities

### New Capabilities
- `ui-theme`: Aplicar ui_theme.md al GUI completo

### Modified Capabilities
- Ninguno (es un cambio de styling, no afecta requisitos de negocio)

## Impact

- `src/gui/src/index.css` - Reescribir completamente con nuevos tokens
- `src/gui/src/AppLayout.tsx` - Añadir container padding
- `src/gui/src/components/Button.tsx` - Adaptar a .button de ui_theme
- `src/gui/src/components/Badge.tsx` - Status system (completed/in-progress/pending)
- `src/gui/src/components/Card.tsx` - Adaptar a .match-card
- `src/gui/src/components/Input.tsx` - Mantener compatibilidad
- `src/gui/src/components/Panel.tsx` - Mantener compatibilidad
- `src/gui/src/components/Header.tsx` - .header style
- `src/gui/src/components/Sidebar.tsx` - Nuevos colores
- `src/gui/index.html` - Cargar Poppins de Google Fonts
- `src/gui/src/screens/*.tsx` - Actualizar variantes de Badge