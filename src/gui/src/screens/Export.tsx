import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, List, Download, FolderOpen, Save, Upload, Share2, FileBox, X, Trash2 } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Panel, Badge, Header } from '../components';
import { invoke } from '@tauri-apps/api/core';
import {
  assertCompatibleBackup,
  buildBackupPayload,
  GUI_APP_VERSION,
  parseBackup,
  serializeBackup,
} from '../lib/backup-file';
import {
  filterGuiStickersByExportSource,
  getGuiExportSourceLabel,
  type GuiExportSourceScope,
} from '../lib/export-source-filter';

const formats = [
  { id: 'pdf', label: 'PDF', icon: FileText, color: 'var(--color-red)', desc: 'Lista para imprimir' },
  { id: 'csv', label: 'CSV', icon: Table, color: 'var(--color-green)', desc: 'Hoja de cálculo' },
  { id: 'txt', label: 'TXT', icon: List, color: 'var(--color-cyan)', desc: 'Archivo de texto' },
];

export function ExportScreen() {
  const { owned, duplicates, setOwned, setDuplicates } = useCollectionStore();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportType, setExportType] = useState<'faltantes' | 'repetidos'>('faltantes');
  const [sourceScope, setSourceScope] = useState<GuiExportSourceScope>('todos');
  const [sortOrder, setSortOrder] = useState<'id' | 'name'>('id');
  const [compactMode, setCompactMode] = useState(false);
  const [lastExportPath, setLastExportPath] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [shareBusy, setShareBusy] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const isMobile = typeof window !== 'undefined' && !window.matchMedia('(min-width: 80rem)').matches;

  const allStickers = useMemo(() => getAllStickers(), []);

  const missing = useMemo(() => {
    return allStickers.filter((s) => !owned[s.id]);
  }, [allStickers, owned]);

  const duplicateStickers = useMemo(() => {
    return allStickers.filter((s) => (duplicates[s.id] || 0) > 0);
  }, [allStickers, duplicates]);

  const stickers = useMemo(() => {
    return exportType === 'faltantes' ? missing : duplicateStickers;
  }, [exportType, missing, duplicateStickers]);

  const filteredStickers = useMemo(() => {
    const filtered = filterGuiStickersByExportSource(stickers, sourceScope);
    return [...filtered].sort((a, b) =>
      sortOrder === 'name' ? a.name.localeCompare(b.name) : a.id.localeCompare(b.id),
    );
  }, [stickers, sourceScope, sortOrder]);

  const stickerCount = filteredStickers.length;

  const hasData = useMemo(() => {
    const ownedCount = Object.values(owned).some((qty) => qty > 0);
    const duplicatesCount = Object.values(duplicates).some((qty) => qty > 0);
    return ownedCount || duplicatesCount;
  }, [owned, duplicates]);

  const handleExport = async (format: string) => {
    console.log('EXPORT_DEBUG: handleExport called', { format, exportType, count: filteredStickers.length });
    setSelectedFormat(format);
    setExporting(true);
    setError(null);

    try {
      let result: string;
      if (filteredStickers.length === 0) {
        console.log('EXPORT_DEBUG: no stickers to export');
        setExporting(false);
        const label = exportType === 'faltantes' ? 'faltantes' : 'repetidos';
        setError(`No hay cromos ${label} para ${getGuiExportSourceLabel(sourceScope)}.`);
        return;
      }

      console.log('EXPORT_DEBUG: invoking command', format);

      switch (format) {
        case 'pdf': {
          const mode = compactMode ? 'ids-only' : 'full';
          result = await invoke('export_pdf', { stickers: filteredStickers, mode, exportType });
          console.log('EXPORT_DEBUG: pdf result', result);
          break;
        }
        case 'csv':
          result = await invoke('export_csv', { stickers: filteredStickers, exportType });
          console.log('EXPORT_DEBUG: csv result', result);
          break;
        case 'txt':
          result = await invoke('export_txt', { stickers: filteredStickers, exportType });
          console.log('EXPORT_DEBUG: txt result', result);
          break;
        default:
          throw new Error(`Formato no soportado: ${format}`);
      }

      console.log('EXPORT_DEBUG: export succeeded, path:', result);
      setExporting(false);
      setExported(true);
      setLastExportPath(result);
      if (isMobile) {
        setShowShareDialog(true);
      }
    } catch (err) {
      console.log('EXPORT_DEBUG: export failed with error:', err);
      setExporting(false);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al exportar:', err);
    }
  };

  const handleSaveBackup = async () => {
    setBackupBusy(true);
    setError(null);
    setBackupMessage(null);

    try {
      const payload = buildBackupPayload({ owned, duplicates }, GUI_APP_VERSION);
      const content = serializeBackup(payload);
      const suggestedName = 'coleccion.fwc26';
      const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

      if (isTauri) {
        const { save } = await import('@tauri-apps/plugin-dialog');
        const { writeTextFile } = await import('@tauri-apps/plugin-fs');

        const selectedPath = await save({
          defaultPath: suggestedName,
          filters: [{ name: 'Backup Panini FWC26', extensions: ['fwc26'] }],
        });

        if (!selectedPath) {
          setBackupMessage('Guardado cancelado.');
          return;
        }

        const finalPath = selectedPath.toLowerCase().endsWith('.fwc26')
          ? selectedPath
          : `${selectedPath}.fwc26`;

        await writeTextFile(finalPath, content);
        setBackupMessage(`Copia de seguridad guardada correctamente: ${finalPath}`);
        setLastExportPath(finalPath);
        if (isMobile) {
          setShowShareDialog(true);
        }
      } else {
        const blob = new Blob([content], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = suggestedName;
        link.click();
        URL.revokeObjectURL(url);
        setBackupMessage('Copia de seguridad guardada correctamente (.fwc26).');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar backup');
    } finally {
      setBackupBusy(false);
    }
  };

  const handleOpenBackup = async () => {
    setBackupBusy(true);
    setError(null);
    setBackupMessage(null);

    try {
      if (hasData) {
        const accepted = window.confirm(
          'ATENCION: tu colección actual no está vacía. Si continúas, será reemplazada por el contenido del backup. ¿Deseas continuar?',
        );

        if (!accepted) {
          setBackupMessage('Importación cancelada.');
          return;
        }
      }

      const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
      let content = '';

      if (isTauri) {
        const { open } = await import('@tauri-apps/plugin-dialog');
        const { readTextFile } = await import('@tauri-apps/plugin-fs');

        const selectedPath = await open({
          multiple: false,
          filters: [{ name: 'Backup Panini FWC26', extensions: ['fwc26'] }],
        });

        if (!selectedPath || Array.isArray(selectedPath)) {
          setBackupMessage('Importación cancelada.');
          return;
        }

        content = await readTextFile(selectedPath);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.fwc26';

        const file = await new Promise<File>((resolve, reject) => {
          input.onchange = () => {
            const selected = input.files?.[0];
            if (!selected) {
              reject(new Error('No se seleccionó ningún archivo.'));
              return;
            }
            resolve(selected);
          };
          input.click();
        });

        content = await file.text();
      }

      const backup = parseBackup(content);
      assertCompatibleBackup(backup.appVersion, GUI_APP_VERSION);
      setOwned(backup.collection.owned);
      setDuplicates(backup.collection.duplicates);
      setBackupMessage(`Backup cargado correctamente (versión ${backup.appVersion}).`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al abrir backup');
    } finally {
      setBackupBusy(false);
    }
  };

  const getPreview = () => {
    return filteredStickers.slice(0, 5).map((s) => `${s.id},${s.name},${s.team}`).join('\n');
  };

  const collectionSelectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1rem',
  } as const;

  return (
    <div>
      <Header />
      {error && (
        <Panel className="p-6 text-center border-[var(--color-red)] mb-6">
          <p className="text-[var(--color-white)]">{error}</p>
        </Panel>
      )}
      <p className="text-[var(--color-white)] opacity-60 mb-6">
        Exporta tus cromos faltantes o repetidos en diferentes formatos
      </p>

      <div className="flex gap-6">
        <div className="flex-1">
          <Panel className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              {exportType === 'faltantes' ? 'Generar checklist de faltantes' : 'Generar lista de repetidos'}
            </h2>
            <p className="text-sm text-[var(--color-white)] opacity-70 mb-4">
              {exportType === 'faltantes'
                ? 'Elige el origen de los cromos faltantes y el formato de exportación'
                : 'Elige el origen de los cromos repetidos y el formato de exportación'}
            </p>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <label className="text-sm text-[var(--color-white)] opacity-80">
                Tipo de exportación
              </label>
              <div className="flex rounded-lg overflow-hidden border border-[var(--color-border-strong)]">
                <button
                  onClick={() => setExportType('faltantes')}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    exportType === 'faltantes'
                      ? 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-60'
                  }`}
                >
                  Faltantes
                </button>
                <button
                  onClick={() => setExportType('repetidos')}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    exportType === 'repetidos'
                      ? 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-60'
                  }`}
                >
                  Repetidos
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <label htmlFor="source-scope" className="text-sm text-[var(--color-white)] opacity-80">
                Origen a exportar
              </label>
              <div className="relative">
                <select
                  id="source-scope"
                  value={sourceScope}
                  onChange={(event) => setSourceScope(event.target.value as GuiExportSourceScope)}
                  className="appearance-none bg-[var(--color-surface)] text-[var(--color-white)] font-semibold px-4 py-2 pr-10 rounded-lg cursor-pointer border-2 border-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50"
                  style={collectionSelectStyle}
                >
                  <option value="panini" className="bg-[var(--color-surface)] text-[var(--color-white)]">Panini</option>
                  <option value="extra" className="bg-[var(--color-surface)] text-[var(--color-white)]">Extra</option>
                  <option value="coca_cola" className="bg-[var(--color-surface)] text-[var(--color-white)]">Coca cola</option>
                  <option value="mcdonalds" className="bg-[var(--color-surface)] text-[var(--color-white)]">McDonald's</option>
                  <option value="todos" className="bg-[var(--color-surface)] text-[var(--color-white)]">Todos</option>
                </select>
              </div>
              <span className="text-xs text-[var(--color-white)] opacity-60">
                Seleccionado: {getGuiExportSourceLabel(sourceScope)}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-4">
              <label htmlFor="sort-order" className="text-sm text-[var(--color-white)] opacity-80">
                Ordenar por
              </label>
              <div className="relative">
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as 'id' | 'name')}
                  className="appearance-none bg-[var(--color-surface)] text-[var(--color-white)] font-semibold px-4 py-2 pr-10 rounded-lg cursor-pointer border-2 border-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50"
                  style={collectionSelectStyle}
                >
                  <option value="id" className="bg-[var(--color-surface)] text-[var(--color-white)]">ID (orden de álbum)</option>
                  <option value="name" className="bg-[var(--color-surface)] text-[var(--color-white)]">Nombre (alfabético)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-4">
              <label htmlFor="compact-mode" className="text-sm text-[var(--color-white)] opacity-80">
                Modo PDF
              </label>
              <button
                id="compact-mode"
                onClick={() => setCompactMode(!compactMode)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  compactMode
                    ? 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)] border border-[var(--color-cyan)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-white)] border border-[var(--color-border-strong)]'
                }`}
              >
                {compactMode ? 'Solo IDs' : 'Formato completo'}
              </button>
            </div>
          </Panel>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {formats.map((format) => (
              <motion.div
                key={format.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExport(format.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  selectedFormat === format.id
                    ? 'bg-[var(--color-surface)] border-2'
                    : 'bg-[var(--color-surface)]/50 border border-transparent hover:border-[var(--color-border-strong)]'
                }`}
                style={{
                  borderColor: selectedFormat === format.id ? format.color : undefined,
                }}
              >
                <format.icon
                  size={48}
                  style={{ color: format.color }}
                  className="mb-4"
                />
                <h3 className="text-xl font-bold text-[var(--color-white)] mb-1">
                  {format.label}
                </h3>
                <p className="text-sm text-[var(--color-white)] opacity-60">
                  {format.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {exporting && (
            <Panel className="p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Download size={32} className="text-[var(--color-cyan)]" />
              </motion.div>
              <p className="text-[var(--color-white)]">Exportando...</p>
            </Panel>
          )}

          {exported && !exporting && (
            <Panel className="p-6 text-center border-[var(--color-green)]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-green)]/20 mb-4"
              >
                <Download size={32} className="text-[var(--color-green)]" />
              </motion.div>
              <p className="text-lg text-[var(--color-white)] mb-2">
                  Exportación Completa!
                </p>
              <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
                Archivo guardado exitosamente
              </p>
              <Button
                variant="secondary"
                onClick={async () => {
                  try {
                    await invoke('open_downloads_folder');
                  } catch (err) {
                    console.error('Error al abrir carpeta:', err);
                  }
                }}
                className="hidden xl:inline-flex"
              >
                <FolderOpen size={16} className="mr-2" />
                Abrir Carpeta
              </Button>
            </Panel>
          )}
        </div>

        <div className="w-96 hidden xl:block">
          <Panel className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Vista Previa
            </h2>
            <div className="bg-[var(--color-surface-2)] rounded-xl p-4 font-mono text-xs text-[var(--color-white)] overflow-hidden">
              <pre className="whitespace-pre-wrap">{getPreview()}</pre>
              {stickerCount > 5 && (
                <p className="text-[var(--color-white)] opacity-40 mt-2">
                  ... y {stickerCount - 5} más
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-white)] opacity-60">
                Total {exportType === 'faltantes' ? 'faltantes' : 'repetidos'}
              </span>
              <Badge variant={exportType === 'faltantes' ? 'red' : 'yellow'}>{stickerCount}</Badge>
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
          Copia de seguridad
        </h2>
        <p className="text-sm text-[var(--color-white)] opacity-70 mb-2">
          Guarda o abre tu colección completa en archivos .fwc26
        </p>
        <p className="text-xs text-[var(--color-white)] opacity-50 mb-4">
          La copia de seguridad siempre incluye toda la colección actual.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary" onClick={handleSaveBackup} disabled={backupBusy}>
            <Save size={16} className="mr-2" />
            Guardar backup
          </Button>
          <Button variant="secondary" onClick={handleOpenBackup} disabled={backupBusy}>
            <Upload size={16} className="mr-2" />
            Abrir backup
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(true)}
            disabled={backupBusy}
            className="bg-[var(--color-red)]/20 text-[var(--color-red)] hover:bg-[var(--color-red)]/30"
          >
            <Trash2 size={16} className="mr-2" />
            Borrar colección
          </Button>
        </div>
        {backupMessage && (
          <p className="text-sm text-[var(--color-green)] mt-4">{backupMessage}</p>
        )}
      </Panel>

      {showShareDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Panel className="p-6 w-80 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-white)]">
                Exportación Completa
              </h2>
              <button
                onClick={() => setShowShareDialog(false)}
                className="text-[var(--color-white)] opacity-50 hover:opacity-100 p-2 min-h-[44px]"
              >
                <X size={20} />
              </button>
            </div>

            {shareMessage && (
              <p className="text-sm text-[var(--color-green)] mb-4">{shareMessage}</p>
            )}

            <div className="space-y-3">
              <Button
                className="w-full"
                disabled={shareBusy}
                onClick={async () => {
                  setShareBusy(true);
                  setShareMessage(null);
                  try {
                    await invoke('share_file', { path: lastExportPath! });
                    setShareMessage('Archivo compartido.');
                  } catch (err) {
                    const msg = typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err);
                    setShareMessage('Error al compartir: ' + msg);
                  } finally {
                    setShareBusy(false);
                  }
                }}
              >
                <Share2 size={16} className="mr-2" />
                Compartir
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                disabled={shareBusy}
                onClick={async () => {
                  setShareBusy(true);
                  setShareMessage(null);
                  try {
                    const result = await invoke<string>('copy_to_documents', { sourcePath: lastExportPath });
                    setShareMessage(`Archivo guardado en documentos: ${result}`);
                  } catch (err) {
                    setShareMessage('Error al guardar: ' + (err instanceof Error ? err.message : 'Error desconocido'));
                  } finally {
                    setShareBusy(false);
                  }
                }}
              >
                <FileBox size={16} className="mr-2" />
                Guardar en documentos
              </Button>

                <button
                  onClick={() => setShowShareDialog(false)}
                  className="w-full py-3 min-h-[44px] text-sm text-[var(--color-white)] opacity-60 hover:opacity-100 transition-opacity"
                >
                  Cerrar
                </button>
              </div>
             </Panel>
           </div>
       )}

       {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Panel className="p-6 w-80 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-white)]">
                ¿Borrar colección?
              </h2>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="text-[var(--color-white)] opacity-50 hover:opacity-100 p-2 min-h-[44px]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[var(--color-white)] mb-6">
              Esta acción eliminará permanentemente todos tus datos de colección.
              Esta acción no se puede deshacer.
            </p>

            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={async () => {
                  setShowDeleteConfirmation(false);
                  try {
                    await invoke<void>('reset_collection');
                    setBackupMessage('Colección borrada exitosamente');
                  } catch (err) {
                    setBackupMessage(`Error al borrar: ${err instanceof Error ? err.message : 'Error desconocido'}`);
                  }
                }}
                className="w-full"
              >
                <Trash2 size={16} className="mr-2" />
                Borrar colección
              </Button>

              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="w-full py-3 min-h-[44px] text-sm text-[var(--color-white)] opacity-60 hover:opacity-100"
              >
                Cancelar
              </button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}