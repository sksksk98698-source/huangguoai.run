const fs = require('fs');
const path = require('path');

const groups = [
  {
    groupText: '提示词大全',
    clusters: [
      { text: '5.1.1 短剧提示词', link: '/prompts/library/drama/', dir: 'docs/prompts/library/drama' },
      { text: '5.1.2 分镜提示词', link: '/prompts/library/storyboard/', dir: 'docs/prompts/library/storyboard' },
      { text: '5.1.3 人物提示词', link: '/prompts/library/character/', dir: 'docs/prompts/library/character' },
      { text: '5.1.4 模型提示词', link: '/prompts/library/model/', dir: 'docs/prompts/library/model' },
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
const regex = /'\/prompts\/':\s*\[[\s\S]*?\n\s*\],/;
const replacement = `'/prompts/': ` + formattedSidebar + ',';

if (!regex.test(config)) {
  console.error('Regex for /prompts/ did not match!');
  process.exit(1);
}

config = config.replace(regex, replacement);
fs.writeFileSync('docs/.vitepress/config.ts', config, 'utf8');
console.log('Successfully injected /prompts/ sidebar into docs/.vitepress/config.ts');
