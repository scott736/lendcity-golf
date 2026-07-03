import type { APIRoute } from 'astro';
import { getLlmsTxt } from '../lib/seo';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(getLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
