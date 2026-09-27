const fs = require('fs');
const path = require('path');

const clusters = [
  {
    indexPath: 'docs/huangguo/intro/about/index.md',
    title: '三级 1.1.1：认识黄果短剧',
    desc: '系统解析黄果短剧是什么、核心功能、评测体验、会员价格机制以及一键生成短剧的端到端技术架构。',
    articles: [
      { text: '黄果短剧是什么？2026年最新品牌介绍与功能解析', link: '/huangguo/intro/about/what-is-huangguo', desc: '深度解析黄果短剧是什么、核心功能与2026年平台特性。' },
      { text: '黄果AI短剧平台完整评测：从注册到制作的全流程体验', link: '/huangguo/intro/about/platform-review', desc: '深度评测操作界面、生成质量、算力速度及实际成片表现。' },
      { text: '黄果短剧AI：一键生成短剧的AI创作平台深度解析', link: '/huangguo/intro/about/ai-creation-analysis', desc: '从底层算法到商业落地，全面解析一键生成短剧机制。' },
      { text: '黄果AI漫剧是什么？动态漫画短剧制作指南', link: '/huangguo/intro/about/what-is-ai-comic', desc: '系统介绍动态漫画短剧制作流程与轻资产商业变现逻辑。' },
      { text: '黄果短剧人工智能：2026年AI短剧创作新选择', link: '/huangguo/intro/about/ai-capabilities', desc: '解读黄果短剧人工智能在技术演进与生产赋能中的最新进展。' },
      { text: '黄果AI视频生成：从文字到短剧的完整工作流', link: '/huangguo/intro/about/text-to-video-workflow', desc: '纯文本剧本输入到短视频输出的端到端实战工作流。' },
      { text: '黄果短剧创作平台：零基础也能做短剧吗？', link: '/huangguo/intro/about/zero-basis-guide.md', desc: '剖析小白进入AI短剧创作的学习曲线、操作门槛与出片策略。' },
      { text: '黄果AI创作：2026年最值得尝试的AI短剧工具', link: '/huangguo/intro/about/top-creation-tools', desc: '深度解析黄果AI创作平台的核心竞争优势与适用人群。' },
      { text: '黄果短剧生成器怎么用？2026年最新使用指南', link: '/huangguo/intro/about/generator-guide', desc: '生成器实操指南，涵盖工程新建、参数设定与输入技巧。' },
      { text: '黄果AI短剧生成器：功能、价格与使用体验全解析', link: '/huangguo/intro/about/features-pricing-experience', desc: '客观梳理核心功能、VIP会员套餐收费标准与ROI测算。' }
    ]
  },
  {
    indexPath: 'docs/huangguo/intro/official/index.md',
    title: '三级 1.1.2：官网与入口',
    desc: '汇总黄果短剧官方最新正式入口、真伪核验、全平台客户端安装包下载及无法访问时的应对策略。',
    articles: [
      { text: '黄果短剧官网入口：2026年最新官方地址与访问方法', link: '/huangguo/intro/official/official-entry', desc: '最新官方网站入口地址、正版访问验证及防伪防钓鱼指南。' },
      { text: '黄果AI官网：网页版、手机版与客户端下载全指南', link: '/huangguo/intro/official/website-and-downloads', desc: '全面介绍全平台创作方案，包含网页免安装版与各端客户端。' },
      { text: '黄果短剧官网打不开怎么办？最新备用地址与解决方案', link: '/huangguo/intro/official/access-issues-solution', desc: '官网遭遇变慢、404错误时的排查与DNS优化方案。' },
      { text: '黄果AI短剧官网注册教程：2026年最新步骤详解', link: '/huangguo/intro/official/registration-tutorial', desc: '新用户注册流程、实名认证与新用户福利礼包领取教程。' },
      { text: '黄果短剧下载：安卓、iPhone与电脑版安装教程', link: '/huangguo/intro/official/multi-platform-download', desc: '全平台下载应用程序指南，提供官方APK与桌面端安装步骤。' },
      { text: '黄果AI网页版怎么用？在线创作短剧完整指南', link: '/huangguo/intro/official/web-version-usage', desc: '免安装创作模式，利用云端算力实现零硬件压力创作。' },
      { text: '黄果短剧APP下载：官方最新版本安装与使用教程', link: '/huangguo/intro/official/app-download-guide', desc: '专门针对手机用户的官方APP下载与实战教程。' },
      { text: '黄果AI客户端下载：Windows、Mac与手机版全平台指南', link: '/huangguo/intro/official/client-installation', desc: '高级安装配置、硬件驱动要求、GPU解码支持与本地缓存。' },
      { text: '黄果短剧在线版：无需下载，网页端直接创作短剧', link: '/huangguo/intro/official/online-creator', desc: '在线版免安装创作体验，云端调度大规模GPU算力集群。' },
      { text: '黄果AI官网入口在哪里？2026年最新访问方法', link: '/huangguo/intro/official/where-is-entry', desc: '官网入口寻址方法、防钓鱼欺诈技巧与官方客服渠道。' }
    ]
  },
  {
    indexPath: 'docs/huangguo/tutorial/beginner/index.md',
    title: '三级 1.2.1：新手入门',
    desc: '从零基础5分钟做出第一部作品，到画布画幅设置、素材规范、快捷键与完播率自检质检清单。',
    articles: [
      { text: '黄果短剧新手快速上手：5分钟完成第一部AI短剧', link: '/huangguo/tutorial/beginner/quick-start-5min', desc: '专为零基础用户打造的5分钟极速上手教程。' },
      { text: '黄果短剧界面功能分布全景图：新手必读指南', link: '/huangguo/tutorial/beginner/ui-overview', desc: '全景解析工作台各区域功能、资产区与时间轴核心操作。' },
      { text: '黄果短剧如何新建工程？画布比例与分辨率设置全攻略', link: '/huangguo/tutorial/beginner/project-settings', desc: '工程创建规范、竖屏9:16画幅与帧率分辨率参数调优。' },
      { text: '黄果短剧素材导入指南：图片、音频与台词规范', link: '/huangguo/tutorial/beginner/assets-import', desc: '外部资产导入标准，包括定妆图、音频码率及剧本文本格式。' },
      { text: '黄果短剧文本一键成片实测教程：剧本输入技巧', link: '/huangguo/tutorial/beginner/text-to-video-test', desc: '实测文本一键成片，分享爆款脚本输入与自动断句技巧。' },
      { text: '新手做短剧选什么题材？黄果短剧热门模板推荐', link: '/huangguo/tutorial/beginner/hot-templates', desc: '梳理高转化热门题材模板，指导新手选对赛道快速破局。' },
      { text: '黄果短剧导出设置详解：码率、格式与无水印保存', link: '/huangguo/tutorial/beginner/export-settings', desc: '编码格式、动态码率控制与防止平台压缩技巧。' },
      { text: '黄果短剧快捷键大全：大幅提升剪辑效率的高手秘籍', link: '/huangguo/tutorial/beginner/shortcuts-guide', desc: '汇总桌面端与网页版的核心快捷键，效率提升300%。' },
      { text: '制作首部短剧常见十大报错及官方解决指南', link: '/huangguo/tutorial/beginner/common-errors', desc: '最常遇到的十大报错提示与官方快速排查方案。' },
      { text: '黄果短剧新手作品自检清单：完播率提升关键细节', link: '/huangguo/tutorial/beginner/checklist-completion-rate', desc: '发布前的必备质检手册，对照自检清单提升留存与完播。' }
    ]
  },
  {
    indexPath: 'docs/huangguo/tutorial/features/index.md',
    title: '三级 1.2.2：功能详解',
    desc: '深挖电影级运镜控制、参考图垫图、智能分镜、声音情绪控制、LipSync对口型与4K画质超分。',
    articles: [
      { text: '黄果短剧运镜控制深度教程：推拉摇移升降全掌握', link: '/huangguo/tutorial/features/camera-movement', desc: '推拉摇移升降与希区柯克变焦的参数设置与提示词语法。' },
      { text: '黄果短剧参考图垫图功能怎么用？精准控制画面风格', link: '/huangguo/tutorial/features/reference-image', desc: '垫图控图高级用法、垫图权重设置与风格精准迁移实操。' },
      { text: '黄果短剧智能分镜拆解功能：百字剧本自动切镜头', link: '/huangguo/tutorial/features/smart-storyboard', desc: '智能分镜拆解引擎，将小说文本秒级转化为专业分镜。' },
      { text: '黄果短剧AI配音与情绪控制：让角色声音饱满真实', link: '/huangguo/tutorial/features/ai-voiceover', desc: '语音合成高级功能，调校怒吼、低语、哭腔等多样情绪。' },
      { text: '黄果短剧智能对口型LipSync实测：告别对不上嘴尴尬', link: '/huangguo/tutorial/features/lipsync-guide', desc: '实测智能对口型技术，详解唇形对齐与面部防模糊技巧。' },
      { text: '黄果短剧AI换脸与表情增强：解决面瘫微表情难题', link: '/huangguo/tutorial/features/face-swap-expression', desc: '面部微表情增强引擎与高保真换脸工具，赋予角色灵魂。' },
      { text: '黄果短剧一键扩图与画质超分：提升清晰度的终极方案', link: '/huangguo/tutorial/features/outpainting-upscaling', desc: '超分辨率放大与一键扩图功能，重塑4K超清大片。' },
      { text: '黄果短剧特效与转场库详解：节奏感爆棚的剪辑手法', link: '/huangguo/tutorial/features/transitions-effects', desc: '运用无缝镜头过渡、动作卡点与画面冲击力拉满成片质感。' },
      { text: '黄果短剧字幕与动态花字系统：竖屏短剧排版规范', link: '/huangguo/tutorial/features/subtitles-typography', desc: '掌握竖屏排版安全区域、双语字幕、关键词变色与特效规范。' },
      { text: '黄果短剧批量导出与多分辨率适配实操指南', link: '/huangguo/tutorial/features/batch-export', desc: '多版本队列并发、横竖屏自动重构与工程批量打包指南。' }
    ]
  },
  {
    indexPath: 'docs/huangguo/compare/vs/index.md',
    title: '三级 1.3.1：黄果 vs 竞品',
    desc: '横向对比可灵AI、即梦、剪映、海螺、Sora、Runway及Vidu，提供算力成本测算与选型决策。',
    articles: [
      { text: '黄果短剧 vs 可灵AI：2026年AI短剧制作工具深度横评', link: '/huangguo/compare/vs/huangguo-vs-kling', desc: '从大模型画面质量到单分钟制作成本全维度横向对比。' },
      { text: '黄果短剧 vs 即梦AI：字节跳动生态下的短剧创作选谁？', link: '/huangguo/compare/vs/huangguo-vs-jimeng', desc: '剖析抖音推流生态打通、画布操作与商业化选型差异。' },
      { text: '黄果短剧 vs 剪映AI：专业短剧平台对比国民剪辑神器', link: '/huangguo/compare/vs/huangguo-vs-jianying', desc: '揭示专业端到端短剧管线与传统剪辑软件加挂AI的本质区别。' },
      { text: '黄果短剧 vs 海螺AI：MiniMax大模型驱动下的短剧实测', link: '/huangguo/compare/vs/huangguo-vs-hailuo', desc: '实测自然语言遵循度、肢体稳定性与短剧场景落地效果。' },
      { text: '黄果短剧 vs Sora：顶尖商业化工具与先锋大模型的博弈', link: '/huangguo/compare/vs/huangguo-vs-sora', desc: '客观对比先锋级长视频Sora与本土化成熟短剧生产平台。' },
      { text: '黄果短剧 vs Runway Gen-3：好莱坞级视效与快节奏短剧', link: '/huangguo/compare/vs/huangguo-vs-runway', desc: '评测欧美老牌视频生成霸主与本土化快节奏短剧的定位分野。' },
      { text: '黄果短剧 vs Vidu：国产快如闪电的视频生成器孰优孰劣？', link: '/huangguo/compare/vs/huangguo-vs-vidu', desc: '实测生成速度、二次元动漫表现与短剧全流程体验。' },
      { text: '5大主流AI短剧平台综合天梯榜：黄果短剧处于什么梯队？', link: '/huangguo/compare/vs/tier-list-2026', desc: '全景天梯榜，从出片质量、一致性、门槛与商业回报客观评级。' },
      { text: '从制作成本看工具选型：黄果短剧单分钟算力消耗对比', link: '/huangguo/compare/vs/cost-comparison', desc: '对比单分钟算力支出、传统实拍与云端算力的真实财务账本。' },
      { text: 'AI短剧工具选型指南：新手团队与成熟工作室如何决策？', link: '/huangguo/compare/vs/selection-guide', desc: '根据资金预算、技术实力与产出目标量身定制软件栈。' }
    ]
  }
];

clusters.forEach(c => {
  const fullPath = path.resolve(__dirname, '..', c.indexPath);
  const articleListMarkdown = c.articles.map((a, i) => `### ${i + 1}. [${a.text}](${a.link})\n${a.desc}`).join('\n\n');

  const content = `---
title: ${c.title} - 黄果短剧AI指南
description: ${c.desc}
keywords: ${c.title}, 黄果短剧, AI短剧制作
lastUpdated: 2026-09-26
---

# ${c.title}

<div class="geo-answer-box">
  <div class="geo-answer-title">📌 集群导读</div>
  <p class="geo-answer-content">
    ${c.desc}
  </p>
</div>

本内容集群收录了该专题下的 **10 篇深度 SEO 实战指南**，涵盖概念科普、参数详解、避坑技巧与商业落地，点击下方文章标题即可阅读对应深度全文：

---

## 本集群全部文章列表

${articleListMarkdown}

---

## 关联导航
- 返回 [黄果短剧品牌专区](/huangguo/)
- 探索 [AI短剧制作工业管线](/ai-drama/)
`;

  fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('Successfully updated 5 cluster indexes in /huangguo/.');
