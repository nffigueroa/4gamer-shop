import { STORES_LIST } from '../const/stores';
import { Product, StoreScrapping } from './product';
import { Country } from './country';

export interface Store {
  name: string;
  id?: string;
  country: Country;
  urlDomain?: string; // host domain of store e.g. http://speedlogic.com
  urlStore: string; // Url where the store exposes the query e.g. https://www.tiendagamermedellin.co/search?q={searchText}
  queryEnable: boolean; // Meaning that the store is query scrapping enabled.
  enableScrapping: boolean; // Store enabled for scrapping process.
  scrapping: StoreScrapping; // Selectors for scrapping.
  priceMultiple?: number; // Some stores has prices such as : 345 meaning that $345.000 , this property times the values obtained from store in order to have a real value.
  scrapper: (
    $: any,
    storeCrapping: StoreScrapping,
    storeName: STORES_LIST,
    searchTxt?: string
  ) => Product[];
}

export type StoreDetails = Omit<Store, 'scrapper'>;
