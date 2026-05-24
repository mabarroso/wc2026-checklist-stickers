export type StickerSection = 'Panini' | 'Coca Cola' | "McDonald's" | 'Extras';

const PANINI_ID_PATTERN = /^[A-Za-z]{3}\d{2}$/;

export function getStickerSection(id: string): StickerSection {
  if (id.startsWith('CC-')) {
    return 'Coca Cola';
  }

  if (id.endsWith('mc')) {
    return "McDonald's";
  }

  if (PANINI_ID_PATTERN.test(id)) {
    return 'Panini';
  }

  return 'Extras';
}

export function getPaniniGroupPrefixFromId(id: string): string | null {
  if (PANINI_ID_PATTERN.test(id)) {
    return id.substring(0, 3).toUpperCase();
  }

  return null;
}

export function getStickerIdFix(id: string): string {
  if (id.startsWith('CC-')) {
    const match = id.match(/^CC-[A-Z]+/);
    return match ? match[0] : 'CC';
  }

  const alphaPrefix = id.match(/^[A-Z]+/);
  if (alphaPrefix) {
    return alphaPrefix[0];
  }

  return id;
}

export function isStickerInSection(id: string, section: StickerSection | 'Todas'): boolean {
  if (section === 'Todas') {
    return true;
  }

  return getStickerSection(id) === section;
}