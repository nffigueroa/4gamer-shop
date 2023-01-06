export interface Product {
  name: string;
  price: string;
  seller: {
    name: string;
    url: string;
  };
  offer?: boolean;
}

export interface Store {
  name: string;
  url: string;
  queryEnable: boolean;
}
