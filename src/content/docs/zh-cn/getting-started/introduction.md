---
title: 简介
description: 开放银行平台能做什么，以及本文档的组织方式。
---

开放银行（Open Banking）通过标准化 API，让经过用户授权的第三方服务安全地访问银行账户信息、发起支付，并在授权范围内获取交易数据。

## 本文档适合谁

本文档面向需要接入开放银行能力的开发者、架构师与产品经理。阅读前建议具备以下基础：

- 熟悉 HTTP、JSON 与 REST 风格接口
- 了解 OAuth 2.0 授权码流程
- 能够使用 `curl` 或任意 HTTP 客户端调试接口

## 文档结构

| 章节 | 内容 |
| --- | --- |
| 开始 | 环境准备与第一个 API 调用 |
| 指南 | 认证、账户、支付、通知与沙箱 |
| API 参考 | 端点、参数、响应与错误码 |
| 规范 | 术语、错误码与版本策略 |

## 接口约定

所有接口均使用 HTTPS，请求与响应体为 JSON，时间字段采用 ISO 8601 格式（UTC）。

```http
GET /v1/accounts HTTP/1.1
Host: api.openbanking.org.cn
Authorization: Bearer <access_token>
```

:::note
文档中的示例域名 `api.openbanking.org.cn` 为演示地址，实际接入地址以沙箱或生产环境下发为准。
:::
