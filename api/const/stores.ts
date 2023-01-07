import { scrapper } from '../common/scrapping-strategies';
import { Store } from '../model/product';

export const SEARCH_TXT_KEYWORD = '{searchText}';

export enum STORES_LIST {
  SPEEDLOGIC = 'SpeedLogic',
  IMAGEN_WORLD = 'Imagen World',
  TIERRA_GAMER_MEDELLIN = 'Tierra Gamer Medellin',
  CLONES_Y_PERIFERICOS = 'Clones y Perifericos',
  TAURET = 'Tauret',
  MERCADO_LIBRE = 'MercadoLibre',
  GAMERS_COLOMBIA = 'Gamers Colombia',
  TRADE_INN = 'Trade Inn',
  MUNDO_COMPUTO = 'Mundo Computo Armenia',
  NUEVO_WEBO = 'Nuevo Wevo',
}

export const STORES: Store[] = [
  {
    enableScrapping: true,
    name: STORES_LIST.SPEEDLOGIC,
    urlDomain: 'https://speedlogic.com.co',
    urlStore: 'https://partes.speedlogic.com.co/',
    queryEnable: false,
    scrapper,
    scrapping: {
      url: '',
      image: '',
      title: '',
      price: '',
    },
  },
  {
    name: STORES_LIST.IMAGEN_WORLD,
    enableScrapping: true,
    urlDomain: 'https://www.imagenworld.com',
    urlStore: 'https://www.imagenworld.com/xapps/listaprecios/3/a',
    queryEnable: false,
    scrapper,
    scrapping: {
      url: '',
      title: '',
      price: '',
      image: '',
    },
  },
  {
    name: STORES_LIST.TIERRA_GAMER_MEDELLIN,
    enableScrapping: true,
    urlDomain: 'https://www.tiendagamermedellin.co',
    urlStore: 'https://www.tiendagamermedellin.co/search?q={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: 'div.product-block__info > a',
      image: `img[class*='product-block__image']`,
      title: 'div.product-block__info > a',
      price:
        'body > div.main-container > section.container.page-gallery > div > div > div > div.product-block__info > div > span:nth-child(1)',
    },
  },
  {
    name: STORES_LIST.CLONES_Y_PERIFERICOS,
    enableScrapping: true,
    urlDomain: 'https://clonesyperifericos.com',
    urlStore:
      'https://clonesyperifericos.com/?s={searchText}&post_type=product&et_search=true',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: '.vc_custom_1644423010756 > a',
      image: `img[class*='wp-post-image']`,
      title: 'h2.product-title',
      price: 'span.woocommerce-Price-amount > bdi',
    },
  },
  {
    name: STORES_LIST.TAURET,
    enableScrapping: true,
    urlDomain: 'https://tauretcomputadores.com',
    urlStore:
      'https://tauretcomputadores.com/search_product?product_search={searchText}&product_search_slug=',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: '',
      image: 'a.image-link > img.img-fluid',
      title: 'div.name > a > h2',
      price: 'span.price1',
    },
  },
  {
    name: STORES_LIST.MERCADO_LIBRE,
    enableScrapping: true,
    urlDomain: 'https://mercadolibre.com.co',
    urlStore: 'https://listado.mercadolibre.com.co/{searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: 'a.ui-search-item__group__element',
      image: `img[class*='ui-search-result-image']`,
      title: 'h2.ui-search-item__title',
      price:
        'section > ol > li > div > div > div.ui-search-result__content-wrapper.shops__result-content-wrapper > div.ui-search-result__content-columns.shops__content-columns > div.ui-search-result__content-column.ui-search-result__content-column--left.shops__content-columns-left > div.ui-search-item__group.ui-search-item__group--price.shops__items-group > div > div > div > span.price-tag.ui-search-price__part.shops__price-part > span.price-tag-amount > span.price-tag-fraction',
    },
  },

  {
    name: STORES_LIST.GAMERS_COLOMBIA,
    enableScrapping: true,
    urlDomain: 'https://gamerscolombia.com',
    urlStore: 'https://gamerscolombia.com/tienda?productSearch={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: 'h3.product-title > a',
      image: 'a.product-thumb > img',
      title: 'h3.product-title > a',
      price: 'h4.product-price',
    },
  },
  {
    name: STORES_LIST.TRADE_INN,
    enableScrapping: true,
    urlDomain: 'https://www.tradeinn.com',
    urlStore:
      'https://www.tradeinn.com/techinn/es?products_search%5Bquery%5D={searchText}',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: '.zona_infoprod_busca',
      image: '',
      title: 'div.hit-name',
      price: 'div.hit-price',
    },
  },
  {
    name: STORES_LIST.MUNDO_COMPUTO,
    enableScrapping: true,
    urlDomain: 'https://mundocomputo.com',
    urlStore: 'https://mundocomputo.com/shop?search={searchText}&order=',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: '',
      image: '',
      title: 'h6 > a',
      price: 'div.product_price',
    },
  },
  {
    name: STORES_LIST.NUEVO_WEBO,
    enableScrapping: true,
    urlStore: 'https://nuevowevo.com/?s={searchText}',
    urlDomain: 'https://nuevowevo.com',
    queryEnable: true,
    scrapper,
    scrapping: {
      url: `a[class*='woocommerce-LoopProduct-link']`,
      image: `img[class*='attachment-woocommerce_thumbnail']`,
      title: 'h2.woocommerce-loop-product__title',
      price: 'span > bdi',
    },
  },
];
