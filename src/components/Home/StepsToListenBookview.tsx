import { setStaticTexts } from '@/store/slicers/staticTextSlice';
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchDataFromJson } from '@/utils/apiServices'
import React, { useEffect } from 'react'
import { IconsForSteps } from './static/utils';

const StepsToListenBookview = () => {
    const dispatch=useAppDispatch();
    const staticText=useAppSelector((store)=>store?.staticTexts?.data?.home_page_steps_by_steps)

    const getStaticData=async()=>{
        let result = await fetchDataFromJson();
        console.log(result);
        dispatch(setStaticTexts(result));
    }
    
    useEffect(()=>{
        if(staticText)return;
        getStaticData();
    },[])
  return (
    <div className='flex mt-5 items-center justify-between gap-[2vw] w-[97%] md:w-[90%] mx-auto max-w-[1300px] '>
        <div className='max-sm:hidden max-w-[40%] lg2:max-w-[44%] mr-8 relative mb-7'>
            <figure>
                <img loading="lazy" alt='steps to listen audio books'
                    src='/assets/HowToListen.png'
                    className='w-[100%] max-w-[420px]'
                />
                <div className='bottom-[-20px] rotate-[18.9deg] absolute max-w-[160px] max-h-[240px] w-[37%] right-[-3vw]'>
                    <div className=' relative'>
                        <img loading="lazy" className='max-w-[100%] max-h-[100%]' src='/assets/BookBgPages.png'/>
                        <img loading="lazy"  className='max-w-[99%] max-h-[100%] absolute z-10 bottom-[1px] left-[-2px] rounded-[5px]' src='https://kabbik-space.sgp1.digitaloceanspaces.com/1721033951064.webp'/>
                    </div>
                </div>
            </figure>
        </div>
        <div className='max-sm:mx-auto'>
            <div className='mb-3'>
                <p className='text-white text-cs2 md:text-cn'>কিভাবে এটি কাজ করে</p>
                <div className='hr_gradient w-16 h-0.5'></div>
            </div>
            <h2 className='gradient-text z-10 text-clg2 md:text-cxl2 lg2:text-[38px] font-[600] mb-4'>{staticText?.heading}</h2>
            {staticText?.datas?(
                staticText.datas?.map((item,i:number)=>(
                    <div key={i} className='flex items-center text-white font-medium text-cs2 md:text-cn2 lg2:text-clg mb-3 lg2:mb-4'>
                        <span className='inline-block mr-3 max-w-[26px] md:max-w-[35px] max-h-[35px] lg2:max-w-[40px] lg2:max-h-[40px]'>{IconsForSteps[i]}</span>
                        <p>{item}</p>
                    </div>
                ))
            ):''}
        </div>
    </div>
  )
}

export default StepsToListenBookview