/**
 * Comprehensive SEO Health Check & Production Gatekeeper
 * Enforces Google / Bing Index Safety & Verification Requirements
 * 
 * Usage:
 *   node scripts/seo-health-check.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'docs', '.vitepress', 'dist');
const BASELINE_FILE = path.join(ROOT_DIR, '.seo-baseline.json');
const HOST = 'https://huangguoai.run';

const ANSI_RESET = '\x1b[0m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_BOLD = '\x1b[1m';

console.log(`${ANSI_BOLD}${ANSI_CYAN}========================================================================${ANSI_RESET}`);
console.log(`${ANSI_BOLD}${ANSI_CYAN}  🔍 SEO Health Check & Pre-Release Safety Gatekeeper (huangguoai.run)  ${ANSI_RESET}`);
console.log(`${ANSI_BOLD}${ANSI_CYAN}========================================================================${ANSI_RESET}\n`);

const results = {
  build: false,
  robots: false,
  noindex: false,
  canonical: false,
  sitemap: false,
  internalLinks: false,
  coreUrls: false,
  schema: false,
  duplicates: false,
  pageCount: false,
  security: false,
  indexNow: false,
};

const issues = [];
const stats = {
  totalHtmlFiles: 0,
  sitemapUrls: 0,
  indexablePages: 0,
  noindexPages: 0,
  canonicalCount: 0,
  canonicalErrors: 0,
  brokenInternalLinks: 0,
  schemaParsedCount: 0,
  schemaErrors: 0,
  duplicateTitles: 0,
  duplicateDescriptions: 0,
};

// 1. Build Verification
if (!fs.existsSync(DIST_DIR)) {
  issues.push({ level: 'CRITICAL', msg: `Build output directory does not exist: ${DIST_DIR}. Run npm run docs:build first.` });
} else {
  results.build = true;
}

// Helper to recursively collect all HTML files
function collectHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = collectHtmlFiles(DIST_DIR);
stats.totalHtmlFiles = htmlFiles.length;

if (stats.totalHtmlFiles === 0) {
  issues.push({ level: 'CRITICAL', msg: 'Zero HTML files found in dist directory!' });
}

// 2. Robots.txt Safety Check
const robotsPath = path.join(DIST_DIR, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  issues.push({ level: 'CRITICAL', msg: 'robots.txt missing in dist output!' });
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  if (/User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*($|[\r\n])/i.test(robotsContent)) {
    issues.push({ level: 'CRITICAL', msg: 'CRITICAL: robots.txt contains "User-agent: * Disallow: /" blocking entire site!' });
  } else if (!robotsContent.includes('Sitemap: https://huangguoai.run/sitemap.xml')) {
    issues.push({ level: 'HIGH', msg: 'robots.txt does not contain exact canonical Sitemap reference!' });
  } else {
    // Check specific crawlers
    const hasGooglebot = /User-agent:\s*Googlebot/i.test(robotsContent);
    const hasBingbot = /User-agent:\s*bingbot/i.test(robotsContent);
    const hasBaiduspider = /User-agent:\s*Baiduspider/i.test(robotsContent);
    const hasYisou = /User-agent:\s*yisouspider/i.test(robotsContent);

    if (hasGooglebot && hasBingbot && hasBaiduspider && hasYisou) {
      results.robots = true;
    } else {
      issues.push({ level: 'MEDIUM', msg: 'robots.txt missing explicit declaration for one of major crawlers (Googlebot, bingbot, Baiduspider, yisouspider).' });
      results.robots = true; // still pass if universal allow is active
    }
  }
}

// 3. Sitemap Safety Check
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
let sitemapUrls = [];
if (!fs.existsSync(sitemapPath)) {
  issues.push({ level: 'CRITICAL', msg: 'sitemap.xml missing in dist output!' });
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  if (!sitemapContent.startsWith('<?xml') || !sitemapContent.includes('<urlset')) {
    issues.push({ level: 'CRITICAL', msg: 'sitemap.xml is not valid XML format!' });
  } else {
    const locRegex = /<loc>(https:\/\/huangguoai\.run\/[^<]*)<\/loc>/g;
    let match;
    const urlSet = new Set();
    let hasDuplicate = false;
    let has404 = false;
    let hasNonHttps = false;

    while ((match = locRegex.exec(sitemapContent)) !== null) {
      const u = match[1];
      if (urlSet.has(u)) {
        hasDuplicate = true;
        issues.push({ level: 'HIGH', msg: `Duplicate URL in sitemap: ${u}` });
      }
      urlSet.add(u);
      sitemapUrls.push(u);

      if (u.includes('404')) {
        has404 = true;
        issues.push({ level: 'CRITICAL', msg: `404 page detected in sitemap: ${u}` });
      }
      if (!u.startsWith('https://huangguoai.run/')) {
        hasNonHttps = true;
        issues.push({ level: 'CRITICAL', msg: `Invalid domain in sitemap: ${u}` });
      }
    }

    stats.sitemapUrls = sitemapUrls.length;

    if (!hasDuplicate && !has404 && !hasNonHttps && stats.sitemapUrls > 0) {
      results.sitemap = true;
    }
  }
}

// 4. Noindex & Canonical & Schema & Meta Scans across all HTML files
const titleMap = new Map();
const descMap = new Map();
const h1Map = new Map();
let unexpectedNoindexCount = 0;
let canonicalMismatchCount = 0;
let schemaParseErrors = 0;

const cleanUrlsMap = new Set();
for (const file of htmlFiles) {
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  cleanUrlsMap.add(relPath);
  if (relPath.endsWith('.html')) {
    cleanUrlsMap.add(relPath.replace(/\.html$/, ''));
    if (relPath.endsWith('/index.html')) {
      cleanUrlsMap.add(relPath.replace(/\/index\.html$/, '/'));
    }
    if (relPath === 'index.html') {
      cleanUrlsMap.add('');
      cleanUrlsMap.add('/');
    }
  }
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  const is404 = relPath === '404.html';

  // Noindex check
  const hasNoindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(content);
  if (hasNoindex) {
    stats.noindexPages++;
    if (!is404) {
      unexpectedNoindexCount++;
      issues.push({ level: 'CRITICAL', msg: `Unexpected noindex tag in production page: ${relPath}` });
    }
  } else {
    stats.indexablePages++;
  }

  // Canonical check
  const canonicalMatch = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.test(content) 
    ? content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)[1] 
    : null;

  if (!canonicalMatch) {
    canonicalMismatchCount++;
    issues.push({ level: 'CRITICAL', msg: `Missing canonical tag in: ${relPath}` });
  } else {
    stats.canonicalCount++;
    if (!canonicalMatch.startsWith(HOST)) {
      canonicalMismatchCount++;
      issues.push({ level: 'CRITICAL', msg: `Canonical does not use formal domain ${HOST}: ${canonicalMatch} in ${relPath}` });
    } else if (canonicalMatch === `${HOST}/` && relPath !== 'index.html') {
      canonicalMismatchCount++;
      issues.push({ level: 'CRITICAL', msg: `Abnormal canonical pointing to root homepage in non-home page: ${relPath}` });
    }
  }

  // Title & Description & H1
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  if (titleMatch && !is404) {
    const t = titleMatch[1].trim();
    if (titleMap.has(t)) {
      stats.duplicateTitles++;
      // Only log if between regular content
      if (stats.duplicateTitles <= 5) {
        issues.push({ level: 'LOW', msg: `Duplicate title: "${t}" in ${relPath} and ${titleMap.get(t)}` });
      }
    } else {
      titleMap.set(t, relPath);
    }
  }

  if (descMatch && !is404) {
    const d = descMatch[1].trim();
    if (descMap.has(d)) {
      stats.duplicateDescriptions++;
    } else {
      descMap.set(d, relPath);
    }
  }

  // Schema.org check
  const schemaMatches = content.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (schemaMatches && !is404) {
    for (const sm of schemaMatches) {
      stats.schemaParsedCount++;
      const jsonStr = sm.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, '').replace(/<\/script>/i, '').trim();
      try {
        const parsed = JSON.parse(jsonStr);
        if (!parsed['@context'] || !parsed['@context'].includes('schema.org')) {
          schemaParseErrors++;
          issues.push({ level: 'HIGH', msg: `Invalid Schema @context in ${relPath}` });
        }
      } catch (e) {
        schemaParseErrors++;
        issues.push({ level: 'CRITICAL', msg: `Malformed JSON-LD syntax in ${relPath}: ${e.message}` });
      }
    }
  } else if (!is404) {
    schemaParseErrors++;
    issues.push({ level: 'HIGH', msg: `Missing JSON-LD schema in: ${relPath}` });
  }

  // Security & Tampering check
  const badPatterns = [
    /\/(casino|baccarat|betting|poker|slots|gambling)\b/i,
    /<title>[^<]*(博彩|赌博|六合彩|老虎机|棋牌|真人视讯)[^<]*<\/title>/i
  ];
  for (const bp of badPatterns) {
    if (bp.test(content) || bp.test(relPath)) {
      results.security = false;
      issues.push({ level: 'CRITICAL', msg: `SECURITY TAMPERING DETECTED in ${relPath}` });
    }
  }
}

if (unexpectedNoindexCount === 0) results.noindex = true;
if (canonicalMismatchCount === 0) results.canonical = true;
if (schemaParseErrors === 0) results.schema = true;
if (stats.duplicateTitles <= 10) results.duplicates = true;
if (!issues.some(i => i.msg.includes('SECURITY TAMPERING'))) results.security = true;

// 5. Core URLs Integrity Check
const coreExpected = [
  'index.html',
  '404.html',
  'huangguo/index.html',
  'ai-drama/index.html',
  'ai-comic/index.html',
  'ai-tools/index.html',
  'prompts/index.html',
  'monetize/index.html'
];

let coreMissingCount = 0;
for (const cp of coreExpected) {
  if (!fs.existsSync(path.join(DIST_DIR, cp))) {
    coreMissingCount++;
    issues.push({ level: 'CRITICAL', msg: `Core site entry page missing: ${cp}` });
  }
}
if (coreMissingCount === 0) results.coreUrls = true;

// 6. Internal Links Check
let brokenLinksCount = 0;
const checkedHrefs = new Set();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  const hrefRegex = /<a[^>]*href=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    const rawHref = match[1].trim();

    // Check empty or dummy hrefs
    if (rawHref === '' || rawHref === '#') {
      // Small UI widgets might have #, but flag if excessive
      continue;
    }

    // Only inspect internal links
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('//') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
      if (!rawHref.startsWith(HOST)) {
        continue; // external link
      }
    }

    // Strip hostname if present
    let internalPath = rawHref.replace(HOST, '');
    // Strip hash and query
    internalPath = internalPath.split('#')[0].split('?')[0];

    if (!internalPath) continue; // anchor only
    if (checkedHrefs.has(internalPath)) continue;
    checkedHrefs.add(internalPath);

    // Normalize path
    let testPath = internalPath.startsWith('/') ? internalPath.slice(1) : internalPath;
    testPath = decodeURIComponent(testPath);

    // Check if matching file exists in cleanUrlsMap or dist
    const exists = cleanUrlsMap.has(testPath) || 
                   cleanUrlsMap.has(testPath + '.html') || 
                   cleanUrlsMap.has(testPath + '/index.html') ||
                   cleanUrlsMap.has(testPath.replace(/\/$/, '')) ||
                   fs.existsSync(path.join(DIST_DIR, testPath));

    if (!exists) {
      brokenLinksCount++;
      if (brokenLinksCount <= 10) {
        issues.push({ level: 'MEDIUM', msg: `Internal link broken: "${rawHref}" linked from ${relPath}` });
      }
    }
  }
}

stats.brokenInternalLinks = brokenLinksCount;
if (brokenLinksCount <= 5) results.internalLinks = true;

// 7. Page Count Anomaly & Baseline
let baseline = { lastCount: stats.sitemapUrls, date: new Date().toISOString() };
if (fs.existsSync(BASELINE_FILE)) {
  try {
    baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
    const prevCount = baseline.lastCount || 0;
    const diff = stats.sitemapUrls - prevCount;
    const dropRatio = prevCount > 0 ? (prevCount - stats.sitemapUrls) / prevCount : 0;

    if (dropRatio > 0.15 && prevCount > 50) {
      issues.push({ level: 'CRITICAL', msg: `CRITICAL ANOMALY: Sitemap URL count dropped from ${prevCount} to ${stats.sitemapUrls} (drop of ${Math.round(dropRatio * 100)}%)!` });
    } else {
      results.pageCount = true;
    }
  } catch (e) {
    results.pageCount = true;
  }
} else {
  results.pageCount = true;
}

// Update baseline
fs.writeFileSync(BASELINE_FILE, JSON.stringify({
  lastCount: stats.sitemapUrls,
  totalHtml: stats.totalHtmlFiles,
  updatedAt: new Date().toISOString()
}, null, 2));

// 8. IndexNow Key File Verification
const indexNowKeyPath = path.join(DIST_DIR, 'eb8a5d3f2901416bb5a109e995e8b4cb.txt');
if (fs.existsSync(indexNowKeyPath)) {
  const keyContent = fs.readFileSync(indexNowKeyPath, 'utf-8').trim();
  if (keyContent === 'eb8a5d3f2901416bb5a109e995e8b4cb') {
    results.indexNow = true;
  }
}

// Evaluate Decision
const criticalIssues = issues.filter(i => i.level === 'CRITICAL');
const highIssues = issues.filter(i => i.level === 'HIGH');
const isBlocked = criticalIssues.length > 0;

// Print Results
console.log(`${ANSI_BOLD}SEO HEALTH CHECK METRICS:${ANSI_RESET}`);
console.log(`  • Total Output HTML Files:    ${stats.totalHtmlFiles}`);
console.log(`  • Indexable Pages:            ${stats.indexablePages}`);
console.log(`  • Excluded Noindex Pages:     ${stats.noindexPages} (Whitelisted 404)`);
console.log(`  • Sitemap Valid URLs:         ${stats.sitemapUrls}`);
console.log(`  • Canonical Self-Ref Count:   ${stats.canonicalCount}`);
console.log(`  • Valid JSON-LD Schema Count: ${stats.schemaParsedCount}`);
console.log(`  • Broken Internal Links:      ${stats.brokenInternalLinks}`);
console.log(`  • Duplicate Titles:           ${stats.duplicateTitles}\n`);

console.log(`${ANSI_BOLD}CHECKLIST SCORECARD:${ANSI_RESET}`);
const printStatus = (label, pass) => {
  const badge = pass ? `${ANSI_GREEN}PASS${ANSI_RESET}` : `${ANSI_RED}FAIL${ANSI_RESET}`;
  console.log(`  ${label.padEnd(24)}: ${badge}`);
};

printStatus('Build Output', results.build);
printStatus('Robots.txt Rules', results.robots);
printStatus('Noindex Guard', results.noindex);
printStatus('Canonical Integrity', results.canonical);
printStatus('Sitemap Structure', results.sitemap);
printStatus('Internal Links', results.internalLinks);
printStatus('Core Pillar URLs', results.coreUrls);
printStatus('JSON-LD Schema', results.schema);
printStatus('Duplicate Titles', results.duplicates);
printStatus('Page Count Anomaly', results.pageCount);
printStatus('IndexNow Protocol', results.indexNow);
printStatus('Anti-Spam Security', results.security);

console.log('');

if (issues.length > 0) {
  console.log(`${ANSI_BOLD}IDENTIFIED ISSUES (${issues.length}):${ANSI_RESET}`);
  for (const item of issues) {
    const color = item.level === 'CRITICAL' ? ANSI_RED : (item.level === 'HIGH' ? ANSI_YELLOW : ANSI_CYAN);
    console.log(`  [${color}${item.level}${ANSI_RESET}] ${item.msg}`);
  }
  console.log('');
}

const releaseDecision = isBlocked ? 'BLOCKED' : 'READY';
const productionStatus = (isBlocked || highIssues.length > 0) ? 'NEEDS_ATTENTION' : 'LIVE_HEALTHY';

const decisionColor = isBlocked ? ANSI_RED : ANSI_GREEN;

console.log(`${ANSI_BOLD}========================================================================${ANSI_RESET}`);
console.log(`${ANSI_BOLD}  RELEASE_DECISION: ${decisionColor}${releaseDecision}${ANSI_RESET}`);
console.log(`${ANSI_BOLD}  PRODUCTION_STATUS: ${decisionColor}${productionStatus}${ANSI_RESET}`);
console.log(`${ANSI_BOLD}${ANSI_CYAN}========================================================================${ANSI_RESET}\n`);

if (isBlocked) {
  console.error(`❌ RELEASE_DECISION IS BLOCKED. Fix critical issues before deploying to production.`);
  process.exit(1);
} else {
  console.log(`✅ All SEO release safety checks passed. Site is safe for production deployment.`);
  process.exit(0);
}
