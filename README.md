# ABIT — AL Baraka International Trading

Plateforme de commerce international **Chine ↔ Sénégal**.

Deux services principaux :
1. **Échange de fonds** (Wave / Orange Money ↔ Alipay / WeChat Pay) — traitement manuel sécurisé
2. **Boutique** de produits chinois avec suivi de colis jusqu’au Sénégal

Application **mobile-first**, PWA, Firebase (Auth + Firestore + Storage).

---

## Structure du projet

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
├── admin/                  # Application administrateur
│   ├── index.html          # Tableau de bord
│   ├── exchanges.html      # (à venir)
│   ├── orders.html         # (à venir)
│   ├── products.html       # (à venir)
│   ├── tracking.html       # (à venir)
│   ├── customers.html      # (à venir)
│   └── settings.html       # (à venir)
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

1. Active **Authentication** → Email/Password
2. Crée une base **Firestore** (mode production)
3. Active **Storage**
4. Déploie les règles :
   ```bash
   firebase deploy --only firestore:rules,storage
   ```
5. (Optionnel) Configure Hosting avec deux targets (`client` et `admin`)

### Créer le premier administrateur

1. Inscris-toi via l’application client (`register.html`) ou crée un compte dans la console Firebase Authentication.
2. Dans Firestore, ouvre le document `users/{uid}` correspondant.
3. Change le champ `role` de `"client"` à `"admin"`.
4. Connecte-toi ensuite sur `/admin/`.

**Important :** un client ne peut jamais s’attribuer le rôle admin lui-même (règles Firestore).

---

## Lancement local

```bash
# Installer Firebase CLI si besoin
npm install -g firebase-tools
firebase login
firebase use abit-d927a

# Servir les fichiers (ou ouvrir directement client/index.html)
npx serve client
# ou
firebase serve --only hosting
```

Pour l’admin : ouvrir `admin/index.html` (ou configurer un second target Hosting).

---

## Identité visuelle

- **Vert profond** `#0B3D2E` → confiance
- **Or** `#C9A227` → premium
- **Blanc / gris clair** → clarté
- Design minimaliste, mobile-first, navigation basse type application bancaire

---

## État actuel (31 oct. 2026)

### Terminé
- Dépôt GitHub créé et public
- Architecture client / admin / shared
- Design system CSS complet
- Configuration Firebase + règles de sécurité strictes
- Page d’accueil client (deux services + taux)
- Authentification client (inscription / connexion / reset)
- Tableau de bord admin avec protection par rôle
- Manifest PWA + Service Worker de base

### Prochaines étapes prioritaires
1. Service **Boutique** (produits, panier, commandes, tracking)
2. Service **Échange** (calculateur, demandes, justificatifs, gestion admin)
3. Pages manquantes (profile, orders, etc.)
4. Cloud Functions pour calculs et notifications
5. Tests des parcours complets

---

## Sécurité

- Règles Firestore restrictives (pas d’accès public en écriture)
- Rôle admin contrôlé côté serveur / document
- Aucun secret dans le code frontend
- Justificatifs stockés dans des chemins privés Storage
- Calculs monétaires et validations sensibles à placer en Cloud Functions

---

## Licence & usage

Projet privé commercial d’AL Baraka International Trading.  
Ne pas présenter ABIT comme un établissement de paiement agréé tant que les autorisations nécessaires n’ont pas été obtenues.

---

**Contact projet :** Ahmed Said Aidara  
**Repo :** https://github.com/ahmedaidara/al-baraka-international-trading
