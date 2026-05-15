# Export Mockup

## ASCII Layout

```
--- Exportar cromos faltantes ---

? ¿En qué formato quieres exportar?
  > 📄 PDF (para imprimir)
    📊 CSV (hoja de cálculo)
    📝 TXT (lista de texto)
    ← Volver al menú principal

  Move: ↑/↓  Enter: select
```

## Preparing Export

```
Preparando exportación...

Se encontraron 887 cromo(s) faltante(s).

? ¿Dónde quieres guardar el archivo?
  > 📥 Descargas
    💻 Escritorio
    📁 Directorio actual

  Move: ↑/↓  Enter: select
```

## Success - PDF

```
✓ Archivo exportado exitosamente:
  /home/user/Downloads/faltantes_2026-05-15.pdf
```

## Success - CSV

```
✓ Archivo exportado exitosamente:
  /home/user/Downloads/faltantes_2026-05-15.csv
```

## Success - TXT

```
✓ Archivo exportado exitosamente:
  /home/user/Downloads/faltantes_2026-05-15.txt
```

## No Missing Stickers

```
Preparando exportación...

🎉 ¡Felicidades! No tienes cromos faltantes.
```

## PDF Output Preview

```
============================================================
  ALBUM PANINI FIFA WORLD CUP 2026
  Faltantes - Página 1/45
------------------------------------------------------------
[ ] [ARG-02] - Lionel Messi - Argentina         [ ] [ARG-03] - Julián Álvarez - Argentina
[ ] [ARG-04] - Emiliano Martínez - Argentina    [ ] [ARG-05] - Cristian Romero - Argentina
[ ] [ARG-06] - Nahuel Molina - Argentina        [ ] [ARG-07] - Marcos Acuña - Argentina
...
```

## CSV Output Preview

```csv
numero,nombre,equipo
ARG-02,Lionel Messi,Argentina
ARG-03,Julián Álvarez,Argentina
ARG-04,Emiliano Martínez,Argentina
ARG-05,Cristian Romero,Argentina
ARG-06,Nahuel Molina,Argentina
```

## TXT Output Preview

```
============================================================
  ALBUM PANINI FIFA WORLD CUP 2026
  LISTA DE FIGURITAS FALTANTES
============================================================

----------------------------------------
  Argentina
----------------------------------------
  [ ] [ARG-02] Lionel Messi
  [ ] [ARG-03] Julián Álvarez
  [ ] [ARG-04] Emiliano Martínez

----------------------------------------
  Brazil
----------------------------------------
  [ ] [BRA-02] Neymar Jr

============================================================
Total faltantes: 887
============================================================
```

## Auto-naming Convention

| Format | Filename | Example |
|--------|----------|---------|
| PDF | `faltantes_YYYY-MM-DD.pdf` | `faltantes_2026-05-15.pdf` |
| CSV | `faltantes_YYYY-MM-DD.csv` | `faltantes_2026-05-15.csv` |
| TXT | `faltantes_YYYY-MM-DD.txt` | `faltantes_2026-05-15.txt` |

## Export Destinations

| Option | Path |
|--------|------|
| Downloads | `~/Downloads/` |
| Desktop | `~/Desktop/` |
| Current | `$(pwd)/` |