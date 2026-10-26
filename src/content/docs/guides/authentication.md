---
title: 认证与授权
description: OAuth 2.0 授权码流程、PKCE、令牌刷新与撤销。
---

所有 API 请求都必须携带访问令牌。令牌通过 OAuth 2.0 授权码流程获取，公共客户端必须使用 PKCE。

## 授权流程

1. 应用将用户重定向到授权端点，并携带 `client_id`、`redirect_uri`、`scope` 与 `state`。
2. 用户在银行页面完成身份验证，并确认授权范围。
3. 银行将授权码回调到 `redirect_uri`。
4. 应用在服务端用授权码换取访问令牌。

```text
应用 ──授权请求──▶ 授权服务器 ──登录/授权──▶ 用户
应用 ◀──授权码──── 授权服务器
应用 ──换取令牌──▶ 令牌端点 ──▶ access_token + refresh_token
```

## 刷新令牌

访问令牌默认有效期为 1 小时。过期后使用 `refresh_token` 换取新令牌，无需再次打扰用户。

```bash
curl -X POST https://api.openbanking.org.cn/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=$REFRESH_TOKEN" \
  -d "client_id=$CLIENT_ID"
```

:::tip
刷新令牌是一次性使用的。每次刷新都会返回新的 `refresh_token`，请以最新值为准并持久化。
:::

## 授权范围

| scope | 说明 |
| --- | --- |
| `accounts` | 读取账户基本信息 |
| `balances` | 读取账户余额 |
| `transactions` | 读取交易明细 |
| `payments` | 发起支付指令 |

## 撤销授权

用户可以在银行应用中随时撤销授权。应用侧应监听撤销事件，并删除本地保存的令牌。

```bash
curl -X POST https://api.openbanking.org.cn/oauth/revoke \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=$ACCESS_TOKEN" \
  -d "client_id=$CLIENT_ID"
```
