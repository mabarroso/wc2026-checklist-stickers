const FIFA_TO_ISO: Record<string, string> = {
  ALG: 'dz', ARG: 'ar', AUS: 'au', AUT: 'at', BEL: 'be',
  BIH: 'ba', BRA: 'br', CAN: 'ca', CPV: 'cv', COL: 'co',
  COD: 'cd', CRO: 'hr', CUW: 'cw', CZE: 'cz', ECU: 'ec',
  EGY: 'eg', ENG: 'gb-eng', ESP: 'es', FRA: 'fr', GER: 'de',
  GHA: 'gh', HAI: 'ht', IRN: 'ir', IRQ: 'iq', JOR: 'jo',
  JPN: 'jp', KOR: 'kr', KSA: 'sa', MAR: 'ma', MEX: 'mx',
  NED: 'nl', NOR: 'no', NZL: 'nz', PAN: 'pa', PAR: 'py',
  POR: 'pt', QAT: 'qa', RSA: 'za', SCO: 'gb-sct', SEN: 'sn',
  SUI: 'ch', SWE: 'se', TUN: 'tn', TUR: 'tr', URU: 'uy',
  USA: 'us', UZB: 'uz', CIV: 'ci',
};

function isoToFlagEmoji(iso: string): string | null {
  if (iso === 'gb-eng') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}';
  if (iso === 'gb-sct') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}';

  const upper = iso.toUpperCase();
  if (upper.length !== 2) return null;

  const codePoints = upper.split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

export function getFlagEmoji(stickerId: string): string | null {
  const match = stickerId.match(/^([A-Z]{3})/);
  if (!match) return null;

  const fifaCode = match[1];
  const iso = FIFA_TO_ISO[fifaCode];
  if (!iso) return null;

  return isoToFlagEmoji(iso);
}
