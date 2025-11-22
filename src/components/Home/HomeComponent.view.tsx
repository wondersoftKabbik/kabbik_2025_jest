'use client'
import React, { useEffect } from 'react'
import { THomeProps } from './static/home.types'
// import Hero from '';
import { findCatwiseData } from '@/helpers/commonFunction';
import topTenStyles from "./static/TopTen.module.css"
import useHomeComponent from './HomeComponent.presenter';
import Link from 'next/link';
import PlayerIcon from '@/svgs/PlayerIcon';
import { container } from '../ui/static/tailwind.classes';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton/Skeleton';
import BigVideoPlayerIcon from '@/svgs/BigVideoPlayer';
import Reels from './Reels.view';
import RightArrowIcon from '@/svgs/RightArrowIcon';
import { paths } from '@/utils/Paths';
import { useRouter } from 'next/navigation';

const TopTen = dynamic(() => import("./TopTen.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mb-8 max-w-[90%] mx-auto'>
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
    </div>
  ), // optional fallback
});

const Hero = dynamic(() => import("./Hero.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => (
    <div className='flex  max-sm:flex-col justify-around mt-32 items-center'>
      <div>
        <Skeleton count={4} height="h-[40px] md:h-[40px]" width='w-[300px]'  className="rounded-b-[4px]" />
      </div>
      <div>
        <Skeleton height="h-[300px] md:h-[400px]" width="w-[250px] md:w-[350px]" className="rounded-b-[10px]" />
      </div>
    </div>
  ), // optional fallback
});

const BigBanners = dynamic(() => import("./BigBanners.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

const PopularCategories = dynamic(() => import("./PopularCategories.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

const CommonCategory = dynamic(() => import("./CommonCategory.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => (
    <div className={container('1300px')+' my-10'}>
      <div className='flex justify-between'>
        <Skeleton height="h-[25px]" width='w-[80px]'  className="rounded-b-[4px]" />
        <Skeleton height="h-[25px]" width='w-[80px]'  className="rounded-b-[4px]" />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mb-8 max-w-[90%] mx-auto'>
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
        <Skeleton  height="h-[250px] md:h-[300px]" width='w-[160px] md:w-[200px]'  className="rounded-b-[4px]" />
      </div>
    </div>
  ), // optional fallback
});

const BestCollection = dynamic(() => import("./BestCollection.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

// const Reels = dynamic(() => import("./Reels.view"), {
//   ssr: false, // optional: disable server-side rendering
//   loading: () => <p></p>, // optional fallback
// });

const UpComing = dynamic(() => import("./UpComing.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

const StepsToListenBookview = dynamic(() => import("./StepsToListenBookview"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

const CustomVideoPlayer = dynamic(() => import("../VideoPlayer/VideoPlayer"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});
const CustomVideoPlayer2 = dynamic(() => import("../VideoPlayer/CustomVideoPlayer2"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});

const Blogs = dynamic(() => import("./Blogs.view"), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <p></p>, // optional fallback
});



const HomeComponent = (props:THomeProps) => {
    const {homeData,topBannerData,blogs}=props;
    const router=useRouter();
    // logic separation
    const {player,setPlayer,videoRef,initialPlayer,StaticTexts,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2, setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3,userPreferdCats,topVideo,middleVideo,lastVideo,goToNext,user} = useHomeComponent({homeData});
    
    
  return (
    <div className=' '>
      
        <div className="mt-[-100px] w-full z-10">
            <Hero slidingData={topBannerData}/>
        </div>
        {/* <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={cityTouch}
    >
      Pay with City Bank
    </button> */}
        <div>
          <div className={topTenStyles.heading_container+" my-8  text-white max-w-[1300px] w-[97%] md:w-[90%] mx-auto"}>
              <h3 className={topTenStyles.heading}>শীর্ষ ১০</h3>
              <div onClick={()=>router.push(paths.top10)} className={topTenStyles.see_all}>
                  সব দেখুন
                  <span className={topTenStyles.arrow}><RightArrowIcon/></span>
              </div>
          </div>
            <div className='bg-ash_blue'>
            {/* <Link href={'/home_category_list/নতুন'}> */}
                <TopTen
                  categoryName="শীর্ষ ১০"
                  link="/"
                  data={findCatwiseData(homeData.data,"শীর্ষ ১০")?.data}
                  // isPopular={true}
                />
              {/* </Link> */}
              
          </div>
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

        <div className={' bg-bg relative z-[2]'}>
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
        
        <div className={`${topVideo?.video?.link?'':'hidden'} max-w-[1300px] rounded-[8px] w-[97%] md:w-[90%] mx-auto relative mt-12`}>
          
          <div className='relative'>
            {/* <span
              onClick={()=>{goToNext('top')}}
              className="cursor-pointer z-[1] absolute top-5 right-5 select-none text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors duration-200 px-3 py-1 border border-gray-400 rounded-full hover:bg-gray-100 active:scale-95"
            >
              Skip
            </span> */}

            {initialPlayer?'':(
              <>
                {/* <figure className='absolute bottom-0 left-0 z-10'>
                  <img className='h-[550px] rounded-[8px] max-w-[100%] w-[1440px]' src='/assets/videoInitPhoto.png'/>
                </figure> */}
                {/* <div 
                  onClick={handleInitialPlay}
                  className='absolute z-20 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                >
                  <span className='max-w-[422px]  inline-block max-h-[422px] w-[25vw] h-[25vw]'>
                    <BigVideoPlayerIcon/>
                  </span>
                </div> */}
              </>
            )}

            {/* <CustomVideoPlayer  poster={topVideo?.video?.thumbnail} height=' max-h-[550px]  ' width=' max-w-full ' videoRef={videoRef} playing={player} togglePlay={togglePlay} setPlaying={setPlayer} 
              url={topVideo?.video?.link ?? ''}
            /> */}
            <CustomVideoPlayer2
              videos={StaticTexts?.home_video?.videos??[]}
            />
          </div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[0]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[0])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[1]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[1])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='relative'>
          <StepsToListenBookview/>
          <div className="circular_gradient right-[10%]  bottom-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative z-[1]'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[2]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[2])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[50%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[3]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[3])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='relative z-[1]'>
          <BestCollection
            homeData={homeData}
          />
          <div className="circular_gradient left-[0%]  bottom-[-10%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg relative'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[4]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[4])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            <div className="circular_gradient left-[30%] -translate-x-1/2 bottom-[-25%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        </div>
        <div className='bg-bg'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[5]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[5])?.data}
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
                categoryName={userPreferdCats[6]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[6])?.data}
                // isPopular={true}
              />
            {/* </Link> */}
            
        </div>
        <div className='bg-bg relative z-[1]'>
          {/* <Link href={'/home_category_list/নতুন'}> */}
              <CommonCategory
                categoryName={userPreferdCats[7]}
                link="/"
                data={findCatwiseData(homeData.data,userPreferdCats[7])?.data}
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
            <PopularCategories data={homeData.data}/>
            <div className="circular_gradient left-1/2 -translate-x-1/2 bottom-[10%] w-[30vw] h-[30vw] absolute rounded-[50%] "></div>
        </div>

        


        <div className='mt-10 max-w-[1300px] mx-auto w-[97%] md:w-[90%] relative'>
          <div className="circular_gradient left-[-20%]   top-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            <h2 className='gradient-text text-clg leading-[1.2] sm:text-cxl md:text-[30px] font-semibold text-center'>আমাদের সাম্প্রতিক কার্যক্রম</h2>
            <p className='text-cs2 sm:text-[16px] text-white text-center pb-4 pt-0'>নতুন তথ্য, ইভেন্ট এবং বিশেষ অফার সম্পর্কে জানুন সবার আগে আপডেট পেতে আমাদের সাথে থাকুন।</p>
            <div className='z-[5]'>
              <Blogs blogs={blogs}/>
            </div>
        </div>


        <div className={`${middleVideo?.video?.link?"":'hidden'} w-[97%] md:w-[90%]  mx-auto relative mt-16 mb-16`}>
          <div className='relative '>
            {/* <span
              onClick={()=>{goToNext('middle')}}
              className="cursor-pointer z-[1] absolute top-5 right-5 select-none text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors duration-200 px-3 py-1 border border-gray-400 rounded-full hover:bg-gray-100 active:scale-95"
            >
              Skip
            </span> */}
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
            {/* <CustomVideoPlayer muted={true} poster={middleVideo?.video?.thumbnail} width=' max-w-full ' height=' max-h-[480px] ' videoRef={videoRef2} playing={player2} togglePlay={togglePlay2} setPlaying={setPlayer2} 
              url={middleVideo?.video?.link ?? ''}
            /> */}
            <CustomVideoPlayer2
              videos={StaticTexts?.campaign_video?.videos??[]}
            />
          </div>
        </div>


        <div className={`${lastVideo?.video?.thumbnail?"":'hidden'} w-[97%] md:w-[90%] max-w-[900px]   mx-auto relative mt-10 `}>
          <div className='relative max-w-[345px] mx-auto  w-full z-[5]'>
            {/* <span
              onClick={()=>{goToNext('last')}}
              className="cursor-pointer z-[1] absolute top-5 right-5 select-none text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors duration-200 px-3 py-1 border border-gray-400 rounded-full hover:bg-gray-100 active:scale-95"
            >
              Skip
            </span> */}
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
              <div 
                // className='max-w-full z-10   border-[10px] rounded-[10px]'
              >
                  {/* <CustomVideoPlayer muted={true} width=' max-w-[350px] ' height=' max-h-[80vh]  ' videoRef={videoRef3} playing={player3} togglePlay={togglePlay3} setPlaying={setPlayer3} 
                  poster={lastVideo?.video?.thumbnail}

                  url={lastVideo?.video?.video_url ?? ''}
                /> */}

                <CustomVideoPlayer2
                  className="max-h-[87vh] rounded-[4px]"
                  videos={StaticTexts?.nepal_tour_video?.videos.map((item)=>{
                    return {link:item.video_url,thumbnail:item?.thumbnail}
                  })??[]}
                />
              </div>
          </div>
            <div className="circular_gradient left-1/2 -translate-x-1/2 top-[-10%] w-[40vw] h-[40vw] absolute  "></div>
          <div className='text-center pt-10  z-[5]'>
              <p className='gradient-text text-lg sm:text-cxl md:text-[28px] font-semibold'>{StaticTexts?.nepal_tour_video?.videos[0].heading}</p>
              <p className='text-white text-cs2 sm:text-cn2 md:text-[20px] py-2'>{StaticTexts?.nepal_tour_video?.videos[0].para}</p>
              <Link href={user?.is_subscribed?paths.searchBooks:'/subscribe'}>
                <div className="flex items-center subscribe_listen px-3 py-2 rounded-[10px] justify-center gap-2 max-w-[350px] w-[auto] mx-auto">
                  <span className='max-w-[300px] flex'>
                      <span className="mr-4 w-6 sm:w-9 md:w-11 h-6 sm:h-7 md:h-8 inline-block">
                      <PlayerIcon color='#68233A' />
                    </span>
                    <p className="my-0 text-[white] text-cs2 sm:text-cn2 md:text-[20px]">সাবস্ক্রাইব করুন এবং শুনুন</p>
                  </span>
                </div>
              </Link>
          </div>
        </div>

        {/* <div className='tawk_to_div'>
          
        </div> */}
    </div>
  )
}

export default HomeComponent

