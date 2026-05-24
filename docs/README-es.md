# Panini FIFA World Cup 2026 - Lista de Cromos

Aplicación CLI para gestionar tu álbum de cromos Panini del Mundial 2026. Registra los cromos que tienes, los que te faltan y los repetidos, y exporta listas de deseos en PDF, CSV y TXT.

## Funcionalidades

- Registrar cromos propios y repetidos con contador de cantidad
- Ver progreso de la colección con porcentaje completado
- Filtrar cromos por estado: todos, obtenidos, faltantes, repetidos
- Buscar cromos por número, nombre, equipo o grupo
- Exportar cromos faltantes a PDF (lista imprimible), CSV o TXT
- Multiplataforma: Linux, Unix, macOS, Android, iOS

## Inicio Rápido

```bash
bun install
bun run build
./dist/panini-stickers
```

## Compilar GUI (Tauri)

Requiere Rust instalado:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

**Desktop:**
```bash
cd src/gui
bun run tauri build
```

**Android:**
```bash
cd src/gui
bun run tauri android build
```

**iOS (requiere macOS/Xcode):**
```bash
cd src/gui
npx tauri ios init
bun run tauri ios build
```

**Web (sin instalación):**
```bash
cd src/gui
bun run dev       # http://localhost:5173
bun run build     # Compilación estática en src/gui/dist/
```

## Menús de la CLI

### Menú Principal

```
1. Ver colección
2. Marcar cromo como obtenido
3. Marcar cromo como repetido
4. Estadísticas
5. Buscar cromo
6. Exportar faltantes
7. Resetear colección
8. Salir
```

### Ver Colección

Filtra y navega los cromos por estado:
- Todos los cromos
- Cromos faltantes
- Cromos obtenidos
- Cromos repetidos

20 cromos por página con paginación.

### Marcar como Obtenido / Repetido

Ingresa el ID del cromo (ej: `MEX-01`, `FWC-05`, `CC-03`) y la cantidad.

### Estadísticas

- Totales: total / obtenidos / faltantes / repetidos
- Porcentaje completado con barra de progreso
- Desglose por grupo (A-L)
- Desglose por tipo (jugador, escudo, especial FIFA, extra, coca-cola)
- Top cromos repetidos

### Buscar

Busca cromos por:
- ID del cromo
- Nombre del jugador/equipo
- Código del equipo

### Exportar

Exporta cromos faltantes a:
- **PDF**: Lista imprimible con casillas (2 columnas)
- **CSV**: Formato hoja de cálculo (número, nombre, equipo)
- **TXT**: Lista legible agrupada por equipo

Nombrado automático con fecha: `faltantes_YYYY-MM-DD.*`

## Datos de los Cromos

| Tipo | Cantidad | Patrón de ID |
|------|----------|--------------|
| Logo Panini | 1 | `LOGO-00` |
| Pre-equipos FWC | 8 | `FWC-01` a `FWC-08` |
| 48 equipos × 20 | 960 | `{EQUIPO}-{NN}` |
| Historia FWC | 11 | `FWC-09` a `FWC-19` |
| Cromos Extra | 80 | `EXTRA-{nombre}-{variante}` |
| Coca-Cola España | 12 | `CC-01` a `CC-12` |
| **Total** | **911** | |

## Tecnologías

- **Bun** — runtime y herramienta de compilación
- **TypeScript** — código con tipos seguros
- **esbuild** — compilación a binario standalone
- **Tauri** — GUI desktop + mobile (backend Rust)
- **PDFKit** — generación de PDF
- **Inquirer** — menús interactivos de CLI
- **Chalk** — colores en terminal
- **Conf** — persistencia JSON (`~/.config/panini-stickers/`)
- **Vitest** — tests unitarios

## Arquitectura

Arquitectura Limpia + DDD:

```
src/
├── domain/           # Entidades, objetos de valor, interfaces de repositorio
├── application/      # Comandos y consultas (CQRS)
├── infrastructure/   # Menús CLI, exportadores, almacenamiento
└── data/            # Datos de cromos (CSV)
tests/
└── domain/          # Tests unitarios
```

## Comandos

```bash
bun run dev           # Modo desarrollo
bun run build         # Generar binario standalone
bun test              # Ejecutar tests
bun run typecheck     # Verificación TypeScript
bun run gui:web       # GUI web en desarrollo (Vite)
bun run gui:desktop   # GUI desktop en desarrollo (Tauri)
bun run tauri         # Ejecutar Tauri CLI
bun run tauri:android # Compilar APK Android
bun run tauri:ios     # Compilar IPA iOS (solo macOS)
```

## Almacenamiento de Datos

El estado de la colección se guarda en:
```
~/.config/panini-stickers/collection.json
```

Estructura:
```json
{
  "owned": { "MEX-01": 1, "MEX-02": 2 },
  "duplicates": { "MEX-03": 1 }
}
```

## Estructura del Proyecto

```
.
├── src/
│   ├── domain/           # Entidades y objetos de valor
│   ├── application/      # Casos de uso (CQRS)
│   ├── infrastructure/   # CLI, exportadores, almacenamiento
│   └── data/            # Datos de cromos (CSV)
├── tests/               # Tests unitarios (Vitest)
├── dist/                # Binario compilado
├── docs/                # Documentación
└── openspec/            # Cambios OpenSpec
```

## Contribución

Todo el texto de la CLI está en español. Código, commits y documentación técnica están en inglés. Ver `docs/STYLE-GUIDE.md` para las convenciones de código.