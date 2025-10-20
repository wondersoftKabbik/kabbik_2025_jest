'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Home/static/TopTen.module.css'
// import MobileGreenPlayer from '../../svgs/MobileGreenPlayer';
// import DesktopCrown from '../../svgs/DesktopCrown';
import RightArrowIcon from '@/svgs/RightArrowIcon';
import PremiumCrownIcon from '@/svgs/PremiumIcon';
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
} from "swiper/modules";
import RedPlayerIcon from '@/svgs/RedPlayerIcon';
// import { useRouter } from 'next/router';
import RightAngle from '@/svgs/rightAngle';
import { TBooks } from '@/pageTypes/home.types';
import { useRouter } from 'next/navigation';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CommonButton from '../ui/button';
import PlayerIcon from '@/svgs/PlayerIcon';
import ExpandableIcon from '@/svgs/ExpandableIcon';
import { OneToTen } from './static/utils';
// import DesktopCrown from '../../svgs/DesktopCrown';

type tProps={
    categoryName:string;
    link:string;
    data:TBooks[] | undefined;
    isPopular?:boolean;
}
const TopTen = ({categoryName,link,data,isPopular}:tProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router=useRouter();
  const [expand,setIsExpand]=useState<boolean>(false);
  return (

    <div className={styles.container+" pt-8 px-2"}>
        {/* <div className={styles.heading_container}>
            <h3 className={styles.heading}>{categoryName}</h3>
            <div className={styles.see_all}>
                সব দেখুন
                <span className={styles.arrow}><RightArrowIcon/></span>
            </div>
        </div> */}
        <div className={styles.slider_box}>
                  {/* Custom Arrows */}
                  <button
                    ref={prevRef}
                    className={styles.slider_icons + ` ${styles.slider_left_icons}`}
                  >
                    <RightAngle color='white' className='rotate-180' />
                  </button>
                  <button
                    ref={nextRef}
                    className={styles.slider_icons + ` ${styles.slider_right_icons}`}
                  >
                    <RightAngle color='white' />
                  </button>

                  <Swiper
                    // slidesPerView={1}
                    // spaceBetween={1}
                    loop={true}
                      pagination={{ clickable: true }}
                      style={{ paddingBottom: '40px' }}
                      // modules={[Navigation, Pagination]}
                    // centeredSlides={true}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                     breakpoints={{
                        0: {
                          slidesPerView: 2,
                        },
                        350: {
                          slidesPerView: 2.2,
                        },
                        500: {
                          slidesPerView: 2.4,
                        },
                        600: {
                          slidesPerView: 2.6,
                        },
                        768: {
                          slidesPerView: 2.8,
                        },
                        868: {
                          slidesPerView: 3,
                        },
                        1000: {
                          slidesPerView: 3,
                        },
                        1150: {
                          slidesPerView: 4,
                        },
                    }}
                    onBeforeInit={(swiper:any) => {
                      if (
                        swiper.params.navigation &&
                        typeof swiper.params.navigation !== "boolean"
                      ) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                      }
                    }}
                  >
                    <>
                            {data && data.filter((item)=>item.premium).slice(0,9).map((item:TBooks,index:number)=>(
                                <SwiperSlide
                                  key={item?.id}
                                  onClick={() => {
                                    router.push(
                                      `/audiobook/${item?.id}`
                                    );
                                  }}
                                  className={styles.swiper_slider_custom}
                                >
                                  <Link href={`/audiobook/${item?.id}`}>
                                      <div className={styles.item_cont} key={index}>
                                        <span className='max-w-[280px] max-h-[20vh]  xxs2:max-h-[25vh] md:max-h-[210px] inline-block'>
                                          {OneToTen[(index+1).toString()] ?(
                                            OneToTen[(index+1).toString()]
                                          ):''}
                                        </span>
                                          {/* <picture className={styles.picture}>
                                              <img className={styles.img} src={item.thumb_path} alt={item.name}/>
                                          </picture> */}
                                          <picture className={styles.picture}>
                                            <Image
                                              src={item.thumb_path}
                                              alt={item.name}
                                              width={210}   // or your preferred size
                                              height={320}  // or aspect-ratio based
                                              className={styles.img}
                                              loading="lazy"
                                              sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                          </picture>
                                          <p className={styles.player_count}>
                                            <span className='w-4 h-4'>
                                                <RedPlayerIcon/>
                                            </span>
                                            <span className='text-cxs'>{(item?.play_count/1000).toFixed(2)}k <span className='max-xs:hidden'>listen</span></span>
                                        </p>
                                      </div>
                                  </Link>
                                </SwiperSlide>
                            ))}
                    </>
                  </Swiper>
                </div>
    </div>
  )
}

export default TopTen