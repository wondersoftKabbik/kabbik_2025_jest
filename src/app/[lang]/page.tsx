import { AccordionDemo } from "@/components/ui/Accordion";
import { CatagorySuggestionsInfo, HomeInfo, PromoBannerInfo, TopBannerImageInfo } from "@/pageTypes/home.types";
import { categorySuggestions, homeListData, promoBannerList, topBanner } from "@/utils/apiServices";
import { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "./dictionaries";

export const metadata: Metadata = {
  title: "Bangla Audiobook App | Kabbik Audiobook & Podcast",
  description:
    "Kabbik is one of the best audiobook apps that offers over 3000 + Bangla audiobooks in Bengali Language",
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'bl' }>
}) {

  const { lang } = await params
    const dict = await getDictionary(lang) // en
  const homeData: HomeInfo = await homeListData();
  const topBannerData: TopBannerImageInfo = await topBanner();
  const promoData: PromoBannerInfo = await promoBannerList();
 console.log(dict);
  return (
    <main >
    </main>
  );
}
