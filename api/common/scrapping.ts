import * as cheerio from 'cheerio';
import { SEARCH_TXT_KEYWORD, STORES, STORES_LIST } from '../const/stores';

export const Scrapping = {
  async loadHtml(uri: string) {
    const res = await fetch(uri);

    const content = await res.text();

    return cheerio.load(content);
  },
  async search(txt: string) {
    let productList = [];
    try {
      const { loadHtml } = Scrapping;
      const stores = STORES;
      for (let index = 0; index < stores.length; index++) {
        const {
          scrapper,
          urlStore,
          name,
          queryEnable,
          enableScrapping,
          scrapping: { title, price, image },
        } = stores[index];
        if (queryEnable && enableScrapping) {
          const $ = await loadHtml(urlStore.replace(SEARCH_TXT_KEYWORD, txt));
          console.log('Entrando al scrapper', name);
          console.log($('h2.ui-search-item__title').html());

          productList.push(
            scrapper($, title, price, image, name as STORES_LIST)
          );
        }
      }
      return productList;
    } catch (error) {
      console.log(error);
    }
  },
};
