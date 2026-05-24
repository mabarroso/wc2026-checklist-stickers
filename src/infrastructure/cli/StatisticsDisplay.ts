import chalk from 'chalk';
import type { CollectionStats } from '../../application/queries/GetCollectionStatsQuery';
import { getAllStickers } from '../../data/stickers';
import type { CollectionState } from '../../domain/entities/CollectionState';

const PANINI_ID_PATTERN = /^[A-Za-z]{3}\d{2}$/;

type SectionLabel = 'Panini' | 'Coca Cola' | "McDonald's" | 'Extras';

function getStickerSection(id: string): SectionLabel {
  if (id.startsWith('CC-')) return 'Coca Cola';
  if (id.endsWith('mc')) return "McDonald's";
  if (PANINI_ID_PATTERN.test(id)) return 'Panini';
  return 'Extras';
}

export class StatisticsDisplay {
  printStats(stats: CollectionStats): void {
    console.log(chalk.bold.cyan('\n╔══════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║    ESTADÍSTICAS DE COLECCIÓN         ║'));
    console.log(chalk.bold.cyan('╚══════════════════════════════════════╝\n'));

    console.log(`  ${chalk.white('Total cromos:')}     ${chalk.bold(stats.total)}`);
    console.log(`  ${chalk.green('Obtenidas:')}          ${chalk.green.bold(stats.owned)}`);
    console.log(`  ${chalk.red('Faltantes:')}           ${chalk.red.bold(stats.missing)}`);
    console.log(`  ${chalk.yellow('Repetidas:')}         ${chalk.yellow.bold(stats.duplicates)}`);

    console.log('\n  ' + this.renderProgressBar(stats.percentage));

    console.log(`\n  ${chalk.white('Porcentaje completado:')} ${chalk.green.bold(stats.percentage)}%`);

    console.log('\n' + chalk.cyan('─'.repeat(42)) + '\n');
  }

printDetailedStats(state: CollectionState): void {
    const allStickers = getAllStickers();

    const byTeam: Record<string, { owned: number; total: number }> = {};
    const byType: Record<string, { owned: number; total: number }> = {};
    const bySection: Record<SectionLabel, { owned: number; total: number }> = {
      Panini: { owned: 0, total: 0 },
      'Coca Cola': { owned: 0, total: 0 },
      "McDonald's": { owned: 0, total: 0 },
      Extras: { owned: 0, total: 0 },
    };

    for (const sticker of allStickers) {
      const isOwned = state.getOwnedQuantity(sticker.id) > 0;

      const section = getStickerSection(sticker.id);
      bySection[section].total++;
      if (isOwned) bySection[section].owned++;

      if (!byTeam[sticker.team]) {
        byTeam[sticker.team] = { owned: 0, total: 0 };
      }
      byTeam[sticker.team].total++;
      if (isOwned) byTeam[sticker.team].owned++;

      const typeKey = sticker.type.toString();
      if (!byType[typeKey]) {
        byType[typeKey] = { owned: 0, total: 0 };
      }
      byType[typeKey].total++;
      if (isOwned) byType[typeKey].owned++;
    }

    console.log(chalk.bold.cyan('\n=== ESTADÍSTICAS POR SECCIÓN ===\n'));
    for (const [section, data] of Object.entries(bySection)) {
      const pct = data.total > 0 ? Math.round((data.owned / data.total) * 100) : 0;
      const color = pct === 100 ? chalk.green : pct > 50 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(`${section}:`)} ${color(`${data.owned}/${data.total} (${pct}%)`)}`);
    }

    console.log(chalk.bold.cyan('\n=== ESTADÍSTICAS POR EQUIPO ===\n'));
    const sortedTeams = Object.keys(byTeam).sort();
    for (const team of sortedTeams) {
      const data = byTeam[team];
      const pct = Math.round((data.owned / data.total) * 100);
      const color = pct === 100 ? chalk.green : pct > 50 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(`${team}:`)} ${color(`${data.owned}/${data.total} (${pct}%)`)}`);
    }

    console.log(chalk.bold.cyan('\n=== ESTADÍSTICAS POR TIPO ===\n'));
    for (const [type, data] of Object.entries(byType)) {
      const pct = Math.round((data.owned / data.total) * 100);
      const color = pct === 100 ? chalk.green : pct > 50 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(`${type}:`)} ${color(`${data.owned}/${data.total} (${pct}%)`)}`);
    }

    console.log('');
  }

  private renderProgressBar(percentage: number): string {
    const width = 30;
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;

    const progressBar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));

    return `[${progressBar}]`;
  }

  printTopDuplicates(state: CollectionState, limit: number = 5): void {
    const duplicates = Object.entries(state.duplicates)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    if (duplicates.length === 0) {
      console.log(chalk.gray('\nNo tienes cromos repetidos aún.\n'));
      return;
    }

    console.log(chalk.bold.cyan('\n=== TOP REPETIDAS ===\n'));

    for (let i = 0; i < duplicates.length; i++) {
      const [id, qty] = duplicates[i];
      const marker = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
      console.log(`  ${chalk.yellow(marker)} [${id}] x${qty}`);
    }

    console.log('');
  }
}