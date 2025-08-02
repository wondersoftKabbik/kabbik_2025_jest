import { HomeInfo, PromoBannerInfo, TopBannerImageInfo } from "@/pageTypes/home.types";
import bn from '@/locales/bn/common.json';
import en from '@/locales/en/common.json';


export type THomeProps={
    dict: typeof bn | typeof en,
    homeData:HomeInfo,
    topBannerData:{data:TopBannerImageInfo[] | null},
    promoData:PromoBannerInfo,
}