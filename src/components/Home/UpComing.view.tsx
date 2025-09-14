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

const UpComing = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router=useRouter()
  return (
    <div className='text-white max-w-[1440px]  mx-auto  w-[100%] max-h-[530px]'>
        <div>
            <div className={common_cat_styles.heading_container + " max-w-[1206px] mx-auto w-[90%] !mb-[0] pb-64"}>
                <h3 className={common_cat_styles.heading}>আপকামিং বুক</h3>
                <div className={common_cat_styles.see_all}>
                    সব দেখুন
                    <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
                </div>
            </div>
            <div className='relative  h-[300px]'>
                
                <figure className='absolute overflow-hidden left-0 top-0 w-full max-h-[550px]'>
                        <div className='-rotate-45 w-[300px]  top-9  py-1 text-[20px] text-center absolute left-[-90px] bg-[#E53F79] z-10'>
                            ১১ জুলাই ২০২৫
                        </div>
                    <img className='w-full max-h-[300px]' src='/assets/upcoming_banner.png'/>
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
                    {data?.map((topbannerinfo,i:number) => (
                      <SwiperSlide
                        key={i}
                        onClick={() => {
                          router.push(
                            `/audiobook/${i}`
                          );
                        }}
                      >
                        
                        <ThreeDBook bg={topbannerinfo?.thumb_path} path=''/>
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