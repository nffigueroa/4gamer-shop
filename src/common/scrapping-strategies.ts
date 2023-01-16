import { STORES, STORES_LIST } from '../const/stores';
import { Product, StoreScrapping } from '../model/product';
import { Store } from '../model/store';
import { logError, logInfo } from './log';
import { cleanNumberValue } from './util';

export const initializeProductPayload = (): Product => {
  return {
    name: '',
    price: '',
    image: '',
    itemUrl: '',
    seller: {
      name: '',
      url: '',
      favicon: '',
    },
    offer: false,
  };
};

/**
 * It takes a cheerio object, a store scrapping object and a store name and returns a list of products
 * @param {any} $ - any,
 * @param {StoreScrapping} storeScrapping - StoreScrapping
 * @param {STORES_LIST} storeName - The name of the store you want to scrape.
 * @returns A function that takes in 3 parameters and returns an array of products.
 */
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
    const favicon = $(`link[rel~='icon']`).attr('href');
    $(title).each(function (index: number, element: any) {
      product = initializeProductPayload();
      product.name = String($(element).text());

      product.seller.name = String(storeName);
      product.seller.url = urlDomain;
      product.seller.favicon = favicon.includes('.com')
        ? favicon
        : `${urlDomain}${favicon}`;
      productList.push(product);
    });
    logInfo('********************Titles scrapped');
    let countProductList = 0;
    $(price).each(function (index: number, element: any) {
      logInfo($(element).text());
      if ($(element).children().length > 1) {
        const price = cleanNumberValue(
          $(element).children(':nth-child(1)').text()
        );
        productList[countProductList].price = price;
        countProductList++;
        return;
      } else {
        const price = cleanNumberValue($(element).text());
        if (Number(price) && countProductList <= productList.length - 1) {
          productList[countProductList].price = price;
          countProductList++;
        }
      }
    });
    logInfo('********************Url scrapped');

    $(url).each(function (index: number, item: any) {
      let url = $(item).attr('href');
      url = url.includes('.com') ? url : `${urlDomain}${url}`;
      productList[index].itemUrl = url;
    });

    $(image).each(function (index: number, item: any) {
      const image = $(item).attr('data-src') || $(item).attr('src');
      productList[index].image = image;
      logInfo(`******************** Product Built`);
    });

    return productList;
  } catch (error) {
    logError(`********************${error} ${storeName} ********************`);
    return [];
  } finally {
    logInfo(`******************** Scrapping for ${storeName} done`);
  }
};

export const scrapWebAsLists = (
  $: any,
  storeScrapping: StoreScrapping,
  storeName: STORES_LIST,
  searchTxt?: string
): Product[] => {
  try {
    let productList: Product[] = [];
    let product: Product = initializeProductPayload();
    const favicon = $(`link[rel~='icon']`).attr('href');

    const {
      urlStore,
      priceMultiple = null,
      urlDomain,
    } = STORES.find((item: Store) => item.name === storeName) as Store;

    $('tbody > tr > td')
      .filter(function (index: number, element: any) {
        return $(element).text().includes(searchTxt);
      })
      .each(function (index: number, element: any) {
        logInfo(`******************** Titles scrapped`);
        const price = cleanNumberValue(
          String(
            $(element)
              .nextAll()
              .filter(function (index: number, element: any) {
                return Boolean(Number(cleanNumberValue($(element).text())));
              })
              .text()
          )
        );
        logInfo(`******************** Prices scrapped`);

        if (Number(price)) {
          product = initializeProductPayload();
          product.name = $(element).text();
          product.price = String(
            priceMultiple ? Number(price) * priceMultiple : price
          );
          product.seller.name = storeName;
          product.seller.url = urlStore;
          product.itemUrl = urlStore;
          product.seller.favicon = favicon.includes('.com')
            ? favicon
            : `${urlDomain}${favicon}`;
          productList.push(product);
        }
        logInfo(`******************** Product Built`);
      });
    return productList;
  } catch (error) {
    logError(`**************** ${error} ${storeName} ****************`);
    return [];
  } finally {
    logInfo(`**************** Scrapping for ${storeName} done`);
  }
};
