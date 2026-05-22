import { describe, it, expect } from 'vitest';
import { Sticker } from '../../src/domain/entities/Sticker';
import { StickerType } from '../../src/domain/value-objects/StickerType';
import {
  filterStickersByExportSource,
  getExportSourceLabel,
  normalizeExportSourceScope,
} from '../../src/infrastructure/exporters/export-source-filter';

function makeSticker(id: string, type: StickerType): Sticker {
  return new Sticker({ id, name: id, team: 'Team', type });
}

describe('export source filter (CLI)', () => {
  const stickers = [
    makeSticker('0', StickerType.LOGO),
    makeSticker('ARG-01', StickerType.PLAYER),
    makeSticker('ARG-01S', StickerType.PANINI_EXTRA),
    makeSticker('CC-US01', StickerType.COCA_COLA_US),
    makeSticker('MC-01', StickerType.MC_DONALDS),
    makeSticker('EX-01', StickerType.EXTRA_BASE),
  ];

  it('filters Panini scope', () => {
    expect(filterStickersByExportSource(stickers, 'panini').map((s) => s.id)).toEqual(['0', 'ARG-01', 'ARG-01S']);
  });

  it('filters Extra scope', () => {
    expect(filterStickersByExportSource(stickers, 'extra').map((s) => s.id)).toEqual(['EX-01']);
  });

  it('filters Coca cola scope', () => {
    expect(filterStickersByExportSource(stickers, 'coca_cola').map((s) => s.id)).toEqual(['CC-US01']);
  });

  it("filters McDonald's scope", () => {
    expect(filterStickersByExportSource(stickers, 'mcdonalds').map((s) => s.id)).toEqual(['MC-01']);
  });

  it('keeps all stickers for Todos scope', () => {
    expect(filterStickersByExportSource(stickers, 'todos').map((s) => s.id)).toEqual(
      stickers.map((s) => s.id),
    );
  });

  it('falls back to todos for unknown scope', () => {
    expect(normalizeExportSourceScope('other')).toBe('todos');
    expect(filterStickersByExportSource(stickers, 'other').map((s) => s.id)).toEqual(
      stickers.map((s) => s.id),
    );
  });

  it('returns expected labels', () => {
    expect(getExportSourceLabel('panini')).toBe('Panini');
    expect(getExportSourceLabel('extra')).toBe('Extra');
    expect(getExportSourceLabel('coca_cola')).toBe('Coca cola');
    expect(getExportSourceLabel('mcdonalds')).toBe("McDonald's");
    expect(getExportSourceLabel('unknown')).toBe('Todos');
  });
});
