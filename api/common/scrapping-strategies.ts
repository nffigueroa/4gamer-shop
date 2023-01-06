import { STORES, STORES_LIST } from '../const/stores';
import { Product, Store } from '../model/product';

export const initializeProductPayload = (): Product => {
  return {
    name: '',
    price: '',
    image: '',
    seller: {
      name: '',
      url: '',
    },
    offer: false,
  };
};

export const scrapper = (
  $: any,
  titleScrapping: string,
  priceScrapping: string,
  imageScrapping: string,
  storeName: STORES_LIST
): Product[] => {
  try {
    console.log(
      '********************Iniciando Scrapping de ',
      storeName,
      titleScrapping
    );

    let productList: Product[] = [];
    let product: Product = initializeProductPayload();

    $(titleScrapping).each(function (index: number, element: any) {
      console.log($(element).text());

      product = initializeProductPayload();
      product.name = String($(element).text());

      product.seller.name = String(storeName);
      product.seller.url = STORES.find(
        (item: Store) => item.name === storeName
      )?.urlDomain;
      productList.push(product);
    });
    let indexProductCount = 0;
    console.log('Calcular Precios');

    $(priceScrapping).each(function (index: number, element: any) {
      const price = $(element)
        .text()
        .trim()
        .replace('$', '')
        .replace(/,/g, '')
        .replace(/\./g, '')
        .replace('COP', '');
      console.log(price);

      if (Number(price) && indexProductCount <= productList.length - 1) {
        productList[indexProductCount].price = price;
        indexProductCount++;
      }
    });
    return productList;
  } catch (error) {
    console.log('*****************', error, storeName);
    return [];
  }
};

export const scrapImages = ($: any, imageKey: string): string[] => {
  console.log($(imageKey).html());

  let imageBase64 = [];
  $(imageKey)
    .html()
    .each((item: any) => {
      console.log($(item).text());
      /* imageBase64.push($(item).text()); */
    });

  return [];
};
