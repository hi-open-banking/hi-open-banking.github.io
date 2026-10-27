---
title: Versioning & changes
description: Version numbering rules, compatibility commitments, and change log.
---

## Version numbers

The API version is part of the path, for example `/v1`. Version numbers in the documentation match the API paths.

- **Major**: incompatible changes, released as a new path version.
- **Minor**: new fields or endpoints, backward compatible.
- **Patch**: documentation fixes and additional error codes, with no change to API behavior.

## Compatibility commitment

Within the same major version, we commit to:

- Not removing or renaming existing fields
- Not changing the type or meaning of existing fields
- Clients ignoring unknown fields when new fields are added

## Change log

### 2026-10

- Added the `X-Sandbox-Scenario` sandbox header
- Payments API supports the `CANCELLED` status

### 2026-08

- Added the `remittance_information` field to the Transactions API
- Added `request_id` to all error responses

:::note
To subscribe to change notifications, enable the "Documentation updates" email alert in the developer portal to learn about API changes as soon as they are announced.
:::
