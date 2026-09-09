import { generateEbookMetadata } from "@/app/lib/ebook-seo";
import JulbordPageClient from "./page.client";

export async function generateMetadata() {
  return generateEbookMetadata({
    pageId: "julbord",
    url: "/e-bocker/julbord",
    fallbackTitle: "Julbord - E-bok",
    fallbackDescription: "Ulrikas julbord",
    fallbackImage: "/paskbuffe-square.jpg",
    keywords: [
      "julbord",
      "julmat",
      "e-bok",
      "functional foods",
      "Ulrika Davidsson",
    ],
  });
}

export default function PaskbokenPage() {
  return <JulbordPageClient />;
}
