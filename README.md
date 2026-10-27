# openbanking.org.cn

开放银行开发者文档站，基于 [Astro Starlight](https://starlight.astro.build/) 构建的纯静态站点。

## 环境

- Node.js 22+（本机使用 v24）
- Astro 7
- 构建产物在 `dist/`，可部署到任意静态托管服务

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 本地开发，默认 http://localhost:4321
npm run build        # 构建静态站点到 dist/
npm run preview      # 预览构建产物
npm run check        # Astro / TypeScript 类型检查
```

构建时关闭 Astro 遥测（`ASTRO_TELEMETRY_DISABLED=1`）。

## 目录结构

```
src/
  components/        组件覆盖（固定浅色主题、隐藏主题切换器）
  content.config.ts  docs 与 i18n 内容集合
  content/docs/      文档内容（Markdown / MDX）
    getting-started/ 开始
    guides/          指南
    api/             API 参考
    standards/       规范
  styles/
    theme.css        全局配色、字体、侧边栏、右侧目录、圆角
    content.css      文档正文、标题、代码块、提示框、表格
public/
  favicon.svg
```

## 导航

侧边栏在 `astro.config.mjs` 的 `starlight.sidebar` 中维护，分为「开始 / 指南 / API 参考 / 规范 / 关于」五组。新增页面后，在对应分组中补充 `slug` 即可出现在导航中。

## 设计规范

| 项目 | 值 |
| --- | --- |
| 背景 | `#FFFFFF` |
| 文字 | `#1A1A1A` |
| 链接 / 激活态 | `#0055CC` |
| 边框 | `#E5E7EB` |
| 正文字体 | Inter（中文回退系统字体） |
| 代码字体 | JetBrains Mono |
| 正文 | 16px / 1.7 |
| H2 | 24px / 600 |
| 侧边栏 | 固定 260px |
| 文档正文最大宽度 | 740px |
| 右侧目录 | ≥72rem 显示，窄屏隐藏 |
| 圆角 | 6px |
| 代码块 | 背景 `#F6F8FA`，字号 14px |
| 提示框 | Starlight note / tip / caution，左边框 3px |

站点固定为浅色主题：`ThemeProvider` 在首屏渲染前锁定 `data-theme="light"`，主题切换器不渲染。

## Cloudflare Workers 部署

仓库已改为私有，站点改用 Cloudflare Workers 的 Static Assets 部署，配置文件为 `wrangler.jsonc`（`assets.directory` 指向 `./dist`）。

在 Cloudflare Dashboard 创建 Worker 并连接本仓库后，按以下内容填写：

| 字段 | 填写内容 |
| --- | --- |
| Build command（构建命令） | `npm run build` |
| Deploy command（部署命令） | `npm run deploy` |
| Non-production branch deploy command（预览命令） | `npm run deploy:preview` |

对应的实际命令：

- 构建：`npm run build` → `astro build`
- 部署：`npm run deploy` → `wrangler deploy`
- 预览：`npm run deploy:preview` → `wrangler versions upload`

Cloudflare 会自动安装依赖（`npm ci`）并提供 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`，无需手动配置。Worker 名称固定在 `wrangler.jsonc` 的 `name` 字段：`openbanking-org-cn`。

### 自定义域名

在 Cloudflare 的 Worker → Settings → Domains & Routes 添加 `openbanking.org.cn`（域名需已托管在 Cloudflare）。`astro.config.mjs` 的 `site` 默认就是该域名，canonical 与 sitemap 无需额外设置。

### 本地预览

```bash
npm run build
npx wrangler dev
```

### 说明

原先的 GitHub Pages workflow（`.github/workflows/deploy.yml`）已移除：私有仓库在免费计划下无法使用 GitHub Pages，且部署目标已切换为 Cloudflare Workers。

## 内容约定

- 每页 frontmatter 至少包含 `title` 与 `description`。
- 提示框使用 Starlight 的 `:::note`、`:::tip`、`:::caution` 语法。
- 代码块使用带语言标记的围栏，例如 bash、json。
