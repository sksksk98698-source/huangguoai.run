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

## 核心机制与底层原理

${a.deepDive}

### 核心要素解析
${reasonsList}

## 核心实操步骤与落地流程

${a.workflowOverview}

${stepsList}

## 关键参数与质量衡量指标

为了确保产出的工业级短剧画面达到专业放映和付费变现标准，建议参照以下量化指标执行：

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
    filePath: 'docs/ai-drama/tutorial/advanced/lighting-consistency.md',
    title: 'AI短剧光影一致性控制：电影级打光与色彩氛围营造',
    description: '深度解析AI短剧制作中多镜头光影一致性控制技巧，掌握电影级三点布光、丁达尔效应与色调LUTs应用。',
    keywords: '短剧光影一致性,电影级布光提示词,伦勃朗光,丁达尔效应,色调LUTs,阴影方向统一',
    directAnswer: '控制AI短剧镜头间光影一致性的核心法则：在Prompt中固化主光源方向、色温（如5600K日光或3200K钨丝灯）与光比（Key-to-Fill Ratio），并使用ControlNet的Lineart与Normal/Depth图约束阴影几何；在后期阶段统一加载电影级.cube LUT调色预设，消除镜头间色彩跳跃。',
    deepDive: '扩散模型在连续生成单帧时，对光影的解释受随机噪声种子支配，极易出现上一镜头是侧逆光、下一镜头突变为顶光或平光的“光影闪烁”现象。要实现电影质感，必须从模型层面的提示词锚定、几何控制网，到剪辑后期的全局色彩管理形成三位一体管线。',
    reasons: [
      '**主光源绝对朝向锚定**：在Prompt中禁止使用模糊的“beautiful lighting”，而必须精确指定 `key light from 45-degree camera left`, `warm golden hour sunlight angle 30 degrees`。',
      '**色温与氛围对比度量化**：明确冷暖对比，例如 `cool blue ambient light 6500K contrast with warm tungsten practical lamp 2800K on actor face`。',
      '**阴影与接触阴影控制**：利用Depth与Normal法线图生成准确的表面漫反射，使物体着地处产生自然的接触阴影（Contact Shadows）。',
      '**全局调色LUTs统一映射**：将所有分镜成片导入DaVinci Resolve或剪映，套用同一款柯达2383或胶片模拟LUT，实现色调压制与统一。'
    ],
    workflowOverview: '建立光影一致性标准的工作流分为三大阶段：分镜资产打光方案确立、图生视频种子光锁定、后期统一调色压光。',
    steps: [
      '**步骤一：构建场景光影标准卡（Light Sheet）**：在开拍前，用Midjourney或黄果剧AI生成该场景在早晨、黄昏、深夜的标准全景光影图，提取Prompt中的灯光修饰词。',
      '**步骤二：结构化光影Prompt注入**：将标准灯光词作为模板后缀：`cinematic lighting, chiaroscuro, volumetric rim light, soft key light from left, realistic shadows, photorealistic, 8k`。',
      '**步骤三：图生视频光影延伸控制**：在可灵或Runway中将motion幅度控制在2-4之间，严防剧烈的全景摇镜引发光斑重新计算重构。',
      '**步骤四：后期调色节点批量应用**：在剪映中为全轨道创建“调节图层”，统一调整色温偏移（-3）、对比度（+5）、高光压暗（-10）并施加颗粒感。'
    ],
    metrics: [
      '**镜头间色温漂移**：控制在 ±200K 以内，肉眼无法察觉跳色。',
      '**面部主辅光比**：戏剧冲突场景保持 4:1 至 8:1，日常甜宠场景保持 2:1。',
      '**高光溢出率**：斑马纹检测下高光过曝（Clipping）区域占画面不超过 3%。',
      '**暗部噪点水平**：纯黑背景经LUT压缩后，保持纯净黑电平（RGB 16-20）。'
    ],
    pitfalls: [
      '**切忌在每句Prompt中使用相互冲突的灯光形容词**：例如同时写 `bright daylight` 和 `moody dramatic noir shadows`，会导致生成结果随机摇摆。',
      '**切忌忽略环境反光（Bouncing Light）**：如果角色穿红衣在白墙边，Prompt需补充 `subtle red bounce light on the wall` 避免违和虚假感。',
      '**切忌在多镜头混剪时不校准白平衡**：不同模型生成的白衣服可能呈现冷青或泛黄，剪辑前必须用滴管工具点选白平衡基准。'
    ],
    faqs: [
      {
        q: '如何让AI短剧中的黑夜戏既有质感又看得清角色面部？',
        a: '采用“电影蓝调黑夜法”：Prompt中使用 `cinematic night scene, cool cyan ambient moonlight, warm rim light outlining the character silhouette, motivated eye catchlight`，用轮廓光与眼神光勾勒角色，避免死黑一片。'
      },
      {
        q: '两张图由不同模型生成，光影差距极大如何补救？',
        a: '在Photoshop或剪映中将两张图的人物通过抠图层分离，使用“匹配颜色（Match Color）”工具将目标图的亮度和色度分布强行同步到基准图，再进行局部重新微调。'
      }
    ],
    links: [
      { text: 'AI短剧镜头景别与运镜调度', url: '/ai-drama/workflow/storyboard/camera-shots-framing' },
      { text: '工业化短剧高产SOP手册', url: '/ai-drama/tutorial/advanced/industrial-sop-workflow' },
      { text: '黄果短剧提示词库', url: '/prompts/library/drama/' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/complex-action-scenes.md',
    title: '复杂动作场面AI生成实战：打斗、跳跃与追逐物理规律',
    description: '破解AI生成激烈打斗、高空跳跃与高速追逐动作画面的形变与抽搐难题，掌握物理碰撞感与动态模糊控制技巧。',
    keywords: 'AI生成复杂动作场面,动作形变控制,肢体关节运动规律,快节奏镜头衔接,避免多手多脚畸变,物理碰撞感营造',
    directAnswer: '生成复杂打斗与追逐动作戏的黄金法则：“拆解动作微切片、首尾帧锁定物理轨迹、快剪配合击打音效”。避免让AI单次生成超过2秒的连续剧烈肢体碰撞，改用“起势（1s）+ 冲击碰撞点（0.5s定格或微动）+ 受击飞出（1s）”的三段式镜头切分，配合高速动态模糊与重击拟音，即可实现院线级动作冲击力。',
    deepDive: '视频大模型基于光流场与潜空间连续变换预测像素，当肢体发生高速交叠（如格斗出拳、反手擒拿）时，几何拓扑结构发生断裂，模型极易出现“多出第三只手臂”、“关节180度反转”或“面部被手臂融化”等伪影。通过镜头拆分与动作矢量引导，可将算力精准集中在关键力学反应上。',
    reasons: [
      '**动作微切片（Micro-Action Chunks）**：绝不尝试用单Prompt生成一套完整的组合拳，而是分解为“垫步蓄力”、“急速直拳冲向镜头”、“对手头部后仰吐血受击”三个独立景别。',
      '**首尾关键帧插值法（First-Last Frame Conditioning）**：使用Kling或Wan 2.1的首尾帧功能，输入出拳起点图与倒地终点图，由模型自主补齐运动矢量。',
      '**主观镜头与局部特写调度**：用局部特写（拳头特写、脚下碎石震起、刀刃相撞火花）替代大远景全身格斗，掩盖全身拓扑运算的缺陷。',
      '**动效与后坐力拟音弥补**：画面的打击感80%来自于声音反馈，精准对齐的重音Bass Drop与骨折拟音能够让人脑自动脑补力量感。'
    ],
    workflowOverview: '复杂动作戏生成SOP分为四步：动作镜头剧本分拆、静态受力张力图绘制、短程动态视频生成、快节奏蒙太奇组接。',
    steps: [
      '**步骤一：动作分镜脚本设计**：将一场5秒的击倒戏拆分为5个独立分镜，每个镜头时长0.8-1.2秒，景别按“中景-近景-特写-特写-全景”交替。',
      '**步骤二：生成高动态静态关键帧**：在图像生成器中加入动态关键词：`dynamic action pose, extreme foreshortening, muscles tensed, dust swirling around boots, cinematic shutter speed 1/1000s`。',
      '**步骤三：控制生成运镜与运动笔刷**：在Runway或可灵中，针对出拳手臂单独涂抹运动笔刷（Motion Brush），水平方向速度拉高，而身体其他部位保持较低运动系数。',
      '**步骤四：后期加速抽帧与打击点震动**：在剪辑软件中对冲击瞬间进行“速度曲线调速”，在击中目标前0.2秒快进（300%），击中瞬间定格3帧并添加画面位移抖动（Camera Shake）。'
    ],
    metrics: [
      '**单动作镜头长度**：格斗冲击镜头严格控制在 0.6s - 1.5s 之间，避免超时形变。',
      '**关键帧动作匹配度**：首尾帧人物衣着与发型一致率达到 95% 以上。',
      '**速度曲线斜率**：冲击碰撞帧前后采用 3x 加速到 0.5x 慢放的“急停急起”曲线。',
      '**打击感音效对齐精度**：重音音峰与受击画面误差不超过 1 帧（约 0.03 秒）。'
    ],
    pitfalls: [
      '**切忌在Prompt中要求“两人互相扭打抱摔”**：多人紧密肢体缠绕是当前所有视频模型的死穴，必然导致融为一体的怪物。',
      '**切忌生成长达5秒的无剪辑打斗长镜头**：超过2.5秒的动作戏必然出现关节软化融化现象。',
      '**切忌忽略环境物理反馈**：出拳时背景需有狂风吹拂衣角、地面尘土飞扬，缺乏环境互动的动作会像在真空中漂浮。'
    ],
    faqs: [
      {
        q: '如何做出武侠仙侠剧中“飞天御剑”的高速穿梭感？',
        a: '使用两层图层合成：人物保持相对静止的帅气御剑姿态（微风吹动衣襟），背景采用极速后退掠过的群山与云海（Prompt: `fast tracking shot over misty mountain peaks, intense motion blur on background`），在剪辑中将人物贴入即可。'
      },
      {
        q: '如果模型生成的人物拳头突然多长出两根手指怎么办？',
        a: '利用视频修复工具（如Topaz Video AI或剪映画面裁剪），或者直接在击中瞬间插入0.2秒的刀光/拳芒特效素材，掩盖手指畸变并增强视觉冲击。'
      }
    ],
    links: [
      { text: '首尾帧控制视频生成深度解析', url: '/ai-drama/workflow/video/first-last-frame-interpolation' },
      { text: '特效与粒子融合实操指南', url: '/ai-drama/tutorial/advanced/vfx-particle-effects' },
      { text: 'AI玄幻修仙高燃短剧制作', url: '/ai-drama/tutorial/genre/fantasy-magic-drama' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/multi-character-interaction.md',
    title: '多人同框互动难题破解：视线对齐、站位与对话调度',
    description: '攻克AI短剧多人对话同框中的角色脸部串色、视线不对齐与站位混乱，掌握正反打调度与视线交互规范。',
    keywords: '多人同框AI互动,双人对话视线对齐,近景过肩调度,站位主次分明,角色面容防串色,多人走位协调',
    directAnswer: '解决多人同框互动的最佳工程方案：采用“正反打过肩镜头（OTS）为主、双人全景建立站位为辅”的经典好莱坞调度原则。在全景建立镜头中，使用分区域提示词（Regional Prompting）或左右两张角色垫图分别锁脸；在对话交锋时，全部切换为单人中近景与过肩特写，通过视线高低反向对齐（Eyeline Match）实现完美的视觉交流。',
    deepDive: '当同一个画面中输入两个不同角色的特征描述时，文本扩散模型极易发生“属性串色（Attribute Bleeding）”——例如把男主角的黑色西装错误画在女主角身上，或者让两张脸融合。通过景别切分将多人交互降维为单人镜头，是商业影视工业成熟数十年的低成本解决方案。',
    reasons: [
      '**视线匹配轴线法则（180-Degree Eyeline Rule）**：左侧角色看向镜头右侧（Looking camera right），右侧角色看向镜头左侧（Looking camera left），观众脑内自动判定两人正在对视。',
      '**过肩镜头（Over-The-Shoulder, OTS）降维**：近景处只露虚焦的前景角色肩部与后脑勺，后景清晰对焦倾听/说话的角色，避免同一焦点平面渲染双脸。',
      '**局部区域重绘（Inpainting/Regional Control）**：在生成双人同框大景时，先生成空房间背景，再分别圈选左右选区，各自输入独立角色LoRA与Prompt进行局部生成。',
      '**视线高度差精准表达地位关系**：站立的霸总俯视视角（High angle looking down），坐着的下属仰视视角（Low angle looking up），通过透视强化角色心理博弈。'
    ],
    workflowOverview: '多人互动调度流水线：全景建立镜头设定物理站位、过肩镜头确立互动关系、单人正反打推进情绪高潮。',
    steps: [
      '**步骤一：生成双人关系确立镜头（Establishing Shot）**：使用广角镜头展示两人空间位置（如“男主站在办公桌后，女主站在门边”），角色面部占比小于画面15%，避免算力浪费在面部精细度上。',
      '**步骤二：设计正反打过肩提示词**：拍摄女主说话时：`OTS shot, over male character shoulder in dark suit, focusing on female protagonist in white blouse, looking slightly right, emotional talking expression`。',
      '**步骤三：拍摄男主反应反打镜头**：`Medium close-up of male CEO, cold piercing gaze looking slightly left towards camera, listening attentively, sharp jawline`。',
      '**步骤四：音画对位与反应镜头插入（L-Cut / J-Cut）**：在男主还在说话的声音尚未结束时，画面提前0.5秒切入女主震惊或愤怒的面部微表情，增强戏剧张力。'
    ],
    metrics: [
      '**视线对齐交汇角度**：两角色反打视线水平角度偏差控制在 10 度以内。',
      '**角色属性串色率**：通过区域分割生成，将服饰与发色错位率降低至 0%。',
      '**正反打镜头频率**：对话段落每 2-3 秒进行一次镜头切换，保持观众注意力。',
      '**空间轴线越轴违规率**：整场对话戏严格遵守单侧摄影机机位，越轴违规率为 0。'
    ],
    pitfalls: [
      '**切忌在同一句Prompt中同时描写两人的复杂互动动作**：如“A握住B的手两人相视一笑”，大概率生成畸变黏连的四肢。',
      '**切忌越过180度假想轴线拍摄**：上一镜头男主在左女主在右，下一镜头若翻转位置，观众会产生瞬间空间迷向。',
      '**切忌让双方都直勾勾直视镜头中心**：打破第四面墙的直视镜头会破坏影视沉浸感，视线必须保持偏离轴线5-15度。'
    ],
    faqs: [
      {
        q: '必须生成两人拥抱或挽手臂的特写时，该怎么做？',
        a: '使用真实版权视频/实拍绿幕素材做垫底视频，利用Vid2Vid（视频生视频）重绘功能，将重绘强度（Denoise Strength）控制在0.4-0.5，只改变服饰质感与面容，保留精准真实的物理接触动态。'
      },
      {
        q: '多人圆桌会议或大厅争吵场面如何高效制作？',
        a: '采用“主控全景 + 环形轮流点名特写”：全景交代全员就座状态，争吵开始后，摄影机在每个人拍桌、说话时给单人近景，利用剪辑节奏建立群像冲突。'
      }
    ],
    links: [
      { text: '影视180度轴线规则深度应用', url: '/ai-drama/workflow/storyboard/180-degree-rule' },
      { text: '角色面容与服饰一致性终极指南', url: '/ai-drama/workflow/character/complete-consistency-guide' },
      { text: '经典霸总题材短剧实操', url: '/ai-drama/tutorial/genre/ceo-tycoon-drama' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/industrial-sop-workflow.md',
    title: '大规模工业化生产流：一人一天产出5集短剧的高效SOP',
    description: '揭秘短剧工作室高产秘诀，打造一人一天流水线产出5集短剧的标准工业化SOP，涵盖资产库复用与批量渲染。',
    keywords: '短剧工业化SOP,一天做5集短剧方法,资产预设库搭建,批量提示词脚本,矩阵化流水线作业,工作室人效翻倍',
    directAnswer: '一人单日量产5集精品短剧的核心驱动力是“生产要素解耦与标准化流水线”：彻底淘汰从零手写Prompt和单图抽卡的手工作坊模式，转而建立“结构化剧本模板库 + 固化角色/场景Prompt资产包 + 批量云端渲染脚本 + 模块化剪辑工程”。将80%的重复劳动前置为固定预设，单集制作耗时压缩至1.5小时以内。',
    deepDive: '短剧商业化比拼的是“爆款率”与“交付吞吐量”。手工作坊式创作每集耗时8小时，试错成本极高；而工业化管线将短剧拆分为剧本、资产、分镜、视频生成、音频剪辑五大解耦工序，每一道工序均可异步并行甚至通过自动化脚本驱动。',
    reasons: [
      '**资产库复用率大于70%**：主角形象、核心反派、常驻场景（总裁办公室、豪华客厅、破旧出租屋）一经确立终身复用，杜绝重复开盲盒。',
      '**剧本标准化结构**：单集剧本严格锁定在80-120秒，包含前3秒吸睛点、15秒小高潮、50秒情节反转、90秒断章悬念，按镜头编号批量输出分镜表。',
      '**批量API与任务队列化**：通过云端批量任务排队生成，夜间挂机渲染基础分镜素材，白天创作者集中进行筛选与拼装剪辑。',
      '**剪辑工程模块化预设**：剪映/PR中预置标准字幕样式、高频音效轨（耳光声、心跳声、悬念重音）、打光LUT与片头片尾动效。'
    ],
    workflowOverview: '单人单日5集高效生产作息表：上午2小时搞定5集分镜与批量提交任务，下午3小时筛选素材与微调重绘，傍晚2.5小时模块化剪辑成片。',
    steps: [
      '**08:30 - 10:30：标准化剧本与分镜批量生成**：使用黄果剧AI或DeepSeek按套路模板一键生成5集剧本，自动切分为每集15个标准分镜Prompt。',
      '**10:30 - 11:30：垫图准备与并发任务提交**：调出固化的主角三视图和场景图，将分镜Prompt并发提交至AI视频生成平台队列。',
      '**13:30 - 15:30：批量初筛与差错局部补帧**：每镜头默认生成2个候选版本，快速挑选合格率90%的片段，不合格片段用同种子微调二次生成。',
      '**15:30 - 18:00：模块化流水线剪辑**：将各集素材丢入预设好的剪映轨道模板，套用自动剪映字幕、批量套用音效预设，成片导出。'
    ],
    metrics: [
      '**单集制作综合耗时**：从剧本到导出成片控制在 90 分钟以内。',
      '**首次镜头采纳合格率**：成熟Prompt模板下达到 80% 以上。',
      '**日算力消耗成本**：单集平均算力消耗控制在 30-50 元人民币以内。',
      '**单集完播率基准**：严格卡点断章下，首日完播率维持在 25% 以上。'
    ],
    pitfalls: [
      '**切忌陷入“完美主义单帧雕琢”**：短剧是快消品，观众在手机竖屏上更关注情绪推进而非某根头发丝的物理反光。',
      '**切忌无版本管理随意覆盖文件**：每集建立独立文件夹规范命名 `EP01_Shot01_v1.mp4`，避免素材丢失导致工程报红。',
      '**切忌不备份核心Prompt资产**：模型更新后旧词可能失效，必须将每个角色的固定Prompt与底图集中收录在Notion或飞书多维表格中。'
    ],
    faqs: [
      {
        q: '单人操作如何解决海量配音的情感起伏问题？',
        a: '在剧本Prompt中提前打上情感标记（如【怒吼】、【轻蔑冷笑】、【哽咽哭泣】），导入支持SSML情感标签的语音大模型（如Index TTS、CosyVoice），一次性批量导出带情绪的高品质音频轨。'
      },
      {
        q: '电脑配置不高能否实现一天产出5集？',
        a: '完全可以。工业化SOP依赖云端SaaS平台（如可灵API、Runway、黄果短剧云端制作），本地电脑只需具备能够流畅剪辑1080P视频的普通轻薄本或台式机即可。'
      }
    ],
    links: [
      { text: '新手首日制作短剧必备清单', url: '/ai-drama/tutorial/beginner/day1-prep-list' },
      { text: '极速产出5分钟短剧工作流', url: '/ai-drama/tutorial/beginner/5min-short-drama-workflow' },
      { text: 'ComfyUI工业级短剧管线', url: '/ai-drama/tutorial/advanced/comfyui-drama-pipeline' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/comfyui-drama-pipeline.md',
    title: 'ComfyUI专业短剧工作流搭建：节点组合、图生视频管线',
    description: '面向高阶短剧创作者，详解ComfyUI节点组合、AnimateDiff动效控制、ControlNet精准姿态与Wan2.1图生视频本地管线。',
    keywords: 'ComfyUI短剧工作流,本地节点化生成,AnimateDiff动效控制,ControlNet精准姿态,自定义工作流导出,显存极致优化',
    directAnswer: '专业团队使用ComfyUI搭建短剧生产线的核心架构：“加载器模块（CheckPoint + LoRA堆叠） → 条件控制网（OpenPose姿态 + Depth深度） → 潜空间采样（K-Sampler配合AnimateDiff或Wan2.1 Wrapper） → 潜空间放大降噪（Latent Upscale） → 面部修复（Face Detailer）”。本地管线可将镜头抽卡成本压至零，且具备像素级确定性控制。',
    deepDive: '商业SaaS平台虽然上手快，但存在黑盒不可控、每次点击扣费昂贵、敏感词限制多等痛点。ComfyUI通过有向无环图（DAG）将生图与生视频算法透明化，创作者能够针对角色五官、动作幅度、手部结构分阶段精密干预，打造独家工业级技术壁垒。',
    reasons: [
      '**姿态与机位精确控制**：接入OpenPose与ControlNet，让角色严格按照实拍参考动作出拳或下跪，彻底告别文字随机抽卡。',
      '**面部高保真Detailer修复环**：通过Face Detailer节点自动检测面部边界，以高分辨率局部重新采样，杜绝远景脸崩。',
      '**AnimateDiff与视频扩散模型融合**：既支持SD1.5/SDXL的小显存轻量级动态过渡，也支持Wan2.1与HunyuanVideo的高质感视频节点。',
      '**显存优化与批量参数遍历**：利用IPEX、xFormers与模型量化（FP8/GGUF），让16G甚至12G显存显卡流畅跑动工业级模型。'
    ],
    workflowOverview: 'ComfyUI短剧全流程管线搭建四部曲：环境与核心插件部署、母版工作流组装、批量分镜输入接口配置、自动化渲染输出。',
    steps: [
      '**步骤一：安装核心节点扩展包**：通过ComfyUI-Manager安装 `ComfyUI-Impact-Pack`、`ComfyUI-ControlNet-Aux`、`ComfyUI-AnimateDiff-Evolved` 及 `ComfyUI-Video-Helper-Suite`。',
      '**步骤二：搭建角色固化前置流**：接入IP-Adapter FaceID节点，连接角色高清正面照，实现零微调训练即可锁脸85%以上。',
      '**步骤三：配置图生视频动效采样器**：将第一帧基准图输入到Wan2.1或AnimateDiff采样节点，设置Frame Count为32-64帧，FPS设为24，CFG设为6.0。',
      '**步骤四：串接后处理修复管道**：在采样输出端串联 `FaceDetailer` 节点，使用 `face_yolov8m.pt` 侦测模型，重绘强度设为0.35，输出清晰无瑕面部。'
    ],
    metrics: [
      '**本地生成单秒成本**：电费折算后每秒成片成本低于 0.01 元，降本 90% 以上。',
      '**面部与原案相似度**：IP-Adapter + FaceDetailer组合下达到 90% 以上。',
      '**16G显存渲染时长**：FP8量化模型单条5秒1080P视频生成控制在 180 秒以内。',
      '**工作流崩溃率**：严格控制显存缓存清理，连续批量跑图崩溃率小于 1%。'
    ],
    pitfalls: [
      '**切忌加载未经测试的野鸡节点**：安装冲突节点可能导致整个Python环境依赖损坏，建议使用venv独立虚拟环境。',
      '**切忌在视频采样环节盲目拉高重绘幅度（Denoise）**：Denoise超过0.65会导致帧与帧之间剧烈抽搐撕裂，推荐维持在0.4-0.55。',
      '**切忌忽略显存回收机制**：长时间批量渲染时，需在批处理节点中开启 `Empty VRAM Cache` 释放内存碎片。'
    ],
    faqs: [
      {
        q: '单张RTX 4060Ti 16G显卡能否跑动ComfyUI短剧工业管线？',
        a: '完全可以。目前主流开源模型均推出了GGUF或FP8量化版本，16G大显存可在单卡环境下顺畅运行Wan2.1 14B或HunyuanVideo的图生视频工作流。'
      },
      {
        q: '如何将写好的50个分镜Prompt一次性批量输入ComfyUI？',
        a: '使用 `ComfyUI-Text-File-Exec` 或 `Prompt List Generator` 节点，将保存有分镜Prompt的txt文本传入，节点会自动按行循环触发生成。'
      }
    ],
    links: [
      { text: '工业化短剧高产SOP手册', url: '/ai-drama/tutorial/advanced/industrial-sop-workflow' },
      { text: 'AI视频首尾帧运镜技巧', url: '/ai-drama/workflow/video/first-last-frame-interpolation' },
      { text: 'AI模型与工具全面横评', url: '/ai-tools/models/' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/montage-and-pacing.md',
    title: '镜头节奏与蒙太奇剪辑法：用情绪剪辑提升付费转化率',
    description: '深入短剧黄金剪辑心理学，解析平行交叉蒙太奇、情绪加速与断章卡点，彻底引爆短剧观众的付费付费充值欲望。',
    keywords: '短剧蒙太奇剪辑,心理蒙太奇运用,平行交叉剪辑,剧情张力拉满,付费卡点心理学,让观众欲罢不能',
    directAnswer: '短剧剪辑的核心目标不是“交代客观剧情”，而是“制造情绪高压并在最高峰强行打断”。高付费转化的蒙太奇法则是：前3秒抛出核弹级冲突，中段采用“双线交叉剪辑”压缩叙事时间，第80秒开启“压迫感重音加速心跳”，在巴掌即将落地或身份即将被揭晓的0.1秒瞬间黑屏切入“请看下一集”，实现完播与付费率最大化。',
    deepDive: '传统电影剪辑讲求舒缓的叙事弧线，而竖屏短剧受限于算法推荐机制与即时多巴胺刺激，必须在每10-15秒制造一次微情绪波峰。运用心理蒙太奇与声音前置，能让观众产生生理层面的肾上腺素飙升。',
    reasons: [
      '**平行交叉剪辑（Cross-Cutting）强化窒息感**：一边是病房中母亲生命体征逐渐减弱的监护仪警报，另一边是男主在暴雨中遭遇反派无情阻拦，双线交替切换将焦虑感拉满。',
      '**跳剪（Jump Cut）剔除垃圾垃圾信息**：删除所有角色开门、下楼梯、坐下等生理过渡动作，直接切入核心动作爆发点。',
      '**情绪节奏由缓入急指数加速**：镜头时长从初期的3秒递减到2秒、1秒、0.5秒，视觉切换的极速推进促成心理亢奋。',
      '**断章卡点心理学（Zeigarnik Effect）**：利用蔡格尼克效应——人类大脑对未完成事件的记忆与执念远超已完成事件，在戏剧冲突未解时戛然而止。'
    ],
    workflowOverview: '情绪剪辑工作流：冲突前置定基调、中盘双线提速施压、尾盘情绪高潮悬崖式断章。',
    steps: [
      '**步骤一：前3秒爆点嫁接（Hook Insertion）**：将本集中最具视觉冲击或台词冲突的0.5秒镜头（如摔碎的离婚协议书或扇耳光）剪至片头0秒作为黄金诱饵。',
      '**步骤二：建立叙事节奏网格**：前15秒平稳叙事（2-3秒/镜头），第15-60秒反转交锋（1.5-2秒/镜头），第60-90秒终极交锋（0.8-1.2秒/镜头）。',
      '**步骤三：音画反差与重音卡点**：配乐由静默到低音轰鸣，人物台词重音处（如“你配吗？！”）必须卡在画面切镜瞬间，增强打击穿透力。',
      '**步骤四：悬崖式断章设计**：将最高潮瞬间精确卡在反派扬起手即将扇下、或者DNA鉴定报告撕开一角的动作中段，配以重音收尾，立即黑屏出字。'
    ],
    metrics: [
      '**前3秒停留率（3s Hook Rate）**：经过爆点前置处理后提升至 40% 以上。',
      '**短剧平均镜头时长（ASL）**：全片平均单镜头时长维持在 1.5 - 2.2 秒之间。',
      '**第1集到第2集连播转化率**：优秀断章设计下下一集跳转率超过 75%。',
      '**卡点音画同步度**：重音音效与画面动作关键帧对齐在 0 帧误差。'
    ],
    pitfalls: [
      '**切忌无节制频繁黑屏转场**：短剧中严禁使用超过0.3秒的慢速淡入淡出，95%以上转场应当为干脆利落的硬切（Hard Cut）。',
      '**切忌将最高潮完整放完才结束**：一旦反派受到惩罚并低头认错，观众的悬念多巴胺瞬间释放，便不会点击下一集。必须卡在惩罚到来前的一刹那。',
      '**切忌背景音乐声音盖过人声台词**：BGM音量必须在人声说话时做自动化闪避（Sidechain Ducking），压低-12dB。'
    ],
    faqs: [
      {
        q: '短剧卡点在多少秒最适合引导付费？',
        a: '如果单集设定为90秒，最佳卡点在82-88秒；如果是多集付费短剧，通常在第8集或第10集的结尾制造全剧最大的生死或身份核弹反转，逼迫充值。'
      },
      {
        q: '画面动作幅度不大时，如何用剪辑营造紧张感？',
        a: '使用“无缝推拉推近（Punch-in）”：对同一张静止表情，通过将画面缩放100% -> 120% -> 140%快速切镜，模拟三段式急推特写，瞬间放大压迫感。'
      }
    ],
    links: [
      { text: '分镜设计与景别调度法则', url: '/ai-drama/workflow/storyboard/camera-shots-framing' },
      { text: '极致节奏AI爽剧爆款制作', url: '/ai-drama/tutorial/genre/addictive-fast-paced-drama' },
      { text: '短剧付费转化率提升与账号运营', url: '/monetize/traffic/' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/vfx-particle-effects.md',
    title: '特效与粒子融合实操：仙侠法术、赛博霓虹与科幻光效',
    description: '解析AI短剧特效制作核心秘笈，掌握仙侠万剑归宗、赛博霓虹光污染与科幻空间传送门的提示词控制与后期粒子合成。',
    keywords: '短剧特效与粒子融合,仙侠御剑视效,赛博朋克光污染,空间传送门Prompt,真实光效叠加,绿幕键控合成',
    directAnswer: 'AI短剧震撼视效制作的最高效途径是“Prompt引导模型初态 + 外部透明通道粒子素材混合叠加”：在AI生成阶段着重刻画发光体的高光动态与环境照明反馈（Prompt如 `glowing cyan energy swirling, casting cast reflections on wet asphalt`）；在后期合成阶段，通过混合模式（Screen/Color Dodge）叠加4K专业魔法粒子、刀光或全息UI素材，实现逼真的物理级视效。',
    deepDive: '虽然视频模型擅长生成自然风光与人物微动，但直接让模型生成精准的高速法术轨迹或复杂魔法阵往往会导致画面模糊或结构坍塌。将纯几何特效剥离到后期合成软件，由AI负责环境受光与角色动态，能够以最低成本获得顶级工业电影视效。',
    reasons: [
      '**环境光反馈是特效逼真的根基**：如果角色手中发出金色火球，面部和胸口没有被染上金黄色动态光晕，后期贴再多素材也像廉价贴纸。',
      '**混合模式（Blending Modes）的科学选择**：火光、闪电使用“滤色（Screen）”或“线性减淡（Linear Dodge）”；暗黑魔法使用“正片叠底”配合边缘外发光。',
      '**发光粒子景深与虚化对齐**：前景粒子必须施加高斯模糊，后景粒子保持空气透视，与原镜头的焦距光圈（如f/1.8）完全契合。',
      '**镜头眩光（Anamorphic Lens Flare）增强胶片感**：在极强光芒爆发时，叠加横向蓝色或金色变形镜头光斑，营造院线科幻大片质感。'
    ],
    workflowOverview: '特效制作四步工作流：受光基底画面生成、动态光流引导、粒子通道合成、全局辉光与震颤调校。',
    steps: [
      '**步骤一：生成带受光交互的基底视频**：Prompt中必须明确光效对环境的渲染：`casting blinding purple neon light on character face, dynamic rim light, reflections on metallic surface`。',
      '**步骤二：提取或生成独立特效通道**：使用AE或剪映粒子库，或使用AI绿幕视频生成专用粒子：`swirling golden lightning particles, black background, isolated VFX, 4k`。',
      '**步骤三：图层混合与遮罩对齐**：将特效轨道置于视频上方，开启“滤色”模式过滤黑底；针对穿帮部位使用绘制蒙版（Mask）进行边缘剔除。',
      '**步骤四：添加冲击波震屏与音效融合**：法术爆发瞬间，为全画幅添加2-3帧的曝光拉爆（Exposure flash）与微小抖动，音轨同步加入超重低音轰鸣（Sub-bass Boom）。'
    ],
    metrics: [
      '**特效与角色运动追踪精度**：特效锚点与手部关键位置漂移小于 5 像素。',
      '**受光色温与特效色温吻合度**：两者色相（Hue）偏差控制在 5 度以内。',
      '**光效过曝保护**：发光核心区域允许纯白，但边缘渐变须过渡平滑，无色阶断层。',
      '**渲染合成效率**：利用预设模板，单镜头特效合成时间控制在 5 分钟内。'
    ],
    pitfalls: [
      '**切忌无环境光的硬贴图**：绝不能直接把发光刀光贴在平光拍摄的人物手上，必须先对人物手臂做局部高光提亮重绘。',
      '**切忌全片特效色彩杂乱**：单场戏严格限制2种主导光色（如蓝金或红黑），颜色过多会导致画面廉价如同网页弹窗广告。',
      '**切忌忽略运动模糊（Motion Blur）**：极速划过的剑气如果没有运动模糊，会呈现出明显的PPT逐帧感。'
    ],
    faqs: [
      {
        q: '如何做出修仙玄幻剧中的“万剑归宗”漫天飞剑奇观？',
        a: '先让视频模型生成大景深云海与主角背影（Prompt: `hero standing on cliff peak, vast swirling thunderclouds`），然后后期导入透明通道飞剑阵列素材做缩放穿梭，配合镜头剧烈震动，震撼度拉满。'
      },
      {
        q: '赛博朋克风格中如何让雨水反射霓虹灯光？',
        a: '在Prompt中加入关键材质词：`wet asphalt with puddles, hyperrealistic reflections of hot pink and electric blue neon signs, rain streaks in air, volumetric fog`。'
      }
    ],
    links: [
      { text: 'AI玄幻修仙高燃短剧制作', url: '/ai-drama/tutorial/genre/fantasy-magic-drama' },
      { text: '复杂动作戏实战生成指南', url: '/ai-drama/tutorial/advanced/complex-action-scenes' },
      { text: '电影级光影一致性控制', url: '/ai-drama/tutorial/advanced/lighting-consistency' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/micro-expressions.md',
    title: '角色微表情调优：从面瘫木讷到眼神拉扯的情感表达',
    description: '攻克AI短剧人物眼神僵硬、假笑与面瘫缺陷，掌握微表情调优Prompt、眼神光控制与心理情感细腻表达。',
    keywords: '角色微表情调优,眼神光控制Prompt,嘴角苦笑与冷笑,眼泪流下动态,细腻心理活动刻画,打破模型僵硬感',
    directAnswer: '消除AI人物“塑料面瘫感”的核心技巧是“微动量词替代大情绪词、眼神光与瞳孔细节描摹、局部表情重绘二次采样”。不要使用抽象的 `crying` 或 `angry`，而要使用生理微表情细分词，如 `trembling lower lip, tears welling in eyes without falling, bitter subtle smirk, dilated pupils`，并在视频生成中严格将动作幅度（Motion）压在 2 左右，使面部肌肉产生自然颤动。',
    deepDive: '扩散模型在面对强烈情绪词时往往会输出过度夸张的面部扭曲（如大张的嘴巴或失真的五官）。影视级的情感张力恰恰来自于“克制中的微澜”——欲言又止的嘴唇微颤、强忍泪水的泛红眼眶、眉心瞬间的紧锁与舒展。这些微妙动态是让观众产生心理共情的核心。',
    reasons: [
      '**眼神光（Eye Catchlight）唤醒灵魂**：没有眼神光的眼睛被称为“死鱼眼”；Prompt中加入 `sharp specular catchlight in pupils, glistening eyes, wet sclera` 即可瞬间点亮角色生命感。',
      '**微表情动词精细化分类**：冷笑（`subtle dismissive smirk`）、苦笑（`bitter wry smile with sorrowful eyes`）、震惊（`momentary freeze, eyes slightly widening, sharp intake of breath`）。',
      '**面部肌肉不对称性（Asymmetry）**：人类真实的高级情绪往往是不对称的，单侧眉毛挑起或单侧嘴角微撇能极大降低AI生成的CG模型感。',
      '**眼泪流淌动力学控制**：利用图生视频结合局部运动笔刷，指定下眼睑处产生垂直向下的缓速运动，呈现泪珠滑落脸颊的细腻轨迹。'
    ],
    workflowOverview: '微表情打造三步法：生理学情绪词Prompt雕刻、极低动量参数锁定骨骼、面部局部重绘强化眼神光。',
    steps: [
      '**步骤一：构建高精度面部提示词**：组合词库示例：`hyper-detailed emotional portrait, 8k, tears glistening on eyelashes, subtle twitch in cheek muscle, bittersweet expression, soft cinematic lighting focusing on eyes`。',
      '**步骤二：精准调节视频生成运动参数**：在可灵或Runway中将Motion设置在 1.5 - 2.5 之间，关闭镜头大幅位移，使算力全量集中于眼皮眨动与唇部微动。',
      '**步骤三：引入LivePortrait进行微表情驱动**：如果扩散模型生成的表情依然木讷，导出静态高保真图，使用LivePortrait输入一段真人微表情驱动视频，直接将真实人类的眼神颤抖精准迁移给AI角色。',
      '**步骤四：后期眼神光高光修饰**：在剪映中对面部增加“锐化”滤镜，并适当提高中高光对比度，让眼眸更加晶莹剔透。'
    ],
    metrics: [
      '**面部骨骼畸变率**：在微表情运动全程五官结构漂移低于 2%。',
      '**眨眼频率与自然度**：每 3-5 秒一次自然眨眼，闭眼时长控制在 0.15 秒。',
      '**眼神光清晰度**：眼球高光点在 1080P 下边界清晰锐利。',
      '**情感传达准确度**：盲测下 90% 以上观众能准确分辨苦笑、嘲讽与假笑的区别。'
    ],
    pitfalls: [
      '**切忌使用 `laughing wildly` 或 `screaming` 等剧烈动词**：这些词大概率导致模型生成满嘴怪牙或面孔融化崩裂。',
      '**切忌动作幅度（Motion）开得过大**：Motion超过5会导致整张脸像果冻一样左右摇摆变形。',
      '**切忌忽略眼眶与鼻翼周围的微红充血表现**：哭戏如果脸部皮肤纯白无瑕会极其假，Prompt需补充 `reddened eyelids, flushed cheeks`。'
    ],
    faqs: [
      {
        q: '如何让AI角色表现出“霸总眼神冰冷、杀气腾腾”的感觉？',
        a: '使用关键词：`piercing cold gaze, narrowed eyelids, completely unblinking, sharp jaw set firmly, emotionless deadpan demeanor, harsh dramatic side lighting`，配合微仰视低机位拍摄。'
      },
      {
        q: '如果模型生成的人物表情一直像呆滞的证件照怎么破？',
        a: '给头部增加微弱的角度偏转：Prompt中加入 `slight head tilt, 3/4 quarter view of face, looking down contemplatively`，打破正立对称结构。'
      }
    ],
    links: [
      { text: '角色三视图与面容锁脸指南', url: '/ai-drama/workflow/character/three-view-turnaround' },
      { text: '高赞女频情感短剧制作', url: '/ai-drama/tutorial/genre/female-oriented-drama' },
      { text: '短剧配音与唇形对齐实操', url: '/ai-drama/workflow/audio-post/lipsync-complete-tutorial' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/scene-asset-library.md',
    title: '场景资产库标准化：搭建可复用的豪门客厅与玄幻大殿',
    description: '详解短剧制作中可复用场景资产库的搭建方法，掌握LoRA场景模型训练、环境多角度采样与固定布景技巧。',
    keywords: '短剧场景资产库,场景一致性保持,LoRA场景模型训练,环境多角度采样,豪门庄园布景,古代宗门大殿固定',
    directAnswer: '建立工业级场景资产库的标准化方法：“标准环境母卡 + 八向角度采样图集 + 场景微调LoRA模型”。针对豪门别墅客厅、总裁办公室、玄幻大殿等高频出镜核心场景，在开机前利用统一Prompt与种子生成全景（正视、仰视、鸟瞰、局部特写）8-12张标准图入库归档；制作中所有角色合成均调用该标准背景，彻底消除不同集数间的环境“装修变异”。',
    deepDive: '传统短剧拍摄耗费巨大的影棚场地租金，而AI短剧最大的隐性成本是“场景风格不可控”。许多新手创作者上一集霸总的家是欧式复古宫殿，下一集变成现代极简平层，严重破坏沉浸感。场景资产库是整个短剧工作室最核心的数字不动产。',
    reasons: [
      '**母卡Prompt严格封存**：将场景的基础架构词、材质词、光线词写入固定模板，生成分镜时仅改变前景人物，严禁改动场景描述词。',
      '**八向空间角度矩阵（8-Directional Matrix）**：预先渲染好正门朝向、窗边逆光、大厅主沙发、楼梯转角等各个机位视角，满足任意对话站位需求。',
      '**轻量化场景LoRA训练**：精选15张同一风格的高清场景图，训练一个权重为0.6的场景LoRA，只需在生图时触发Trigger Word即可百分之百复现场景细节。',
      '**全景HDR天球图与深度图固化**：导出场景的深度图（Depth Map），在生图时使用ControlNet Depth强行约束建筑立柱、沙发与吊灯的几何拓扑。'
    ],
    workflowOverview: '场景资产库标准化搭建四阶段：场景设计企划、多视角采样渲染、标准化分类入库、剧集生产调用。',
    steps: [
      '**步骤一：确立核心场景美术风格指引**：明确色调（如豪门采用黑金与胡桃木色，修仙采用青玉与白玉石），撰写300字标准环境Master Prompt。',
      '**步骤二：批量渲染固定机位图集**：分别渲染：全景广角（Wide master shot）、中景沙发区（Medium shot living room）、壁炉/书架特写（Close-up details），共计10-15张。',
      '**步骤三：资产标准化命名与多维表格归档**：按 `SC01_Luxury_Villa_LivingRoom_Angle01.png` 规范入库，并附带可一键复制的Prompt与Seed种子值。',
      '**步骤四：分镜制作直接作为垫图调用**：在生成该场景的剧情分镜时，直接将该机位背景图作为Image-to-Image参考垫图，权重设为0.75，再叠加人物。'
    ],
    metrics: [
      '**场景标志性构件重合率**：不同镜头间壁炉、吊灯、门框等标志性构件一致率达到 95%。',
      '**新剧集场景复用节省时间**：直接调用资产库可缩短前期筹备时间 80% 以上。',
      '**场景空间透视合理率**：广角与近景镜头透视关系无明显错位。',
      '**资产库覆盖度**：核心场景库覆盖都市/豪门/修仙题材 90% 以上的日常戏份。'
    ],
    pitfalls: [
      '**切忌在每集剧本中随手生成新场景**：哪怕只改动一个词（如从 `marble floor` 改为 `wooden floor`），也会导致整栋房子的装修风格突变穿帮。',
      '**切忌忽略场景内外光影时间轴**：如果场景有落地窗，白天的场景垫图绝不能用在深夜的剧情中，必须准备昼夜两套光影资产。',
      '**切忌在场景图中包含正在活动的人物**：建立场景资产库时，Prompt中必须加入 `empty room, no people, unoccupied`，避免背景中残留幽灵人影。'
    ],
    faqs: [
      {
        q: '如何低成本训练一个专属的豪门庄园LoRA？',
        a: '收集15-20张现实中或3D渲染的高端奢华庄园照片，使用秋叶整合包或云端SD-Trainer，学习率设为1e-4，训练1500步左右即可得到体积仅几十MB的高效场景LoRA。'
      },
      {
        q: '如果遇到剧情需要在同一个房间打碎花瓶怎么处理？',
        a: '利用该场景图的局部重绘（Inpainting）：圈选中景茶几区域，Prompt输入 `shattered porcelain vase on the floor, water spill, broken shards`，其他完整环境保持像素级绝对不动。'
      }
    ],
    links: [
      { text: '工业化短剧高产SOP手册', url: '/ai-drama/tutorial/advanced/industrial-sop-workflow' },
      { text: '经典霸总题材短剧实操', url: '/ai-drama/tutorial/genre/ceo-tycoon-drama' },
      { text: 'AI短剧商业化变现模式', url: '/monetize/intro/' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/advanced/audio-spatialization-mixing.md',
    title: 'AI短剧声音空间定位：双耳立体声、环境拟音与降噪混音',
    description: '打造影院级沉浸感音效，掌握短剧多音轨混音标准、双耳立体声空间定位、环境拟音（Foley）与人声降噪消除齿音技巧。',
    keywords: '短剧声音空间定位,双耳沉浸式音效,脚步声拟音采集,人声齿音消除,多音轨层次分明,电影级混音标准',
    directAnswer: 'AI短剧声音高级质感塑造法则：“人声居中干燥清澈、声像（Pan）匹配画内机位移动、拟音分层搭建声场骨架、终混压制Loudness标准”。切忌直接把AI生成的原声干音生硬贴在视频上；必须通过EQ切除人声80Hz以下低频轰鸣与8kHz齿音（De-Esser），根据画面人物左右位置打左右立体声像（Pan），并叠加至少三层环境声（底层氛围Ambience + 交互拟音Foley + 情绪配乐Music）。',
    deepDive: '人类大脑对于画面的瑕疵容忍度远高于声音。画面哪怕轻微卡顿，只要配音极具感染力且音效空间感逼真，观众依然会沉浸其中；反之，若画面再精美但配音伴有严重电音爆音、环境死寂无脚步声，观众会在3秒内划走。声音是短剧沉浸感的真正灵魂。',
    reasons: [
      '**声像空间定位（Stereo Panning）**：当人物从画面左侧跑向右侧时，脚步声与喘息声必须从左声道平滑过渡到右声道，营造真实的物理空间轨迹。',
      '**声学遮挡与回响（Reverb & Occlusion）**：在空旷大理石大厅对话需增加中长尾音混响（Reverb），在雨天隔窗对话需使用低通滤波（Low-pass Filter）削减高频模拟玻璃阻隔。',
      '**分层拟音（Layered Foley）细节赋予生命**：除了台词，必须铺设：衣物摩擦声（Cloth rustle）、脚步踩踏声（Footsteps）、关门锁舌声、水滴声等真实世界细节。',
      '**商业短剧响度合规化（LUFS Standardization）**：抖音与快手平台要求视频综合响度维持在 -14 到 -12 LUFS，过低会被系统压缩，过高会导致严重失真爆音。'
    ],
    workflowOverview: '声音工程五步工作流：人声干音降噪去齿音、声像与空间混响匹配、拟音音效精准对位、多音轨侧链闪避平衡、总线响度压限导出。',
    steps: [
      '**步骤一：人声母带前置净化**：使用iZotope RX或剪映降噪插件消除AI语音的嗡鸣底噪，施加De-Esser压制中英文字母发音产生的尖锐齿音（Sibilance）。',
      '**步骤二：人声EQ均衡雕刻**：高通滤波切除80Hz以下浑浊频段，在2.5kHz-3kHz提升2dB增强台词咬字穿透力，在12kHz提升Air空气感。',
      '**步骤三：搭建三层环境声场**：第1轨：安静室内微风/窗外隐约车流（-28dB）；第2轨：主角高跟鞋在大理石地面急促脚步声（-18dB）；第3轨：情绪配乐（-22dB）。',
      '**步骤四：设置侧链压缩人声避让（Sidechain Ducking）**：将BGM轨道的压缩器侧链挂接在人声轨道上，当角色开口说话时，BGM自动瞬间降低6-8dB，闭嘴时丝滑回弹。',
      '**步骤五：总输出总线压限（Master Limiter）**：在Master总线上加载Limiter，True Peak限制在 -1.0 dBTP，确保手机扬声器拉至最大音量也不爆音破音。'
    ],
    metrics: [
      '**全片综合响度指标**：严格锁定在 -14.0 LUFS (±1 LUFS) 范围内。',
      '**人声信噪比（SNR）**：静音间隙底噪低于 -55 dBFS，无电音电流声。',
      '**台词清晰度与BGM分离度**：频谱分析中人声核心区（1kHz-4kHz）不被配乐乐器掩盖。',
      '**真峰值控制（True Peak）**：全片杜绝任何超过 -0.5 dBTP 的过载红灯。'
    ],
    pitfalls: [
      '**切忌从头到尾只放一首震耳欲聋的BGM**：没有静默就没有高潮，在关键反转台词脱口而出的瞬间彻底静音0.5秒，戏剧力量倍增。',
      '**切忌使用单声道（Mono）导出环境音效**：手机戴耳机观看时，单声道环境音会像紧贴在脑中央发声，极其沉闷压抑。',
      '**切忌忽视拟音材质匹配**：草地脚步声绝不能套用木地板脚步声，材质错乱会立刻出戏。'
    ],
    faqs: [
      {
        q: '在哪里可以快速找到无版权纠纷的高品质短剧音效？',
        a: '推荐使用Freesound.org（选CC0协议）、爱给网、淘声网或剪映内置专业音效库，搜索关键词“巴掌”、“骨折”、“心跳”、“豪车漂移”等高频音效并分类收藏。'
      },
      {
        q: 'AI配音语气显得太平淡，如何用混音技术弥补？',
        a: '对干音进行微调变调（Pitch Shift）与局部时间拉伸（Time Stretch），并在情绪爆发句叠加微量饱和器（Saturation）制造微微破音撕裂感，增强真实人类情绪荷尔蒙。'
      }
    ],
    links: [
      { text: 'AI配音工具与情感调音实战', url: '/ai-drama/workflow/audio-post/ai-voiceover-tools' },
      { text: '声音克隆与音色定制完全手册', url: '/ai-drama/workflow/audio-post/voice-cloning-guide' },
      { text: '极致节奏AI爽剧爆款制作', url: '/ai-drama/tutorial/genre/addictive-fast-paced-drama' }
    ]
  }
];

articles.forEach(writeGeoArticle);
console.log(`Successfully written ${articles.length} articles in cluster 2.2.2.`);
