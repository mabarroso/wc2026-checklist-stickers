# Search Mockup

## ASCII Layout

```
--- Buscar cromos ---

? Ingresa texto para buscar (nombre, equipo, o ID):
  Messi

Buscando "Messi"...
```

## Results Display

```
✓ Se encontraron 4 cromo(s):

--- Página 1/1 ---

[ ]    [ARG-02] Lionel Messi - Argentina (C)
[ ]    [EXTRA-messi-purple] Lionel Messi - Extra (Special)
[ ]    [EXTRA-messi-bronze] Lionel Messi - Extra (Special)
[ ]    [EXTRA-messi-silver] Lionel Messi - Extra (Special)

? ¿Qué quieres hacer?
  > 🚪 Salir
```

## No Results

```
--- Buscar cromos ---

? Ingresa texto para buscar (nombre, equipo, o ID):
  XYZNotFound

Buscando "XYZNotFound"...

No se encontraron cromos que coincidan.
```

## Search by Team Code

```
--- Buscar cromos ---

? Ingresa texto para buscar (nombre, equipo, o ID):
  MEX

Buscando "MEX"...

✓ Se encontraron 20 cromo(s):

--- Página 1/1 ---

[OK:1] [MEX-01] Escudo - Mexico (A)
[ ]    [MEX-02] Luis Malagón - Mexico (A)
[ ]    [MEX-03] Johan Vásquez - Mexico (A)
[R:2]  [MEX-04] Jorge Sánchez - Mexico (A)
[OK:1] [MEX-05] César Montes - Mexico (A)
...
```

## Search by Sticker ID

```
--- Buscar cromos ---

? Ingresa texto para buscar (nombre, equipo, o ID):
  FWC-05

Buscando "FWC-05"...

✓ Se encontraron 1 cromo(s):

--- Página 1/1 ---

[ ]    [FWC-05] Official Ball - FIFA (Special)
```

## Search Features

| Feature | Description |
|---------|-------------|
| Case insensitive | "messi" matches "Messi" |
| Partial match | "Mess" matches "Messi" |
| ID search | "MEX" finds all MEX stickers |
| Team search | "Argentina" finds all Argentina |
| Pagination | 20 results per page |

## Status Icons in Results

Same as View Collection:
- `[ ]` - Not owned
- `[OK]` - Owned
- `[R:N]` - Repeated