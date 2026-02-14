# Sprint 6 : Bulk Operations (V1.2)
 
 **Période :** 2026-02-12
 **Statut :** Terminé ✅
 
 ## Objectifs
 - Permettre l'envoi de plusieurs pages en une seule fois.
 - Gérer les quotas multi-sources.
 
 ## Checklist
 - [x] **API Core** : Refonte de `addUrlSource` pour supporter le mode batch natif (`izAoDd`).
 - [x] **SQL Layer** : Fonction `increment_capture_count` pour Supabase.
 - [x] **UI Bulk** : Nouvel onglet "Bulk Import" avec sélection par checkbox.
 - [x] **Permissions** : Ajout de `tabs` dans `manifest.json`.
 - [x] **Layout** : Fix scroll et overflow dans l'onglet Bulk.
