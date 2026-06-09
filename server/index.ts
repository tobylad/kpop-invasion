import { handleHealth } from './routes/health';
import { join } from 'path';

const ROOT = join(import.meta.dir, '..');
const PORT = Number(process.env.PORT ?? 3000);

function serveFile(filePath: string, contentType: string): Response | null {
  const file = Bun.file(filePath);
  if (!file.size) return null;
  return new Response(file, { headers: { 'Content-Type': contentType } });
}

function contentType(pathname: string): string {
  if (pathname.endsWith('.js'))  return 'application/javascript';
  if (pathname.endsWith('.css')) return 'text/css';
  if (pathname.endsWith('.png')) return 'image/png';
  if (pathname.endsWith('.svg')) return 'image/svg+xml';
  return 'text/plain';
}

const server = Bun.serve({
  port: PORT,

  async fetch(req) {
    const url = new URL(req.url);
    const { pathname } = url;

    // API routes
    if (pathname === '/api/health' && req.method === 'GET') {
      return handleHealth();
    }

    if (pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Static assets from dist/
    if (pathname.startsWith('/dist/')) {
      const asset = serveFile(join(ROOT, pathname), contentType(pathname));
      if (asset) return asset;
    }

    // Fallback: serve index.html for all non-asset routes (SPA)
    const html = serveFile(join(ROOT, 'index.html'), 'text/html');
    if (html) return html;

    return new Response('Not found', { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
