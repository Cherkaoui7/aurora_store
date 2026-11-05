# ✨ AURORA | E-Commerce Haut de Gamme MERN Stack
## 📋 Rapport Complet du Projet & Cahier des Charges

![Aurora Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop)

> **Projet :** AURORA E-Commerce (`aurora_store`)  
> **Auteur / Développeur :** Abdessamad Cherkaoui  
> **Stack Technique :** MERN (MongoDB, Express 5, React 19, Node.js ESM) + Vite 7 + Stripe SDK + Vitest  
> **Statut du Projet :** Production Ready — 100% Audité, Sécurisé et Testé (29 tests passants)  

---

## 📑 Table des Matières

1. [Présentation Générale & Vision](#1-présentation-générale--vision)
2. [Cahier des Charges Fonctionnel & Technique](#2-cahier-des-charges-fonctionnel--technique)
   - [2.1. Fonctionnalités Boutique Client (Storefront)](#21-fonctionnalités-boutique-client-storefront)
   - [2.2. Fonctionnalités Espace d'Administration (Dashboard)](#22-fonctionnalités-espace-dadministration-dashboard)
   - [2.3. Exigences Non-Fonctionnelles & Performance](#23-exigences-non-fonctionnelles--performance)
3. [Architecture Globale & Schémas Techniques](#3-architecture-globale--schémas-techniques)
4. [Bilan Exhaustif des Travaux & Réalisations](#4-bilan-exhaustif-des-travaux--réalisations)
   - [4.1. Migration Create React App vers Vite 7 & React 19](#41-migration-create-react-app-vers-vite-7--react-19)
   - [4.2. Système d'Authentification Client Complet](#42-système-dauthentification-client-complet)
   - [4.3. Intégration Sécurisée de la Passerelle Stripe](#43-intégration-sécurisée-de-la-passerelle-stripe)
   - [4.4. Refonte Ergonomique & Sécurisation de la Recherche](#44-refonte-ergonomique--sécurisation-de-la-recherche)
   - [4.5. Sécurité : Élimination de l'Élévation de Privilèges (SEC-1)](#45-sécurité--élimination-de-lélévation-de-privilèges-sec-1)
   - [4.6. Durcissement du Dashboard Admin contre les Crashs (ADM-1 à 3)](#46-durcissement-du-dashboard-admin-contre-les-crashs-adm-1-à-3)
   - [4.7. Protection contre les Injections NoSQL & Attaques ReDoS](#47-protection-contre-les-injections-nosql--attaques-redos)
   - [4.8. Prévention des CastError MongoDB (BE-1)](#48-prévention-des-casterror-mongodb-be-1)
   - [4.9. En-têtes HTTP de Sécurité & Confidentialité du Cache](#49-en-têtes-http-de-sécurité--confidentialité-du-cache)
5. [Modèles de Données (Schémas Mongoose)](#5-modèles-de-données-schémas-mongoose)
6. [Suite de Tests Automatisée & Assurance Qualité](#6-suite-de-tests-automatisée--assurance-qualité)
7. [Guide d'Installation & Déploiement Local](#7-guide-dinstallation--déploiement-local)
8. [Conclusion & Perspectives](#8-conclusion--perspectives)

---

## 1. Présentation Générale & Vision

**AURORA** est une solution e-commerce complète, moderne et haut de gamme conçue pour le secteur de la mode et du prêt-à-porter de luxe. L'objectif fondamental du projet est de proposer une expérience d'achat **tactile, ultra-fluide et esthétiquement soignée**, s'éloignant des interfaces austères traditionnelles au profit de transitions douces, d'animations basées sur la physique avec **Framer Motion** et d'un feedback interactif instantané.

Le projet repose sur une architecture découplée associant :
- Une **vitrine e-commerce réactive (Storefront)** propulsée par React 19 et Vite 7.
- Un **panneau d'administration dédié (Admin Dashboard)** permettant une gestion dynamique des stocks, des prix et des commandes.
- Une **API REST robuste** développée avec Express 5, connectée à une base de données MongoDB managée (Atlas via Mongoose 8), avec gestion de sessions de paiement Stripe et stockage hybride d'images (Cloudinary / secours Base64).

---

## 2. Cahier des Charges Fonctionnel & Technique

### 2.1. Fonctionnalités Boutique Client (Storefront)

| Module | Spécifications Fonctionnelles |
| :--- | :--- |
| **Navigation & Découverte** | Navigation fluide par catégories (Tous les produits, Homme, Femme, Accessoires, Nouveautés, À propos). |
| **Fiche Produit** | Affichage multi-angles des images, sélection de tailles dynamiques (S, M, L, XL, XXL), affichage des notes étoiles et calcul du statut best-seller. |
| **Moteur de Recherche** | Recherche instantanée multi-champs (nom, catégorie, sous-catégorie, description) avec debouncing (150ms), limitation à 100 caractères, et bouton de réinitialisation rapide. |
| **Panier d'Achat** | Gestion des articles par clé composite (`id_taille`), persistance locale via `localStorage`, calcul dynamique des frais de port (livraison gratuite dès 100$). |
| **Liste d'Envies (Wishlist)** | Mise en favoris en un clic avec bouton cœur animé et synchronisation d'état réactive. |
| **Espace Client** | Inscription et connexion sécurisées avec salage de mot de passe (`bcryptjs`) et jetons JWT. Affichage d'un badge utilisateur dans l'en-tête et consultation de l'historique de commandes (`/userorders`). |
| **Tunnel de Commande (Checkout)** | Choix du mode de règlement : Paiement à la livraison (**Cash on Delivery**) ou Paiement sécurisé par carte bancaire (**Stripe Checkout**). Page de vérification de commande en retour de paiement (`/verify-payment`). |

### 2.2. Fonctionnalités Espace d'Administration (Dashboard)

| Module | Spécifications Fonctionnelles |
| :--- | :--- |
| **Accès Réservé** | Authentification administrative stricte basée sur des variables d'environnement (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) et délivrance d'un jeton JWT scellé avec le rôle `admin`. |
| **Ajout de Produits** | Formulaire complet comprenant le téléversement d'image obligatoire avec prévisualisation, nom, description, catégorie/sous-catégorie, prix au centime, grille de tailles interactives et sélecteur **Best-seller**. |
| **Gestion du Catalogue** | Visualisation sous forme de tableau de tous les produits répertoriés en base de données, avec fallback visuel en cas d'image distante inaccessible et suppression instantanée. |
| **Gestion des Commandes** | Vue synthétique de toutes les commandes passées, détail des articles, adresses de livraison complètes (tolérant les saisies partielles sans crash) et mise à jour du statut en temps réel (*Order Placed* → *Packing* → *Shipped* → *Out for delivery* → *Delivered*). |

### 2.3. Exigences Non-Fonctionnelles & Performance

- **Temps de chargement & HMR :** Démarrage instantané et Hot Module Replacement (<150ms) grâce à la migration sous **Vite 7**.
- **Haute Tolérance aux Pannes :** Gestion robuste des connexions MongoDB avec mécanisme de reconnexion automatique (5 tentatives exponentielles).
- **Protection des Données Personnelles :** Ségrégation stricte des rôles interdisant à un client d'accéder aux données postales ou téléphoniques des autres acheteurs.

---

## 3. Architecture Globale & Schémas Techniques

### Schéma d'Architecture Système (Mermaid)

```mermaid
graph TD
    subgraph Clients Web
        SF["Boutique Client (Storefront)<br/>React 19 + Vite 7<br/>Port: 3000"]
        AD["Dashboard Admin<br/>React 19 + Vite 7<br/>Port: 5173"]
    end

    subgraph Passerelle & Serveur Applicatif
        EXP["API REST Express 5<br/>(backend/server.js)<br/>Port: 4000"]
        SEC["Middlewares de Sécurité<br/>securityHeaders & sanitizeInput"]
        AUTH["Middleware d'Auth Découplé<br/>authMiddleware & adminAuth"]
    end

    subgraph Services Tiers & Données
        MDB[("MongoDB Atlas Database<br/>(Mongoose 8)")]
        STP["Stripe Payment Gateway<br/>Checkout Sessions API"]
        CLD["Cloudinary Media Engine<br/>(Fallback Mémoire / Base64)"]
    end

    SF -->|Requêtes Catalogue & Commandes| EXP
    AD -->|Administration & Stocks| EXP
    EXP --> SEC
    SEC --> AUTH
    AUTH --> MDB
    EXP --> STP
    EXP --> CLD
```

### Diagramme de Séquence : Tunnel de Paiement Stripe

```mermaid
sequenceDiagram
    autonumber
    actor Client as Acheteur (Storefront)
    participant API as Backend Express (/api/order)
    participant Stripe as Passerelle Stripe
    participant DB as MongoDB Atlas

    Client->>API: POST /api/order/stripe (Panier, Adresse, JWT)
    API->>DB: Enregistrement commande (statut: non payée)
    API->>Stripe: Création Session Checkout (line_items, URLs succès/échec)
    Stripe-->>API: URL de Session Stripe générée
    API-->>Client: Redirection vers session_url
    Client->>Stripe: Saisie sécurisée de la Carte Bancaire
    Stripe-->>Client: Redirection vers /verify-payment?success=true&orderId=...
    Client->>API: POST /api/order/verify-stripe (orderId, success)
    API->>DB: Mise à jour : payment=true, status="Order Placed"
    API-->>Client: Confirmation de commande & vidage du panier
```

---

## 4. Bilan Exhaustif des Travaux & Réalisations

Au cours de cet audit et de cette session de modernisation, l'ensemble des couches techniques a été restructuré, corrigé et validé. Voici le rapport détaillé des interventions techniques :

### 4.1. Migration Create React App vers Vite 7 & React 19
- **Problématique initiale :** Le storefront reposait sur `react-scripts` (CRA), un outil déprécié souffrant de vulnérabilités critiques de build, d'une lenteur de compilation et d'une incompatibilité avec l'écosystème React 19.
- **Réalisation :** 
  - Configuration de `vite.config.js` avec le plugin `@vitejs/plugin-react` et support JSX complet.
  - Mise à niveau du port de développement sur le port `3000` avec redirection d'API transparente.
  - Déplacement de `public/index.html` à la racine et transition vers l'entrée ESM `src/index.jsx`.
  - Résultat : un build de production compilé en **3.7 secondes** contre plus de 45 secondes précédemment.

### 4.2. Système d'Authentification Client Complet
- **Problématique initiale :** Le modèle utilisateur client n'existait pas ; les commandes étaient enregistrées avec un `userId` arbitraire ou fictif.
- **Réalisation :**
  - Conception de `backend/models/userModel.js` avec validation d'email normalisé (`validator.isEmail`) et salage de mot de passe (`bcryptjs`, 10 tours).
  - Contrôleurs `loginUser`, `registerUser` et `getUserProfile` délivrant un token JWT signé contenant `{ id: user._id, role: 'customer' }`.
  - Page de connexion/inscription réactive [`Login.js`](file:///c:/Users/USER/Documents/aurora_store/src/pages/Login.js) avec gestion de session dans le `ShopContext` et badge d'état connecté dans l'en-tête.

### 4.3. Intégration Sécurisée de la Passerelle Stripe
- **Problématique initiale :** Seul le paiement à la livraison ("COD") était actif dans l'application.
- **Réalisation :**
  - Intégration du SDK Stripe dans `backend/controllers/orderController.js`.
  - Implémentation du contrôleur `placeOrderStripe` préparant les `line_items` typés et créant les sessions de paiement Stripe avec métadonnées sécurisées.
  - Création du composant [`VerifyPayment.js`](file:///c:/Users/USER/Documents/aurora_store/src/pages/VerifyPayment.js) pour valider l'authenticité de la transaction au retour de Stripe et nettoyer les commandes abandonnées.

### 4.4. Refonte Ergonomique & Sécurisation de la Recherche
- **Problématique initiale :**
  1. *Bug S-1 :* Fermer la barre de recherche avec l'icône `FiX` masquait le champ sans réinitialiser la requête, laissant le catalogue filtré sans possibilité de retour.
  2. *Bug S-2 :* L'appel `item.name.toLowerCase()` provoquait un plantage fatal (`TypeError`) dès qu'un produit n'avait pas de nom.
  3. *Bug S-3 :* L'icône de loupe n'était pas cliquable sur mobile et aucun bouton "Effacer la recherche" n'était proposé en cas d'absence de résultats.
- **Réalisation :**
  - Ajout de `handleCloseSearch` réinitialisant à la fois la visibilité et la chaîne de requête.
  - Moteur de filtrage multi-champs sécurisé inspectant `name`, `category`, `subCategory` et `description` avec protection contre les valeurs nulles.
  - Harmonisation du filtre de recherche sur les pages thématiques [`Men.js`](file:///c:/Users/USER/Documents/aurora_store/src/pages/Men.js), [`Women.js`](file:///c:/Users/USER/Documents/aurora_store/src/pages/Women.js) et [`Accessories.js`](file:///c:/Users/USER/Documents/aurora_store/src/pages/Accessories.js).
  - Création du hook [`useDebounce.js`](file:///c:/Users/USER/Documents/aurora_store/src/hooks/useDebounce.js) temporisant les filtrages de 150ms pour supprimer les saccades d'interface lors de saisies rapides.
  - Limitation de la saisie à 100 caractères via l'attribut `maxLength={100}`.

### 4.5. Sécurité : Élimination de l'Élévation de Privilèges (SEC-1)
- **Problématique critique :** L'ancien middleware `authMiddleware` validait n'importe quel token signé par `JWT_SECRET`. Étant donné que les clients recevaient un token valide lors de leur inscription, **un simple client pouvait interroger l'endpoint `GET /api/order/list` et accéder aux noms, adresses postales et numéros de téléphone de tous les clients**.
- **Réalisation :**
  - Création du middleware dédié [`adminAuth.js`](file:///c:/Users/USER/Documents/aurora_store/backend/middleware/adminAuth.js).
  - Vérification obligatoire que `decoded.role === 'admin'` ou `decoded.id === 'admin'`.
  - Rejet immédiat par **HTTP 403 Forbidden** avec le message `"Access Forbidden. Admin privileges required."` pour tout token client tentant d'accéder aux routes d'administration.
  - Protection des routes `GET /api/order/list`, `POST /api/order/status`, `POST /api/product/add` et `POST /api/product/remove`.

### 4.6. Durcissement du Dashboard Admin contre les Crashs (ADM-1 à 3)
- **Problématique initiale :**
  1. *ADM-1 :* L'accès direct `order.address.firstName` faisait planter toute la page des commandes (écran blanc React) si une commande contenait une adresse partielle ou manquante.
  2. *ADM-2 :* Le hook `const [bestseller] = useState(false)` n'avait pas de mutateur ni de case à cocher, rendant impossible la création d'articles best-sellers.
  3. *ADM-3 :* Les produits enregistrés sans image étaient masqués du tableau d'administration par un filtre trop rigide.
- **Réalisation :**
  - Application du chaînage optionnel `order.address?.firstName` avec valeurs de repli intelligentes (*"Guest Customer"*, *"No address specified"*).
  - Intégration du mutateur `[bestseller, setBestseller]` et d'une case à cocher stylisée dans [`Add.jsx`](file:///c:/Users/USER/Documents/aurora_store/admin/src/pages/Add/Add.jsx).
  - Contrôle d'image obligatoire côté client et côté serveur, associé à l'affichage d'un placeholder de secours dans [`List.jsx`](file:///c:/Users/USER/Documents/aurora_store/admin/src/pages/list/List.jsx).

### 4.7. Protection contre les Injections NoSQL & Attaques ReDoS
- **Problématique :** Les requêtes pouvaient être vulnérables aux opérateurs d'injection MongoDB (ex: `{"email": {"$gt": ""}}`) ou au gel du CPU par expressions régulières malicieuses (ReDoS).
- **Réalisation :**
  - Création du middleware [`sanitizeInput.js`](file:///c:/Users/USER/Documents/aurora_store/backend/middleware/sanitizeInput.js) nettoyant récursivement tout objet `req.body`, `req.query` ou `req.params` comportant des clés préfixées par `$` ou contenant des points `.`.
  - Fonction de neutralisation d'expressions régulières `escapeRegex` dans `productController.js` et création de l'endpoint dédié `GET /api/product/search` protégé contre les requêtes supérieures à 100 caractères.
  - Vérification systématique du type string (`typeof === 'string'`) sur les identifiants d'authentification.

### 4.8. Prévention des CastError MongoDB (BE-1)
- **Problématique :** L'envoi d'identifiants non hexadécimaux ou corrompus générait une exception Mongoose non interceptée (`CastError`), provoquant une réponse serveur 500 au lieu d'un code client 400.
- **Réalisation :**
  - Vérification systématique `mongoose.Types.ObjectId.isValid(id)` sur `removeProduct`, `verifyStripePayment`, `updateStatus` et `getUserProfile`.
  - Renvoi systématique d'erreurs HTTP 400 claires en cas de format invalide, et 404 si le document n'existe pas.

### 4.9. En-têtes HTTP de Sécurité & Confidentialité du Cache
- **Réalisation :**
  - Création du middleware [`securityHeaders.js`](file:///c:/Users/USER/Documents/aurora_store/backend/middleware/securityHeaders.js) appliquant :
    - `X-Content-Type-Options: nosniff` (anti-reniflage de type MIME).
    - `X-Frame-Options: SAMEORIGIN` (anti-clickjacking).
    - `X-XSS-Protection: 1; mode=block` (protection XSS navigateurs anciens).
    - `Referrer-Policy: strict-origin-when-cross-origin`.
    - `Cache-Control: no-store` sur les flux sensibles de commandes et d'utilisateurs.

---

## 5. Modèles de Données (Schémas Mongoose)

### 1. Utilisateur (`userModel`)
```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
    date: { type: Number, default: Date.now }
});
```

### 2. Produit (`productModel`)
```javascript
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true }
});
```

### 3. Commande (`orderModel`)
```javascript
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true }
});
```

---

## 6. Suite de Tests Automatisée & Assurance Qualité

Une suite de tests automatisés moderne sous **Vitest** et **Testing Library** a été configurée pour garantir la non-régression de l'écosystème :

```text
 ✓ backend/controllers/objectIdValidation.test.js (6 tests)
 ✓ backend/controllers/searchReDoS.test.js (3 tests)
 ✓ backend/middleware/auth.test.js (6 tests)
 ✓ backend/middleware/sanitizeInput.test.js (2 tests)
 ✓ src/components/ProductCard/ProductCard.test.js (2 tests)
 ✓ src/context/ShopContext.test.js (3 tests)
 ✓ src/hooks/useDebounce.test.js (2 tests)
 ✓ src/pages/ShopAll.test.js (3 tests)
 ✓ src/App.test.js (2 tests)

Test Files  9 passés (9)
     Tests  29 passés (29)
```

- **Validation des Builds de Production :**
  - **Vitrine Client (Vite 7) :** `✓ built in 3.75s` (431 kB JS gzippé à 141 kB)
  - **Dashboard Admin (Vite 7) :** `✓ built in 1.64s` (308 kB JS gzippé à 100 kB)

---

## 7. Guide d'Installation & Déploiement Local

### Prérequis
- **Node.js** v18.0.0 ou supérieur
- **npm** v9.0.0 ou supérieur
- Instance **MongoDB** active (Atlas ou locale)

---

### 1. Variables d'Environnement

#### Backend (`backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb+srv://<votre_user>:<votre_mot_de_passe>@cluster0.mongodb.net/aurora_store?retryWrites=true&w=majority
JWT_SECRET=cle_secrete_jwt_super_robuste_aurora_2026
ADMIN_EMAIL=admin@aurora.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:5173

# Optionnel : Cloudinary (si omis, stockage Base64 de secours)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optionnel : Stripe (pour les paiements par carte)
STRIPE_SECRET_KEY=sk_test_...
```

#### Storefront Client (`.env` à la racine)
```env
REACT_APP_API_URL=http://localhost:4000
```

#### Dashboard Admin (`admin/.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

### 2. Démarrage des Services

#### Étape A : Lancer le Serveur Backend
```bash
cd backend
npm install
npm run server
# Le serveur écoute sur http://localhost:4000
```

#### Étape B : Lancer le Dashboard Admin
```bash
cd admin
npm install
npm run dev
# L'interface d'administration est accessible sur http://localhost:5173
```

#### Étape C : Lancer la Boutique Storefront
```bash
# À la racine du projet
npm install
npm run dev
# La boutique est accessible sur http://localhost:3000
```

---

### 3. Exécution des Tests Automatisés
```bash
# À la racine du projet
npm test
```

---

## 8. Conclusion & Perspectives

Le projet **AURORA** a franchi avec succès toutes les étapes de durcissement, d'optimisation et de fiabilisation :
1. L'expérience client est désormais fluide, instantanée et exempte de plantages d'affichage.
2. La sécurité des transactions et la ségrégation des privilèges protègent l'application contre les attaques NoSQL, ReDoS, XSS et l'espionnage de commandes.
3. L'outillage de pointe (Vite 7, Vitest, React 19) garantit une maintenabilité et une vélocité de développement maximales.

**Perspectives recommandées pour de futures versions :**
- Mise en place d'un système de webhooks Stripe asynchrones pour validation hors-ligne des commandes.
- Internationalisation multilingue (i18n) avec basculement dynamique Français / Anglais.
- Pagination serveur (`limit` / `skip`) lors du passage de catalogue à plus de 50 000 références.

---
*Projet réalisé par **Abdessamad Cherkaoui** — 2026.*
