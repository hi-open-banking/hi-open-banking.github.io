---
title: Authentication & authorization
description: OAuth 2.0 authorization code flow, PKCE, token refresh, and revocation.
---

Every API request must carry an access token. Tokens are obtained through the OAuth 2.0 authorization code flow, and public clients must use PKCE.

## Authorization flow

1. The application redirects the user to the authorization endpoint with `client_id`, `redirect_uri`, `scope`, and `state`.
2. The user authenticates on the bank's page and confirms the requested scope.
3. The bank redirects back to `redirect_uri` with an authorization code.
4. The application exchanges the authorization code for an access token on its server.

```text
App ──authorization request──▶ Authorization server ──login/consent──▶ User
App ◀──authorization code──── Authorization server
App ──token exchange──▶ Token endpoint ──▶ access_token + refresh_token
```

## Refresh tokens

Access tokens are valid for one hour by default. After they expire, use the `refresh_token` to obtain a new token without prompting the user again.

```bash
curl -X POST https://api.openbanking.org.cn/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=$REFRESH_TOKEN" \
  -d "client_id=$CLIENT_ID"
```

:::tip
Refresh tokens are single-use. Each refresh returns a new `refresh_token`; always persist the latest value.
:::

## Scopes

| Scope | Description |
| --- | --- |
| `accounts` | Read basic account information |
| `balances` | Read account balances |
| `transactions` | Read transaction details |
| `payments` | Initiate payment instructions |

## Revoke authorization

Users can revoke authorization at any time from their banking app. Your application should listen for revocation events and delete locally stored tokens.

```bash
curl -X POST https://api.openbanking.org.cn/oauth/revoke \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=$ACCESS_TOKEN" \
  -d "client_id=$CLIENT_ID"
```
