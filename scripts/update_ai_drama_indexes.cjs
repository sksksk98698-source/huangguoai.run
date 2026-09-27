const fs = require('fs');
const path = require('path');

const clusterMeta = [
  {
    dir: 'docs/ai-drama/workflow/script',
    clusterId: '2.1.1',
    title: '剧本创作',
    desc: '系统解析AI短剧剧本大纲、黄金三秒开场钩子、ChatGPT/DeepSeek爆款Prompt模板与全自动漫剧剧本生成。',
    keywords: '剧本创作,黄金三秒,爆款剧本Prompt,DeepSeek写短剧,短剧分镜表'
  },
  {
    dir: 'docs/ai-drama/workflow/storyboard',
    clusterId: '2.1.2',
    title: '分镜设计',
    desc: '深度解析AI短剧分镜设计全流程，涵盖景别机位、180度轴线规则、Midjourney分镜生成与情绪打斗分镜模板。',
    keywords: '分镜设计,景别调度,180度轴线,分镜Prompt,情绪打斗分镜,Midjourney分镜'
  },
  {
    dir: 'docs/ai-drama/workflow/character',
    clusterId: '2.1.3',
    title: '人物一致性',
    desc: '攻克AI短剧人物崩脸、换装变形最大技术难点，掌握角色三视图、换脸锁脸工具、LoRA训练与无脸崩提示词技巧。',
    keywords: '人物一致性,角色锁脸,三视图设定,AI防崩脸,LoRA微调,换脸工具'
  },
  {
    dir: 'docs/ai-drama/workflow/video',
    clusterId: '2.1.4',
    title: '视频生成',
    desc: '掌握文生视频、图生视频、首尾帧控制与小说改短剧完整管线，覆盖可灵、Runway、海螺等主流视频生成工具。',
    keywords: '视频生成,文生视频,图生视频,首尾帧控制,小说改短剧,可灵AI,Runway'
  },
  {
    dir: 'docs/ai-drama/workflow/audio-post',
    clusterId: '2.1.5',
    title: '配音与后期',
    desc: '全套AI短剧后期解决方案，涵盖多情感AI配音、声音克隆、LipSync对口型、AI自动剪辑、智能字幕与超分画质增强。',
    keywords: '短剧配音,声音克隆,对口型LipSync,AI自动剪辑,智能字幕,画质超分'
  },
  {
    dir: 'docs/ai-drama/tutorial/beginner',
    clusterId: '2.2.1',
    title: '零基础教程',
    desc: '专为短剧小白打造的保姆级入门课程，涵盖首日准备、5分钟极速出片、7天上手挑战、免费工具链与避坑实操。',
    keywords: '短剧入门,零基础教程,5分钟出片,7天短剧上手,免费短剧工具,新手避坑'
  },
  {
    dir: 'docs/ai-drama/tutorial/advanced',
    clusterId: '2.2.2',
    title: '进阶实战',
    desc: '面向工作室与职业创作者，解决电影级光影一致性、复杂动作打斗、多人同框调度、ComfyUI管线与工业化SOP。',
    keywords: '进阶实战,光影一致性,复杂动作戏,多人同框调度,ComfyUI管线,短剧工业化SOP'
  },
  {
    dir: 'docs/ai-drama/tutorial/genre',
    clusterId: '2.2.3',
    title: '题材分类',
    desc: '全网垂直题材分类爆款制作指南，覆盖都市、甜宠、霸总、逆袭、古装、玄幻、悬疑、重生、穿越、男频、女频与爽剧。',
    keywords: '短剧题材分类,都市短剧,甜宠短剧,霸总短剧,逆袭爽剧,古装玄幻,男频女频'
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
      description: meta.description || '点击查看本篇AI短剧深度制作教程与实战指南。',
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

- 返回上级：[AI短剧制作专题](/ai-drama/)
- 进阶阅读：[黄果短剧提示词库](/prompts/library/drama/)
- 变现支持：[AI短剧商业化变现与矩阵运营](/monetize/traffic/)
`;

  const indexPath = path.join(dirPath, 'index.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Updated ${indexPath} with ${articles.length} articles.`);
});
