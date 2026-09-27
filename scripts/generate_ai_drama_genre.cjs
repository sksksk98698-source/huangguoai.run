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

::: tip 核心结论与题材策略
${a.directAnswer}
:::

## 核心机制与题材底层爆款逻辑

${a.deepDive}

### 题材爆款要素拆解
${reasonsList}

## 核心实操步骤与专属工作流

${a.workflowOverview}

${stepsList}

## 关键参数与质量衡量指标

为了确保该题材的工业化成片既能契合平台推荐算法，又能精准击中受众爽点，建议参照以下量化标准：

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
    filePath: 'docs/ai-drama/tutorial/genre/urban-modern-drama.md',
    title: 'AI都市短剧：2026年都市题材制作指南',
    description: '全面解析AI都市现代职场、商战反转短剧制作流程，涵盖摩天大楼取景Prompt、都市精英穿搭与快节奏现代叙事。',
    keywords: 'AI都市短剧,现代都市职场剧,商战反转短剧,都市生活切片,摩天大楼取景Prompt,职场装束风格',
    directAnswer: 'AI都市短剧的核心在于“现代化高级感与阶层冲突直观化”：视觉上利用大景深展示CBD摩天大楼全景、奢华顶层落地窗与高定西装质感，强化金钱与地位的视效反差；剧情上紧扣职场背叛、商战股权争夺或假面名媛反转，前3秒必须确立身份压制或背叛危机。',
    deepDive: '现代都市题材受众广泛，但观众对现实生活的真实细节极为敏感。如果AI生成的写字楼像假3D模型，或者手机握持姿势反常，观众会立刻产生出戏感。因此都市剧重在“高真实度环境建模与精确服饰配饰控制”。',
    reasons: [
      '**地标性都市视觉锚点**：在Prompt中加入 `futuristic CBD financial district, glass facade skyscraper, sprawling night skyline, warm ambient office lights` 构建高端都市感。',
      '**职业阶层服饰符号化**：高管角色的 `tailored bespoke navy suit, luxury wristwatch, sleek combed-back hair` 与底层实习生的 `wrinkled casual shirt, lanyard, tired posture` 形成鲜明对照。',
      '**现代道具交互简化**：避免生成复杂的手机打字或操作电脑特写，改用“拿起香槟轻晃”、“甩出股权转让合同特写”等稳健动作。',
      '**冷暖对比色调烘托资本冷酷**：办公室内部采用冷青色调（Cool Cyan），透视窗外的城市晚霞采用暖橙色，烘托职场人性的疏离与野心。'
    ],
    workflowOverview: '都市剧实操四步法：商业职场资产确立、快节奏对白分镜排布、现代氛围光影调优、商战音效节奏合成。',
    steps: [
      '**步骤一：构建都市核心场景资产**：批量渲染顶层CEO办公室、高端私密会所、深夜街头便利店三大核心场景备用。',
      '**步骤二：设计商战冲突分镜Prompt**：`Medium shot, sharp-suited corporate executive slamming contract on mahogany table, intense direct gaze, dramatic cinematic office lighting`。',
      '**步骤三：动效生成与运镜控制**：使用缓慢推镜头（Push in）强调气场施压，避免过快平移产生写字楼网格摩尔纹抖动。',
      '**步骤四：后期添加现代商业动效**：画面切入金融走势红绿折线、合同印章盖下动画，配以现代电音合成器低频BGM。'
    ],
    metrics: [
      '**场景真实度评分**：现代建筑透视线条垂直度偏差小于 2 度。',
      '**首集3秒停留率**：职场反目开场使得停留率达到 38% 以上。',
      '**单集转折点数量**：单集90秒内至少设置 2 次利益反转。',
      '**色彩风格统一性**：全集现代冷色调LUT一致度达 95%。'
    ],
    pitfalls: [
      '**切忌出现文字穿帮的虚假招牌**：街头背景中AI乱码英文或伪汉字必须在后期用模糊滤镜或贴纸遮盖。',
      '**切忌室内光线过暗显得廉价**：高级写字楼多采用通透大平光配合点状筒灯，切忌做成阴暗地下室风格。',
      '**切忌台词脱离现代商业常识**：避免出现“天凉了让王氏集团破产”等无脑台词，改用“抽贷、冻结资金链、查封资产”等具体抓手。'
    ],
    faqs: [
      {
        q: '如何让AI生成的现代跑车看起来更逼真而不抽搐？',
        a: '让跑车处于静止或极慢滑行状态（Prompt: `sleek black hypercar parked in front of luxury hotel entrance, valet opening door`），避免生成高速行驶中的轮毂旋转与地面反射，极易崩坏。'
      },
      {
        q: '都市剧最容易引起广泛共鸣的情绪点是什么？',
        a: '“职场小人物被恶毒上司抢功劳后，董事长当众微服私访查明真相并原地提拔”的即时正义爽点。'
      }
    ],
    links: [
      { text: '经典霸总题材短剧实操', url: '/ai-drama/tutorial/genre/ceo-tycoon-drama' },
      { text: '电影级光影一致性控制', url: '/ai-drama/tutorial/advanced/lighting-consistency' },
      { text: '短剧剧本爆款框架设计', url: '/ai-drama/workflow/script/hook-frameworks' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/sweet-romance-drama.md',
    title: 'AI甜宠短剧：2026年甜宠题材AI制作教程',
    description: '手把手教你制作高甜撒糖、唯美恋爱的AI甜宠短剧，掌握粉嫩暖色调打光、暧昧氛围对视与心动互动镜头调控。',
    keywords: 'AI甜宠短剧,浪漫恋爱短剧,高甜撒糖情节,治愈系粉嫩色调,唯美壁咚对视,暧昧氛围光控制',
    directAnswer: 'AI甜宠短剧的生命线是“多巴胺高颜值与微表情心动拉扯”：视觉上采用大光圈浅景深（f/1.4），主打低饱和粉白与柔暖金色自然光；互动上避免复杂肢体缠绕，改用“微距眼神对视、指尖微触、耳畔低语、逆光发丝微风拂动”等留白式暧昧镜头，配合轻快甜美钢琴配乐，让观众少女心泛滥。',
    deepDive: '女性受众对甜宠短剧的视觉要求极其苛刻，任何面部微小瑕疵（如粗糙皮肤纹理、凶狠的阴影）都会打破恋爱幻想。甜宠剧的关键在于“去锐化、强柔光、高颜值锁定与心跳感节奏”。',
    reasons: [
      '**柔美梦幻的色彩方案**：Prompt中固定加入 `soft warm golden hour glow, dreamy pastel color palette, blooming highlights, ethereal atmosphere`。',
      '**大光圈浅景深聚焦面部**：`shallow depth of field, creamy bokeh background, extreme close-up of eyelashes, 85mm portrait lens` 剔除一切杂乱背景。',
      '**微距离暧昧构图替代直接拥抱**：设计男女主距离10厘米的近距离视线拉扯，一人呼吸微促、一人眼神玩味，张力远超直接接吻。',
      '**少女感道具与环境陈设**：樱花雨、阳光透过白纱窗帘、热气腾腾的拿铁拉花、毛茸茸的金毛犬，全方位烘托治愈系生活感。'
    ],
    workflowOverview: '甜宠剧制作四步流程：高颜值角色Prompt锁脸、心动微动态镜头生成、粉嫩暖调滤镜调色、甜愈音效与气泡字幕合成。',
    steps: [
      '**步骤一：主角颜值极致打磨**：生成精致韩系/日系男女主三视图，强调通透水光肌、柔和卧蚕与清澈眼神。',
      '**步骤二：设计暧昧互动分镜Prompt**：`Two people face-to-face in close proximity, male character leaning in slightly, warm sunlight halo behind their heads, tender romantic atmosphere`。',
      '**步骤三：极微动态视频采样控制**：Motion参数设为 1.5，只允许发丝微动、眼神眨动与喉结微滚，严禁大幅度摆动导致五官变形。',
      '**步骤四：后期调色与糖分特效注入**：套用浪漫粉橘色LUT，在两人对视瞬间淡入柔光光效（Glow Filter）并添加“噗通”心跳拟音。'
    ],
    metrics: [
      '**女性观众完播率**：精准卡点心动镜头使得女性完播率维持在 32% 以上。',
      '**面部磨皮通透度**：高光溢出低于 2%，无脏污阴影和面瘫表情。',
      '**甜点出现频次**：每 30 秒剧集内必须出现一次心动或吃醋撒糖点。',
      '**点赞与收藏比**：优质甜宠短剧点赞收藏比通常高达 8:1。'
    ],
    pitfalls: [
      '**切忌生成油腻的霸凌式壁咚**：现代女性受众反感油腻强制爱，更倾向于双向奔赴或“口嫌体正直”的深情守护。',
      '**切忌让AI生成真实的接吻画面**：双唇重合在目前的视频大模型中极易生成嘴部黏连拉丝的恐怖怪物，吻戏必须借位切至影子特写或拉远景。',
      '**切忌使用阴暗发绿的荧光灯布光**：甜宠剧绝不能出现冷阴暗打光，全片色温必须维持在 4500K - 5600K 暖白区间。'
    ],
    faqs: [
      {
        q: '吻戏镜头怎么表现才能既唯美又安全不崩？',
        a: '采用经典的“借位视听语言”：一人微微低头接近另一人面孔（距面部5cm处刹车），随即镜头平滑推向两人在墙壁上投射的亲吻剪影，或者切换至女主角紧张蜷缩的手指特写。'
      },
      {
        q: '甜宠剧的男主角配音有什么特殊要求？',
        a: '选择带有磁性、温暖、微带气音的“低音炮”或“清爽少年音”，台词语速稍缓，呼吸声清晰可辨，极具私语耳膜酥麻感。'
      }
    ],
    links: [
      { text: '角色细腻微表情调优技巧', url: '/ai-drama/tutorial/advanced/micro-expressions' },
      { text: '高赞女频情感短剧制作', url: '/ai-drama/tutorial/genre/female-oriented-drama' },
      { text: 'AI配音工具与情感调音实战', url: '/ai-drama/workflow/audio-post/ai-voiceover-tools' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/ceo-tycoon-drama.md',
    title: 'AI霸总短剧：2026年霸总题材短剧制作指南',
    description: '全网经典霸总题材爆款制作实操，从劳斯莱斯车队、冷酷总裁气场到契约婚姻打脸反转，打造付费率最高的短剧模版。',
    keywords: 'AI霸总短剧,霸道总裁爱上我,豪门恩怨虐恋,冷酷总裁人设,劳斯莱斯车队Prompt,契约婚姻反转',
    directAnswer: 'AI霸总短剧能够持续统治短剧充值榜的杀手锏在于“极致的权力符号与反差宠溺”：通过黑衣保镖队列、加长豪车车队、黑金黑卡等高频视觉符号树立男主的绝对霸权；剧情通过“对外杀伐果断、对内唯独护她一人”的极端反差，在家族轻视、前任羞辱女主的关键节点，霸总雷霆降临强势护妻，引爆全网充值。',
    deepDive: '霸总题材是短剧工业流水线中最成熟、转化ROI最高的产品。这类剧对演员颜值的凌厉感（下颌线锐利、金丝眼镜、冷峻神态）和阶层碾压场面有极高要求。AI在生成奢华庄园、私人直升机等大场面上，相较于实拍短剧具有降维级的成本优势。',
    reasons: [
      '**高频权力视觉符号标准化**：黑色定制三件套西装、金丝边眼镜、百达翡丽腕表、八位黑衣保镖鞠躬迎接。',
      '**反派嘲讽与霸总降临的极致压制**：反派前一秒还在得意忘形让女主下跪，下一秒霸总保镖踹门而入，反派当场吓尿瘫软。',
      '**极低机位仰角强化威严**：对霸总多采用仰视机位（Low angle shot looking up at the CEO），突出其不可撼动的社会阶层统治力。',
      '**专属冷峻高对比光影**：大理石反光配深色调背景，侧面一道锐利的高光勾勒轮廓，眼神冰冷如刀。'
    ],
    workflowOverview: '霸总短剧量产三步曲：豪门贵族资产模板库导入、打脸名场面分镜编排、高燃战歌与耳光重音混剪。',
    steps: [
      '**步骤一：固化冷面霸总形象**：Prompt设定：`Handsome Asian male in 30s, sharp chiseled jawline, silver wire-rimmed glasses, tailored black tuxedo, cold indifferent expression, piercing dark eyes`。',
      '**步骤二：生成标志性排场分镜**：`Fleet of black luxury sedans arriving at opulent mansion gates, bodyguards standing in sharp formation, rain-soaked ground, cinematic grandeur`。',
      '**步骤三：设计护妻名场面台词与动作**：霸总握住即将扇向女主的手腕，眼神如冰，台词注入重音：“动我顾北辰的女人，你想怎么死？”。',
      '**步骤四：后期卡点耳光与破产通知**：耳光声清脆炸裂，随后0.5秒内接入反派手机震动：“董事长，我们海外账户被全部冻结了！”。'
    ],
    metrics: [
      '**前5集付费卡点充值率**：优质霸总剧在第9-11集充值转化率突破 18%。',
      '**角色下颌线清晰度**：任何侧脸特写五官立体度达到 98% 以上。',
      '**打脸名场面平均时长**：从挑衅到彻底碾压打脸控制在 45 秒内，绝不拖泥带水。',
      '**保镖整齐度**：背景保镖群演无穿模多肢体现象。'
    ],
    pitfalls: [
      '**切忌让霸总表现出猥琐或谄媚表情**：模型偶尔会随机生成微笑，必须加入负面提示词 `smiling, smirk, grinning, silly face` 保持冰山冷脸。',
      '**切忌奢华场景过于现代廉价**：豪门别墅应偏向欧洲古堡或极简中式禅意大宅，避免廉价出租房贴金壁纸感。',
      '**切忌剧情前戏过长**：必须在第1集第10秒前让反派与女主的矛盾爆发，霸总在第60秒准时登场。'
    ],
    faqs: [
      {
        q: '如何让AI生成的黑衣保镖看起来整齐划一而不会融合成一团？',
        a: '降低保镖在画面中的焦点权重：将保镖置于后景虚焦处（`blurred background with silhouettes of bodyguards in uniform`），焦点完全给到前方的霸总单人。'
      },
      {
        q: '霸总题材在海外市场（如ReelShort）表现如何？',
        a: '极其火爆，但海外版本需本土化调整为“亿万富翁CEO、冷酷黑手党教父（Mafia Boss）或狼人Alpha”，爽点逻辑与国内完全相通。'
      }
    ],
    links: [
      { text: '工业化短剧高产SOP手册', url: '/ai-drama/tutorial/advanced/industrial-sop-workflow' },
      { text: 'AI逆袭打脸爽剧制作指南', url: '/ai-drama/tutorial/genre/underdog-comeback-drama' },
      { text: '场景资产库搭建与复用', url: '/ai-drama/tutorial/advanced/scene-asset-library' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/underdog-comeback-drama.md',
    title: 'AI逆袭短剧：2026年逆袭题材AI短剧制作',
    description: '深度解析底层小人物逆袭打脸、扮猪吃老虎类短剧的爆款生成技巧，掌握爽点前置、身份揭秘与高燃反转视听语言。',
    keywords: 'AI逆袭短剧,小人物逆袭打脸,扮猪吃老虎,当众亮明真实身份,爽点前置技巧,仇人下跪痛哭场面',
    directAnswer: 'AI逆袭短剧的核心引擎是“极致的情绪压抑（憋屈）与瞬间的万钧爆发（雪耻）”：前半段让主角承受极尽羞辱（如外卖员被踩踏外卖、赘婿被逼喝洗脚水），积累观众的愤怒值；后半段通过突发军权令、百亿股权认证或至尊黑金龙卡，瞬间颠覆阶级地位，逼得仇人磕头求饶，实现极致的多巴胺宣泄。',
    deepDive: '逆袭剧精准抓住了大众在现实生活中面对不公时的代偿心理。制作这类短剧的成败关键在于“压抑与释放的弹性系数”。压抑不够深，打脸就没有快感；打脸不够狠，观众就不愿意掏钱充值看下一集。',
    reasons: [
      '**视觉化苦难与贫困符号**：破旧的黄色外卖服、雨中湿透的发丝、破旧的电瓶车，与反派的金碧辉煌宴会厅形成毁灭级反差。',
      '**身份揭秘的仪式感（The Big Reveal）**：主角缓缓摘下破旧安全帽，掏出烫金战神令；或顶级财团老太爷带领百名族人推门而入，当场跪拜高呼“老奴拜见龙帅”。',
      '**反派从狂妄到惊恐的面部渐变**：前一秒张狂大笑，后一秒瞳孔剧震、面部惨白、双膝下跪、冷汗直流。',
      '**快节奏短句台词增强打击感**：“三年之期已到”、“睁开你的狗眼看看这是什么”、“跪下说话！”。'
    ],
    workflowOverview: '逆袭短剧生产流水线：前戏极度打压设计、隐藏王牌逐步显露、大反转当场清算、终结收网引出更大boss。',
    steps: [
      '**步骤一：构建主角双重身份图集**：一套是落魄外卖员/清洁工形象，另一套是身披戎装战袍/千亿财阀掌舵人形象。',
      '**步骤二：分镜强化侮辱与隐忍特写**：给主角握紧到泛白的拳头特写、鲜血从指缝滴落的细节，配合眼眸深处涌动的隐忍杀意。',
      '**步骤三：设计震慑全场的高光降临镜头**：天空中武装直升机盘旋降落，或大批黑衣战部精英封锁全场，将视觉场面推向极致。',
      '**步骤四：后期音画爆炸处理**：身份亮明的刹那，BGM瞬间切入高燃战歌（如史诗交响乐鼓点），仇人下跪音效伴随沉重回响。'
    ],
    metrics: [
      '**完播转化率（Completion Rate）**：身份揭秘点位于单集 65-75 秒区间，完播率提升至 35% 以上。',
      '**情绪压抑时长比**：前段受辱与后段爆发时间比例严格保持在 1:1 或 1:1.5。',
      '**反派下跪镜头合格率**：动作平滑顺畅，无腿部骨骼畸变。',
      '**前3集用户充值渗透率**：逆袭剧前3集充值渗透率稳居全品类前列。'
    ],
    pitfalls: [
      '**切忌压抑情节过长导致观众划走**：如果在前30秒内只有单方面的受虐而没有暗示主角身怀绝技，观众会因极度不适而离开。',
      '**切忌主角身份太小儿科**：主角身份不能只是“中了彩票500万”，必须是“全球第一神医”、“镇国龙帅”或“隐世千亿豪门独子”。',
      '**切忌打脸过程圣母心泛滥**：仇人求饶时主角若选择原谅，评论区必然被差评淹没，必须果断严惩绝不姑息。'
    ],
    faqs: [
      {
        q: '如何让AI外卖员的服装显得破旧而真实？',
        a: 'Prompt中补充：`weathered worn yellow delivery jacket, dust and grease stains on sleeves, soaked in heavy rain, rugged tired expression`。'
      },
      {
        q: '为什么逆袭短剧的受众年龄层跨度极大？',
        a: '从18岁青年到60岁中老年，任何人都能从“小人物被轻视后王者归来”的情感母题中获得跨越圈层的强烈爽感与自我肯定。'
      }
    ],
    links: [
      { text: '爆款男频热血短剧制作', url: '/ai-drama/tutorial/genre/male-oriented-drama' },
      { text: '极致节奏AI爽剧爆款制作', url: '/ai-drama/tutorial/genre/addictive-fast-paced-drama' },
      { text: '镜头节奏与蒙太奇剪辑法', url: '/ai-drama/tutorial/advanced/montage-and-pacing' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/ancient-costume-drama.md',
    title: 'AI古装短剧：2026年古装题材AI制作教程',
    description: '打造唯美国风、宫斗宅斗与权谋古装AI短剧，掌握汉服飘逸材质Prompt、古风宫廷布景与东方古典审美视觉规范。',
    keywords: 'AI古装短剧,宫斗宅斗剧,锦衣卫与权臣,国风古韵服装Prompt,汉服飘逸材质,古风宫廷布景技巧',
    directAnswer: 'AI古装短剧的制胜法宝是“东方美学的精致意境与深宅宫闱的勾心斗角”：视觉上注重汉服绢丝织锦的刺绣暗纹、朱红宫墙与雪落琉璃瓦的色彩意象，运用烟雨朦胧与烛光暗影营造画卷质感；剧情上主打真假嫡女、冷宫废后逆袭或锦衣卫权臣强取豪夺，用古典辞藻与狠辣反击抓牢观众。',
    deepDive: '实拍古装剧最大的门槛在于昂贵的场地租赁与服装道具成本，横店拍一部短剧需耗费数十万。AI让创作者可以零成本一键召唤金碧辉煌的紫禁城大殿、烟波浩渺的江南水乡和万军对垒的边关要塞。',
    reasons: [
      '**汉服材质与工艺词库精准化**：Prompt中必须使用专业织物词汇：`intricate gold-embroidered silk Hanfu, flowing diaphanous chiffon sleeves, delicate jade hairpin, traditional Chinese brocade`。',
      '**古典东方构图与意境留白**：采用对称式中国古建筑构图（Symmetrical composition）、月亮门借景（Framing through moon gate）、细雨连绵或大雪纷飞的自然氛围。',
      '**古代发型与头饰结构化固定**：`elaborate ancient Chinese updo hair buns, golden phoenix coronet, pearl tassels gently swaying`，避免头发乱如现代烫发。',
      '**权谋与宫廷的特有冷峻光影**：深夜深宫烛火摇曳（Flickering candle light, chiaroscuro shadows on carved wooden lattice windows），衬托人心莫测。'
    ],
    workflowOverview: '古装剧全流程：古风朝代美术指引、服饰头饰LoRA适配、宫廷深宅场景构建、古风筝笛配乐混剪。',
    steps: [
      '**步骤一：明确朝代美学风格**：唐风华丽丰腴、宋风清雅素简、明清端庄厚重，不可跨朝代胡乱拼凑。',
      '**步骤二：生成宫闱主殿与庭院资产**：渲染雪中紫禁城、养心殿雕花龙椅、后花园荷花池等核心场景备用。',
      '**步骤三：设计古典对峙分镜Prompt**：`Close-up of empress in red ceremonial robe, cold regal expression, delicate makeup with red lip tint, looking down at kneeling concubine, cinematic court drama`。',
      '**步骤四：注入古风器乐与拟音**：选用古筝、琵琶与萧组成的悬疑幽暗配乐，音效强化玉佩碰撞声、华服拖地声与茶杯摔碎声。'
    ],
    metrics: [
      '**汉服纹样精细度**：服饰刺绣无糊成一团的噪点，花纹清晰分明。',
      '**发型头饰穿模率**：走动中步摇与发簪无漂移悬空穿模，合格率达 95%。',
      '**古典台词契合度**：台词符合古汉语行文习惯，杜绝现代流行网络烂梗。',
      '**古风意境观众停留率**：唯美雪景开场使得前3秒跳出率降低 25%。'
    ],
    pitfalls: [
      '**切忌服饰中日韩混杂**：坚决剔除和服腰封与韩服大摆裙特征，Prompt中加入负面词 `kimono, hanbok, obi, geisha` 确保纯正中国国风。',
      '**切忌古代建筑出现现代电线杆或消防栓**：大景生成完毕后必须仔细核对瓦房边缘有无现代违和物体。',
      '**切忌发型过于随意披头散发**：古代宫廷尊卑有序，除就寝戏外严禁主角披头散发，必须有端庄的发髻发冠。'
    ],
    faqs: [
      {
        q: '如何让AI生成的汉服大袖在走动时呈现仙气飘飘的动态？',
        a: '在图生视频提示词中加入：`slow motion walk, fabric fluttering gracefully in gentle breeze, fluid silk physics, ethereal movements`，Motion设定在3左右即可产生极佳的布料物理流动感。'
      },
      {
        q: '古装短剧女频观众最爱看什么桥段？',
        a: '“重生嫡女手撕白莲花庶妹与伪善继母”，在及笄礼或皇室寿宴上当众揭穿阴谋，让偏心渣爹追悔莫及。'
      }
    ],
    links: [
      { text: '高赞女频情感短剧制作', url: '/ai-drama/tutorial/genre/female-oriented-drama' },
      { text: '唯美国风古装短剧制作', url: '/ai-drama/tutorial/genre/ancient-costume-drama' },
      { text: '角色微表情调优技巧', url: '/ai-drama/tutorial/advanced/micro-expressions' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/fantasy-magic-drama.md',
    title: 'AI玄幻短剧：2026年玄幻题材AI短剧制作',
    description: '全面解析修仙渡劫、异界争霸与高燃法术AI玄幻短剧制作，掌握斗气化翼提示词、宗门大比视效与神兽降世。',
    keywords: 'AI玄幻短剧,修仙渡劫短剧,异界大陆争霸,神兽降世视效,斗气化翼提示词,宗门大比高燃场面',
    directAnswer: 'AI玄幻修仙短剧的爆款法则：“世界观异化奇观 + 境界等级严密阶梯 + 毁天灭地的法术视效”。AI技术彻底解放了修仙小说的想象力，从悬浮仙山、雷劫天罚到九爪金龙降世，通过“震撼特效镜头 + 境界等级直接压制（练气虐元婴）”，满足男频受众对极致力量追求的热血爽感。',
    deepDive: '玄幻题材是传统影视工业中最烧钱、成片效果最容易沦为“五毛特效”的重灾区。然而在最新AI多模态大模型面前，云海沉浮、雷电缠绕、金光法阵正是扩散模型最拿手的视觉奇观。个人创作者凭借AI即可拍出媲美院线大片的仙侠神魔大戏。',
    reasons: [
      '**仙侠奇观场景设定（World-Building）**：Prompt构建：`Majestic floating immortal islands connected by glowing crystal chains, swirling purple thunderclouds, colossal ancient divine tree, waterfalls falling into the abyss`。',
      '**境界与异象直观视觉化**：筑基期周身微光、金丹期金芒护体、元婴期天地变色九霄神雷。境界突破必须配以天地异象（Heavenly Phenomenon）。',
      '**上古神兽与凶兽巨物感（Mega-Scale Creatures）**：Prompt中强化对比：`Enormous nine-tailed celestial fox towering over the mountain range, tiny hero standing on cliff peak, sense of immense scale, volumetric epic lighting`。',
      '**宗门大比打脸套路**：被嘲笑为“全宗门第一废柴”的主角走上擂台，一招击败不可一世的内门天骄，震惊全场长老。'
    ],
    workflowOverview: '玄幻修仙工业化制作四部曲：仙侠美术资产构想、境界功法特效合成、宗门打脸名场面剪辑、高燃仙侠交响配乐。',
    steps: [
      '**步骤一：固化修仙道袍与法宝模型**：生成白衣飘飘的宗门剑仙形象，配以悬浮发光的飞剑法宝，固化Prompt三视图。',
      '**步骤二：批量生成毁天灭地的雷劫背景**：渲染翻滚的万丈紫霄神雷、撕裂虚空的空间裂隙等高动态背景素材。',
      '**步骤三：设计法术爆发分镜Prompt**：`Hero pointing two fingers, thousands of glowing golden spectral swords descending from heaven, blinding energy explosion, earth shattering, anime cinematic style`。',
      '**步骤四：后期添加震动与法术音效**：雷击瞬间全屏白光闪烁加镜头震荡，音轨叠加龙吟呼啸、惊雷炸响与破空剑鸣。'
    ],
    metrics: [
      '**巨物视觉比例感**：神兽或山脉与人物身形比例达到 100:1 以上，呈现震撼压迫感。',
      '**法术光效粒子密度**：全屏动态发光粒子饱满且不遮挡角色主姿态。',
      '**男频受众点赞率**：宗门逆袭爆款集点赞率超过 6.5%。',
      '**战斗高潮镜头平均帧率**：保持在 24fps - 30fps，杜绝卡顿顿挫。'
    ],
    pitfalls: [
      '**切忌玄幻打斗变成贴身王八拳互殴**：修仙者必须讲求“御剑于千里之外、言出法随”，避免让两个仙人抱在一起泥地打滚。',
      '**切忌神兽五官崩坏成畸形怪胎**：生成龙、麒麟、凤凰时，必须使用经过专业LoRA微调的模型，并在负面词加入 `ugly face, distorted anatomy`。',
      '**切忌世界观战力体系崩坏**：前期设定的底层境界在没有合理解释下绝不能随意跳级秒杀大乘期老祖，必须遵守升级逻辑。'
    ],
    faqs: [
      {
        q: '如何做出“手搓九天玄雷”的炸裂视觉？',
        a: '先生成角色单手托天的帅气侧影，后期在该手上叠加“球形高能等离子闪电”合成素材，光芒在角色脸部投射剧烈的青白色跳动动态反射，瞬间拉满神性。'
      },
      {
        q: '做玄幻短剧，选用动漫二次元风好还是真人写真风好？',
        a: '玄幻题材采用“国漫3D写实风”（类似《凡人修仙传》《斗破苍穹》）的成片率和受众接受度最高，既能避免真人AI微表情生硬，又能将炫酷法术表现到极致。'
      }
    ],
    links: [
      { text: '特效与粒子融合实操指南', url: '/ai-drama/tutorial/advanced/vfx-particle-effects' },
      { text: '爆款男频热血短剧制作', url: '/ai-drama/tutorial/genre/male-oriented-drama' },
      { text: '复杂动作戏实战生成指南', url: '/ai-drama/tutorial/advanced/complex-action-scenes' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/mystery-suspense-drama.md',
    title: 'AI悬疑短剧：2026年悬疑题材AI短剧制作指南',
    description: '打造烧脑高反转的AI悬疑惊悚短剧，掌握冷色调悬疑氛围打光、凶案线索特写与抽丝剥茧探案叙事技巧。',
    keywords: 'AI悬疑短剧,密室杀人反转,心理惊悚短剧,冷色调悬疑氛围,凶案线索特写,抽丝剥茧探案节奏',
    directAnswer: 'AI悬疑短剧引人入胜的灵魂是“信息不对称与阴郁电影质感”：视觉上采用冷青或墨绿低饱和色调、强烈伦勃朗侧光与浓厚阴影遮挡（Film Noir），大量使用门缝窥视视点（Voyeuristic Shot）与凶器微距特写；剧情上运用“不可靠叙述者 + 嵌套反转”，每集揭露一个自以为是的谎言，直到最后一秒颠覆观众所有认知。',
    deepDive: '悬疑短剧是所有题材中“口碑最易发酵、二次讨论互动率最高”的品类。观众在评论区自发复盘案情细节与线索，能够带来极高的长尾流量。制作悬疑剧切忌一上来就给答案，要像剥洋葱一样步步施压。',
    reasons: [
      '**黑色电影光影（Film Noir Chiaroscuro）**：Prompt中加入 `film noir, heavy low-key lighting, deep harsh shadows, Venetian blind shadows on wall, mysterious grim atmosphere`。',
      '**窥视机位与遮挡构图**：摄影机躲在破旧衣柜门缝后、汽车后视镜中、或者透过沾满雨水的磨砂玻璃进行模糊聚焦拍摄。',
      '**线索微距特写（Macro Clue Insert）**：地板上一滴尚未凝固的血迹、墙角被撕碎的遗嘱一角、沾有口红印的打火机。',
      '**心理惊悚音画共振**：心跳声随着倒计时逐渐加快、秒针滴答声骤停、沉闷的重音低频蜂鸣（Drone）营造窒息紧迫感。'
    ],
    workflowOverview: '悬疑短剧创作四步法：密室谜案网状设计、阴冷暗调资产渲染、高压审讯分镜组接、心理重音与断章卡点。',
    steps: [
      '**步骤一：构建封闭压抑场景资产**：渲染雨夜废弃工厂、狭小昏暗的地下审讯室、老旧阴森的古宅走廊。',
      '**步骤二：设计双人心理博弈分镜Prompt**：`Two people across metal interrogation table, harsh single pendant lamp overhead, deep shadows in eyes, tense psychological standoff, hyperrealistic gritty texture`。',
      '**步骤三：制造关键帧的异常细节**：让角色的眼神微不可察地撇向镜头死角，或露出诡异冷笑，埋下视觉伏笔。',
      '**步骤四：后期调色降饱和与黑电平下压**：去除所有鲜艳暖色，整体色温调至6800K冷光，暗部阴影压深，增强压抑感。'
    ],
    metrics: [
      '**评论区互动参与率**：案情线索伏笔使得评论区破案互动率达到 12% 以上。',
      '**暗部细节保留度**：黑阶阴影深沉但不过度死黑，保留 10% 暗部纹理。',
      '**单集悬念反转率**：每集结尾必须颠覆观众上一集的判断假说。',
      '**音画悬疑卡点精度**：惊悚点伴随重音的画幅缩放误差在 1 帧内。'
    ],
    pitfalls: [
      '**切忌凶案场面直接展示过于血腥露骨的画面**：平台对血腥暴力审核极严，应采用“血液飞溅到洁白墙面”或“手中刀刃滑落”等借代手法。',
      '**切忌逻辑漏洞百出强行反转**：反转必须有前情伏笔可循，毫无道理的“凶手其实是外星人”会遭遇观众严重抵触。',
      '**切忌背景音乐从头响到尾破坏沉浸感**：悬疑剧最需要“死一般的寂静”，在关键推论时完全静音，效果远胜吵闹配乐。'
    ],
    faqs: [
      {
        q: '如何让凶手在被揭穿时的笑声显得毛骨悚然？',
        a: '配音时采用“从低沉冷笑逐渐转化为带泪狂笑”，音频添加大厅回声混响（Reverb），并在画面上配合角色瞳孔骤缩与嘴角抽搐的微表情。'
      },
      {
        q: '悬疑题材短剧如何变现？',
        a: '悬疑剧是单集完播率最高的题材之一，极适合做“全集悬念打包解锁”的付费模式，或者通过悬疑剧解说引流到小程序/短剧分销平台。'
      }
    ],
    links: [
      { text: '镜头节奏与蒙太奇剪辑法', url: '/ai-drama/tutorial/advanced/montage-and-pacing' },
      { text: '角色细腻微表情调优技巧', url: '/ai-drama/tutorial/advanced/micro-expressions' },
      { text: '短剧付费转化率提升与账号运营', url: '/monetize/traffic/' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/rebirth-revenge-drama.md',
    title: 'AI重生短剧：2026年重生题材AI短剧制作',
    description: '掌握全网最火爆的重生复仇题材短剧制作，从上一世惨死被虐、抢占先机囤积资源到全套打脸复仇剧本与视觉生成。',
    keywords: 'AI重生短剧,重生之我为首富,上一世惨死复仇,先知先觉改变命运,抢占先机爽点,弥补遗憾剧情设计',
    directAnswer: 'AI重生复仇短剧的制胜内核是“上帝视角的信息差碾压与复仇快意”：开局前30秒极速呈现前世凄惨结局（被渣男闺蜜背叛害死、家破人亡），随后一睁眼重回命运转折点（如十年前的婚礼或高考前夕）；主角利用知晓未来的全知视角，抢注暴利资产、提前布下天罗地网，一步步引诱仇人走向毁灭。',
    deepDive: '重生题材之所以长盛不衰，是因为它直击人性深处最大的渴望——“如果人生可以重来，我绝不留任何遗憾”。短剧受众在代入主角时，享受的是“我知道你所有的阴谋，而你却像小丑一样浑然不知”的降维智商碾压快感。',
    reasons: [
      '**两世为人的人设断崖反差**：前世软弱可欺、任人摆布的纯良小白花，重生后化身眼神狠厉、算无遗策的黑化女王。',
      '**重生睁眼瞬间的心理重构镜头**：经典机位：主角猛然从床上坐起，大口剧烈喘息，颤抖着抚摸自己的脸颊与心跳，确认自己真的重生了。',
      '**先知先觉的现实利益爽点**：精准买入即将拆迁的烂尾楼、截胡百亿独角兽投资、抢先揭露假少爷的DNA报告。',
      '**让仇人自食恶果的因果闭环**：主角不亲自动手，而是顺着仇人的歹毒计划反向设局，让仇人亲手将自己送进监狱。'
    ],
    workflowOverview: '重生复仇四步生产线：前世惨剧黄金钩子、重生苏醒宿命感转折、先机截胡步步为营、高潮收网全面清算。',
    steps: [
      '**步骤一：制作前世惨死的黑白回忆片段**：使用过曝泛黄的老旧胶片颗粒滤镜，快速闪回病危签字、火灾或悬崖坠落镜头。',
      '**步骤二：设计苏醒重生震撼分镜Prompt**：`Extreme close-up of woman suddenly opening eyes, pupil dilation, trembling cold sweat on forehead, looking at calendar on bedroom wall showing year 2016, cinematic dawn light`。',
      '**步骤三：拍摄运筹帷幄的从容特写**：面对前世仇人伪善的问候，主角嘴角露出一丝冰冷玩味的笑意，台词：“好久不见啊，我‘亲爱’的妹妹”。',
      '**步骤四：后期双时空交错剪辑**：在主角本世惩治仇人时，穿插0.5秒前世仇人嚣张嘴脸的黑白闪回，复仇快感翻倍。'
    ],
    metrics: [
      '**第1集前世交代时长**：前世惨死必须在 25 秒内结束，迅速切入重生现代。',
      '**眼神从脆弱到黑化转变合格率**：通过眼神光与微表情调优达到 95% 准确度。',
      '**全剧复仇节点密度**：每 3 集完成一个小复仇，第 10 集迎来首个大清算。',
      '**受众付费连播率**：重生复仇题材在付费断点处连播率突破 80%。'
    ],
    pitfalls: [
      '**切忌前世戏码过于冗长拖沓**：超过40秒还在演前世凄惨，观众会误以为这是一部悲剧苦情戏而弃剧。',
      '**切忌重生后主角依然性格软弱**：观众对重生后还被欺负的主角零容忍，必须从第一分钟起就强硬反击。',
      '**切忌未来预测出现历史常识穿帮**：主角预知的股市、拆迁或政策时间节点必须符合公众认知或自洽的架空逻辑。'
    ],
    faqs: [
      {
        q: '重生题材的日历/时间提示镜头怎么做最醒目？',
        a: '给墙上的翻页日历或手机锁屏界面一个极速推镜头（Prompt: `Zoom in to smartphone screen showing date October 15, 2018, sharp digital clock, 4k`），瞬间向观众交代穿越事实。'
      },
      {
        q: '女频重生复仇和男频重生搞钱有什么核心区别？',
        a: '女频更侧重“撕开虚伪亲情/爱情、打脸恶毒亲戚并收获真爱与事业独美”；男频则侧重“商海大亨崛起、科技降维打击、财富帝国全球称霸”。'
      }
    ],
    links: [
      { text: 'AI逆袭打脸爽剧制作指南', url: '/ai-drama/tutorial/genre/underdog-comeback-drama' },
      { text: '高赞女频情感短剧制作', url: '/ai-drama/tutorial/genre/female-oriented-drama' },
      { text: '镜头节奏与蒙太奇剪辑法', url: '/ai-drama/tutorial/advanced/montage-and-pacing' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/time-travel-drama.md',
    title: 'AI穿越短剧：2026年穿越题材AI短剧制作指南',
    description: '解析穿越题材跨时空短剧制作技巧，掌握现代科技降维横扫古代、古穿今文化冲突与古今视觉融合提示词。',
    keywords: 'AI穿越短剧,现代科技横扫古代,古穿今文化冲突,历史名人互动,现代知识降维打击,古今视觉融合',
    directAnswer: 'AI穿越短剧的爆款抓手在于“降维认知差制造的荒诞感与爽快感”：无论是现代理科生穿越古代手搓黑火药、水泥与青霉素，还是古代帝王权臣穿越到现代面对红绿灯与智能手机；通过鲜明的文化隔阂、认知冲突与“开挂式知识降维”，在制造密集成吨笑点的同时，带来所向披靡的征服快感。',
    deepDive: '传统穿越实拍剧最大的制约是道具与布景难度——如何在古装场景中合理融入现代装备？而AI生成只需在提示词中巧妙融合两类风格（如“身穿全套现代特种兵战术背心的特警站在古代金銮殿上”），即可瞬间创造出极具视觉冲击力的奇观画面。',
    reasons: [
      '**跨时代物品并置的奇观性（Juxtaposition）**：现代打火机在古代被奉为“神火至宝”，一盒消炎药挽救了举国名医束手无策的皇帝。',
      '**现代工业对农耕文明的工业革命打击**：主角利用基础物理化学知识提炼精盐、炼钢铸剑，引爆朝堂与商业震动。',
      '**古穿今题材的文化错位喜感**：冷血女杀手穿越成现代家庭主妇，手握菜刀切出宗师级刀法，把家暴渣男吓得屁滚尿流。',
      '**古今视觉色调的碰撞与统一**：现代部分采用高对比鲜亮色调，古代部分保留水墨质感，穿越隧道采用超现实粒子虫洞特效。'
    ],
    workflowOverview: '穿越短剧四部曲：跨时代异样符号确立、时空转换特效衔接、降维打脸事件设计、双向情感羁绊深化。',
    steps: [
      '**步骤一：设计标志性跨时代主角造型**：Prompt示例：`Modern young man in casual hoodie and jeans standing in bustling ancient Tang dynasty marketplace, holding a smartphone, confused expression, cinematic hyperrealism`。',
      '**步骤二：制作时空虫洞跃迁视觉**：利用空间粒子光效，制作角色坠入时空裂隙、电闪雷鸣的光轨穿梭动画。',
      '**步骤三：拍摄古人顶礼膜拜反打镜头**：古代群臣与皇帝瞪大双眼，看着主角掏出的现代奇物，神情从怀疑到跪地高呼神迹。',
      '**步骤四：后期配乐古今碰撞**：古琴琵琶的前奏中突然切入强烈的现代嘻哈Boom-Bap鼓点，烘托不羁的现代降维态度。'
    ],
    metrics: [
      '**穿越发生耗时**：必须在第1集前 15 秒内完成穿越事件，绝不拖拉。',
      '**跨时代道具材质真实度**：现代塑料/金属材质与古代粗布石材对比鲜明。',
      '**喜剧笑点分布密度**：每集至少安排 1-2 处古今文化误会导致的爆笑梗。',
      '**观众年轻群体偏好度**：在18-24岁年轻群体中分享率高达 15% 以上。'
    ],
    pitfalls: [
      '**切忌穿越过程物理原理过度长篇大论解释**：观众不关心虫洞具体是量子力学还是弦理论，直接被雷劈或车祸穿越即可。',
      '**切忌主角在古代肆意使用现代枪械造成战力崩坏**：热兵器滥用会导致战斗失去悬念，建议弹药受限或以现代智慧谋略为主。',
      '**切忌忽略古代语言与礼节反差**：主角说现代网络流行语时，古代人必须有符合时代背景的困惑与误解反应。'
    ],
    faqs: [
      {
        q: '古穿今题材怎样避免拍成俗套的傻子闹剧？',
        a: '主角虽然不懂现代科技，但必须具备顶级古代生存智慧与宗师武力值。面对现代黑帮或不法分子时瞬间展现凌厉身手，形成反差帅。'
      },
      {
        q: '穿越剧中的智能手机没电了怎么处理？',
        a: '主角可以用土豆/柠檬自制伏特电池发电，或者以此作为限制主角能力的悬念开关，增强剧情紧迫感。'
      }
    ],
    links: [
      { text: '唯美国风古装短剧制作', url: '/ai-drama/tutorial/genre/ancient-costume-drama' },
      { text: '特效与粒子融合实操指南', url: '/ai-drama/tutorial/advanced/vfx-particle-effects' },
      { text: '极致节奏AI爽剧爆款制作', url: '/ai-drama/tutorial/genre/addictive-fast-paced-drama' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/male-oriented-drama.md',
    title: 'AI男频短剧：2026年男频题材AI制作教程',
    description: '男频短剧吸金秘籍全公开，涵盖赘婿战神归来、商界巨擘争霸、男频热血战斗与万人朝拜宏大场面制作。',
    keywords: 'AI男频短剧,赘婿战神归来,商界巨擘争霸,男频热血战斗,热血装逼台词,万人朝拜宏大场面',
    directAnswer: 'AI男频短剧的核心心智是“征服欲、阶层跨越与尊严绝对找回”：核心题材围绕战神龙帅归来、隐世神医出山、开局被退婚宗门废柴；视觉上必须呈现大排场（万军整齐行礼、数十台直升机轰鸣降落、黑卡随手甩出）；台词狂傲霸气，专治各种豪门跋扈恶少，让男性受众在现实压力下体验睥睨天下的极度快感。',
    deepDive: '男频短剧的付费核心人群主要是25-50岁男性，这部分受众更偏好直球、刚猛、节奏极快的情绪刺激。剧作严禁纠结于小情小爱和虐心多角恋，男主必须目标明确——顺我者昌，逆我者亡，用绝对的力量碾压一切阴谋诡计。',
    reasons: [
      '**军武与权力巅峰符号**：战神军装勋章、特种装甲车列队、盖世统帅专属黑蟒袍，Prompt中强化恢弘铁血质感。',
      '**恶少与势利岳母经典标靶**：设置极端势力刻薄的反派角色（“你个窝囊废赘婿连给我儿买鞋都不配”），激起观众滔天怒火。',
      '**一言九鼎的王座台词**：“我龙王一声令下，华夏十万将士归位！”、“动我生母坟茔者，灭其九族！”。',
      '**热血动作快节奏硬碰硬**：主角不出手则已，出手即断其手足，雷霆万钧不拖泥带水，视觉冲击力拉满。'
    ],
    workflowOverview: '男频短剧量产四阶段：铁血霸气主角立项、大军压境大场面生成、受辱反杀节奏编排、激昂战歌混音。',
    steps: [
      '**步骤一：主角硬朗军武形象建立**：Prompt设定：`Tall muscular Asian man in 30s, battlefield scars, piercing resolute eyes, black tactical military commander uniform, imposing stance, wind blowing cape`。',
      '**步骤二：万军跪拜宏大场景生成**：`Massive military parade ground, tens of thousands of armored soldiers saluting uniformly in heavy rain, armored tanks lined up, epic cinematic drone wide shot`。',
      '**步骤三：设计单挑反杀动作分镜**：反派保镖蜂拥而上，主角单手反扣、侧踢飞出，动作干脆利落一击必杀。',
      '**步骤四：后期配置激昂战鼓与重低音**：动作击打瞬间加入重炮级轰鸣，打完后主角冷眼整理衣领，全场噤若寒蝉。'
    ],
    metrics: [
      '**男性受众完播率**：前3集通过身份压制将男粉完播率锁定在 30% 以上。',
      '**宏大排场镜头比例**：全剧大远景宏大场面占比不低于 15%。',
      '**单场打斗时长控制**：解决杂兵用时小于 10 秒，体现主角压倒性实力。',
      '**充值付费峰值集数**：第 8-12 集大决战充值峰值转化率突破 20%。'
    ],
    pitfalls: [
      '**切忌主角在战斗中被打得鼻青脸肿**：男频受众要求主角必须“无敌”，任何让主角狼狈受辱的战斗都会造成严重脱粉。',
      '**切忌加入过多的儿女情长煽情**：女主可以倾城绝色，但不能拖主角后腿，主角必须以事业、复仇与兄弟大义为核心。',
      '**切忌台词念白中气不足**：AI配音必须选择低沉、浑厚、充满威严与杀气的男中音，拒绝尖细娘娘腔。'
    ],
    faqs: [
      {
        q: '如何让万人军团场景看起来真实而不穿模？',
        a: '采用航拍俯瞰大远景（Wide Aerial Shot），将算力用于整齐划一的阵列阴影与装备质感，无需渲染每一个士兵的面部五官细节。'
      },
      {
        q: '男频短剧在海外投放时需要注意什么？',
        a: '出海时将“龙王战神”本地化包装为“阿尔法狼王（Alpha Werewolf）”或“退役特种兵战神（Delta Force Veteran）”，受众打赏付费意愿极强。'
      }
    ],
    links: [
      { text: 'AI逆袭打脸爽剧制作指南', url: '/ai-drama/tutorial/genre/underdog-comeback-drama' },
      { text: 'AI玄幻修仙高燃短剧制作', url: '/ai-drama/tutorial/genre/fantasy-magic-drama' },
      { text: '短剧剧本爆款框架设计', url: '/ai-drama/workflow/script/hook-frameworks' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/female-oriented-drama.md',
    title: 'AI女频短剧：2026年女频题材AI制作指南',
    description: '解析高赞爆款女频短剧制作精髓，涵盖真假千金归位、大女主独立逆袭、虐恋情深与精致穿搭美学控制。',
    keywords: 'AI女频短剧,真假千金归位,大女主独立逆袭,虐恋情深追妻火葬场,细腻情绪共鸣,女性精致穿搭美学',
    directAnswer: 'AI女频短剧的情感密码在于“高维度情绪共振、美学愉悦与女性自我觉醒”：核心题材聚焦真假千金打脸假千金全家、手撕出轨渣男后闪嫁千亿首富、独立大女主职场登顶；视觉上追求电影级精致皮肤光泽、高定礼服珠宝质感与唯美光影；剧情主打“追妻火葬场”，让前期傲慢的男主痛彻心扉求复合，赋予女性受众绝对的情感主控权。',
    deepDive: '女频短剧观众具有极高的审美水准、极强的剧情共情能力和极高的二创传播意愿。女频剧的核心不是简单的打架斗殴，而是“台词的言外之意、眼神的拉扯交锋与人格尊严的重塑”。让女主角无论遭遇多大背叛，始终优雅从容、步步为营。',
    reasons: [
      '**极致的美学与高定穿搭呈现**：Prompt中必须对服装精益求精：`Elegant bespoke white ivory silk gown, diamond chandelier earrings, Chanel aesthetic, polished refined makeup, soft luxury lighting`。',
      '**真假千金/豪门血缘的情感错位**：从小在乡下吃苦的真千金，带着全球顶级马甲（顶级黑客、国医圣手）归来，当众揭穿假千金的绿茶面具。',
      '**追妻火葬场的极致虐恋反转**：男主在失去女主后才发现当年的救命恩人正是她，在大雨中长跪不起哀求原谅，而女主冷眼关窗。',
      '**女性之间彼此救赎的清流设定**：逐渐摒弃恶俗的“女人何苦为难女人”，加入正妻与清醒小三联手搞垮渣男转移全部财产的独立大女主题材。'
    ],
    workflowOverview: '女频短剧制作四步曲：高定女性视觉资产打磨、复杂细腻微表情刻画、高情商博弈台词录音、唯美伤感配乐混音。',
    steps: [
      '**步骤一：构建独立大女主视觉基底**：强调优雅、坚定、冷艳的气场，杜绝弱智傻白甜造型，固化红唇与利落波浪卷发。',
      '**步骤二：设计心碎决绝分镜Prompt**：`Close-up of elegant woman, single tear glistening on cheek, eyes cold and resolute, turning away gracefully, luxury ballroom background softly blurred`。',
      '**步骤三：台词录制与气口控制**：采用轻柔却充满压迫感的御姐音色，语调不急不缓：“我能捧你上神坛，也能亲手把你拽入地狱”。',
      '**步骤四：后期色调与情绪渲染**：采用低饱和莫兰迪色调或电影暖茶色调，配乐融入大提琴低沉旋律，强化高级感。'
    ],
    metrics: [
      '**女性观众互动转发率**：共鸣金句集在抖音/小红书二创转发率超 10%。',
      '**珠宝配饰光泽真实感**：钻石项链与丝绸高光真实自然，无色块黏连。',
      '**微表情感染力**：哭戏眼泪滑落与眼眶泛红真实度达到 95%。',
      '**女频受众付费复购率**：追妻火葬场高潮集复购率超 75%。'
    ],
    pitfalls: [
      '**切忌让女主为了复合而轻易妥协原谅**：女频受众极其痛恨“渣男稍微道个歉就和好”的剧情，虐渣男必须虐到骨髓深处。',
      '**切忌假千金的手段过于低幼愚蠢**：反派智商必须在线，手段越隐蔽狠毒，女主揭穿时的成就感才越强烈。',
      '**切忌画面打光过硬破坏皮肤通透感**：必须使用大面积柔光纸（Diffusion filter）柔化面部光线，呈现水光肌质感。'
    ],
    faqs: [
      {
        q: '女频短剧中最容易引爆传播的金句台词有哪些？',
        a: '如：“我给你的是恩赐，我不给，你不能抢”、“我的世界很大，你不过是曾经路过的一只蚂蚁”、“今天是我顾氏集团掌舵人的回归宴，闲杂人等一律清场”。'
      },
      {
        q: '小红书平台投放女频AI短剧有什么引流技巧？',
        a: '截取女主高光换装出场、手撕小三的15秒高颜值切片，封面突出“人间清醒”、“大女主逆袭”标签，引流效果极佳。'
      }
    ],
    links: [
      { text: 'AI甜宠恋爱短剧制作教程', url: '/ai-drama/tutorial/genre/sweet-romance-drama' },
      { text: '角色微表情调优技巧', url: '/ai-drama/tutorial/advanced/micro-expressions' },
      { text: '唯美国风古装短剧制作', url: '/ai-drama/tutorial/genre/ancient-costume-drama' }
    ]
  },
  {
    filePath: 'docs/ai-drama/tutorial/genre/addictive-fast-paced-drama.md',
    title: 'AI爽剧：2026年爽剧题材AI短剧制作教程',
    description: '掌握全网极致快节奏爽剧制作宝典，三秒一小爽十秒一大爽，全面解析高频多巴胺刺激、付费欲拉满与算法推流机制。',
    keywords: 'AI爽剧,快节奏爽剧,三秒一小爽十秒一大爽,情绪释放极致,付费欲拉满技巧,短剧算法推流偏好',
    directAnswer: '极致AI爽剧的制作哲学是“高纯度多巴胺持续轰炸与零废话推进”：坚决剔除一切文艺抒情和拖沓铺垫，全剧严格遵循“3秒抛危机、15秒小高潮、45秒核弹级打脸反转、85秒悬崖式断章”的极速节拍器公式；在视觉、台词、音效上三维饱和打击，让观众大脑完全来不及思考逻辑破绽，只能一路被情绪洪流推着不断点击下一集。',
    deepDive: '短剧在本质上是短视频时代的多巴胺消费品。传统长视频允许用两集铺垫一个背景，而竖屏爽剧的生存法则是“前5秒没抓住眼球用户手指一滑就没了”。AI的高速生成能力使得创作者能够将所有经费都花在“最高潮冲突”上，不留半点废帧。',
    reasons: [
      '**密集的情绪弹药投掷（High Dopamine Density）**：每集至少设置3个不同维度的反转，从金钱碾压、地位震慑到武力制裁连环出击。',
      '**极速语言叙事（Zero Exposition Filler）**：人物一开口就是火药味浓厚的冲突，没有任何废话问候，台词字数严格控制在每分钟220字左右。',
      '**视听冲击力饱和轰炸**：耳光声、合同摔桌声、引擎轰鸣声、高燃交响变奏交织，音量动态饱满，牢牢统治观众耳膜。',
      '**卡点心理学与算法推流对齐**：精准卡在观众最期待看结果的一刹那截断，促成超高完播率与连播率，触发推荐算法万级流量池倾斜。'
    ],
    workflowOverview: '极致爽剧生产流水线：多巴胺节拍器剧本拆解、高能爆点画面并发渲染、极速蒙太奇节奏粗剪、重音卡点强化与断章测试。',
    steps: [
      '**步骤一：多巴胺节拍表严格卡点**：按照 [0-3s Hook] -> [15s Conflict] -> [45s Climax] -> [85s Cliffhanger] 严格规划分镜时长。',
      '**步骤二：提取视觉爆点生成Prompt**：将所有镜头设计为近景与特写，将人物狂傲挑衅与狠厉反杀的表情放大至全屏。',
      '**步骤三：剪辑采用硬切无缝衔接**：严禁慢镜头和淡化转场，采用声画错位（L-Cut）抢先进下一句台词，制造令人窒息的逼迫感。',
      '**步骤四：断章心理盲测验证**：剪辑完成后找测试人员试看，如果在结尾断章瞬间没有脱口而出“卧槽下一集呢？”，立即推翻重新寻找卡点帧。'
    ],
    metrics: [
      '**全剧平均镜头切换速度**：平均单镜头时长维持在 1.2 - 1.8 秒。',
      '**前3秒用户滑走率（Skip Rate）**：控制在 25% 以下。',
      '**完播率与连播率（Binge Rate）**：首集完播率超过 45%，连播转化率超 80%。',
      '**短剧投流ROI回报率**：优质爽剧在付费平台的投放ROI维持在 1.25 - 1.4 以上。'
    ],
    pitfalls: [
      '**切忌在爽剧中讲大道理和道德反思**：观众看爽剧是为了宣泄解压，一旦主角开始长篇大论讲道德仁义，观众热情立刻退潮。',
      '**切忌反派投降得太早太轻易**：反派必须顽抗到底，连续叫来更高级别的靠山，让主角一环扣一环层层打脸，爽感才能倍增。',
      '**切忌断章断在已经得出结果的地方**：永远把断章点设在“巴掌即将落下”、“大门刚被踹开”、“亲子鉴定翻到最后一页”的未完成瞬间。'
    ],
    faqs: [
      {
        q: '如何让AI生成的打脸戏份看起来速度更快、更有力量感？',
        a: '在动作发生前0.1秒做极微弱的慢动作蓄力，在击打瞬间直接抽掉2帧画面，配合沉重击打低频音效，形成视觉残影冲击。'
      },
      {
        q: '做极致快节奏爽剧，是否会牺牲剧情的逻辑严密性？',
        a: '爽剧的核心逻辑是“情绪逻辑”而非“现实物理逻辑”。只要角色动机纯粹、情绪因果闭环、反派足够拉仇恨，微小的现实逻辑漏洞在高速视听冲击下完全会被观众忽略。'
      }
    ],
    links: [
      { text: '镜头节奏与蒙太奇剪辑法', url: '/ai-drama/tutorial/advanced/montage-and-pacing' },
      { text: '短剧剧本爆款框架设计', url: '/ai-drama/workflow/script/hook-frameworks' },
      { text: '短剧付费转化率提升与账号运营', url: '/monetize/traffic/' }
    ]
  }
];

articles.forEach(writeGeoArticle);
console.log(`Successfully written ${articles.length} articles in cluster 2.2.3.`);
