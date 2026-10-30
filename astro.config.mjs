// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 主站域名；需要时可通过 SITE_URL 覆盖
const SITE_URL = (process.env.SITE_URL || 'https://openbanking.org.cn').replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: 'OPEN-BANKING-LABS',
      description:
        'Unofficial personal learning project documenting Open Banking: authentication, account information, payment initiation, and API reference.',
      // 站点图标与顶栏品牌标识
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo-mark.svg',
        alt: 'OPEN-BANKING-LABS',
      },
      // 默认英文，中文位于 /zh-cn/
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/theme.css', './src/styles/content.css'],
      // 站点固定为浅色设计，隐藏主题切换器
      components: {
        Head: './src/components/Head.astro',
        Banner: './src/components/Banner.astro',
        Footer: './src/components/Footer.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Getting started',
          translations: { 'zh-CN': '开始' },
          items: [
            {
              label: 'Introduction',
              translations: { 'zh-CN': '简介' },
              slug: 'getting-started/introduction',
            },
            {
              label: 'Quickstart',
              translations: { 'zh-CN': '快速开始' },
              slug: 'getting-started/quickstart',
            },
          ],
        },
        {
          label: 'Guides',
          translations: { 'zh-CN': '指南' },
          items: [
            {
              label: 'Authentication & authorization',
              translations: { 'zh-CN': '认证与授权' },
              slug: 'guides/authentication',
            },
            {
              label: 'Account information',
              translations: { 'zh-CN': '账户信息' },
              slug: 'guides/account-information',
            },
            {
              label: 'Payment initiation',
              translations: { 'zh-CN': '支付发起' },
              slug: 'guides/payments',
            },
            {
              label: 'Webhooks',
              translations: { 'zh-CN': 'Webhook 通知' },
              slug: 'guides/webhooks',
            },
            {
              label: 'Sandbox',
              translations: { 'zh-CN': '沙箱环境' },
              slug: 'guides/sandbox',
            },
          ],
        },
        {
          label: 'API reference',
          translations: { 'zh-CN': 'API 参考' },
          items: [
            {
              label: 'API overview',
              translations: { 'zh-CN': 'API 概览' },
              slug: 'api/overview',
            },
            {
              label: 'Authentication API',
              translations: { 'zh-CN': '认证接口' },
              slug: 'api/authentication',
            },
            {
              label: 'Accounts API',
              translations: { 'zh-CN': '账户接口' },
              slug: 'api/accounts',
            },
            {
              label: 'Transactions API',
              translations: { 'zh-CN': '交易接口' },
              slug: 'api/transactions',
            },
            {
              label: 'Payments API',
              translations: { 'zh-CN': '支付接口' },
              slug: 'api/payments',
            },
          ],
        },
        {
          label: 'Standards',
          translations: { 'zh-CN': '规范' },
          items: [
            {
              label: 'Glossary',
              translations: { 'zh-CN': '术语表' },
              slug: 'standards/glossary',
            },
            {
              label: 'Error codes',
              translations: { 'zh-CN': '错误码' },
              slug: 'standards/errors',
            },
            {
              label: 'Versioning & changes',
              translations: { 'zh-CN': '版本与变更' },
              slug: 'standards/versioning',
            },
          ],
        },
        {
          label: 'About & disclaimer',
          translations: { 'zh-CN': '关于与免责声明' },
          items: [
            {
              label: 'About / disclaimer',
              translations: { 'zh-CN': '关于 / 免责声明' },
              slug: 'about',
            },
          ],
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
