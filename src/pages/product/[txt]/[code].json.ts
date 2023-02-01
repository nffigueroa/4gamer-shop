import { APIRoute } from 'astro';
const { API_URL, JWT_SECRET } = import.meta.env;

export const get: APIRoute = async ({ request, params }) => {
  const { txt, code } = params;

  const response = await fetch(`${API_URL}/search/${txt}/${code}`, {
    headers: {
      secret: JWT_SECRET,
    },
  });
  const json = await response.json();
  return new Response(JSON.stringify(json));
};
