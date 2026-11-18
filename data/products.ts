/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUITS — Mery Naje
 *  Pour ajouter un produit : copiez un bloc { ... }, changez l'id (MN20, MN21…),
 *  le slug (unique, sans accents ni espaces) et les infos.
 *
 *  • price : prix en DH. Mettez `null` pour afficher « Prix sur WhatsApp ».
 *  • sizes : tailles disponibles, dans l'ordre d'affichage.
 *  • colors : couleurs disponibles. Couleur inconnue → ["Comme sur la photo"].
 *    Astuce : si le nom d'une photo contient la couleur (ex. « …-noir.jpg »),
 *    elle s'affiche quand la cliente choisit cette couleur.
 *  • images : chemins dans /public (ex. "/products/robe.jpg"). Une image absente
 *    est remplacée automatiquement par un visuel élégant, jamais une image cassée.
 *  • isNew : badge « Nouveau » + rubrique Nouveautés.
 *  • inStock : `false` → badge « Rupture », commande désactivée.
 *  • nameAr / descriptionAr : version arabe (facultatif, sinon le français s'affiche).
 * ─────────────────────────────────────────────────────────────
 */

export type CategoryId = "robes" | "ensembles" | "manteaux" | "combinaisons" | "hauts" | "bas" | "pulls";

export type Product = {
  /** Référence unique, affichée sur la fiche et envoyée dans la commande WhatsApp. */
  id: string;
  /** Adresse de la page : /produit/<slug> */
  slug: string;
  name: string;
  nameAr?: string;
  category: CategoryId;
  /** Prix en DH, ou null pour « Prix sur WhatsApp ». */
  price: number | null;
  sizes: string[];
  colors: string[];
  images: string[];
  isNew: boolean;
  inStock: boolean;
  description: string;
  descriptionAr?: string;
};

export const categories: { id: CategoryId; name: string; nameAr: string }[] = [
  { id: "robes", name: "Robes", nameAr: "فساتين" },
  { id: "ensembles", name: "Ensembles", nameAr: "أطقم" },
  { id: "manteaux", name: "Manteaux", nameAr: "معاطف" },
  { id: "combinaisons", name: "Combinaisons", nameAr: "جمبسوت" },
  { id: "hauts", name: "Hauts", nameAr: "بلوزات وقمصان" },
  { id: "bas", name: "Bas", nameAr: "سراويل وجينز" },
  { id: "pulls", name: "Pulls", nameAr: "كنزات" },
];

const LETTERS = ["S", "M", "L", "XL"];
const NUMBERS = ["36", "38", "40", "42", "44"];
const STANDARD = ["Taille standard"];
const AS_PHOTO = ["Comme sur la photo"];

// L'ordre de la liste = ordre d'affichage (les premiers sont considérés comme les plus récents).
export const products: Product[] = [
  {
    id: "MN01",
    slug: "manteau-ceinture",
    name: "Manteau ceinturé",
    nameAr: "معطف بحزام",
    category: "manteaux",
    price: 249,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    images: ["/products/manteau-ceinture-beige.jpg", "/products/manteau-ceinture-noir.jpg"],
    isNew: true,
    inStock: true,
    description:
      "Coupe fluide et ceinture à nouer pour marquer la taille. Le manteau élégant qui sublime toutes vos tenues de saison.",
    descriptionAr:
      "قصّة انسيابية وحزام يُبرز الخصر. المعطف الأنيق الذي يُكمّل جميع إطلالاتك هذا الموسم.",
  },
  {
    id: "MN03",
    slug: "ensemble-3-pieces",
    name: "Ensemble 3 pièces",
    nameAr: "طقم من 3 قطع",
    category: "ensembles",
    price: 399,
    sizes: STANDARD,
    colors: AS_PHOTO,
    images: ["/products/ensemble-3-pieces.jpg"],
    isNew: true,
    inStock: true,
    description:
      "Robe longue sans manches, veste et ceinture assorties dans une jolie maille texturée bleu ciel. À porter ensemble ou séparément.",
    descriptionAr:
      "فستان طويل بدون أكمام مع جاكيت وحزام متناسقين، بقماش مموّج بلون أزرق سماوي. يُلبس معاً أو كل قطعة على حدة.",
  },
  {
    id: "MN02",
    slug: "manteau-long",
    name: "Manteau long",
    nameAr: "معطف طويل",
    category: "manteaux",
    price: 249,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: AS_PHOTO,
    images: ["/products/manteau-long.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Long manteau chocolat à col châle, ceinture à nouer et coupe fluide. Chic et enveloppant, il habille toutes vos tenues d'hiver.",
    descriptionAr:
      "معطف طويل بلون الشوكولاتة، بياقة شال وحزام يُربط وقصّة انسيابية. أنيق ودافئ لكل إطلالاتك الشتوية.",
  },
  {
    id: "MN04",
    slug: "ensemble-jean",
    name: "Ensemble en jean",
    nameAr: "طقم جينز",
    category: "ensembles",
    price: 279,
    sizes: NUMBERS,
    colors: AS_PHOTO,
    images: ["/products/ensemble-jean.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Gilet en jean sans manches à col chemise et jean large taille haute, en denim brut. Un ensemble moderne, à twister avec un foulard.",
    descriptionAr:
      "صدرية جينز بدون أكمام بياقة قميص مع جينز واسع بخصر عالٍ. طقم عصري يُنسّق بسهولة مع وشاح.",
  },
  {
    id: "MN05",
    slug: "robe-velours",
    name: "Robe en velours",
    nameAr: "فستان مخملي",
    category: "robes",
    price: 179,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-velours.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Velours profond, épaules dénudées et manches longues, coupe sirène qui sculpte la silhouette. La robe parfaite pour vos soirées d'hiver.",
    descriptionAr:
      "مخمل عميق بأكتاف مكشوفة وأكمام طويلة، وقصّة حورية تُبرز القوام. الفستان المثالي لسهرات الشتاء.",
  },
  {
    id: "MN07",
    slug: "robe-de-soiree",
    name: "Robe de soirée",
    nameAr: "فستان سهرة",
    category: "robes",
    price: 499,
    sizes: ["S", "M", "L"],
    colors: AS_PHOTO,
    images: ["/products/robe-de-soiree.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Dos nu, col bijou doré et drapé bénitier dans une maille pailletée bordeaux. Une robe de soirée qui brille à chaque pas.",
    descriptionAr:
      "ظهر مكشوف، ياقة ذهبية على شكل حُليّ، وقماش لامع بلون عنابي. فستان سهرة يتألق مع كل خطوة.",
  },
  {
    id: "MN06",
    slug: "robe-drapee-boucle",
    name: "Robe drapée à boucle",
    nameAr: "فستان ملفوف بحلقة ذهبية",
    category: "robes",
    price: 229,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-drapee-boucle.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Robe longue sans manches, drapé croisé fendu et boucle dorée à la taille. Une coupe sculptante, élégante en toute occasion.",
    descriptionAr:
      "فستان طويل بدون أكمام، بلفّة متقاطعة مع فتحة وحلقة ذهبية عند الخصر. قصّة أنيقة تناسب كل المناسبات.",
  },
  {
    id: "MN08",
    slug: "robe-epaulettes",
    name: "Robe longue à épaulettes",
    nameAr: "فستان طويل بأكتاف بارزة",
    category: "robes",
    price: 249,
    sizes: ["S", "M", "L"],
    colors: AS_PHOTO,
    images: ["/products/robe-epaulettes.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Robe longue près du corps, col montant et mancherons structurés. Un rose poudré tout doux pour une allure sophistiquée.",
    descriptionAr: "فستان طويل ضيّق بياقة عالية وأكمام قصيرة مُهيكلة، بلون وردي ناعم وإطلالة راقية.",
  },
  {
    id: "MN09",
    slug: "robe-a-pois",
    name: "Robe à pois",
    nameAr: "فستان منقّط",
    category: "robes",
    price: 219,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-a-pois.jpg"],
    isNew: false,
    inStock: false,
    description:
      "Robe longue à fines bretelles, pois blancs sur fond bleu marine. Un classique rétro, féminin et facile à porter.",
    descriptionAr: "فستان طويل بحمالات رفيعة، نقط بيضاء على خلفية زرقاء داكنة. كلاسيكي، أنثوي وسهل الارتداء.",
  },
  {
    id: "MN10",
    slug: "robe-longue-blanche",
    name: "Robe longue blanche",
    nameAr: "فستان طويل أبيض",
    category: "robes",
    price: 199,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-longue-blanche.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Robe longue à fines bretelles en maille fluide, ajustée et confortable. Une pièce minimaliste à accessoiriser selon vos envies.",
    descriptionAr: "فستان طويل بحمالات رفيعة من قماش مرن، ضيّق ومريح. قطعة بسيطة تُنسّقينها كما تحبين.",
  },
  {
    id: "MN11",
    slug: "haut-raye",
    name: "Haut rayé",
    nameAr: "بلوزة مخططة",
    category: "hauts",
    price: 149,
    sizes: STANDARD,
    colors: AS_PHOTO,
    images: ["/products/haut-raye.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Gilet en maille côtelée à larges rayures noir et blanc, boutons dorés. Le haut chic et douillet qui s'associe avec tout.",
    descriptionAr: "كارديغان من التريكو بخطوط عريضة بالأبيض والأسود وأزرار ذهبية. قطعة أنيقة ودافئة تُنسّق مع كل شيء.",
  },
  // Produits ajoutés depuis les photos : prix et tailles à confirmer avec la boutique.
  {
    id: "MN16",
    slug: "ensemble-tweed",
    name: "Ensemble en tweed",
    nameAr: "طقم تويد",
    category: "ensembles",
    price: null,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/ensemble-tweed.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Haut boutonné à poches et jupe longue en tweed rose, boutons perlés. Une élégance classique avec une touche de douceur.",
    descriptionAr: "بلوزة بأزرار وجيوب مع تنورة طويلة من التويد الوردي، بأزرار لؤلؤية. أناقة كلاسيكية بلمسة ناعمة.",
  },
  {
    id: "MN17",
    slug: "combinaison-zippee",
    name: "Combinaison zippée",
    nameAr: "جمبسوت بسحّاب",
    category: "combinaisons",
    price: null,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/combinaison-zippee.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Combinaison noire ajustée à zip, manches longues avec passe-pouce. Ultra confortable, elle sculpte la silhouette du matin au soir.",
    descriptionAr: "جمبسوت أسود ضيّق بسحّاب وأكمام طويلة مع فتحة للإبهام. مريح جداً ويُبرز القوام طوال اليوم.",
  },
  {
    id: "MN18",
    slug: "robe-jaune",
    name: "Robe jaune",
    nameAr: "فستان أصفر",
    category: "robes",
    price: null,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-jaune.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Robe longue jaune pastel, mancherons et jupe froncée à taille basse. Fraîche, légère et lumineuse pour les beaux jours.",
    descriptionAr: "فستان طويل بلون أصفر فاتح، بأكمام قصيرة وتنورة مكشكشة بخصر منخفض. منعش وخفيف لأيام الصيف.",
  },
  {
    id: "MN19",
    slug: "robe-bustier-jean",
    name: "Robe bustier en jean",
    nameAr: "فستان جينز بدون حمالات",
    category: "robes",
    price: null,
    sizes: LETTERS,
    colors: AS_PHOTO,
    images: ["/products/robe-bustier-jean.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Robe bustier en denim délavé, coupe ajustée. Un basique d'été moderne, à porter avec des sandales ou des baskets.",
    descriptionAr: "فستان جينز بدون حمالات بقصّة ضيّقة. قطعة صيفية عصرية تُلبس مع صندل أو حذاء رياضي.",
  },
  // En attente de photos.
  {
    id: "MN12",
    slug: "chemise",
    name: "Chemise",
    nameAr: "قميص",
    category: "hauts",
    price: 179,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: AS_PHOTO,
    images: ["/products/chemise.jpg", "/products/chemise-pantalon.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Une chemise fluide et élégante, à porter rentrée ou ouverte. La pièce qui rend chaque tenue plus chic.",
    descriptionAr: "قميص انسيابي وأنيق، يُلبس داخل السروال أو مفتوحاً. القطعة التي تجعل كل إطلالة أرقى.",
  },
  {
    id: "MN13",
    slug: "pantalon",
    name: "Pantalon",
    nameAr: "سروال",
    category: "bas",
    price: 179,
    sizes: NUMBERS,
    colors: AS_PHOTO,
    images: ["/products/pantalon.jpg", "/products/chemise-pantalon.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Une coupe nette qui allonge la silhouette, confortable toute la journée. À porter avec une chemise ou un haut simple.",
    descriptionAr: "قصّة أنيقة تُطيل القوام، مريح طوال اليوم. يُنسّق مع قميص أو بلوزة بسيطة.",
  },
  {
    id: "MN14",
    slug: "jean-elastique",
    name: "Jean élastique",
    nameAr: "جينز مطاطي",
    category: "bas",
    price: 149,
    sizes: NUMBERS,
    colors: AS_PHOTO,
    images: ["/products/jean-elastique.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Un jean stretch qui épouse vos formes et suit tous vos mouvements. Le basique indispensable, confortable du matin au soir.",
    descriptionAr: "جينز مرن يتماشى مع قوامك وحركتك. القطعة الأساسية المريحة من الصباح إلى المساء.",
  },
  {
    id: "MN15",
    slug: "pull",
    name: "Pull",
    nameAr: "كنزة",
    category: "pulls",
    price: null,
    sizes: ["S", "M", "L"],
    colors: AS_PHOTO,
    images: ["/products/pull.jpg"],
    isNew: false,
    inStock: true,
    description:
      "Un pull douillet et tout doux pour les journées fraîches. Prix et coloris disponibles : demandez-nous sur WhatsApp.",
    descriptionAr: "كنزة دافئة وناعمة للأيام الباردة. للثمن والألوان المتوفرة: راسلينا على واتساب.",
  },
];
