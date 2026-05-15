# Mark Duplicate Mockup

## ASCII Layout

```
--- Marcar cromo como repetido ---

? Ingresa el ID del cromo repetido (ej: MEX-01):
  MEX-03

? ¿Cuántas unidades repetidas tienes? (default: 1):
  2

✓ Marcado(s) 2 unidad(es) repetida(s) de [MEX-03] Johan Vásquez
```

## Error Case - Invalid ID

```
--- Marcar cromo como repetido ---

? Ingresa el ID del cromo repetido (ej: MEX-01):
  INVALID-99

❌ Cromo "INVALID-99" no encontrado.
```

## Successful Mark

After marking a duplicate, the sticker appears with `[R:N]` status:

```
[OK:1] [MEX-01] Escudo - Mexico (A)
[OK:1] [MEX-02] Luis Malagón - Mexico (A)
[R:2]  [MEX-03] Johan Vásquez - Mexico (A)
[ ]    [MEX-04] Jorge Sánchez - Mexico (A)
```

## Input Validation

| Field | Validation |
|-------|------------|
| Sticker ID | Required, non-empty, auto-uppercase |
| Quantity | Number, defaults to 1 if empty |

## Use Cases

- Mark stickers you have duplicates of
- Helps track trade inventory
- Shows in statistics (Top repetidas)
- Useful for export (optional: include duplicates)