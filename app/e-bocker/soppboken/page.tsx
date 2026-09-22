import { generateEbookMetadata } from "@/app/lib/ebook-seo";
import SoppbokenPageClient from "./page.client";

export async function generateMetadata() {
  return generateEbookMetadata({
    pageId: "soppboken",
    url: "/e-bocker/soppboken",
    fallbackTitle: "Den stora Soppboken - E-bok",
    fallbackDescription:
      "Goda, färgstarka och näringsrika soppor för luncher, middagar och alla dagar när du längtar efter något varmt, gott och mättande.",
    fallbackImage: "/soppboken-square.png",
    keywords: [
      "soppboken",
      "den stora soppboken",
      "soppor",
      "soppa",
      "e-bok",
      "functional foods",
      "Ulrika Davidsson",
    ],
  });
}

export default function SoppbokenPage() {
  return <SoppbokenPageClient />;
}
