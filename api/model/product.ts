import { STORES_LIST } from '../const/stores';

export interface Product {
  name: string;
  price: string;
  image: string;
  seller: {
    name: string;
    url?: string;
  };
  offer?: boolean;
}

export interface Store {
  name: string;
  urlDomain?: string;
  urlStore: string;
  queryEnable: boolean;
  enableScrapping: boolean;
  scrapping: {
    title: string;
    price: string;
    image: string;
  };
  scrapper: (
    $: any,
    titleScrapping: string,
    priceScrapping: string,
    imageScrapping: string,
    storeName: STORES_LIST
  ) => Product[];
}
