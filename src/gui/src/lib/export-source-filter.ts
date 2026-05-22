import type { Sticker } from '../data/stickers';

export type GuiExportSourceScope = 'panini' | 'extra' | 'coca_cola' | 'mcdonalds' | 'todos';

const PANINI_TYPES = new Set<string>(['logo', 'fwc_special', 'team_badge', 'player', 'panini_extra']);
const EXTRA_TYPES = new Set<string>(['extra_base', 'extra_bronze', 'extra_silver', 'extra_gold']);
const COCA_COLA_TYPES = new Set<string>(['cocacola_us', 'cocacola_lam', 'cocacola_rw', 'cocacola_eu']);

export function normalizeGuiExportSourceScope(scope: string): GuiExportSourceScope {
  const normalized = scope.trim().toLowerCase();
  if (normalized === 'panini') return 'panini';
  if (normalized === 'extra') return 'extra';
  if (normalized === 'coca_cola') return 'coca_cola';
  if (normalized === 'mcdonalds') return 'mcdonalds';
  return 'todos';
}

export function filterGuiStickersByExportSource(stickers: Sticker[], scope: string): Sticker[] {
  const normalizedScope = normalizeGuiExportSourceScope(scope);

  switch (normalizedScope) {
    case 'panini':
      return stickers.filter((sticker) => PANINI_TYPES.has(sticker.type));
    case 'extra':
      return stickers.filter((sticker) => EXTRA_TYPES.has(sticker.type));
    case 'coca_cola':
      return stickers.filter((sticker) => COCA_COLA_TYPES.has(sticker.type));
    case 'mcdonalds':
      return stickers.filter((sticker) => sticker.type === 'mcdonalds');
    case 'todos':
    default:
      return stickers;
  }
}

export function getGuiExportSourceLabel(scope: string): string {
  const normalizedScope = normalizeGuiExportSourceScope(scope);

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