 # Deployment Checklist

## Local verification

- [ ] Install Node.js 20.9+
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Check all sidebar screens
- [ ] Test marketplace search and filters
- [ ] Create a demo listing
- [ ] Check mobile layout
- [ ] Run `npm run build`

## GitHub

- [ ] Create `hamlat-p2p-ecosystem`
- [ ] Check `.env` files are not staged
- [ ] Commit source
- [ ] Push to `main`
- [ ] Enable branch protection for collaborative work

## Vercel

- [ ] Import the GitHub repository
- [ ] Framework preset: Next.js
- [ ] Root directory: `./`
- [ ] Build command: `npm run build`
- [ ] No secrets required for the current prototype
- [ ] Deploy preview and inspect
- [ ] Promote only after review

## Before adding a backend

- [ ] Define API contracts and threat model
- [ ] Choose a managed PostgreSQL provider
- [ ] Add authentication and authorization
- [ ] Configure CORS for known frontend domains
- [ ] Store secrets in server-side environment variables
- [ ] Add structured logs, metrics and alerting
- [ ] Add backups and recovery tests

## Before any real-value functionality

- [ ] Legal and compliance review for target jurisdictions
- [ ] Independent smart contract and application security audits
- [ ] Wallet and signing threat model
- [ ] Incident response and recovery plan
- [ ] User disclosures and support process
- [ ] Controlled release with monitoring
