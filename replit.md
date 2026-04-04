# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Conect-R Dashboard (`artifacts/conectr-dashboard`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview**: `/` (root)
- **Purpose**: Interactive Sales Dashboard showcasing Conect-R ecosystem for "Restaurante Maya"
- **Design**: Dark mode, gold/wood accents, Cinzel serif font (Maya-Elegant)
- **Modules**:
  1. Smart Table (NFC/QR) — stand visualizer + client portal simulator
  2. Gestion Operativa — Table Reserve + NextUp waitlist
  3. Digital Signage — TV screen simulator + 1-click content update
  4. Presencia Digital — Web Builder preview + AI Concierge chat
  5. Modulo Creativo — Menu templates + social content calendar
  6. Antes y Despues — Before/After comparison with Recharts graphs
- **Key packages**: framer-motion, recharts, lucide-react, wouter, radix-ui

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
