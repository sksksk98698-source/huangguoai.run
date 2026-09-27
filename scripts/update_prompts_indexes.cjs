const fs = require('fs');
const path = require('path');

const clusterMeta = [
  {
    dir: 'docs/prompts/library/drama',
    clusterId: '5.1.1',
    title: '短剧提示词库',
    desc: '短剧爆款场景、高燃情节与名场面直接可复制使用的中英文提示词库，覆盖逆袭打脸、豪门虐恋与战神降临。',
    keywords: '短剧提示词,短剧Prompt大全,爆款短剧场景,战神提示词,豪门短剧提示词'
  },
  {
    dir: 'docs/prompts/library/storyboard',
    clusterId: '5.1.2',
    title: '分镜提示词库',
    desc: '摄影机机位、动态运镜、焦距景深、极端天气与电影级布光专项提示词，让镜头具有好莱坞工业美感。',
    keywords: '分镜提示词,镜头机位Prompt,运镜控制,电影大光圈虚化,丁达尔光影'
  },
  {
    dir: 'docs/prompts/library/character',
    clusterId: '5.1.3',
    title: '人物提示词库',
    desc: '男女主角、反派配角外貌、服装穿搭材质、发型微雕与负面提示词黄金清单，打造稳定辨识度人设。',
    keywords: '人物提示词,男主角Prompt,女主角Prompt,反派面相,服装材质,负面提示词'
  },
  {
    dir: 'docs/prompts/library/model',
    clusterId: '5.1.4',
    title: '模型提示词库',
    desc: '按底层模型专属语法定制的提示词手册，涵盖快手可灵、字节Seedance、Midjourney、FLUX与Vidu。',
    keywords: '模型提示词,可灵专属提示词,Seedance公式,Midjourney参数,FLUX人像,Vidu高能动作'
  }
];

function extractMeta(content) {
  const titleMatch = content.match(/^title:\s*(.*)$/m);
  const descMatch = content.match(/^description:\s*(.*)$/m);
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : ''
  };
}

clusterMeta.forEach(cm => {
  const dirPath = path.resolve(__dirname, '..', cm.dir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'index.md');

  const articles = files.map(file => {
    const fullPath = path.join(dirPath, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const meta = extractMeta(content);
    const slug = file.replace(/\.md$/, '');
    const relativeUrl = '/' + cm.dir.replace(/^docs\//, '') + '/' + slug;
    return {
      title: meta.title || slug,
      description: meta.description || '点击查看本篇AI提示词深度实战指南与开箱即用模板。',
      url: relativeUrl
    };
  });

  const cardsHtml = articles.map(a => `
  <div class="hg-card">
    <a href="${a.url}" class="hg-card-title">${a.title}</a>
    <p class="hg-card-desc">${a.description}</p>
    <a href="${a.url}" class="hg-card-link">查看Prompt与指南 →</a>
  </div>`).join('');

  const indexContent = `---
title: ${cm.title} - 黄果短剧AI指南
description: ${cm.desc}
keywords: ${cm.keywords}
lastUpdated: 2026-09-26
---

# 三级 ${cm.clusterId}：${cm.title}

::: tip 集群定位与核心概览
${cm.desc}
本集群共收录 **${articles.length} 篇** 工业化实战Prompt手册与开箱即用模板，覆盖从底层语法、参数配方、实操避坑到微表情微雕的完整体系。
:::

## 核心文章列表

<div class="hg-card-grid">
${cardsHtml}
</div>

## 快速导航与专题关联

- 返回上级：[提示词库导航专题](/prompts/)
- 工具支持：[2026年AI短剧必备工具TOP10](/ai-tools/recommend/drama/top-10-drama-tools-2026)
- 变现通道：[短剧分销与高客单变现指南](/monetize/income/methods/short-drama-distribution)
`;

  const indexPath = path.join(dirPath, 'index.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Updated ${indexPath} with ${articles.length} articles.`);
});
