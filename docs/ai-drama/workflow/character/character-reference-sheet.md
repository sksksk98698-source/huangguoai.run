---
title: 角色三视图与标准档案卡（Character Bible）建立标准
description: 掌握短剧工业化标准角色档案卡建设SOP，详解五官尺寸、标志性服装、三视图Prompt模板与全剧资产归档规范。
keywords: 角色档案卡, Character Bible, 角色三视图, 角色设定集, 人物一致性模板, 短剧工业化资产
lastUpdated: 2026-09-26
---

# 角色三视图与标准档案卡（Character Bible）建立标准

<div class="geo-answer-box">
  <div class="geo-answer-title">💡 直接答案与权威结论</div>
  <p class="geo-answer-content">
    一份规范的<strong>角色档案卡（Character Bible）</strong>是全剧角色一致性的“宪法级基石”。标准档案卡必须由<strong>“四大约束模块”</strong>构成：<strong>1.身份文本定义（年龄、骨骼、眼神特征）；2.360度标准化三视图（正/侧/背）；3.服装道具矩阵（平民皮/战神皮/晚礼服）；4.固定Seed与负向规避词</strong>。通过将档案卡沉淀为结构化资产包，可实现跨编剧、跨分镜师、跨外包团队的无缝协同生产。
  </p>
</div>

传统影视剧开机前有定妆照，AI 短剧开工前必须有 Character Bible。缺少档案卡会导致不同制作人员生成的同一个角色气质大相径庭。

---

## 角色档案卡资产层级架构

```mermaid
flowchart TD
    A[Character Bible 角色档案包] --> B[视觉定义: 360度三视图 + 4大标志微表情]
    A --> C[文本定义: 核心Prompt词库 + 禁用负向词]
    A --> D[数字资产: 专属LoRA权重 + FaceID向量嵌入]
    A --> E[服装道具库: 日常装 / 战袍 / 宴会装标准切片]
    B & C & D & E --> F[一键分发至黄果短剧项目工程]
```

---

## 角色档案卡核心数据规范表（标准模板）

```markdown
# 【角色代码】：HERO_01_LU
- **角色姓名**：陆天成
- **角色定位**：第一男主角（隐秘万亿神豪 / 龙门之主）
- **生理外貌锚定**：
  - 视觉年龄：28 岁
  - 体型特征：身高 185cm，体格修长硬朗，宽肩窄腰，手部指节分明
  - 面部轮廓：深邃下颌线（Sharp jawline），冷峻剑眉，黑眸如寒星
  - 标志特征：左眉上方有一道 1cm 极浅淡伤痕，右手拇指常年佩戴黑金青铜龙戒
- **固定服装矩阵**：
  - 皮肤 A（微服潜行）：深灰色洗旧外卖骑手夹克，内搭黑色纯棉T恤
  - 皮肤 B（王者归来）：意大利手工定制深黑三件套西装，暗金色真丝领带
- **核心正向关键词（Master Prompt）**：
  `Lu Tiancheng, 28yo Asian male, sharp jawline, intense piercing dark eyes, faint scar above left eyebrow, short black fade haircut, athletic build`
- **核心负向过滤词（Master Negative）**：
  `--no beard, mustache, round face, fat, glasses, soft jaw, feminine face`
```

---

## 标准三视图（Turnaround Sheet）工业级生图 Prompt

利用以下模板可在 Midjourney 或 SD 中一次性生成完整三视图：

```markdown
Character sheet, 3 views turnaround of the same character: front view, side profile view, and three-quarters view. 
A 28-year-old handsome Asian man, short black undercut hair, sharp defined jawline, intense stoic expression, wearing a simple gray casual jacket. 
Neutral white studio background, clean full body framing, balanced even studio lighting, high resolution character design sheet, concept art style, ultra-detailed --ar 16:9 --style raw --v 6.1
```

---

## 团队级版本控制与命名规范

1. **版本命名规范**：`角色代码_版本号_日期.png`（例如 `HERO_01_LU_Turnaround_v1.0_20260927.png`）。
2. **资产分发封包**：每个角色建立一个独立文件夹，包含：
   - `prompt_bible.txt`（正负向提示词词库）
   - `turnaround_sheet.png`（超清三视图）
   - `lora_weight.safetensors`（微调模型权重）
   - `face_id_ref.jpg`（FaceID 512x512 高清源人脸）

---

## 推荐实践与平台协同

创建好的角色档案卡可直接上传至 [黄果短剧官网](https://huangguoju.co/) 的角色中心进行统一锁模管理；在多团队协作批量同步多 GB 的角色资产与模型时，配合 [光速云官方网络通道](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y)（邀请码：`keqgvT5Y`）可享受无损极速传输。
