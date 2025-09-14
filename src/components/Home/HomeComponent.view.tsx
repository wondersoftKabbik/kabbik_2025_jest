'use client'
import React, { useEffect, useRef, useState } from 'react'
import { THomeProps } from './static/home.types'
import Hero from './Hero.view';
import CommonCategory from './CommonCategory.view';
import { findCatwiseData } from '@/helpers/commonFunction';
import TopTen from './TopTen.view';
import topTenStyles from "./static/TopTen.module.css"
import RightArrowIcon from '@/svgs/RightArrowIcon';
import CustomVideoPlayer from '../VideoPlayer/VideoPlayer';
import BigVideoPlayerIcon from '@/svgs/BigVideoPlayer';
import useHomeComponent from './HomeComponent.presenter';
import StepsToListenBookview from './StepsToListenBookview';
// import { cityBankApiTest } from '@/utils/apiServices';
import BestCollection from './BestCollection.view';
import BigBanners from './BigBanners.view';
import UpComing from './UpComing.view';
import PopularCategories from './PopularCategories.view';
import Link from 'next/link';
import PlayerIcon from '@/svgs/PlayerIcon';
import Blogs from './Blogs.view';
import Footer from './Footer';
import { container } from '../ui/static/tailwind.classes';
import Reels from './Reels.view';

const HomeComponent = (props:THomeProps) => {
    const {homeData,topBannerData,promoData,dict,blogs}=props;
    // logic separation
    const {player,setPlayer,videoRef,initialPlayer,StaticTexts,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2, setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3} = useHomeComponent();
    
    
  return (
    <div className=' '>
      
        <div  className="mt-[-100px] z-10">
            <Hero slidingData={topBannerData}/>
        </div>
        {/* <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={cityTouch}
    >
      Pay with City Bank
    </button> */}
        <div>
          <div className={topTenStyles.heading_container+" my-8  text-white max-w-[1206px] w-[90%] mx-auto"}>
              <h3 className={topTenStyles.heading}>শীর্ষ ১০</h3>
              <div className={topTenStyles.see_all}>
                  সব দেখুন
                  <span className={topTenStyles.arrow}><RightArrowIcon/></span>
              </div>
          </div>
            <div className='bg-ash_blue'>
            {/* <Link href={'/home_category_list/নতুন'}> */}
                <TopTen
                  categoryName="শীর্ষ ১০"
                  link="/"
                  data={findCatwiseData(homeData.data,'ট্রেন্ডিং')?.data}
                  // isPopular={true}
                />
              {/* </Link> */}
              
          </div>
        </div>
        
        <div className={container('1320px')+' bg-bg relative z-10'}>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="নতুন"
                link="/"
                data={findCatwiseData(homeData.data,'নতুন')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
          <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            
        </div>
        <div className='bg-bg  relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="ট্রেন্ডিং"
                link="/"
                data={findCatwiseData(homeData.data,'ট্রেন্ডিং')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
        </div>
        <div className='max-w-[1206px] rounded-[8px] w-[90%] mx-auto relative mt-12'>
          
          <div className='relative'>
            {initialPlayer?'':(
              <>
                {/* <figure className='absolute bottom-0 left-0 z-10'>
                  <img className='h-[550px] rounded-[8px] max-w-[100%] w-[1440px]' src='/assets/videoInitPhoto.png'/>
                </figure>
                <div 
                  onClick={handleInitialPlay}
                  className='absolute z-20 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                >
                  <span className='max-w-[422px]  inline-block max-h-[422px] w-[25vw] h-[25vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div> */}
              </>
            )}
            <CustomVideoPlayer height=' max-h-[550px]  ' width=' max-w-full ' videoRef={videoRef} playing={player} togglePlay={togglePlay} setPlaying={setPlayer} 
              url={StaticTexts?.home_video?.video1 ?? ''}
            />
          </div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক রিকমেন্ডেড"
                link="/"
                data={findCatwiseData(homeData.data,'কাব্যিক রিকমেন্ডেড')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="ব্রেইন বুস্টার"
                link="/"
                data={findCatwiseData(homeData.data,'ব্রেইন বুস্টার')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='relative'>
          <StepsToListenBookview/>
          <div className="circular_gradient right-[10%]  bottom-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative z-10'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="হুমায়ূন আহমেদ স্পেশাল"
                link="/"
                data={findCatwiseData(homeData.data,'হুমায়ূন আহমেদ স্পেশাল')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="সাসপেন্স"
                link="/"
                data={findCatwiseData(homeData.data,'সাসপেন্স')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='relative z-10'>
          <BestCollection
            homeData={homeData}
          />
          <div className="circular_gradient left-[0%]  bottom-[-10%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="ক্লাসিক"
                link="/"
                data={findCatwiseData(homeData.data,'ক্লাসিক')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[30%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="আত্মউন্নয়নমূলক"
                link="/"
                data={findCatwiseData(homeData.data,'আত্মউন্নয়নমূলক')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='mb-10 relative'>
          <BigBanners/>
          <div className="circular_gradient left-[0%]  bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg mt-10'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="আলোকিত ইসলাম"
                link="/"
                data={findCatwiseData(homeData.data,'আলোকিত ইসলাম')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='bg-bg relative z-10'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক রিকমেন্ডেড"
                link="/"
                data={findCatwiseData(homeData.data,'কাব্যিক রিকমেন্ডেড')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>

        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক গ্যালারী"
                link="/"
                data={findCatwiseData(homeData.data,"কাব্যিক গ্যালারী")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            {/* <div className="circular_gradient right-0 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div> */}
        </div>

        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="পডকাস্ট"
                link="/"
                data={findCatwiseData(homeData.data,"পডকাস্ট")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient right-0 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>

        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <Reels
                categoryName="কাব্যিক রিল "
                link="/"
                data={findCatwiseData(homeData.data,"পডকাস্ট")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient right-0 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>

        <div className='mt-4 bg-bg'>
          <UpComing/>
        </div>

        <div className='relative'>
            <PopularCategories/>
            <div className="circular_gradient left-1/2 -translate-x-1/2 bottom-[10%] w-[30vw] h-[30vw] absolute rounded-[50%] "></div>
        </div>

        


        <div className='mt-10 max-w-[1206px] mx-auto w-[90%] relative'>
          <div className="circular_gradient left-[-20%]   top-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            <h2 className='gradient-text text-[30px] font-semibold text-center'>আমাদের সাম্প্রতিক কার্যক্রম</h2>
            <p className='text-[16px] text-white text-center pb-4 pt-0'>নতুন তথ্য, ইভেন্ট এবং বিশেষ অফার সম্পর্কে জানুন সবার আগে আপডেট পেতে আমাদের সাথে থাকুন।</p>
            <div className='z-20'>
              <Blogs blogs={blogs}/>
            </div>
        </div>


        <div className='max-w-[90%] max-h-[480px] mx-auto relative mt-16 mb-16'>
          <div className='relative '>
            {initialPlayer2?'':(
              <>
                {/* <figure className='absolute bottom-0 left-0 z-10'>
                  <img className='h-[480px] z-10 max-w-[90%] w-[1206px]' src={StaticTexts?.campaign_video?.img}/>

                </figure> */}
                {/* <div 
                  onClick={handleInitialPlay2}
                  className='absolute z-20 cursor-pointer top-1/2 right-0 -translate-y-1/2'
                >
                  <span className='max-w-[422px] inline-block max-h-[422px] w-[27vw] h-[27vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div> */}
              </>
            )}
            <CustomVideoPlayer width=' max-w-full ' height=' max-h-[480px] ' videoRef={videoRef2} playing={player2} togglePlay={togglePlay2} setPlaying={setPlayer2} 
              url={StaticTexts?.campaign_video?.video_url ?? ''}
            />
          </div>
        </div>


        <div className='max-w-[900px]   mx-auto relative mt-10 '>
          <div className='relative max-w-[345px] mx-auto  w-full z-20'>
            {initialPlayer3?'':(
              <>
                {/* <figure className='absolute top-0 left-0 z-10'>
                  <img className='max-h-[105vh] z-10 w-[422px] ' src={StaticTexts?.nepal_tour_video?.thumbnail}/>

                </figure> */}
                {/* <div 
                  onClick={handleInitialPlay3}
                  className='absolute z-20 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
                >
                  <span className='max-w-[200px] inline-block max-h-[200px] w-[15vw] h-[15vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div> */}
              </>
            )}
              <div className='max-w-full z-10   border-[10px] rounded-[10px]'>
                  <CustomVideoPlayer width=' max-w-[350px] ' height=' max-h-[80vh]  ' videoRef={videoRef3} playing={player3} togglePlay={togglePlay3} setPlaying={setPlayer3} 

                  url={StaticTexts?.nepal_tour_video?.video_url ?? ''}
                />
              </div>
          </div>
            <div className="circular_gradient left-1/2 -translate-x-1/2 top-[-10%] w-[40vw] h-[40vw] absolute  "></div>
          <div className='text-center pt-10  z-20'>
              <p className='gradient-text text-[30px] font-semibold'>{StaticTexts?.nepal_tour_video?.heading}</p>
              <p className='text-white text-[23px] py-3'>{StaticTexts?.nepal_tour_video?.para}</p>
              <Link href={'/subscribe'}>
                <div className="flex items-center btn-gradient-1 px-3 py-2 rounded-[10px] justify-center gap-2 max-w-[500px] w-[auto] mx-auto">
                  <span className='max-w-[300px] flex'>
                      <span className="mr-4 w-11 h-8 inline-block">
                      <PlayerIcon />
                    </span>
                    <p className="my-0 text-[white] text-[20px]">সাবস্ক্রাইব করুন এবং শুনুন</p>
                  </span>
                </div>
              </Link>
          </div>
        </div>

        
    </div>
  )
}

export default HomeComponent