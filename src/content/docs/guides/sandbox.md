---
title: 沙箱环境
description: 沙箱地址、测试账户与模拟场景。
---

沙箱提供与生产一致的接口行为，但不涉及真实资金。所有测试数据会在每周日凌晨重置。

## 环境地址

| 环境 | 地址 |
| --- | --- |
| 沙箱 | `https://sandbox.api.openbanking.org.cn` |
| 生产 | `https://api.openbanking.org.cn` |

## 测试账户

沙箱预置了若干账户，可覆盖可用、冻结、关闭等状态：

| 账户 ID | 状态 | 余额 |
| --- | --- | --- |
| `acc_8f2c1d` | ENABLED | 12,800.00 CNY |
| `acc_3a9b7e` | DISABLED | 0.00 CNY |
| `acc_6c4d2f` | CLOSED | — |

## 模拟支付结果

在创建支付指令时附加 `X-Sandbox-Scenario` 头，可触发指定结果：

```bash
curl -X POST https://sandbox.api.openbanking.org.cn/v1/payments \
  -H "Authorization: Bearer $SANDBOX_TOKEN" \
  -H "Idempotency-Key: $UUID" \
  -H "X-Sandbox-Scenario: payment_rejected" \
  -H "Content-Type: application/json" \
  -d @payment.json
```

可用场景：`payment_accepted`、`payment_rejected`、`payment_pending`。

:::note
沙箱令牌与生产令牌互不通用。切换环境时请同时替换客户端凭据与 API 地址。
:::
