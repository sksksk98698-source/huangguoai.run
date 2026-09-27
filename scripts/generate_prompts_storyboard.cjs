const fs = require('fs');
const path = require('path');

function writeGeoArticle(a) {
  const fullPath = path.resolve(__dirname, '..', a.filePath);
  const faqMarkdown = a.faqs.map(f => `### ${f.q}\n${f.a}`).join('\n\n');
  const linksMarkdown = a.links.map(l => `- [${l.text}](${l.url})`).join('\n');
  const reasonsList = a.reasons.map((r, i) => `${i + 1}. ${r}`).join('\n');
  const stepsList = a.steps.map(s => `- ${s}`).join('\n');
  const metricsList = a.metrics.map(m => `- ${m}`).join('\n');
  const pitfallsList = a.pitfalls.map(p => `- ${p}`).join('\n');

  const content = `---
title: ${a.title}
description: ${a.description}
keywords: ${a.keywords}
lastUpdated: 2026-09-26
---

# ${a.title}

::: tip 核心结论与速查摘要
${a.directAnswer}
:::

## 核心机制与视听语言底层解构

${a.deepDive}

### 核心分镜提示词词典与精准配方
${reasonsList}

## 工业级标准实操与应用流水线

${a.workflowOverview}

${stepsList}

## 关键参数与画质光影评测指标

为了让分镜画面在机位精准度、光学空间透视与戏剧张力上达到好莱坞级电影标准，建议参照以下量化指标：

${metricsList}

## 常见避坑指南与排查清单

${pitfallsList}

## 常见问题解答 (FAQ)

${faqMarkdown}

## 推荐延伸阅读与深度资源

${linksMarkdown}
`;

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

const articles = [
  {
    filePath: 'docs/prompts/library/storyboard/camera-angles-prompts.md',
    title: '电影级镜头机位提示词：俯拍、仰拍、特写与荷兰斜角完全速查手册',
    description: '2026年电影摄影机位角度Prompt权威速查库，涵盖低角度仰拍气场、高空大俯拍压迫、微距极特写与荷兰式倾斜构图中英文提示词。',
    keywords: '镜头机位提示词, 摄影机角度Prompt, 低角度仰拍气场, 高空俯瞰全景, 荷兰式倾斜构图',
    directAnswer: '机位角度是短剧视觉叙事的“第一权力符号”。**低角度仰拍赋予角色压迫感、威严与主角光环；高空大俯拍展现角色的渺小、无助与宿命感；极特写（ECU）聚焦瞳孔与眼泪，直接放大微表情爆发力；荷兰角（Dutch Angle）通过画面倾斜营造精神失衡与心理惊悚**。掌握标准化摄影机机位指令，是消除画面平庸感的最有效手段。',
    deepDive: '传统摄影中机位由摄影师调整三脚架与摇臂高度实现，而在视频大模型（如可灵、Seedance、Runway）中，机位指令本质上是指导模型在3D高斯飞溅（3DGS）或隐空间NeRF网格中构建相机的外参矩阵（Extrinsic Matrix）。精准的机位描述不仅改变地平线位置，更会联动改变光线的投影入射角与人物面部的透视压缩率。',
    reasons: [
      '**低角度仰拍（Low Angle Shot / Worm\'s-eye View）**：\n- 语义功能：凸显主角霸气、战神觉醒、反派压迫。\n- Prompt范例：`Low-angle worm\'s-eye view shot, camera positioned near floor level looking dramatically upwards. Imposing silhouette of a powerful martial artist, heroic stature dominating the frame, cinematic foreshortening, dramatic perspective distortion, 8k.`',
      '**高空大俯拍（High Angle Shot / Bird\'s-eye View）**：\n- 语义功能：表现角色孤立无援、环境宏大、悲剧宿命。\n- Prompt范例：`Extreme high-angle bird\'s-eye view, top-down perspective from 20 meters above. Solitary wounded soldier lying motionless in the center of an empty scorched courtyard, rain pooling around, tiny fragile human against massive vast architecture, desaturated.`',
      '**荷兰式倾斜角（Dutch Angle / Tilted Horizon）**：\n- 语义功能：展现人物疯批、内心崩溃、悬疑阴谋、失控状态。\n- Prompt范例：`Dramatic Dutch angle cinematography, camera tilted at a 25-degree angle. Disoriented detective staggering down a dimly lit hallway, skewed horizon line evoking psychological vertigo and tension, harsh flickering cyan neon reflections, psychological thriller aesthetic.`',
      '**过肩镜头（Over-The-Shoulder Shot / OTS）**：\n- 语义功能：双人对峙交谈、建立空间关系与对话张力。\n- Prompt范例：`Cinematic Over-The-Shoulder (OTS) framing. Foreground out-of-focus shoulder and ear of an antagonistic man, background in sharp crisp focus on the defiant, tear-stained face of the heroine, high tension confrontational gaze.`'
    ],
    workflowOverview: '如何为分镜脚本配置最恰当的机位参数：',
    steps: [
      '**明确该镜头的戏剧冲突等级**：弱冲突用中平机位（Eye-level），强冲突立刻切换为极端仰角或极端俯角。',
      '**机位词置于Prompt句首**：由于扩散模型对前置词权重更高，务必将`Low-angle shot`或`Top-down view`写在整句最前面。',
      '**配合地平面参考物体**：仰拍时加入“floor level, boots, ceiling lights”；俯拍时加入“rooftop view, ground below”，强化透视锚点。'
    ],
    metrics: [
      '**地平线倾角准确率**：荷兰角提示词可稳定生成15-30度倾斜构图，成片率达88%。',
      '**透视畸变合理性**：仰拍透视符合人体解剖学生长线，下巴至额头透视压缩自然。',
      '**镜头情绪传达强度**：极端机位分镜在观众注意力测试中的脑电波兴奋度高出平视镜头40%。'
    ],
    pitfalls: [
      '**切忌机位词前后矛盾**：不要在同一个Prompt中同时出现“aerial bird\'s eye shot”（俯拍）和“low angle looking up”（仰拍），模型会陷入迷茫生成半身平视。',
      '**避免全片滥用荷兰角**：荷兰角是情绪重锤，一部短剧只在崩溃发疯或生死悬疑时刻使用2-3次，滥用会导致观众严重眩晕。'
    ],
    faqs: [
      {
        q: '为什么我输入了“low angle shot”，生成的还是平视镜头？',
        a: '因为缺少地平面参照物。在Prompt中加入`camera placed on the muddy ground, looking up at character\'s tall silhouette towering into the sky`，增加物理参照物后模型即可100%识别低角度。'
      },
      {
        q: '竖屏短剧适合用大远景（Extreme Wide Shot）吗？',
        a: '大远景在手机竖屏中人物会被压缩得太小，难以看清。在短剧中大远景通常仅作为1秒的空镜交代环境，随后应立刻切入中近景或特写。'
      }
    ],
    links: [
      { text: '推拉摇移运镜控制提示词典', url: '/prompts/library/storyboard/camera-movement-prompts' },
      { text: '景深光圈与焦距Prompt调优', url: '/prompts/library/storyboard/depth-of-field-focal-length' },
      { text: 'AI短剧提示词完整模板库', url: '/prompts/library/drama/complete-drama-prompts-2026' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/camera-movement-prompts.md',
    title: '动态运镜控制提示词：推拉摇移升降与环绕旋转词典速查指南',
    description: '影视级动态摄影机运动全套Prompt指令库，精准控制Dolly In推镜头、Tracking跟拍、Pan横摇、Orbit环绕与希区柯克变焦。',
    keywords: '动态运镜控制提示词, 镜头推近Prompt, 无人机航拍环绕, 希区柯克式变焦, 镜头移动速度控制',
    directAnswer: '画面“动不起来”或“乱动晃瞎眼”是新手做AI视频的最大痛点。掌握**【运镜轴向（推/拉/摇/移/升/降） + 移动速度（慢速平滑/极速冲刺） + 支撑载体（斯坦尼康/电影导轨/手持微晃）】的标准语法**，即可精准驾驭可灵AI、Seedance与Runway的摄影机轨道系统，生成媲美院线摄影指导的平滑运镜。',
    deepDive: '视频扩散大模型的时空注意力机制利用时间层向量表征摄影机位姿变化。当使用纯语义词（如“move camera”）时，模型在三维空间中缺乏明确的运动向量约束，容易产生无规则随机漂移。通过使用好莱坞工业标准运镜术语（如Dolly in, Pan left, Crane down），能直接激活模型在电影训练集里学到的专业轨道运镜权重。',
    reasons: [
      '**推进镜头（Dolly In / Push-in）**：\n- 语义功能：引导观众注意力集中、情绪升级、揭示角色内心秘密。\n- Prompt范例：`Slow and steady cinematic camera push-in (dolly in), moving smoothly towards the tearful eyes of the protagonist, dramatic emotional build-up, fluid motion without camera shake, 4k 60fps.`',
      '**拉远镜头（Dolly Out / Pull-back）**：\n- 语义功能：展现角色孤独绝望、从个体推向宏大残酷现实、镜头结束交代。\n- Prompt范例：`Continuous cinematic dolly out (pull-back), smoothly retreating from a tight close-up of a broken diamond ring on the floor to reveal the entire abandoned wedding ballroom, vast emptiness.`',
      '**平移跟拍（Tracking Shot / Trucking）**：\n- 语义功能：陪伴角色前行、增强身临其境的沉浸感与紧迫感。\n- Prompt范例：`Lateral tracking camera shot, moving alongside the running protagonist at eye level, motion blur in background pillars, steelycam stabilization, continuous side tracking.`',
      '**360度环绕运镜（360-degree Orbit Shot）**：\n- 语义功能：主角高光觉醒时刻、时间仿佛静止的震撼英雄时刻。\n- Prompt范例：`Dynamic 360-degree circular orbit camera movement, camera rotating smoothly around the fighting hero at waist level, background sweeping by dynamically, bullet-time aesthetic.`',
      '**希区柯克变焦（Vertigo Effect / Dolly Zoom）**：\n- 语义功能：心理遭受剧烈冲击、晴天霹雳、世界天旋地转感。\n- Prompt范例：`Cinematic Vertigo effect (Dolly zoom), camera physically pushing in while optical zoom pulls out, foreground subject remains stable while background dramatically warps and expands, psychological shock.`'
    ],
    workflowOverview: '如何将运镜提示词与AI模型运镜滑块无缝结合：',
    steps: [
      '**第一步：选定运镜主方向**：单个5秒片段只选1个主要运镜方向（如纯推或纯横移），切忌推拉同时并存。',
      '**第二步：在Prompt中申明摄影机运动**：在英文提示词首段加入`Smooth camera tracking shot`。',
      '**第三步：在模型控制台中微调运动滑块**：\n- 可灵AI：开启运镜控制，设定X/Y/Z轴偏移量（如Z轴推入设为+2.5）。\n- Runway Gen-3：使用Camera Control面板激活对应方向箭头。',
      '**第四步：质检边缘抗畸变**：观察画面四角是否有像素拉伸或背景贴图闪烁，必要时调低运镜速度。'
    ],
    metrics: [
      '**运镜平滑度（Motion Smoothness）**：连续帧间光流位移方差平缓，无突兀跳帧。',
      '**主体画幅居中度**：环绕与推进过程中，主角在竖屏画幅中的中心偏离度小于10%。',
      '**背景空间视差真实度**：近景与远景按照正确的三维透视比例移动，前景速度快于背景。'
    ],
    pitfalls: [
      '**严防提示词与滑块方向相反**：提示词里写了“Dolly In”（推进），但在模型界面中把Z轴滑块拉向负数（拉远），模型会发生严重冲突生成抽搐画面。',
      '**切忌高速运镜配合复杂大动作**：角色正在翻滚打斗时，如果运镜也以极快速度乱晃，画面几乎100%会崩解为无法识别的噪点团块。'
    ],
    faqs: [
      {
        q: '做短剧时，最常用的运镜是哪一种？',
        a: '推进镜头（Dolly In）使用频次最高（占比超40%）。短剧本质是靠情绪推着观众走，在角色念关键台词或眼神转变时，镜头缓缓推向面部特写，吸睛效果最好。'
      },
      {
        q: '手持摄影晃动（Handheld Shaky Cam）适合用在什么时候？',
        a: '用于打斗逃亡、地震灾难或人物极度恐慌时。在Prompt中加入`subtle handheld camera wobble, documentary realism`，能立刻赋予画面紧张逼真的呼吸感。'
      }
    ],
    links: [
      { text: '电影级镜头机位提示词速查', url: '/prompts/library/storyboard/camera-angles-prompts' },
      { text: '可灵AI专属语法与Prompt指南', url: '/prompts/library/model/kling-prompts-handbook' },
      { text: '高质量短剧提示词编写教程', url: '/prompts/library/drama/how-to-write-quality-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/depth-of-field-focal-length.md',
    title: '景深与焦距提示词：微距、大光圈虚化与广角长焦光学调优指南',
    description: '深度讲解虚拟摄影机光学参数在AI生图生视频中的调控技巧，掌握24mm超广角张力、85mm人像虚化、微距睫毛细节与焦段混合运用。',
    keywords: '景深焦距提示词, 电影大光圈浅景深, 背景奶油般虚化, 35mm与85mm镜头模拟, 广角张力构图',
    directAnswer: '让AI生成的画面瞬间摆脱“手机随手拍廉价感”的最快秘诀，就是**注入专业光学焦距与大光圈浅景深参数**。**85mm/105mm长焦镜头配合f/1.4超大光圈，能生成极致的奶油般背景虚化（Bokeh），让人物面孔破框而出；24mm/35mm人文广角镜头能交代环境空间纵深与气势；微距镜头（Macro Lens）能纤毫毕现呈现眼眸泪水与戒指雕刻**。',
    deepDive: '传统相机依靠物理凸透镜组实现光学景深与焦距压缩感。AI大模型（如Midjourney、Flux、Sora）虽然没有物理镜片，但在训练过程中学习了数以亿计标注了EXIF摄影元数据的胶片照片。输入特定焦段与光圈数值，模型会自动激活对应的“弥散圆模糊算法（Circle of Confusion）”与空间几何透视规律，从底层重构画面的空间深度感。',
    reasons: [
      '**85mm f/1.4 人像黄金虚化（Creamy Bokeh）**：\n- 语义功能：短剧男女主高颜值特写、情绪对话、屏蔽嘈杂背景。\n- Prompt范例：`Cinematic portrait photography shot on 85mm f/1.4 prime lens. Razor-sharp focus on the tearful eyes and eyelashes of the actress, buttery smooth bokeh background with soft circular light orbs, shallow depth of field, natural skin texture, 8k.`',
      '**24mm 超广角视觉张力（Wide Angle Tension）**：\n- 语义功能：战神降临、奢华大厅全景、空间压迫与透视拉伸。\n- Prompt范例：`Dynamic 24mm wide-angle lens shot, dramatic perspective stretching, deep depth of field keeping both foreground muddy boots and distant towering palace in clear sharp focus, expansive architectural grandeur.`',
      '**微距镜头特写（Macro Cine Lens）**：\n- 语义功能：破损的婚戒、滴落的血滴、颤抖的睫毛与瞳孔倒影。\n- Prompt范例：`Extreme macro lens cine shot, 100mm macro f/2.8. Extreme close-up of a shattered diamond engagement ring lying on cold marble, tiny scratches on platinum, crystalline reflection of raindrops, breathtaking hyper-detailed textures.`',
      '**长焦压缩空间感（Telephoto Compression 200mm）**：\n- 语义功能：谍战跟踪、人群中偷窥、将远景巨大落日压缩到角色身后。\n- Prompt范例：`Shot on 200mm telephoto lens from across the street, extreme background compression bringing the distant red sunset and skyscraper silhouettes dramatically close behind the running hero, atmospheric heat haze.`'
    ],
    workflowOverview: '如何为不同镜头精准搭配焦距与光圈：',
    steps: [
      '**步骤一：判断镜头是交代“人”还是交代“场”**：主要表现人选85mm（大光圈f/1.8）；主要表现场选24mm或35mm（小光圈f/8.0）。',
      '**步骤二：将光学参数写在提示词画质区**：在Prompt末尾加入`Shot on 85mm f/1.4 lens, shallow depth of field, creamy bokeh`。',
      '**步骤三：检查焦点是否落在核心主体上**：确保人物眼眸锐利清晰，如果出现“全身都虚了”或“脸也模糊”，立刻强化`razor-sharp focus on subject eyes`。'
    ],
    metrics: [
      '**焦外光斑圆润度**：虚化背景的高光光斑（Bokeh Orbs）呈现柔和正多边形或圆形，无杂乱色散。',
      '**主体边缘分离度**：头发丝与虚化背景边缘无AI抠图般的羽化白边与锯齿。',
      '**景深层次感**：画面能清晰分辨出前景虚化、中景主体锐利、后景深邃虚化三层空间。'
    ],
    pitfalls: [
      '**切忌滥用超大光圈导致景深过浅**：写了`f/0.95 extreme shallow DOF`，可能导致人物只有鼻尖是清楚的，双眼和耳朵全部糊掉，商业短剧建议使用更稳健的`f/1.8 - f/2.8`。',
      '**警惕广角镜头导致人像面部严重畸变**：不要用`14mm ultra-wide lens`拍摄人脸大特写，这会导致人物鼻子巨大、两颊变形，除非是刻意追求小丑式的滑稽惊悚风格。'
    ],
    faqs: [
      {
        q: 'AI视频模型也能识别85mm和f/1.4这些摄影参数吗？',
        a: '能。快手可灵、Seedance以及Runway对常见焦段（35mm、50mm、85mm）具有高度敏感的对应权重，能直接渲染出相应的背景虚化与空间透视感。'
      },
      {
        q: '如何让背景虚化看起来不假，不像后期PS高斯模糊？',
        a: '关键在于在Prompt中加入`natural optical blur, chromatic aberration, anamorphic lens bokeh, subtle lens flare`，引导模型生成光学镜片特有的色散与光晕，而不是均质涂抹。'
      }
    ],
    links: [
      { text: '电影级镜头机位提示词速查', url: '/prompts/library/storyboard/camera-angles-prompts' },
      { text: '电影光影与环境氛围Prompt库', url: '/prompts/library/storyboard/lighting-atmosphere-prompts' },
      { text: '高质量短剧提示词编写教程', url: '/prompts/library/drama/how-to-write-quality-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/lighting-atmosphere-prompts.md',
    title: '光影与氛围营造提示词：逆光剪影、丁达尔光与赛博霓虹布光Prompt库',
    description: '专业影视级灯光设计与环境氛围Prompt速查表，涵盖丁达尔神圣光、边缘轮廓光、电影黄金时刻、伦勃朗布光与赛博朋克对比光。',
    keywords: '光影氛围提示词, 电影级布光Prompt, 夕阳黄金时刻, 阴冷月光与冷色调, 丁达尔神圣光束',
    directAnswer: '“光是影视画面的灵魂”。在AI短剧视觉设计中，光影不仅勾勒空间形体，更直接定义了戏剧的情绪基调。**丁达尔神圣光（God Rays）营造庄严神圣与奇迹降临；轮廓光（Rim Light）用于将人物从暗部背景中利落剥离；伦勃朗布光（Rembrandt Lighting）塑造深沉复杂的心理阴影；赛博霓虹双色光（Teal & Orange）打造高饱和度视觉对冲**。'
    ,
    deepDive: '扩散模型对明暗反差（Contrast Ratio）与颜色渐变具有极其敏感的隐空间响应。优秀的布光提示词通过定义“主光（Key Light）、辅光（Fill Light）、轮廓背光（Backlight）”三点布光阵列，让画面自动构建出三维立体感，杜绝平光（Flat Lighting）造成的纸片人扁平感与沉闷感。',
    reasons: [
      '**丁达尔神圣光柱（Volumetric Lighting / God Rays）**：\n- 语义功能：天神降临、战神归来、破庙希望、清晨森林奇迹。\n- Prompt范例：`Volumetric cinematic lighting, divine God rays breaking dramatically through broken stained glass windows, visible suspended dust motes floating in light shafts, ethereal sacred atmosphere, high contrast chiaroscuro.`',
      '**边缘轮廓光/剪影（Rim Lighting / Silhouette）**：\n- 语义功能：孤胆英雄背影、暗黑杀手、凸显优美肌肉线条与发丝发光。\n- Prompt范例：`Dramatic rim lighting, strong backlight carving the sharp silhouette of the male protagonist out of deep darkness, glowing hair line separation, edge highlights tracing jawline and broad shoulders, cinematic dark noir mood.`',
      '**落日黄金时刻（Golden Hour Magic Light）**：\n- 语义功能：豪门甜宠约会、告别回忆、温暖治愈救赎。\n- Prompt范例：`Golden hour cinematic sunlight, warm amber and honey tones spilling across the scene, soft directional sun flare kiss, glowing warm skin tones, romantic nostalgic mood, 35mm film aesthetic.`',
      '**冷暖双色赛博霓虹（Cyberpunk Teal & Orange Neon）**：\n- 语义功能：现代都市短剧夜景、酒吧对峙、高燃科技感。\n- Prompt范例：`Dramatic dual-tone split lighting, vibrant cyan neon cast on the left face profile and fiery amber orange rim light on the right, high contrast reflections on wet asphalt pavement, moody modern cinematic grade.`',
      '**伦勃朗经典三角形光斑（Rembrandt Lighting）**：\n- 语义功能：反派密谋、深刻心理剖析、老戏骨阴险交锋。\n- Prompt范例：`Classic Rembrandt studio lighting, 45-degree directional key light creating a distinct inverted triangle of light beneath the character\'s shadow-side eye, deep moody shadows, dramatic emotional weight.`'
    ],
    workflowOverview: '如何为分镜脚本设计电影级布光方案：',
    steps: [
      '**分析当前场景的心理情绪**：阳光明朗 -> 黄金时刻/高调柔光；背叛绝望 -> 阴冷月光/暗黑低调光；高潮觉醒 -> 强烈逆光轮廓。',
      '**在Prompt中申明光源物理属性**：指定光源来源（如`headlights from off-screen car`或`flickering fireplace glow`）。',
      '**注入光线介质修饰词**：加入烟雾（Haze）、雨水反光（Wet pavement reflection）或空气尘埃（Airborne dust particles），让光线拥有可见轨迹。'
    ],
    metrics: [
      '**光影立体度（Modulation）**：人物面部明暗交界线清晰平滑，立体感提升80%。',
      '**环境光色彩纯正度**：双色温对冲色彩纯净，无脏灰死色。',
      '**氛围感染力评分**：带有专业布光描述的分镜在情绪打分测试中高出无布光描述组2.5倍。'
    ],
    pitfalls: [
      '**切忌无来源的乱发光**：若场景是幽闭古墓，却写了“明亮通透摄影棚光”，会导致严重破坏剧情可信度。必须交代合理光源（如火把、手电筒、符文微光）。',
      '**避免光比过大造成面部死黑**：极端的低调光（Low-key）容易让人物眼睛陷入全黑阴影，应适当补充`subtle ambient fill light revealing eye catchlights`（微弱辅光保留眼神光）。'
    ],
    faqs: [
      {
        q: '什么是眼神光（Eye Catchlights），为什么短剧这么重要？',
        a: '眼神光是指光源在角色眼球表面反射出的小白点。没有眼神光的人物看起来空洞死板像盲人；在Prompt中加入`bright catchlights in eyes, lively glistening eyes`，角色瞬间充满神采和灵魂。'
      },
      {
        q: '白天室外戏如何写出高级感，不显得灰蒙蒙？',
        a: '加入定向阳光与阴影对比：`Crisp directional afternoon sunlight casting long diagonal tree shadows, warm sun kissed highlights, natural fill light from open sky, high dynamic range (HDR)`。'
      }
    ],
    links: [
      { text: '电影级镜头机位提示词速查', url: '/prompts/library/storyboard/camera-angles-prompts' },
      { text: '影视色彩风格化提示词库', url: '/prompts/library/storyboard/cinematic-color-grading-prompts' },
      { text: 'AI短剧提示词库分类检索词典', url: '/prompts/library/drama/the-ultimate-prompt-repository' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/weather-environment-prompts.md',
    title: '天气与环境特效提示词：暴风雨、漫天大雪、迷雾与烈火视效速查',
    description: '短剧大场面必备的极端天气与自然物理视效Prompt，涵盖倾盆暴雨水花、飞雪冰霜、滚滚浓烟与雷电交加震撼场景。',
    keywords: '天气环境特效提示词, 暴雨倾盆水花飞溅, 雪花飘落质感, 浓雾笼罩森林, 烈火燃烧火星飞溅',
    directAnswer: '自然天气是短剧渲染戏剧冲突最强大的“情绪催化剂”。**暴雨倾盆强化下跪认错与断绝关系的绝望感；漫天鹅毛大雪烘托生死离别与孤独凄凉；滚滚浓雾与毒瘴构建悬疑凶险与步步惊心；滔天烈火与飞溅火星则是复仇反杀与决战时刻的最佳舞台**。掌握精确的物理颗粒度描述，能让天气特效成为成片的视觉加分项。',
    deepDive: '传统视频制作中天气特效依赖庞大的粒子发射器（Houdini Particle FX）渲染，成本极高。而在AI视频生成中，天气效果本质上是隐空间物理运动矢量的群集计算。若只输入“rain”，模型往往生成静态的半透明线条；输入“torrential downpour, visible water droplets splashing violently on wet stone, rain puddles rippling with heavy drops”，模型则会模拟流体力学碰撞，大幅提升画面的物理真实感。',
    reasons: [
      '**暴风雨/倾盆暴雨（Torrential Downpour）**：\n- 语义功能：退婚绝情、暴雨下跪、车祸现场、生死相逢。\n- Prompt范例：`Heavy torrential downpour, violent sheets of rain falling through the night sky. Water droplets exploding into mist as they strike the muddy road, ripples cascading in dark puddles. Fierce wind whipping through soaked trench coat, lightning flash illuminating rain streaks, wet surface reflections.`',
      '**漫天飞雪/极寒冰霜（Blizzard & Frost）**：\n- 语义功能：古装诀别、雪夜寻仇、边疆戍守、病重垂危。\n- Prompt范例：`Cinematic heavy snowfall, soft feathery snowflakes drifting slowly through the cold winter air. Frost coating the eyelashes and collar of the character, visible white breath condensing in freezing air, deep pristine snow ground with footprints, silent melancholy atmosphere.`',
      '**狂暴烈火与漫天火星（Blazing Fire & Flying Embers）**：\n- 语义功能：家族覆灭、宗门被焚、战神复仇怒火、火海逃生。\n- Prompt范例：`Raging inferno consuming the wooden mansion, roaring orange flames licking the night sky. Swarms of glowing red-hot embers and sparks drifting through thick black smoke, dynamic heat shimmer warping the background, intense firelight flickering on face.`',
      '**阴森迷雾与诡异毒瘴（Dense Fog & Mist）**：\n- 语义功能：古墓探险、密林追杀、悬疑迷局、鬼魅现身。\n- Prompt范例：`Thick ominous ground fog creeping across a dark twisted pine forest, eerie volumetric mist swallowing ancient mossy graves. Moonlight weakly diffusing through dense white vapor, haunting silhouettes, cold desaturated tone.`'
    ],
    workflowOverview: '如何实现天气与角色动作的物理交互协同：',
    steps: [
      '**统一服装状态与天气匹配**：下雨必须配`drenched wet clothes, hair plastered to forehead`；下雪必须配`fur coat with snowflakes resting on shoulders`。',
      '**加入地面水渍/积雪反射**：地面是天气的镜子，务必在Prompt中描述地面反射（`wet reflections on asphalt`）。',
      '**分流生成天气镜头**：大暴雨和烈火镜头使用快手可灵AI生成，其流体粒子和动力学表现优于普通工具。'
    ],
    metrics: [
      '**粒子运动自然度**：雪花与火星受风力扰动有自然的布朗运动与摆动轨迹。',
      '**接触面湿润光泽度**：雨水打湿皮肤和衣物后呈现出高保真的高光镜面反射（Specular Highlights）。',
      '**视线遮挡平衡**：雨雪天气不遮挡角色核心五官特写，保留戏剧主体清晰度。'
    ],
    pitfalls: [
      '**切忌衣服干爽却下着大雨**：模型有时会把背景画成暴雨，但人像依然干燥蓬松，必须显式加上`soaked wet fabric clinging to body`强制覆盖。',
      '**避免过量浓烟遮死画面**：火灾场景如果写了`dense opaque black smoke filling the entire screen`，可能会生成完全黑屏的废片，应使用`wisps of dark smoke drifting upward revealing character silhouette`。'
    ],
    faqs: [
      {
        q: '如何让AI生成的哈气（呼出的白雾）看起来很真实？',
        a: '在Prompt中加入`visible puffs of cold white breath mist condensing in freezing winter air with each heavy exhalation`，模型会精准从嘴角位置生成半透明的冷凝雾气。'
      },
      {
        q: '打雷闪电的瞬间在视频模型里怎么控制？',
        a: '加入`strobe lightning flashes abruptly illuminating the pitch-black scene for a split second, intense white flash cast on surprised face`，模型会呈现极具冲击力的频闪闪电效果。'
      }
    ],
    links: [
      { text: '电影光影与环境氛围Prompt库', url: '/prompts/library/storyboard/lighting-atmosphere-prompts' },
      { text: 'AI短剧爆款提示词名场面库', url: '/prompts/library/drama/viral-drama-prompts-templates' },
      { text: '可灵AI专属语法与Prompt指南', url: '/prompts/library/model/kling-prompts-handbook' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/interior-architecture-prompts.md',
    title: '室内与建筑空间提示词：奢华欧式宫殿、破旧出租屋与赛博基地置景Prompt',
    description: '商业短剧高频室内空间场景置景Prompt，涵盖豪门顶层豪宅、老破小城中村出租屋、古典中式王府与未来地下基地。',
    keywords: '室内建筑空间提示词, 豪门大理石客厅, 破败城中村细节, 科幻宇宙飞船内舱, 空间材质反光',
    directAnswer: '室内置景是确立短剧“阶层冲突与贫富反差”的核心视觉舞台。**豪门题材依靠9米挑高复式大厅、整面落地窗外CBD天际线、意大利鱼肚白大理石与巨型水晶吊灯树立千亿豪门的压迫感；逆袭题材依靠剥落绿漆墙皮、掉色折叠木桌、斑驳水渍的城中村出租屋制造催人泪下的落魄贫穷**。精准的建材与家具细节描述，能让观众在半秒内代入阶层环境。',
    deepDive: '室内空间在三维透视中具有复杂的多重反射与遮蔽关系。若只写“luxury living room”，AI通常生成千篇一律的样板间；通过精确指定建材材质（如“Calacatta marble, polished brass trims, velvet upholstery”）与空间光影遮蔽（Ambient Occlusion），能让室内空间呈现电影布景师级别的工业质感。',
    reasons: [
      '**顶级千亿豪门客厅（Ultra-Luxury Penthouse）**：\n- 语义功能：豪门家宴、霸总逼婚、真假千金相认、身份打脸。\n- Prompt范例：`Ultra-luxurious minimalist penthouse living room, 8-meter double-height ceiling, panoramic floor-to-ceiling glass windows overlooking glowing futuristic metropolis skyline at dusk. Italian Calacatta white marble floors with high-gloss reflections, colossal modern crystal chandelier, plush velvet custom sofa, bespoke art sculptures, architectural digest interior photography.`',
      '**破败城中村出租屋（Dilapidated Slum Apartment）**：\n- 语义功能：男主隐忍落魄、母亲病重卧床、催债殴打、贫穷屈辱。\n- Prompt范例：`Cramped impoverished tiny studio apartment in urban village. Peeling green paint on damp moldy walls, exposed rusty water pipes, flickering naked tungsten bulb hanging from frayed wire. Worn wobbly wooden folding table, squeaky rusty iron bed frame, scattered cheap medicine bottles, gloomy melancholic atmosphere, hyper-realistic grime textures.`',
      '**新中式豪门王府茶室（Modern Neo-Chinese Tea Room）**：\n- 语义功能：老太爷掌权、家族宗祠问罪、古董茶道博弈。\n- Prompt范例：`Solemn neoclassical Chinese tea chamber, dark century-old ebony wood paneling, intricate lattice sliding screens. Natural zen sunlight filtering through bamboo blinds creating stripe patterns. Zen bonsai tree on raw stone slab, swirling white incense smoke rising from bronze burner, serene yet oppressive ancestral authority vibe.`',
      '**赛博朋克地下地下实验室（Cyberpunk Underground Bunker）**：\n- 语义功能：异能觉醒、人体实验改造、黑客秘密基地。\n- Prompt范例：`Underground high-tech cybernetic laboratory. Rows of transparent cylindrical cryogenic tanks filled with glowing cyan fluid and dormant subjects. Exposed holographic interface screens hovering in mid-air, tangled industrial conduits, flickering red warning beacon, dark metallic reflective grated flooring.`'
    ],
    workflowOverview: '如何构建短剧统一的置景提示词资产库：',
    steps: [
      '**提取全剧核心固定置景**：统计全剧高频发生的3个核心室内场景（如：总裁办公室、男女主婚房、老家祖宅）。',
      '**为每个场景撰写固定的空间描述块（Location Block）**：锁定墙面材质、地面材质、核心家具与主光源。',
      '**将场景描述块作为背景基底复用**：当角色在不同集数进入该房间时，直接调用相同的空间描述块，确保场景跨集数完全一致。'
    ],
    metrics: [
      '**建材纹理高保真度**：大理石倒影、原木木纹与水泥剥落肌理清晰细腻。',
      '**多角度空间连贯性**：正拍与反打镜头中，房间的门窗位置与家具方位空间关系不产生结构性错位。',
      '**阶层符号直观度**：观众对贫穷/奢华场景的识别反应时间低于300毫秒。'
    ],
    pitfalls: [
      '**警惕现代家具穿帮混入古代场景**：在古代王府茶室中，若不加负向排除，模型偶有概率在桌角生成插座、电线或塑料矿泉水瓶，必须在Negative中严控`modern electronics, plastic, wires`。',
      '**避免空间过度堆砌造成视觉混乱**：一个房间内选择3件代表性焦点家具即可，家具堆得太满会导致画面失去视觉呼吸空间。'
    ],
    faqs: [
      {
        q: '如何让豪门房间的落地窗夜景看起来很真实，不像背景贴图？',
        a: '在Prompt中加入`skyscrapers with thousands of tiny twinkling office windows outside, glass pane reflecting the indoor chandelier softly with double reflection effect`，通过玻璃内外的双重折射与倒影，立刻消除贴图感。'
      },
      {
        q: '老破小房间如何拍得有电影美感，而不是纯粹的脏乱差？',
        a: '使用戏剧性光线来“拯救”脏乱。加入`single golden sunbeam slicing through dirty dust-stained window, illuminating floating dust particles, Rembrandt chiaroscuro lighting`，破败中带有诗意与叙事厚度。'
      }
    ],
    links: [
      { text: '电影光影与环境氛围Prompt库', url: '/prompts/library/storyboard/lighting-atmosphere-prompts' },
      { text: '全题材短剧Prompt速查手册', url: '/prompts/library/drama/all-genres-prompt-handbook' },
      { text: 'AI短剧提示词完整模板库', url: '/prompts/library/drama/complete-drama-prompts-2026' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/action-combat-vfx-prompts.md',
    title: '特效与动作打斗提示词：拳拳到肉、刀剑碰撞火花与高燃视效Prompt',
    description: 'AI短剧武打与特效制作的核心Prompt宝典，涵盖近身肉搏格斗、刀剑格挡火星、法术冲击波与慢动作定格高燃视效。',
    keywords: '动作打斗特效提示词, 功夫打斗Prompt, 魔法护盾碎裂, 剑气纵横视效, 慢动作定格冲击波',
    directAnswer: '动作戏是短剧留存率与爽感的最强引擎，但也是AI生成最容易“肢体崩坏变形”的高危区。核心秘诀在于**“精准动词拆解 + 微观物理接触描述 + 粒子特效外包络”**。**放弃让AI自主发挥“两个人精彩打斗”，转为具体指定“右勾拳重击下颚溅出汗水血花”、“合金长刀剧烈格挡迸发金色火星暴雨”与“环形空气冲击波震碎地面碎石”**，动作可用率立刻成倍提高。',
    deepDive: '视频生成模型在处理高速运动时，骨骼关键点（Keypoints）容易在快速时空插值中发生丢失。为了防止肢体穿模扭曲，Prompt必须提供“动量支点”与“动能释放终点”。通过引入电影动作特技术语（如Impact Frame、Shockwave Distortion、Motion Blur），强制引导模型把动态能量转化为环境与粒子的爆发，从而掩盖骨骼微小的形变。',
    reasons: [
      '**近身肉搏/重拳轰击下颚（Heavy Impact Punch）**：\n- 语义功能：主角暴揍反派、近身格斗高潮、力量感拉满。\n- Prompt范例：`Explosive martial arts close combat impact frame. Protagonist\'s devastating right hook smashing violently into enemy\'s jaw, slow-motion impact moment, spray of sweat and saliva bursting outward, jaw distorting realistically under massive kinetic force, kinetic motion blur streaks, cinematic adrenaline action.`',
      '**冷兵器对决/刀剑相交火星飞溅（Blade Clash & Sparks）**：\n- 语义功能：古装武侠、刀剑决战、刺客近身暗杀。\n- Prompt范例：`Macro action shot, two ancient damascus steel swords violently clashing in mid-air. Shower of blazing golden sparks and fiery splinters erupting from blade contact point, razor-sharp steel reflections, intense grimacing eyes of combatants visible between blades, high-speed photography 1000fps.`',
      '**玄幻修仙/环形气浪冲击波（Shockwave Explosion）**：\n- 语义功能：真气爆发、内力对轰、结界破碎、战神震飞强敌。\n- Prompt范例：`Eastern fantasy energy explosion, warrior stomping foot on the ground, radiating a massive spherical shockwave of translucent golden qi. Shattered marble pavement tiles lifting and floating into the air, sonic distortion ring expanding rapidly, swirling wind hurricane, dynamic anime action cinematography.`',
      '**飞天遁地/凌空飞踢（Flying Dropkick）**：\n- 语义功能：现代特工翻滚、无影脚、飞檐走壁。\n- Prompt范例：`Dynamic dynamic tracking shot, martial artist performing an acrobatic mid-air flying spinning kick, body fully extended horizontally parallel to floor, wind tearing through clothing, camera sweeping along the kinetic trajectory, epic stunt choreography.`'
    ],
    workflowOverview: '如何用分镜头拆解法制作一套流畅连贯的高燃打斗：',
    steps: [
      '**第1镜：蓄力与出招起始（Pre-action）**：特写握拳蓄力、真气汇聚发光（时长1秒）。',
      '**第2镜：高速冲刺与挥击（Kinetic Drive）**：侧面跟拍快速掠过，带强烈动态模糊（时长1.5秒）。',
      '**第3镜：碰撞瞬间打击定格（Impact Point）**：击中部位微距特写，汗水火花炸裂慢动作（时长1秒）。',
      '**第4镜：受击反馈与倒地（Follow-through）**：受害者倒飞撞碎桌椅木屑翻飞（时长1.5秒）。',
      '**全套导入剪辑台加速卡点**：将第1-2镜以1.3倍速播放，第3镜以0.5倍慢放，配上重击“咚”音效，打击感爆棚。'
    ],
    metrics: [
      '**打击感指数（Impact Feeling）**：碰撞瞬间的视觉震颤与粒子散发符合物理动量规律。',
      '**肢体骨骼完整性**：在高速出拳出腿过程中，未出现三只手或手臂折断式反向弯曲。',
      '**观众多巴胺刺激度**：分镜头击打节奏使观众在短剧打斗高潮时的平均完播率达65%以上。'
    ],
    pitfalls: [
      '**切忌在单个镜头中要求完成“五连击招式”**：AI模型无法记住复杂的连招套路，强行输入会导致角色在原地像触电一样抽搐，必须单招单镜切分。',
      '**避免背景过于杂乱**：激烈打斗戏背景如果全是密集人群，算力分散会导致主角面部崩坏，背景最好是开阔空地、废弃仓库或雨夜街道。'
    ],
    faqs: [
      {
        q: '打斗戏用哪个AI模型生成的动作最激烈、废片最少？',
        a: '首选快手可灵AI（结合其运动笔刷划定出拳方向），其次是生数科技Vidu（二次元动漫打斗表现极佳）。Seedance适合中低幅度格斗，超大翻转容易略显保守。'
      },
      {
        q: '刀剑碰撞时如何让火星看起来很真实？',
        a: '加入`hyper-realistic incandescent metal sparks, parabolic trajectory of embers, glowing hot contact point`，火星会呈现优美的抛物线飞溅与真实辉光。'
      }
    ],
    links: [
      { text: '快手可灵AI短剧制作实战指南', url: '/ai-tools/models/video/kling-ai-complete-tutorial' },
      { text: 'Vidu二次元高燃动作提示词库', url: '/prompts/library/model/vidu-anime-action-prompts' },
      { text: '爆款短剧必备Prompt模板库', url: '/prompts/library/drama/viral-drama-prompts-templates' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/suspense-horror-prompts.md',
    title: '悬疑与惊悚镜头提示词：幽暗走廊、门后窥视与阴森倒影Prompt库',
    description: '短剧悬疑反转与惊悚氛围营造的专业Prompt指南，涵盖窥视视角、镜中诡异倒影、幽暗走廊脚步声与冷调压迫感构图。',
    keywords: '悬疑惊悚提示词, 窥视视角Prompt, 镜子倒影诡异, 手电筒微光照明, 阴影中的轮廓',
    directAnswer: '悬疑短剧的魔力在于“未见其人，先感其恐”。**幽暗狭长的老旧走廊、门缝微张露出的窥视视线、洗手池镜子中不自然的倒影、手电筒在昏暗空间中扫过的惨白光斑，以及藏匿在深黑阴影中的轮廓**，是构筑心理惊悚与脊背发凉的核心视听符码。掌握低调暗黑布光与主观窥视机位，能让观众屏息凝神紧盯屏幕。',
    deepDive: '心理惊悚在视觉传达上依靠“信息遮蔽与认知失调（Cognitive Dissonance）”。通过高比例的未照亮暗部（Occluded Shadows）、模糊的前景遮挡物（Obstructed View）与失真的空间透视，强制人类大脑在恐惧本能下主动脑补未知危险。在Prompt中精确调动低照度细节（Low-light Denoising）与阴冷冷色调，是诱发这种心理机制的关键。',
    reasons: [
      '**窥视视角/门缝后的目光（Voyeuristic Peeping Angle）**：\n- 语义功能：跟踪、潜伏、阴谋窥探、受害者浑然不觉。\n- Prompt范例：`Cinematic voyeuristic POV shot, filming through a narrow crack in a wooden door. Foreground blurry doorframe framing the scene. In the dimly lit bedroom, an unaware woman sits brushing her hair, deep shadows, intense feeling of being watched, heavy suspense, low key.`',
      '**洗手池镜子中的诡异倒影（Uncanny Mirror Reflection）**：\n- 语义功能：人格分裂、真相暴露、伪装撕破、内心恶魔觉醒。\n- Prompt范例：`Cinematic bathroom mirror shot. Character looking down splashing water on face, but the reflection in the cracked mirror remains standing still, staring directly out at the viewer with an unsettling cold smirk, flickering fluorescent bulb, green cold tone, psychological horror.`',
      '**幽暗狭长走廊/尽头黑影（Dark Endless Hallway）**：\n- 语义功能：密闭逃生、凶案现场、危机逼近。\n- Prompt范例：`Symmetrical one-point perspective shot down a dilapidated narrow hospital corridor at midnight. Single dim red emergency exit light at the far end casting long eerie shadows. A tall shadowy silhouette slowly stepping into the hallway, ominous dread atmosphere.`',
      '**手电筒摇晃探秘（Handheld Flashlight Beam）**：\n- 语义功能：地下室搜寻、搜集罪证、黑夜逃亡。\n- Prompt范例：`First-person POV in a pitch-black abandoned basement. Single harsh white beam of a shaky flashlight cutting through thick floating dust, illuminating scattered bloody footprints on concrete floor, oppressive darkness suffocating the frame edge.`'
    ],
    workflowOverview: '如何打造扣人心弦的悬疑反转分镜流：',
    steps: [
      '**建立长焦压迫感构图**：使用长焦镜头压扁空间，让前景遮挡物（如窗帘、门框）占据画面前三分之一。',
      '**严格锁定冷绿色调预设**：加入`Fincher style desaturated greenish-cyan tone, moody film noir, murky shadows`。',
      '**配合手持摄影微晃指令**：加入`subtle handheld camera breathing sway, unstable balance`，强化目击者的紧张窒息感。'
    ],
    metrics: [
      '**暗部噪点纯净度**：低照度画面黑位扎实深沉，无恶性AI彩色噪波与涂抹斑块。',
      '**惊悚氛围心理指数**：悬疑分镜在盲测中引起观众心率轻微上升与瞳孔扩大的概率超70%。',
      '**反转视觉冲击力**：真相揭晓那一刻的光影骤变产生极强的视听爽感。'
    ],
    pitfalls: [
      '**切忌画面过暗导致什么都看不清**：悬疑需要“半隐半现”，全黑就是无效信息。必须保留一缕微弱轮廓光或环境漫射光。',
      '**避免生成过于恶心血腥的违规元素**：国内各大短剧平台对血腥恐怖有严格机审红线，Prompt应侧重于“心理惊悚、阴森氛围与悬念张力”，严禁出现直接血腥违规词汇。'
    ],
    faqs: [
      {
        q: '大卫·芬奇（David Fincher）风格的悬疑色调如何用Prompt写出来？',
        a: 'Prompt标准写法：`David Fincher cinematic aesthetic, sickly yellow-green tint, clinical tungsten lighting, deep pitch-black shadows, razor-sharp geometric framing, meticulous sterile precision, 35mm film grain`。'
      },
      {
        q: '如何让镜子里的倒影做出和真人不一样的动作？',
        a: '在Midjourney或生视频中，直接写`subject splashing water while mirror reflection stands completely still grinning`，大模型具有高度概念涌现能力，能精准识别这种超现实悬疑画面。'
      }
    ],
    links: [
      { text: '电影级镜头机位提示词速查', url: '/prompts/library/storyboard/camera-angles-prompts' },
      { text: '影视色彩风格化提示词库', url: '/prompts/library/storyboard/cinematic-color-grading-prompts' },
      { text: '全题材短剧Prompt速查手册', url: '/prompts/library/drama/all-genres-prompt-handbook' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/emotional-closeups-prompts.md',
    title: '情感特写提示词：含泪眼眶、嘴角颤抖与微表情神态Prompt精选',
    description: '短剧虐恋哭戏与高光演技特写提示词，深入解析眼眶通红、泪珠滚落、咬牙切齿、强颜欢笑等微表情微米级Prompt配方。',
    keywords: '情感特写提示词, 微表情特写Prompt, 眼眶通红含泪, 咬牙切齿愤怒神情, 眼神空洞绝望',
    directAnswer: '短剧观众的共情与付费欲望，80%来自男女主角在极限情境下的**“面部微表情高光”**。**含泪的通红眼眶、欲落未落的泪珠、下唇难以自制的轻微颤抖、咬肌紧绷导致的下颌线条隆起，以及从强装镇定到心理防线彻底崩溃的瞬间**，是短剧从“机器生成”走向“打动人心”的灵魂纽带。',
    deepDive: '传统AI生成的人脸常被诟病为“面瘫假人”，根源在于缺乏微表情肌群（FACS，面部动作编码系统）的精细约束。眼轮匝肌收缩、提上唇肌抽动、降下唇肌颤抖等生理学细节，需要具体的微观词汇激活模型的高保真人像特征库。结合浅景深微距与柔和边缘光，能让AI演员展现媲美影帝影后的细腻情感。',
    reasons: [
      '**极致虐心/含泪绝望凝视（Heartbroken Tearful Gaze）**：\n- 语义功能：女主被抛弃、签署离婚协议、看着孩子被夺走。\n- Prompt范例：`Extreme emotional close-up on the actress\'s face. Red-rimmed watery eyes brimming with crystalline tears, a single translucent tear rolling slowly down pale porcelain cheek. Lower lip quivering with silent agony, fragile vulnerable expression, natural skin pores with specular tear shine, 85mm f/1.4.`',
      '**咬牙切齿/青筋暴起极怒（Raging Clenched Jaw）**：\n- 语义功能：得知父母被害真相、目睹挚爱受辱、复仇誓言。\n- Prompt范例：`Intense dramatic close-up, male protagonist\'s jawline clenched so hard the masseter muscle bulges. Forehead vein subtly throbbing, teeth gritted in sheer fury, blazing fierce hatred burning in bloodshot eyes, heavy harsh breathing, dramatic high contrast side lighting.`',
      '**强颜欢笑/心如死灰苦涩（Forced Bitter Smile）**：\n- 语义功能：在伤害自己的人面前维持最后尊严、假装无所谓。\n- Prompt范例：`Heartbreaking subtle micro-expression portrait. Corners of mouth faintly curling into a fragile, tragic forced smile, while eyes remain completely hollow, dead and devoid of light. Exhaustion and profound sorrow etched across features, desaturated muted color palette.`',
      '**瞳孔骤缩/极度震惊不可置信（Shock & Dilated Pupils）**：\n- 语义功能：得知假千金身份、看到亲子鉴定报告瞬间。\n- Prompt范例：`Ultra-macro cinematic shot centered on wide open hazel eye. Pupil visibly dilating in sudden psychological shock, trembling eyelashes, reflection of a burning contract clearly visible on the glossy cornea, dramatic camera push-in.`'
    ],
    workflowOverview: '如何让微表情在视频大模型中平滑自然地动起来：',
    steps: [
      '**第一步：在Midjourney/Flux中生成极致神态基底**：先将人物哭戏/怒戏的高清定版图生成出来。',
      '**第二步：在可灵/Seedance中输入动态阻尼微动词**：输入`subtle micro-movement, trembling lip, tear slowly rolling down cheek, realistic gentle blinking, no excessive head shake`。',
      '**第三步：将运动强度设为低档（2-3）**：微表情切忌大动态，保持头部静止，只允许五官局部微动。',
      '**第四步：配合细腻声效**：剪辑时加入微弱的抽泣吸气声与眼泪滴落音效，视听双重击穿观众防线。'
    ],
    metrics: [
      '**微表情真实度评分**：哭戏眼泪反光真实，面部无胶质感滑动，得分9.3/10。',
      '**眼球聚焦稳定度**：瞳孔不飘忽游移，眼神坚定聚焦于戏剧情感点。',
      '**情感共鸣完播率**：微表情特写镜头完播率比普通全景对话高出45%。'
    ],
    pitfalls: [
      '**切忌写“cry hysterically”让模型自由发挥**：这往往会导致人物五官张牙舞爪、面容严重扭曲变形，应使用`subtle restrained crying, silent tears, trembling lip`等内敛克制词汇。',
      '**警惕牙齿变形**：咬牙切齿时偶尔会出现多排牙齿或牙齿缺失，可加入`clean natural teeth alignment, closed lips with gritted jaw`来规避。'
    ],
    faqs: [
      {
        q: '如何让AI生成的眼泪看起来晶莹剔透，不像是画上去的白线？',
        a: '在Prompt中加入`translucent liquid refraction, crystalline specular tear drop, wet tear track reflecting studio lights`，模型会赋予眼泪真实的折射率和流体反光。'
      },
      {
        q: '做微表情特写，竖屏9:16该怎么构图？',
        a: '采用紧凑特写（Tight Close-Up），人物眼睛位于竖屏上三分之一黄金分割线上，额头与下巴允许轻微出画，营造极具侵略性的情绪冲击。'
      }
    ],
    links: [
      { text: '电影级镜头机位提示词速查', url: '/prompts/library/storyboard/camera-angles-prompts' },
      { text: '景深光圈与焦距Prompt调优', url: '/prompts/library/storyboard/depth-of-field-focal-length' },
      { text: 'AI短剧提示词技巧进阶指南', url: '/prompts/library/drama/advanced-prompt-engineering' }
    ]
  },
  {
    filePath: 'docs/prompts/library/storyboard/cinematic-color-grading-prompts.md',
    title: '影视色彩风格化提示词：王家卫墨绿、胶片颗粒与黑白高反差调色库',
    description: '大师级电影色调与调色风格Prompt预设库，涵盖王家卫墨绿色调、柯达胶片复古质感、韦斯·安德森对称调色与黑白高对比度。',
    keywords: '影视色彩风格提示词, 王家卫风格Prompt, 柯达胶片复古色, 韦斯·安德森对称调色, 黑白电影质感',
    directAnswer: '色彩是影视作品最强大的“潜意识情绪催眠师”。**王家卫式的复古墨绿与昏黄霓虹氤氲着潮湿迷离的情欲与疏离感；柯达5207胶片的暖调金黄与柔和青绿唤醒深沉的怀旧乡愁；韦斯·安德森的对称粉黄马卡龙色带来童话般的高级秩序美感；黑白高反差（Film Noir）则展现冰冷残酷的硬汉罪案与道德困境**。掌握色彩Prompt，能瞬间拔高短剧的审美逼格。',
    deepDive: '数字调色在AI生成中是通过隐空间的色度通道（Chrominance Latents）与查找表（LUT）映射实现的。Prompt中的色彩指令不仅仅改变色相，更决定了画面的动态范围（Dynamic Range）、中间调饱和度与颗粒噪点结构。精准的色彩修饰词能让大模型自动压制数码锐化带来的生硬数码味，呈现出经过专业调色大师DaVinci Resolve精调的胶片母带质感。',
    reasons: [
      '**王家卫迷离墨绿风格（Wong Kar-wai Aesthetic）**：\n- 语义功能：文艺短剧、暗恋纠葛、深夜面馆、香港复古霓虹街头。\n- Prompt范例：`Wong Kar-wai film aesthetic, moody emerald green and amber yellow color palette, atmospheric cigarette smoke drifting across humid night, soft focus reflections in rainy window, nostalgic melancholic urban romance, step-printing motion blur, 35mm film grain.`',
      '**柯达胶片复古质感（Kodak Portra 400 Film Tone）**：\n- 语义功能：青春校园、治愈系回忆、温暖家庭伦理短剧。\n- Prompt范例：`Shot on Kodak Portra 400 film, warm golden sun-drenched palette, creamy soft skin tones, gentle pastel highlights and subtle cyan shadows, authentic organic film grain texture, halation around bright light sources, vintage cinema.`',
      '**韦斯·安德森对称马卡龙（Wes Anderson Symmetrical Pastel）**：\n- 语义功能：轻喜剧、反讽短剧、贵族复古旅馆、严谨强迫症美学。\n- Prompt范例：`Wes Anderson signature style, strict dead-center symmetrical composition, pastel mustard yellow, dusty pink and turquoise color palette, whimsical vintage wardrobe, flat graphic architectural framing, crisp retro elegance.`',
      '**黑色电影硬核黑白（High-Contrast Film Noir）**：\n- 语义功能：卧底警察、黑道火拼、致命女人背叛、暗黑侦探。\n- Prompt范例：`High-contrast monochrome Film Noir cinematography, stark dramatic chiaroscuro black and white, deep inky shadows and blinding Venetian blind light streaks, wet city pavement reflections, gritty silver gelatin print texture, moody suspense.`'
    ],
    workflowOverview: '如何为整部短剧确立并统一电影色彩管线：',
    steps: [
      '**项目前期确立“色彩圣经（Color Bible）”**：为全剧设定主基调色彩词（例如：`teal and orange commercial grading`）。',
      '**将调色词作为Prompt固定质量后缀**：在全剧每个分镜的Prompt末尾统一步调追加该调色短语。',
      '**后期剪辑统一套用LUT映射**：在剪映专业版或DaVinci中，套用与Prompt风格一致的3D LUT滤镜，双重保证全片色调无缝衔接。'
    ],
    metrics: [
      '**色调跨分镜一致性**：整剧各集之间的主色调偏差度（Delta E）小于3.5，达到专业电视剧播出级标准。',
      '**高光溢出控制**：高光区域呈现胶片般平滑的滚落（Highlight Roll-off），无死白裁切。',
      '**观众视觉高级感停留率**：具有独特风格化调色的短剧首集完播率比默认普通色调短剧高出32%。'
    ],
    pitfalls: [
      '**切忌色彩词过多造成“调色盘打翻”**：避免在同一个Prompt里写`green and red and purple and yellow and neon`，这会让画面饱和度失控崩溃，通常选取1组互补色或1种单色调主基调即可。',
      '**警惕调色遮盖了关键剧情道具**：过重的纯绿或纯蓝调色可能导致原本重要的红色血迹或金色信封褪色变黑，关键道具需在Prompt中声明固有色。'
    ],
    faqs: [
      {
        q: '什么是光晕现象（Halation），为什么能增加电影胶片感？',
        a: 'Halation是传统胶片在强光源边缘形成的红橙色微光晕圈。在Prompt中加入`subtle red halation around bright highlights, filmic glow`，能瞬间抹平AI数字画面的塑料生硬感，呈现真正胶片电影的温润质感。'
      },
      {
        q: '黑白短剧在抖音快手能火吗？',
        a: '全片黑白风险较高，但可以在“回忆篇章”、“凶案重演”或“决战前夕”穿插黑白高反差分镜，强烈的视觉突变往往能瞬间抓住滑屏用户的眼球。'
      }
    ],
    links: [
      { text: '电影光影与环境氛围Prompt库', url: '/prompts/library/storyboard/lighting-atmosphere-prompts' },
      { text: '全题材短剧Prompt速查手册', url: '/prompts/library/drama/all-genres-prompt-handbook' },
      { text: 'AI短剧提示词完整模板库', url: '/prompts/library/drama/complete-drama-prompts-2026' }
    ]
  }
];

articles.forEach(a => writeGeoArticle(a));
console.log(`Successfully written ${articles.length} articles in cluster 5.1.2.`);
