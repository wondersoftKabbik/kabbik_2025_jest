import RightArrowIcon from '@/svgs/RightArrowIcon'
import React, { useRef } from 'react'
import common_cat_styles from "./static/category.module.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { LucideFlagTriangleLeft, LucideFlagTriangleRight } from 'lucide-react'
import { data } from './static/upcoming';
import styles from "./static/upcoming.module.css"
import { useRouter } from 'next/navigation'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import RightAngle from '@/svgs/rightAngle'
import ThreeDBook from '../ui/ThreeDBook.view'
import { container } from '../ui/static/tailwind.classes'
import { useAppSelector } from '@/store/store'

const UpComing = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router=useRouter()
  const upcomingBooks=useAppSelector(store=>store.staticTexts.data?.upcoming)
  return (
    <div className={`${container('1300px')} text-white mt-10 mx-auto max-h-[530px]`}>
        <div>
            <div className={common_cat_styles.heading_container + " mx-auto !mb-[0] "}>
                <h3 className={common_cat_styles.heading}>আপকামিং বুক</h3>
                <div className={common_cat_styles.see_all}>
                    সব দেখুন
                    <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
                </div>
            </div>
            <div className='relative  h-[420px] overflow-y-hidden overflow-y-scroll-none'>
                
                <figure className='absolute overflow-hidden   left-1/2 -translate-x-1/2 top-0 w-full max-h-[650px]'>
                        {/* <div className='-rotate-45 w-[300px]  top-9  py-1 text-[20px] text-center absolute left-[-90px] bg-[#E53F79] z-10'>
                            ১১ জুলাই ২০২৫
                        </div>
                    <img className='w-full max-h-full' src='/assets/upcoming_banner.png'/> */}
                    <button
                        ref={prevRef}
                        className={styles.slider_icons + ` ${styles.slider_left_icons}`}
                    >
                        <RightAngle className='rotate-180' />
                    </button>
                  <button
                    ref={nextRef}
                    className={styles.slider_icons + ` ${styles.slider_right_icons}`}
                  >
                    <RightAngle />
                  </button>
                </figure>
                <div className={styles.slider_box}>
                  {/* Custom Arrows */}
                  

                  <Swiper
                    // slidesPerView={1}
                    // spaceBetween={1}
                    loop={true}
                    className='h-full'
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
                    {upcomingBooks?.map((topbannerinfo,i:number) => (
                      <SwiperSlide
                        key={i}
                        onClick={() => {
                          router.push(
                            `/audiobook/${i}`
                          );
                        }}
                      >
                        <div className='relative w-[210px] h-[370px]'>
                          <ThreeDBook bg={topbannerinfo?.thumb_path} path=''/>
                          <div className='absolute w-[195px] text-center right-[-3px] skew-y-[-8deg] bottom-[-8px] bg-[#E53F79] z-40'>
                              ১১ জুলাই ২০২৫
                          </div>
                        </div>
                        
                        
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default UpComing