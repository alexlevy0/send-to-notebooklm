# 🚀 Launch Checklist - Send to NotebookLM

## 📦 Pre-Launch (1-2 jours)

### Code Quality
- [ ] Tous les tests manuels passent (25/25)
- [ ] Aucun console.error en production
- [ ] Bundle size optimisé (< 500KB extension)
- [ ] Performance lighthouse > 90

### Extension Chrome
- [ ] Manifest.json version = 1.0.0
- [ ] Icons 16, 48, 128 présents
- [ ] Description claire (< 132 chars)
- [ ] Screenshots x5 prêts (1280x800px)
- [ ] Privacy policy lien valide
- [ ] Support email configuré
- [ ] Build final testé en mode production

### Backend
- [ ] Supabase projet en production (pas test)
- [ ] RLS policies activées
- [ ] Stripe en mode live (pas test)
- [ ] Webhook endpoint configuré
- [ ] Secrets/env vars configurés
- [ ] Database backup configuré

### Landing Page
- [ ] Domain configuré (send-to-notebooklm.com)
- [ ] SSL actif (HTTPS)
- [ ] Analytics installé (GA4 ou Plausible)
- [ ] SEO meta tags OK
- [ ] OG image créé (1200x630px)
- [ ] Tous les links fonctionnels
- [ ] Mobile testé (iPhone, Android)
- [ ] Forms de contact testés

### Legal
- [ ] Privacy Policy créée et publiée
- [ ] Terms of Service créés et publiés
- [ ] GDPR compliant (EU users)
- [ ] Cookie banner (si analytics)

## 🎯 Launch Day

### Chrome Web Store Submission
- [ ] Se connecter au Chrome Developer Dashboard
- [ ] Upload extension.zip
- [ ] Remplir formulaire détaillé :
  - [ ] Description courte (< 132 chars)
  - [ ] Description longue (features, screenshots)
  - [ ] Category: Productivity
  - [ ] Language: English
  - [ ] Upload 5 screenshots
  - [ ] Upload promo tile (440x280px)
  - [ ] Upload small tile (128x128px)
- [ ] Privacy disclosure:
  - [ ] "This extension does not collect user data"
  - [ ] Link to privacy policy
- [ ] Submit for review
- [ ] Attendre 1-3 jours (review Google)

### Product Hunt Launch
- [ ] Créer compte Product Hunt (si pas déjà)
- [ ] Préparer assets :
  - [ ] Logo 240x240px
  - [ ] Gallery images x4-6
  - [ ] Demo video (< 2min, optionnel)
- [ ] Rédiger description (< 260 chars)
- [ ] Ajouter tagline accrocheur
- [ ] Topics: Productivity, Chrome Extensions, AI
- [ ] Launch à 00:01 PST (optimal)
- [ ] Préparer 1st comment (maker comment)
- [ ] Invite friends à upvote

### Social Media
- [ ] Post Twitter/X avec demo GIF
- [ ] Post LinkedIn avec cas d'usage
- [ ] Post Reddit r/notebooklm (respecter rules)
- [ ] Post HackerNews "Show HN" (si traction PH)
- [ ] Update GitHub README avec links

### Monitoring
- [ ] Set up error tracking (Sentry ou Rollbar)
- [ ] Monitor Supabase logs
- [ ] Monitor Stripe dashboard
- [ ] Check Chrome Web Store reviews
- [ ] Check Product Hunt comments

## 📈 Post-Launch (Semaine 1)

### Day 1-2
- [ ] Répondre à tous les comments Product Hunt
- [ ] Répondre aux reviews Chrome Store
- [ ] Fix bugs urgents si découverts
- [ ] Monitor analytics (users, conversions)

### Day 3-5
- [ ] Collecter feedback users
- [ ] Triage bugs/feature requests
- [ ] Update roadmap selon feedback
- [ ] Write blog post "Launch retrospective"

### Day 6-7
- [ ] Analyser métriques semaine 1 :
  - [ ] Installs Chrome Store
  - [ ] Active users (DAU)
  - [ ] Conversion free → pro (%)
  - [ ] Churn rate
  - [ ] Top feature requests
- [ ] Plan Sprint 6 (iterations)

## 🎉 Success Metrics

### Week 1 Goals
- 100+ Chrome Store installs
- 50+ active daily users
- 5+ Pro conversions
- 4.5+ stars Chrome Store
- Top 5 Product Hunt day

### Month 1 Goals
- 500+ Chrome Store installs
- 200+ active daily users
- 20+ Pro conversions (€60 MRR)
- 50+ GitHub stars
- Featured on 2+ tech blogs

## 📞 Support Channels

### Free Users
- GitHub Issues: https://github.com/alexlevy0/send-to-notebooklm/issues
- Response time: Best effort (24-48h)

### Pro Users
- Email: support@send-to-notebooklm.com
- Response time: Guaranteed 24h

## 🛠️ Rollback Plan

Si bug critique post-launch :
1. Rollback Vercel deployment (landing page)
2. Unpublish Chrome extension temporairement
3. Fix bug en local
4. Test exhaustif
5. Re-deploy
6. Communicate aux users (email + social)

---

**Remember:** Launch is just the beginning. Iterate based on feedback! 🚀
