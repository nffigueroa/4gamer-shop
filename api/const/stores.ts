import { scrapper } from '../common/scrapping-strategies';
import { Store } from '../model/product';

export const SEARCH_TXT_KEYWORD = '{searchText}';

export enum STORES_LIST {
  SPEEDLOGIC = 'SpeedLogic',
  IMAGEN_WORLD = 'Imagen World',
  TIERRA_GAMER_MEDELLIN = 'Tierra Gamer Medellin',
  CLONES_Y_PERIFERICOS = 'Clones y Perifericos',
  TAURET = 'Tauret',
  MERCADOLIBRE = 'MercadoLibre',
  GAMERS_COLOMBIA = 'Gamers Colombia',
  TRADE_INN = 'Trade Inn',
  MUNDO_COMPUTO = 'Mundo Computo Armenia',
  NUEVOWEBO = 'Nuevo Wevo',
}

export const STORES: Store[] = [
  {
    enableScrapping: false,
    name: STORES_LIST.SPEEDLOGIC,
    urlStore: 'https://partes.speedlogic.com.co/',
    queryEnable: false,
    scrapper,
    scrapping: {
      image: '',
      title: '',
      price: '',
    },
  },
  {
    name: STORES_LIST.IMAGEN_WORLD,
    enableScrapping: false,
    urlStore: 'https://www.imagenworld.com/xapps/listaprecios/3/a',
    queryEnable: false,
    scrapper,
    scrapping: {
      title: '',
      price: '',
      image: '',
    },
  },
  {
    name: STORES_LIST.TIERRA_GAMER_MEDELLIN,
    enableScrapping: false,
    urlStore: 'https://www.tiendagamermedellin.co/search?q={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'div.product-block__info > a',
      price:
        'body > div.main-container > section.container.page-gallery > div > div > div > div.product-block__info > div > span:nth-child(1)',
    },
  },
  {
    name: STORES_LIST.CLONES_Y_PERIFERICOS,
    enableScrapping: false,
    urlStore:
      'https://clonesyperifericos.com/?s={searchText}&post_type=product&et_search=true',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'h2.product-title',
      price: 'bdi',
    },
  },
  {
    name: STORES_LIST.TAURET,
    enableScrapping: false,
    urlStore:
      'https://tauretcomputadores.com/search_product?product_search={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: 'a.image-link > img.img-fluid',
      title: 'div.name > a > h2',
      price: 'span.price1',
    },
  },
  {
    name: STORES_LIST.MERCADOLIBRE,
    enableScrapping: true,
    urlStore: 'https://listado.mercadolibre.com.co/{searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: 'div.slick-slide',
      title: 'h2.ui-search-item__title',
      price: 'span.price-tag-fraction',
    },
  },

  {
    name: STORES_LIST.GAMERS_COLOMBIA,
    enableScrapping: false,
    urlStore: 'https://gamerscolombia.com/tienda?productSearch={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'h3.product-title > a',
      price: 'h4.product-price',
    },
  },
  {
    name: STORES_LIST.TRADE_INN,
    enableScrapping: false,
    urlStore:
      'https://www.tradeinn.com/techinn/es?products_search%5Bquery%5D={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'div.hit-name',
      price: 'div.hit-price',
    },
  },
  {
    name: STORES_LIST.MUNDO_COMPUTO,
    enableScrapping: false,
    urlStore: 'https://mundocomputo.com/shop?search={searchText}&order=',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'h6 > a',
      price: 'div.product_price',
    },
  },
  {
    name: STORES_LIST.NUEVOWEBO,
    enableScrapping: false,
    urlStore: 'https://nuevowevo.com/?s={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      image: '',
      title: 'h2.woocommerce-loop-product__title',
      price: 'span > bdi',
    },
  },
];
