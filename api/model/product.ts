import { STORES_LIST } from '../const/stores';

export interface Product {
  name: string;
  price: string;
  image: string;
  itemUrl: string;
  seller: {
    name: string;
    url?: string;
  };
  offer?: boolean;
}

export interface StoreScrapping {
  title: string;
  price: string;
  image: string;
  url: string;
}

export interface SearchResponse {
  store: string;
  results: Product[];
}

export interface Store {
  name: string;
  urlDomain?: string;
  urlStore: string;
  queryEnable: boolean;
  enableScrapping: boolean;
  scrapping: StoreScrapping;
  scrapper: (
    $: any,
    storeCrapping: StoreScrapping,
    storeName: STORES_LIST
  ) => Product[];
}
