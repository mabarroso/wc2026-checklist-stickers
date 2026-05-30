import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import type { Sticker } from '../../domain/entities/Sticker';
import { BaseExporter } from './BaseExporter';

export interface TxtExporterOptions {
  stickers: Sticker[];
  filename?: string;
}

export class TxtExporter extends BaseExporter {
  constructor(options: TxtExporterOptions) {
    super(options);
  }

  protected getExtension(): string {
    return 'txt';
  }

  protected generateContent(): string {
    const lines: string[] = [];

    const txtLabel = this.label === 'Repetidos' ? 'Repetidas' : this.label;

    lines.push('='.repeat(60));
    lines.push('  WC 2026 CHECKLIST');
    lines.push(`  LISTA DE FIGURITAS ${txtLabel.toUpperCase()}`);
    lines.push('='.repeat(60));
    lines.push('');

    const groupedByTeam = this.groupByTeam();

    for (const [team, stickers] of Object.entries(groupedByTeam)) {
      lines.push('-'.repeat(40));
      lines.push(`  ${team}`);
      lines.push('-'.repeat(40));

      for (const sticker of stickers) {
        const checkbox = '[ ]';
        lines.push(`  ${checkbox} [${sticker.id}] ${sticker.name}`);
      }

      lines.push('');
    }

    lines.push('='.repeat(60));
    lines.push(`Total ${txtLabel.toLowerCase()}: ${this.stickers.length}`);
    lines.push('='.repeat(60));

    return lines.join('\n');
  }

  private groupByTeam(): Record<string, Sticker[]> {
    const groups: Record<string, Sticker[]> = {};

    for (const sticker of this.stickers) {
      const key = sticker.team;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(sticker);
    }

    return groups;
  }

  async export(destination: string = 'downloads'): Promise<string> {
    const ext = this.getExtension();
    let fullPath: string;

    if (destination === 'downloads') {
      const downloadDir = join(homedir(), 'Downloads');
      if (!existsSync(downloadDir)) {
        mkdirSync(downloadDir, { recursive: true });
      }
      fullPath = join(downloadDir, `${this.filename}.${ext}`);
    } else {
      fullPath = join(destination, `${this.filename}.${ext}`);
    }

    const content = this.generateContent();
    const { writeFileSync } = await import('fs');
    writeFileSync(fullPath, content, 'utf-8');

    return fullPath;
  }
}