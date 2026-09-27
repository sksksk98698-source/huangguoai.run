import { defineConfig, type HeadConfig } from 'vitepress'
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind'

const SITE_HOSTNAME = 'https://huangguoai.run'

const sectionNameMap: Record<string, string> = {
  'huangguo': '黄果短剧专区',
  'ai-drama': 'AI短剧工业管线',
  'ai-comic': 'AI漫剧制作专区',
  'ai-tools': 'AI工具库与大模型',
  'prompts': '电影级提示词库',
  'monetize': '商业变现与运营',
  'about': '关于本站',
  'intro': '品牌与概览',
  'official': '官网与入口',
  'tutorial': '实战教程',
  'beginner': '新手入门',
  'features': '特色功能',
  'compare': '竞品横评',
  'vs': '深度对比',
  'workflow': '工业制作管线',
  'script': '剧本分镜',
  'character': '角色一致性',
  'storyboard': '分镜运镜',
  'video': '视频生成',
  'audio-post': '后期音效',
  'genre': '爆款题材',
  'models': '模型评测',
  'recommend': '工具推荐',
  'free': '免费工具',
  'image': '生图大模型',
  'library': '提示词分类库',
  'drama': '剧本题材提示词',
  'model': '跨模型提示词语法',
  'income': '收益变现',
  'operations': '运营出海',
  'global': '短剧全球化',
  'account': '账号运营',
  'methods': '变现路径',
  'business': '商业模式',
  'novel-to-comic': '小说改漫剧',
  'production': '制作工作流',
  'adapt': '剧本改编',
  'comic-video': '动态漫剪辑',
}

function getCanonicalUrl(relativePath: string): string {
  if (relativePath === 'index.md') {
    return `${SITE_HOSTNAME}/`
  }
  let path = relativePath.replace(/\.md$/, '')
  if (path.endsWith('/index')) {
    path = path.replace(/\/index$/, '/')
  }
  return `${SITE_HOSTNAME}/${path}`
}

function buildBreadcrumbSchema(relativePath: string, canonicalUrl: string, pageTitle: string) {
  const parts = relativePath.replace(/\.md$/, '').split('/')
  const items: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: `${SITE_HOSTNAME}/`
    }
  ]

  let accumulatedPath = ''
  let currentPos = 2

  for (let i = 0; i < parts.length - 1; i++) {
    const segment = parts[i]
    if (!segment) continue
    accumulatedPath += (accumulatedPath ? '/' : '') + segment
    const segmentName = sectionNameMap[segment] || segment
    items.push({
      '@type': 'ListItem',
      position: currentPos++,
      name: segmentName,
      item: `${SITE_HOSTNAME}/${accumulatedPath}/`
    })
  }

  items.push({
    '@type': 'ListItem',
    position: currentPos,
    name: pageTitle,
    item: canonicalUrl
  })

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: '黄果短剧AI',
  description: '黄果短剧AI官方指南与实操全书 - 专注AI短剧、AI漫剧制作全流程与商业变现',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/brand-logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/brand-logo.svg' }],
    ['meta', { name: 'author', content: '黄果短剧AI团队' }],
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    // 搜索引擎站长平台所有权验证（预留安全槽位，上线后填入正式Token即可直接生效并输出在HTML源码中）
    // ['meta', { name: 'google-site-verification', content: 'YOUR_GOOGLE_VERIFICATION_TOKEN' }],
    // ['meta', { name: 'msvalidate.01', content: 'YOUR_BING_VERIFICATION_TOKEN' }],
    // ['meta', { name: 'shenma-site-verification', content: 'YOUR_SHENMA_VERIFICATION_TOKEN' }],
    // ['meta', { name: 'baidu-site-verification', content: 'YOUR_BAIDU_VERIFICATION_TOKEN' }],
  ],
  sitemap: {
    hostname: SITE_HOSTNAME,
    lastmodDateOnly: false,
    transformItems: (items) => {
      return items.filter(item => !item.url.includes('404') && !item.url.includes('draft'))
    }
  },
  transformHead: async ({ pageData }) => {
    const head: HeadConfig[] = []
    const canonicalUrl = getCanonicalUrl(pageData.relativePath)
    const isHome = pageData.relativePath === 'index.md'
    const is404 = pageData.relativePath === '404.md'
    const isCategory = pageData.relativePath.endsWith('index.md') && !isHome

    const pageTitle = isHome
      ? '黄果短剧AI - 2026最新AI短剧与动态漫剧制作变现指南'
      : (pageData.title ? `${pageData.title} | 黄果短剧AI` : '黄果短剧AI - 新一代AI短剧与动态漫剧实战指南')

    const pageDesc = pageData.description || pageData.frontmatter.description || '黄果短剧AI官方指南与实操全书 - 专注AI短剧、AI漫剧制作全流程与商业变现'

    // 1. 唯一规范链接 Canonical URL (自引用、全站 HTTPS、正式主域)
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])

    // 2. 爬虫抓取控制 Robots Meta (404页面严格 noindex, nofollow)
    if (is404 || pageData.frontmatter.robots) {
      head.push(['meta', { name: 'robots', content: pageData.frontmatter.robots || 'noindex, nofollow' }])
    } else {
      head.push(['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }])
    }

    // 3. Open Graph 社交元数据
    head.push(['meta', { property: 'og:site_name', content: '黄果短剧AI' }])
    head.push(['meta', { property: 'og:type', content: (!isHome && !isCategory && !is404) ? 'article' : 'website' }])
    head.push(['meta', { property: 'og:title', content: pageTitle }])
    head.push(['meta', { property: 'og:description', content: pageDesc }])
    head.push(['meta', { property: 'og:url', content: canonicalUrl }])
    head.push(['meta', { property: 'og:image', content: `${SITE_HOSTNAME}/brand-logo.svg` }])
    head.push(['meta', { property: 'og:locale', content: 'zh_CN' }])

    // 4. Twitter Card 元数据
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: pageTitle }])
    head.push(['meta', { name: 'twitter:description', content: pageDesc }])
    head.push(['meta', { name: 'twitter:image', content: `${SITE_HOSTNAME}/brand-logo.svg` }])

    // 5. 文章专属元数据 (Article Meta)
    const datePublished = pageData.frontmatter.datePublished || '2026-09-26T00:00:00.000Z'
    const dateModified = pageData.frontmatter.lastUpdated 
      ? new Date(pageData.frontmatter.lastUpdated).toISOString() 
      : '2026-09-27T00:00:00.000Z'

    if (!isHome && !isCategory && !is404) {
      head.push(['meta', { property: 'article:published_time', content: datePublished }])
      head.push(['meta', { property: 'article:modified_time', content: dateModified }])
      head.push(['meta', { property: 'article:author', content: '黄果短剧AI团队' }])
    }

    // 6. 结构化数据 Schema.org (JSON-LD)
    if (isHome) {
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_HOSTNAME}/#website`,
            url: `${SITE_HOSTNAME}/`,
            name: '黄果短剧AI',
            description: pageDesc,
            inLanguage: 'zh-CN',
            publisher: {
              '@type': 'Organization',
              '@id': `${SITE_HOSTNAME}/#organization`,
              name: '黄果短剧AI团队',
              url: `${SITE_HOSTNAME}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_HOSTNAME}/brand-logo.svg`
              }
            }
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_HOSTNAME}/#organization`,
            name: '黄果短剧AI',
            url: `${SITE_HOSTNAME}/`,
            logo: `${SITE_HOSTNAME}/brand-logo.svg`
          }
        ]
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(homeSchema)])
    } else if (isCategory) {
      const categorySchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': canonicalUrl,
            url: canonicalUrl,
            name: pageTitle,
            description: pageDesc,
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${SITE_HOSTNAME}/#website`
            },
            inLanguage: 'zh-CN'
          },
          buildBreadcrumbSchema(pageData.relativePath, canonicalUrl, pageData.title || '专区')
        ]
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(categorySchema)])
    } else if (!is404) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${canonicalUrl}#article`,
            isPartOf: {
              '@type': 'WebPage',
              '@id': canonicalUrl
            },
            headline: pageData.title || pageTitle,
            description: pageDesc,
            url: canonicalUrl,
            inLanguage: 'zh-CN',
            mainEntityOfPage: canonicalUrl,
            datePublished: datePublished,
            dateModified: dateModified,
            author: {
              '@type': 'Organization',
              name: '黄果短剧AI团队',
              url: `${SITE_HOSTNAME}/`
            },
            publisher: {
              '@type': 'Organization',
              name: '黄果短剧AI',
              url: `${SITE_HOSTNAME}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_HOSTNAME}/brand-logo.svg`
              }
            },
            image: `${SITE_HOSTNAME}/brand-logo.svg`
          },
          buildBreadcrumbSchema(pageData.relativePath, canonicalUrl, pageData.title || '文章')
        ]
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(articleSchema)])
    }

    return head
  },
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: '搜索',
        placeholder: '搜索AI短剧、AI漫剧、提示词、变现...',
        emptyText: '未找到相关内容',
        heading: '共 {{searchResult}} 条结果',
        forceLanguage: 'zh-cn',
        excludeSelector: ['img', 'a.header-anchor'],
      }),
    ],
  },
  themeConfig: {
    logo: '/brand-logo.svg',
    siteTitle: '黄果短剧AI',
    nav: [
      { text: '黄果短剧', link: '/huangguo/' },
      { text: 'AI短剧', link: '/ai-drama/' },
      { text: 'AI漫剧', link: '/ai-comic/' },
      { text: 'AI工具', link: '/ai-tools/' },
      { text: '提示词', link: '/prompts/' },
      { text: '变现运营', link: '/monetize/' },
      { text: '关于本站', link: '/about' }
    ],
    sidebar: {
      '/huangguo/': [
        {
          text: '品牌入门',
          collapsed: false,
          items: [
            {
              text: '1.1.1 认识黄果短剧',
              link: '/huangguo/intro/about/',
              collapsed: true,
              items: [
                { text: '黄果短剧是什么？', link: '/huangguo/intro/about/what-is-huangguo' },
                { text: '黄果AI短剧平台完整评测', link: '/huangguo/intro/about/platform-review' },
                { text: '黄果短剧AI深度解析', link: '/huangguo/intro/about/ai-creation-analysis' },
                { text: '黄果AI漫剧制作指南', link: '/huangguo/intro/about/what-is-ai-comic' },
                { text: '黄果短剧人工智能新选择', link: '/huangguo/intro/about/ai-capabilities' },
                { text: '黄果AI视频生成工作流', link: '/huangguo/intro/about/text-to-video-workflow' },
                { text: '零基础也能做短剧吗？', link: '/huangguo/intro/about/zero-basis-guide' },
                { text: '黄果AI创作工具解析', link: '/huangguo/intro/about/top-creation-tools' },
                { text: '黄果短剧生成器怎么用？', link: '/huangguo/intro/about/generator-guide' },
                { text: '功能、价格与体验全解', link: '/huangguo/intro/about/features-pricing-experience' }
              ]
            },
            {
              text: '1.1.2 官网与入口',
              link: '/huangguo/intro/official/',
              collapsed: true,
              items: [
                { text: '官网最新入口与访问方法', link: '/huangguo/intro/official/official-entry' },
                { text: '网页版、手机版与客户端', link: '/huangguo/intro/official/website-and-downloads' },
                { text: '官网打不开最新解决方案', link: '/huangguo/intro/official/access-issues-solution' },
                { text: '官网新手注册教程', link: '/huangguo/intro/official/registration-tutorial' },
                { text: '安卓、iPhone与电脑版下载', link: '/huangguo/intro/official/multi-platform-download' },
                { text: '黄果AI网页版怎么用？', link: '/huangguo/intro/official/web-version-usage' },
                { text: '黄果短剧APP安装教程', link: '/huangguo/intro/official/app-download-guide' },
                { text: 'Windows与Mac客户端指南', link: '/huangguo/intro/official/client-installation' },
                { text: '黄果短剧网页在线版', link: '/huangguo/intro/official/online-creator' },
                { text: '官网入口核验与防钓鱼', link: '/huangguo/intro/official/where-is-entry' }
              ]
            }
          ]
        },
        {
          text: '使用教程',
          collapsed: false,
          items: [
            {
              text: '1.2.1 新手入门',
              link: '/huangguo/tutorial/beginner/',
              collapsed: true,
              items: [
                { text: '5分钟快速上手第一部短剧', link: '/huangguo/tutorial/beginner/quick-start-5min' },
                { text: '界面功能分布全景图', link: '/huangguo/tutorial/beginner/ui-overview' },
                { text: '新建工程与分辨率设置', link: '/huangguo/tutorial/beginner/project-settings' },
                { text: '图片音频素材导入规范', link: '/huangguo/tutorial/beginner/assets-import' },
                { text: '文本一键成片实测教程', link: '/huangguo/tutorial/beginner/text-to-video-test' },
                { text: '热门短剧题材模板推荐', link: '/huangguo/tutorial/beginner/hot-templates' },
                { text: '导出设置与无水印保存', link: '/huangguo/tutorial/beginner/export-settings' },
                { text: '全键盘快捷键提效大全', link: '/huangguo/tutorial/beginner/shortcuts-guide' },
                { text: '常见十大报错排查指南', link: '/huangguo/tutorial/beginner/common-errors' },
                { text: '短剧作品完播率自检清单', link: '/huangguo/tutorial/beginner/checklist-completion-rate' }
              ]
            },
            {
              text: '1.2.2 功能详解',
              link: '/huangguo/tutorial/features/',
              collapsed: true,
              items: [
                { text: '运镜控制推拉摇移深度教程', link: '/huangguo/tutorial/features/camera-movement' },
                { text: '参考图垫图精准控图技巧', link: '/huangguo/tutorial/features/reference-image' },
                { text: '百字剧本自动切智能分镜', link: '/huangguo/tutorial/features/smart-storyboard' },
                { text: 'AI配音与情绪控制技巧', link: '/huangguo/tutorial/features/ai-voiceover' },
                { text: '智能对口型LipSync实测', link: '/huangguo/tutorial/features/lipsync-guide' },
                { text: '面部微表情增强与AI换脸', link: '/huangguo/tutorial/features/face-swap-expression' },
                { text: '一键扩图与4K画质超分', link: '/huangguo/tutorial/features/outpainting-upscaling' },
                { text: '爆款特效与转场剪辑手法', link: '/huangguo/tutorial/features/transitions-effects' },
                { text: '竖屏字幕与动态花字排版', link: '/huangguo/tutorial/features/subtitles-typography' },
                { text: '批量导出与多分辨率适配', link: '/huangguo/tutorial/features/batch-export' }
              ]
            }
          ]
        },
        {
          text: '品牌对比',
          collapsed: false,
          items: [
            {
              text: '1.3.1 黄果 vs 竞品',
              link: '/huangguo/compare/vs/',
              collapsed: true,
              items: [
                { text: '黄果短剧 vs 可灵AI横评', link: '/huangguo/compare/vs/huangguo-vs-kling' },
                { text: '黄果短剧 vs 即梦AI评测', link: '/huangguo/compare/vs/huangguo-vs-jimeng' },
                { text: '黄果短剧 vs 剪映AI对比', link: '/huangguo/compare/vs/huangguo-vs-jianying' },
                { text: '黄果短剧 vs 海螺AI实测', link: '/huangguo/compare/vs/huangguo-vs-hailuo' },
                { text: '黄果短剧 vs Sora先锋对比', link: '/huangguo/compare/vs/huangguo-vs-sora' },
                { text: '黄果短剧 vs Runway Gen-3', link: '/huangguo/compare/vs/huangguo-vs-runway' },
                { text: '黄果短剧 vs Vidu极速实测', link: '/huangguo/compare/vs/huangguo-vs-vidu' },
                { text: '5大主流平台综合天梯榜', link: '/huangguo/compare/vs/tier-list-2026' },
                { text: '单分钟制作算力成本对比', link: '/huangguo/compare/vs/cost-comparison' },
                { text: '创作者短剧工具选型指南', link: '/huangguo/compare/vs/selection-guide' }
              ]
            }
          ]
        }
      ],
      '/ai-drama/': [
        {
          text: '制作全流程',
          collapsed: false,
          items: [
            {
              text: '2.1.1 剧本创作',
              link: '/ai-drama/workflow/script/',
              collapsed: true,
              items: [
                {
                  text: '80集连载短剧大纲拆解术：AI辅助长篇...',
                  link: '/ai-drama/workflow/script/80-episodes-outline'
                },
                {
                  text: '如何用ChatGPT写出爽点密集的短剧...',
                  link: '/ai-drama/workflow/script/chatgpt-drama-script'
                },
                {
                  text: 'AI短剧剧本创作全指南：从一句话灵感到...',
                  link: '/ai-drama/workflow/script/complete-guide'
                },
                {
                  text: '剧本版权与查重指南：避免AI生成内容抄...',
                  link: '/ai-drama/workflow/script/copyright-and-originality'
                },
                {
                  text: 'DeepSeek写短剧剧本完全手册：复...',
                  link: '/ai-drama/workflow/script/deepseek-drama-script'
                },
                {
                  text: 'AI短剧台词口语化润色技巧：拒绝生硬机...',
                  link: '/ai-drama/workflow/script/dialogue-polishing'
                },
                {
                  text: '短剧黄金三秒钩子公式：让完播率飙升的开...',
                  link: '/ai-drama/workflow/script/golden-3-seconds-hook'
                },
                {
                  text: '男频战神与女频豪门题材：AI短剧剧本核...',
                  link: '/ai-drama/workflow/script/male-female-tropes'
                },
                {
                  text: '小说快速提炼短剧剧本方法：核心场面提纯...',
                  link: '/ai-drama/workflow/script/novel-to-script-extraction'
                },
                {
                  text: '短剧剧本格式标准化规范：适配AI工具的...',
                  link: '/ai-drama/workflow/script/script-formatting-standard'
                }
              ]
            },
            {
              text: '2.1.2 分镜设计',
              link: '/ai-drama/workflow/storyboard/',
              collapsed: true,
              items: [
                {
                  text: '镜头轴线规则（180度法则）在AI视频...',
                  link: '/ai-drama/workflow/storyboard/180-degree-rule'
                },
                {
                  text: '动作戏与追逐戏分镜设计：高动态镜头的提...',
                  link: '/ai-drama/workflow/storyboard/action-scenes-storyboard'
                },
                {
                  text: 'AI分镜工具评测：StoryNode、...',
                  link: '/ai-drama/workflow/storyboard/ai-storyboard-tools-review'
                },
                {
                  text: '9种电影级景别在AI短剧中的运用：大远...',
                  link: '/ai-drama/workflow/storyboard/camera-shots-framing'
                },
                {
                  text: 'AI短剧分镜设计全流程：从文本剧本到视...',
                  link: '/ai-drama/workflow/storyboard/complete-storyboard-guide'
                },
                {
                  text: '情感戏与对峙戏分镜设计：双人同框与正反...',
                  link: '/ai-drama/workflow/storyboard/drama-emotional-scenes'
                },
                {
                  text: '分镜时长与音乐卡点预估：成片剪辑节奏的...',
                  link: '/ai-drama/workflow/storyboard/duration-and-pacing'
                },
                {
                  text: 'Midjourney制作短剧分镜草图全...',
                  link: '/ai-drama/workflow/storyboard/midjourney-storyboard'
                },
                {
                  text: 'AI短剧分镜提示词（Prompt）撰写...',
                  link: '/ai-drama/workflow/storyboard/storyboard-prompts-formula'
                },
                {
                  text: '标准短剧分镜表模板：直接套用的Exce...',
                  link: '/ai-drama/workflow/storyboard/storyboard-templates'
                }
              ]
            },
            {
              text: '2.1.3 人物一致性',
              link: '/ai-drama/workflow/character/',
              collapsed: true,
              items: [
                {
                  text: 'AI人物设定图：2026年角色一致性制...',
                  link: '/ai-drama/workflow/character/character-concept-art'
                },
                {
                  text: 'AI角色参考图：2026年人物一致性制...',
                  link: '/ai-drama/workflow/character/character-reference-sheet'
                },
                {
                  text: 'AI漫剧角色一致性：动态漫画人物不变脸...',
                  link: '/ai-drama/workflow/character/comic-character-consistency'
                },
                {
                  text: 'AI角色一致性：2026年完整教程与工...',
                  link: '/ai-drama/workflow/character/complete-consistency-guide'
                },
                {
                  text: 'AI人物锁脸：2026年短剧角色一致性...',
                  link: '/ai-drama/workflow/character/face-lock-tools'
                },
                {
                  text: 'AI短剧人物一致性怎么做？2026年最...',
                  link: '/ai-drama/workflow/character/how-to-keep-characters-consistent'
                },
                {
                  text: 'AI角色不变脸：2026年人物一致性制...',
                  link: '/ai-drama/workflow/character/no-face-shifting-tips'
                },
                {
                  text: 'AI角色三视图：2026年人物一致性制...',
                  link: '/ai-drama/workflow/character/three-view-turnaround'
                },
                {
                  text: 'AI视频人物一致性：2026年完整解决...',
                  link: '/ai-drama/workflow/character/video-character-consistency'
                },
                {
                  text: 'AI短剧人物为什么会变脸？2026年原...',
                  link: '/ai-drama/workflow/character/why-characters-morph'
                }
              ]
            },
            {
              text: '2.1.4 视频生成',
              link: '/ai-drama/workflow/video/',
              collapsed: true,
              items: [
                {
                  text: 'AI文字生成视频：2026年最佳工具与...',
                  link: '/ai-drama/workflow/video/best-text-to-video-tools'
                },
                {
                  text: '首尾帧生成视频：2026年AI视频生成...',
                  link: '/ai-drama/workflow/video/first-last-frame-interpolation'
                },
                {
                  text: '图生视频：2026年AI图生视频完整指南',
                  link: '/ai-drama/workflow/video/image-to-video-guide'
                },
                {
                  text: '图生视频AI：2026年图片生成视频工...',
                  link: '/ai-drama/workflow/video/image-to-video-tools-list'
                },
                {
                  text: 'AI图生短剧：2026年图片转短剧完整...',
                  link: '/ai-drama/workflow/video/images-to-drama-production'
                },
                {
                  text: '小说生成视频：2026年AI小说转视频...',
                  link: '/ai-drama/workflow/video/novel-to-video-creation'
                },
                {
                  text: '剧本生成视频：AI短剧视频生成完整教程',
                  link: '/ai-drama/workflow/video/script-to-video-workflow'
                },
                {
                  text: 'AI文生短剧：2026年文字一键生成短剧',
                  link: '/ai-drama/workflow/video/text-to-drama-generator'
                },
                {
                  text: '文生视频：2026年AI文生视频工具推...',
                  link: '/ai-drama/workflow/video/text-to-video-guide'
                },
                {
                  text: 'AI文生视频提示词：2026年完整Pr...',
                  link: '/ai-drama/workflow/video/text-to-video-prompts'
                }
              ]
            },
            {
              text: '2.1.5 配音与后期',
              link: '/ai-drama/workflow/audio-post/',
              collapsed: true,
              items: [
                {
                  text: 'AI自动剪辑：2026年短剧剪辑工具推荐',
                  link: '/ai-drama/workflow/audio-post/ai-auto-video-editing'
                },
                {
                  text: 'AI字幕生成：2026年短剧自动字幕工具',
                  link: '/ai-drama/workflow/audio-post/ai-subtitle-generation'
                },
                {
                  text: 'AI视频超分：2026年短剧画质增强工具',
                  link: '/ai-drama/workflow/audio-post/ai-video-upscaling'
                },
                {
                  text: 'AI配音：2026年AI短剧配音工具推...',
                  link: '/ai-drama/workflow/audio-post/ai-voiceover-tools'
                },
                {
                  text: 'AI短剧后期：2026年完整后期处理流程',
                  link: '/ai-drama/workflow/audio-post/complete-post-production'
                },
                {
                  text: 'AI短剧配音怎么弄？2026年完整教程',
                  link: '/ai-drama/workflow/audio-post/how-to-do-ai-dubbing'
                },
                {
                  text: 'AI口型同步：2026年短剧对口型完整...',
                  link: '/ai-drama/workflow/audio-post/lipsync-complete-tutorial'
                },
                {
                  text: 'AI一键成片：2026年短剧自动成片工...',
                  link: '/ai-drama/workflow/audio-post/one-click-video-maker'
                },
                {
                  text: 'AI声音克隆：2026年短剧角色配音新...',
                  link: '/ai-drama/workflow/audio-post/voice-cloning-guide'
                },
                {
                  text: 'AI短剧配音提示词：2026年声音生成...',
                  link: '/ai-drama/workflow/audio-post/voice-prompts-templates'
                }
              ]
            }
          ]
        },
        {
          text: '教程与案例',
          collapsed: false,
          items: [
            {
              text: '2.2.1 零基础教程',
              link: '/ai-drama/tutorial/beginner/',
              collapsed: true,
              items: [
                {
                  text: '新手第一部短剧避坑指南：避免浪费算力的...',
                  link: '/ai-drama/tutorial/beginner/7-pitfalls-to-avoid'
                },
                {
                  text: '如何寻找不要版权的短剧素材与音乐？合规...',
                  link: '/ai-drama/tutorial/beginner/copyright-free-assets'
                },
                {
                  text: '零基础做AI短剧第一天：新手入门必看准...',
                  link: '/ai-drama/tutorial/beginner/day1-prep-list'
                },
                {
                  text: '短剧分段时长黄金法则：单集1分钟还是3...',
                  link: '/ai-drama/tutorial/beginner/episode-duration-rule'
                },
                {
                  text: '零成本跑通首条AI短剧：全免费工具组合...',
                  link: '/ai-drama/tutorial/beginner/free-tools-workflow'
                },
                {
                  text: '做AI短剧需要什么电脑配置？2026最...',
                  link: '/ai-drama/tutorial/beginner/hardware-requirements'
                },
                {
                  text: '手机能做AI短剧吗？2026年纯手机创...',
                  link: '/ai-drama/tutorial/beginner/mobile-phone-creation'
                },
                {
                  text: '不会画画也不会剪辑：普通人如何用AI做...',
                  link: '/ai-drama/tutorial/beginner/no-skills-needed'
                },
                {
                  text: '新手如何评估自己的短剧质量？5大硬指标...',
                  link: '/ai-drama/tutorial/beginner/quality-evaluation-metrics'
                },
                {
                  text: 'AI短剧制作全套流程图解：从0到1极速...',
                  link: '/ai-drama/tutorial/beginner/workflow-infographic'
                }
              ]
            },
            {
              text: '2.2.2 进阶实战',
              link: '/ai-drama/tutorial/advanced/',
              collapsed: true,
              items: [
                {
                  text: 'AI短剧声音空间定位：双耳立体声、环境...',
                  link: '/ai-drama/tutorial/advanced/audio-spatialization-mixing'
                },
                {
                  text: 'ComfyUI专业短剧工作流搭建：节点...',
                  link: '/ai-drama/tutorial/advanced/comfyui-drama-pipeline'
                },
                {
                  text: '复杂动作场面AI生成实战：打斗、跳跃与...',
                  link: '/ai-drama/tutorial/advanced/complex-action-scenes'
                },
                {
                  text: '大规模工业化生产流：一人一天产出5集短...',
                  link: '/ai-drama/tutorial/advanced/industrial-sop-workflow'
                },
                {
                  text: 'AI短剧光影一致性控制：电影级打光与色...',
                  link: '/ai-drama/tutorial/advanced/lighting-consistency'
                },
                {
                  text: '角色微表情调优：从面瘫木讷到眼神拉扯的...',
                  link: '/ai-drama/tutorial/advanced/micro-expressions'
                },
                {
                  text: '镜头节奏与蒙太奇剪辑法：用情绪剪辑提升...',
                  link: '/ai-drama/tutorial/advanced/montage-and-pacing'
                },
                {
                  text: '多人同框互动难题破解：视线对齐、站位与...',
                  link: '/ai-drama/tutorial/advanced/multi-character-interaction'
                },
                {
                  text: '场景资产库标准化：搭建可复用的豪门客厅...',
                  link: '/ai-drama/tutorial/advanced/scene-asset-library'
                },
                {
                  text: '特效与粒子融合实操：仙侠法术、赛博霓虹...',
                  link: '/ai-drama/tutorial/advanced/vfx-particle-effects'
                }
              ]
            },
            {
              text: '2.2.3 题材分类',
              link: '/ai-drama/tutorial/genre/',
              collapsed: true,
              items: [
                {
                  text: 'AI爽剧：2026年爽剧题材AI短剧制...',
                  link: '/ai-drama/tutorial/genre/addictive-fast-paced-drama'
                },
                {
                  text: 'AI古装短剧：2026年古装题材AI制...',
                  link: '/ai-drama/tutorial/genre/ancient-costume-drama'
                },
                {
                  text: 'AI霸总短剧：2026年霸总题材短剧制...',
                  link: '/ai-drama/tutorial/genre/ceo-tycoon-drama'
                },
                {
                  text: 'AI玄幻短剧：2026年玄幻题材AI短...',
                  link: '/ai-drama/tutorial/genre/fantasy-magic-drama'
                },
                {
                  text: 'AI女频短剧：2026年女频题材AI制...',
                  link: '/ai-drama/tutorial/genre/female-oriented-drama'
                },
                {
                  text: 'AI男频短剧：2026年男频题材AI制...',
                  link: '/ai-drama/tutorial/genre/male-oriented-drama'
                },
                {
                  text: 'AI悬疑短剧：2026年悬疑题材AI短...',
                  link: '/ai-drama/tutorial/genre/mystery-suspense-drama'
                },
                {
                  text: 'AI重生短剧：2026年重生题材AI短...',
                  link: '/ai-drama/tutorial/genre/rebirth-revenge-drama'
                },
                {
                  text: 'AI甜宠短剧：2026年甜宠题材AI制...',
                  link: '/ai-drama/tutorial/genre/sweet-romance-drama'
                },
                {
                  text: 'AI穿越短剧：2026年穿越题材AI短...',
                  link: '/ai-drama/tutorial/genre/time-travel-drama'
                },
                {
                  text: 'AI逆袭短剧：2026年逆袭题材AI短...',
                  link: '/ai-drama/tutorial/genre/underdog-comeback-drama'
                },
                {
                  text: 'AI都市短剧：2026年都市题材制作指南',
                  link: '/ai-drama/tutorial/genre/urban-modern-drama'
                }
              ]
            }
          ]
        }
      ],
      '/ai-comic/': [
        {
          text: '漫剧制作',
          collapsed: false,
          items: [
            {
              text: '3.1.1 漫剧入门',
              link: '/ai-comic/production/intro/',
              collapsed: true,
              items: [
                {
                  text: '漫剧制作常见三大误区：为什么你的漫画看...',
                  link: '/ai-comic/production/intro/avoid-slideshow-mistake'
                },
                {
                  text: 'AI漫剧适合做哪些题材？二次元、修仙与...',
                  link: '/ai-comic/production/intro/best-genres-for-comics'
                },
                {
                  text: '漫剧与动漫的区别：技术门槛、制作周期与...',
                  link: '/ai-comic/production/intro/comic-vs-anime'
                },
                {
                  text: '漫剧作品版权风险与公版漫画资源获取全解',
                  link: '/ai-comic/production/intro/copyright-and-public-domain'
                },
                {
                  text: '做AI漫剧需要准备哪些软件？必备工具箱...',
                  link: '/ai-comic/production/intro/essential-software-stack'
                },
                {
                  text: '国内外漫剧变现市场现状：抖音、快手与Y...',
                  link: '/ai-comic/production/intro/market-monetization-landscape'
                },
                {
                  text: 'AI漫剧全套生产管线拆解：从漫画原稿到...',
                  link: '/ai-comic/production/intro/pipeline-overview'
                },
                {
                  text: '2026年值得关注的10个标杆AI漫剧...',
                  link: '/ai-comic/production/intro/top-10-accounts-breakdown'
                },
                {
                  text: 'AI漫剧是什么？2026年动态漫画与微...',
                  link: '/ai-comic/production/intro/what-is-ai-comic'
                },
                {
                  text: '为什么做漫剧比真人短剧成本更低？三大核...',
                  link: '/ai-comic/production/intro/why-choose-comics'
                }
              ]
            },
            {
              text: '3.1.2 制作教程',
              link: '/ai-comic/production/tutorial/',
              collapsed: true,
              items: [
                {
                  text: '战斗漫剧打击感怎么做？屏幕震动、闪白与...',
                  link: '/ai-comic/production/tutorial/action-impact-effects'
                },
                {
                  text: '让漫画人物动起来：呼吸、眨眼与简单肢体...',
                  link: '/ai-comic/production/tutorial/character-animation-basics'
                },
                {
                  text: '漫剧导出格式与手机竖屏适配优化方案',
                  link: '/ai-comic/production/tutorial/export-mobile-adaptation'
                },
                {
                  text: '剪映在漫剧后期中的神仙用法：关键帧动画...',
                  link: '/ai-comic/production/tutorial/jianying-for-comics'
                },
                {
                  text: '漫画格视差滚动与镜头推拉：营造沉浸式空...',
                  link: '/ai-comic/production/tutorial/parallax-scrolling-camera'
                },
                {
                  text: '漫剧制作提速秘籍：动作预设库与模板化批...',
                  link: '/ai-comic/production/tutorial/presets-and-batching'
                },
                {
                  text: 'PS漫画分层切图技巧：前景、人物与背景...',
                  link: '/ai-comic/production/tutorial/ps-layer-separation'
                },
                {
                  text: '漫剧专属音效与BGM铺底：如何用声音调...',
                  link: '/ai-comic/production/tutorial/soundtrack-and-foley'
                },
                {
                  text: 'AI辅助漫画气泡与音效拟声字动态化技巧',
                  link: '/ai-comic/production/tutorial/speech-bubbles-sound-effects'
                },
                {
                  text: 'AI漫剧新手制作保姆级教程：从零做出第...',
                  link: '/ai-comic/production/tutorial/step-by-step-guide'
                }
              ]
            },
            {
              text: '3.1.3 人物一致性',
              link: '/ai-comic/production/character/',
              collapsed: true,
              items: [
                {
                  text: '漫画角色年龄跨度一致性：少年、青年到老...',
                  link: '/ai-comic/production/character/aging-consistency'
                },
                {
                  text: '动漫角色一致性训练：LoRA微调专属主...',
                  link: '/ai-comic/production/character/anime-lora-training'
                },
                {
                  text: '二次元角色多视角三视图生成：转头与全身...',
                  link: '/ai-comic/production/character/anime-turnaround-sheet'
                },
                {
                  text: '动漫角色资产归档规范：建立长期连载人设...',
                  link: '/ai-comic/production/character/character-asset-whitepaper'
                },
                {
                  text: '动漫主角服装与发型长效保持：提示词加权...',
                  link: '/ai-comic/production/character/costume-hair-persistence'
                },
                {
                  text: '漫画角色表情包库搭建：喜怒哀乐20种标...',
                  link: '/ai-comic/production/character/facial-expressions-library'
                },
                {
                  text: 'Midjourney在二次元漫剧人物一...',
                  link: '/ai-comic/production/character/midjourney-anime-consistency'
                },
                {
                  text: '动漫人物手部与动作姿态纠错：Contr...',
                  link: '/ai-comic/production/character/openpose-hands-correction'
                },
                {
                  text: 'Q版萌系与热血硬派风格切换：保持人物核...',
                  link: '/ai-comic/production/character/style-switching-retention'
                },
                {
                  text: '配角与路人脸设计法则：反衬主角且不发生...',
                  link: '/ai-comic/production/character/supporting-characters-design'
                }
              ]
            }
          ]
        },
        {
          text: '小说转漫剧',
          collapsed: false,
          items: [
            {
              text: '3.2.1 小说改编',
              link: '/ai-comic/novel-to-comic/adapt/',
              collapsed: true,
              items: [
                {
                  text: '小说人设提纯：从长篇外貌描写到三条核心...',
                  link: '/ai-comic/novel-to-comic/adapt/character-traits-extraction'
                },
                {
                  text: '连载小说转漫剧的断章艺术：让读者疯狂点...',
                  link: '/ai-comic/novel-to-comic/adapt/cliffhanger-mastery'
                },
                {
                  text: '小说高潮对决分镜切片：从大段文字到10...',
                  link: '/ai-comic/novel-to-comic/adapt/climax-battle-breakdown'
                },
                {
                  text: '小说转漫剧成本核算：单集投入产出比与R...',
                  link: '/ai-comic/novel-to-comic/adapt/cost-roi-calculator'
                },
                {
                  text: '玄幻小说世界观具象化：宗门、妖兽与法宝...',
                  link: '/ai-comic/novel-to-comic/adapt/fantasy-worldbuilding-prompts'
                },
                {
                  text: '小说心理活动与旁白视听化转化技巧：拒绝...',
                  link: '/ai-comic/novel-to-comic/adapt/inner-monologue-visualization'
                },
                {
                  text: '如何用大模型自动将小说拆解为标准漫画脚...',
                  link: '/ai-comic/novel-to-comic/adapt/llm-script-extraction-prompts'
                },
                {
                  text: '小说改编版权合规：小说推文授权与二创收...',
                  link: '/ai-comic/novel-to-comic/adapt/novel-licensing-monetization'
                },
                {
                  text: '小说改漫剧全套流程：万字网文如何精炼为...',
                  link: '/ai-comic/novel-to-comic/adapt/novel-to-comic-complete-workflow'
                },
                {
                  text: '都市重生文改漫剧节奏把控：前三回必须打...',
                  link: '/ai-comic/novel-to-comic/adapt/rebirth-novel-pacing'
                }
              ]
            },
            {
              text: '3.2.2 漫画转视频',
              link: '/ai-comic/novel-to-comic/comic-video/',
              collapsed: true,
              items: [
                {
                  text: '漫画转视频五大常见翻车现象及实战抢救方案',
                  link: '/ai-comic/novel-to-comic/comic-video/5-failure-cases-recovery'
                },
                {
                  text: '漫画动态化中的音频卡点：让每一记重拳精...',
                  link: '/ai-comic/novel-to-comic/comic-video/audio-beat-matching'
                },
                {
                  text: '漫画转短视频批量渲染工作流：云端多任务...',
                  link: '/ai-comic/novel-to-comic/comic-video/cloud-batch-rendering'
                },
                {
                  text: '漫画分镜转视频过渡技巧：漫画框破框与无...',
                  link: '/ai-comic/novel-to-comic/comic-video/frame-break-transitions'
                },
                {
                  text: '利用可灵AI将漫画线条转化为高帧率动态...',
                  link: '/ai-comic/novel-to-comic/comic-video/kling-manga-animation'
                },
                {
                  text: '漫画转视频中的画质修复：去除噪点与线稿...',
                  link: '/ai-comic/novel-to-comic/comic-video/line-art-upscaling'
                },
                {
                  text: '漫画角色嘴部与眼部局部动态化：免全帧渲...',
                  link: '/ai-comic/novel-to-comic/comic-video/local-animation-cost-saving'
                },
                {
                  text: '黑白漫画转全彩动态视频：自动上色与环境...',
                  link: '/ai-comic/novel-to-comic/comic-video/manga-colorization-animation'
                },
                {
                  text: '漫画帧转动态视频全流程：静态画作秒变电...',
                  link: '/ai-comic/novel-to-comic/comic-video/manga-to-video-workflow'
                },
                {
                  text: 'Vidu在二次元漫剧中的神仙表现：极速...',
                  link: '/ai-comic/novel-to-comic/comic-video/vidu-anime-scenes'
                }
              ]
            }
          ]
        }
      ],
      '/ai-tools/': [
        {
          text: '工具推荐',
          collapsed: false,
          items: [
            {
              text: '4.1.1 AI短剧工具',
              link: '/ai-tools/recommend/drama/',
              collapsed: true,
              items: [
                {
                  text: '一体化短剧工作台评测：一个软件搞定全流...',
                  link: '/ai-tools/recommend/drama/all-in-one-platforms-review'
                },
                {
                  text: '短剧批量剪辑与成片工具：矩阵号日更百条...',
                  link: '/ai-tools/recommend/drama/batch-editing-software'
                },
                {
                  text: '短剧角色锁脸与换脸工具大盘点：工业化团...',
                  link: '/ai-tools/recommend/drama/face-swapping-consistency-tools'
                },
                {
                  text: '短剧自动对口型（Lip-sync）软件...',
                  link: '/ai-tools/recommend/drama/lipsync-tools-comparison'
                },
                {
                  text: '专业短剧编剧AI工具横评：哪款写剧本最...',
                  link: '/ai-tools/recommend/drama/scriptwriting-ai-tools-review'
                },
                {
                  text: 'AI短剧分镜绘制神器推荐：告别画画烦恼...',
                  link: '/ai-tools/recommend/drama/storyboard-software-recommendation'
                },
                {
                  text: '2026年做AI短剧必备的10款神器：...',
                  link: '/ai-tools/recommend/drama/top-10-drama-tools-2026'
                },
                {
                  text: '视频画质修复与超分软件盘点：将模糊镜头...',
                  link: '/ai-tools/recommend/drama/video-enhancement-tools'
                },
                {
                  text: '2026年顶尖AI视频生成软件综合梯队...',
                  link: '/ai-tools/recommend/drama/video-generators-tier-list'
                },
                {
                  text: '影视级AI配音与拟音音效工具精选：让人...',
                  link: '/ai-tools/recommend/drama/voiceover-and-foley-tools'
                }
              ]
            },
            {
              text: '4.1.2 AI漫剧工具',
              link: '/ai-tools/recommend/comic/',
              collapsed: true,
              items: [
                {
                  text: '二次元绘画生成工具哪家最强？Midjo...',
                  link: '/ai-tools/recommend/comic/anime-drawing-tools-comparison'
                },
                {
                  text: '动漫声音音效库精选网站：打斗、施法、日...',
                  link: '/ai-tools/recommend/comic/anime-sound-effects-libraries'
                },
                {
                  text: '漫剧创作者必备浏览器插件与辅助脚本清单',
                  link: '/ai-tools/recommend/comic/browser-extensions-and-scripts'
                },
                {
                  text: '漫画智能分层抠图工具横评：快速提取人物...',
                  link: '/ai-tools/recommend/comic/comic-matting-tools-review'
                },
                {
                  text: '漫画拟声词与特效字生成工具：一秒做出震...',
                  link: '/ai-tools/recommend/comic/comic-onomatopoeia-fonts'
                },
                {
                  text: '手机端做漫剧APP盘点：随时随地用手机...',
                  link: '/ai-tools/recommend/comic/mobile-comic-making-apps'
                },
                {
                  text: 'AI动态漫画一键成片平台实测：上传漫画...',
                  link: '/ai-tools/recommend/comic/one-click-comic-video-platforms'
                },
                {
                  text: '漫画动态化骨骼绑定软件推荐：Spine...',
                  link: '/ai-tools/recommend/comic/skeletal-animation-software'
                },
                {
                  text: '漫剧垂直模型盘点：Civitai与Li...',
                  link: '/ai-tools/recommend/comic/top-comic-checkpoints-lora'
                },
                {
                  text: '2026年AI漫剧制作全套工具推荐：二...',
                  link: '/ai-tools/recommend/comic/top-comic-production-tools'
                }
              ]
            },
            {
              text: '4.1.3 免费工具',
              link: '/ai-tools/recommend/free/',
              collapsed: true,
              items: [
                {
                  text: '2026年免费AI短剧制作工具全集：零...',
                  link: '/ai-tools/recommend/free/free-ai-drama-tools-2026'
                },
                {
                  text: '免费AI配音软件推荐：无次数限制的高拟...',
                  link: '/ai-tools/recommend/free/free-ai-voiceover-tools'
                },
                {
                  text: '如何合法白嫖各大AI平台的免费API额...',
                  link: '/ai-tools/recommend/free/free-api-credits-guide'
                },
                {
                  text: '免费商用字体与短剧BGM音频库：告别侵...',
                  link: '/ai-tools/recommend/free/free-commercial-fonts-and-bgm'
                },
                {
                  text: '免费在线短剧剪辑工具盘点：免安装浏览器...',
                  link: '/ai-tools/recommend/free/free-online-video-editors'
                },
                {
                  text: '免费开源换脸与面部修复工具：告别昂贵商...',
                  link: '/ai-tools/recommend/free/free-open-source-face-swapping'
                },
                {
                  text: '免费AI视频生成工具盘点：每天赠送免费...',
                  link: '/ai-tools/recommend/free/free-video-generators-daily-credits'
                },
                {
                  text: '免费去水印与视频高清修复工具推荐：拯救...',
                  link: '/ai-tools/recommend/free/free-watermark-removal-upscale'
                },
                {
                  text: '开源AI短剧工作流全套搭建：本地免费运...',
                  link: '/ai-tools/recommend/free/open-source-local-workflow'
                },
                {
                  text: '零成本做短剧真实收入复盘：纯免费工具真...',
                  link: '/ai-tools/recommend/free/zero-cost-monetization-review'
                }
              ]
            }
          ]
        },
        {
          text: '模型详解',
          collapsed: false,
          items: [
            {
              text: '4.2.1 视频模型',
              link: '/ai-tools/models/video/',
              collapsed: true,
              items: [
                {
                  text: '海螺AI短剧：2026年海螺模型制作教程',
                  link: '/ai-tools/models/video/hailuo-ai-drama-tutorial'
                },
                {
                  text: '可灵AI短剧：2026年可灵模型制作短...',
                  link: '/ai-tools/models/video/kling-ai-complete-tutorial'
                },
                {
                  text: '可灵AI教程：2026年可灵模型完整使...',
                  link: '/ai-tools/models/video/kling-ai-ultimate-manual'
                },
                {
                  text: '可灵图生视频：2026年可灵图生视频完...',
                  link: '/ai-tools/models/video/kling-image-to-video-tutorial'
                },
                {
                  text: 'Seedance短剧：2026年See...',
                  link: '/ai-tools/models/video/seedance-drama-creation-guide'
                },
                {
                  text: 'Seedance提示词：2026年Se...',
                  link: '/ai-tools/models/video/seedance-prompts-templates'
                },
                {
                  text: 'Sora短剧：2026年Sora模型制...',
                  link: '/ai-tools/models/video/sora-drama-production-guide'
                },
                {
                  text: '通义万相短剧：2026年通义万相制作教程',
                  link: '/ai-tools/models/video/tongyi-wanxiang-drama-tutorial'
                },
                {
                  text: 'Veo短剧：2026年Veo模型制作短...',
                  link: '/ai-tools/models/video/veo-drama-creation-guide'
                },
                {
                  text: 'Vidu短剧：2026年Vidu模型制...',
                  link: '/ai-tools/models/video/vidu-drama-and-comic-guide'
                }
              ]
            },
            {
              text: '4.2.2 图像模型',
              link: '/ai-tools/models/image/',
              collapsed: true,
              items: [
                {
                  text: '商业级图像授权与版权边界：生图模型商用...',
                  link: '/ai-tools/models/image/commercial-licensing-and-copyright'
                },
                {
                  text: 'DALL-E 3在短剧创意脑暴中的应用...',
                  link: '/ai-tools/models/image/dalle-3-creative-storyboard'
                },
                {
                  text: '国产生图模型哪家强？即梦、秒画与通义万...',
                  link: '/ai-tools/models/image/domestic-image-models-comparison'
                },
                {
                  text: 'FLUX模型在AI短剧中的应用：极致写...',
                  link: '/ai-tools/models/image/flux-model-for-drama'
                },
                {
                  text: '本地部署生图大模型避坑指南：显存优化与...',
                  link: '/ai-tools/models/image/local-deployment-optimization'
                },
                {
                  text: 'Midjourney v6做短剧全套技...',
                  link: '/ai-tools/models/image/midjourney-v6-drama-guide'
                },
                {
                  text: '图像模型多镜头连续性测评：同一场景不同...',
                  link: '/ai-tools/models/image/multi-shot-lighting-consistency'
                },
                {
                  text: '图像大模型提示词（Prompt）架构演...',
                  link: '/ai-tools/models/image/prompt-syntax-evolution'
                },
                {
                  text: 'Stable Diffusion XL...',
                  link: '/ai-tools/models/image/sdxl-character-concept-art'
                },
                {
                  text: '动漫风生图模型排名前五：Niji 6与...',
                  link: '/ai-tools/models/image/top-5-anime-models-niji-6'
                }
              ]
            },
            {
              text: '4.2.3 模型对比',
              link: '/ai-tools/models/compare/',
              collapsed: true,
              items: [
                {
                  text: 'AI短剧用什么AI最好：2026年大模...',
                  link: '/ai-tools/models/compare/best-ai-for-short-drama'
                },
                {
                  text: 'AI漫剧用什么模型：2026年最佳模型...',
                  link: '/ai-tools/models/compare/best-models-for-anime-comics'
                },
                {
                  text: 'AI视频模型对比：2026年全球主流视...',
                  link: '/ai-tools/models/compare/complete-video-models-review'
                },
                {
                  text: 'AI短剧用可灵还是Seedance：2...',
                  link: '/ai-tools/models/compare/kling-or-seedance-guide'
                },
                {
                  text: '可灵 vs 海螺：2026年AI视频模...',
                  link: '/ai-tools/models/compare/kling-vs-hailuo'
                },
                {
                  text: '可灵 vs Seedance：2026...',
                  link: '/ai-tools/models/compare/kling-vs-seedance'
                },
                {
                  text: 'Seedance vs Sora：20...',
                  link: '/ai-tools/models/compare/seedance-vs-sora'
                },
                {
                  text: 'Seedance vs Veo：202...',
                  link: '/ai-tools/models/compare/seedance-vs-veo'
                },
                {
                  text: 'Veo vs Sora：2026年顶级...',
                  link: '/ai-tools/models/compare/veo-vs-sora'
                },
                {
                  text: 'Vidu vs 可灵：2026年AI漫...',
                  link: '/ai-tools/models/compare/vidu-vs-kling'
                }
              ]
            }
          ]
        }
      ],
      '/prompts/': [
        {
          text: '提示词大全',
          collapsed: false,
          items: [
            {
              text: '5.1.1 短剧提示词',
              link: '/prompts/library/drama/',
              collapsed: true,
              items: [
                {
                  text: 'AI短剧提示词技巧：2026年进阶Pr...',
                  link: '/prompts/library/drama/advanced-prompt-engineering'
                },
                {
                  text: 'AI短剧提示词大全：2026年全题材P...',
                  link: '/prompts/library/drama/all-genres-prompt-handbook'
                },
                {
                  text: 'AI短剧提示词生成器：2026年自动生...',
                  link: '/prompts/library/drama/automatic-prompt-generators'
                },
                {
                  text: 'AI短剧提示词：2026年完整Prom...',
                  link: '/prompts/library/drama/complete-drama-prompts-2026'
                },
                {
                  text: 'AI短剧提示词模板：2026年直接复制...',
                  link: '/prompts/library/drama/copy-paste-drama-prompts'
                },
                {
                  text: 'AI短剧提示词教程：2026年如何写出...',
                  link: '/prompts/library/drama/how-to-write-quality-prompts'
                },
                {
                  text: 'AI短剧Prompt模板：2026年商...',
                  link: '/prompts/library/drama/master-prompt-library'
                },
                {
                  text: 'AI短剧提示词库：2026年分类检索短...',
                  link: '/prompts/library/drama/the-ultimate-prompt-repository'
                },
                {
                  text: 'AI短剧提示词案例：2026年破千万播...',
                  link: '/prompts/library/drama/viral-drama-prompts-case-study'
                },
                {
                  text: 'AI短剧Prompt：2026年爆款短...',
                  link: '/prompts/library/drama/viral-drama-prompts-templates'
                }
              ]
            },
            {
              text: '5.1.2 分镜提示词',
              link: '/prompts/library/storyboard/',
              collapsed: true,
              items: [
                {
                  text: '特效与动作打斗提示词：拳拳到肉、刀剑碰...',
                  link: '/prompts/library/storyboard/action-combat-vfx-prompts'
                },
                {
                  text: '电影级镜头机位提示词：俯拍、仰拍、特写...',
                  link: '/prompts/library/storyboard/camera-angles-prompts'
                },
                {
                  text: '动态运镜控制提示词：推拉摇移升降与环绕...',
                  link: '/prompts/library/storyboard/camera-movement-prompts'
                },
                {
                  text: '影视色彩风格化提示词：王家卫墨绿、胶片...',
                  link: '/prompts/library/storyboard/cinematic-color-grading-prompts'
                },
                {
                  text: '景深与焦距提示词：微距、大光圈虚化与广...',
                  link: '/prompts/library/storyboard/depth-of-field-focal-length'
                },
                {
                  text: '情感特写提示词：含泪眼眶、嘴角颤抖与微...',
                  link: '/prompts/library/storyboard/emotional-closeups-prompts'
                },
                {
                  text: '室内与建筑空间提示词：奢华欧式宫殿、破...',
                  link: '/prompts/library/storyboard/interior-architecture-prompts'
                },
                {
                  text: '光影与氛围营造提示词：逆光剪影、丁达尔...',
                  link: '/prompts/library/storyboard/lighting-atmosphere-prompts'
                },
                {
                  text: '悬疑与惊悚镜头提示词：幽暗走廊、门后窥...',
                  link: '/prompts/library/storyboard/suspense-horror-prompts'
                },
                {
                  text: '天气与环境特效提示词：暴风雨、漫天大雪...',
                  link: '/prompts/library/storyboard/weather-environment-prompts'
                }
              ]
            },
            {
              text: '5.1.3 人物提示词',
              link: '/prompts/library/character/',
              collapsed: true,
              items: [
                {
                  text: '年龄跨度人物提示词：萌娃童年、青涩少年...',
                  link: '/prompts/library/character/age-progression-prompts'
                },
                {
                  text: '动漫角色与二次元立绘提示词：日漫美少女...',
                  link: '/prompts/library/character/anime-manga-character-prompts'
                },
                {
                  text: '服装与穿搭材质提示词：丝绸反光、重工业...',
                  link: '/prompts/library/character/clothing-and-fabrics-prompts'
                },
                {
                  text: '面部特征与五官微雕提示词：桃花眼、高鼻...',
                  link: '/prompts/library/character/facial-features-micro-prompts'
                },
                {
                  text: '女主角人设提示词库：豪门千金、清纯校花...',
                  link: '/prompts/library/character/female-protagonist-prompts'
                },
                {
                  text: '发型与发色细节提示词：微卷羊毛卷、利落...',
                  link: '/prompts/library/character/hair-styles-and-colors-prompts'
                },
                {
                  text: '男主角人设提示词库：战神将军、冷酷总裁...',
                  link: '/prompts/library/character/male-protagonist-prompts'
                },
                {
                  text: '负面提示词（Negative Prom...',
                  link: '/prompts/library/character/negative-prompts-master-list'
                },
                {
                  text: '职业与身份特征装束提示词：医生白大褂、...',
                  link: '/prompts/library/character/profession-uniforms-prompts'
                },
                {
                  text: '恶毒反派与绿茶配角提示词：让人恨得牙痒...',
                  link: '/prompts/library/character/villain-and-rival-prompts'
                }
              ]
            },
            {
              text: '5.1.4 模型提示词',
              link: '/prompts/library/model/',
              collapsed: true,
              items: [
                {
                  text: '跨模型提示词通用转译法：一套剧本如何适...',
                  link: '/prompts/library/model/cross-model-prompt-translation'
                },
                {
                  text: 'FLUX写实人像提示词范例：告别塑料感...',
                  link: '/prompts/library/model/flux-realistic-portrait-prompts'
                },
                {
                  text: '海螺AI（MiniMax）自然语言提示...',
                  link: '/prompts/library/model/hailuo-natural-language-prompts'
                },
                {
                  text: '可灵AI专属提示词编写指南：运镜参数与...',
                  link: '/prompts/library/model/kling-prompts-handbook'
                },
                {
                  text: 'Luma Dream Machine提...',
                  link: '/prompts/library/model/luma-dream-machine-prompts'
                },
                {
                  text: 'Midjourney常用参数后缀全解：...',
                  link: '/prompts/library/model/midjourney-parameters-explained'
                },
                {
                  text: 'Runway Gen-3专属相机运动提...',
                  link: '/prompts/library/model/runway-gen3-camera-prompts'
                },
                {
                  text: 'Stable Diffusion权重语...',
                  link: '/prompts/library/model/sd-weights-and-lora-syntax'
                },
                {
                  text: 'Seedance模型高效提示词公式：让...',
                  link: '/prompts/library/model/seedance-prompts-formula'
                },
                {
                  text: 'Vidu高能动作提示词库：二次元动漫与...',
                  link: '/prompts/library/model/vidu-anime-action-prompts'
                }
              ]
            }
          ]
        }
      ],
      '/monetize/': [
        {
          text: '变现模式',
          collapsed: false,
          items: [
            {
              text: '6.1.1 赚钱方式',
              link: '/monetize/income/methods/',
              collapsed: true,
              items: [
                {
                  text: 'AI漫剧赚钱：2026年动态漫画商业变...',
                  link: '/monetize/income/methods/ai-comic-monetization-guide'
                },
                {
                  text: 'AI短剧副业：2026年上班族每天2小...',
                  link: '/monetize/income/methods/ai-drama-as-side-hustle'
                },
                {
                  text: 'AI短剧项目：2026年从0到1赚钱指...',
                  link: '/monetize/income/methods/ai-drama-business-project-guide'
                },
                {
                  text: 'AI短剧赚钱：2026年完整变现指南与...',
                  link: '/monetize/income/methods/ai-drama-monetization-2026'
                },
                {
                  text: 'AI视频赚钱：2026年全网AI视频变...',
                  link: '/monetize/income/methods/ai-video-making-money'
                },
                {
                  text: 'AI漫剧变现：2026年最佳变现模式与...',
                  link: '/monetize/income/methods/best-comic-monetization-models'
                },
                {
                  text: 'AI短剧变现：2026年最佳变现模式推...',
                  link: '/monetize/income/methods/best-monetization-models'
                },
                {
                  text: 'AI短剧商业模式：2026年全产业链商...',
                  link: '/monetize/income/methods/business-model-deep-dive'
                },
                {
                  text: 'AI短剧怎么赚钱：2026年六大核心创...',
                  link: '/monetize/income/methods/how-to-make-money-with-ai-drama'
                },
                {
                  text: 'AI小说推文赚钱：2026年完整变现教...',
                  link: '/monetize/income/methods/novel-promotion-monetization'
                }
              ]
            },
            {
              text: '6.1.2 商业模式',
              link: '/monetize/income/business/',
              collapsed: true,
              items: [
                {
                  text: '品牌定制短剧与商务赞助：单集万元报价与...',
                  link: '/monetize/income/business/brand-sponsorship-and-ads'
                },
                {
                  text: '自建微信短剧小程序全流程：从资质备案到...',
                  link: '/monetize/income/business/build-miniprogram-theater'
                },
                {
                  text: '知识付费与AI短剧培训：如何将实战经验...',
                  link: '/monetize/income/business/course-and-community-monetization'
                },
                {
                  text: '短剧分销与CPS变现：如何挂载剧场小程...',
                  link: '/monetize/income/business/cps-revenue-sharing'
                },
                {
                  text: 'AI短剧代制作与商业外包接单：2026...',
                  link: '/monetize/income/business/custom-production-pricing'
                },
                {
                  text: '短剧出海付费机制拆解：欧美用户单集付费...',
                  link: '/monetize/income/business/global-pay-per-episode-model'
                },
                {
                  text: '短剧IP衍生品与周边变现：打造二次元角...',
                  link: '/monetize/income/business/ip-merchandise-and-spin-offs'
                },
                {
                  text: '小说推文授权官方渠道大全：正规一手平台...',
                  link: '/monetize/income/business/official-novel-agencies'
                },
                {
                  text: 'AI短剧团队股权架构与分账协议模板：合...',
                  link: '/monetize/income/business/team-equity-and-contracts'
                },
                {
                  text: '投流买量经济学：短剧投流ROI测算与买...',
                  link: '/monetize/income/business/traffic-arbitrage-and-roi'
                }
              ]
            }
          ]
        },
        {
          text: '运营实战',
          collapsed: false,
          items: [
            {
              text: '6.2.1 账号运营',
              link: '/monetize/operations/account/',
              collapsed: true,
              items: [
                {
                  text: '短视频算法推流底层机制：完播率、转评赞...',
                  link: '/monetize/operations/account/algorithm-recommendation-logic'
                },
                {
                  text: '账号数据复盘指标全解：根据播放漏斗快速...',
                  link: '/monetize/operations/account/analytics-and-funnel-diagnosis'
                },
                {
                  text: '短剧违规与限流红线指南：2026年平台...',
                  link: '/monetize/operations/account/censorship-and-guidelines'
                },
                {
                  text: '评论区神评控评艺术：制造争议与反转，让...',
                  link: '/monetize/operations/account/comments-engagement-strategy'
                },
                {
                  text: '短剧封面与黄金前三秒标题党设计：点击率...',
                  link: '/monetize/operations/account/covers-and-titles-ctr'
                },
                {
                  text: '抖音AI短剧账号从0到1冷启动：7天快...',
                  link: '/monetize/operations/account/douyin-cold-start-sop'
                },
                {
                  text: '快手短剧磁力聚星变现：下沉市场观众喜好...',
                  link: '/monetize/operations/account/kuaishou-drama-operations'
                },
                {
                  text: '短剧矩阵号自动化管理方案：一人轻松操盘...',
                  link: '/monetize/operations/account/matrix-management-automation'
                },
                {
                  text: '微信视频号短剧新机遇：中老年银发群体的...',
                  link: '/monetize/operations/account/wechat-channels-silver-hair'
                },
                {
                  text: '小红书短剧营销引流：治愈系漫剧与大女主...',
                  link: '/monetize/operations/account/xiaohongshu-manga-marketing'
                }
              ]
            },
            {
              text: '6.2.2 出海运营',
              link: '/monetize/operations/global/',
              collapsed: true,
              items: [
                {
                  text: 'AI短剧出海运营：2026年海外短剧蓝...',
                  link: '/monetize/operations/global/ai-drama-global-expansion-2026'
                },
                {
                  text: '短剧出海团队出海SOP：从一人兼职到跨...',
                  link: '/monetize/operations/global/cross-border-team-sop'
                },
                {
                  text: '短剧出海合规与法律风控：GDPR隐私法...',
                  link: '/monetize/operations/global/global-compliance-and-tax'
                },
                {
                  text: '出海短剧本地化翻译与多语言配音：打通欧...',
                  link: '/monetize/operations/global/localization-and-multilingual-dubbing'
                },
                {
                  text: '海外社群搭建与粉丝私域转化：Disco...',
                  link: '/monetize/operations/global/overseas-community-discord-telegram'
                },
                {
                  text: '海外短剧APP巨头生态拆解：ReelS...',
                  link: '/monetize/operations/global/reelshort-dramabox-ecosystem'
                },
                {
                  text: '东南亚与拉美短剧市场洞察：高播放量与变...',
                  link: '/monetize/operations/global/sea-and-latam-market-insights'
                },
                {
                  text: 'TikTok短剧账号冷启动与算法：如何...',
                  link: '/monetize/operations/global/tiktok-drama-cold-start'
                },
                {
                  text: '欧美短剧爆款题材解密：狼人虐恋、吸血鬼...',
                  link: '/monetize/operations/global/western-hot-drama-tropes'
                },
                {
                  text: 'YouTube Shorts短剧分成计...',
                  link: '/monetize/operations/global/youtube-shorts-revenue-program'
                }
              ]
            }
          ]
        }
      ]
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 3],
      label: '本页导读'
    },
    lastUpdatedText: '最近更新时间',
    footer: {
      message: '黄果短剧AI - 专注于AI短剧与动态漫剧制作的知识与技术沉淀平台',
      copyright: 'Copyright © 2026 huangguoai.run All Rights Reserved.'
    }
  }
})
