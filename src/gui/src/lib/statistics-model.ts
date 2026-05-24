import type { Sticker } from '../data/stickers';
import { getPaniniGroupPrefixFromId, getStickerSection, type StickerSection } from './sticker-sections';

const PANINI_ID_PATTERN = /^[A-Za-z]{3}\d{2}$/;

export const STATISTICS_SECTION_ORDER: StickerSection[] = ['Panini', 'Extras', 'Coca Cola', "McDonald's"];

export interface SectionStat {
  owned: number;
  total: number;
  percentage: number;
}

export interface GroupStat {
  owned: number;
  total: number;
}

export interface TopDuplicate {
  id: string;
  qty: number;
  sticker?: Sticker;
}

export interface StatisticsModel {
  total: number;
  uniqueOwned: number;
  totalOwned: number;
  totalDuplicates: number;
  missing: number;
  percentage: number;
  sortedPaniniGroups: string[];
  groupStats: Record<string, GroupStat>;
  sectionStats: Record<StickerSection, SectionStat>;
  topDuplicates: TopDuplicate[];
}

function buildPaniniGroups(allStickers: Sticker[]): string[] {
  const groups = new Set<string>();
  allStickers.forEach((sticker) => {
    if (PANINI_ID_PATTERN.test(sticker.id)) {
      groups.add(sticker.id.substring(0, 3).toUpperCase());
    }
  });
  return [...groups].sort((a, b) => a.localeCompare(b));
}

export function computeStatisticsModel(
  allStickers: Sticker[],
  owned: Record<string, number>,
  duplicates: Record<string, number>,
): StatisticsModel {
  const total = allStickers.length;
  const uniqueOwned = allStickers.filter((sticker) => (owned[sticker.id] || 0) > 0).length;
  const totalOwned = Object.values(owned).reduce((a, b) => a + b, 0);
  const totalDuplicates = Object.values(duplicates).reduce((a, b) => a + b, 0);
  const missing = total - uniqueOwned;
  const percentage = total > 0 ? Math.round((uniqueOwned / total) * 100) : 0;

  const sectionStats: Record<StickerSection, SectionStat> = {
    Panini: { owned: 0, total: 0, percentage: 0 },
    Extras: { owned: 0, total: 0, percentage: 0 },
    'Coca Cola': { owned: 0, total: 0, percentage: 0 },
    "McDonald's": { owned: 0, total: 0, percentage: 0 },
  };

  allStickers.forEach((sticker) => {
    const section = getStickerSection(sticker.id);
    sectionStats[section].total += 1;
    if ((owned[sticker.id] || 0) > 0) {
      sectionStats[section].owned += 1;
    }
  });

  STATISTICS_SECTION_ORDER.forEach((section) => {
    const sectionTotal = sectionStats[section].total;
    sectionStats[section].percentage = sectionTotal > 0
      ? Math.round((sectionStats[section].owned / sectionTotal) * 100)
      : 0;
  });

  const sortedPaniniGroups = buildPaniniGroups(allStickers);

  const groupStats: Record<string, GroupStat> = {};
  sortedPaniniGroups.forEach((group) => {
    groupStats[group] = { owned: 0, total: 0 };
  });

  allStickers.forEach((sticker) => {
    if (getStickerSection(sticker.id) !== 'Panini') {
      return;
    }

    const group = getPaniniGroupPrefixFromId(sticker.id);
    if (!group || !groupStats[group]) {
      return;
    }

    groupStats[group].total += 1;
    if ((owned[sticker.id] || 0) > 0) {
      groupStats[group].owned += 1;
    }
  });

  const topDuplicates = Object.entries(duplicates)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, qty]) => ({
      id,
      qty,
      sticker: allStickers.find((sticker) => sticker.id === id),
    }));

  return {
    total,
    uniqueOwned,
    totalOwned,
    totalDuplicates,
    missing,
    percentage,
    sortedPaniniGroups,
    groupStats,
    sectionStats,
    topDuplicates,
  };
}