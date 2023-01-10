/**
 * It takes a string, trims it, removes all commas, periods, dollar signs, and the words "pesos" and
 * "COP" from it, and returns the result
 * @param {string} number - string
 */
export const cleanNumberValue = (number: string): string =>
  number
    .trim()
    .replace('$', '')
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace('pesos', '')
    .replace('COP', '');
