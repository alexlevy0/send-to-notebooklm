# 📊 Project Tracker - Send to NotebookLM

**Dernière mise à jour :** 2026-02-12

## 📈 Progression Globale

- [x] Sprint 1 : POC & Reverse Engineering (100%) ✅
- [x] Sprint 2 : MVP Extension (100%) ✅
- [x] Sprint 2.6 : Refactoring & Tech Debt (100%) ✅
- [x] Sprint 3 : Backend Freemium (100%) ✅
- [x] Sprint 3.5 : UI Limites Extension (100%) ✅
- [x] Sprint 4 : Landing Page (100%) ✅
- [x] Sprint 5 : Launch Preparation (100%) ✅
- [x] Sprint 6 : Bulk Operations (100%) ✅
- [x] Sprint 6.5 : UX Refinement & Global Selection (100%) ✅

## ️ Roadmap V1.x (Post-Launch) - Research OS

### 🟢 Actuel : Sprint 6 - Bulk & Workflow (V1.2)
**Statut : 100% terminé**
- [x] **Import en masse natif** : Refonte de l'API pour utiliser le mode batch (`izAoDd`).
- [x] **Quotas Bulk** : Support de l'incrémentation multi-sources dans Supabase.
- [ ] **Interface Batch** (UI de sélection multiple) -> Reporté au Sprint 6.5.mentation d'une `RequestQueue` pour éviter le Rate Limiting Google (délai séquentiel).
- [ ] UX : Détection de doublons (Indicateur "Déjà sauvegardé" basé sur `chrome.storage.local`).

### Sprint 7 : Quality & Context (V1.3)
*Objectif :* Résoudre le "Context Rot" et le "Dirty Data".
- [ ] Core : Intégration de `@mozilla/readability` pour nettoyer le HTML.
- [ ] Core : Conversion HTML vers Markdown (via `turndown`) avant envoi.
- [ ] UI : Champ "Note d'intention" dans la popup (ajouté en en-tête du contenu envoyé).

### Sprint 8 : Media & Resilience (V1.4)
*Objectif :* Marché étudiant et stabilité.
- [ ] Feature : Support des Playlists YouTube (Detection `list=` + Bulk send).
- [ ] Core : "Silent Refresh" des cookies (fetch background sur 401/403).
- [ ] UI : Indicateur de "Re-sync" si le contenu d'une page a changé depuis la dernière capture.

## 🔥 Sprint Actuel
**Sprint 7 - Context & Quality**
- Démarré : 2026-02-13
- Statut : Planning
- Bloqueurs : Aucun

## ✅ Achievements

### Sprint 6.5 (2026-02-12)
- ✅ **Sélection Globale** : Dialogue de recherche persistant pour le carnet cible.
- ✅ **Capture Manuelle** : Suppression de l'auto-capture/auto-close pour un flux plus maîtrisé.
- ✅ **Fix Layout** : Défilement fluide dans toutes les sections (Popup Chrome 500px).
- ✅ **Smart Trigger** : Ouverture auto du sélecteur si aucun carnet n'est choisi.

### Sprint 6 (2026-02-12)
- ✅ Support de l'import d'URLs en masse (RPC `izAoDd`).
- ✅ Interface de sélection d'onglets (Bulk Import).
- ✅ Migration SQL pour l'incrémentation précise des quotas.

### Sprint 5 (2026-02-11)
- ✅ Flow d'authentification robuste (Magic Links + OTP)
- ✅ Persistance de l'état d'auth
- ✅ Affichage de l'email utilisateur et Sign Out
- ✅ Webhook Stripe complet avec gestion des annulations
- ✅ Build final de l'extension testé

### Sprint 4 (2026-02-10)
- ✅ Landing page complète avec 10 sections
- ✅ Pricing visible (Free vs Pro)
- ✅ FAQ (9 questions)
- ✅ Before/After comparison
- ✅ Screenshots ajoutés
- ✅ Framer Motion animations
- ✅ SEO meta tags
- ✅ Mobile responsive

### Sprint 3.5 (2026-02-10)
- ✅ Usage indicator dans popup
- ✅ Modal upgrade quand limite atteinte
- ✅ Badge Pro dans header
- ✅ Check limites dans background.ts
- ✅ Increment usage après capture

### Sprint 3 (2026-02-09)
- ✅ Database schema complet (4 migrations)
- ✅ Logique SQL (check_limit, increment_usage)
- ✅ Stripe webhook fonctionnel
- ✅ Client Supabase intégré
- ✅ Auth anonyme

## 🐛 Bugs Connus
_Aucun bug critique_

## 🚀 Ready to Launch
- Extension : 100% ✅
- Backend : 100% ✅
- Landing Page : 100% ✅
- Tests Manuels : Terminé
- Chrome Web Store : En cours de review
- Product Hunt : En préparation

## 📊 Métriques (Pre-Launch)
- Développement : 11 jours
- Lignes de code : ~4800 (Total) / ~1800 (Extension) / ~3700 (Landing)
- Commits : 52
- Tests manuels : 34/34
- Documentation : 100%
