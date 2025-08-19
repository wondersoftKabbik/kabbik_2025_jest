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

const HomeComponent = (props:THomeProps) => {
    const {homeData,topBannerData,promoData,dict,blogs}=props;
    // logic separation
    const {player,setPlayer,videoRef,initialPlayer,StaticTexts,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2, setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3} = useHomeComponent();
    
    
    const cityTouch = async () => {
    // Step 1: Get token from your backend
    const tokenRes:any = await fetch("https://api.kabbik.com/v4/city-pay/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());



    
    const payload = tokenRes.data;
    // const payload={mydata:"habijabi",transactionId:'124232322555'}
    
    const form = document.createElement("form");
    form.method = "POST";
    const url = "https://uat-ibmb.thecitybank.com:8085/CityBank/merchant/userlogin";
    // const url="https://kabbik.com/api/routes/city-bank-payment-status";
    // const url="https://kabbik.com"
    // const url="http://localhost:8097/api/routes/city-bank-payment-status";
    form.action=url;
    console.log(url,form)
    // debugger;
    // form.action="http://localhost:8097/";
    // payload.resendpoint="http://localhost:8097/api/routes/city-bank-payment-status"


    console.log(payload,"payload");

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const makeRefferenceId = (length = 10) => {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  };

  useEffect(()=>{
    // cityBankApiTest()
    console.log(homeData)
  },[])

 

  return (
    <div className='bg-bg'>
      
        <div  className="mt-[-100px]">
            <Hero slidingData={topBannerData}/>
        </div>
        <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={cityTouch}
    >
      Pay with City Bank
    </button>
        <div>
          <div className={topTenStyles.heading_container+" my-16  text-white max-w-[1206px] mx-auto"}>
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
        
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="নতুন"
                link="/"
                data={findCatwiseData(homeData.data,'নতুন')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='bg-bg h-screen'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="ট্রেন্ডিং"
                link="/"
                data={findCatwiseData(homeData.data,'ট্রেন্ডিং')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='max-w-[1440px] mx-auto relative mt-20'>
          
          <div className='relative'>
            {initialPlayer?'':(
              <>
                <figure className='absolute bottom-0 left-0 z-10'>
                  <img className='h-[550px] max-w-[100%] w-[1440px]' src='/assets/videoInitPhoto.png'/>
                </figure>
                <div 
                  onClick={handleInitialPlay}
                  className='absolute z-20 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                >
                  <span className='max-w-[422px] inline-block max-h-[422px] w-[25vw] h-[25vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div>
              </>
            )}
            <CustomVideoPlayer height=' max-h-[550px] ' width=' max-w-full ' videoRef={videoRef} playing={player} togglePlay={togglePlay} setPlaying={setPlayer} 
              url={StaticTexts?.home_video?.video1 ?? ''}
            />
          </div>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক রিকমেন্ডেড"
                link="/"
                data={findCatwiseData(homeData.data,'কাব্যিক রিকমেন্ডেড')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
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
        <div>
          <StepsToListenBookview/>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="হুমায়ূন আহমেদ স্পেশাল"
                link="/"
                data={findCatwiseData(homeData.data,'হুমায়ূন আহমেদ স্পেশাল')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="সাসপেন্স"
                link="/"
                data={findCatwiseData(homeData.data,'সাসপেন্স')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div>
          <BestCollection
            homeData={homeData}
          />
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="ক্লাসিক"
                link="/"
                data={findCatwiseData(homeData.data,'ক্লাসিক')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
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
        <div className='mb-10'>
          <BigBanners/>
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
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক রিকমেন্ডেড"
                link="/"
                data={findCatwiseData(homeData.data,'কাব্যিক রিকমেন্ডেড')?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>

        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="কাব্যিক গ্যালারী"
                link="/"
                data={findCatwiseData(homeData.data,"কাব্যিক গ্যালারী")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>

        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName="পডকাস্ট"
                link="/"
                data={findCatwiseData(homeData.data,"পডকাস্ট")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>

        <div className='mt-10 bg-bg'>
          <UpComing/>
        </div>

        <div>
            <PopularCategories/>
        </div>

        <div className='max-w-[1440px] max-h-[480px] mx-auto relative mt-20 mb-10'>
          <div className='relative '>
            {initialPlayer2?'':(
              <>
                <figure className='absolute bottom-0 left-0 z-10'>
                  <img className='h-[480px] z-10 max-w-[90%] w-[1206px]' src={StaticTexts?.campaign_video?.img}/>

                </figure>
                <div 
                  onClick={handleInitialPlay2}
                  className='absolute z-20 cursor-pointer top-1/2 right-0 -translate-y-1/2'
                >
                  <span className='max-w-[422px] inline-block max-h-[422px] w-[27vw] h-[27vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div>
              </>
            )}
            <CustomVideoPlayer width=' max-w-full ' height=' max-h-[480px] ' videoRef={videoRef2} playing={player2} togglePlay={togglePlay2} setPlaying={setPlayer2} 
              url={StaticTexts?.campaign_video?.video_url ?? ''}
            />
            {/* {console.log(StaticTexts?.video_url)} */}
          </div>
        </div>


        <div className='max-w-[850px]  max-h-[950px] mx-auto relative mt-40'>
          <div className='relative  w-full'>
            {initialPlayer3?'':(
              <>
                <figure className='absolute top-0 left-0 z-10'>
                  <img className='h-[480px] z-10 max-w-[100%] w-[1206px]' src={StaticTexts?.nepal_tour_video?.thumbnail}/>

                </figure>
                <div 
                  onClick={handleInitialPlay3}
                  className='absolute z-20 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
                >
                  <span className='max-w-[422px] inline-block max-h-[422px] w-[15vw] h-[15vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div>
              </>
            )}
              <div className='max-w-full  max-h-[900px] border-[10px] rounded-[10px]'>
                  <CustomVideoPlayer width=' max-w-full ' height=' max-h-[900px]  ' videoRef={videoRef3} playing={player3} togglePlay={togglePlay3} setPlaying={setPlayer3} 

                  url={StaticTexts?.nepal_tour_video?.video_url ?? ''}
                />
              </div>
              
            {/* {console.log(StaticTexts?.video_url)} */}
          </div>
          <div className='text-center py-10'>
              <p className='gradient-text text-[45px] font-semibold'>{StaticTexts?.nepal_tour_video?.heading}</p>
              <p className='text-white text-[37px] py-8'>{StaticTexts?.nepal_tour_video?.para}</p>
              <Link href={'/subscribe'}>
                <div className="flex items-center btn-gradient-1 px-3 py-2 rounded-[10px] justify-around gap-2 max-w-[500px] w-[95%] mx-auto">
                  <span className="mr-4 w-11 h-11 inline-block">
                    <PlayerIcon />
                  </span>
                  <p className="my-0 text-[white] text-[34px]">সাবস্ক্রাইব করুন এবং শুনুন</p>
                </div>
              </Link>
          </div>
        </div>


        <div className='mt-20 max-w-[1206px] mx-auto w-[96%]'>
            <h2 className='gradient-text text-[40px] font-semibold text-center'>আমাদের সাম্প্রতিক কার্যক্রম</h2>
            <p className='text-[18px] text-white text-center py-5 mb-5'>নতুন তথ্য, ইভেন্ট এবং বিশেষ অফার সম্পর্কে জানুন সবার আগে আপডেট পেতে আমাদের সাথে থাকুন।</p>
            <Blogs blogs={blogs}/>
        </div>

        
    </div>
  )
}

export default HomeComponent