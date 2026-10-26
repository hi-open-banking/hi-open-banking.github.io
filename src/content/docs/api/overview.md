---
title: API 概览
description: 基础地址、请求约定、分页、幂等与错误处理。
---

所有接口遵循统一的请求与响应约定。

## 基础地址

```text
https://api.openbanking.org.cn/v1
```

## 请求头

| 请求头 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer <access_token>` |
| `Content-Type` | 是 | `application/json`（表单接口除外） |
| `X-Request-Id` | 否 | 调用方生成的请求标识，便于链路追踪 |
| `Idempotency-Key` | 支付类必填 | 幂等键，建议使用 UUID v4 |

## 分页

列表接口使用 `page` 与 `page_size`，`page_size` 最大 100。

```json
{
  "data": [],
  "pagination": { "page": 1, "page_size": 20, "total": 0 }
}
```

## 错误响应

非 `2xx` 响应统一返回结构化错误：

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "账户不存在",
    "request_id": "req_01J9Z3K4"
  }
}
```

:::note
请以 `error.code` 做分支判断，`message` 仅用于展示，可能随语言或版本调整。
:::

## 版本策略

版本号位于路径中（`/v1`）。不兼容变更会发布新版本，旧版本至少维护 12 个月。
