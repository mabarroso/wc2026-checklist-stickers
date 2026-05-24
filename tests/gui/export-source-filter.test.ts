import { describe, it, expect } from 'vitest';
import {
  filterGuiStickersByExportSource,
  getGuiExportSourceLabel,
  normalizeGuiExportSourceScope,
} from '../../src/gui/src/lib/export-source-filter';
import type { Sticker } from '../../src/gui/src/data/stickers';

function makeSticker(id: string, type: string): Sticker {
  return {
    id,
    number: 0,
    name: id,
    team: 'Team',
    teamCode: 'TM',
    group: null,
    type,
    extraVariant: null,
  };
}

describe('export source filter (GUI)', () => {
  const stickers: Sticker[] = [
    makeSticker('0', 'logo'),
    makeSticker('ARG01', 'player'),
    makeSticker('ARG01s', 'panini_extra'),
    makeSticker('CC-US01', 'cocacola_us'),
    makeSticker('AUS13mc', 'mcdonalds'),
    makeSticker('LM-b', 'extra_bronze'),
  ];

  it('filters Panini scope (solo IDs 3 letras + 2 dígitos)', () => {
    expect(filterGuiStickersByExportSource(stickers, 'panini').map((s) => s.id)).toEqual(['ARG01']);
  });

  it('filters Extra scope', () => {
    expect(filterGuiStickersByExportSource(stickers, 'extra').map((s) => s.id)).toEqual(['LM-b']);
  });

  it('filters Coca cola scope', () => {
    expect(filterGuiStickersByExportSource(stickers, 'coca_cola').map((s) => s.id)).toEqual(['CC-US01']);
  });

  it("filters McDonald's scope", () => {
    expect(filterGuiStickersByExportSource(stickers, 'mcdonalds').map((s) => s.id)).toEqual(['AUS13mc']);
  });

  it('keeps all stickers for Todos scope', () => {
    expect(filterGuiStickersByExportSource(stickers, 'todos').map((s) => s.id)).toEqual(
      stickers.map((s) => s.id),
    );
  });

  it('falls back to todos for unknown scope', () => {
    expect(normalizeGuiExportSourceScope('other')).toBe('todos');
    expect(filterGuiStickersByExportSource(stickers, 'other').map((s) => s.id)).toEqual(
      stickers.map((s) => s.id),
    );
  });

  it('returns expected labels', () => {
    expect(getGuiExportSourceLabel('panini')).toBe('Panini');
    expect(getGuiExportSourceLabel('extra')).toBe('Extra');
    expect(getGuiExportSourceLabel('coca_cola')).toBe('Coca cola');
    expect(getGuiExportSourceLabel('mcdonalds')).toBe("McDonald's");
    expect(getGuiExportSourceLabel('unknown')).toBe('Todos');
  });
});
