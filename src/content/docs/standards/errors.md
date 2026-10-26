---
title: 错误码
description: 常见错误码、含义与处理建议。
---

## 错误结构

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "缺少必填参数 amount",
    "request_id": "req_01J9Z3K4"
  }
}
```

## 通用错误码

| HTTP | code | 说明 | 处理建议 |
| --- | --- | --- | --- |
| 400 | `INVALID_REQUEST` | 请求参数不合法 | 按 `message` 修正参数 |
| 401 | `UNAUTHORIZED` | 缺少或无效的访问令牌 | 重新获取令牌 |
| 403 | `INSUFFICIENT_SCOPE` | 令牌权限不足 | 引导用户补充授权 |
| 404 | `RESOURCE_NOT_FOUND` | 资源不存在 | 检查 ID 与授权范围 |
| 409 | `IDEMPOTENCY_CONFLICT` | 幂等键被不同请求复用 | 更换幂等键 |
| 429 | `RATE_LIMITED` | 超出调用频率 | 按 `Retry-After` 退避 |
| 500 | `INTERNAL_ERROR` | 服务端异常 | 记录 `request_id` 后重试 |

## 支付相关

| code | 说明 |
| --- | --- |
| `PAYMENT_REJECTED` | 银行拒绝该笔支付 |
| `INSUFFICIENT_FUNDS` | 账户余额不足 |
| `PAYMENT_NOT_CANCELLABLE` | 当前状态不允许取消 |
| `ACCOUNT_NOT_PAYABLE` | 付款账户状态异常 |

:::caution
`INTERNAL_ERROR` 不要立即重试。建议至少等待 1 秒，并使用相同的 `Idempotency-Key`。
:::
