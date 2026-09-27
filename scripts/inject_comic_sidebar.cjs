const fs = require('fs');
const path = require('path');

const groups = [
  {
    groupText: '漫剧制作',
    clusters: [
      { text: '3.1.1 漫剧入门', link: '/ai-comic/production/intro/', dir: 'docs/ai-comic/production/intro' },
      { text: '3.1.2 制作教程', link: '/ai-comic/production/tutorial/', dir: 'docs/ai-comic/production/tutorial' },
      { text: '3.1.3 人物一致性', link: '/ai-comic/production/character/', dir: 'docs/ai-comic/production/character' },
    ]
  },
  {
    groupText: '小说转漫剧',
    clusters: [
      { text: '3.2.1 小说改编', link: '/ai-comic/novel-to-comic/adapt/', dir: 'docs/ai-comic/novel-to-comic/adapt' },
      { text: '3.2.2 漫画转视频', link: '/ai-comic/novel-to-comic/comic-video/', dir: 'docs/ai-comic/novel-to-comic/comic-video' }
    ]
  }
];

function extractTitle(content) {
  const m = content.match(/^title:\s*(.*)$/m);
  return m ? m[1].trim() : '';
}

const sidebarObj = groups.map(g => {
  return {
    text: g.groupText,
    collapsed: false,
    items: g.clusters.map(c => {
      const files = fs.readdirSync(c.dir).filter(f => f.endsWith('.md') && f !== 'index.md');
      const items = files.map(f => {
        const full = path.join(c.dir, f);
        const title = extractTitle(fs.readFileSync(full, 'utf8'));
        const slug = f.replace('.md', '');
        return {
          text: title.length > 20 ? title.slice(0, 19) + '...' : title,
          link: c.link + slug
        };
      });
      return {
        text: c.text,
        link: c.link,
        collapsed: true,
        items
      };
    })
  };
});

function stringifyObj(obj, indent = 6) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(obj)) {
    return '[\n' + obj.map(item => pad + '  ' + stringifyObj(item, indent + 2)).join(',\n') + '\n' + pad + ']';
  } else if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      let valStr;
      if (typeof v === 'string') {
        valStr = `'${v.replace(/'/g, "\\'")}'`;
      } else if (typeof v === 'boolean') {
        valStr = v;
      } else {
        valStr = stringifyObj(v, indent + 2);
      }
      return `${pad}  ${k}: ${valStr}`;
    });
    return '{\n' + entries.join(',\n') + '\n' + pad + '}';
  }
  return String(obj);
}

const formattedSidebar = stringifyObj(sidebarObj, 6);

let config = fs.readFileSync('docs/.vitepress/config.ts', 'utf8');
const regex = /'\/ai-comic\/':\s*\[[\s\S]*?\n\s*\],/;
const replacement = `'/ai-comic/': ` + formattedSidebar + ',';

if (!regex.test(config)) {
  console.error('Regex for /ai-comic/ did not match!');
  process.exit(1);
}

config = config.replace(regex, replacement);
fs.writeFileSync('docs/.vitepress/config.ts', config, 'utf8');
console.log('Successfully injected /ai-comic/ sidebar into docs/.vitepress/config.ts');
