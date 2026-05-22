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

export class ExportMenu {
  private storageAdapter: ConfStorageAdapter;

  constructor() {
    this.storageAdapter = new ConfStorageAdapter();
  }

  async show(): Promise<ExportFormat | null> {
    console.log(chalk.cyan('\n--- Exportar cromos faltantes ---\n'));

    const answers = await inquirer.prompt([
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

    if (answers.format === 'back') {
      return null;
    }

    return answers.format as ExportFormat;
  }

  async execute(format: ExportFormat): Promise<string | null> {
    console.log(chalk.cyan('\nPreparando exportación...\n'));

    const state = await this.storageAdapter.load();
    const allStickers = (await import('../../data/stickers')).getAllStickers();

    const missingStickers = allStickers.filter(s => state.getOwnedQuantity(s.id) === 0);

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
    const filteredMissingStickers = filterStickersByExportSource(missingStickers, selectedScope);

    if (filteredMissingStickers.length === 0) {
      console.log(chalk.green('\n🎉 ¡Felicidades! No tienes cromos faltantes.\n'));
      return null;
    }

    console.log(
      chalk.white(
        `Se encontraron ${filteredMissingStickers.length} cromo(s) faltante(s) para ${getExportSourceLabel(selectedScope)}.\n`,
      ),
    );

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

    let fullPath: string;

    try {
      switch (format) {
        case 'pdf': {
          const exporter = new PdfExporter({ stickers: filteredMissingStickers });
          fullPath = await exporter.export(destination);
          break;
        }
        case 'csv': {
          const exporter = new CsvExporter({ stickers: filteredMissingStickers });
          fullPath = await exporter.export(destination);
          break;
        }
        case 'txt': {
          const exporter = new TxtExporter({ stickers: filteredMissingStickers });
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