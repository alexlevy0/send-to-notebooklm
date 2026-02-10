# Manual Test Checklist - Extension

## Setup
- [ ] Extension installée en mode développeur
- [ ] Logged in Google account avec NotebookLM access
- [ ] Au moins 2 notebooks existants dans NotebookLM

## Free Tier Tests
- [ ] Fresh install → Vérifie badge "Free Tier"
- [ ] Capture 1 page → Usage indicator "9/10 left"
- [ ] Capture 9 pages supplémentaires → "0/10 left"
- [ ] Essayer capture #11 → Modal upgrade apparaît
- [ ] Modal upgrade → Tous les bullets visibles
- [ ] Click "Upgrade Now" → Ouvre Stripe (nouveau tab)
- [ ] Click "Maybe Later" → Modal se ferme

## Pro Tier Tests (Nécessite upgrade Stripe test)
- [ ] User Pro → Badge "Pro" visible dans header
- [ ] User Pro → Pas de usage indicator
- [ ] User Pro → Captures illimitées (tester 20+)
- [ ] User Pro → Pas de modal upgrade

## Core Functionality Tests
- [ ] Click extension icon → Popup opens
- [ ] Notebooks list chargée (< 2s)
- [ ] Select notebook → Border devient indigo
- [ ] Capture page → Notification "Captured! ✓"
- [ ] Popup auto-close après 1.5s
- [ ] Right-click text → "Send to NotebookLM" visible
- [ ] Right-click → Select notebook remembered
- [ ] Context menu → Notification success

## Error Handling Tests
- [ ] Logged out Google → Error message clair
- [ ] Network offline → Error "Failed to load"
- [ ] Invalid notebook ID → Error handled
- [ ] Retry button fonctionne

## Storage & Persistence Tests
- [ ] Select notebook → Close popup → Reopen
- [ ] Last notebook toujours selected (border indigo)
- [ ] Refresh page → Storage persiste
- [ ] Context menu utilise last notebook

## Icons & UI Tests
- [ ] Icon 16x16 visible dans toolbar
- [ ] Icon 48x48 visible dans chrome://extensions
- [ ] Icon 128x128 visible dans details
- [ ] Dark mode fonctionne (si implémenté)

## Performance Tests
- [ ] Popup opens < 500ms
- [ ] Notebooks load < 2s
- [ ] Capture request < 3s
- [ ] Memory usage stable (check Chrome Task Manager)

## Edge Cases
- [ ] URL très longue (> 1000 chars)
- [ ] Page sans titre
- [ ] PDF capture
- [ ] YouTube video capture
- [ ] Text selection vide → Notification

## Notes
Date: 
Tester: 
Browser: Chrome 
OS: 
Bugs trouvés: 
