 # HAMLAT — Multi-chain P2P Ecosystem

A responsive Next.js dashboard prototype for a multi-chain peer-to-peer marketplace and decentralized exchange experience.

> **Important:** This repository is a UI/UX and workflow prototype. It uses illustrative sample data and local in-memory state. It does not connect to a wallet, submit blockchain transactions, execute trades, hold assets, provide escrow, or process payments. Do not use it to handle real funds.

## Included features

- Dark, responsive HAMLAT dashboard
- Overview cards and illustrative market chart
- P2P marketplace with search, network and Buy/Sell filters
- Create demo listing modal (local state only)
- Trading terminal preview with simulated order-entry controls
- Portfolio allocation view with sample values
- Network cards for Ethereum, Polygon, Solana and BNB Chain
- Analytics, activity history and security center screens
- Mobile navigation and toast notifications
- Vercel-ready Next.js project configuration

## Technology

- Next.js App Router
- React 19
- TypeScript
- Custom CSS design system
- Lucide React icons

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer (or a compatible package manager)

## Run locally

```bash
# 1. Extract the ZIP and enter the project folder
cd hamlat-p2p-ecosystem

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

The `build` command performs the Next.js production build. Fix any reported type or build errors before deployment.

## Deploy to Vercel

1. Create a GitHub repository named `hamlat-p2p-ecosystem`.
2. Extract this ZIP locally.
3. From the project directory, initialize and push the repository:

```bash
git init
git add .
git commit -m "Initial HAMLAT ecosystem prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hamlat-p2p-ecosystem.git
git push -u origin main
```

4. Sign in to Vercel and choose **Add New → Project**.
5. Import `hamlat-p2p-ecosystem` from GitHub.
6. Keep the framework preset as **Next.js** and the root directory as `./`.
7. No environment secrets are required for this demo. You may copy `.env.example` values into Vercel if desired.
8. Deploy. Vercel will run the install and build commands defined by the project.

For future releases, enable GitHub branch protection and use Preview Deployments before promoting changes to production.

## Project structure

```text
hamlat-p2p-ecosystem/
├── app/
│   ├── globals.css       # Full responsive theme and component styling
│   ├── layout.tsx        # Root layout, metadata and global CSS import
│   └── page.tsx          # Dashboard, navigation, demo workflows and UI state
├── .env.example          # Safe environment variable template
├── .gitignore            # Excludes build output, dependencies and secrets
├── next-env.d.ts         # Next.js TypeScript declarations
├── next.config.ts        # Next.js configuration
├── package.json          # Scripts and project dependencies
├── tsconfig.json         # TypeScript compiler configuration
├── vercel.json           # Vercel build configuration
└── README.md             # Setup, deployment and file documentation
```

## File-by-file explanation

### `app/page.tsx`
The main client-side dashboard. It contains:
- Sidebar navigation and responsive mobile menu
- Overview cards, network status and illustrative chart
- Marketplace listing table and filters
- Local demo listing creation form
- Trading terminal preview
- Portfolio, networks, analytics, activity and security views

All listing creation and notifications remain in browser memory. Reloading the page resets the sample state.

### `app/globals.css`
Contains the HAMLAT visual system: dark palette, spacing, typography, panels, buttons, data tables, responsive breakpoints, modal and toast styling.

### `app/layout.tsx`
Defines the document shell and SEO metadata.

### `package.json`
Defines project scripts and runtime/development dependencies.

### `tsconfig.json`
Enables strict TypeScript checking and the `@/*` import alias.

### `next.config.ts`
Enables React strict mode and provides the Next.js configuration entry point.

### `next-env.d.ts`
Provides Next.js type declarations.

### `.env.example`
Documents the public demo-mode variables and future backend placeholders. It contains no credentials.

### `.gitignore`
Prevents dependencies, build artifacts and local secrets from being committed.

### `vercel.json`
Declares the Next.js framework and standard install/build commands for Vercel.

## Product architecture — recommended next steps

The current project is a frontend prototype. A production-grade system would require separate, reviewed services:

1. **Identity and access:** secure authentication, session handling and role-based authorization.
2. **Marketplace API:** validated listing creation, moderation, expiry and order-state management.
3. **Database:** PostgreSQL schema, migrations, backups and audit records.
4. **Network adapters:** isolated read-only EVM and Solana integrations with chain-specific validation.
5. **Indexing:** resilient event ingestion, reorg handling and confirmation tracking.
6. **Observability:** structured logs, metrics, tracing and incident alerts.
7. **Security:** threat model, independent review, rate limits, abuse prevention and secure secrets management.
8. **Compliance:** qualified legal review for the jurisdictions and services in scope before enabling real-value exchange.

Do not put private keys, seed phrases, signing secrets, database credentials or privileged RPC credentials in browser code or `NEXT_PUBLIC_` variables. Do not treat a frontend status label as proof of on-chain settlement.

## Suggested repository milestones

- `v0.1.0` — UI prototype and responsive navigation
- `v0.2.0` — API contracts and persistent marketplace data
- `v0.3.0` — Read-only network data and indexer
- `v0.4.0` — Security, accessibility and load testing
- `v1.0.0` — Only after independent reviews and legal/compliance approval

## License

Choose and add a license before making the repository public. No license is included by default.
