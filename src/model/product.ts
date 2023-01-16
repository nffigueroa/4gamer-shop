export interface Product {
  name: string;
  price: string;
  image: string;
  itemUrl: string; // Url that leads to the store with more product details.
  seller: {
    name: string;
    url?: string;
    favicon: string;
  };
  offer?: boolean; // TODO: pending to implement
}

// Selectors for scrapping
export interface StoreScrapping {
  title: string[] | string; // Main label that shows the product name.
  price: string[] | string; // Main element that contains the price of the product.
  image: string; // Element that contains the image in the store.
  url: string; // Main of the store , in theirs card's products has a link for redirecting the user to another link which contains details about the product.
}

export interface SearchResponse {
  totalProducts?: number;
  store: string;
  results: Product[];
}

export type SearchResults = SearchResponse & { selected: boolean };
