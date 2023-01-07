import { STORES, STORES_LIST } from '../const/stores';
import { Product, Store, StoreScrapping } from '../model/product';
import { logError, logInfo } from './log';

export const initializeProductPayload = (): Product => {
  return {
    name: '',
    price: '',
    image: '',
    itemUrl: '',
    seller: {
      name: '',
      url: '',
    },
    offer: false,
  };
};

export const scrapper = (
  $: any,
  storeScrapping: StoreScrapping,
  storeName: STORES_LIST
): Product[] => {
  try {
    const { title, price, image, url } = storeScrapping;
    const { urlDomain } = STORES.find(
      (item: Store) => item.name === storeName
    ) as Store;

    let productList: Product[] = [];
    let product: Product = initializeProductPayload();

    $(title).each(function (index: number, element: any) {
      product = initializeProductPayload();
      product.name = String($(element).text());

      product.seller.name = String(storeName);
      product.seller.url = urlDomain;
      productList.push(product);
    });
    logInfo('********************Titles scrapped');
    let countProductList = 0;
    $(price).each(function (index: number, element: any) {
      const price = $(element)
        .text()
        .trim()
        .replace('$', '')
        .replace(/,/g, '')
        .replace(/\./g, '')
        .replace('pesos', '')
        .replace('COP', '');
      if (Number(price) && countProductList <= productList.length - 1) {
        productList[countProductList].price = price;
        countProductList++;
      }
    });
    logInfo('********************Url scrapped');

    $(url).each(function (index: number, item: any) {
      let url = $(item).attr('href');
      url = url.includes('.com') ? url : `${urlDomain}${url}`;
      productList[index].itemUrl = url;
    });
    logInfo('********************Url scrapped');

    $(image).each(function (index: number, item: any) {
      const image = $(item).attr('data-src') || $(item).attr('src');
      productList[index].image = image;
    });

    logInfo('********************Images scrapped');

    return productList;
  } catch (error) {
    logError(`**************** ${error} ${storeName} ****************`);
    return [];
  } finally {
    logInfo(`**************** Scrapping for ${storeName} done`);
  }
};
