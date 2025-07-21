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

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

// --- SITEMAP ROUTE ---
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Setup sitemap stream
    const smStream = new SitemapStream({ hostname: 'https://quizloai.com' });
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    const pipeline = smStream.pipe(createGzip());

    // Static routes
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    smStream.write({ url: '/about', changefreq: 'monthly' });

    // Example: Add dynamic blog routes (fetch from API/DB if needed)
    // const blogs = await getBlogSlugs();
    // blogs.forEach((b) => smStream.write({ url: `/blogs/${b}`, changefreq: 'weekly' }));

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
