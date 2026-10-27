---
title: Authentication API
description: Authorization, token, and revocation endpoints.
---

## Authorization endpoint

```http
GET /oauth/authorize
```

### Query parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `response_type` | Yes | Must be `code` |
| `client_id` | Yes | Application identifier |
| `redirect_uri` | Yes | Must exactly match the registered value |
| `scope` | Yes | Space-separated list of permissions |
| `state` | Yes | Random string to prevent CSRF |
| `code_challenge` | Required for public clients | PKCE challenge |
| `code_challenge_method` | Required for public clients | Must be `S256` |

## Token endpoint

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded
```

### Request parameters

| Parameter | Description |
| --- | --- |
| `grant_type` | `authorization_code` or `refresh_token` |
| `code` | Authorization code (required with `authorization_code`) |
| `refresh_token` | Refresh token (required with `refresh_token`) |
| `client_id` | Application identifier |
| `client_secret` | Required for confidential clients |
| `code_verifier` | PKCE verifier |

### Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "accounts transactions"
}
```

## Revocation endpoint

```http
POST /oauth/revoke
```

A successful revocation returns `200`; revoking the same token again also returns `200`.
