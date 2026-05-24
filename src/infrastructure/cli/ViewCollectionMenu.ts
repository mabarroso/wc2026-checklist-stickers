import inquirer from 'inquirer';
import chalk from 'chalk';
import { getAllStickers } from '../../data/stickers';
import type { Sticker } from '../../domain/entities/Sticker';
import type { CollectionState } from '../../domain/entities/CollectionState';

const PANINI_ID_PATTERN = /^[A-Za-z]{3}\d{2}$/;

type SectionFilter = 'todas' | 'panini' | 'coca_cola' | 'mcdonalds' | 'extras';

export type ViewFilter = 'all' | 'missing' | 'owned' | 'duplicates' | 'back';

function applySectionFilter(stickers: Sticker[], section: SectionFilter): Sticker[] {
  switch (section) {
    case 'panini':
      return stickers.filter((s) => PANINI_ID_PATTERN.test(s.id));
    case 'coca_cola':
      return stickers.filter((s) => s.id.startsWith('CC-'));
    case 'mcdonalds':
      return stickers.filter((s) => s.id.endsWith('mc'));
    case 'extras': {
      return stickers.filter((s) => {
        if (s.id.startsWith('CC-')) return false;
        if (s.id.endsWith('mc')) return false;
        if (PANINI_ID_PATTERN.test(s.id)) return false;
        return true;
      });
    }
    default:
      return stickers;
  }
}

export class ViewCollectionMenu {
  private selectedSection: SectionFilter = 'todas';

  async show(_state: CollectionState): Promise<ViewFilter> {
    const sectionAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'section',
        message: chalk.cyan('¿Qué sección quieres ver?'),
        choices: [
          { name: '📋 Todas las secciones', value: 'todas' },
          { name: '🏆 Panini', value: 'panini' },
          { name: '🥤 Coca Cola', value: 'coca_cola' },
          { name: '🍔 McDonald\'s', value: 'mcdonalds' },
          { name: '✨ Extras', value: 'extras' },
        ],
        pageSize: 5,
      },
    ]);

    this.selectedSection = sectionAnswer.section as SectionFilter;

    const filterAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'filter',
        message: chalk.cyan('¿Qué quieres ver?'),
        choices: [
          { name: '📋 Ver todos los cromos', value: 'all' },
          { name: '❌ Ver faltantes', value: 'missing' },
          { name: '✅ Ver obtenidas', value: 'owned' },
          { name: '🔄 Ver repetidas', value: 'duplicates' },
          { name: '← Volver al menú principal', value: 'back' },
        ],
        pageSize: 5,
      },
    ]);

    return filterAnswer.filter as ViewFilter;
  }

  async displayStickers(stickers: CollectionState | Sticker[], filter: ViewFilter, allStickers: ReturnType<typeof getAllStickers>): Promise<void> {
    const state = filter === 'all' ? null : (stickers as CollectionState);
    let displayStickers = applySectionFilter(allStickers, this.selectedSection);

    if (filter === 'missing' && state) {
      displayStickers = displayStickers.filter(s => state.getOwnedQuantity(s.id) === 0);
    } else if (filter === 'owned' && state) {
      displayStickers = displayStickers.filter(s => state.getOwnedQuantity(s.id) > 0);
    } else if (filter === 'duplicates' && state) {
      displayStickers = displayStickers.filter(s => state.getDuplicateQuantity(s.id) > 0);
    }

    const pageSize = 20;
    let currentPage = 0;
    const totalPages = Math.ceil(displayStickers.length / pageSize);

    while (currentPage < totalPages) {
      const start = currentPage * pageSize;
      const end = Math.min(start + pageSize, displayStickers.length);
      const pageStickers = displayStickers.slice(start, end);

      console.log(chalk.bold.cyan(`\n--- Página ${currentPage + 1}/${totalPages} ---`));

      for (const sticker of pageStickers) {
        const ownedQty = state ? state.getOwnedQuantity(sticker.id) : 0;
        const dupQty = state ? state.getDuplicateQuantity(sticker.id) : 0;

        let statusIcon = chalk.gray('[ ]');
        if (dupQty > 0) {
          statusIcon = chalk.yellow(`[R:${dupQty}]`);
        } else if (ownedQty > 0) {
          statusIcon = chalk.green(`[OK:${ownedQty}]`);
        }

        console.log(`${statusIcon} ${chalk.white(`[${sticker.id}]`)} ${sticker.name} - ${sticker.team}`);
      }

      if (currentPage < totalPages - 1) {
        const nextAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'next',
            message: '¿Qué quieres hacer?',
            choices: [
              { name: '➡️ Siguiente página', value: 'next' },
              { name: '⬅️ Página anterior', value: 'prev' },
              { name: '🚪 Salir', value: 'exit' },
            ],
            pageSize: 3,
          },
        ]);

        if (nextAnswer.next === 'exit') break;
        if (nextAnswer.next === 'next') currentPage++;
        else if (nextAnswer.next === 'prev' && currentPage > 0) currentPage--;
      } else {
        currentPage++;
      }
    }
  }

  printSummary(state: CollectionState): void {
    const allStickers = getAllStickers();
    const total = allStickers.length;
    const owned = state.getTotalOwned();
    const duplicates = state.getTotalDuplicates();
    const uniqueOwned = Object.keys(state.owned).length;
    const missing = total - uniqueOwned;

    console.log(chalk.bold.cyan('\n=== RESUMEN DE COLECCIÓN ===\n'));
    console.log(`  Total cromos: ${chalk.white(total.toString())}`);
    console.log(`  Obtenidas: ${chalk.green(owned.toString())} (${uniqueOwned} únicas)`);
    console.log(`  Faltantes: ${chalk.red(missing.toString())}`);
    console.log(`  Repetidas: ${chalk.yellow(duplicates.toString())}`);
    console.log(`  Progreso: ${chalk.green(((uniqueOwned / total) * 100).toFixed(1))}%`);
    console.log('');
  }
}