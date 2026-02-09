# 🧪 Tests API NotebookLM

## Authentification

### Cookies Requis
- [ ] SID
- [ ] HSID
- [ ] SSID
- [ ] APISID
- [ ] SAPISID

### Tokens Extraits
- [ ] CSRF Token (SNlM0e) : `____________`
- [ ] Session ID (FdrFJe) : `____________`

## Endpoints Testés

### ✅ LIST_NOTEBOOKS (wXbhsf)
**Date du test :** 2026-02-09
**Statut :** ✅ Validé
**Request :**
```json
{
  "method": "wXbhsf",
  "params": [null, null, null]
}
```
**Response Structure :**
```json
[
  [
    [
      "Notebook Title",   // Index 0
      [...],              // Index 1 (Sources?)
      "NOTEBOOK_ID",      // Index 2
      ...
    ]
  ]
]
```
**Notes :**
- `result[0]` contains the array of notebooks.
- Each notebook is an array.
- Title is at index `0`.
- ID is at index `2`.

### ❌ ADD_SOURCE (izAoDd) - URL
**Date du test :** [DATE]
**Statut :** ❌ Non testé
**Request :**
```json

```
**Response :**
```json

```
**Notes :**

### ❌ ADD_SOURCE (izAoDd) - Text
**Date du test :** [DATE]
**Statut :** ❌ Non testé
**Request :**
```json

```
**Response :**
```json

```
**Notes :**

## Erreurs Rencontrées

### [DATE] : [Description de l'erreur]
**Endpoint :**
**Status Code :**
**Message :**
**Solution :**
