import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('egy-details.html', 'utf-8');
const $ = cheerio.load(html);

const links = [];
$('a').each((i, el) => {
    let t = $(el).text().trim() || '';
    let href = $(el).attr('href');
    if (href && !href.includes('.jpg')) {
        links.push(`${t.replace(/\s+/g, ' ')} => ${href}`);
    }
});

fs.writeFileSync('all-links.txt', links.join('\n'));
console.log("Wrote links to all-links.txt");
