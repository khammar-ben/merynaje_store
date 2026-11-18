/**
 * ─────────────────────────────────────────────────────────────
 *  RÉGLAGES DU SITE — Mery Naje
 *  Tout ce que vous pouvez modifier facilement est ici :
 *  téléphone, adresse, horaires, livraison, textes, guide des tailles…
 *  Chaque texte existe en français (fr) et en arabe (ar).
 * ─────────────────────────────────────────────────────────────
 */

export type Localized = { fr: string; ar: string };

export const settings = {
  /** Nom affiché partout sur le site. */
  storeName: "Mery Naje",
  /** Texte du logo (utilisé si /public/logo.png est absent). */
  logoText: "MERYNAJE STORE",

  /**
   * Adresse du site (aperçus de liens WhatsApp/Instagram, SEO).
   * Laissez vide : sur Vercel, l'adresse du projet est utilisée automatiquement.
   * Une fois le nom de domaine acheté, mettez-le ici (ex. "https://merynaje.ma").
   */
  siteUrl: "",

  /**
   * Indexation Google. Laissez `false` tant que la cliente n'a pas validé le site :
   * la démo ne sera pas référencée par Google.
   */
  allowIndexing: false,

  // ── Contact ────────────────────────────────────────────────
  /** Numéro affiché aux clientes. */
  phoneDisplay: "07 14 19 19 62",
  /** Numéro pour les appels (format international). */
  phoneLink: "+212714191962",
  /** Numéro WhatsApp qui reçoit les commandes : format international SANS « + » ni espaces. */
  whatsappNumber: "212714191962",

  instagram: {
    handle: "merynaje.store",
    url: "https://www.instagram.com/merynaje.store/",
    /** Nombre d'abonnées affiché dans le bandeau Instagram. */
    followers: "+89K",
  },

  // ── Boutique physique ──────────────────────────────────────
  address: {
    fr: "Hay Adil, rue 19, numéro 14, Casablanca",
    ar: "حي عادل، زنقة 19، رقم 14، الدار البيضاء",
  } satisfies Localized,
  wazeHint: {
    fr: "Sur Waze, cherchez « merynaje.store »",
    ar: "على Waze، ابحثي عن « merynaje.store »",
  } satisfies Localized,
  wazeUrl: "https://waze.com/ul?q=merynaje.store",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Hay Adil rue 19 numéro 14 Casablanca"),
  hours: {
    fr: "Tous les jours · 09:00 – 21:00",
    ar: "كل يوم · 09:00 – 21:00",
  } satisfies Localized,

  // ── Livraison & paiement ───────────────────────────────────
  /**
   * Frais de livraison en DH ajoutés au total.
   * Laissez `null` tant que le tarif n'est pas connu : le total affichera « + livraison ».
   */
  deliveryFee: null as number | null,
  /** Texte affiché pour les frais (placeholder à compléter). */
  deliveryFeeLabel: {
    fr: "Frais de livraison : XX DH",
    ar: "مصاريف التوصيل: XX درهم",
  } satisfies Localized,
  /** Délai de livraison (placeholder à compléter). */
  deliveryDelayLabel: {
    fr: "Délai : 24–72h",
    ar: "مدة التوصيل: 24–72 ساعة",
  } satisfies Localized,

  /** Rappel « pas d'échange » affiché sur la fiche produit et dans le panier. */
  noExchangeNotice: {
    fr: "Merci de bien vérifier la taille avant de commander : les articles ne sont pas échangés.",
    ar: "المرجو التأكد جيداً من المقاس قبل الطلب: لا يتم استبدال المنتجات.",
  } satisfies Localized,

  // ── Textes de la page d'accueil ────────────────────────────
  topBar: {
    fr: "Livraison partout au Maroc 🇲🇦 · Paiement à la livraison",
    ar: "التوصيل لجميع مدن المغرب 🇲🇦 · الدفع عند الاستلام",
  } satisfies Localized,
  hero: {
    /**
     * Produits (slugs) dont les photos décorent l'accueil tant qu'il n'y a pas de photo
     * de la boutique dans /public/store (la 1ʳᵉ photo de boutique devient alors l'image de fond).
     */
    products: ["manteau-long", "robe-de-soiree"],
    eyebrow: { fr: "Merhba bikom 😍", ar: "مرحبا بيكم 😍" } satisfies Localized,
    title: { fr: "L'élégance au quotidien", ar: "الأناقة في كل يوم" } satisfies Localized,
    subtitle: {
      fr: "Prêt-à-porter féminin · Casablanca",
      ar: "ملابس نسائية جاهزة · الدار البيضاء",
    } satisfies Localized,
  },

  // ── Page « La boutique » ───────────────────────────────────
  story: {
    title: {
      fr: "Mery Naje, prêt-à-porter féminin à Casablanca",
      ar: "Mery Naje، ملابس نسائية جاهزة بالدار البيضاء",
    } satisfies Localized,
    paragraphs: [
      {
        fr: "Chez Mery Naje, on croit que l'élégance doit être simple, accessible et faite pour la vraie vie. Robes, ensembles, manteaux : chaque pièce est choisie avec soin pour vous accompagner au quotidien, au travail comme pour vos plus belles occasions.",
        ar: "في Mery Naje، نؤمن أن الأناقة يجب أن تكون بسيطة وفي المتناول ومناسبة للحياة اليومية. فساتين، أطقم، معاطف: كل قطعة مختارة بعناية لترافقك كل يوم، في العمل وفي أجمل مناسباتك.",
      },
      {
        fr: "Notre boutique de Hay Adil vous accueille tous les jours dans une ambiance chaleureuse, entre bois, lumière dorée et plantes vertes. Venez essayer : on vous conseille avec plaisir.",
        ar: "يستقبلك محلنا في حي عادل كل يوم في أجواء دافئة بين الخشب والإضاءة الذهبية والنباتات الخضراء. مرحبا بيك تجربي، ونعاونوك تختاري بكل فرح.",
      },
      {
        fr: "Vous ne pouvez pas vous déplacer ? Commandez en ligne ou sur WhatsApp : on livre partout au Maroc et vous payez à la livraison.",
        ar: "ما تقدريش تجي للمحل؟ اطلبي أونلاين أو على واتساب: كنوصلو لجميع مدن المغرب والدفع عند الاستلام.",
      },
    ] satisfies Localized[],
  },

  // ── Commande ───────────────────────────────────────────────
  /** Villes proposées dans le formulaire (la valeur française est envoyée sur WhatsApp). */
  cities: [
    { fr: "Casablanca", ar: "الدار البيضاء" },
    { fr: "Rabat", ar: "الرباط" },
    { fr: "Salé", ar: "سلا" },
    { fr: "Témara", ar: "تمارة" },
    { fr: "Mohammédia", ar: "المحمدية" },
    { fr: "Marrakech", ar: "مراكش" },
    { fr: "Fès", ar: "فاس" },
    { fr: "Meknès", ar: "مكناس" },
    { fr: "Tanger", ar: "طنجة" },
    { fr: "Tétouan", ar: "تطوان" },
    { fr: "Agadir", ar: "أكادير" },
    { fr: "Kénitra", ar: "القنيطرة" },
    { fr: "El Jadida", ar: "الجديدة" },
    { fr: "Settat", ar: "سطات" },
    { fr: "Berrechid", ar: "برشيد" },
    { fr: "Béni Mellal", ar: "بني ملال" },
    { fr: "Khouribga", ar: "خريبكة" },
    { fr: "Safi", ar: "آسفي" },
    { fr: "Essaouira", ar: "الصويرة" },
    { fr: "Oujda", ar: "وجدة" },
    { fr: "Nador", ar: "الناظور" },
    { fr: "Laâyoune", ar: "العيون" },
    { fr: "Dakhla", ar: "الداخلة" },
  ] satisfies Localized[],

  // ── Guide des tailles (mesures en cm, génériques : à remplacer par celles de la boutique) ──
  sizeGuide: {
    columns: [
      { fr: "Taille", ar: "المقاس" },
      { fr: "Équivalent", ar: "ما يعادل" },
      { fr: "Poitrine", ar: "الصدر" },
      { fr: "Taille", ar: "الخصر" },
      { fr: "Hanches", ar: "الأرداف" },
    ] satisfies Localized[],
    rows: [
      ["XS", "34", "80–84", "62–66", "86–90"],
      ["S", "36", "84–88", "66–70", "90–94"],
      ["M", "38", "88–92", "70–74", "94–98"],
      ["L", "40", "92–96", "74–78", "98–102"],
      ["XL", "42", "96–100", "78–82", "102–106"],
      ["XXL", "44", "100–106", "82–88", "106–112"],
    ],
    note: {
      fr: "« Taille standard » convient généralement du S au L. Un doute ? Envoyez-nous vos mesures sur WhatsApp, on vous conseille.",
      ar: "« المقاس الموحد » يناسب عادةً من S إلى L. عندك شك؟ صيفطي لينا قياساتك على واتساب ونعاونوك.",
    } satisfies Localized,
  },

  /**
   * Pastilles de couleur : nom de la couleur (comme dans products.ts) → code couleur + nom arabe.
   * Ajoutez ici toute nouvelle couleur utilisée dans un produit.
   */
  colors: {
    Beige: { hex: "#D9C3A3", ar: "بيج" },
    Noir: { hex: "#1E1A17", ar: "أسود" },
    Blanc: { hex: "#FFFFFF", ar: "أبيض" },
    Marron: { hex: "#7A5638", ar: "بني" },
    Camel: { hex: "#B98A56", ar: "جملي" },
    Gris: { hex: "#9A9590", ar: "رمادي" },
    "Bleu nuit": { hex: "#1F2A44", ar: "أزرق داكن" },
    Bordeaux: { hex: "#6B1F2A", ar: "عنابي" },
    Vert: { hex: "#6F7F5C", ar: "أخضر" },
    Rose: { hex: "#E8C4C0", ar: "وردي" },
    "Comme sur la photo": { hex: "", ar: "كما في الصورة" },
  } as Record<string, { hex: string; ar: string }>,
};
