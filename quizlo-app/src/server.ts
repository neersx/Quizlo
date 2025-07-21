import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'node:zlib';
import { environment } from './environments/environment';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

async function getBlogSlugs(): Promise<{ url: string; lastmod?: string }[]> {
  try {
    // Replace with your actual API endpoint that returns blog slugs
    const response = await fetch(environment.apiUrl + '/blogs/all-titles');
    if (!response.ok) {
      throw new Error(`Failed to fetch blog slugs: ${response.statusText}`);
    }

    const blogs = await response.json();

    // Assuming API returns [{ slug: 'blog-title', updatedAt: '2025-07-20' }, ...]
    return blogs?.data.map((b: any) => ({
      url: b.slug,
      lastmod: b.updatedAt ?? new Date().toISOString().split('T')[0],
    }));
  } catch (err) {
    console.error('Error fetching blog slugs:', err);
    return [];
  }
}


// --- SITEMAP ROUTE ---
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Setup sitemap stream
    const smStream = new SitemapStream({ hostname: 'https://quizloai.com' });
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    const pipeline = smStream.pipe(createGzip());

    // Static routes
    const lastMod = '2025-07-21T09:45:51+00:00';
    smStream.write({ url: '/', lastmod: lastMod, priority: 1.0 });
    smStream.write({ url: '/auth/login', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/test/select-exam', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/test', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/blogs', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/faqs', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/report-abuse', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/cancellation-and-refund-policy', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/terms-and-conditions', lastmod: lastMod, priority: 0.8 });
    smStream.write({ url: '/privacy-policy', lastmod: lastMod, priority: 0.8 });

    // Example: Add dynamic blog routes (fetch from API/DB if needed)
    const blogs = await getBlogSlugs();
    blogs.forEach((b: any) => smStream.write({ url: b.url, changefreq: 'weekly' }));

    smStream.end();

    streamToPromise(pipeline).then((sm) => res.send(sm)).catch(console.error);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// --- Static files ---
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// --- Angular SSR ---
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// --- Server startup ---
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// --- Angular CLI handler ---
export const reqHandler = createNodeRequestHandler(app);
