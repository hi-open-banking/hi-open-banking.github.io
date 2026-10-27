---
title: Quickstart
description: Complete your first authorization and API call in the sandbox.
---

This page walks you through a complete integration in about ten minutes: register an application, obtain a token, and read your account list.

## 1. Prepare your application

After creating an application in the developer portal, you receive a set of credentials:

- `client_id`: the application identifier, which may be public
- `client_secret`: the application secret, stored only on your server
- `redirect_uri`: the callback address after authorization completes

:::caution
`client_secret` must never appear in browsers, mobile app bundles, or public repositories. If you suspect a leak, reset it in the portal immediately.
:::

## 2. Obtain an access token

Exchange the authorization code for a token:

```bash
curl -X POST https://api.openbanking.org.cn/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=$AUTH_CODE" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "redirect_uri=$REDIRECT_URI"
```

Example success response:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "accounts transactions"
}
```

## 3. Read accounts

```bash
curl https://api.openbanking.org.cn/v1/accounts \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Next steps

- Read [Authentication & authorization](/guides/authentication/) to learn about token refresh and revocation.
- Read [Account information](/guides/account-information/) to learn about pagination and incremental sync.
