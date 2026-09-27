# 黄果短剧AI指南 (huangguoai.run) - 生产部署与日常运维手册

本文档为 **黄果短剧AI指南 (`huangguoai.run`)** 的全套上线部署、服务器配置、SEO 提交与日常运维操作指南。

---

## 一、项目架构与资产规格概览

* **官方域名**：`https://huangguoai.run`
* **品牌定位**：黄果短剧AI - 专注于AI短剧与动态漫剧制作的知识与技术沉淀平台
* **技术组合**：
  * **静态引擎**：VitePress v1.6.4
  * **视觉系统**：品牌化简白主题（极简科技白、明快黄 `#F59E0B`、沉稳黑、灰度层级）
  * **全文搜索**：Pagefind v1.5.2 Extended（纯前端 WebAssembly 离线中文分词搜索）
  * **站点地图**：VitePress 内置自动生成 Sitemap (`sitemap.xml`)
  * **部署环境**：Apache HTTP Server（支持 Clean URLs 伪静态、Gzip 压缩、长效缓存与企业级安全头）
* **全站页面规模**：
  * **全局首页**：1 篇 (`docs/index.md`)
  * **一级导航大分类**：6 个 (`/huangguo/`, `/ai-drama/`, `/ai-comic/`, `/ai-tools/`, `/prompts/`, `/monetize/`)
  * **二级专题页面**：13 个
  * **三级内容集群**：32 个（均配备响应式 `.hg-card-grid` 卡片展示）
  * **深度 SEO/GEO 文章**：**322 篇**（每篇均严格按照 6 段式结构打造，包含直接结论、底层机制、步骤模板、量化指标、避坑排查、FAQ 与内链网格）
  * **全站总页面数**：**374 篇静态页面**

---

## 二、本地构建与测试命令

所有依赖与编译脚本均已在 `package.json` 中配置完毕：

```bash
# 1. 启动本地开发调试服务器（支持热重载 HMR）
npm run docs:dev

# 2. 生产环境全量编译（自动执行 VitePress 编译 + Pagefind 中文索引构建）
npm run docs:build

# 3. 本地预览生产构建产物（模拟生产环境访问 http://localhost:4173）
npm run docs:preview
```

> **提示**：运行 `npm run docs:build` 时，产物会输出至 `docs/.vitepress/dist/` 目录。每次构建均会自动运行 Pagefind 对 374 篇页面重新进行全文中文分词索引。

---

## 三、Apache 生产服务器部署实操指南

### 3.1 文件同步上传

将本地项目 `docs/.vitepress/dist/` 目录下的**所有文件和子目录**，完整上传至 Apache 服务器的网站根目录（例如 `/var/www/html/` 或宝塔面板的 `/www/wwwroot/huangguoai.run/`）。

> **特别注意**：`.htaccess` 为隐藏文件，通过 FTP/SFTP 上传时，请务必开启“显示隐藏文件”选项，确保 `.htaccess` 成功上传到根目录下。

### 3.2 必备 Apache 模块激活

为了保证伪静态、压缩、缓存和安全头正常生效，服务器的 Apache 必须启用以下核心模块（Ubuntu/Debian 示例命令）：

```bash
# 启用必备模块
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate
sudo a2enmod mime

# 重启 Apache 服务使配置生效
sudo systemctl restart apache2
```

### 3.3 目录权限设置

```bash
# 设置网站文件所属用户为 www-data (或 apache)
sudo chown -R www-data:www-data /var/www/html

# 设置目录权限为 755，文件权限为 644
sudo find /var/www/html -type d -exec chmod 755 {} \;
sudo find /var/www/html -type f -exec chmod 644 {} \;
```

### 3.4 根目录配置验证 (`.htaccess`)

`docs/public/.htaccess` 文件已在编译时自动打包进 `dist` 根目录，其核心策略包括：
1. **强制 HTTPS**：所有 HTTP 请求自动 301 重定向至 `https://huangguoai.run`。
2. **Clean URLs 映射**：无后缀路径（如 `/ai-drama/workflow/script/golden-3-seconds-hook`）内部无缝映射到对应的 `.html` 文件。
3. **MIME 类型支持**：专门配置了 `.wasm`（`application/wasm`），确保 Pagefind 中文分词引擎在浏览器端毫秒级加载。
4. **Gzip 压缩**：对 HTML、CSS、JS、JSON、WASM 与 SVG 开启全量 `mod_deflate` 压缩，网络传输体积缩减 70%。
5. **客户端长效缓存**：静态带哈希资源（`/assets/`）设置 1 年长效缓存 (`immutable`)，HTML 页面设置协商缓存。
6. **安全响应头**：注入 `X-Content-Type-Options: nosniff`、`X-Frame-Options: SAMEORIGIN`、`Strict-Transport-Security` 等企业级安全头。

---

## 四、Nginx 生产服务器备选配置（若从 Apache 迁移）

如果您未来打算将静态网站迁移到 Nginx，只需在 Nginx 的 `server` 块中配置如下伪静态与静态规则：

```nginx
server {
    listen 80;
    server_name huangguoai.run www.huangguoai.run;
    return 301 https://huangguoai.run$request_uri;
}

server {
    listen 443 ssl http2;
    server_name huangguoai.run;

    root /var/www/html;
    index index.html;

    # SSL 证书配置
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;

    # Clean URLs 伪静态重写核心规则
    location / {
        try_files $uri $uri.html $uri/ /404.html;
    }

    # 静态资产长效缓存与 Gzip
    location ~* \.(js|css|wasm|woff2|png|jpg|jpeg|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # HTML 协商缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 错误页
    error_page 404 /404.html;
}
```

---

## 五、搜索引擎提交与 SEO 收录加速

部署上线后，请立即前往各大搜索引擎提交站点地图，加速 374 篇页面的收录与权重传递：

1. **Google Search Console**：
   - 添加属性：`https://huangguoai.run`
   - 提交 Sitemap 路径：`https://huangguoai.run/sitemap.xml`
2. **百度搜索资源平台**：
   - 验证网站归属权（通过文件验证或 HTML 标签验证）。
   - 在“普通收录 -> 资源提交 -> sitemap”中提交 `https://huangguoai.run/sitemap.xml`。
3. **Bing Webmaster Tools**：
   - 直接通过 Google Search Console 账号一键导入同步，自动抓取 `sitemap.xml`。
4. **`robots.txt` 检查**：
   - 浏览器直接访问 `https://huangguoai.run/robots.txt`，确认正常返回以下内容：
     ```text
     User-agent: *
     Allow: /
     Sitemap: https://huangguoai.run/sitemap.xml
     ```

---

## 六、日常内容维护与扩充指南

### 6.1 新增文章规范
当未来需要为某个三级集群增加新文章时：
1. 在对应目录新建 `.md` 文件（如 `docs/ai-drama/workflow/script/my-new-article.md`）。
2. 在文件头部添加标准 Frontmatter：
   ```yaml
   ---
   title: 文章标题 - 黄果短剧AI指南
   description: 核心主词与精准摘要（不超过120字）
   keywords: 核心关键词1, 关键词2, 关键词3
   lastUpdated: 2026-09-26
   ---
   ```
3. 遵循本站统一的 **GEO 6段式结构**（直接答案卡片、底层机制、步骤模板、量化指标、避坑清单、FAQ、内链推荐）。

### 6.2 挂载与全网更新
1. 将新文章链接追加到对应集群的 `index.md` 卡片网格中。
2. 在 `docs/.vitepress/config.ts` 对应侧边栏追加该文章导航项。
3. 运行 `npm run docs:build`，系统会自动更新编译 HTML、重新生成 `sitemap.xml` 并将新文章纳入 Pagefind 搜索索引中。
4. 将重新生成的 `dist/` 覆盖上传服务器即可。
