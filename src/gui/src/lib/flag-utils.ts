import * as flags from 'country-flag-icons/string/3x2';

const FIFA_TO_ISO: Record<string, string> = {
  ALG: 'dz', ARG: 'ar', AUS: 'au', AUT: 'at', BEL: 'be',
  BIH: 'ba', BRA: 'br', CAN: 'ca', CPV: 'cv', COL: 'co',
  COD: 'cd', CRO: 'hr', CUW: 'cw', CZE: 'cz', ECU: 'ec',
  EGY: 'eg', ENG: 'gb', ESP: 'es', FRA: 'fr', GER: 'de',
  GHA: 'gh', HAI: 'ht', IRN: 'ir', IRQ: 'iq', JOR: 'jo',
  JPN: 'jp', KOR: 'kr', KSA: 'sa', MAR: 'ma', MEX: 'mx',
  NED: 'nl', NOR: 'no', NZL: 'nz', PAN: 'pa', PAR: 'py',
  POR: 'pt', QAT: 'qa', RSA: 'za', SCO: 'gb', SEN: 'sn',
  SUI: 'ch', SWE: 'se', TUN: 'tn', TUR: 'tr', URU: 'uy',
  USA: 'us', UZB: 'uz', CIV: 'ci',
};

export function getFlagSvg(stickerId: string): string | null {
  const match = stickerId.match(/^([A-Z]{3})/);
  if (!match) return null;

  const fifaCode = match[1];
  const iso = FIFA_TO_ISO[fifaCode];
  if (!iso) return null;

  return (flags as Record<string, string>)[iso.toUpperCase()] ?? null;
}
