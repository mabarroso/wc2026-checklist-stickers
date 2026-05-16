import stickersData from './stickers.json';

export interface Sticker {
  id: string;
  number: number;
  name: string;
  team: string;
  teamCode: string;
  group: string | null;
  type: string;
  extraVariant: string | null;
}

export const stickers: Sticker[] = stickersData as Sticker[];

export function getAllStickers(): Sticker[] {
  return stickers;
}

export function getStickerById(id: string): Sticker | undefined {
  return stickers.find((s) => s.id === id);
}

export function getStickersByGroup(group: string): Sticker[] {
  return stickers.filter((s) => s.group === group);
}

export function getStickersByTeam(teamCode: string): Sticker[] {
  return stickers.filter((s) => s.teamCode === teamCode);
}

export function searchStickers(query: string): Sticker[] {
  const lowerQuery = query.toLowerCase();
  return stickers.filter(
    (s) =>
      s.id.toLowerCase().includes(lowerQuery) ||
      s.name.toLowerCase().includes(lowerQuery) ||
      s.team.toLowerCase().includes(lowerQuery)
  );
}

export const TOTAL_STICKERS = stickers.length;