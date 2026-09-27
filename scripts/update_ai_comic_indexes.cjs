const fs = require('fs');
const path = require('path');

const clusterMeta = [
  {
    dir: 'docs/ai-comic/production/intro',
    clusterId: '3.1.1',
    title: '漫剧入门',
    desc: '动态漫画、AI漫剧概念普及，解析漫剧受众红利、生产管线、必备软件工具箱与海内外商业变现格局。',
    keywords: '漫剧入门,AI漫剧是什么,动态漫画,漫剧变现,漫剧与动漫区别,标杆漫剧账号'
  },
  {
    dir: 'docs/ai-comic/production/tutorial',
    clusterId: '3.1.2',
    title: '制作教程',
    desc: '漫剧实操制作技巧，分层切图、视差运镜、呼吸眨眼微动、动态拟声字、打斗打击感与剪映高级剪辑技法。',
    keywords: '漫剧制作教程,PS分层切图,视差滚动运镜,角色微动效,打斗打击感,剪映漫剧'
  },
  {
    dir: 'docs/ai-comic/production/character',
    clusterId: '3.1.3',
    title: '人物一致性',
    desc: '二次元动漫角色的固定人设、专属LoRA训练、Midjourney控图、三视图、服装发型防崩塌与长期连载白皮书。',
    keywords: '动漫角色一致性,动漫LoRA训练,二次元三视图,Midjourney动漫锁脸,角色资产白皮书'
  },
  {
    dir: 'docs/ai-comic/novel-to-comic/adapt',
    clusterId: '3.2.1',
    title: '小说改编',
    desc: '万字网文转漫画分镜的核心转译技巧，心理活动视听化、玄幻世界观Prompt、高潮决战切镜与小说推文合规分成。',
    keywords: '小说改漫剧,网文转漫画,分镜脚本拆解,心理描写镜头化,小说推文授权,漫剧断章'
  },
  {
    dir: 'docs/ai-comic/novel-to-comic/comic-video',
    clusterId: '3.2.2',
    title: '漫画转视频',
    desc: '漫画静态帧到动态视频的AI跃迁，可灵与Vidu二次元动态化、局部眼嘴微动省钱秘籍、破框转场与画质矢量超分。',
    keywords: '漫画转视频,可灵动漫打斗,Vidu二次元,局部微动效,漫画破框转场,线稿矢量锐化'
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
      description: meta.description || '点击查看本篇AI漫剧深度制作教程与实战指南。',
      url: relativeUrl
    };
  });

  const cardsHtml = articles.map(a => `
  <div class="hg-card">
    <a href="${a.url}" class="hg-card-title">${a.title}</a>
    <p class="hg-card-desc">${a.description}</p>
    <a href="${a.url}" class="hg-card-link">阅读完整指南 →</a>
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
本集群共收录 **${articles.length} 篇** 工业化实战指南，覆盖从核心原理、标准提示词配方、参数规范到实战避坑排查的完整知识体系。
:::

## 核心文章列表

<div class="hg-card-grid">
${cardsHtml}
</div>

## 快速导航与专题关联

- 返回上级：[AI漫剧制作专题](/ai-comic/)
- 提示词库：[黄果短剧提示词库](/prompts/library/drama/)
- 变现支持：[小说推文漫剧授权与分成渠道](/ai-comic/novel-to-comic/adapt/novel-licensing-monetization)
`;

  const indexPath = path.join(dirPath, 'index.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Updated ${indexPath} with ${articles.length} articles.`);
});
