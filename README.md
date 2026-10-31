# ABIT — AL Baraka International Trading

Plateforme de commerce international **Chine ↔ Sénégal**.

Deux services principaux :
1. **Échange de fonds** (Wave / Orange Money ↔ Alipay / WeChat Pay) — traitement manuel sécurisé
2. **Boutique** de produits chinois avec suivi de colis jusqu’au Sénégal

Application **client mobile-first**, PWA, Firebase (Auth + Firestore + Storage).

---

## Repos du projet

| Dépôt | Rôle |
|-------|------|
| **al-baraka-international-trading** (ce dépôt) | Application **client** |
| [abit-admin](https://github.com/ahmedaidara/abit-admin) | Application **administrateur** |

Les deux applications partagent le **même projet Firebase** : `abit-d927a`.

---

## Structure du projet (client)

```
al-baraka-international-trading/
├── client/                 # Application client (mobile-first)
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── exchange.html       # (à venir)
│   ├── shop.html           # (à venir)
│   ├── orders.html         # (à venir)
│   ├── tracking.html       # (à venir)
│   ├── profile.html        # (à venir)
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── icons/
├── shared/
│   ├── css/design-system.css
│   └── js/
│       ├── firebase-config.js
│       └── firebase-init.js
├── functions/              # Cloud Functions (à venir)
├── firebase.json
├── firestore.rules
├── storage.rules
├── firestore.indexes.json
└── docs/
```

---

## Configuration Firebase

**Projet :** `abit-d927a`

1. Authentication → Email/Password (déjà activé)
2. Firestore (mode production)
3. Storage
4. Déploie les règles :
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

### Créer le premier administrateur

1. Inscris-toi via l’application client (`register.html`) ou crée un compte dans Firebase Authentication.
2. Dans Firestore → `users/{uid}` → change le champ `role` de `"client"` à `"admin"`.
3. Connecte-toi ensuite sur le dépôt **abit-admin**.

Un client ne peut jamais s’attribuer le rôle admin lui-même.

---

## Lancement local

```bash
npm install -g firebase-tools
firebase login
firebase use abit-d927a

# Servir le client
npx serve client
# ou
firebase serve --only hosting
```

---

## Identité visuelle

- **Vert profond** `#0B3D2E` → confiance
- **Or** `#C9A227` → premium
- **Blanc / gris clair** → clarté
- Design minimaliste, mobile-first, navigation basse type application bancaire

---

## État actuel (31 oct. 2026)

### Terminé
- Dépôt client créé et public
- Dépôt admin séparé : [abit-admin](https://github.com/ahmedaidara/abit-admin)
- Design system CSS complet
- Configuration Firebase + règles de sécurité strictes
- Page d’accueil client (deux services + taux)
- Authentification client (inscription / connexion / reset)
- Manifest PWA + Service Worker de base

### Prochaines étapes prioritaires
1. Service **Boutique** (produits, panier, commandes, tracking)
2. Service **Échange** (calculateur, demandes, justificatifs)
3. Pages manquantes (profile, orders, etc.)
4. Cloud Functions pour calculs et notifications
5. Pages de gestion dans abit-admin

---

## Sécurité

- Règles Firestore restrictives
- Rôle admin contrôlé côté document + code
- Aucun secret dans le code frontend
- Justificatifs stockés dans des chemins privés Storage

---

**Contact projet :** Ahmed Said Aidara  
**Repo client :** https://github.com/ahmedaidara/al-baraka-international-trading  
**Repo admin :** https://github.com/ahmedaidara/abit-admin
