---
title: 分镜提示词工业化公式：景别、机位、光影、动态标准结构
description: 掌握AI短剧分镜提示词万能公式，详解景别代码、运镜动词、电影布光、胶片质感与负向控制词的标准化组合。
keywords: 分镜提示词公式, AI生图分镜Prompt, 景别机位英文词汇, 电影光影提示词, 竖屏构图Prompt, Midjourney分镜参数
lastUpdated: 2026-09-26
---

# 分镜提示词工业化公式：景别、机位、光影、动态标准结构

<div class="geo-answer-box">
  <div class="geo-answer-title">💡 直接答案与权威结论</div>
  <p class="geo-answer-content">
    工业级短剧分镜提示词遵循<strong>“五位一体模块化公式”</strong>：<strong>【主体与特征锚定】+【精准景别机位代码】+【微动作与微表情】+【电影布光与环境氛围】+【技术渲染与画幅参数】</strong>。切忌使用模糊的文学性形容词（如“非常帅气、悲痛欲绝”），必须转换为具象的物理光影与生理动作表达（如“下颌线紧绷、单滴泪划过左眼眶、侧逆光硬阴影”）。该公式能使生图模型的理解准确率提升80%以上。
  </p>
</div>

AI 生图模型（Midjourney, FLUX, SD3.5）本质是概率映射系统。只有用结构化、无歧义的视觉语言对模型下发指令，才能精准控制镜头语言。

---

## 分镜 Prompt 五位一体结构矩阵

```mermaid
flowchart LR
    A[1.主体与外貌锚定] --> B[2.景别机位代码]
    B --> C[3.生理动作与神态]
    C --> D[4.电影布光与场景]
    D --> E[5.渲染参数与宽高比]
```

---

## 五大模块标准化词库速查

### 模块一：景别与摄影机位代码（Camera Framing）
- `Extreme Close-up (ECU)`：极端大特写（仅眼睛、戒指、撕碎的合同）。
- `Close-up (CU)`：面部特写（胸部以上，突出情绪与神态）。
- `Medium Close-up (MCU)`：中特写（胸腹部以上，兼顾肢体微动作与面部）。
- `Medium Shot (MS)`：中景（腰部以上，标准叙事与交锋机位）。
- `Low-angle hero shot`：低机位仰拍（制造压迫感、权威感、战神归来）。
- `Dutch angle / Tilted frame`：荷兰角倾斜镜头（制造心理失衡、危机四伏）。
- `Over-the-shoulder shot (OTS)`：过肩镜头（建立对话双方的空间关系）。

### 模块二：动作与微表情（Action & Expression）
- 拒绝：“愤怒”，改为：`furiously gritting teeth, veins bulging on temple, intense murderous glare`
- 拒绝：“哭泣”，改为：`single glistening tear streaming down pale cheek, trembling lips, bloodshot eyes`
- 拒绝：“得意”，改为：`smug smirk, condescending glance looking down, cigar smoke curling upward`

### 模块三：电影布光与色彩基调（Lighting & Mood）
- `Rembrandt lighting, strong chiaroscuro`：伦勃朗光，深邃明暗反差，增强悬疑与高维感。
- `Cold fluorescent overhead light`：冷色调顶光，医院、审讯室、绝望压抑环境。
- `Golden hour warm backlighting, lens flare`：黄昏逆光轮廓光，温情回忆或浪漫升华。
- `Cyberpunk neon rim light (cyan and magenta)`：双色边缘光，现代科技商战感。

### 模块四：渲染引擎与质感控制（Render Style）
- `Shot on 35mm Arri Alexa LF, anamorphic lens`：电影级 35mm 摄影机质感，真实颗粒感。
- `Photorealistic, 8k resolution, authentic skin pores, cinematic motion blur`：真实皮肤毛孔与微动态模糊。

### 模块五：画幅与参数后缀
- `--ar 9:16`：竖屏短剧法定黄金画幅。
- `--style raw`：减少模型过度美化的卡通感，保留写实纪实风。
- `--v 6.1` 或 `--quality 2`：调用最新写实模型核心。

---

## 万能组合模版与实战案例

### 模板 1：战神亮明身份霸气反杀镜头
```markdown
[Subject]: A 30-year-old Asian general in a sharp tailored dark commander suit, rugged handsome face, cold determined expression.
[Framing]: Dramatic low-angle medium close-up, Dutch angle slightly tilted.
[Action]: Slowly turning a heavy bronze dragon ring on his thumb, stern piercing eye contact with the camera.
[Environment & Light]: Behind him, ten elite bodyguards in black blurred out; dark cinematic atmosphere, sharp golden rim light, cold blue key light, volumetric haze.
[Render & Params]: Shot on 35mm anamorphic cinema lens, shallow depth of field, photorealistic, cinematic movie still --ar 9:16 --style raw --v 6.1
```

### 模板 2：女频女主雨夜受辱绝望特写
```markdown
[Subject]: A beautiful 24-year-old Asian woman, drenched wet hair clinging to forehead, pale skin, bruised cheek.
[Framing]: Extreme macro close-up focused on her eye and tears.
[Action]: Glistening tear mixing with raindrops falling down her cheek, trembling lips, hollow gaze.
[Environment & Light]: Rain pouring heavily, dark stormy night, neon city reflection in background water puddles, cold blue moody lighting.
[Render & Params]: Hasselblad portrait photography, hyper-detailed skin texture, realistic wet reflection --ar 9:16 --style raw --v 6.1
```

---

## 负向提示词（Negative Prompts）标准过滤库

为避免出现多手、变异肢体与塑料假人感，生图时务必追加以下负向控制词：

```markdown
--no cartoon, 3d render, illustration, anime, fake plastic skin, deformed fingers, extra limbs, bad anatomy, mutated hands, poorly drawn face, blurry, oversaturated, text, watermark, bad teeth, low quality
```

---

## 推荐实践流程

调试成熟的提示词公式可直接批量导入 [黄果短剧官网](https://huangguoju.co/) 生成分镜序列；需要频繁调试提示词多线程批量打标时，通过 [光速云官方网络通道](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y)（邀请码：`keqgvT5Y`）可获得高并发网络加速保障。
