"use client";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./static/home.module.css";
import Image from "next/image";
import { TopBannerImageInfo } from "@/pageTypes/home.types";
import { useRouter } from "next/navigation";
import CommonButton from "../ui/button";
import PlayerIcon from "@/svgs/PlayerIcon";
import IIcon from "@/svgs/IIcon";
import AppStoreIcon from "@/svgs/AppStoreIcon";
import PlayStoreIcon from "@/svgs/PlayStoreIcon";

const Hero = ({
  slidingData,
}: {
  slidingData: { data: TopBannerImageInfo[] | null };
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  return (
    <div className=" relative bg-[black]">
      <Swiper
        // slidesPerView={1}
        // spaceBetween={1}
        loop={true}
        pagination={{ clickable: true }}
        // style={{ paddingBottom: "40px" }}
        // modules={[Navigation, Pagination]}
        // centeredSlides={true}
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {slidingData.data &&
          slidingData?.data?.map((topbannerinfo) => (
            <SwiperSlide
              key={topbannerinfo?.id}
              onClick={() => {
                router.push(`/audiobook_details/${topbannerinfo?.id}`);
              }}
            >
              <div className="relative h-[130vh] w-[100vw] max-w-[1440px] mx-auto  overflow-hidden">
                <div className={styles.backdrop_filter}>
                  <div className="">
                    <picture className={styles.thumb_path}>
                      <img
                        src={topbannerinfo?.thumb_path}
                        className="w-full opacity-30"
                      />
                    </picture>
                  </div>
                  <div
                    // className={styles.mobile_slider_icons}
                    className="flex p-[6vw] max-p-[160px] mt-[100px]"
                    // style={{backgroundImage:`url(${topbannerinfo.thumb_path})`}}
                  >
                    {/* <div className={styles.book_on_banner}>
                    <h5>{topbannerinfo.name}</h5>
                  </div> */}
                    <div className="w-full z-10  text-white">
                      <h3 className="text-[64px] font-semibold">{topbannerinfo.name}</h3>
                      <p className="text-[42px] my-7">{topbannerinfo.author_name}</p>
                      <CommonButton className={styles.hue_btn}>
                        <div className="flex gap-2">
                          <span className="mr-4 w-9 h-9 inline-block">
                            <PlayerIcon />
                          </span>
                          <p className="mt-0">এখনই শুনুন</p>
                        </div>
                      </CommonButton>
                      <CommonButton className={styles.secondary_btn+` bg-grey`}>
                        <div className="flex gap-2">
                          <span className="mr-4 w-9 h-9 inline-block">
                            <IIcon />
                          </span>
                          <p className="mt-0"> বিস্তারিত তথ্য</p>
                        </div>
                      </CommonButton>
                    </div>
                    <div className="mx-auto">
                      <img
                        src={topbannerinfo.thumb_path}
                        alt="Description"
                        className="max-w-[608px] max-h-[710px] border-2 rounded-[12px] border-white w-[30vw] h-[40vw] z-10 relative"
                      />
                    </div>
                  </div>
        </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={styles.play_icons}>
        <div className="mr-[3vw]">
          <h6 className={styles.download_txt}>এখনই আমাদের অডিওবুক অ্যাপটি 
            মোবাইলে ডাউনলোড করে নিন!</h6>
          <p className="text-[22px] mb-7">বইপড়ার নতুন উপায় — অডিওবুক অ্যাপ এখনই 
            ডাউনলোড করুন!</p>
            <div className="flex items-center">
              <picture className="mr-3">
                <img
                  src="/assets/users.png"
                  alt="users profiles"
                  className="max-w-[97px] max-h-[32px]"
                />
              </picture>
              <h6 className="text-[27px] leading-none">
                 সারা বিশ্বে ৫০০০+ <br/>
                 <span className="text-[16px] mt-0">সক্রিয় ব্যবহারকারী রয়েছে</span>
              </h6>
            </div>
        </div>
        <div className="flex min-w-[55%]">
          <span className="max-w-[297px] max-h-[297px] mr-[3vw] inline-block">
            <AppStoreIcon/>
          </span>
          <span className="max-w-[297px] max-h-[297px] inline-block">
            <PlayStoreIcon/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
