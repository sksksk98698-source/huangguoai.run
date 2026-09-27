const fs = require('fs');

const sidebarFragment = JSON.parse(fs.readFileSync('scripts/drama_sidebar_fragment.json', 'utf8'));

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

const formattedSidebar = stringifyObj(sidebarFragment, 6);

let config = fs.readFileSync('docs/.vitepress/config.ts', 'utf8');
const regex = /'\/ai-drama\/':\s*\[[\s\S]*?\n\s*\],/;
const replacement = `'/ai-drama/': ` + formattedSidebar + ',';

if (!regex.test(config)) {
  console.error('Regex did not match!');
  process.exit(1);
}

config = config.replace(regex, replacement);
fs.writeFileSync('docs/.vitepress/config.ts', config, 'utf8');
console.log('Successfully injected /ai-drama/ sidebar into docs/.vitepress/config.ts');
