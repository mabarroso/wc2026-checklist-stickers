## 1. Preparación

- [x] 1.1 Revisar el archivo actual `src/gui/src/screens/ViewCollection.tsx` para entender la estructura actual
- [x] 1.2 Revisar el store de Zustand en `src/gui/src/stores/collectionStore.ts` para entender el estado actual

## 2. Implementar botones de acción dentro del cromo

- [x] 2.1 Eliminar el panel lateral derecho (motion.div con className="w-80" en líneas 170-212)
- [x] 2.2 Modificar handleCardClick para solo seleccionar (no auto-marcar como propio)
- [x] 2.3 Añadir los 3 botones dentro del Card del cromo seleccionado (parte inferior)
- [x] 2.4 Actualizar handleRemoveFromAlbum para también eliminar duplicados
- [x] 2.5 Verificar que los botones aparezcan solo en el cromo seleccionado

## 3. Implementar desplegable de filtro por equipo

- [x] 3.1 Añadir estado local `teamFilter` con useState (inicial: "all")
- [x] 3.2 Crear constante `teamOptions` con useMemo para generar opciones únicas de equipos
- [x] 3.3 Añadir el elemento `<select>` después del filtro "Repetidas", alineado a la derecha
- [x] 3.4 Aplicar el filtro de equipo en `filteredStickers` (useMemo)
- [x] 3.5 Verificar que el filtro se mantiene al cambiar entre Todas/Faltantes/En el álbum/Repetidas

## 4. Verificación

- [x] 4.1 Probar que al hacer click en un cromo se selecciona y muestran los botones dentro del cromo
- [x] 4.2 Probar que los botones añadir/quitar/repetida funcionan correctamente
- [x] 4.3 Probar que el desplegable de equipo filtra correctamente
- [x] 4.4 Probar que el filtro de equipo persiste al cambiar entre vistas
- [x] 4.5 Verificar que no hay errores de TypeScript (`bun run typecheck`)
- [x] 4.6 Verificar que la UI se ve correctamente (estilos, alineación)