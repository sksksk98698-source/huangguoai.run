const fs = require('fs');
const path = require('path');

const clusterMeta = [
  {
    dir: 'docs/monetize/income/methods',
    clusterId: '6.1.1',
    title: '赚钱方式全解析',
    desc: '全方位商业化兑现路径，从短剧分销CPS、定制代制作、小说推文拉新到全网AI视频商业变现全景。',
    keywords: '短剧赚钱方式,短剧变现,个人短剧副业,短剧创收途径,短剧商业模式'
  },
  {
    dir: 'docs/monetize/income/business',
    clusterId: '6.1.2',
    title: '商业模式与变现机制',
    desc: '工作室规模化运营模式，涵盖短剧CPS分佣、投流买量ROI、品牌定制赞助、外包代制作报价与自建小程序剧场。',
    keywords: '短剧商业模式,短剧CPS分账,投流买量经济学,短剧外包报价,品牌定制短剧,自建短剧小程序'
  },
  {
    dir: 'docs/monetize/operations/account',
    clusterId: '6.2.1',
    title: '短剧账号运营',
    desc: '国内短视频主阵地（抖音、快手、视频号、小红书）起号冷启动、算法推流底层逻辑、矩阵操盘与评论区控评艺术。',
    keywords: '短剧账号运营,抖音短剧冷启动,短剧推荐算法,爆款封面标题,短剧矩阵号,评论区控评'
  },
  {
    dir: 'docs/monetize/operations/global',
    clusterId: '6.2.2',
    title: '短剧出海运营',
    desc: 'TikTok、YouTube Shorts、ReelShort、ShortMax等海外主流短剧平台红利落地，涵盖欧美狼人题材与跨境工业化团队SOP。',
    keywords: '短剧出海运营,海外短剧蓝海,TikTok短剧起号,YouTube Shorts分成,ReelShort生态,欧美狼人题材'
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
      description: meta.description || '点击查看本篇短剧商业变现与运营深度实战指南。',
      url: relativeUrl
    };
  });

  const cardsHtml = articles.map(a => `
  <div class="hg-card">
    <a href="${a.url}" class="hg-card-title">${a.title}</a>
    <p class="hg-card-desc">${a.description}</p>
    <a href="${a.url}" class="hg-card-link">阅读变现指南 →</a>
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
本集群共收录 **${articles.length} 篇** 商业化实战指南与运营策略手册，深度解析如何将AI技术转化为实实在在的真金白银现金流。
:::

## 核心文章列表

<div class="hg-card-grid">
${cardsHtml}
</div>

## 快速导航与专题关联

- 返回上级：[商业变现与运营导航专题](/monetize/)
- 提示词库：[黄果短剧提示词库](/prompts/library/drama/)
- 工具支持：[2026年AI短剧必备工具TOP10](/ai-tools/recommend/drama/top-10-drama-tools-2026)
`;

  const indexPath = path.join(dirPath, 'index.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Updated ${indexPath} with ${articles.length} articles.`);
});
