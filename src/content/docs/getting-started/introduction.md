---
title: Introduction
description: What the Open Banking platform does and how this documentation is organized.
---

Open Banking uses standardized APIs to let third-party services, with the user's consent, securely access bank account information, initiate payments, and retrieve transaction data within the authorized scope.

## Who this documentation is for

This documentation is for developers, architects, and product managers who need to integrate Open Banking capabilities. The following background is recommended:

- Familiarity with HTTP, JSON, and REST-style APIs
- Understanding of the OAuth 2.0 authorization code flow
- Ability to debug APIs with `curl` or any HTTP client

## Documentation structure

| Section | Contents |
| --- | --- |
| Getting started | Environment setup and your first API call |
| Guides | Authentication, accounts, payments, notifications, and the sandbox |
| API reference | Endpoints, parameters, responses, and error codes |
| Standards | Terminology, error codes, and versioning policy |

## API conventions

All APIs use HTTPS. Request and response bodies are JSON, and time fields use ISO 8601 format (UTC).

```http
GET /v1/accounts HTTP/1.1
Host: api.openbanking.org.cn
Authorization: Bearer <access_token>
```

:::note
The example domain `api.openbanking.org.cn` is for demonstration. Use the base URL issued for the sandbox or production environment when integrating.
:::
