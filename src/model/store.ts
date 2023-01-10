import { STORES_LIST } from '../const/stores';
import { Product, StoreScrapping } from './product';

export interface Store {
  name: string;
  id?: string;
  urlDomain?: string;
  urlStore: string;
  queryEnable: boolean;
  enableScrapping: boolean;
  scrapping: StoreScrapping;
  priceMultiple?: number;
  scrapper: (
    $: any,
    storeCrapping: StoreScrapping,
    storeName: STORES_LIST,
    searchTxt?: string
  ) => Product[];
}

export type StoreDetails = Omit<Store, 'scrapper'>;
