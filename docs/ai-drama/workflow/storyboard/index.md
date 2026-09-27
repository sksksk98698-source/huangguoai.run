---
title: 分镜设计 - 黄果短剧AI指南
description: 深度解析AI短剧分镜设计全流程，涵盖景别机位、180度轴线规则、Midjourney分镜生成与情绪打斗分镜模板。
keywords: 分镜设计,景别调度,180度轴线,分镜Prompt,情绪打斗分镜,Midjourney分镜
lastUpdated: 2026-09-26
---

# 三级 2.1.2：分镜设计

::: tip 集群定位与核心概览
深度解析AI短剧分镜设计全流程，涵盖景别机位、180度轴线规则、Midjourney分镜生成与情绪打斗分镜模板。
本集群共收录 **10 篇** 工业化实战指南，覆盖从核心原理、标准提示词配方、参数规范到实战避坑排查的完整知识体系。
:::

## 核心文章列表

<div class="hg-card-grid">

  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/180-degree-rule" class="hg-card-title">镜头轴线规则（180度法则）在AI视频生成中的应用</a>
    <p class="hg-card-desc">系统剖析影视经典180度轴线规则，解决AI短剧对话正反打镜头中人物方向颠倒、越轴穿帮的致命问题。</p>
    <a href="/ai-drama/workflow/storyboard/180-degree-rule" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/action-scenes-storyboard" class="hg-card-title">动作戏与追逐戏分镜设计：高动态镜头的提示词要点</a>
    <p class="hg-card-desc">专为打斗戏、枪战、追逐戏打造的分镜设计手册，攻克AI视频高动态下的画面崩坏与肢体形变。</p>
    <a href="/ai-drama/workflow/storyboard/action-scenes-storyboard" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/ai-storyboard-tools-review" class="hg-card-title">AI分镜工具评测：StoryNode、Boords与国产分镜神器</a>
    <p class="hg-card-desc">横向评测全网主流AI分镜工具，对比剧本智能解析、分镜出图效率、协作导出与商业性价比。</p>
    <a href="/ai-drama/workflow/storyboard/ai-storyboard-tools-review" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/camera-shots-framing" class="hg-card-title">9种电影级景别在AI短剧中的运用：大远景到极度特写</a>
    <p class="hg-card-desc">从大远景（EWS）、全景、中景、特写到大特写（ECU），全面解析9种经典电影景别的视觉心理学与Prompt写法。</p>
    <a href="/ai-drama/workflow/storyboard/camera-shots-framing" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/complete-storyboard-guide" class="hg-card-title">AI短剧分镜设计全流程：从文本剧本到视觉镜头语言</a>
    <p class="hg-card-desc">从剧本文本转化为镜头画面的全景指南，掌握景别切换、机位调度、轴线原则与分镜图工业化绘制。</p>
    <a href="/ai-drama/workflow/storyboard/complete-storyboard-guide" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/drama-emotional-scenes" class="hg-card-title">情感戏与对峙戏分镜设计：双人同框与正反打技巧</a>
    <p class="hg-card-desc">深度解析细腻情感戏与剑拔弩张对峙戏的分镜调度，掌握双人同框平衡、视线拉扯与心理距离视觉化。</p>
    <a href="/ai-drama/workflow/storyboard/drama-emotional-scenes" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/duration-and-pacing" class="hg-card-title">分镜时长与音乐卡点预估：成片剪辑节奏的前置规划</a>
    <p class="hg-card-desc">从导演视听节奏出发，掌握短剧单镜头时长黄金法则、BGM高潮对齐与如何避免剧情拖沓冗长。</p>
    <a href="/ai-drama/workflow/storyboard/duration-and-pacing" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/midjourney-storyboard" class="hg-card-title">Midjourney制作短剧分镜草图全套技巧：一致性构图</a>
    <p class="hg-card-desc">实战讲解如何利用Midjourney v6的--cref、--sref参数与平移Pan、缩放Zoom功能高效绘制连续分镜草图。</p>
    <a href="/ai-drama/workflow/storyboard/midjourney-storyboard" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/storyboard-prompts-formula" class="hg-card-title">AI短剧分镜提示词（Prompt）撰写公式：画面精准可控</a>
    <p class="hg-card-desc">拆解电影工业级分镜Prompt黄金结构，掌握主体、动作、环境、机位、光影与画质参数的精准控制公式。</p>
    <a href="/ai-drama/workflow/storyboard/storyboard-prompts-formula" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/storyboard/storyboard-templates" class="hg-card-title">标准短剧分镜表模板：直接套用的Excel与Markdown格式</a>
    <p class="hg-card-desc">提供影视工业级标准的短剧分镜表模板，包含镜头号、景别、运镜、提示词、参考图、台词音频与时长标注。</p>
    <a href="/ai-drama/workflow/storyboard/storyboard-templates" class="hg-card-link">阅读完整指南 →</a>
  </div>
</div>

## 快速导航与专题关联

- 返回上级：[AI短剧制作专题](/ai-drama/)
- 进阶阅读：[黄果短剧提示词库](/prompts/library/drama/)
- 变现支持：[AI短剧商业化变现与矩阵运营](/monetize/operations/account/)
