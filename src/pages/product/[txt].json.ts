import { APIRoute } from 'astro';

export const get: APIRoute = async ({ request, params }) => {
  const { txt } = params;

  const response = await fetch(`http://127.0.0.1:8787/search/${txt}`);
  const json = await response.json();
  return new Response(JSON.stringify(json));
};
