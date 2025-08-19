import { AccordionDemo } from "@/components/ui/Accordion";
import { CatagorySuggestionsInfo, HomeInfo, PromoBannerInfo, TopBannerImageInfo } from "@/pageTypes/home.types";
import { categorySuggestions, homeListData, promoBannerList, topBanner } from "@/utils/apiServices";
import { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "./dictionaries";
import HomeComponent from "@/components/Home/HomeComponent.view";
import { getApprovedBlogs } from "@/utils/server-api";

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
  
  const topBannerData: {data:TopBannerImageInfo[] | null} = await topBanner();
  const promoData: PromoBannerInfo = await promoBannerList();
  const blogs = await getApprovedBlogs();

  console.log(topBannerData,"homeData");
  return (
    <main className="bg-bg min-h-screen">
      <HomeComponent
        homeData={homeData}
        topBannerData={topBannerData}
        promoData={promoData}
        dict={dict}
        blogs={blogs}
      />
    </main>
  );
}
