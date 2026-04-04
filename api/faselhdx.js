import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://web4412x.faselhdx.bid/main', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from FaselHD' });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const content = [];

        $('.postDiv').each((i, el) => {
            if (i >= 20) return;

            const a = $(el).find('a');
            const href = a.attr('href');
            const img = a.find('img').attr('data-src') || a.find('img').attr('src');
            const title = $(el).find('.postInner .title').text().trim() || a.attr('title');
            const isSeries = href && (href.includes('/series') || href.includes('/episodes'));

            if (title && href) {
                const urlParts = href.split('/').filter(Boolean);
                const slug = urlParts[urlParts.length - 1];

                content.push({
                    id: slug,
                    title: title,
                    poster: img,
                    type: isSeries ? 'series' : 'movie',
                    year: new Date().getFullYear(),
                    source: 'faselhdx',
                    originalUrl: href,
                    embedId: slug
                });
            }
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape FaselHD: ' + error.message });
    }
}
