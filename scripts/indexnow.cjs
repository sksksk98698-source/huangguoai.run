/**
 * IndexNow Submission Utility for huangguoai.run
 * Compatible with Microsoft Bing, Yandex, Seznam, Naver
 * 
 * Usage:
 *   node scripts/indexnow.cjs [url1] [url2] ...
 *   node scripts/indexnow.cjs --all
 *   node scripts/indexnow.cjs --recent
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'huangguoai.run';
const KEY = 'eb8a5d3f2901416bb5a109e995e8b4cb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST_DIR = path.join(__dirname, '..', 'docs', '.vitepress', 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

function getUrlsFromSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`❌ Sitemap not found at: ${SITEMAP_PATH}. Please run npm run docs:build first.`);
    return [];
  }
  const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const locRegex = /<loc>(https:\/\/huangguoai\.run\/[^<]*)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.log('ℹ️ No URLs to submit to IndexNow.');
    return;
  }

  // Deduplicate and cap at 10,000 per request as per IndexNow API spec
  const uniqueUrls = Array.from(new Set(urls)).slice(0, 10000);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  console.log(`📡 Sending IndexNow request for ${uniqueUrls.length} URLs to api.indexnow.org...`);

  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ IndexNow submission successful! HTTP ${res.statusCode}`);
        console.log(`🔗 Target Search Engines: Microsoft Bing, Yandex, Seznam, Naver`);
      } else {
        console.warn(`⚠️ IndexNow returned HTTP ${res.statusCode}: ${responseData || 'Check response headers'}`);
      }
    });
  });

  req.on('error', (e) => {
    console.warn(`⚠️ Network note: IndexNow request encountered: ${e.message}`);
    console.log(`ℹ️ This is normal in offline or local build environments. When deployed on the live server, IndexNow will notify search engines instantly.`);
  });

  req.write(payload);
  req.end();
}

// CLI argument handling
const args = process.argv.slice(2);

if (args.includes('--all')) {
  const allUrls = getUrlsFromSitemap();
  console.log(`Found ${allUrls.length} URLs in sitemap.`);
  submitToIndexNow(allUrls);
} else if (args.length > 0 && !args[0].startsWith('--')) {
  // Direct URL arguments
  const passedUrls = args.map(u => u.startsWith('http') ? u : `https://${HOST}${u.startsWith('/') ? '' : '/'}${u}`);
  submitToIndexNow(passedUrls);
} else {
  // Default: submit homepage and primary pillar categories
  const defaultPillars = [
    `https://${HOST}/`,
    `https://${HOST}/huangguo/`,
    `https://${HOST}/ai-drama/`,
    `https://${HOST}/ai-comic/`,
    `https://${HOST}/ai-tools/`,
    `https://${HOST}/prompts/`,
    `https://${HOST}/monetize/`
  ];
  console.log(`Submitting ${defaultPillars.length} core pillar URLs by default.`);
  submitToIndexNow(defaultPillars);
}
