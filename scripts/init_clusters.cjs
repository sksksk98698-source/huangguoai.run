const fs = require('fs');
const path = require('path');

const clusters = [
  // 1. huangguo
  { path: 'docs/huangguo/intro/about/index.md', title: '认识黄果短剧', desc: '黄果短剧品牌介绍、平台评测与功能解析' },
  { path: 'docs/huangguo/intro/official/index.md', title: '官网与入口', desc: '黄果短剧官方最新入口、多端客户端下载与账号注册' },
  { path: 'docs/huangguo/tutorial/beginner/index.md', title: '新手入门', desc: '黄果短剧新手快速上手教程、界面详解与导出设置' },
  { path: 'docs/huangguo/tutorial/features/index.md', title: '功能详解', desc: '黄果短剧运镜控制、参考图垫图与LipSync口型同步等高阶功能' },
  { path: 'docs/huangguo/compare/vs/index.md', title: '黄果 vs 竞品', desc: '黄果短剧对比可灵、即梦、剪映、海螺与Sora深度横评' },

  // 2. ai-drama
  { path: 'docs/ai-drama/workflow/script/index.md', title: '剧本创作', desc: 'AI短剧剧本大纲、黄金三秒开场与ChatGPT/DeepSeek爆款Prompt' },
  { path: 'docs/ai-drama/workflow/storyboard/index.md', title: '分镜设计', desc: 'AI短剧分镜设计全流程、9种电影级景别与标准分镜表' },
  { path: 'docs/ai-drama/workflow/character/index.md', title: '人物一致性', desc: '攻克AI角色变脸难题、InstantID锁脸、三视图与定妆参考图' },
  { path: 'docs/ai-drama/workflow/video/index.md', title: '视频生成', desc: 'AI文生视频、图生短剧、首尾帧过渡与小说转视频' },
  { path: 'docs/ai-drama/workflow/audio-post/index.md', title: '配音与后期', desc: '影视级AI声音克隆、LipSync对口型、超分画质修复与自动剪辑' },
  { path: 'docs/ai-drama/tutorial/beginner/index.md', title: '零基础教程', desc: '小白做AI短剧第一天准备清单、电脑配置与避坑指南' },
  { path: 'docs/ai-drama/tutorial/advanced/index.md', title: '进阶实战', desc: '电影级光影一致性、复杂打斗动作、ComfyUI管线与工业化SOP' },
  { path: 'docs/ai-drama/tutorial/genre/index.md', title: '题材分类', desc: '都市、甜宠、霸总、逆袭、古装、玄幻等12类热门题材拆解' },

  // 3. ai-comic
  { path: 'docs/ai-comic/production/intro/index.md', title: '漫剧入门', desc: 'AI动态漫画风口解析、全套生产管线与标杆账号分析' },
  { path: 'docs/ai-comic/production/tutorial/index.md', title: '制作教程', desc: 'PS分层切图、2.5D视差运镜、战斗打击感与剪映后期' },
  { path: 'docs/ai-comic/production/character/index.md', title: '漫剧人物一致性', desc: '二次元动漫角色专属LoRA微调、标准三视图与表情包库' },
  { path: 'docs/ai-comic/novel-to-comic/adapt/index.md', title: '小说改编', desc: '万字网文精炼3分钟漫剧分镜、心理活动视听化与推文授权' },
  { path: 'docs/ai-comic/novel-to-comic/comic-video/index.md', title: '漫画转视频', desc: '静态漫画变动态视频、局部微动效低成本控制与线稿锐化' },

  // 4. ai-tools
  { path: 'docs/ai-tools/recommend/drama/index.md', title: 'AI短剧工具', desc: '2026年做AI短剧必备的10款全流程神器深度评测' },
  { path: 'docs/ai-tools/recommend/comic/index.md', title: 'AI漫剧工具', desc: '二次元绘画、智能分层抠图、骨骼微动效与动漫音效库' },
  { path: 'docs/ai-tools/recommend/free/index.md', title: '免费工具', desc: '零成本做短剧完全免费工具全集、每日签到领算力平台汇总' },
  { path: 'docs/ai-tools/models/video/index.md', title: '视频模型', desc: '快手可灵、字节Seedance、OpenAI Sora、海螺AI视频大模型实测' },
  { path: 'docs/ai-tools/models/image/index.md', title: '图像模型', desc: 'FLUX极致写实、Midjourney v6电影级构图与SDXL人设原画' },
  { path: 'docs/ai-tools/models/compare/index.md', title: '模型对比', desc: '主流AI视频模型横评天梯榜、性价比选型指南与跑分实测' },

  // 5. prompts
  { path: 'docs/prompts/library/drama/index.md', title: '短剧提示词', desc: '开箱即用AI短剧爆款Prompt模板、结构化公式与千万播放案例' },
  { path: 'docs/prompts/library/storyboard/index.md', title: '分镜提示词', desc: '电影级机位角度、推拉摇移运镜控制、景深光影与大师调色' },
  { path: 'docs/prompts/library/character/index.md', title: '人物提示词', desc: '男女主人设微雕、恶毒反派外貌、服装穿搭与Negative Prompt' },
  { path: 'docs/prompts/library/model/index.md', title: '模型提示词', desc: '可灵专属运镜语法、Seedance公式、Midjourney后缀与跨模型转译' },

  // 6. monetize
  { path: 'docs/monetize/income/methods/index.md', title: '赚钱方式', desc: 'AI短剧与漫剧核心变现渠道、上班族副业起步与小说推文' },
  { path: 'docs/monetize/income/business/index.md', title: '商业模式', desc: '短剧CPS分销挂载、投流买量ROI测算、品牌商单报价与合伙人协议' },
  { path: 'docs/monetize/operations/account/index.md', title: '账号运营', desc: '抖音快手冷启动SOP、算法推流底层机制、高点击封面与防封红线' },
  { path: 'docs/monetize/operations/global/index.md', title: '出海运营', desc: 'TikTok短剧起号、YouTube Shorts分成、欧美爆款逻辑与合规避税' }
];

clusters.forEach(c => {
  const fullPath = path.resolve(__dirname, '..', c.path);
  const content = `---
title: ${c.title} - 黄果短剧AI指南
description: ${c.desc}
keywords: ${c.title}, 黄果短剧, AI短剧
lastUpdated: 2026-09-26
---

# ${c.title}

${c.desc}。

> 本集群包含本专题下的系统化深度教程与实战指南，详见各章节导航与深度文章。
`;
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('Successfully initialized ' + clusters.length + ' cluster index files.');
