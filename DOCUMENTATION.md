# ASPROS — Rapport de Développement & Documentation Technique
## Plateforme Africaine de Billetterie & Collecte Solidaire
*Maquette Frontend Interactive Réalisée en Next.js 16.2 & React 19*

---

## 1. Introduction & Vision Produit

**ASPROS** est une plateforme moderne de billetterie en ligne et de collecte solidaire conçue spécifiquement pour répondre aux besoins et réalités du marché africain. Elle allie la puissance des solutions de billetterie événementielle mondiales à des mécanismes d'adaptation locaux (Mobile Money, points de vente physiques, vente assistée, contrôle d'accès optimisé et gestion de campagnes solidaires).

### Proposition de Valeur Clé
*   **Pour les Promoteurs :** Un véritable "système d'exploitation" pour gérer la création d'événements, la tarification des billets (Standard, VIP, Early Bird, Don Libre), le suivi des ventes en temps réel, et un contrôle d'accès sécurisé par scan de QR code.
*   **Pour les Acheteurs :** Une expérience fluide, optimisée pour le mobile, permettant l'achat rapide et sécurisé de billets d'événements (concerts, cinéma, spectacles, formations) ou la contribution à des collectes sociales.
*   **Volet Solidaire :** Intégration native de collectes de fonds transparentes pour soutenir des causes sociales, médicales, éducatives ou associatives.

---

## 2. Architecture Technique & Spécifications

La maquette de démonstration a été initialisée avec des technologies modernes garantissant d'excellentes performances, une réactivité maximale sur mobile (Mobile-First) et une extensibilité solide.

### Stack Technique Principale
*   **Framework :** [Next.js](https://nextjs.org/) `16.2.6` (App Router) pour des performances optimales et un référencement (SEO) efficace.
*   **Bibliothèque UI :** [React](https://react.dev/) `19.2.4` pour la gestion des composants et du rendu.
*   **Langage :** [TypeScript](https://www.typescriptlang.org/) `5` pour un code robuste, typé et sécurisé.
*   **Style :** CSS Vanilla via **CSS Modules** pour un contrôle total sur l'esthétique premium sans dépendances superflues, évitant les surcharges de framework CSS.
*   **Police :** `Outfit` de Google Fonts (intégrée de manière optimisée via `@import` dans le style global).

### Structure de l'Arborescence du Projet
L'architecture de l'application est organisée selon les standards Next.js App Router :

```text
TICKET_ASPROS/
├── cahier_de_charge/
│   └── cahier_de_charge.md        # Spécifications détaillées fonctionnelles et techniques
├── aspros-web/
│   ├── public/                     # Actifs statiques et SVG d'icônes
│   ├── src/
│   │   ├── app/                    # Système de routage App Router
│   │   │   ├── dashboard/          # Espace d'administration du promoteur
│   │   │   │   ├── dashboard.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── login/              # Page d'authentification utilisateur / promoteur
│   │   │   │   ├── login.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css         # Thème, variables CSS et styles globaux
│   │   │   ├── layout.tsx          # Template global de l'application (HTML/Body/Providers)
│   │   │   ├── page.module.css
│   │   │   └── page.tsx            # Page d'accueil publique (Catalogue d'événements)
│   │   └── components/             # Composants d'interface utilisateur réutilisables
│   │       ├── EventCard.module.css
│   │       ├── EventCard.tsx       # Carte d'événement interactive avec effet Glow
│   │       ├── Navigation.module.css
│   │       ├── Navigation.tsx      # Barre de navigation avec commutateur de thème
│   │       ├── ThemeProvider.tsx   # Fournisseur de contexte pour le thème Sombre/Clair
│   │   ├── tsconfig.json           # Configuration TypeScript
│   │   ├── next.config.ts          # Configuration Next.js
│   │   ├── package.json            # Dépendances et scripts de démarrage
│   │   └── eslint.config.mjs       # Configuration de linter pour la qualité de code
└── DOCUMENTATION.md                # Le présent document
```

---

## 3. Le Design System & Identité Visuelle Premium

Pour offrir une expérience utilisateur haut de gamme (effet *Wow*), l'application implémente un système de conception basé sur le **Glassmorphism** (effet de verre flouté) et des **dégradés vibrants** dans des tons bleus électriques et néons.

### Variables de Conception (Design Tokens)
Définies dans `globals.css` pour une synchronisation fluide entre les thèmes Sombre et Clair :

| Variable CSS | Thème Clair (Light Mode) | Thème Sombre (Dark Mode) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#f8fafc` | `#020617` (Bleu profond/Noir) | Fond d'écran principal |
| `--bg-secondary`| `#f1f5f9` | `#0f172a` (Slate 900) | Fond de section et inputs |
| `--text-primary` | `#0f172a` | `#f8fafc` | Texte principal lisible |
| `--text-secondary`| `#475569` | `#94a3b8` | Légendes et textes secondaires |
| `--primary-blue` | `#2563eb` (Royal Blue) | `#3b82f6` (Neon Blue) | Boutons, liens actifs et focus |
| `--electric-blue`| `#0ea5e9` | `#38bdf8` | Dégradés et effets visuels secondaires |
| `--card-bg` | `rgba(255, 255, 255, 0.85)`| `rgba(15, 23, 42, 0.7)` | Arrière-plan flou effet verre |
| `--card-border` | `rgba(255, 255, 255, 1)` | `rgba(255, 255, 255, 0.05)`| Bordure subtile de verre |
| `--shadow-glow` | `rgba(37, 99, 235, 0.3)` | `rgba(59, 130, 246, 0.4)` | Ombre portée lumineuse néon |

### Classes Utilitaires Globales
*   **`.glass` :** Combine `backdrop-filter: blur(16px)` avec des bordures translucides (`border: 1px solid var(--card-border)`) et une couleur de fond alpha pour créer l'effet de plaque de verre moderne et sophistiqué.
*   **`.glow` :** Applique une ombre portée de type halo lumineux (`var(--shadow-glow)`) et une micro-animation de translation verticale (`translateY(-2px)`) lors du survol de l'élément pour renforcer l'interactivité.
*   **`.btn-primary` :** Un bouton haut de gamme affichant un dégradé linéaire de `--primary-blue` vers `--electric-blue`, s'animant délicatement au survol.
*   **`.animate-fade-in` :** Gère l'apparition progressive et le glissement vertical des pages lors du chargement via des animations CSS natives (`@keyframes fadeIn`).

---

## 4. Détails des Modules & Pages Implémentés

### A. Navigation Globale & Commutateur de Thème (`Navigation.tsx` / `ThemeProvider.tsx`)
La navigation de l'application est centralisée dans un en-tête persistant et hautement interactif :
*   **Design de Verre :** Fixé en haut de page avec la classe `.glass`, il s'adapte à tous les écrans.
*   **Gestion Dynamic du Thème (Sombre / Clair) :**
    *   Implémenté via un contexte React (`ThemeProvider`) qui applique dynamiquement un attribut `data-theme` sur l'élément `<html>` et enregistre le choix de l'utilisateur dans le `localStorage` de son navigateur.
    *   **Résolution du Faux-Rendu SSR :** Utilisation d'un état `mounted` qui retarde l'affichage interactif jusqu'à ce que le client soit prêt, évitant ainsi le clignotement ou la désynchronisation des thèmes lors du chargement initial.
    *   **Contrôle Visuel :** Bouton commutateur de thème affichant dynamiquement un soleil `☀️` en mode sombre et une lune `🌙` en mode clair.
*   **Routage Intégré :** Liens fluides vers l'Accueil, le Dashboard et un bouton primaire invitant à la Connexion.

### B. Page d'Accueil & Catalogue d'Événements (`page.tsx` & `EventCard.tsx`)
Conçue pour captiver l'utilisateur dès le premier regard :
*   **Section Hero immersive :**
    *   Titre principal accrocheur avec mise en valeur colorée : *"Vivez l'Événement, Autrement."*
    *   **Décors Abstraits Dynamiques :** Deux grands cercles ("Blobs") colorés floutés en arrière-plan qui génèrent une profondeur visuelle moderne.
*   **Filtres de Catégories Interactifs :**
    *   Barre de filtres stylisée permettant de naviguer facilement entre les catégories principales : **Tous**, **Concerts**, **Cinéma** et **Solidarité**.
*   **Grille de Catalogue :**
    *   Rendue dynamiquement en utilisant le composant `<EventCard />`.
    *   Affiche 4 événements types modélisés avec rigueur (Afrobeat 2026, Black Panther 3, Gala de Charité pour les Orphelins, Masterclass Tech).
*   **Composant `EventCard.tsx` :**
    *   Interface visuelle soignée : Image de l'événement avec un dégradé de secours de haute qualité si l'URL de l'image est absente.
    *   Badge dynamique de catégorie positionné élégamment en haut à droite.
    *   Informations structurées : Date & heure, Titre, Lieu précédé d'un indicateur géographique `📍`, Tarif en monnaie locale (FCFA) ou mention "Don Libre" pour les campagnes de solidarité, et un bouton d'action invitant à réserver ses billets.

### C. Page de Connexion Immersive (`login/page.tsx`)
L'interface de connexion offre un parcours à la fois beau et fonctionnel :
*   **Formulaire de Verre Centré :** Une carte glassmorphic élégante contenant des ombres soignées et des transitions fluides.
*   **Champs de Saisie Interactifs :** Inputs d'email et de mot de passe bénéficiant d'effets de focus bleutés et d'un lien "Mot de passe oublié" intégré avec justesse.
*   **Simulation Asynchrone d'API :**
    *   Lors de la soumission du formulaire, un état de chargement (`isLoading`) est déclenché.
    *   Un cercle de chargement CSS rotatif remplace temporairement le texte du bouton pendant **1,5 seconde** pour simuler une requête réseau réaliste.
    *   L'utilisateur est ensuite redirigé de manière fluide vers le Tableau de bord.

### D. Tableau de Bord du Promoteur (`dashboard/page.tsx`)
Un tableau de bord complet, ergonomique et épuré pour piloter l'activité :
*   **Structure à double colonne (Layout Sidebar + Main) :**
    *   **Sidebar de Navigation Promoteur :** Permet de naviguer entre la *Vue d'ensemble*, *Mes Événements*, *Billets & Scans*, *Collectes Solidaires*, et les *Paramètres*. Elle intègre également un bouton de déconnexion stylisé.
    *   **En-tête de Contenu :** Affiche le titre de l'écran en cours et un bouton d'action rapide pour créer un nouvel événement (`+ Créer un événement`).
*   **Indicateurs Clés de Performance (KPI Cards) :**
    *   **Billets vendus :** Affiche `1 245` ventes avec une étiquette verte indiquant une hausse de `+12% cette semaine`.
    *   **Revenus générés :** Affiche `12.5M FCFA` collectés avec une étiquette indiquant une hausse de `+5% cette semaine`.
    *   **Billets scannés :** Affiche `840` entrées validées avec un indicateur clignotant "En cours" (idéal pour le suivi en direct le jour de l'événement).
*   **Tableau des Événements Actifs :**
    *   Une table au design moderne listant les événements en cours du promoteur.
    *   Colonnes claires : Nom, Date, Lieu, Statut, Ventes.
    *   **Badges de Statut Contextuels :** Affichage d'un badge vert `Publié` pour les événements actifs (Festival Afrobeat, Gala de Charité) et d'un badge jaune/orange `Brouillon` pour les événements en cours d'édition (Masterclass Tech).
    *   **Indication des ventes :** Affiche des rapports de capacité clairs (ex. `850 / 1000` billets vendus).

---

## 5. Synthèse des Fichiers Clés Livrés

Voici un récapitulatif détaillé des fichiers implémentés avec leur rôle technique respectif :

| Fichier | Rôle principal | Détails d'implémentation |
| :--- | :--- | :--- |
| [`layout.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/app/layout.tsx) | Racine de l'application | Configure les métadonnées SEO, englobe les enfants dans le `ThemeProvider` et affiche l'en-tête global `<Navigation />`. |
| [`globals.css`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/app/globals.css) | Identité visuelle | Déclare les variables CSS des thèmes Sombre/Clair, la police `Outfit`, le style de verre flouté (`.glass`), le halo au survol (`.glow`), et les animations de transition. |
| [`ThemeProvider.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/components/ThemeProvider.tsx) | Gestion du thème | Utilise le Context API de React pour activer ou désactiver le mode sombre, écrit dans le `localStorage` et prévient les erreurs de rendu SSR. |
| [`Navigation.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/components/Navigation.tsx) | En-tête global | Affiche la barre de navigation translucide, intègre le bouton d'inversion de thème et le bouton de connexion. |
| [`page.tsx` (Root)](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/app/page.tsx) | Accueil public | Affiche la section Hero, les décors abstraits, le menu de filtrage par catégories, et la grille des événements à la une. |
| [`EventCard.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/components/EventCard.tsx) | Carte d'événement | Modélise le layout de la carte d'événement avec ombre lumineuse au survol, badge de catégorie et bouton d'action. |
| [`login/page.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/app/login/page.tsx) | Connexion | Propose un formulaire de connexion avec simulation asynchrone d'authentification de 1.5 seconde et chargement visuel. |
| [`dashboard/page.tsx`](file:///c:/Users/hp/TICKET_ASPROS/aspros-web/src/app/dashboard/page.tsx) | Espace promoteur | Organise la vue d'ensemble avec sidebar, indicateurs de ventes clés (KPIs) et tableau de suivi des événements. |

---

## 6. Guide de Lancement de la Maquette

Pour exécuter et tester cette maquette en local sur votre environnement de développement :

### 1. Prérequis
*   Avoir installé **Node.js** (version 18 ou supérieure recommandée).
*   Avoir accès à un terminal (PowerShell sur Windows ou Bash sur macOS/Linux).

### 2. Procédure d'installation
Ouvrez votre terminal dans le répertoire `aspros-web` du projet et installez les dépendances nécessaires :
```bash
cd aspros-web
npm install
```

### 3. Lancer le serveur de développement
Démarrez le serveur local de Next.js :
```bash
npm run dev
```
Une fois le serveur démarré, ouvrez votre navigateur et accédez à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

### 4. Compilation pour la production
Pour tester la validité du build de production et s'assurer qu'aucune erreur TypeScript n'est présente :
```bash
npm run build
```

---

## 7. Prochaines Étapes de Développement (Roadmap Technologique)

Pour passer de cette maquette frontend interactive à un produit de production commercialisable :

1.  **Base de Données & Modélisation (Backend) :**
    *   Configuration d'une base de données relationnelle **PostgreSQL**.
    *   Mise en place de **Prisma ORM** pour gérer les modèles : `User` (rôles Acheteur, Promoteur, Admin), `Event`, `TicketCategory`, `Order`, `Ticket` (avec UUID unique et signature numérique pour QR code), et `SolidarityCampaign`.
2.  **Mécanisme de Paiement Adapté (Afrique) :**
    *   Intégration d'agrégateurs de paiement locaux (ex. **CinetPay**, **Paystack**, **Flutterwave**, **FedaPay** ou **Wave**) pour supporter nativement le Mobile Money (Orange Money, MTN, Moov, Wave) en plus des cartes bancaires.
3.  **Module de Génération & Scan de Billets (QR Codes) :**
    *   Génération de QR codes sécurisés au format Base64 ou SVG pour chaque billet émis.
    *   Développement d'une PWA ou d'une application de scan légère (en Flutter ou React Native) exploitant la caméra du smartphone pour décoder le billet et interroger instantanément l'API de validation.
4.  **Module Collecte Solidaire Enrichi :**
    *   Création d'une page publique dédiée à chaque campagne solidaire avec une barre de progression dynamique (comparant le montant récolté à l'objectif financier), une liste des contributeurs et un bouton "Faire un don".
5.  **Notifications & Délivrabilité :**
    *   Envoi automatisé des billets électroniques par **Email** (via SendGrid ou Resend) et par **WhatsApp / SMS** (via Twilio ou API locale), formats très prisés en Afrique pour pallier les problèmes de consultation d'emails.
