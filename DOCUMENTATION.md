# ASPROS — Rapport de Développement & Documentation Technique
## Plateforme Africaine de Billetterie & Collecte Solidaire
*Maquette Frontend Interactive Réalisée en Next.js 16.2 & React 19 (Version Mobile-First)*

---

## 1. Introduction & Vision Produit

**ASPROS** est une plateforme moderne de billetterie en ligne et de collecte solidaire conçue spécifiquement pour répondre aux besoins et réalités du marché africain.

Cette nouvelle version franchit un cap décisif en adoptant une **architecture mobile-first complète**. Afin d'offrir une expérience de test exceptionnelle sur tous les appareils :
*   **Sur ordinateur (Desktop) :** L'application s'exécute au sein d'un **Simulateur de Smartphone Premium** (avec encoche, barre d'état système, heure réelle, icônes réseau/batterie et indicateur d'accueil). Cela permet de manipuler l'application exactement comme sur un téléphone portable, entourée d'un fond flouté et dynamique.
*   **Sur téléphone (Mobile) :** Le simulateur s'efface automatiquement (via des requêtes médias CSS `@media`) pour laisser place à une **application web mobile native plein écran** avec une zone tactile optimisée.

---

## 2. Architecture Technique & Spécifications

La structure de l'application suit les standards de Next.js (App Router) avec un typage TypeScript strict pour assurer la stabilité du build.

### Structure de l'Arborescence du Projet

```text
TICKET_ASPROS/
├── cahier_de_charge/
│   └── cahier_de_charge.md        # Spécifications détaillées fonctionnelles et techniques
├── aspros-web/
│   ├── public/                     # Favoris et icônes
│   ├── src/
│   │   ├── app/                    # Système de routage App Router
│   │   │   ├── dashboard/          # Espace d'administration mobile du promoteur
│   │   │   │   ├── dashboard.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── explore/            # Page de recherche et exploration par thématiques
│   │   │   │   └── page.tsx
│   │   │   ├── login/              # Page de connexion mobile
│   │   │   │   ├── login.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── register/           # Page d'inscription mobile avec sélecteur de préfixes africains
│   │   │   │   ├── register.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── tickets/            # Portefeuille de billets (Coupons et QR codes animés)
│   │   │   │   ├── tickets.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── profile/            # Page de compte, fidélité et switch promoteur
│   │   │   │   ├── profile.module.css
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css         # Variables de simulateur, thèmes et animations CSS
│   │   │   ├── layout.tsx          # Shell applicatif configurant la grille Flex et le SimulatorShell
│   │   │   ├── page.module.css
│   │   │   └── page.tsx            # Accueil / Flux d'événements et Bottom Sheet d'achat
│   │   └── components/             # Composants d'interface utilisateur réutilisables
│   │       ├── EventCard.module.css
│   │       ├── EventCard.tsx       # Carte d'événement avec calendrier Facebook, réactions et jauge
│   │       ├── Navigation.module.css
│   │       ├── Navigation.tsx      # Navigation Header (haut) et NavigationTabBar (bas)
│   │       ├── SimulatorShell.tsx  # Simulateur de smartphone avec heure réelle
│   │       └── ThemeProvider.tsx   # Gestion globale du mode Sombre/Clair
│   │   ├── tsconfig.json           # Configuration TypeScript
│   │   ├── next.config.ts          # Configuration Next.js
│   │   ├── package.json            # Dépendances (Next 16.2.6, React 19)
│   └── DOCUMENTATION.md            # Le présent document
```

---

## 3. Le Design System & Identité Visuelle Premium

Le thème s'appuie sur une charte graphique dominée par le **bleu électrique** combiné au **glassmorphism** pour créer une interface moderne et dynamique.

### Variables de Conception Principales (Design Tokens)

*   `--primary-blue` : `#2563eb` (Clair) / `#3b82f6` (Sombre). Couleur d'accent principale, boutons et états actifs.
*   `--electric-blue` : `#0ea5e9` (Clair) / `#38bdf8` (Sombre). Utilisé pour les halos lumineux et dégradés néon.
*   `--card-bg` : Fond translucide effet verre flou (`backdrop-filter: blur(16px)`).
*   `--phone-width` & `--phone-height` : Définissent la taille fixe du simulateur desktop (`412px` par `840px`).

---

## 4. Détails des Nouveaux Modules & Expériences Interactives

### A. Le Simulateur de Smartphone (`SimulatorShell.tsx` & `layout.tsx`)
*   Encadre l'application dans une coque noire de smartphone sur grand écran.
*   Intègre une barre d'état avec une horloge dynamique synchronisée sur l'heure réelle de la machine et des indicateurs de réseau Wi-Fi/4G et de batterie à 100%.
*   Ajoute la barre d'accueil tactile iOS en bas.
*   S'estompe instantanément sur mobile pour devenir une application web classique en plein écran.

### B. Double Navigation Mobile (`Navigation.tsx`)
*   **Header Supérieur (NavigationHeader) :** Reste fixé en haut. Affiche le logo *ASPROS* au dégradé bleu néon, le commutateur de thèmes (Soleil/Lune) et une cloche de notification surmontée d'un badge rouge actif.
*   **Tab Bar Inférieure (NavigationTabBar) :** Menu à 4 onglets persistants (Accueil, Explorer, Tickets, Profil) qui utilise `usePathname` de Next.js pour styliser dynamiquement l'onglet en cours de visite avec une micro-animation de rebond vertical et un halo bleu électrique.

### C. Flux d'Événements & Tiroir d'Achat Express (`page.tsx`)
*   **Stories / Spotlight (Bannières Tikerama) :** En haut de l'accueil, un carrousel horizontal affiche les grands événements vedettes.
*   **Cartes d'Événements (Style Facebook) :**
    *   Badge calendrier affichant le mois (rouge) et le jour (chiffre gras).
    *   Boutons d'interactions rapides : "Intéressé" (qui incrémente le compteur en temps réel avec animation cardiaque rouge) et "Partager" (qui copie le lien dans le presse-papier avec notification).
    *   Barre de progression de vente/financement en direct pour les catégories standard et solidaires.
*   **Bottom Sheet (Tiroir d'Achat Express) :** Au clic sur le bouton de réservation, un volet glisse depuis le bas de l'écran et permet :
    *   De choisir la quantité de tickets ou de définir le montant d'un don pour les collectes.
    *   De choisir le réseau Mobile Money local (**Wave**, **Orange Money**, **MTN MoMo** ou **Carte Bancaire**).
    *   De lancer le paiement simulé avec un écran de chargement d'opérateur (2 secondes) suivi d'une vue de réussite qui enregistre le billet dans le localStorage et permet d'accéder au portefeuille de billets.

### D. Portefeuille de Billets Interactif (`tickets/page.tsx`)
*   Affiche les billets achetés en temps réel ou injecte un billet par défaut.
*   **Design en Coupon :** Les cartes ont des pointillés de découpe et des demi-cercles creusés sur les côtés pour ressembler à de vrais tickets papier.
*   **QR Code Animé :** Au clic sur un billet, un tiroir s'ouvre pour afficher le billet en grand avec les détails d'achat et un code QR simulé, traversé en permanence par un **laser bleu néon clignotant** (animation CSS de balayage).

### E. Espace Promoteur & Scanneur Mobile (`dashboard/page.tsx`)
*   **Scanner Virtuel d'Entrées :** Simule le scanner de l'agent à l'entrée. Affiche un viseur de caméra avec laser mobile. Après 2.5 secondes de recherche de code, il renvoie aléatoirement un écran vert "Billet Valide" ou un écran rouge "Billet Invalide / Déjà scanné" pour tester les différents cas d'erreurs réels.
*   **Création Mobile d'Événement :** Formulaire tiroir rapide permettant au promoteur de saisir le nom, le lieu, la date, le prix et d'ajouter le nouvel événement instantanément dans sa liste sous forme de brouillon.

### F. Inscription Mobile Spécifique (`register/page.tsx`)
*   Comprend un sélecteur de rôle interactif (Acheteur / Promoteur) matérialisé par des cartes radio bleues.
*   Contient un champ Téléphone équipé d'un **sélecteur de codes pays africains** (Côte d'Ivoire `+225`, Sénégal `+221`, Bénin `+229`, Togo `+228`, Mali `+223`, etc.) facilitant la facturation Mobile Money.
*   Dispose d'un indicateur de complexité de mot de passe en temps réel (jauge colorée rouge/jaune/vert selon les caractères saisis).

---

## 5. Guide de Démarrage Rapide

1.  Placez-vous dans le sous-dossier `aspros-web` :
    ```bash
    cd aspros-web
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Lancez le serveur de développement local :
    ```bash
    npm run dev
    ```
4.  Ouvrez l'adresse : [http://localhost:3000](http://localhost:3000)
    *   *Astuce :* Pour apprécier le simulateur de téléphone, visitez le lien depuis un ordinateur de bureau. Pour tester le rendu mobile natif plein écran, ouvrez l'inspecteur de votre navigateur en mode de simulation de terminal mobile ou visitez le lien directement depuis votre smartphone connecté au même réseau.
