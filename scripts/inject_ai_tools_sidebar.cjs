const fs = require('fs');
const path = require('path');

const groups = [
  {
    groupText: '工具推荐',
    clusters: [
      { text: '4.1.1 AI短剧工具', link: '/ai-tools/recommend/drama/', dir: 'docs/ai-tools/recommend/drama' },
      { text: '4.1.2 AI漫剧工具', link: '/ai-tools/recommend/comic/', dir: 'docs/ai-tools/recommend/comic' },
      { text: '4.1.3 免费工具', link: '/ai-tools/recommend/free/', dir: 'docs/ai-tools/recommend/free' },
    ]
  },
  {
    groupText: '模型详解',
    clusters: [
      { text: '4.2.1 视频模型', link: '/ai-tools/models/video/', dir: 'docs/ai-tools/models/video' },
      { text: '4.2.2 图像模型', link: '/ai-tools/models/image/', dir: 'docs/ai-tools/models/image' },
      { text: '4.2.3 模型对比', link: '/ai-tools/models/compare/', dir: 'docs/ai-tools/models/compare' },
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
const regex = /'\/ai-tools\/':\s*\[[\s\S]*?\n\s*\],/;
const replacement = `'/ai-tools/': ` + formattedSidebar + ',';

if (!regex.test(config)) {
  console.error('Regex for /ai-tools/ did not match!');
  process.exit(1);
}

config = config.replace(regex, replacement);
fs.writeFileSync('docs/.vitepress/config.ts', config, 'utf8');
console.log('Successfully injected /ai-tools/ sidebar into docs/.vitepress/config.ts');
