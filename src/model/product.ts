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
  title: string[] | string;
  price: string[] | string;
  image: string;
  url: string;
}

export interface SearchResponse {
  store: string;
  results: Product[];
}
