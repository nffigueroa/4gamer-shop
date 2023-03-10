import * as cheerio from 'cheerio';
import { SEARCH_TXT_KEYWORD, STORES, STORES_LIST } from '../const/stores';
import { SearchResponse } from '../model/product';
import { logError, logInfo, logSuccess } from './log';

export const Scrapping = {
  async loadHtml(uri: string): Promise<cheerio.CheerioAPI | null> {
    try {
      logInfo(`Scrapping aiming to ${uri}`);
      const res = await fetch(uri);

      const content = await res.text();

      return cheerio.load(content);
    } catch (error) {
      logError(`Fetch failed aiming to ${uri}`);
      logError(error);
      return null;
    }
  },
  async search(txt: string, countryCode: string): Promise<SearchResponse[]> {
    try {
      const { loadHtml } = Scrapping;
      const stores = STORES.filter(
        (store) => store.country.code === countryCode
      );
      let response: SearchResponse[] = [];
      for (let index = 0; index < stores.length; index++) {
        response.push({ store: '', results: [] });
        response[index].store = stores[index].name;
        const {
          scrapper,
          urlStore,
          name,
          queryEnable,
          enableScrapping,
          scrapping: { title, price, image, url },
        } = stores[index];
        if (enableScrapping) {
          const $ = await loadHtml(
            queryEnable ? urlStore.replace(SEARCH_TXT_KEYWORD, txt) : urlStore
          );
          logInfo(`Starting scrapping for  ${name}`);
          response[index].results = scrapper(
            $,
            { title, price, image, url },
            name as STORES_LIST,
            txt
          );
          response[index].totalProducts = response[index].results.length;
        }
      }
      response = response.sort(
        (a, b) => Number(b.totalProducts ?? 0) - Number(a.totalProducts ?? 0)
      );
      return response;
    } catch (error) {
      logError(error);
      return [];
    } finally {
      logSuccess('Scrapping done');
    }
  },
};
