export const AUTUMN_EBOOK_CAMPAIGN_ID = "host-ebocker-2026";
export const AUTUMN_EBOOK_CAMPAIGN_ACTIVE = true;
export const AUTUMN_EBOOK_CAMPAIGN_STORAGE_KEY =
  "ff_campaign_host_ebocker_2026";
export const AUTUMN_EBOOK_CAMPAIGN_TAG = "Köp - Höstkampanj E-böcker";
export const AUTUMN_EBOOK_BUNDLE_GROSS_PRICE = 250;

export const AUTUMN_EBOOK_BUNDLE_IDS = [
  "soppboken",
  "juice-glow",
  "halsosamma-frukostar",
] as const;

const BOOK_VAT_RATE = 0.06;

export type AutumnEbookCartItem = {
  id: string;
  name?: string;
  price: number;
  quantity: number;
  type: "course" | "book";
  vatRate?: number;
};

export type AutumnEbookCampaignSource =
  | "campaign-link"
  | "cart-upsell"
  | "checkout-upsell"
  | "product-page"
  | "prova-popup";

export function storeAutumnEbookCampaignSource(
  source: AutumnEbookCampaignSource,
) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(
      AUTUMN_EBOOK_CAMPAIGN_STORAGE_KEY,
      JSON.stringify({
        id: AUTUMN_EBOOK_CAMPAIGN_ID,
        source,
        createdAt: new Date().toISOString(),
      }),
    );
  } catch {}
}

export function getStoredAutumnEbookCampaignSource():
  | AutumnEbookCampaignSource
  | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = sessionStorage.getItem(AUTUMN_EBOOK_CAMPAIGN_STORAGE_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored);
    if (!isAutumnEbookCampaignId(parsed?.id)) return undefined;

    return parsed?.source;
  } catch {
    return undefined;
  }
}

export const AUTUMN_EBOOK_PRODUCTS = [
  {
    id: "soppboken",
    name: "Den stora Soppboken – E-bok av Ulrika Davidsson",
    price: 93.4,
    quantity: 1,
    type: "book" as const,
    image: "/soppboken-square.png",
  },
  {
    id: "juice-glow",
    name: "Juice & Glow – E-bok av Ulrika Davidsson",
    price: 121.7,
    quantity: 1,
    type: "book" as const,
    image: "/juice-glow-square.png",
  },
  {
    id: "halsosamma-frukostar",
    name: "Hälsosamma Frukostar – E-bok av Ulrika Davidsson",
    price: 93.4,
    quantity: 1,
    type: "book" as const,
    image: "/halsosamma-frukostar-square.png",
  },
];

export const AUTUMN_EBOOK_TRIGGER_IDS = [...AUTUMN_EBOOK_BUNDLE_IDS] as const;

export function isAutumnEbookCampaignId(campaignId?: string | null) {
  return campaignId === AUTUMN_EBOOK_CAMPAIGN_ID;
}

export function isAutumnEbookBundleBook(id: string) {
  return (AUTUMN_EBOOK_BUNDLE_IDS as readonly string[]).includes(id);
}

export function isAutumnEbookTriggerBook(id: string) {
  return (AUTUMN_EBOOK_TRIGGER_IDS as readonly string[]).includes(id);
}

export function hasAutumnEbookBundle(items: AutumnEbookCartItem[]) {
  return AUTUMN_EBOOK_BUNDLE_IDS.every((id) =>
    items.some((item) => item.id === id && item.quantity > 0),
  );
}

export function hasAutumnEbookBundleByIdentity(
  items: Array<{
    id?: string | null;
    name?: string | null;
    quantity?: number | null;
  }>,
) {
  const present = new Set<string>();

  for (const item of items) {
    if ((item.quantity ?? 1) <= 0) continue;

    const identity = `${item.id || ""} ${item.name || ""}`.toLowerCase();

    if (
      identity.includes("soppboken") ||
      identity.includes("den stora soppboken") ||
      identity.includes("stora soppboken")
    ) {
      present.add("soppboken");
    }

    if (
      identity.includes("juice-glow") ||
      identity.includes("juice & glow") ||
      identity.includes("juice glow") ||
      identity.includes("juice och glow")
    ) {
      present.add("juice-glow");
    }

    if (
      identity.includes("halsosamma-frukostar") ||
      identity.includes("hälsosamma frukostar") ||
      identity.includes("halsosamma frukostar")
    ) {
      present.add("halsosamma-frukostar");
    }
  }

  return AUTUMN_EBOOK_BUNDLE_IDS.every((id) => present.has(id));
}

export function getMissingAutumnEbookProducts(items: AutumnEbookCartItem[]) {
  const present = new Set(
    items.filter((item) => item.quantity > 0).map((item) => item.id),
  );

  return AUTUMN_EBOOK_PRODUCTS.filter((product) => !present.has(product.id));
}

export function applyAutumnEbookBundlePricing<T extends AutumnEbookCartItem>(
  items: T[],
): T[] {
  if (!AUTUMN_EBOOK_CAMPAIGN_ACTIVE) return items;
  if (!hasAutumnEbookBundle(items)) return items;

  const bundleItems = AUTUMN_EBOOK_BUNDLE_IDS.map((id) =>
    items.find((item) => item.id === id),
  ).filter(Boolean) as T[];

  const bundleCount = Math.min(...bundleItems.map((item) => item.quantity));

  if (!Number.isFinite(bundleCount) || bundleCount <= 0) return items;

  const normalBundleGross = bundleItems.reduce((sum, item) => {
    const vatRate = item.vatRate ?? BOOK_VAT_RATE;
    return sum + item.price * (1 + vatRate);
  }, 0);

  if (normalBundleGross <= AUTUMN_EBOOK_BUNDLE_GROSS_PRICE) return items;

  return items.map((item) => {
    if (!isAutumnEbookBundleBook(item.id)) return item;

    const vatRate = item.vatRate ?? BOOK_VAT_RATE;
    const normalGross = item.price * (1 + vatRate);

    const campaignGrossShare =
      AUTUMN_EBOOK_BUNDLE_GROSS_PRICE * (normalGross / normalBundleGross);

    const campaignExVatShare = campaignGrossShare / (1 + vatRate);
    const regularQuantity = Math.max(0, item.quantity - bundleCount);

    const adjustedUnitPrice =
      (campaignExVatShare * bundleCount + item.price * regularQuantity) /
      item.quantity;

    return {
      ...item,
      price: adjustedUnitPrice,
    };
  });
}
