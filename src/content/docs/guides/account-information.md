---
title: 账户信息
description: 读取账户、余额与交易明细，处理分页与增量同步。
---

账户信息接口提供账户列表、余额和交易明细三类资源。所有资源都归属于当前令牌授权范围。

## 账户列表

```http
GET /v1/accounts?page=1&page_size=20
```

响应包含分页信息：

```json
{
  "data": [
    {
      "account_id": "acc_8f2c1d",
      "account_type": "CURRENT",
      "currency": "CNY",
      "status": "ENABLED"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 1
  }
}
```

## 查询余额

```http
GET /v1/accounts/{account_id}/balances
```

## 增量同步交易

交易明细数据量大，建议按 `from_booking_date` 增量拉取，并保存最后一次成功同步的时间点。

```bash
curl "https://api.openbanking.org.cn/v1/accounts/acc_8f2c1d/transactions?from_booking_date=2026-10-01" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

:::note
交易记录的 `booking_date` 可能因银行补录而回溯变化。对账场景建议同时保存 `transaction_id` 做幂等去重。
:::

## 字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `account_id` | string | 账户唯一标识 |
| `currency` | string | ISO 4217 货币代码 |
| `status` | string | `ENABLED`、`DISABLED`、`CLOSED` |
| `booking_date` | string | 记账日期，格式 `YYYY-MM-DD` |
