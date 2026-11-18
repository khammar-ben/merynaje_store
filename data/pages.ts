/**
 * Textes des pages d'information (Livraison, Paiement, Pas d'échange).
 * Les frais et délais viennent de settings.ts : modifiez-les là-bas.
 * La page Contact est construite automatiquement à partir de settings.ts.
 */
import { settings, type Localized } from "./settings";

export type InfoPage = {
  slug: "livraison" | "paiement-a-la-livraison" | "pas-d-echange";
  title: Localized;
  intro: Localized;
  sections: { title: Localized; body: Localized }[];
};

export const infoPages: InfoPage[] = [
  {
    slug: "livraison",
    title: { fr: "Livraison", ar: "التوصيل" },
    intro: {
      fr: "Nous livrons partout au Maroc 🇲🇦, directement chez vous.",
      ar: "كنوصلو لجميع مدن المغرب 🇲🇦، حتى لباب الدار.",
    },
    sections: [
      {
        title: { fr: "Frais & délais", ar: "المصاريف والمدة" },
        body: {
          fr: `${settings.deliveryFeeLabel.fr}. ${settings.deliveryDelayLabel.fr} selon votre ville.`,
          ar: `${settings.deliveryFeeLabel.ar}. ${settings.deliveryDelayLabel.ar} حسب مدينتك.`,
        },
      },
      {
        title: { fr: "Comment ça se passe ?", ar: "كيفاش كتدوز العملية؟" },
        body: {
          fr: "Après votre commande, nous vous contactons sur WhatsApp pour confirmer les articles, la taille et l'adresse. Votre colis est ensuite remis au livreur, qui vous appelle avant de passer.",
          ar: "من بعد الطلب، كنتواصلو معاك على واتساب باش نأكدو المنتجات والمقاس والعنوان. من بعد كيتسلم الطلب لعامل التوصيل اللي كيعيط ليك قبل ما يجي.",
        },
      },
      {
        title: { fr: "Retrait en boutique", ar: "الاستلام من المحل" },
        body: {
          fr: `Vous êtes à Casablanca ? Passez nous voir : ${settings.address.fr} (${settings.hours.fr}).`,
          ar: `ساكنة فالدار البيضاء؟ دوزي عندنا: ${settings.address.ar} (${settings.hours.ar}).`,
        },
      },
    ],
  },
  {
    slug: "paiement-a-la-livraison",
    title: { fr: "Paiement à la livraison", ar: "الدفع عند الاستلام" },
    intro: {
      fr: "Aucun paiement en ligne : vous payez en espèces, au livreur, à la réception de votre colis.",
      ar: "بلا خلاص أونلاين: كتخلصي كاش لعامل التوصيل ملي كيوصلك الطلب.",
    },
    sections: [
      {
        title: { fr: "Simple et sans risque", ar: "بسيط وبلا مخاطرة" },
        body: {
          fr: "Vous commandez sur le site ou sur WhatsApp, nous confirmons avec vous, puis vous réglez le montant total (articles + livraison) au moment de la livraison.",
          ar: "كتطلبي من الموقع أو على واتساب، كنأكدو معاك، ومن بعد كتخلصي المبلغ الكامل (المنتجات + التوصيل) ملي كيوصلك.",
        },
      },
      {
        title: { fr: "Préparez l'appoint", ar: "وجدي الصرف" },
        body: {
          fr: "Pour faciliter la livraison, merci de prévoir le montant exact si possible.",
          ar: "باش تسهلي التوصيل، المرجو توجدي المبلغ بالضبط إلا أمكن.",
        },
      },
    ],
  },
  {
    slug: "pas-d-echange",
    title: { fr: "Pas d'échange", ar: "لا يوجد استبدال" },
    intro: {
      fr: "Pour des raisons d'hygiène et de qualité, les articles ne sont ni échangés ni repris.",
      ar: "لأسباب صحية وحفاظاً على الجودة، لا يتم استبدال المنتجات ولا إرجاعها.",
    },
    sections: [
      {
        title: { fr: "Vérifiez bien votre taille", ar: "تأكدي من المقاس" },
        body: {
          fr: "Consultez le guide des tailles sur chaque fiche produit. Un doute ? Envoyez-nous vos mesures sur WhatsApp : nous vous conseillons avec plaisir avant la commande.",
          ar: "شوفي دليل المقاسات فكل صفحة منتج. عندك شك؟ صيفطي لينا قياساتك على واتساب ونعاونوك قبل الطلب.",
        },
      },
      {
        title: { fr: "Essayez en boutique", ar: "جربي فالمحل" },
        body: {
          fr: `Vous pouvez aussi venir essayer en boutique : ${settings.address.fr}, ${settings.hours.fr.toLowerCase()}.`,
          ar: `تقدري تجي تجربي فالمحل: ${settings.address.ar}، ${settings.hours.ar}.`,
        },
      },
    ],
  },
];
