import { Product, SearchResponse } from '../model/product';

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

export const getTotalProductsFromResponse = (
  response: SearchResponse[]
): number => {
  let acum = 0;
  response.forEach((item: SearchResponse) => {
    acum += Number(item.totalProducts ?? 0);
  });
  return acum;
};

export const orderProductsByPrice = (
  products: Product[],
  orderByPrice: boolean
): Product[] =>
  products.sort((a, b) =>
    orderByPrice
      ? Number(b.price) - Number(a.price)
      : Number(a.price) - Number(b.price)
  );
