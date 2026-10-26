---
title: 认证接口
description: 授权、令牌与撤销端点。
---

## 授权端点

```http
GET /oauth/authorize
```

### 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `response_type` | 是 | 固定为 `code` |
| `client_id` | 是 | 应用标识 |
| `redirect_uri` | 是 | 必须与注册值完全一致 |
| `scope` | 是 | 空格分隔的权限列表 |
| `state` | 是 | 防 CSRF 的随机字符串 |
| `code_challenge` | 公共客户端必填 | PKCE 挑战值 |
| `code_challenge_method` | 公共客户端必填 | 固定为 `S256` |

## 令牌端点

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded
```

### 请求参数

| 参数 | 说明 |
| --- | --- |
| `grant_type` | `authorization_code` 或 `refresh_token` |
| `code` | 授权码（`authorization_code` 时必填） |
| `refresh_token` | 刷新令牌（`refresh_token` 时必填） |
| `client_id` | 应用标识 |
| `client_secret` | 机密客户端必填 |
| `code_verifier` | PKCE 校验值 |

### 响应

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "accounts transactions"
}
```

## 撤销端点

```http
POST /oauth/revoke
```

撤销成功后返回 `200`，重复撤销同样返回 `200`。
