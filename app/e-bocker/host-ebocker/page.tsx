import { generateEbookMetadata } from "@/app/lib/ebook-seo";
import AutumnEbooksPageClient from "./page.client";

export async function generateMetadata() {
  return generateEbookMetadata({
    pageId: "host-ebocker",
    url: "/e-bocker/host-ebocker",
    fallbackTitle: "Höstkampanj - 3 e-böcker för 250 kr",
    fallbackDescription:
      "Fyll hösten med värmande soppor, näringsrika frukostar och färgstarka juicer. Få Den stora Soppboken, Juice & Glow och Hälsosamma Frukostar för endast 250 kr.",
    fallbackImage: "/host-bokbundle-square.png",
    keywords: [
      "höstkampanj",
      "e-böcker",
      "hälsosamma recept",
      "sopprecept",
      "hälsosamma frukostar",
      "juicerecept",
      "Functional Foods",
      "Ulrika Davidsson",
    ],
  });
}

export default function AutumnEbooksPage() {
  return <AutumnEbooksPageClient />;
}
