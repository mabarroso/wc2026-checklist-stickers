# Mark Owned Mockup

## ASCII Layout

```
--- Marcar cromo como obtenido ---

? Ingresa el ID del cromo (ej: MEX-01):
  MEX-01

? ¿Cuántas unidades tienes? (default: 1):
  1

✓ Marcada(s) 1 unidad(es) de [MEX-01] Escudo
```

## Error Case - Invalid ID

```
--- Marcar cromo como obtenido ---

? Ingresa el ID del cromo (ej: MEX-01):
  INVALID-99

❌ Cromo "INVALID-99" no encontrado.
```

## Interactive Mode

```
--- Modo interactivo: Marcar cromos ---

Ingresa el ID de cada cromo. Escribe "salir" para terminar.

? Ingresa el ID del cromo (ej: MEX-01) o "salir" para volver:
  MEX-01

✓ Marcado [MEX-01] Escudo

Presiona Enter para marcar otro cromo...

  [Enter]

? Ingresa el ID del cromo (ej: MEX-01) o "salir" para volver:
  MEX-02

✓ Marcado [MEX-02] Luis Malagón

Presiona Enter para marcar otro cromo...

  [Enter]

? Ingresa el ID del cromo (ej: MEX-01) o "salir" para volver:
  salir

(Returns to main menu)
```

## Input Validation

| Field | Validation |
|-------|------------|
| Sticker ID | Required, non-empty, auto-uppercase |
| Quantity | Number, defaults to 1 if empty |

## Sticker ID Examples

| ID | Description |
|----|-------------|
| `MEX-01` | Mexico team badge |
| `MEX-02` | Mexico player |
| `FWC-05` | FWC special (Official Ball) |
| `CC-03` | Coca-Cola Spain |
| `EXTRA-messi-purple` | Messi Extra purple variant |