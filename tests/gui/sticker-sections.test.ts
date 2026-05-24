import {
  getPaniniGroupPrefixFromId,
  getStickerIdFix,
  getStickerSection,
  isStickerInSection,
} from '../../src/gui/src/lib/sticker-sections';

describe('sticker sections', () => {
  it('classifies 3-letter + 2-digit IDs as Panini', () => {
    expect(getStickerSection('MEX01')).toBe('Panini');
    expect(getStickerSection('ARG02')).toBe('Panini');
    expect(getStickerSection('FWC05')).toBe('Panini');
  });

  it('classifies sticker 0 as Extras (no longer Panini)', () => {
    expect(getStickerSection('0')).toBe('Extras');
  });

  it('rejects IDs with extra characters from Panini', () => {
    expect(getStickerSection('PAN13x')).toBe('Extras');
    expect(getStickerSection('ARG01S')).toBe('Extras');
  });

  it('classifies any 3-letter + 2-digit ID as Panini (even unknown prefixes)', () => {
    expect(getStickerSection('LEG01')).toBe('Panini');
    expect(getStickerSection('XYZ99')).toBe('Panini');
  });

  it('classifies Coca Cola IDs by CC- prefix', () => {
    expect(getStickerSection('CC-EU07')).toBe('Coca Cola');
    expect(getStickerSection('CC-US01')).toBe('Coca Cola');
  });

  it("classifies McDonald's IDs by mc suffix", () => {
    expect(getStickerSection('AUS13mc')).toBe("McDonald's");
  });

  it('classifies non matching IDs as Extras', () => {
    expect(getStickerSection('0')).toBe('Extras');
    expect(getStickerSection('foo')).toBe('Extras');
    expect(getStickerSection('ABCD01')).toBe('Extras');
  });

  it('extracts Panini group prefix from 3-letter prefix', () => {
    expect(getPaniniGroupPrefixFromId('ARG12')).toBe('ARG');
    expect(getPaniniGroupPrefixFromId('CC-EU07')).toBeNull();
    expect(getPaniniGroupPrefixFromId('0')).toBeNull();
    expect(getPaniniGroupPrefixFromId('AUS13mc')).toBeNull();
  });

  it('extracts ID_FIX for regular, Coca Cola and other IDs', () => {
    expect(getStickerIdFix('ARG12')).toBe('ARG');
    expect(getStickerIdFix('CC-EU07')).toBe('CC-EU');
    expect(getStickerIdFix('0')).toBe('0');
  });

  it('checks membership by section including Todas', () => {
    expect(isStickerInSection('CC-EU07', 'Coca Cola')).toBe(true);
    expect(isStickerInSection('CC-EU07', 'Panini')).toBe(false);
    expect(isStickerInSection('CC-EU07', 'Todas')).toBe(true);
  });
});
