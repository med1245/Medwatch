import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    try {
        // 1. Fetch HTML from EgyDead
        const response = await fetch('https://tv7.egydead.live/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from EgyDead' });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const content = [];

        // 2. Extract movie data across the page
        $('.movieItem').each((i, el) => {
            // Don't pull more than 20 items to keep payload small
            if (i >= 20) return;

            const a = $(el).find('a');
            const href = a.attr('href');
            const img = a.find('img').attr('src');
            const title = a.find('.BottomTitle').text().trim() || a.attr('title');
            const isSeries = href && (href.includes('/episode/') || href.includes('/season/'));

            if (title && href) {
                // Create an ID from the URL slug
                const urlParts = href.split('/').filter(Boolean);
                const slug = urlParts[urlParts.length - 1];

                content.push({
                    id: slug,
                    title: title,
                    poster: img,
                    type: isSeries ? 'series' : 'movie',
                    year: new Date().getFullYear(),
                    source: 'egydead',
                    originalUrl: href,   // we keep this so our frontend can dynamically construct the iframe
                    embedId: slug
                });
            }
        });

        // 3. Return JSON response (which the frontend will consume)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape EgyDead: ' + error.message });
    }
}
