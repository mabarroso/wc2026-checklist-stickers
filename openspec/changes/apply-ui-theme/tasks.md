## 1. Actualización de Tokens CSS

- [ ] 1.1 Reescribir index.css con nuevos tokens de ui_theme.md
- [ ] 1.2 Añadir --font-body: Poppins en @theme
- [ ] 1.3 Añadir background con formas geométricas (::before, ::after)
- [ ] 1.4 Mantener backward compatibility con --color-* tokens
- [ ] 1.5 Definir --radius: 20px

## 2. Actualización de HTML

- [ ] 2.1 Actualizar index.html para cargar Poppins de Google Fonts

## 3. Actualización de Componentes

- [ ] 3.1 Actualizar Button.tsx para usar .button de ui_theme
- [ ] 3.2 Actualizar Badge.tsx con variantes: completed, in-progress, pending
- [ ] 3.3 Verificar Card.tsx usa .match-card con border-radius 20px
- [ ] 3.4 Verificar Panel.tsx usa .panel
- [ ] 3.5 Verificar Input.tsx usa .input-gui

## 4. Actualización de Layout

- [ ] 4.1 Actualizar AppLayout.tsx con clase .app y padding 24px
- [ ] 4.2 Actualizar Header.tsx para usar .header style (28px, font-weight 800)
- [ ] 4.3 Actualizar Sidebar.tsx con nuevos colores de ui_theme

## 5. Actualización de Screens

- [ ] 5.1 Actualizar ViewCollection.tsx con nuevas variantes de Badge
- [ ] 5.2 Actualizar MarkDuplicate.tsx con nuevas variantes de Badge
- [ ] 5.3 Actualizar MarkOwned.tsx con nuevas variantes de Badge
- [ ] 5.4 Actualizar Statistics.tsx con nuevas variantes de Badge
- [ ] 5.5 Actualizar Search.tsx con nuevas variantes de Badge
- [ ] 5.6 Actualizar Export.tsx con nuevas variantes de Badge

## 6. Verificación

- [ ] 6.1 Ejecutar bun run build en GUI
- [ ] 6.2 Verificar visuales en navegador
- [ ] 6.3 Verificar que todos los componentes funcionan correctamente
- [ ] 6.4 Ejecutar bun run lint en GUI
- [ ] 6.5 Verificar formas geométricas en background
- [ ] 6.6 Verificar fuente Poppins cargada