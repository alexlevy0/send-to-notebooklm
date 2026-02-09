# Sprint 1 : POC & Reverse Engineering

**Dates :** 2026-02-09 - [END]
**Statut :** 🔄 En cours

## Objectifs
- [x] Valider l'accès à l'API NotebookLM
- [x] Extraire les tokens d'authentification
- [x] Faire un premier appel RPC réussi

## Réalisations
- [x] Création extension minimale
- [x] Auth Google fonctionnelle
- [x] RPC LIST_NOTEBOOKS testé
- [x] Documentation API complète

## Problèmes Rencontrés
- **Cookies manquants (SID)** : L'extension ne trouvait pas le cookie SID sur `notebooklm.google.com`.
  - *Solution* : Modifié `auth.js` pour chercher aussi sur `www.google.com` et `accounts.google.com`.
  - *Solution* : Accepté `__Secure-1PSID` comme alternative à `SID`.
- **Format RPC inattendu** : La réponse de `LIST_NOTEBOOKS` n'était pas celle prévue.
  - *Solution* : Analysé le JSON brut. Structure trouvée : `notebooks[0]` contient la liste, Titre à l'index 0, ID à l'index 2.

## Métriques
- Commits : 2
- Tests réussis : 3/3
- Documentation : 100%

## Leçons Apprises
- L'authentification Google via cookies dans une extension nécessite de scanner plusieurs domaines.
- Les cookies `__Secure-1PSID` sont souvent utilisés à la place de `SID`.
- La structure RPC de Google (« batchexecute ») est complexe et nécessite une inspection manuelle du JSON.

## Next Steps (Sprint 2)
- Créer l'UI popup avec Next.js
- Implémenter ADD_SOURCE
- Ajouter la sélection de notebooks
