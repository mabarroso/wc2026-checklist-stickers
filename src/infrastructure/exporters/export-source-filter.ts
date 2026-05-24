import type { Sticker } from '../../domain/entities/Sticker';
import { StickerType } from '../../domain/value-objects/StickerType';

export type ExportSourceScope = 'panini' | 'extra' | 'coca_cola' | 'mcdonalds' | 'todos';

const PANINI_ID_PATTERN = /^[A-Za-z]{3}\d{2}$/;

const EXTRA_TYPES = new Set<StickerType>([
  StickerType.EXTRA_BASE,
  StickerType.EXTRA_BRONZE,
  StickerType.EXTRA_SILVER,
  StickerType.EXTRA_GOLD,
]);

const COCA_COLA_TYPES = new Set<StickerType>([
  StickerType.COCA_COLA_US,
  StickerType.COCA_COLA_LAM,
  StickerType.COCA_COLA_RW,
  StickerType.COCA_COLA_EU,
]);

export function normalizeExportSourceScope(scope: string): ExportSourceScope {
  const normalized = scope.trim().toLowerCase();
  if (normalized === 'panini') return 'panini';
  if (normalized === 'extra') return 'extra';
  if (normalized === 'coca_cola') return 'coca_cola';
  if (normalized === 'mcdonalds') return 'mcdonalds';
  return 'todos';
}

export function filterStickersByExportSource(stickers: Sticker[], scope: string): Sticker[] {
  const normalizedScope = normalizeExportSourceScope(scope);

  switch (normalizedScope) {
    case 'panini':
      return stickers.filter((sticker) => PANINI_ID_PATTERN.test(sticker.id));
    case 'extra':
      return stickers.filter((sticker) => EXTRA_TYPES.has(sticker.type));
    case 'coca_cola':
      return stickers.filter((sticker) => COCA_COLA_TYPES.has(sticker.type));
    case 'mcdonalds':
      return stickers.filter((sticker) => sticker.type === StickerType.MC_DONALDS);
    case 'todos':
    default:
      return stickers;
  }
}

export function getExportSourceLabel(scope: string): string {
  const normalizedScope = normalizeExportSourceScope(scope);

  switch (normalizedScope) {
    case 'panini':
      return 'Panini';
    case 'extra':
      return 'Extra';
    case 'coca_cola':
      return 'Coca cola';
    case 'mcdonalds':
      return "McDonald's";
    case 'todos':
    default:
      return 'Todos';
  }
}