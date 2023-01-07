import { Hono } from 'hono';
import { Scrapping } from './common';

const app = new Hono();

app.get('/search/:searchText', async (c) => {
  const txt = c.req.param('searchText');
  const search = await Scrapping.search(txt);
  return c.json({ search });
});

export default app;
