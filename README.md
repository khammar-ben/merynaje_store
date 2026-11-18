# Mery Naje — site vitrine & boutique (démo)

Boutique en ligne de démonstration pour **Mery Naje** (@merynaje.store), prêt-à-porter féminin à Casablanca.
Next.js 16 + TypeScript + Tailwind CSS, 100 % statique : pas de base de données, pas de paiement en ligne.
Les commandes partent sur **WhatsApp** avec un message pré-rempli.

> ⚠️ Les photos et le nom appartiennent à Mery Naje. Démo privée : ne pas publier le site sans son accord.
> Le site est réglé pour **ne pas être référencé par Google** tant que `allowIndexing` vaut `false` (voir plus bas).

---

## Démarrer

```bash
npm install
npm run dev        # → http://localhost:3000
```

Vérifier la version finale (comme en ligne) :

```bash
npm run build      # génère le site statique dans le dossier out/
npm run preview    # sert out/ en local
```

## Où modifier quoi ?

| Je veux changer…                                  | Fichier                    |
| ------------------------------------------------- | -------------------------- |
| Produits, prix, tailles, couleurs, photos, stock  | `data/products.ts`         |
| Téléphone, WhatsApp, adresse, horaires, livraison | `data/settings.ts`         |
| Textes de l'accueil, histoire de la boutique      | `data/settings.ts`         |
| Guide des tailles, liste des villes               | `data/settings.ts`         |
| Pages Livraison / Paiement / Pas d'échange        | `data/pages.ts`            |
| Boutons et petits textes (FR + arabe)             | `data/translations.ts`     |

Chaque fichier est commenté. Après une modification, la page se met à jour toute seule avec `npm run dev`.

---

## Ajouter les photos

1. Rangez vos captures dans un dossier `assets/` à la racine du projet :

   ```
   assets/
     logo.png              ← le logo rond (doré sur fond clair)
     store/                ← photos de la boutique (la 1ʳᵉ sert de grande image d'accueil)
     products/             ← une photo par produit, nommée comme dans le tableau ci-dessous
     clientes/             ← captures du highlight « Nos clientes »
   ```

2. Lancez `npm run assets` : tout est copié dans `public/`, et des versions allégées (WebP) sont créées
   automatiquement pour chaque taille d'écran.
3. Relancez `npm run dev`.

Tant qu'une photo manque, le site affiche un visuel élégant (fond crème + nom en doré), jamais une image cassée.
Pour `store/` et `clientes/`, tous les fichiers du dossier sont utilisés, triés par nom (`01-…`, `02-…` pour choisir l'ordre).

**Noms de fichiers attendus dans `products/`** (✅ = photo déjà en place) :

| Réf. | Produit | Prix | Fichier(s) | Photo |
| ---- | ------- | ---- | ---------- | ----- |
| MN01 | Manteau ceinturé | 249 DH | `manteau-ceinture-beige.jpg`, `manteau-ceinture-noir.jpg` | — |
| MN03 | Ensemble 3 pièces | 399 DH | `ensemble-3-pieces.jpg` | ✅ |
| MN02 | Manteau long | 249 DH | `manteau-long.jpg` | ✅ |
| MN04 | Ensemble en jean | 279 DH | `ensemble-jean.jpg` | ✅ |
| MN05 | Robe en velours | 179 DH | `robe-velours.jpg` | ✅ |
| MN07 | Robe de soirée | 499 DH | `robe-de-soiree.jpg` | ✅ |
| MN06 | Robe drapée à boucle | 229 DH | `robe-drapee-boucle.jpg` | ✅ |
| MN08 | Robe longue à épaulettes | 249 DH | `robe-epaulettes.jpg` | ✅ |
| MN09 | Robe à pois (rupture) | 219 DH | `robe-a-pois.jpg` | ✅ |
| MN10 | Robe longue blanche | 199 DH | `robe-longue-blanche.jpg` | ✅ |
| MN11 | Haut rayé | 149 DH | `haut-raye.jpg` | ✅ |
| MN16 | Ensemble en tweed | WhatsApp | `ensemble-tweed.jpg` | ✅ |
| MN17 | Combinaison zippée | WhatsApp | `combinaison-zippee.jpg` | ✅ |
| MN18 | Robe jaune | WhatsApp | `robe-jaune.jpg` | ✅ |
| MN19 | Robe bustier en jean | WhatsApp | `robe-bustier-jean.jpg` | ✅ |
| MN12 | Chemise | 179 DH | `chemise.jpg`, `chemise-pantalon.jpg` | — |
| MN13 | Pantalon | 179 DH | `pantalon.jpg`, `chemise-pantalon.jpg` | — |
| MN14 | Jean élastique | 149 DH | `jean-elastique.jpg` | — |
| MN15 | Pull | WhatsApp | `pull.jpg` | — |

**Conseils photos** : format portrait (3:4), environ 900 à 1200 px de large. Inutile de les compresser :
le site génère lui-même des versions légères (96 à 900 px, en WebP), et chaque téléphone ne télécharge que la taille dont il a besoin.

### Remplacer une image

Remplacez le fichier dans `assets/products/` en gardant **exactement le même nom**, puis lancez `npm run assets`.
Pour utiliser un autre nom, changez le chemin dans `images` du produit (`data/products.ts`).

### Plusieurs photos par produit

Ajoutez des chemins dans `images` : la 1ʳᵉ est la photo principale, la 2ᵉ apparaît au survol sur ordinateur,
toutes sont dans la galerie de la fiche produit.
Astuce : si le nom d'une photo contient une couleur (`…-noir.jpg`), elle s'affiche quand la cliente choisit cette couleur.

---

## Ajouter un produit

Dans `data/products.ts`, copiez un bloc `{ … }` et modifiez-le :

```ts
{
  id: "MN16",                       // référence unique, envoyée dans la commande WhatsApp
  slug: "robe-longue-fleurie",      // adresse : /produit/robe-longue-fleurie (sans accents ni espaces)
  name: "Robe longue fleurie",
  nameAr: "فستان طويل مورد",        // facultatif
  category: "robes",                // robes | ensembles | manteaux | hauts | bas | pulls
  price: 259,                       // null → « Prix sur WhatsApp »
  sizes: ["S", "M", "L", "XL"],
  colors: ["Comme sur la photo"],   // ou ["Beige", "Noir"] (couleurs définies dans settings.ts)
  images: ["/products/robe-longue-fleurie.jpg"],
  isNew: true,                      // badge « Nouveau » + en tête des Nouveautés
  inStock: true,                    // false → badge « Rupture », commande désactivée
  description: "Deux lignes qui donnent envie…",
  descriptionAr: "…",               // facultatif
},
```

L'ordre de la liste = l'ordre d'affichage (mettez les nouveautés en haut).

## Changer un prix

Dans `data/products.ts`, modifiez `price: 249` du produit. Le panier et les messages WhatsApp suivent automatiquement.

## Changer le numéro WhatsApp

Dans `data/settings.ts` :

```ts
phoneDisplay: "07 14 19 19 62",   // affiché sur le site
phoneLink: "+212714191962",       // pour les appels
whatsappNumber: "212714191962",   // reçoit les commandes : format international, sans « + » ni espaces
```

## Frais et délais de livraison

Dans `data/settings.ts` : `deliveryFee` (laisser `null` tant que le tarif n'est pas connu : le total affiche
« + livraison »), `deliveryFeeLabel` et `deliveryDelayLabel`.

---

## Mettre en ligne sur Vercel

**Option A — via GitHub (recommandé)**

1. Poussez le projet sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com) → *Add New… → Project* → importez le dépôt.
3. Vercel détecte Next.js : laissez les réglages par défaut et cliquez *Deploy*.
   Chaque `git push` met ensuite le site à jour.

**Option B — en ligne de commande**

```bash
npx vercel          # première fois : connexion + création du projet (aperçu)
npx vercel --prod   # mise en ligne
```

**Quand la cliente valide le site :**

1. Dans `data/settings.ts`, mettez `siteUrl` à l'adresse finale (ex. `https://merynaje.ma`).
2. Passez `allowIndexing` à `true` pour que Google référence le site.
3. Ajoutez le nom de domaine dans Vercel (*Settings → Domains*).

---

## Fonctionnement de la commande

1. La cliente ajoute des articles (taille obligatoire) → panier sauvegardé sur son téléphone.
2. Elle remplit nom, téléphone (06/07/05 ou +212, vérifié), ville, adresse.
3. « Confirmer la commande » ouvre WhatsApp vers la boutique avec un message prêt à envoyer :

   ```
   Bonjour Mery Naje 👋 Nouvelle commande :
   • Manteau ceinturé (Réf. MN01) — Taille M — Noir — x1 — 249 DH
   • Haut rayé (Réf. MN11) — Taille standard — x1 — 149 DH
   Total : 398 DH (+ livraison)
   Nom : … | Tél : … | Ville : … | Adresse : …
   Paiement à la livraison.
   ```

4. Page « Merci », panier vidé. Si WhatsApp ne s'ouvre pas, un bouton permet de renvoyer la commande.

Le site est en français par défaut, avec un bouton **FR | العربية** (version arabe de droite à gauche).

## Notes techniques

- Fonctionne sans serveur : `npm run build` produit des pages HTML statiques dans `out/`.
- `scripts/fix-windows-export.mjs` corrige automatiquement un bug de Next.js 16 lors des builds sous Windows
  (sans effet sur Mac/Linux/Vercel).
- `scripts/image-variants.mjs` (lancé avant `dev` et `build`) crée les versions WebP des photos dans `public/_img/`
  (dossier généré, ignoré par git) ; `lib/image-loader.ts` indique à Next.js quelle taille charger.
- Lighthouse mobile mesuré en local avec compression et les vraies photos : Performance 90–94, Accessibilité 100,
  Bonnes pratiques 100. Le score SEO remonte à 100 dès que `allowIndexing` passe à `true`.
