"use client";

import { useEffect } from "react";
import {
  AUTUMN_EBOOK_CAMPAIGN_ID,
  AUTUMN_EBOOK_CAMPAIGN_STORAGE_KEY,
  AUTUMN_EBOOK_PRODUCTS,
} from "@/app/lib/campaigns/autumn-ebooks";

export default function AutumnEbookCampaignPage() {
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(AUTUMN_EBOOK_PRODUCTS));
      localStorage.removeItem("cart_coupon");

      sessionStorage.setItem(
        AUTUMN_EBOOK_CAMPAIGN_STORAGE_KEY,
        JSON.stringify({
          id: AUTUMN_EBOOK_CAMPAIGN_ID,
          source: "campaign-link",
          createdAt: new Date().toISOString(),
        }),
      );
    } catch (error) {
      console.error("Failed to prepare autumn ebook campaign cart:", error);
    }

    const params = new URLSearchParams(window.location.search);
    params.set("campaign", AUTUMN_EBOOK_CAMPAIGN_ID);

    window.location.href = `/cart?${params.toString()}`;
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-[#014421]/20 border-t-[#014421] animate-spin" />

        <h1 className="text-2xl font-semibold text-[#014421]">
          Förbereder ditt hösterbjudande
        </h1>

        <p className="mt-2 text-gray-600">
          Den stora Soppboken, Juice & Glow och Hälsosamma Frukostar läggs i
          varukorgen.
        </p>
      </div>
    </main>
  );
}
