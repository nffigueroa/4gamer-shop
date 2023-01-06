import { Store } from '../model/product';

export const SEARCH_TXT_KEYWORD = '{searchText}';

export const STORES: Store[] = [
  {
    name: 'SpeedLogic',
    url: 'https://partes.speedlogic.com.co/',
    queryEnable: false,
  },
  {
    name: 'Imagen World',
    url: 'https://www.imagenworld.com/xapps/listaprecios/3/a',
    queryEnable: false,
  },
  {
    name: 'Tierra Gamer Medellin',
    url: 'https://www.tiendagamermedellin.co/search?q={searchText}',
    queryEnable: true,
  },
  {
    name: 'Clones y Perifericos',
    url: 'https://clonesyperifericos.com/?s={searchText}&post_type=product&et_search=true',
    queryEnable: true,
  },
  {
    name: 'Tauret',
    url: 'https://tauretcomputadores.com/search_product?product_search={searchText}',
    queryEnable: true,
  },
  {
    name: 'MercadoLibre',
    url: 'https://listado.mercadolibre.com.co/{searchText}',
    queryEnable: true,
  },

  {
    name: 'Gamers Colombia',
    url: 'https://gamerscolombia.com/tienda?productSearch={searchText}',
    queryEnable: true,
  },
  {
    name: 'Trade Inn',
    url: 'https://www.tradeinn.com/techinn/es?products_search%5Bquery%5D={searchText}',
    queryEnable: true,
  },
  {
    name: 'Mundo Computo Armenia',
    url: 'https://mundocomputo.com/shop?search=3070&order=',
    queryEnable: true,
  },
  {
    name: 'lasus',
    url: 'https://lasus.com.co/#/5534cd61-3ff5-46e2-802d-0598d044b3c3/fullscreen/autofilters=true&filter[categories][]=Tecnolog%C3%ADa&page=3&query={searchText}&query_name=fuzzy&rpp=20',
    queryEnable: true,
  },
];
