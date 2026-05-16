declare module '../../data/stickers' {
  export interface StickerData {
    id: string;
    number: number;
    name: string;
    team: string;
    teamCode: string;
    group: string | null;
    type: string;
    extraVariant: string | null;
  }

  export function getAllStickers(): StickerData[];
  export function getStickerById(id: string): StickerData | undefined;
  export function getStickersByGroup(group: string): StickerData[];
  export function getStickersByTeam(teamCode: string): StickerData[];
  export function searchStickers(query: string): StickerData[];
  export const TOTAL_STICKERS: number;
}