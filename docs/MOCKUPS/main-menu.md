# Main Menu Mockup

## ASCII Layout

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║         PANINI WORLD CUP 2026 CHECKLIST                        ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

=== ALBUM PANINI FIFA WORLD CUP 2026 ===

? What do you want to do:
  > 📋 Ver colección
    ✅ Marcar cromo como obtenido
    🔄 Marcar cromo como repetido
    📊 Estadísticas
    🔍 Buscar cromo
    📤 Exportar faltantes
    🔄 Resetear colección
    👋 Salir

  Move: ↑/↓  Enter: select
```

## Screen Description

| Element | Description |
|---------|-------------|
| Header | Bold cyan title centered |
| Menu title | "=== ALBUM PANINI FIFA WORLD CUP 2026 ===" |
| Choices | 8 options with icons and Spanish labels |
| Selection | Arrow (>) indicates current selection |
| Navigation | Up/Down arrows + Enter to select |

## User Flow

1. User sees main menu on app startup
2. User navigates with arrow keys
3. User presses Enter to select option
4. App executes action or shows submenu
5. On "Salir" confirmation, app displays farewell message

## Exit Confirmation

```
? ¿Estás seguro de que quieres salir?
  > No
    Yes

  Move: ↑/↓  Enter: select
```

After confirmation: `¡Gracias por usar Panini WC 2026 Checklist! ¡Buena suerte completando tu álbum! 🎉`