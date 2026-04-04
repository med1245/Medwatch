import https from 'https';
import fs from 'fs';

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: data }));
        }).on('error', err => reject(err));
    });
}

async function run() {
    const res = await fetchHTML('https://tv7.egydead.live/');
    fs.writeFileSync('egydead.html', res.data);
    const res2 = await fetchHTML('https://web4412x.faselhdx.bid/main');
    fs.writeFileSync('faselhdx.html', res2.data);
    console.log("Written HTML to disk.");
}

run();
