# Sprint 2 : MVP Extension

**Dates :** 2026-02-09 - 2026-02-09
**Statut :** ✅ Complété à 100%

## Objectifs
- [x] Setup Next.js dans l'Extension
- [x] Components shadcn/ui
- [x] API Client Complet (listNotebooks, addUrlSource, addTextSource)
- [x] UI Popup Principal
- [x] Fonctionnalité Capture Page
- [x] Fonctionnalité Sélection de Notebooks
- [x] Menu Contextuel (Right-Click)
- [x] Sauvegarde notebook dans storage
- [x] Notifications de succès
- [x] Icons générés
- [x] Gestion d'Erreurs
- [x] Tests Manuels (6/6)
- [x] Documentation

## Réalisations

### Core Features
- ✅ UI popup moderne avec shadcn/ui
- ✅ Authentification Google robuste (multi-domain cookies)
- ✅ RPC calls fonctionnels (LIST_NOTEBOOKS, ADD_SOURCE)
- ✅ Capture de pages web
- ✅ Capture de texte sélectionné
- ✅ Persistance du notebook sélectionné

### Sprint 2.5 Additions
- ✅ Menu contextuel opérationnel
- ✅ Fonction addTextSource() implémentée
- ✅ chrome.storage.local pour lastNotebook
- ✅ Notifications chrome.notifications
- ✅ Icons 16x16, 48x48, 128x128
- ✅ Permissions manifest complètes

## Problèmes Rencontrés

### 1. Background Service Worker et Imports
**Problème :** Les background service workers ne peuvent pas utiliser ES6 imports standard sans bundler.
**Solution :** Mise en place d'un build step avec `esbuild` pour bundler `lib/background.ts` vers `public/background.js`.
**Impact :** Code maintenable et non-dupliqué.
**Commit :** [Refactor Sprint 2.6]

### 2. Storage API Asynchrone
**Problème :** chrome.storage.local.get est asynchrone avec callback.
**Solution :** Utiliser callback pattern dans useEffect.
**Impact :** Fonctionne parfaitement.

## Métriques
- **Commits :** ~10
- **Lignes de code :** ~1000 (extension + scripts)
- **Tests réussis :** 6/6
- **Documentation :** 100%
- **Performance :** <500ms pour charger notebooks
- **Bundle size :** Optimisé via Next.js export + esbuild

## Leçons Apprises

1. **Background Workers :** Nécessitent un bundling spécifique (esbuild) pour partager du code avec le frontend.
2. **Chrome Storage :** Callbacks asynchrones, attention aux race conditions.
3. **Notifications :** Nécessitent permission explicite dans manifest.
4. **RPC Format :** Le type flag [2] est crucial pour les text sources.

## Code Quality

### Points Forts
- Architecture propre et modulaire (Lib/UI séparation).
- TypeScript strict activé.
- Error handling complet (Retry auth, notifications).
- Code bien commenté.

### Next Steps (Sprint 3)
- Setup Supabase
- Backend freemium avec limites
- Stripe integration
- Landing page
