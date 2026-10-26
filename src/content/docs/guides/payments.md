---
title: 支付发起
description: 创建付款指令、跟踪状态并保证幂等。
---

支付接口采用「创建指令 → 用户确认 → 执行」三段式流程。创建请求必须携带 `Idempotency-Key`。

## 创建付款指令

```bash
curl -X POST https://api.openbanking.org.cn/v1/payments \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 7d6f1c2e-4b8a-4c1d-9e2f-3a5b6c7d8e9f" \
  -d '{
    "debtor_account_id": "acc_8f2c1d",
    "creditor": {
      "name": "示例收款方",
      "account_number": "6222020202020202"
    },
    "amount": { "currency": "CNY", "value": "128.00" },
    "remittance_information": "订单 20261026001"
  }'
```

## 指令状态

| 状态 | 说明 |
| --- | --- |
| `PENDING` | 已创建，等待用户确认 |
| `ACCEPTED` | 银行已受理 |
| `SETTLED` | 已完成结算 |
| `REJECTED` | 被拒绝，需查看原因码 |

:::caution
处于 `PENDING` 或 `ACCEPTED` 的指令不可重复创建。重试时必须复用同一个 `Idempotency-Key`，否则可能产生重复付款。
:::

## 查询状态

```http
GET /v1/payments/{payment_id}
```

建议使用 Webhook 接收状态变更，并以轮询作为兜底。
