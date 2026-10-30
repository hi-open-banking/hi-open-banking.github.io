// 容易被误认为官方文档的页面分区：API 参考、认证与授权、规范说明。
// 这些页面会在正文前统一显示“个人研究总结，非官方标准”的提示框。
// 维护时只需增删这里的路径前缀，不需要修改各个 Markdown 文件。
const RESEARCH_NOTICE_PREFIXES = ['api', 'guides/authentication', 'standards'] as const;

/** 去掉语言前缀（如 zh-cn/），得到不区分语言的文档路径 */
export function normalizeEntryId(id: string): string {
  return id.replace(/^zh-cn\//, '');
}

/** 该页面是否需要在正文前显示“非官方”提示 */
export function needsResearchNotice(id: string): boolean {
  const path = normalizeEntryId(id);
  return RESEARCH_NOTICE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}
