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
    <div className="relative w-full">
      <div className=" relative w-full bg-[black]">
        
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
          breakpoints={{
            0: { slidesPerView: 1 },
            // 640: { slidesPerView: 1.2 },
            // 1024: { slidesPerView: 2 },
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
                  router.push(`/audiobook/${topbannerinfo?.id}`);
                }}
              >
                <div className="relative h-[70vh] xxs:h-[70vh] xs:h-[80vh] sm:h-[85vh] md:h-[95vh] md2:h-[105vh] lg:h-[115vh] lg2:h-[125vh] w-[100vw] max-w-[1440px] mx-auto overflow-hidden">
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
                      className="flex px-[6vw] py-[4vw] max-w-[1130px] items-center mx-auto max-p-[160px] mt-[100px]"
                      // style={{backgroundImage:`url(${topbannerinfo.thumb_path})`}}
                    >
                      {/* <div className={styles.book_on_banner}>
                      <h5>{topbannerinfo.name}</h5>
                    </div> */}
                      <div className="w-full z-10 max-sm:mt-[7.5vh]  text-white">
                        <h3 className=" leading-[1.3] text-clg2 xxs2:text-cxl md2:text-cxxl2 w-full 1350:w-[60%] font-semibold">{topbannerinfo.name}</h3>
                        <p className="text-clg sm:text-cxl my-4 sm:my-7">{topbannerinfo.author_name}</p>
                        <CommonButton className={styles.hue_btn}>
                          <div className="flex gap-2">
                            <span className=" xxs2:mr-4 w-5 h-5 sm:w-7 sm:h-7 inline-block">
                              <PlayerIcon />
                            </span>
                            <p className="text-cn sm:text-cn2 mt-0">এখনই শুনুন</p>
                          </div>
                        </CommonButton>
                        <CommonButton className={styles.secondary_btn+` bg-grey`}>
                          <div className="flex gap-2">
                            <span className="xxs2:mr-4 w-5 h-5 sm:w-7 sm:h-7 inline-block">
                              <IIcon />
                            </span>
                            <p className="text-cn sm:text-cn2 mt-0"> বিস্তারিত তথ্য</p>
                          </div>
                        </CommonButton>
                      </div>
                      <div className="mx-auto">
                        <img
                          src={topbannerinfo.thumb_path}
                          alt="Description"
                          className="max-w-[350px] max-h-[440px] border-2 rounded-[12px] border-white w-[35vw] h-[48vw]  xs:w-[30vw] xs:h-[40vw] z-10 relative"
                        />
                      </div>
                    </div>
          </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
        {/* <div className="z-10 w-full h-24 flex items-center justify-between">
          <div className="w-[50%]">
            <div className="rect-gradient1 z-10  h-12 "></div>
            <div className="rect-gradient2 z-10  h-12 "></div>
          </div>

          <div className="rect-gradient z-10 w-[50%] h-12 "></div>
        </div> */}
        <div className="circular_gradient left-[-10%] bottom-[10%] w-[30vw] h-[30vw] absolute rounded-[50%] z-[2] "></div>
      <div className="mt-[-10%] ">
        <div className="bg-bg z-10 relative">
        <div className={styles.play_icons+' z-[5] relative '}>
          <div className="mr-[1vw] sm:mr-[3vw]">
            <h6 className={styles.download_txt}>এখনই আমাদের অডিওবুক অ্যাপটি 
              মোবাইলে ডাউনলোড করে নিন!</h6>
            <p className="text-cn lg:text-cn2 mb-[12px] lg:mb-[22px]">বইপড়ার নতুন উপায় — অডিওবুক অ্যাপ এখনই 
              ডাউনলোড করুন!</p>
              <div className="flex items-center">
                <picture className="mr-3">
                  <img
                    src="/assets/users.png"
                    alt="users profiles"
                    className="max-w-[94px] max-h-[30px]"
                  />
                </picture>
                <h6 className="text-cn lg:text-clg leading-none">
                  সারা বিশ্বে ১৮ লক্ষ + <br/>
                  <span className="text-cs2 lg:text-[16px] mt-0">সক্রিয় ব্যবহারকারী রয়েছে</span>
                </h6>
              </div>
          </div>
          <div className="flex max-md:mt-7 md:justify-end min-w-[55%]">
            <span className="max-w-[220px] max-h-[220px] mr-[3vw] inline-block">
              <a href={"https://apps.apple.com/us/app/kabbik/id6459885875"}><AppStoreIcon/></a>
            </span>
            <span className="max-w-[220px] max-h-[220px] inline-block">
              <a href="https://play.google.com/store/apps/details?id=com.kabbik.app"><PlayStoreIcon/></a>
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
    
  );
};

export default Hero;
