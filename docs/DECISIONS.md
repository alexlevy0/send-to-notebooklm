# 🧠 Décisions Techniques & Business

## Architectural Decisions

### 2026-02-09 : Choix du Modèle Freemium
**Décision :** Backend freemium avec extension open source
**Alternatives :** Extension fermée, Open Core
**Raison :** Confiance maximale (code visible) + contrôle monétisation
**Impact :** Backend Supabase requis, Edge Functions privées

### 2026-02-09 : Limites Gratuites
**Décision :** 10 captures/jour, 200/mois
**Alternatives :** 5/jour, 50/mois OU 20/jour, 500/mois
**Raison :** Balance entre usage raisonnable et conversion
**Impact :** ~30% d'users devraient upgrader

## Technical Decisions

### 2026-02-09 : Next.js pour le Popup
**Décision :** Utiliser Next.js au lieu de React pur
**Alternatives :** Vanilla JS, React CRA, Vite
**Raison :** Meilleure DX, shadcn/ui natif, build optimisé
**Impact :** Taille du bundle légèrement plus grande
