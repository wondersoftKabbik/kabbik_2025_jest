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

const HomeComponent = (props:THomeProps) => {
    const {homeData,topBannerData,promoData,dict}=props;
    // logic separation
    const {player,setPlayer,videoRef,initialPlayer,StaticTexts,togglePlay,handleInitialPlay} = useHomeComponent();
    
    const cityTouch = async () => {
    // Step 1: Get token from your backend
    const tokenRes:any = await fetch("http://localhost:8097/api/routes/city-bank-payment-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());



    
    const payload = tokenRes.data;
    
    const form = document.createElement("form");
    form.method = "POST";
    // form.action = "https://uat-ibmb.thecitybank.com:8085/CityBank/merchant/userlogin";
    form.action="http://localhost:8097/api/routes/city-bank-payment-status";

    const referenceId = makeRefferenceId(10); // You should implement this

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
        <div>
            <Hero slidingData={topBannerData}/>
        </div>
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
        <div className='bg-bg'>
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
                  <BigVideoPlayerIcon/>
                </div>
              </>
            )}
            <CustomVideoPlayer videoRef={videoRef} playing={player} togglePlay={togglePlay} setPlaying={setPlayer} 
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
                categoryName="পডকাস্ট"
                link="/"
                data={findCatwiseData(homeData.data,"পডকাস্ট")?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={cityTouch}
    >
      Pay with City Bank
    </button>
    </div>
  )
}

export default HomeComponent