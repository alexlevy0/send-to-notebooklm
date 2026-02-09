# Sprint 2.6: Tech Debt & Refactoring

**Date:** 2026-02-09
**Status:** ✅ Completed

## Objectifs
Assainir la codebase avant d'attaquer le Backend (Sprint 3). Réduire la duplication de code et renforcer la robustesse (auth, sécurité).

## ✅ Réalisations

### 1. De-duplication du Background Script
- **Avant :** `public/background.js` était une copie manuelle de `lib/api.ts` et `lib/auth.ts`. Risque de désynchronisation élevé.
- **Après :** Création de `lib/background.ts` qui importe directement les modules partagés.
- **Tooling :** Mise en place d'un script `scripts/build-background.js` utilisant `esbuild` pour bundler le TypeScript en un fichier `public/background.js` optimisé.

### 2. Stratégie de Retry pour l'Auth
- **Problème :** En cas d'expiration de session (401/403), l'appel RPC échouait silencieusement ou levait une erreur.
- **Solution :** Implémentation d'une logique de retry dans `rpc.ts`.
  - Si 401/403 -> `getAuthTokens(true)` (force refresh).
  - Retry automatique de la requête RPC (max 1 fois).

### 3. Typage & Code Cleanup
- **Types :** Ajout des interfaces `RpcResponseEnvelope` et `ListNotebooksResponseItem` pour réduire l'usage de `any`.
- **Cleanup :** Suppression du code mort dans `rpc.ts` (ancienne logique de construction d'URL non utilisée).

## Métriques
- **Fichiers modifiés :** `lib/notebooklm/rpc.ts`, `lib/background.ts`, `package.json`
- **Nouveau fichier :** `scripts/build-background.js`
- **Build time :** ~1.5s (esbuild est très rapide)

## Impact sur le Sprint 3
La base est maintenant saine pour intégrer Supabase et Stripe. Le background worker est maintenable et l'authentification est plus résiliente.
