import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';
import { globSync } from 'glob'; // For glob v10+, else use glob.sync
import path from 'path';

const dist = path.resolve(__dirname, '../dist/quizlo-app/browser');
const hostname = 'https://quizloai.com';

const htmlFiles = globSync('**/index.html', { cwd: dist, nodir: true });

const smStream = new SitemapStream({ hostname });
const writeStream = createWriteStream(path.join(dist, 'sitemap.xml'));
smStream.pipe(writeStream);

for (const file of htmlFiles) {
  const url = '/' + file.replace(/\/index\.html$/i, '').replace(/^index\.html$/i, '');
  smStream.write({ url: url === '/' ? '/' : url });
}

smStream.end();
writeStream.on('finish', () => console.log('sitemap.xml written'));
