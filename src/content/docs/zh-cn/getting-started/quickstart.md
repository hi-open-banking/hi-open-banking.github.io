---
title: 快速开始
description: 在沙箱环境中完成第一次授权与 API 调用。
---

本页用大约十分钟带你完成一次完整的调用：注册应用、获取令牌、读取账户列表。

## 1. 准备应用

在开发者门户创建应用后，你会得到一组凭据：

- `client_id`：应用标识，可公开
- `client_secret`：应用密钥，仅保存在服务端
- `redirect_uri`：授权完成后的回调地址

:::caution
`client_secret` 不得出现在浏览器、移动端安装包或公开仓库中。若怀疑泄露，请立即在门户重置。
:::

## 2. 获取访问令牌

使用授权码模式换取令牌：

```bash
curl -X POST https://api.openbanking.org.cn/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=$AUTH_CODE" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "redirect_uri=$REDIRECT_URI"
```

成功响应示例：

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "accounts transactions"
}
```

## 3. 读取账户

```bash
curl https://api.openbanking.org.cn/v1/accounts \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## 下一步

- 阅读[认证与授权](/zh-cn/guides/authentication/)，了解令牌刷新与撤销。
- 阅读[账户信息](/zh-cn/guides/account-information/)，了解分页与增量同步。
