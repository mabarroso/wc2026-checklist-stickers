## Context

### Current State
- GUI usa tokens de STYLE-GUIDE.md (dark gaming theme)
- Colores: cyan #79D8DB, yellow #FFD400, background #0B0B0D
- Fonts: Bebas Neue, Inter, Montserrat
- Sin formas geométricas en background
- Badge con variantes: cyan, yellow, red, green, orange

### Target State
- GUI sigue ui_theme.md (Album Style)
- Colores: blue #3b82f6, yellow #facc15, background #0f172a, card #1e293b
- Font: Poppins
- Background con formas geométricas (green circle, orange shape)
- Componentes sólidos, sin gradientes

## Goals / Non-Goals

**Goals:**
- Aplicar todos los tokens CSS de ui_theme.md
- Añadir background con formas geométricas
- Cambiar fuente a Poppins
- Actualizar Badge para status system (completed/in-progress/pending)
- Mantener backward compatibility con --color-* tokens

**Non-Goals:**
- Cambiar lógica de negocio
- Modificar funcionalidad de screens
- Añadir nuevas características
- Cambiar layout o estructura de páginas

## Decisions

### 1. Mantener compatibilidad de tokens

Mapear tokens antiguos a nuevos para no romper código existente:

```css
/* Nuevos tokens principales de ui_theme */
--bg-main: #0f172a;
--bg-card: #1e293b;
--green: #22c55e;
--yellow: #facc15;
--orange: #f97316;
--red: #ef4444;
--blue: #3b82f6;
--text-main: #ffffff;
--text-muted: #94a3b8;
--radius: 20px;

/* Backward compatibility */
--color-bg: var(--bg-main);
--color-surface: var(--bg-card);
--color-cyan: var(--blue);       /* Mapear cyan → blue */
--color-yellow: var(--yellow);
--color-orange: var(--orange);
--color-red: var(--red);
--color-green: var(--green);
--color-blue: var(--blue);
--color-white: var(--text-main);
```

### 2. Formas geométricas como ::before y ::after

Usar pseudo-elementos fixed en body para formas circulares:

```css
body::before {
  content: "";
  position: fixed;
  width: 500px;
  height: 500px;
  background: var(--green);
  border-radius: 50%;
  top: -200px;
  left: -200px;
  opacity: 0.15;
}

body::after {
  content: "";
  position: fixed;
  width: 400px;
  height: 400px;
  background: var(--orange);
  border-radius: 40%;
  bottom: -150px;
  right: -150px;
  opacity: 0.15;
}
```

### 3. Badge status system

Cambiar variantes de Badge para status system:

| Variante Actual | Nueva Variante | Color |
|----------------|----------------|-------|
| `cyan` | `completed` | green #22c55e |
| `yellow` | - | yellow #facc15 |
| `red` | - | red #ef4444 |
| `green` | - | green #22c55e |
| `orange` | `in-progress` | orange #f97316 |
| `default` | `pending` | gray #334155 |

Mantener variantes existentes para compatibilidad temporal.

### 4. Font Poppins

```css
--font-body: 'Poppins', sans-serif;
--font-heading: 'Poppins', sans-serif;  /* Cambiar de Bebas Neue */
--font-number: 'Poppins', sans-serif;   /* Cambiar de Montserrat */
```

### 5. Componentes CSS

Reescribir componentes base:

```css
.app {
  position: relative;
  z-index: 1;
  padding: 24px;
}

.header {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--text-main);
}

.button {
  background: var(--blue);
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.match-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 16px;
  position: relative;
  overflow: hidden;
}

.status {
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status.completed { background: var(--green); color: black; }
.status.in-progress { background: var(--orange); color: black; }
.status.pending { background: #334155; color: white; }
```

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Breaking cambios en componentes | Mapear colores antiguos a nuevos tokens |
| Breaking cambios en font | Poppins es similar a Inter en legibilidad |
| Consistencia con CLI | CLI usa español, GUI usa tokens - no hay conflicto |
| Formas geométricas chocando con contenido | Usar z-index: 1 en .app y opacity: 0.15 |

## Files to Modify

### CSS
- `src/gui/src/index.css` - Reescribir completamente

### HTML
- `src/gui/index.html` - Añadir Google Fonts link

### Components
- `src/gui/src/components/Button.tsx`
- `src/gui/src/components/Badge.tsx`
- `src/gui/src/components/Card.tsx`
- `src/gui/src/components/Header.tsx`
- `src/gui/src/components/Sidebar.tsx`

### Layout
- `src/gui/src/AppLayout.tsx`