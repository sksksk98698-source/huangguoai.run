const fs = require('fs');
const path = require('path');

const level2Indexes = [
  { path: 'docs/huangguo/intro/index.md', title: '黄果短剧品牌入门', desc: '认识黄果短剧是什么、核心评测、功能解析及官网正版入口核验。' },
  { path: 'docs/huangguo/tutorial/index.md', title: '黄果短剧使用教程', desc: '新手零基础快速上手、参数调优、电影级运镜与LipSync对口型全套操作指南。' },
  { path: 'docs/huangguo/compare/index.md', title: '黄果短剧竞品对比', desc: '横向评测可灵AI、即梦、剪映、海螺及Sora，提供商业选型与算力成本对比。' },

  { path: 'docs/ai-drama/workflow/index.md', title: 'AI短剧制作全流程', desc: '剧本创作、分镜设计、角色一致性锁脸、首尾帧视频生成与声音后期完整管线。' },
  { path: 'docs/ai-drama/tutorial/index.md', title: 'AI短剧教程与案例', desc: '零基础新手起步清单、进阶高产SOP及12类热门爆款题材全景拆解。' },

  { path: 'docs/ai-comic/production/index.md', title: 'AI漫剧制作全流程', desc: '二次元动态漫画入门、PS分层视差运镜制作与动漫角色专属LoRA一致性。' },
  { path: 'docs/ai-comic/novel-to-comic/index.md', title: '小说转漫剧指南', desc: '万字网文小说精炼分镜技巧、推文授权合规与漫画静态帧转高燃动态视频。' },

  { path: 'docs/ai-tools/recommend/index.md', title: 'AI短剧与漫剧工具推荐', desc: '全流程必备软件清单、二次元动漫专属工具与完全免费白嫖算力汇总。' },
  { path: 'docs/ai-tools/models/index.md', title: '视频与图像大模型详解', desc: '快手可灵、字节Seedance、OpenAI Sora、海螺及FLUX模型全维度横评天梯榜。' },

  { path: 'docs/prompts/library/index.md', title: '爆款提示词库大全', desc: '短剧场景Prompt、9种电影机位运镜、男女主人设微雕与模型专属语法后缀。' },

  { path: 'docs/monetize/income/index.md', title: 'AI短剧商业变现模式', desc: '全景创收路径、小说推文分成、短剧CPS分销挂载与团队商业报价体系。' },
  { path: 'docs/monetize/operations/index.md', title: '账号运营与海外出海', desc: '国内多平台7天冷启动推流机制、防封红线与TikTok/ReelShort短剧出海实操。' }
];

level2Indexes.forEach(item => {
  const fullPath = path.resolve(__dirname, '..', item.path);
  const content = `---
title: ${item.title} - 黄果短剧AI指南
description: ${item.desc}
keywords: ${item.title}, 黄果短剧, AI短剧制作
lastUpdated: 2026-09-26
---

# ${item.title}

<div class="geo-answer-box">
  <div class="geo-answer-title">📌 专题导读</div>
  <p class="geo-answer-content">
    ${item.desc}
  </p>
</div>

本专题汇聚了该分类下的各个三级内容集群与深度文章，请点击侧边栏或下方集群深入阅读对应专业教程。
`;

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('Successfully created ' + level2Indexes.length + ' level-2 index files.');
