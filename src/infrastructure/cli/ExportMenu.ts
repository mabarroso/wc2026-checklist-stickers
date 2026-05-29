import inquirer from 'inquirer';
import chalk from 'chalk';
import { PdfExporter, CsvExporter, TxtExporter } from '../exporters';
import { ConfStorageAdapter } from '../storage/ConfStorageAdapter';
import {
  filterStickersByExportSource,
  getExportSourceLabel,
  type ExportSourceScope,
} from '../exporters/export-source-filter';

export type ExportFormat = 'pdf' | 'csv' | 'txt';
export type ExportSortOrder = 'id' | 'name';
export type ExportType = 'faltantes' | 'repetidos';

export type ExportConfig = {
  format: ExportFormat;
  type: ExportType;
};

export class ExportMenu {
  private storageAdapter: ConfStorageAdapter;

  constructor() {
    this.storageAdapter = new ConfStorageAdapter();
  }

  async show(): Promise<ExportConfig | null> {
    const typeAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '¿Qué quieres exportar?',
        choices: [
          { name: 'Cromos faltantes', value: 'faltantes' },
          { name: 'Cromos repetidos', value: 'repetidos' },
          { name: '← Volver al menú principal', value: 'back' },
        ],
        pageSize: 3,
      },
    ]);

    if (typeAnswers.type === 'back') {
      return null;
    }

    const exportType = typeAnswers.type as ExportType;
    const typeLabel = exportType === 'faltantes' ? 'faltantes' : 'repetidos';

    console.log(chalk.cyan(`\n--- Exportar cromos ${typeLabel} ---\n`));

    const formatAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'format',
        message: '¿En qué formato quieres exportar?',
        choices: [
          { name: '📄 PDF (para imprimir)', value: 'pdf' },
          { name: '📊 CSV (hoja de cálculo)', value: 'csv' },
          { name: '📝 TXT (lista de texto)', value: 'txt' },
          { name: '← Volver al menú principal', value: 'back' },
        ],
        pageSize: 4,
      },
    ]);

    if (formatAnswers.format === 'back') {
      return null;
    }

    return {
      format: formatAnswers.format as ExportFormat,
      type: exportType,
    };
  }

  async execute(format: ExportFormat, exportType: ExportType): Promise<string | null> {
    console.log(chalk.cyan('\nPreparando exportación...\n'));

    const state = await this.storageAdapter.load();
    const allStickers = (await import('../../data/stickers')).getAllStickers();

    const stickers = allStickers.filter(s => {
      if (exportType === 'faltantes') {
        return state.getOwnedQuantity(s.id) === 0;
      }
      return state.getDuplicateQuantity(s.id) > 0;
    });

    const sourceAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'scope',
        message: '¿Qué origen quieres exportar?',
        choices: [
          { name: 'Panini', value: 'panini' },
          { name: 'Extra', value: 'extra' },
          { name: 'Coca cola', value: 'coca_cola' },
          { name: "McDonald's", value: 'mcdonalds' },
          { name: 'Todos', value: 'todos' },
        ],
        pageSize: 5,
      },
    ]);

    const selectedScope = sourceAnswers.scope as ExportSourceScope;
    const filteredStickers = filterStickersByExportSource(stickers, selectedScope);

    if (filteredStickers.length === 0) {
      const emptyMsg = exportType === 'faltantes'
        ? '🎉 ¡Felicidades! No tienes cromos faltantes.'
        : 'No tienes cromos repetidos.';
      console.log(chalk.green(`\n${emptyMsg}\n`));
      return null;
    }

    const stickerLabel = exportType === 'faltantes' ? 'faltante(s)' : 'repetido(s)';
    console.log(
      chalk.white(
        `Se encontraron ${filteredStickers.length} cromo(s) ${stickerLabel} para ${getExportSourceLabel(selectedScope)}.\n`,
      ),
    );

    const sortAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'sortOrder',
        message: '¿Cómo quieres ordenar la lista?',
        choices: [
          { name: 'ID (orden de álbum)', value: 'id' },
          { name: 'Nombre (alfabético)', value: 'name' },
        ],
        pageSize: 2,
      },
    ]);

    const selectedSortOrder = sortAnswers.sortOrder as ExportSortOrder;
    if (selectedSortOrder === 'name') {
      filteredStickers.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filteredStickers.sort((a, b) => a.id.localeCompare(b.id));
    }

    let pdfMode: 'full' | 'ids-only' = 'full';
    if (format === 'pdf') {
      const modeAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'mode',
          message: '¿Incluir nombres?',
          choices: [
            { name: 'Sí (formato completo)', value: 'full' },
            { name: 'No (solo IDs, más columnas)', value: 'ids-only' },
          ],
          pageSize: 2,
        },
      ]);
      pdfMode = modeAnswer.mode as 'full' | 'ids-only';
    }

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'destination',
        message: '¿Dónde quieres guardar el archivo?',
        choices: [
          { name: '📥 Descargas', value: 'downloads' },
          { name: '💻 Escritorio', value: 'desktop' },
          { name: '📁 Directorio actual', value: 'current' },
        ],
        pageSize: 3,
      },
    ]);

    const destination = this.getDestinationPath(answers.destination);

    const label = exportType === 'faltantes' ? 'Faltantes' : 'Repetidos';
    const exporterOptions = { stickers: filteredStickers, label };

    let fullPath: string;

    try {
      switch (format) {
        case 'pdf': {
          const exporter = new PdfExporter({ ...exporterOptions, mode: pdfMode });
          fullPath = await exporter.export(destination);
          break;
        }
        case 'csv': {
          const exporter = new CsvExporter(exporterOptions);
          fullPath = await exporter.export(destination);
          break;
        }
        case 'txt': {
          const exporter = new TxtExporter(exporterOptions);
          fullPath = await exporter.export(destination);
          break;
        }
        default:
          return null;
      }

      console.log(chalk.green(`\n✓ Archivo exportado exitosamente:`));
      console.log(chalk.white(`  ${fullPath}\n`));
      return fullPath;
    } catch (error) {
      console.log(chalk.red(`\n❌ Error al exportar: ${error}\n`));
      return null;
    }
  }

  private getDestinationPath(type: string): string {
    const { homedir } = require('os');
    const home = homedir();

    switch (type) {
      case 'downloads':
        return home + '/Downloads';
      case 'desktop':
        return home + '/Desktop';
      case 'current':
        return process.cwd();
      default:
        return process.cwd();
    }
  }
}
