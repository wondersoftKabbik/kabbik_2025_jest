'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Home/static/category.module.css'
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
import { paths } from '@/utils/Paths';
// import DesktopCrown from '../../svgs/DesktopCrown';

type tProps={
    categoryName:string;
    link:string;
    data:TBooks[] | undefined;
    isPopular?:boolean;
}
const CommonCategory = ({categoryName,link,data,isPopular}:tProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router=useRouter();
  const [podcast,setPodcast]=useState(false)
  const [expand,setIsExpand]=useState<boolean>(false);

  useEffect(()=>{
    if(categoryName==="কাব্যিক গ্যালারী" || categoryName==="পডকাস্ট"){
      setPodcast(true)
    }else{
      setPodcast(false)
    }
  },[])
  return (

    <div className={styles.container}>
        <div className={styles.heading_container}>
            <h3 className={styles.heading}>{categoryName}</h3>
            <div className={styles.see_all}>
              <Link href={paths.categoryWiseBooks(categoryName)}>
                  সব দেখুন
                  <span className={styles.arrow}><RightArrowIcon/></span>
              </Link>
            </div>
        </div>
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
                        768: {
                        slidesPerView: 3,
                        },
                        1024: {
                        slidesPerView: 4.7,
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
                      {data && data.map((item:TBooks,index:number)=>(
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
                                    <div className={podcast?' mx-4':styles.item_cont} key={index}>
                                        {isPopular?
                                            <p className={styles.popular}>Most Popular</p>
                                        :''}
                                        <div className={styles.crown}>
                                            <span><PremiumCrownIcon/></span>
                                        </div>
                                        {item.for_rent?(
                                            <div className={styles.rent}>রেন্ট tk. {item?.price}</div>
                                        ):''}
                                        {/* <picture className={podcast?styles.podcast_pic:styles.picture}>
                                            
                                            <img className={podcast?styles.podcast_img:styles.img} src={item.thumb_path} alt={item.name}/>
                                        </picture> */}
                                        <picture className={podcast ? styles.podcast_pic : styles.picture}>
                                        <div className="relative w-full" style={{  /* 16:9 */ }}>
                                          <Image
                                            src={item.thumb_path}
                                            alt={item.name}
                                            width={200}
                                            priority={false}
                                            height={320}
                                            className={`${podcast ? styles.podcast_img : styles.img} object-contain`}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            loading="lazy"
                                          />
                                        </div>
                                      </picture>
                                        {categoryName==='নতুন'?(
                                            <div className={styles.new_audio_book}>নতুন অডিও বুক </div>
                                        ):(
                                            <p className={styles.player_count}>
                                            <span className='w-5 h-5'>
                                                <RedPlayerIcon/>
                                            </span>
                                            <span >{(item?.play_count/1000).toFixed(2)}k listen</span>
                                        </p>
                                        )}
                                        <div className={podcast?'hidden ':styles.hovered_item}>
                                            <div className={'w-full h-6 opacity-80 '+styles.shadow_blur}></div>
                                            <div className='flex items-start justify-around bg-bg'>
                                                <div className='z-10'>
                                                    <CommonButton >
                                                        <div className="flex gap-2">
                                                            <span className="mr-0 w-4 h-4 inline-block">
                                                            <PlayerIcon />
                                                            </span>
                                                            <p className="mt-0 text-[12px]">এখনই শুনুন</p>
                                                        </div>
                                                    </CommonButton>
                                                    {!expand?(
                                                      <span >
                                                        <p className='mt-2 font-[600] text-[18px]'>রেটিংঃ {item.rating.toFixed(1)}</p>
                                                        <p className='text-[14px] mb-2'>{item.author_name}</p>
                                                      </span>
                                                    ):''}
                                                </div>
                                                <div className='z-10'>
                                                    <span 
                                                        onClick={(e)=>{
                                                          setIsExpand(!expand)
                                                          e.stopPropagation();
                                                          e.preventDefault();
                                                        }}
                                                        className={'w-6 h-6 inline-block'+(expand?' rotate-180':'')}
                                                    >
                                                        <ExpandableIcon/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                </SwiperSlide>
                            ))}
                    </>
                  </Swiper>
                        {/* <div className={styles.mobile_banner_cont}>
                            {data?.slice(0,3).map((item:any,index:number)=>(
                                <Link href={`/audiobook/${item?.id}`}>
                                    <div className={styles.item_cont} key={index}>
                                        {isPopular?
                                            <p className={styles.popular}>Most Popular</p>
                                        :''}
                                        <div className={styles.crown}>
                                            <span>
                                                <PremiumCrownIcon/>
                                            </span>
                                        </div>
                                        <picture className={styles.picture}>
                                            
                                            <img className={styles.img} src={item.phone_img_url} alt={item.name}/>
                                        </picture>
                                        <p className={styles.player_count}>
                                            <span>
                                                <RedPlayerIcon/>
                                            </span>
                                            <span>{(item?.play_count/1000).toFixed(2)}k</span>
                                        </p>
                                    </div>
                                </Link>
                                
                            ))}
                        </div> */}
                </div>
    </div>
  )
}

export default CommonCategory