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

## GitHub Pages 部署

- 仓库：`hi-open-banking/hi-open-banking.github.io`（public）
- 默认地址：`https://hi-open-banking.github.io`
- 工作流：`.github/workflows/deploy.yml`，推送到 `main` 后自动构建并发布

### 独立登录（不影响本机其他 GitHub 账号）

本项目的 `gh` 凭据保存在 `.gh-config/`，已加入 `.gitignore`：

```bash
cd openbanking.org.cn
GH_CONFIG_DIR="$PWD/.gh-config" gh auth login --hostname github.com --git-protocol https --web
GH_CONFIG_DIR="$PWD/.gh-config" gh auth status
```

仓库级 Git 身份已在 `.git/config` 中设置为 `hi-open-banking` / `hi-open-banking@users.noreply.github.com`。

仓库还配置了本地 credential helper，`git push` / `git fetch` 会自动使用 `.gh-config/` 中的 hi-open-banking 凭据，不会落到全局 Git 账号：

```bash
git config --local credential.helper
```

### 首次建仓

```bash
GH_CONFIG_DIR="$PWD/.gh-config" gh repo create hi-open-banking.github.io \
  --public --source=. --remote=origin --push

# 启用 Pages（GitHub Actions 作为构建源）
GH_CONFIG_DIR="$PWD/.gh-config" gh api \
  -X POST repos/hi-open-banking/hi-open-banking.github.io/pages \
  -f build_type=workflow
```

工作流运行成功后，`main` 分支的每次推送都会更新站点。

### 自定义域名

在 `public/CNAME` 写入 `openbanking.org.cn` 并配置 DNS 后，Pages 会使用该域名；同时可在工作流中设置 `SITE_URL=https://openbanking.org.cn` 以保持 canonical 与 sitemap 一致。

## 内容约定

- 每页 frontmatter 至少包含 `title` 与 `description`。
- 提示框使用 Starlight 的 `:::note`、`:::tip`、`:::caution` 语法。
- 代码块使用带语言标记的围栏，例如 bash、json。
