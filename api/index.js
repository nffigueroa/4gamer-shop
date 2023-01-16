import { Hono } from 'hono';
import { Scrapping } from '../src/common';

const app = new Hono();

app.get('/search/:searchText', async (c, next) => {
  const headerSecret = c.req.header()['secret'];
  const txt = c.req.param('searchText');
  if (!headerSecret || headerSecret !== c.env.JWT_SECRET) {
    return c.json({}, 401);
  }
  const search = await Scrapping.search(txt);

  return c.json({ search });
});

export default app;

/* return c.json({
  search: {
    store: 'Speelogic',
    results: [
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '900000',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '500000',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '900500',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '45345',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '333322',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
      {
        name: 'SOTAC 30303 ulta hdmi full hk 4k',
        price: '4444444',
        image:
          'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/18728151/resize/300/300?1634842238',
        itemUrl:
          'https://www.tiendagamermedellin.co/lhr-rtx-3070-gaming-z-trio-rgb-8gb-msi',
        seller: {
          name: 'Tierra Gamer Medellin',
        },
      },
    ],
  },
}); */
