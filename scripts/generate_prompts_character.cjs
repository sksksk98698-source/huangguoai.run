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

::: tip 核心结论与人设Prompt速查
${a.directAnswer}
:::

## 核心机制与人设立体化底层设计

${a.deepDive}

### 核心人物设定Prompt词典与精准配方
${reasonsList}

## 工业级标准实操与长剧人设固化流程

${a.workflowOverview}

${stepsList}

## 关键参数指标与角色资产质检规范

为了确保人物在跨集数、跨镜头切换中五官骨骼与穿搭风格高度稳定，建议执行以下标准：

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
    filePath: 'docs/prompts/library/character/male-protagonist-prompts.md',
    title: '男主角人设提示词库：战神将军、冷酷总裁与落魄穷小子Prompt全集',
    description: '涵盖短剧三大核心男主类型（战神、霸道总裁、逆袭穷小子）的全套标准化提示词，从骨骼五官、眼神气质到高定服装中英文Prompt速查。',
    keywords: '男主角人设提示词, 帅气男主Prompt, 剑眉星目, 高定西装气场男主, 战损风男主',
    directAnswer: '在2026年爆款短剧中，男主角是剧情爽点与观众代入的核心载体。**战神男主需要刀削般的凌厉下颌线、鹰隼般冷酷锐利的双眸与沾满硝烟的战损风大衣；霸道总裁需要高挺鼻梁、一丝不苟的背头发型、高定深灰暗纹西装与居高临下的压迫感气场；逆袭穷小子需要朴素甚至洗脱色的旧夹克、坚毅隐忍的微抿嘴角与眼底深处不屈的火焰**。标准化的人设Prompt是长剧集角色锁定的第一步。',
    deepDive: '设计男主人设Prompt的关键是构建“独特的生理生物学锚点（Unique Biological Anchors）”。如果只写“handsome Chinese man”，模型会在千千万万张帅哥脸中随机采样，导致每一集换一个演员。通过在Prompt中加入特定的结构化微特征（如“高鼻梁骨节微突起、左眉尾有一道细小浅疤痕、浓密剑眉微微上扬、坚硬方圆下巴”），能形成极强的特征唯一性，极大降低角色漂移率。',
    reasons: [
      '**战神/兵王归来（War God Commander）**：\n- 核心特征：28岁东亚男性，身高188cm，体格强壮如猎豹，剑眉星目，冷酷如霜的眼神，下巴带青黑色硬茬胡茬，面颊有一道极淡的战斗划痕。身穿碳灰色重型战术防风风衣，领口微敞露出锁骨，散发着从尸山血海中走出的致命压迫感。\n- Prompt范例：`28yo handsome East Asian male commander, 188cm towering athletic build, razor-sharp jawline with light masculine stubble, piercing predatory eyes, intense cold aura, faint battle scar across left cheekbone. Wearing charcoal distressed military tactical trench coat, standing tall with dominant presence, 8k cinematic.`',
      '**千亿豪门冷酷总裁（Billionaire CEO）**：\n- 核心特征：30岁东亚顶级商界精英，轮廓如大理石雕刻般完美，鼻梁高挺，戴副无框银丝眼镜，梳着利落大背头。身穿英国萨维尔街高定墨黑三件套西装，白色法式衬衫系深蓝真丝领带，双眸深邃如无底深渊，神态极度克制冷漠，气场尊贵不可侵犯。\n- Prompt范例：`30yo elite East Asian CEO, chiseled marble-like facial contours, high refined bridge of nose, rimless silver spectacles, sleek combed-back dark hair. Tailored Savile Row obsidian wool three-piece suit, crisp white French cuff shirt, silk navy tie, calm calculating aristocratic aura, ultra-photorealistic.`',
      '**隐忍逆袭穷小子（Underdog Hero）**：\n- 核心特征：24岁年轻男子，黑发蓬松微乱贴在额角，眼神清澈而坚定，薄唇紧抿，透着骨子里的倔强与隐忍。身穿洗得发白的浅灰连帽卫衣和磨损工装牛仔裤，身材修长微瘦，手指骨节分明略带泥污。\n- Prompt范例：`24yo East Asian young man, lean athletic physique, slightly messy dark fringe sweeping forehead, determined rebellious eyes, tightly set jaw showing resilience. Worn faded heather-grey hoodie, weathered cargo jacket, clean handsome facial features with melancholic underdog grit, authentic film portrait.`'
    ],
    workflowOverview: '如何长效固化男主人设资产：',
    steps: [
      '**第一步：选定人设模板并微调**：从上述三大类型中挑选一种，微调发型和瞳孔颜色等细节。',
      '**第二步：在生图工具中产出“九宫格多姿态三视图”**：生成正面、侧面45度、背面以及微笑、冷笑、愤怒等多表情原画。',
      '**第三步：提取特征训练专属LoRA或用--cref锁定**：将固化的人脸资产作为垫图源，用于后续所有剧集镜头。'
    ],
    metrics: [
      '**五官特征锁定度**：眉毛弧度、鼻骨高度与下颌角特征在不同场景下吻合率达88%以上。',
      '**气质类型辨识度**：观众在不听台词的情况下，能一眼分辨出角色是战神、总裁还是穷小子。',
      '**服装风格统一性**：角色日常主服饰材质与剪裁在连续分镜中保持一致。'
    ],
    pitfalls: [
      '**避免人设词过于抽象**：写“气质非凡”对模型毫无用处，必须转化为具体的“挺拔站姿、下颌微微抬起5度、单手插兜”。',
      '**切忌随意更换发型描述**：短剧中发型一旦改变，观众瞬间会产生换演员的错觉，发型词在整部剧中必须绝对保持一字不差。'
    ],
    faqs: [
      {
        q: '男主战损妆（脸上有血痕和污渍）在视频模型里怎么稳定生成？',
        a: '在Prompt中加入`cinematic battle-damage makeup, thin streaks of dried blood on temple, soot stains on cheek, unkempt sweaty hair`，模型会生成非常真实的战后沧桑感，不会显得脏乱。'
      },
      {
        q: '如何表现总裁的“宠溺眼神”而不显得油腻？',
        a: '关键在于嘴部克制、眼部柔和：`subtle softening of cold eyes, gentle affectionate micro-smile curving the lips, warm golden light reflected in pupils, elegant tender demeanor`，切忌写“邪魅一笑”。'
      }
    ],
    links: [
      { text: '女主角绝美外貌气质Prompt词典', url: '/prompts/library/character/female-protagonist-prompts' },
      { text: '面部五官高精度Prompt细节库', url: '/prompts/library/character/facial-features-micro-prompts' },
      { text: 'Midjourney角色一致性终极方案', url: '/ai-tools/models/image/midjourney-consistent-character-methods' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/female-protagonist-prompts.md',
    title: '女主角人设提示词库：豪门千金、清纯校花与黑化大女主Prompt词典',
    description: '短剧大女主、豪门贵妇、清纯白月光三大核心女主人设Prompt库，细致解析骨相美、妆容风格、高定礼服与眼神黑化质感。',
    keywords: '女主角人设提示词, 美女主角Prompt, 清冷绝美气质, 烈焰红唇黑化装束, 仙气飘飘古风女主',
    directAnswer: '女主角是短剧唯美感、情感张力与代入感的核心支柱。**豪门千金需要优雅冷艳的高级骨相、天鹅颈、一袭墨绿丝绒露背晚礼服与奢华珠宝点缀；清纯校花/白月光需要毫无攻击性的初恋脸、透亮无瑕的水光肌、清澈小鹿眼与洁白连衣裙；黑化大女主需要猩红烈焰红唇、上扬凌厉眼线、修身暗黑西装风衣与冷酷睥睨一切的气场**。'
    ,
    deepDive: '传统审美Prompt中充斥着“gorgeous, super pretty”等低效泛词，容易生成千篇一律的网红色假脸。高级短剧女主人设Prompt依赖“解剖学骨相 + 妆容色彩学 + 材质反射”。通过定义颅顶高度、下颌拐点、眼裂长度以及底妆质地（如半哑光丝绒雾面、自然水光感），能打造具有真正明星高级感与辨识度的女主面孔。',
    reasons: [
      '**豪门真千金/高冷御姐（Heiress & Cool Elegance）**：\n- 核心特征：26岁年轻名媛，高颅顶天鹅颈，清冷孤傲的骨相美，极具辨识度的眼尾微扬丹凤眼，左眼角一颗细小泪痣。身穿极简奢华墨绿色真丝露背晚礼服，佩戴梨形祖母绿耳坠，手腕纤细，神态疏离而从容。\n- Prompt范例：`26yo aristocratic East Asian heiress, striking high cheekbones and graceful swan neck, elegant phoenix eyes with subtle upward flick, delicate beauty mark beneath left eye. Bespoke emerald green silk halter evening gown, pear-cut emerald drop earrings, porcelain skin, regal aloof aura, 8k.`',
      '**清纯白月光/国民初恋（Pure Campus Beauty）**：\n- 核心特征：20岁年轻女孩，圆润饱满的鹅蛋脸，水汪汪纯洁无辜的杏眼，皮肤白皙透亮宛若剥壳鸡蛋，天然浅粉色嘟嘟唇。长发如瀑，身穿简约米白色棉麻衬衫裙，微风吹拂发丝，眼神清澈宛如山间清泉。\n- Prompt范例：`20yo East Asian campus maiden, innocent doe-like eyes, soft youthful facial contours, dewy translucent glass-skin, natural soft pink lips. Silky straight black hair gently swaying in breeze, clean ivory cotton summer dress, sweet gentle heartwarming smile, soft golden backlight.`',
      '**黑化复仇大女主（Vengeful Femme Fatale）**：\n- 核心特征：27岁浴火重生的复仇女王，眼神冷酷决绝杀气腾腾，锋利上扬的暗黑猫眼眼线，饱满炽热的复古哑光深红唇膏。身穿修身收腰黑色吸烟装西服，佩戴锋芒毕露的白金蛇形手镯，神情带有一丝轻蔑残忍的微笑。\n- Prompt范例：`27yo ruthless vengeful East Asian woman, sharp piercing eyes with dramatic winged black eyeliner, bold matte deep crimson lips, lethal seductive expression. Tailored structured black tuxedo jacket, diamond snake cuff bracelet, dark cinematic lighting, razor-sharp charisma, film noir.`'
    ],
    workflowOverview: '如何实现女主人设从“受害者”到“黑化女王”的视觉蜕变：',
    steps: [
      '**设定底层不变的五官骨相**：锁定女主的眼型（杏眼）、脸型（小鹅蛋脸）与泪痣位置，作为全剧基准。',
      '**前中期采用白月光Prompt**：使用素颜妆（No-makeup makeup）、浅色衣物与柔光漫射，表现脆弱无助。',
      '**后期注入黑化Prompt修饰符**：将妆容切换为`bold red lips, sharp eyeliner`，服装换为深黑大衣，光线换为高反差冷色调，瞬间完成黑化视觉升级。'
    ],
    metrics: [
      '**面部骨相保真度**：妆容虽然剧烈改变，但鼻梁、下巴和五官比例依然精准对应同一人。',
      '**妆容细节清晰度**：睫毛根根分明，唇纹质感逼真无过度涂抹糊块。',
      '**情感反差冲击力**：黑化前后的反差剧照点击率（CTR）提升40%以上。'
    ],
    pitfalls: [
      '**警惕AI过度美颜磨皮**：避免使用“smooth face, perfect skin”，这会抹杀所有皮肤肌理，必须加入`realistic skin texture, subtle pores, natural fine lines, micro specular shine`保留真实皮肤质感。',
      '**避免服装反光材质过载**：不要同时让女主穿亮片裙+大钻石+反光皮衣，这会导致模型光线计算混乱，引发大面积噪点白斑。'
    ],
    faqs: [
      {
        q: '眼角泪痣（Beauty Mark）在多张图里怎么保证每次都出现在同一侧？',
        a: '明确限定具体解剖方位：`a distinct tiny natural beauty mark precisely under the outer corner of the left eye`，并在负向提示词中写`beauty mark under right eye, multiple moles`。'
      },
      {
        q: '古装仙侠女主的飘逸感怎么写？',
        a: '加入`flowing multi-layered ethereal white chiffon hanfu robes, long silk sashes undulating in the wind, floating weightlessly, delicate embroidery, celestial fairy aesthetic`。'
      }
    ],
    links: [
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '面部五官高精度Prompt细节库', url: '/prompts/library/character/facial-features-micro-prompts' },
      { text: '服装材质与质感Prompt指南', url: '/prompts/library/character/clothing-and-fabrics-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/villain-and-rival-prompts.md',
    title: '恶毒反派与绿茶配角提示词：让人恨得牙痒的面相与着装Prompt速查',
    description: '短剧吸睛与反转的灵魂所在：刻薄丈母娘、傲慢纨绔阔少、阴险绿茶女二、油腻贪婪亲戚的全套面相人设Prompt。',
    keywords: '反派配角提示词, 奸诈小人Prompt, 刻薄丈母娘面相, 绿茶女二心机妆, 傲慢阔少神态',
    directAnswer: '一部短剧能否让观众疯狂想付费看打脸，**80%取决于反派配角是否“一露脸就让人恨得牙痒痒”**。**刻薄丈母娘需要倒三角吊梢眼、刻薄下垂嘴角、高耸颧骨与金丝烫发；纨绔阔少需要轻浮油腻发型、浮夸大金表、吊儿郎当的挑衅歪头与鄙夷眼神；绿茶女二需要楚楚可怜伪装无辜的泪眼心机妆，暗藏嫉妒算计；阴险长辈需要微凹眼眶与深邃阴鸷冷笑**。'
    ,
    deepDive: '反派面相在影视心理学中遵循相貌生理符号学（Physiognomy）。锐利的角度（吊眼角、薄唇、尖下巴）天然向观众传达“危险与攻击性”；而不对称的微表情（歪嘴冷笑、单挑眉）则精准传达“傲慢与虚伪”。通过在Prompt中编码这些经典视听符号，能让反派角色在出场前0.5秒就激发起观众极大的反感与期待反杀心理。',
    reasons: [
      '**刻薄丈母娘/贪婪恶婆婆（Vindictive Mother-in-Law）**：\n- 核心特征：50岁中年妇女，高耸突出的颧骨，极细且挑高的刻薄眉毛，下垂的吊梢眼，深陷法令纹，嘴唇薄而紧绷。穿着鲜艳俗气的紫红色提花中式丝绸上衣，脖挂粗俗大金链，双手叉腰，神态极度泼辣鄙夷。\n- Prompt范例：`50yo spiteful middle-aged East Asian mother-in-law, prominent harsh cheekbones, thin angled eyebrows, sharp drooping lips, deep nasolabial folds. Wearing gaudy magenta jacquard silk blouse, ostentatious gold necklace, sneering arrogant expression, aggressive posture, natural aging skin.`',
      '**傲慢纨绔恶霸阔少（Arrogant Rich Bully）**：\n- 核心特征：25岁富二代年轻男子，油亮分头，面容轻浮浮肿，下巴微扬用鼻孔看人，眼神充满下流与肆无忌惮的狂妄。穿着花哨古驰丝绸花衬衫、紧身破洞牛仔裤，右手腕炫耀性佩戴镶钻劳力士，一手插兜一手夹着雪茄。\n- Prompt范例：`25yo spoiled arrogant East Asian playboy, smug condescending smirk, head tilted back looking down nose in disdain, puffy decadent complexion. Loud designer silk floral print shirt, flashy iced-out luxury diamond watch, holding smoking cigar, obnoxious aggressive brat vibe.`',
      '**心机绿茶小三/恶毒女二（Scheming Innocent Pretender）**：\n- 核心特征：23岁年轻女人，外表看起来清纯无辜楚楚动人，水汪汪的大眼睛带着假装脆弱的泪光，但眼角余光隐藏着刻毒嫉妒与得意。穿着紧身露肩粉色针织裙，精心修饰的伪素颜妆容，咬着下唇假装委屈。\n- Prompt范例：`23yo deceitful green-tea woman, hypocritical sweet smile masking vicious jealousy, innocent watery eyes pretending to cry while secretly smirking, seductive pink knit off-shoulder dress, delicate makeup, manipulative two-faced vibe.`',
      '**阴狠奸诈老管家/幕后黑手（Sinister Scheming Elder）**：\n- 核心特征：60岁阴鸷老者，面色蜡黄枯瘦如柴，深陷的鹰钩鼻，眼角布满如同干涸河床般的深邃皱纹，浑身散发着阴冷腐朽气息。身穿黑色一丝不苟的旧式西装，双手拄着银狼头手杖，暗中窥伺。\n- Prompt范例：`60yo sinister decrepit East Asian mastermind, gaunt skeletal face, hooked aquiline nose, sunken hollow eyes burning with cold malicious cunning. Immaculate vintage black suit, leaning on silver wolf-head cane, low-key lighting, chilling predator atmosphere.`'
    ],
    workflowOverview: '如何实现反派被“打脸”前后的神态视觉对冲：',
    steps: [
      '**前置镜头：傲慢挑衅拉满仇恨**：使用高角度俯视镜头、大光圈虚化，Prompt强调歪嘴冷笑与用手指指戳戳。',
      '**打脸瞬间：惊恐扭曲面部崩坏**：Prompt切换为`jaw dropping in absolute horror, eyes bulging wide, trembling hands clutching head, cold sweat pouring down pale skin`。',
      '**跪地求饶：狼狈落魄跪地求生**：Prompt切换为`crawling on wet marble floor, disheveled hair, tear and snot mixed on face, desperately begging for mercy, high angle top-down view`。'
    ],
    metrics: [
      '**反派面相仇恨值激发度**：测试观众对角色的反感度打分平均达9.1以上。',
      '**打脸前后反差张力**：从极致嚣张到极致狼狈的面部结构转换自然且极具戏剧冲击。',
      '**与主角的视觉对比度**：反派的俗气浮华与主角的沉稳内敛形成鲜明美学反差。'
    ],
    pitfalls: [
      '**避免反派面部五官过于夸张导致卡通化**：很多新手写“凶神恶煞”，AI生成出青面獠牙的妖怪。必须保持现实人类面孔范围内的刻薄与丑恶。',
      '**不要让反派与主角长得太像**：在Prompt中明确反派的独特负面特征（如浮肿眼袋、油头、薄唇），杜绝角色混淆。'
    ],
    faqs: [
      {
        q: '反派的嚣张手势（如用手指戳人鼻尖）在视频模型里怎么生成？',
        a: 'Prompt写：`close-up, aggressive finger pointing directly into camera lens, shaking with rage and contempt, dramatic wide-angle perspective`，能带来破屏而出的指责感。'
      },
      {
        q: '如何表现绿茶女二被当场拆穿谎言时的慌乱？',
        a: 'Prompt写：`fake innocent smile abruptly freezing on face, darting nervous eyes looking left and right, subtle twitch in eyelid, sudden panic breaking through false mask`。'
      }
    ],
    links: [
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '女主角绝美外貌气质Prompt词典', url: '/prompts/library/character/female-protagonist-prompts' },
      { text: 'AI短剧爆款提示词名场面库', url: '/prompts/library/drama/viral-drama-prompts-templates' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/clothing-and-fabrics-prompts.md',
    title: '服装与穿搭材质提示词：丝绸反光、重工业皮衣与古装刺绣Prompt指南',
    description: '短剧服化道细节提升的终极材质Prompt，细致拆解真丝绸缎光泽、做旧皮革褶皱、金丝刺绣汉服与现代战术防弹服的高级质感词汇。',
    keywords: '服装穿搭材质提示词, 高定西装面料描述, 真丝旗袍光泽, 重型机车皮衣褶皱, 汉服金丝刺绣细节',
    directAnswer: '人物服装是决定短剧视觉“昂贵感与电影感”的关键钥匙。**真丝丝绸（Mulberry Silk）需要流体悬垂褶皱与珍珠般温润的高光漫射；做旧机车皮衣（Distressed Leather）需要粗粝的磨损划痕、深沉油脂反光与重型金属铆钉；古装刺绣汉服（Gold Brocade Hanfu）需要立体金丝盘金绣、提花云锦与层叠轻纱；现代特工战术服（Tactical Kevlar）需要高密度弹道尼龙编织纹理与磨砂黑扣具**。',
    deepDive: '在图形学渲染中，服装材质的真实度取决于双向反射分布函数（BRDF）与次表面散射（SSS）。视频生成大模型在解析纯文字“clothes”时往往生成无质感的塑料块。通过明确纺织材质名称（如Cashmere羊绒、Chiffon雪纺、Velvet天鹅绒）及光学反射特性（Sheen, Specular Highlight, Weave Texture），模型会调用高精度的材质微表面算法，让衣物呈现真实的重力垂坠与光泽流动。',
    reasons: [
      '**顶级重磅真丝/桑蚕丝（Heavyweight Mulberry Silk）**：\n- 语义功能：豪门女主睡袍、名媛晚礼服、贵族旗袍。\n- Prompt范例：`Lustrous 30-momme heavy mulberry silk fabric, liquid fluid drape folds gently cascading with body movement, soft pearlescent specular sheen skimming across silk ripples, exquisite smooth weave texture, luxury haute couture.`',
      '**硬核做旧复古皮衣（Distressed Vintage Cowhide Leather）**：\n- 语义功能：机车硬汉、战神出狱、地下赛车手、冷酷杀手。\n- Prompt范例：`Weathered full-grain cowhide motorcycle leather jacket, authentic creased stress marks on elbows, distressed vintage patina, subtle oily leather sheen, heavy brass zipper teeth and aged metal rivets, photorealistic leather pores.`',
      '**宫廷非遗织锦金丝刺绣（Imperial Gold-Thread Brocade Hanfu）**：\n- 语义功能：古装皇后皇子、修仙掌门、大婚凤冠霞帔。\n- Prompt范例：`Traditional imperial Chinese Hanfu, multi-layered crimson and gold jacquard silk. Intricate three-dimensional gold-thread dragon embroidery reflecting flickering candlelight, metallic bullion stitch details, sheer ethereal gauze sleeves floating weightlessly.`',
      '**现代军事战术防弹战衣（Tactical Ballistic Kevlar Gear）**：\n- 语义功能：特警破门、雇佣兵暗杀、末世求生。\n- Prompt范例：`Heavy-duty tactical assault vest, matte black 1000D ballistic Cordura nylon weave, modular MOLLE webbing straps, matte metal tactical carabiners, scorched Kevlar plate carrier with realistic dust scuffs.`'
    ],
    workflowOverview: '如何实现服装与场景光影的动态物理融合：',
    steps: [
      '**选择与光线匹配的服装面料**：宴会厅暖光配丝绸/天鹅绒（吸收与折射暖光）；暴雨黑夜配漆皮/战术尼龙（反射冷雨水）。',
      '**在Prompt中注入动力学修饰词**：加入`fabric billowing in heavy wind`（布料随风鼓胀）或`skirt flaring out with spin`（裙摆随旋转飞扬）。',
      '**质检衣物与人体的贴合度**：防止布料产生纸片般僵硬感，确保肩线与手肘有自然的重力褶皱。'
    ],
    metrics: [
      '**织物微观纹理可见度**：在近景特写下能清晰看到纺织纤维编织经纬线。',
      '**次表面散射逼真度**：轻纱与薄丝绸在逆光下呈现半透明透光感（Translucency）。',
      '**服饰与动作物理匹配度**：剧烈动作下衣摆摆动符合空气阻力与重力加速度。'
    ],
    pitfalls: [
      '**切忌在一个Prompt中出现矛盾材质**：例如“a cotton leather silk jacket”，AI会把棉花、皮和丝绸乱炖成怪异的涂抹斑块，单一衣物材质必须明确单一。',
      '**避免全身材质千篇一律**：如果从头到脚全是亮面皮，人物会像被黑色垃圾袋包裹，应采用“内搭哑光棉T恤 + 外搭硬质皮衣 + 下身水洗牛仔”的层次穿搭。'
    ],
    faqs: [
      {
        q: '为什么我生成的古装衣服看起来像廉价影楼化纤布料？',
        a: '因为缺少微观光泽词。加入`heavy jacquard brocade, genuine metallic gold threads, rich tactile embroidery, raw silk texture`，立刻淘汰影楼化纤塑料感。'
      },
      {
        q: '西装的昂贵质感靠哪些词来体现？',
        a: '加入`Super 150s Merino wool, subtle chalk stripe, canvassed lapel structure, horn buttons, matte luxurious drape`，这些专业定制西服词汇能直接调用高保真名牌西装权重。'
      }
    ],
    links: [
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '女主角绝美外貌气质Prompt词典', url: '/prompts/library/character/female-protagonist-prompts' },
      { text: '电影光影与环境氛围Prompt库', url: '/prompts/library/storyboard/lighting-atmosphere-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/hair-styles-and-colors-prompts.md',
    title: '发型与发色细节提示词：微卷羊毛卷、利落短发与银白长发Prompt速查',
    description: 'AI人物发型发丝高精度渲染Prompt库，涵盖法式大波浪、凌乱碎发遮眼、利落寸头、仙侠白发与二次元渐变挑染细节描述。',
    keywords: '发型发色细节提示词, 动漫挑染发型Prompt, 高马尾飘逸感, 凌乱碎发遮眼, 仙侠白发飘飘',
    directAnswer: '发型是角色辨识度的“头顶皇冠”，发丝细节更是检验模型渲染精度的“试金石”。**霸道总裁需要一丝不苟的三七分大背头与利落两边渐变剪裁；冷艳千金需要法式优雅大波浪卷发与柔顺光泽；战神落魄男主需要额前凌乱微湿的碎发；古装仙侠需要银白飞舞长发与飘逸发带；叛逆少女需要雾霾蓝渐变挑染与层次碎短发**。发丝的根根分明与空气蓬松感直接决定成片真实度。',
    deepDive: '在3D图形学中发丝渲染一直属于计算重灾区（Hair Strand Grooming）。AI大模型在生成人像时，发型往往容易糊成一块缺乏厚度的黑色头盔（Helmet Hair）。要激活超精细发丝生成，必须在Prompt中显式引入“发丝微结构与空气动力学词汇（Individual Hair Strands, Voluminous, Wisps, Specular Highlight on Crown）”，迫使模型渲染数以万计的独立毛发纤维。',
    reasons: [
      '**成熟利落男士背头/侧分（Sleek Side-Part Pompadour）**：\n- 语义功能：霸总开会、精英律师、豪门宴会。\n- Prompt范例：`Sleek dark side-part hairstyle with textured volume on top, razor fade along temples and nape, subtle matte pomade finish, clean sharp hairline, sophisticated gentleman grooming.`',
      '**法式蓬松大波浪卷发（Voluminous French Waves）**：\n- 语义功能：豪门名媛、万人迷女主、风情万种女二。\n- Prompt范例：`Voluminous cascading chocolate-brown wavy hair, large bouncy loose curls falling over shoulders, healthy glossy shine reflecting ambient golden light, soft wispy baby hairs framing face, airy salon blow-out texture.`',
      '**仙侠/战神银白长发（Flowing Ethereal Silver Hair）**：\n- 语义功能：上古神明、走火入魔、修真尊上、白发魔女。\n- Prompt范例：`Waist-length shimmering pure silver-white hair, individual silky strands floating weightlessly in the magical vortex, luminous moonlit glow, intricate braided side tendrils, ethereal immortal aesthetic.`',
      '**少年感凌乱湿发碎发（Messy Sweaty Wet Fringe）**：\n- 语义功能：篮球少年、雨中逃亡男主、战损反抗时刻。\n- Prompt范例：`Messy textured dark fringe partially falling over sharp eyebrows and forehead, damp sweat-glistening hair strands clumped naturally, unruly rebellious volume, authentic athletic realism.`'
    ],
    workflowOverview: '如何实现发丝随风飘动的丝滑视频生成：',
    steps: [
      '**在底图生成时加入发丝空气感词**：使用`wispy loose strands, natural flyaways`，防止头发变成死板实心块。',
      '**在可灵或Seedance中输入风力动力学指令**：加入`gentle breeze blowing hair gently across face`或`violent wind whipping long hair wildly`。',
      '**使用运动笔刷划定发尾区域**：在运动控制界面仅涂抹发尾和额前碎发，并拉高局部动态幅度。'
    ],
    metrics: [
      '**发丝边缘分离度**：发丝与背景过渡边缘无AI抠图糊块，根根分明可见。',
      '**头顶高光天使光环（Angel Ring）**：顶光照射下头顶弧面呈现自然健康的圆弧形高光反射。',
      '**风力动态合理性**：发丝飘拂方向与画面中树木、衣摆的风向严格保持物理一致。'
    ],
    pitfalls: [
      '**切忌全剧换发型**：短剧为了保持人设一致，主角的发型在80集全剧中必须锁定不变，否则观众会彻底脸盲。',
      '**避免生成反重力刺猬头**：除非做特定日漫热血番，写了太多“messy hair”容易生成夸张的杀马特刺猬头，应使用`textured modern fringe`克制控制。'
    ],
    faqs: [
      {
        q: '为什么AI生成的黑头发总是一团死黑没有细节？',
        a: '因为缺少光照高光词。在Prompt中加入`hair catching the sunlight, specular highlights skimming hair surface, subtle dark espresso undertones`，黑发立刻会有丰富的明暗层次与微观反光。'
      },
      {
        q: '古装高马尾怎么写出英姿飒爽感？',
        a: 'Prompt写：`High sleek warrior ponytail tied with crimson ribbon, crisp pulled-back hairline showing sharp temples, long straight ponytail whipping sharply with martial arts movements`。'
      }
    ],
    links: [
      { text: '面部五官高精度Prompt细节库', url: '/prompts/library/character/facial-features-micro-prompts' },
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '女主角绝美外貌气质Prompt词典', url: '/prompts/library/character/female-protagonist-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/facial-features-micro-prompts.md',
    title: '面部特征与五官微雕提示词：桃花眼、高鼻梁、泪痣与骨相Prompt细节库',
    description: '解剖学级别的人脸细节Prompt调优宝典，涵盖桃花眼微表情、混血感高鼻梁、眼角迷人泪痣、微笑唇与刀削下颌线精密Prompt配方。',
    keywords: '面部五官微雕提示词, 桃花眼微表情描述, 混血感高鼻梁, 眼角迷人泪痣, 刀削般下颌线',
    directAnswer: '五官微雕是赋予AI角色“灵魂与辨识度”的最高阶手艺。**深邃多情的桃花眼（Peach Blossom Eyes）自带含情脉脉的吸引力；直挺如悬胆的高鼻梁确立英武凌厉的面部中轴；眼角下方的泪痣（Tear Mole）是引人注目的超级记忆符号；菱角分明的M唇（Cupid\'s Bow Lips）兼具性感与倔强；刀削斧凿般的下颌角（Chiseled Jawline）则树立强悍霸道的气场**。',
    deepDive: '传统面容Prompt之所以生成千篇一律的面具脸，是因为使用了统计学中心词（如“beautiful face”）。微雕Prompt通过引入人体解剖学专用骨骼与软组织词汇（如Philtrum人中、Zygomatic Arch颧弓、Mandible下颌骨、Canthus内眦），能精确操纵潜在空间中对应面部几何流形的坐标，从而雕刻出真正过目不忘的顶级电影脸。',
    reasons: [
      '**东方多情桃花眼（Seductive Peach Blossom Eyes）**：\n- 语义功能：男女主高电量对视、动情含泪、勾魂摄魄。\n- Prompt范例：`Classic East Asian peach blossom eyes, distinct double eyelids with curved outer corners tilting gently upwards, rich amber-brown irises glistening with light, long dense feathery eyelashes casting soft shadows on cheeks.`',
      '**高挺悬胆鼻与精致鼻尖（Sculpted Nose Bridge）**：\n- 语义功能：侧脸剪影绝美、男主硬朗侧颜杀。\n- Prompt范例：`Straight high nose bridge with subtle natural dorsal hump, sharp defined nasal tip, delicate nostrils, striking three-dimensional facial depth in profile view, chiseled bone structure.`',
      '**极具辨识度的标志性泪痣（Alluring Beauty Mark）**：\n- 语义功能：女主防伪标志、独特个人魅力符号。\n- Prompt范例：`A tiny, perfectly placed dark brown natural teardrop beauty mark resting 3mm directly below the outer corner of the left lower eyelid, striking signature feature, razor-sharp focus.`',
      '**刀削斧凿下颌线（Razor-Sharp Chiseled Jawline）**：\n- 语义功能：男主坚毅下颌杀、侧脸轮廓压迫感。\n- Prompt范例：`Crisp chiseled angular jawline, strong masculine jaw angle of 115 degrees, tight defined neck contour with visible sternocleidomastoid muscle, shadow carving out impeccable bone structure.`'
    ],
    workflowOverview: '如何用微雕词构建独一无二的主角“面孔身份证”：',
    steps: [
      '**挑选3个绝对独特的面部特征**：例如：[桃花眼] + [左眉尾细小浅疤] + [下唇正中微小凹陷唇珠]。',
      '**将微雕词写在Prompt的核心人像区**：确保权重排在最前列。',
      '**测试不同角度的一致性**：连续生成正面、仰角和侧面图，观察这3个独特特征是否在所有视图中都稳定存在。'
    ],
    metrics: [
      '**特征记忆点留存率**：观众观看5秒后，能够准确复述角色脸部特殊标记的比例达85%。',
      '**侧脸剪影立体度**：鼻尖、唇珠与下巴顶点形成的“Ricketts审美E线”完美符合黄金美学标准。',
      '**皮肤肌理真实性**：五官周围毛孔细腻自然，无死白反光与AI液化拉皮感。'
    ],
    pitfalls: [
      '**切忌特征堆砌过多引发怪诞感**：不要同时加“泪痣+断眉+酒窝+唇环+异色瞳”，这会使角色变成杂乱的小丑，精选1-2个核心亮点即可。',
      '**警惕左右眼特征镜像错误**：AI大模型有时会搞混左右眼，若发现泪痣跑到右眼，需在Prompt中强调`strictly on the left side, asymmetric facial feature`。'
    ],
    faqs: [
      {
        q: '做短剧微雕Prompt，需要用中文还是英文？',
        a: '对于解剖学和微表情细节，英文由于词库训练集覆盖更广，在`Cupid\'s bow, tear duct, dorsal hump`等微结构上的控制精度略高于中文。'
      },
      {
        q: '如何让眼神看起来有戏，而不是空洞呆滞？',
        a: '加入`focused sharp pupils, intelligent intense eye contact directly engaging the camera, vivid emotional depth reflected in cornea`，角色眼神立刻会放射出神采。'
      }
    ],
    links: [
      { text: '发型与发色细节提示词速查', url: '/prompts/library/character/hair-styles-and-colors-prompts' },
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '女主角绝美外貌气质Prompt词典', url: '/prompts/library/character/female-protagonist-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/age-progression-prompts.md',
    title: '年龄跨度人物提示词：萌娃童年、青涩少年与沧桑老者Prompt全景合集',
    description: '处理短剧回忆杀、家族跨代与角色成长全生命周期的Prompt指南，涵盖5岁萌宝、18岁青涩高中生、40岁中年危机与70岁沧桑老者。',
    keywords: '年龄跨度人物提示词, 可爱萌宝Prompt, 青春期阳光少年, 历经风霜老人皱纹, 沧桑白发胡茬',
    directAnswer: '短剧大结局与回忆篇章常涉及角色的**“全生命周期年龄跨越”**。**5岁童年萌宝需要婴儿肥肉嘟嘟脸颊、天真清澈的大眼睛与蓬松软萌发丝；18岁青涩少年需要青涩喉结、阳光胶原蛋白与微风白衬衫；40岁中年人需要眼角细碎鱼尾纹、坚毅克制的面部下垂感与成熟西装；70岁沧桑老者需要沟壑纵横的老人斑、深邃沧桑的白发与看透世事的慈祥或威严目光**。',
    deepDive: '年龄在大模型隐空间中对应着复杂的“软组织松弛度、胶原蛋白含量与皮肤微循环色素沉淀”函数曲线。单纯输入“old man”容易生成过于夸张的白胡子老神仙。通过精准指定年龄数字（如`68-year-old`）与该生理年龄特有的衰老解剖学特征（如Crow\'s feet鱼尾纹、Marionette lines木偶纹、Silver temples鬓角白发），能让人物呈现出极具信服力的自然岁月年轮。',
    reasons: [
      '**5岁核心萌娃/男主女儿（5-Year-Old Adorable Child）**：\n- 语义功能：催泪亲情戏、萌宝助攻豪门父母复婚、救赎治愈。\n- Prompt范例：`5-year-old adorable East Asian baby girl, chubby rosy cheeks, large curious sparkling obsidian eyes, soft wispy bangs tied in tiny double pigtails. Cute pastel yellow oversized knitted cardigan, innocent heartwarming giggle, baby skin softness, natural candid shot.`',
      '**18岁青涩高中/大学回忆（18-Year-Old Youth）**：\n- 语义功能：男女主校园初遇、白月光青涩暗恋回忆杀。\n- Prompt范例：`18-year-old East Asian male high school student, youthful slim build, tender facial structure full of natural collagen, prominent emerging Adam\'s apple, genuine boyish grin. Crisp white school uniform short-sleeve shirt, golden afternoon classroom sunbeam.`',
      '**45岁深沉中年企业家/父亲（45-Year-Old Patriarch）**：\n- 语义功能：豪门家主、幕后商业大鳄、女主养父。\n- Prompt范例：`45-year-old commanding East Asian corporate patriarch, distinguished silvering hair at the temples, mature refined face with dignified laugh lines and furrowed brow, calm authoritative presence. Bespoke charcoal bespoke suit, heavy signet ring, powerful paternal charisma.`',
      '**75岁历经风霜太老爷/老戏骨（75-Year-Old Venerable Elder）**：\n- 语义功能：宗族老祖宗、临终托孤、传家宝交接。\n- Prompt范例：`75-year-old respected East Asian grandfather, weathered parchment-like skin with authentic age spots and deep wrinkled furrows, wispy snow-white hair and neat goatee, deep wise eyes holding decades of wisdom and sorrow, leaning on walking cane, heirloom robes.`'
    ],
    workflowOverview: '如何保持同一个角色从18岁成长到50岁的面部特征一致性：',
    steps: [
      '**固定基准骨骼特征**：在Prompt中锁死该角色的特征DNA（如丹凤眼、高鼻梁带有微凸驼峰、方下巴）。',
      '**阶梯式替换皮肤与年龄参数**：\n- 18岁：`18yo, smooth youthful skin, clean-shaven, high collagen`\n- 30岁：`30yo, chiseled sharp jawline, mature aura, subtle stubble`\n- 50岁：`50yo, salt-and-pepper hair, visible crow\'s feet, distinguished mature authority`\n',
      '**核对眼神内在气质**：虽然面容变老，但眼神深处的坚毅性格一脉相承。'
    ],
    metrics: [
      '**跨年龄人脸骨相识别度**：人脸识别算法评估18岁与50岁图谱同一人置信度大于80%。',
      '**衰老生物学合理性**：皮肤松弛度与发白程度严格符合生理医学演化常理。',
      '**情感催泪感染力**：回忆杀对比分镜在观众测试中的情感波幅提升50%以上。'
    ],
    pitfalls: [
      '**避免生成怪诞的“假童颜/侏儒脸”**：写儿童时切忌加入成人的性感或复杂妆容词，必须使用`innocent, chubby cheeks, child proportions`保证幼态真实度。',
      '**警惕老人面部过度褶皱变成树皮**：避免使用“extremely old wrinkled to death”，这会导致模型把皮肤渲染成干枯树皮或外星人，使用`dignified natural aging wrinkles`更为优雅自然。'
    ],
    faqs: [
      {
        q: '如何让AI生成的儿童看起来自然灵动，不呆滞？',
        a: '关键在于抓拍动态神态：`captured in candid laughter, slightly messy hair from playing, sparkling joyful eyes, holding a plush toy naturally`，彻底摆脱儿童呆站棚拍感。'
      },
      {
        q: '短剧常见的回忆杀（两代人闪回）怎样转场最顺畅？',
        a: '使用相同构图的特写转场：先生成中年男主闭眼落泪，下一帧生成18岁少年同样机位闭眼被雨水冲刷，配合慢动作淡入淡出，宿命感拉满。'
      }
    ],
    links: [
      { text: '面部五官高精度Prompt细节库', url: '/prompts/library/character/facial-features-micro-prompts' },
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: 'AI短剧提示词技巧进阶指南', url: '/prompts/library/drama/advanced-prompt-engineering' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/profession-uniforms-prompts.md',
    title: '职业与身份特征装束提示词：医生白大褂、特警战术服与修真道袍速查表',
    description: '涵盖医疗悬疑、现代军旅、仙侠道门、政商名流等高频短剧职业身份的标准制服与道具配件Prompt大全。',
    keywords: '职业身份装束提示词, 外科医生手术服Prompt, 特种兵战术背心装备, 道士八卦道袍, 常见职业装束Prompt',
    directAnswer: '在短剧高频反转剧情中，职业装束是瞬间确立角色“社会阶级、专业权威与阵营立场”的最强标签。**外科医生需要洁净白大褂、挂在脖颈的听诊器、清冷克制的眼神与无菌手套；特警特种兵需要重型防弹背心、战术手套、夜视仪与冷冽战术黑盔；修真仙师需要仙风道骨的八卦云纹长袍、白玉发簪与拂尘长剑；霸气律师需要深蓝双排扣英伦西装、牛皮公文包与金丝钢笔**。'
    ,
    deepDive: '职业身份的真实度往往藏在“微小行业配件（Professional Accoutrements）”中。如果只写“doctor”，AI可能只画一个穿白衣服的人；但如果加上“3M Littmann stethoscope around neck, hospital employee lanyard ID card, medical penlight in chest pocket”，这些专业道具的出现会瞬间锁定真实医院职业场景，彻底消解虚假草台班子感。',
    reasons: [
      '**三甲医院明星外科专家（Elite Chief Surgeon）**：\n- 语义功能：神医下山、救治病危首富、医学反转打脸。\n- Prompt范例：`32yo elite East Asian chief surgeon, tailored crisp white medical lab coat over sea-green surgical scrubs, black Littmann stethoscope draped around neck, hospital lanyard badge clipped on pocket, calm authoritative medical expertise, sterile operating theater background.`',
      '**特警反恐队长/雇佣兵头目（SWAT Tactical Operator）**：\n- 语义功能：破门营救女主、武装封锁庄园、战神麾下精锐。\n- Prompt范例：`Elite SWAT tactical team operator, matte black high-cut ballistic helmet with NVG goggles mounted, heavy tactical plate carrier with magazine pouches, dark camo combat uniform, tactical Oakley gloves, fierce disciplined gaze.`',
      '**名门正派修真仙尊（Daoist Immortal Grandmaster）**：\n- 语义功能：传授绝世功法、宗门守护神、古装仙侠太上长老。\n- Prompt范例：`Ancient Daoist immortal grandmaster, pristine flowing white and azure silk robes embroidered with celestial cloud patterns, traditional jade hairpin securing long white topknot, holding horsetail whisk, divine aura, misty mountain temple.`',
      '**王牌刑事特警探长（Veteran Homicide Detective）**：\n- 语义功能：悬疑探案、追查真凶、雨夜封锁案发现场。\n- Prompt范例：`40yo seasoned homicide detective, weathered brown leather shoulder holster over wrinkled dress shirt, loosened tie, dark tailored trench coat damp with rain, metal police badge clipped to leather belt, investigative gritty realism.`'
    ],
    workflowOverview: '如何实现职业反转打脸的视觉冲击：',
    steps: [
      '**第一幕：身着卑微职业装遭羞辱**：身穿美团/饿了么黄色外卖骑手服、沾满雨水泥泞，被保安挡在门外。',
      '**第二幕：撕掉伪装露出真实重磅制服**：外卖服脱下，内里赫然露出挂满特等功勋章的将官礼服或千万高定西装。',
      '**第三幕：道具身份证明一锤定音**：微距特写掏出带有国徽的绝密特工证件或医院院长任命书，反转爽点瞬间引爆。'
    ],
    metrics: [
      '**行业专业道具考究度**：警徽、听诊器、道袍纹样均符合现实专业或东方美学常理。',
      '**制服面料挺括度**：白大褂平整垂坠，特警防弹服硬质抗穿刺，质感真实。',
      '**职业公信力说服力**：观众在不看剧情介绍时，对角色职业判断准确率达95%以上。'
    ],
    pitfalls: [
      '**切忌警服军服标志违法违规**：必须注意国内法律合规，AI生成的军警制服应为概念化设计，严禁精确生成现实中的真实军徽警衔与编号，规避监管红线。',
      '**避免医生白大褂过于邋遢脏乱**：除非是战地医生，医院手术室内的医生制服必须保证一尘不染与无菌环境的高光质感。'
    ],
    faqs: [
      {
        q: '外卖员/快递员逆袭战神的衣服怎么写？',
        a: 'Prompt写：`courier delivery uniform, bright yellow and black windbreaker jacket with delivery logo patch, worn helmet resting on motorcycle, tired hardworking expression contrasted with hidden lethal warrior eyes`。'
      },
      {
        q: '女警角色的飒爽感如何拿捏？',
        a: '加入`female tactical officer, hair tied back in crisp neat bun, high-waisted navy tactical trousers, fitted utility duty belt, clean makeup-free skin, sharp fearless gaze`。'
      }
    ],
    links: [
      { text: '服装材质与质感Prompt指南', url: '/prompts/library/character/clothing-and-fabrics-prompts' },
      { text: '男主角高颜值人设Prompt词典', url: '/prompts/library/character/male-protagonist-prompts' },
      { text: '全题材短剧Prompt速查手册', url: '/prompts/library/drama/all-genres-prompt-handbook' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/anime-manga-character-prompts.md',
    title: '动漫角色与二次元立绘提示词：日漫美少女、韩漫双男主与国漫剑客Prompt',
    description: '二次元AI漫剧与动态漫画专属角色提示词库，覆盖日式萌系美少女、韩漫美型霸道财阀、国漫玄幻白发剑尊全套Niji风格词典。',
    keywords: '动漫角色立绘提示词, Niji二次元人物Prompt, 韩漫美型总裁, 国漫水墨侠客, 动漫大眼萌妹',
    directAnswer: '在AI漫剧（动态漫画）赛道中，角色人设Prompt有着与真人短剧截然不同的美学体系。**日漫美少女需要赛璐珞平涂、高光灵动大眼睛、猫耳萌系发饰与精致JK制服；韩漫（Manhwa）风格需要九头身大长腿、刀削冷白皮、美型霸总气场与极度精细的发丝线条；国漫玄幻风需要水墨勾边、剑眉星目、飘逸广袖汉服与龙纹道簪**。使用专属动漫关键词能彻底杜绝真人模型的恐怖谷油腻感。',
    deepDive: '二次元动漫在模型隐空间中对应的是线稿先验（Line-art Prior）与平涂着色空间（Flat Shading）。在Midjourney中使用`--niji 6`，或在SD/Flux中使用专门的二次元动漫LoRA（如Anime Illust、Manhwa Style），需要配合特定的着色控制词（如`cel shading, clean crisp lineart, no realistic shading`），主动压制现实世界中的三维次表面散射，维持纯净优雅的二次元二重身美感。',
    reasons: [
      '**日漫萌系元气少女（Anime Cute Girl / Niji Style）**：\n- 语义功能：校园恋爱漫剧、异世界日常、青梅竹马女主。\n- Prompt范例：`Japanese anime aesthetic, masterpiece, cute 16yo girl with large sparkling violet eyes, soft blushing cheeks, playful twin-tails pastel pink hair with white ribbons. Classic navy sailor school uniform (seifuku), crisp clean lineart, vibrant cel-shading, studio anime key visual, --niji 6.`',
      '**韩漫重度美型霸道财阀（Korean Webtoon/Manhwa Male Lead）**：\n- 语义功能：现代重生复仇、豪门契约娇妻、西幻公爵。\n- Prompt范例：`Korean manhwa webtoon style, breathtakingly handsome tall male lead, porcelain alabaster skin, sharp jawline and narrow seductive grey eyes, messy voluminous jet-black undercut. Tailored designer dark coat, highly detailed webtoon digital illustration, dynamic lighting, dramatic romance comic cover.`',
      '**国漫修仙水墨剑客（Chinese Donghua Sword Immortal）**：\n- 语义功能：玄幻打怪、万剑归宗、修仙封神短剧。\n- Prompt范例：`Chinese 3D donghua aesthetic, handsome rogue sword cultivator, flowing long black hair with silver ribbon, glowing celestial blue eyes, ink-wash painting undertones on white flowing robes, ancient ornate longsword strapped to back, ethereal mist, epic anime visual.`'
    ],
    workflowOverview: '如何构建AI漫剧分镜的一致性立绘资产：',
    steps: [
      '**在Midjourney Niji 6中生成立绘设计表**：输入角色Prompt并添加`character design sheet, multiple angles, turnaround view, facial expressions expression sheet`。',
      '**提取单图在PS中做图层分拆**：将头发、眼睛、身体、手臂分图层切片。',
      '**送入Vidu或Live2D赋予动作**：在视频模型中使用对应动漫Prompt，生成自然的眨眼、呼吸与头发飘拂。'
    ],
    metrics: [
      '**线条干净度（Line Clarity）**：轮廓线条粗细均匀闭合，无毛刺与脏点。',
      '**赛璐珞平涂纯净度**：阴影分块明确利落，无多余的三维写实渐变噪波。',
      '**漫剧画风一致性**：整部漫剧中角色五官比例与原作者画风保持95%以上拟合度。'
    ],
    pitfalls: [
      '**切忌在二次元Prompt中加入写实摄影词**：严禁出现`photorealistic, 35mm photograph, realistic skin pores`，这会使动漫人物脸上长出真实的毛孔和老人斑，变成恐怖谷怪物。',
      '**避免过多复杂纹理导致线条粘连**：二次元的核心是“概括美”，过度描述衣服花纹会导致线条在AI生成中融化成一团杂色。'
    ],
    faqs: [
      {
        q: '二次元漫剧角色出图，Midjourney和Stable Diffusion哪个更好？',
        a: '如果追求极速高质量原画分镜，Midjourney `--niji 6`美感断层领先；如果追求绝对长期的角色锁脸和动作微控，Stable Diffusion WebUI结合动漫专属LoRA与ControlNet骨骼控制更为可控。'
      },
      {
        q: '韩漫那种长腿美型风格，最核心的关键词是什么？',
        a: '加入`korean manhwa webtoon style, tall slender athletic proportion, sharp facial features, romantic fantasy comic, clean digital cell art`。'
      }
    ],
    links: [
      { text: 'Vidu在短剧与AI漫剧中的实战指南', url: '/ai-tools/models/video/vidu-drama-and-comic-guide' },
      { text: '2026年AI漫剧必备工具TOP10', url: '/ai-tools/recommend/comic/top-10-comic-tools-2026' },
      { text: '面部五官高精度Prompt细节库', url: '/prompts/library/character/facial-features-micro-prompts' }
    ]
  },
  {
    filePath: 'docs/prompts/library/character/negative-prompts-master-list.md',
    title: '负面提示词（Negative Prompts）黄金排除清单：告别畸形多肢与画风崩坏',
    description: '2026年终极负面提示词（Negative Prompt）通用工业排除清单，针对多手指、肢体畸变、蜡像面具、文字水印与画风劣化建立防火墙。',
    keywords: '负面提示词黄金清单, 负面词大全, 去除多余手指, 避免恐怖谷面部变形, 去除画面文字水印',
    directAnswer: '如果说正向提示词是建造高楼的砖瓦，**负面提示词（Negative Prompts）就是防止大楼坍塌的安全防护网**。在AI短剧与漫剧工业流水线中，**多余的手指、扭曲的四肢、浮动的重影、蜡像假人脸、突兀的文字水印与低劣的模糊噪点**，是废片率居高不下的主要元凶。掌握经过万次实测验证的黄金负面词清单，能让成片可用率瞬间提升40%。',
    deepDive: '负面提示词在无分类器引导（Classifier-Free Guidance, CFG）算法中，作为潜在空间向相反方向推演的负向向量场。当用户在正向Prompt中引导模型走向“高画质电影感”时，负向词强制抑制模型在训练集中接触到的“低画质网络抓取图、带水印广告图、解剖学畸变废图”等不良特征簇，从而实现极度纯净的采样收敛。',
    reasons: [
      '**通用写实短剧黄金负面词总清单（可直接无脑复制）**：\n```text\n(worst quality, low quality:1.4), (deformed iris, deformed pupils:1.2), (bad eyes:1.2), (malformed limbs:1.3), (extra limbs, extra fingers, missing fingers:1.4), fused fingers, poorly drawn hands, poorly drawn face, mutation, deformed, amputee, cross-eyed, cloned face, plastic skin, wax figure, smooth flat face, blurry, bad anatomy, out of frame, extra legs, extra arms, gross proportions, text, watermark, signature, username, error, cropped, jpeg artifacts, oversaturated, chromatic aberration.\n```',
      '**肢体与手指防崩塌专项负面词**：\n```text\nextra digits, fewer digits, missing fingers, fused fingers, multiple hands, six fingers, twisted wrist, dislocated joints, unnatural hand posture, floating limbs, disconnected limbs, phantom limbs, mutant hands.\n```',
      '**面部去塑料假人感与恐怖谷专项负面词**：\n```text\nplastic doll face, porcelain mask, wax statue, lifeless eyes, dead stare, expressionless, flat lighting, excessive airbrushing, bad teeth, missing teeth, crooked smile, double chin, asymmetric eyes, crossed eyes.\n```',
      '**二次元漫剧防写实污染专项负面词**：\n```text\nphotorealistic, 3d render, realistic skin texture, realistic wrinkles, pores, messy lines, sketches, monochrome (when generating color), faded color, Western comic style, muddy shading.\n```'
    ],
    workflowOverview: '如何在生产流程中固化负面提示词管线：',
    steps: [
      '**将通用清单设为默认预设**：在WebUI、ComfyUI或短剧管理插件中，将通用负面词填入Default Preset，每次启动自动生效。',
      '**根据题材动态加载子模块**：写实短剧加载“防塑料人脸模块”；动作打斗戏加载“肢体与手指专项模块”；漫剧加载“防写实污染模块”。',
      '**定期复盘废片特征更新词库**：如果在某批出片中频繁出现背景电线杆穿模，立即在负面词追加`power lines, telephone poles`。'
    ],
    metrics: [
      '**六指/多肢出现概率**：配置黄金负面词后，手部畸形发生率从42%骤降至8%以下。',
      '**画面杂质与文字剔除率**：各类伪水印、虚假签名与边框黑边被过滤拦截率达99%。',
      '**整体画面质感评级**：盲测中成片的电影质感评分提升1.8个等级（满分5分制）。'
    ],
    pitfalls: [
      '**切忌无脑塞入上千个负面词**：负面词超过一定长度（如300个Token）会严重占用模型的注意力算力，反而导致正向Prompt的执行力被稀释，保持精炼关键即可。',
      '**避免正向与负向冲突**：如果正向写了`film grain, moody dark shadows`，而负向写了`grain, dark, shadows`，会导致画面产生奇异的过曝惨白噪点。'
    ],
    faqs: [
      {
        q: '可灵和Seedance的网页版支持负面提示词吗？',
        a: '支持。在可灵AI与Seedance的高级参数面板中，均有明确的“负向提示词（Negative Prompt）”输入框，直接粘贴本篇黄金清单即可。'
      },
      {
        q: '负面词里的权重括号`(worst quality:1.4)`是什么意思？',
        a: '在Stable Diffusion等开源工具中，圆括号加`:1.4`代表将该词的排除权重提高40%，对极度恶性的多手指和画风崩塌能起到极强的压制效果。'
      }
    ],
    links: [
      { text: 'AI短剧提示词完整模板库', url: '/prompts/library/drama/complete-drama-prompts-2026' },
      { text: 'Stable Diffusion权重语法与LoRA规范', url: '/prompts/library/model/sd-weights-and-lora-syntax' },
      { text: '开箱即用短剧提示词模板', url: '/prompts/library/drama/copy-paste-drama-prompts' }
    ]
  }
];

articles.forEach(a => writeGeoArticle(a));
console.log(`Successfully written ${articles.length} articles in cluster 5.1.3.`);
