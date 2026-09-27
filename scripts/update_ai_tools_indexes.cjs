const fs = require('fs');
const path = require('path');

const clusterMeta = [
  {
    dir: 'docs/ai-tools/recommend/drama',
    clusterId: '4.1.1',
    title: 'AI短剧工具推荐',
    desc: '2026年做AI短剧必备的全流程神器盘点，从分镜剧本大脑、角色一致性锁脸、批量文生视频到音效配音剪辑套件。',
    keywords: 'AI短剧工具,短剧AI软件,短剧生产力工具,短剧制作软件推荐,分镜工具'
  },
  {
    dir: 'docs/ai-tools/recommend/comic',
    clusterId: '4.1.2',
    title: 'AI漫剧工具推荐',
    desc: '动态漫画与AI漫剧高效制作利器，覆盖智能抠图分层、原画网点生成、二次元动态化及条漫视差转场工具。',
    keywords: 'AI漫剧工具,动态漫画软件,二次元出图工具,漫剧分层软件,条漫视频化'
  },
  {
    dir: 'docs/ai-tools/recommend/free',
    clusterId: '4.1.3',
    title: '免费AI工具推荐',
    desc: '零成本做短剧漫剧的开源与免费工具清单，涵盖免费生视频平台、商用无版权音乐音效库、免费降噪超分与剪辑套件。',
    keywords: '免费AI工具,免费AI视频,零成本做短剧,开源生图模型,免费商用音乐'
  },
  {
    dir: 'docs/ai-tools/models/video',
    clusterId: '4.2.1',
    title: '视频大模型评测与实战',
    desc: '主流视频生成大模型（可灵、Seedance、Sora、Veo、海螺、Vidu、通义万相）深度实操解析与参数调优指南。',
    keywords: '视频大模型,快手可灵,字节Seedance,OpenAI Sora,谷歌Veo,海螺AI,生数Vidu'
  },
  {
    dir: 'docs/ai-tools/models/image',
    clusterId: '4.2.2',
    title: '图像大模型评测与实战',
    desc: 'AI图像生成基座（Midjourney、Flux.1、Stable Diffusion、DALL-E 3）在短剧分镜、二次元漫剧与角色一致性中的深度应用。',
    keywords: '图像大模型,Midjourney,Flux.1,Stable Diffusion,DALL-E 3,短剧分镜出图'
  },
  {
    dir: 'docs/ai-tools/models/compare',
    clusterId: '4.2.3',
    title: '模型对比横评与选型',
    desc: '高意图决策对比指南，全面横跨可灵vs Seedance、Seedance vs Veo/Sora、二次元漫剧选型与短剧最佳工具组合。',
    keywords: 'AI模型对比,可灵对比Seedance,Seedance对比Sora,漫剧模型推荐,做短剧用什么AI最好'
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
      description: meta.description || '点击查看本篇AI工具深度评测与实操指南。',
      url: relativeUrl
    };
  });

  const cardsHtml = articles.map(a => `
  <div class="hg-card">
    <a href="${a.url}" class="hg-card-title">${a.title}</a>
    <p class="hg-card-desc">${a.description}</p>
    <a href="${a.url}" class="hg-card-link">阅读评测与指南 →</a>
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
本集群共收录 **${articles.length} 篇** 工业级评测与实战指南，覆盖从工具特性横评、参数配方、实操避坑到成本核算的完整体系。
:::

## 核心文章列表

<div class="hg-card-grid">
${cardsHtml}
</div>

## 快速导航与专题关联

- 返回上级：[AI工具导航专题](/ai-tools/)
- 提示词库：[黄果短剧提示词库](/prompts/library/drama/)
- 变现通道：[短剧CPS分成与爆款投流技巧](/monetize/playlet/cps/)
`;

  const indexPath = path.join(dirPath, 'index.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Updated ${indexPath} with ${articles.length} articles.`);
});
