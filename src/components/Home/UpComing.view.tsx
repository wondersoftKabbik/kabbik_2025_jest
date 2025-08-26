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
    <div className='text-white max-w-[1440px]  mx-auto  w-[100%] max-h-[800px]'>
        <div>
            <div className={common_cat_styles.heading_container + " max-w-[1206px] mx-auto w-[97%] !mb-[0] pb-64"}>
                <h3 className={common_cat_styles.heading}>আপকামিং বুক</h3>
                <div className={common_cat_styles.see_all}>
                    সব দেখুন
                    <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
                </div>
            </div>
            <div className='relative  h-[400px]'>
                
                <figure className='absolute overflow-hidden left-0 top-0 w-full max-h-[550px]'>
                        <div className='-rotate-45 w-[400px] text-center top-16  py-2 text-[35px] absolute left-[-100px] bg-[#E53F79] z-10'>
                            ১১ জুলাই ২০২৫
                        </div>
                    <img className='w-full max-h-[400px]' src='/assets/upcoming_banner.png'/>
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
                        {/* <div className='skew-y-[-8deg]'>
                            <article className='absolute left-1/2  -translate-x-1/2 top-[-300px]'>
                                <div className="cover-back"></div>
                                <div className="pages">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className={`cover bg-[#f3f3f0] bg-center bg-no-repeat`}
                                    style={{
                                        backgroundImage: `url(${topbannerinfo.thumb_path})`,
                                    }}
                                >
                                </div>
                                <div className="spine">
                                </div>
                                <div className="spine-shadow"></div>
                            </article>
                        </div> */}
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