import https from 'https';

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: data.substring(0, 1000) }));
        }).on('error', err => reject(err));
    });
}

async function testSite(url, name) {
    try {
        console.log(`\nTesting ${name}...`);
        const res = await fetchHTML(url);
        console.log(`Status: ${res.status}`);
        if (res.data.includes('Cloudflare') || res.data.includes('Just a moment')) {
            console.log(`Blocked by Cloudflare/Bot Protection. (Anti-bot detected)`);
        } else {
            console.log(`Success! Fetched HTML snippet:\n${res.data.substring(0, 200)}...`);
        }
    } catch (err) {
        console.error(`Error fetching ${name}:`, err.message);
    }
}

async function run() {
    await testSite('https://tv7.egydead.live/', 'EgyDead');
    await testSite('https://web4412x.faselhdx.bid/main', 'FaselHD');
}

run();
