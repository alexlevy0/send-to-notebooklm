# Rapport de Tests - Sprint 2.5

**Date :** 2026-02-09
**Testeur :** Alex Lévy
**Environnement :** Chrome, Linux

## 🧪 Résultats des Tests Manuels

### ✅ Test 1 : Menu Contextuel
> **Scénario :** Sélectionner du texte -> Right-click -> "Send to NotebookLM"
- [ ] Menu contextuel apparaît
- [ ] Notification "Captured!" apparaît
- [ ] Texte visible dans NotebookLM
**Statut :** À VÉRIFIER
**Notes :**

### ✅ Test 2 : Storage Persistant
> **Scénario :** Sélectionner notebook -> Fermer popup -> Rouvrir popup
- [ ] Le dernier notebook est toujours sélectionné (border primary)
**Statut :** À VÉRIFIER
**Notes :**

### ✅ Test 3 : Notification Capture
> **Scénario :** Capture via popup
- [ ] Notification "Captured! ✓" apparaît
- [ ] Popup se ferme après délai
**Statut :** À VÉRIFIER
**Notes :**

### ✅ Test 4 : Icons Visibles
> **Scénario :** Vérifier chrome://extensions et toolbar
- [ ] Icon 128px visible dans settings
- [ ] Icon toolbar visible
**Statut :** À VÉRIFIER
**Notes :**

### ✅ Test 5 : Error Handling (Auth)
> **Scénario :** Déconnexion Google -> Ouvrir popup
- [ ] Message d'erreur clair (Missing cookie)
- [ ] Bouton Login présent
**Statut :** À VÉRIFIER
**Notes :**

### ✅ Test 6 : Menu Sans Notebook
> **Scénario :** Install fresh -> Pas de sélection -> Right-click send
- [ ] Notification "No Notebook Selected"
**Statut :** À VÉRIFIER
**Notes :**

## 🐛 Bugs Trouvés
*Aucun pour l'instant*

## Conclusion
- [ ] Prêt pour Sprint 3
