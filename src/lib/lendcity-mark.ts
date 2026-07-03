/** Unicode trademark for plain-text contexts (titles, meta, email). */
export const LENDCITY_TM = 'LendCity™';

const TM_HTML =
  '<sup class="ml-px text-[0.45em] font-normal align-super leading-none opacity-90">TM</sup>';

/** Plain text: LendCity → LendCity™ */
export function lendCityText(text: string): string {
  return text.replace(/LendCity(?!™)/g, LENDCITY_TM);
}

/** HTML: LendCity → LendCity with small superscript TM */
export function lendCityMarkup(text: string): string {
  return text.replace(/LendCity(?!™)/g, `LendCity${TM_HTML}`);
}
