 # HAMLAT Architecture Notes

## Current prototype

```text
Browser
  └── Next.js / React UI
       ├── Overview
       ├── Marketplace (local sample state)
       ├── Trading preview (no execution)
       ├── Portfolio (sample data)
       ├── Network cards (static demo status)
       └── Security information
```

## Target architecture (future design)

```text
Web / Mobile clients
        |
   API Gateway
        |
  Identity & Access
        |
  Domain Services
  ├── Marketplace
  ├── Listing & Order State
  ├── Notifications
  ├── Analytics
  └── User Preferences
        |
  Data Layer
  ├── PostgreSQL
  ├── Redis
  └── Audit / Event Store
        |
  Chain Adapter Interfaces
  ├── EVM adapter
  │    ├── Ethereum
  │    ├── Polygon
  │    └── BNB Chain
  └── Solana adapter
        |
  Read-only RPC providers / Indexers
```

## Important boundaries

- Treat each blockchain adapter as an independent integration with explicit network identifiers.
- Never assume EVM and Solana account, transaction or finality semantics are interchangeable.
- Indexers should be idempotent and designed for retries, gaps and chain reorganizations.
- The UI should distinguish sample data, indexed observations, pending states and verified finality.
- Cross-chain messaging or settlement is out of scope for the frontend prototype and requires separate protocol threat modeling and independent review.

## Suggested API boundaries

- `GET /health`
- `GET /v1/networks`
- `GET /v1/marketplace/listings`
- `GET /v1/marketplace/listings/:id`
- `POST /v1/marketplace/listings` (authenticated, validated, rate-limited)
- `GET /v1/activity`
- `GET /v1/analytics/summary`

These are proposed interfaces only; no backend API is included in this ZIP.
