import * as cheerio from 'cheerio';
import { SEARCH_TXT_KEYWORD, STORES } from '../const/stores';

export const Scrapping = {
  async loadHtml(uri: string) {
    const res = await fetch(uri);
    console.log(uri);

    const content = await res.text();

    return cheerio.load(content);
  },
  searchTitle(elements: any, txt: string) {
    let productName = '';
    if (
      elements?.attributes[0]?.value.includes(txt) &&
      productName.length < elements?.attributes[0]?.value.length &&
      elements.tagName !== 'img'
    ) {
      productName = elements?.attributes[0]?.value;
    }
    return productName;
  },
  searchPrice(elements: any) {
    let productPrice = '';
    const reg = new RegExp(/^-?\d+\.?\d*$/);
    if (['span', 'div'].includes(elements.tagName)) {
      productPrice = elements?.attributes[0]?.value;
    }
    return productPrice;
  },
  async search(txt: string) {
    try {
      const { loadHtml, searchTitle, searchPrice } = Scrapping;
      const stores = STORES;

      const $ = await loadHtml(stores[2].url.replace(SEARCH_TXT_KEYWORD, txt));
      const elements = $('body').children();
      console.log($('body')[0].children, 'lelelelelelele');

      let productName = '';
      let productPrice = '';
      for (let index = 0; index < elements.length; index++) {
        productName = searchTitle(elements[index], txt)
          ? searchTitle(elements[index], txt)
          : productName;
        productPrice = searchPrice(elements[index])
          ? searchPrice(elements[index])
          : productPrice;
      }
    } catch (error) {
      console.log(error, 'Errororororo');
    }
  },
};
