---
title: 视频生成 - 黄果短剧AI指南
description: 掌握文生视频、图生视频、首尾帧控制与小说改短剧完整管线，覆盖可灵、Runway、海螺等主流视频生成工具。
keywords: 视频生成,文生视频,图生视频,首尾帧控制,小说改短剧,可灵AI,Runway
lastUpdated: 2026-09-26
---

# 三级 2.1.4：视频生成

::: tip 集群定位与核心概览
掌握文生视频、图生视频、首尾帧控制与小说改短剧完整管线，覆盖可灵、Runway、海螺等主流视频生成工具。
本集群共收录 **10 篇** 工业化实战指南，覆盖从核心原理、标准提示词配方、参数规范到实战避坑排查的完整知识体系。
:::

## 核心文章列表

<div class="hg-card-grid">

  <div class="hg-card">
    <a href="/ai-drama/workflow/video/best-text-to-video-tools" class="hg-card-title">AI文字生成视频：2026年最佳工具与使用方法</a>
    <p class="hg-card-desc">横向评测2026年顶尖文字生成视频工具，对比可灵、Sora、Runway、Pika与国产新秀的出片效率与画质。</p>
    <a href="/ai-drama/workflow/video/best-text-to-video-tools" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/first-last-frame-interpolation" class="hg-card-title">首尾帧生成视频：2026年AI视频生成新方法</a>
    <p class="hg-card-desc">掌握前沿的首尾双关键帧控制技术（First-Last Frame），让AI在两个指定画面之间生成完美过渡运动。</p>
    <a href="/ai-drama/workflow/video/first-last-frame-interpolation" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/image-to-video-guide" class="hg-card-title">图生视频：2026年AI图生视频完整指南</a>
    <p class="hg-card-desc">短剧工业化核心命脉！深度拆解图生视频（Image-to-Video）工作流，用静态原画精准驱动动态镜头，告别废片。</p>
    <a href="/ai-drama/workflow/video/image-to-video-guide" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/image-to-video-tools-list" class="hg-card-title">图生视频AI：2026年图片生成视频工具推荐</a>
    <p class="hg-card-desc">全景盘点2026年顶尖图生视频工具梯队，从原画保真度、运镜可控性、生成时长与价格横向对比。</p>
    <a href="/ai-drama/workflow/video/image-to-video-tools-list" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/images-to-drama-production" class="hg-card-title">AI图生短剧：2026年图片转短剧完整教程</a>
    <p class="hg-card-desc">从多张原画设计、分镜编排到动态组装，系统教你如何用多张静态图组装出一整部高质感短剧。</p>
    <a href="/ai-drama/workflow/video/images-to-drama-production" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/novel-to-video-creation" class="hg-card-title">小说生成视频：2026年AI小说转视频完整教程</a>
    <p class="hg-card-desc">从万字网文到吸金推文短视频！系统掌握小说转视频的剧情提纯、场景还原、视效渲染与商业回本闭环。</p>
    <a href="/ai-drama/workflow/video/novel-to-video-creation" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/script-to-video-workflow" class="hg-card-title">剧本生成视频：AI短剧视频生成完整教程</a>
    <p class="hg-card-desc">从剧本段落直接批量转化为连续镜头视频！详解剧本驱动型端到端视频生成管线与自动化成片技巧。</p>
    <a href="/ai-drama/workflow/video/script-to-video-workflow" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/text-to-drama-generator" class="hg-card-title">AI文生短剧：2026年文字一键生成短剧</a>
    <p class="hg-card-desc">深度体验前沿的AI文生短剧技术，剖析一键生成整部短剧的能力边界、适用场景与商业落地策略。</p>
    <a href="/ai-drama/workflow/video/text-to-drama-generator" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/text-to-video-guide" class="hg-card-title">文生视频：2026年AI文生视频工具推荐与教程</a>
    <p class="hg-card-desc">系统解析文生视频（Text-to-Video）技术原理、主流大模型评测、提示词语法及商业短剧应用实操。</p>
    <a href="/ai-drama/workflow/video/text-to-video-guide" class="hg-card-link">阅读完整指南 →</a>
  </div>
  <div class="hg-card">
    <a href="/ai-drama/workflow/video/text-to-video-prompts" class="hg-card-title">AI文生视频提示词：2026年完整Prompt模板</a>
    <p class="hg-card-desc">汇总文生视频必备的物理动态描述词、摄影机速度参数、特效后缀与各题材现成Prompt模板库。</p>
    <a href="/ai-drama/workflow/video/text-to-video-prompts" class="hg-card-link">阅读完整指南 →</a>
  </div>
</div>

## 快速导航与专题关联

- 返回上级：[AI短剧制作专题](/ai-drama/)
- 进阶阅读：[黄果短剧提示词库](/prompts/library/drama/)
- 变现支持：[AI短剧商业化变现与矩阵运营](/monetize/operations/account/)
