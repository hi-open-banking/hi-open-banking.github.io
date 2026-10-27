---
title: Webhook 通知
description: 接收并校验异步事件通知。
---

当授权、账户或支付状态发生变化时，平台会向应用配置的回调地址推送事件。

## 事件结构

```json
{
  "event_id": "evt_01J9Z3K4",
  "event_type": "payment.status_changed",
  "occurred_at": "2026-10-26T08:30:00Z",
  "data": {
    "payment_id": "pay_2b7d9f",
    "status": "SETTLED"
  }
}
```

## 校验签名

每个请求都带有 `X-Signature` 头，值为请求体与签名密钥的 HMAC-SHA256。必须先校验再处理。

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

function verify(body, signature, secret) {
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return (
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
}
```

## 重试策略

- 未返回 `2xx` 时按指数退避重试，最多 5 次。
- 处理逻辑必须幂等，以 `event_id` 去重。
- 回调处理应在 5 秒内返回，耗时任务请异步执行。

:::tip
建议在本地开发时使用内网穿透工具暴露回调地址，并在沙箱中验证签名与重试逻辑。
:::
