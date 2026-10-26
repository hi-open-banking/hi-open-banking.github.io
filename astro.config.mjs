// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 主站域名；GitHub Pages 构建时可通过 SITE_URL 覆盖
const SITE_URL = (process.env.SITE_URL || 'https://openbanking.org.cn').replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: '开放银行',
      description: '开放银行开发者文档：认证授权、账户信息、支付发起与 API 参考。',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/theme.css', './src/styles/content.css'],
      // 站点固定为浅色设计，隐藏主题切换器
      components: {
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: '开始',
          items: [
            { label: '简介', slug: 'getting-started/introduction' },
            { label: '快速开始', slug: 'getting-started/quickstart' },
          ],
        },
        {
          label: '指南',
          items: [
            { label: '认证与授权', slug: 'guides/authentication' },
            { label: '账户信息', slug: 'guides/account-information' },
            { label: '支付发起', slug: 'guides/payments' },
            { label: 'Webhook 通知', slug: 'guides/webhooks' },
            { label: '沙箱环境', slug: 'guides/sandbox' },
          ],
        },
        {
          label: 'API 参考',
          items: [
            { label: 'API 概览', slug: 'api/overview' },
            { label: '认证接口', slug: 'api/authentication' },
            { label: '账户接口', slug: 'api/accounts' },
            { label: '交易接口', slug: 'api/transactions' },
            { label: '支付接口', slug: 'api/payments' },
          ],
        },
        {
          label: '规范',
          items: [
            { label: '术语表', slug: 'standards/glossary' },
            { label: '错误码', slug: 'standards/errors' },
            { label: '版本与变更', slug: 'standards/versioning' },
          ],
        },
        {
          label: '关于',
          items: [{ label: '关于本站', slug: 'about' }],
        },
      ],
      expressiveCode: {
        themes: ['github-light'],
        styleOverrides: {
          borderRadius: '6px',
          borderColor: '#E5E7EB',
          codeBackground: '#F6F8FA',
          codeFontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          codeFontSize: '14px',
        },
      },
    }),
  ],
});
