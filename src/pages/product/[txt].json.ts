import { APIRoute } from 'astro';
const secret = import.meta.env.JWRT_SECRET;

export const get: APIRoute = async ({ request, params }) => {
  const { txt } = params;
  console.log(secret);

  const response = await fetch(
    `https://4gaming-query.nffigueroag.workers.dev/search/${txt}`
  );
  const json = await response.json();
  return new Response(JSON.stringify(json));
};
