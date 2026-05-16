import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, List, Download, FolderOpen } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Panel, Badge, Header } from '../components';
import { invoke } from '@tauri-apps/api/core';

const formats = [
  { id: 'pdf', label: 'PDF', icon: FileText, color: 'var(--color-red)', desc: 'Lista para imprimir' },
  { id: 'csv', label: 'CSV', icon: Table, color: 'var(--color-green)', desc: 'Hoja de cálculo' },
  { id: 'txt', label: 'TXT', icon: List, color: 'var(--color-cyan)', desc: 'Archivo de texto' },
];

export function ExportScreen() {
  const { owned } = useCollectionStore();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allStickers = useMemo(() => getAllStickers(), []);

  const missing = useMemo(() => {
    return allStickers.filter((s) => !owned[s.id]);
  }, [allStickers, owned]);

  const missingCount = missing.length;

  const handleExport = async (format: string) => {
    setSelectedFormat(format);
    setExporting(true);
    setError(null);

    try {
      let result: string;
      switch (format) {
        case 'pdf':
          result = await invoke('export_pdf', { stickers: missing });
          break;
        case 'csv':
          result = await invoke('export_csv', { stickers: missing });
          break;
        case 'txt':
          result = await invoke('export_txt', { stickers: missing });
          break;
        default:
          throw new Error(`Formato no soportado: ${format}`);
      }

      setExporting(false);
      setExported(true);
      // Optionally, we could show a success message with the file path
      console.log('Exportado a:', result);
    } catch (err) {
      setExporting(false);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al exportar:', err);
    }
  };

  const getPreview = () => {
    return missing.slice(0, 5).map((s) => `${s.id},${s.name},${s.team}`).join('\n');
  };

  return (
    <div>
      <Header />
      {error && (
        <Panel className="p-6 text-center border-[var(--color-red)] mb-6">
          <p className="text-[var(--color-white)]">{error}</p>
        </Panel>
      )}
      <p className="text-[var(--color-white)] opacity-60 mb-6">
        Exporta tus cromos faltantes en diferentes formatos
      </p>

      <div className="flex gap-6">
        <div className="flex-1">
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
                    : 'bg-[var(--color-surface)]/50 border border-transparent hover:border-white/20'
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
                onClick={() => {
                  setExported(false);
                  setSelectedFormat(null);
                }}
              >
                <FolderOpen size={16} className="mr-2" />
                Abrir Carpeta
              </Button>
            </Panel>
          )}
        </div>

        <div className="w-96">
          <Panel className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Vista Previa
            </h2>
            <div className="bg-[var(--color-surface-2)] rounded-xl p-4 font-mono text-xs text-[var(--color-white)] overflow-hidden">
              <pre className="whitespace-pre-wrap">{getPreview()}</pre>
              {missingCount > 5 && (
                <p className="text-[var(--color-white)] opacity-40 mt-2">
                  ... y {missingCount - 5} más
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-white)] opacity-60">
                Total faltantes
              </span>
              <Badge variant="red">{missingCount}</Badge>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}