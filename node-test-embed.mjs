import https from 'https';
import fs from 'fs';
import * as cheerio from 'cheerio';

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: data, headers: res.headers }));
        }).on('error', err => reject(err));
    });
}

async function run() {
    console.log("Fetching details page...");
    const res = await fetchHTML('https://tv7.egydead.live/avatar-fire-and-ash-2025-1080p-web-dl/');
    const $ = cheerio.load(res.data);

    // Find the Watch button that leads to the actual player page
    // The button usually has class like watchBtn or contains text "المشاهده"
    let watchUrl = '';
    $('a').each((i, el) => {
        const p = $(el).parent().html();
        // Usually the watch link might have 'watch' or specific classes. 
        // Wait, let's just dump all internal links that don't match the current URL exactly
        const href = $(el).attr('href');
        if (href && href.includes('egydead') && href !== 'https://tv7.egydead.live/avatar-fire-and-ash-2025-1080p-web-dl/' && $(el).text().includes('المشاهده')) {
            watchUrl = href;
        }
    });

    // If we can't find it by text, look for common patterns like .watch-btn
    if (!watchUrl) {
        watchUrl = $('.btn-watch').attr('href') || $('.watchBtn').attr('href') || $('a.watch').attr('href');
    }

    // A common pattern is `.btns.clearfix a:first-child` or similar. Let's dump the closest link.
    console.log("Watch URL found:", watchUrl);

    if (watchUrl) {
        console.log("Fetching watch page...");
        const watchRes = await fetchHTML(watchUrl);
        const $w = cheerio.load(watchRes.data);

        const iframes = [];
        $w('iframe').each((i, el) => {
            iframes.push($w(el).attr('src'));
        });
        console.log("IFRAMES ON WATCH PAGE:", iframes);

        // Look for lazy loaded or data-src iframes
        const dataSrc = [];
        $w('ul.servers_list li').each((i, el) => {
            dataSrc.push($w(el).attr('data-url'));
        });
        console.log("DATA_URL ON SERVERS LIST:", dataSrc);
    }
}

run();
