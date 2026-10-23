import { generateEbookMetadata } from "@/app/lib/ebook-seo";
import Julbord2026EgmontPageClient from "./page.client";

export async function generateMetadata() {
  return generateEbookMetadata({
    pageId: "julbord-2026-egmont",
    url: "/e-bocker/julbord-2026-egmont",
    fallbackTitle: "Julbord - E-bok",
    fallbackDescription: "Ulrikas julbord",
    fallbackImage: "/julbord-2026-square.png",
    keywords: [
      "julbord",
      "julmat",
      "e-bok",
      "functional foods",
      "Ulrika Davidsson",
    ],
  });
}

export default function Julbord2026EgmontPage() {
  return <Julbord2026EgmontPageClient />;
}
