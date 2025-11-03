import { useAppSelector } from '@/store/store'
import Link from 'next/link';
import React, { useRef } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import RightArrow from '@/svgs/RightArrow';
import { findCatwiseData, stopPropagation } from '@/helpers/commonFunction';
import { container } from '../ui/static/tailwind.classes';


const BigBanners = () => {
    const BigBanners=useAppSelector(store=>store.staticTexts.data?.big_book_banners);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const router= useRouter();

    
  return (
    <div className={`best_collection pb-10  max-w-[1210px] h-[auto] mx-auto overflow-hidden text-white  lg:w-[90%] `}>
        <Swiper
            // slidesPerView={1}
            // spaceBetween={1}
            loop={true}
              pagination={{ clickable: true }}
              style={{ paddingBottom: '40px' }}
              // modules={[Navigation, Pagination]}
            // centeredSlides={true}
            modules={[Navigation, Autoplay,Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
               0: {
               slidesPerView: 1,
               },
               768: {
               slidesPerView: 1,
               },
               1024: {
               slidesPerView: 1,
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
                {BigBanners && BigBanners.map((item,index:number)=>(
                    <SwiperSlide
                        key={index}
                        onClick={() => {
                            router.push(
                            `/audiobook/${item.id}`
                            );
                        }}
                        // className={styles.swiper_slider_custom}
                        >
                        <Link href={`/${item?.id}`}>
                            <div className='w-full  '>
                                <figure className='max-w-[100%] max-h-[100%]'>
                                    <img className='max-w-[100%] max-h-[100%]' src={item.img}/>
                                </figure>
                            </div>
                        </Link>
                        </SwiperSlide>
                    ))}
            </>
        </Swiper>
    </div>
  )
}

export default BigBanners