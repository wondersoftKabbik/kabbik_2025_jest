'use client'
import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
import { container } from '@/components/ui/static/tailwind.classes'
import { setUser } from '@/store/slicers/userSlice'
import { useAppSelector } from '@/store/store'
import { getUser_reward_profile } from '@/utils/apiServices'
import { ChevronRight, Clock, File, FileChartColumn, FileChartLine, FileQuestion, GitGraph, PlayCircle, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FeatureItems, RewardData, RewardItemProps } from './reward-point.type'
import { useRouter } from 'next/navigation'
import { decodeWord } from '@/helpers/commonFunction'
import Link from 'next/link'

const Page = () => {
    const router=useRouter();
    const [userRewardData,setUserRewardData]=useState<RewardData|null>(null);
    const user=useAppSelector(store=>store?.user?.userData)

    const getUserRewardData=async()=>{
        const result = await getUser_reward_profile(user?.id??'')
        setUserRewardData(result?.data?.data);
    }

    useEffect(()=>{
        if(user?.id){
            getUserRewardData();
        }
    },[user?.id])

    const reward=userRewardData?.featureList.find((item)=>item?.type_reward==='reward')

    const setNewPoint=()=>{
       getUserRewardData()
    }
  return (
    <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0 -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
        </div>
        <h3 className='text-white mt-0 pt-8 text-clg2 font-semibold text-center'>কাব্যিক রিওয়ার্ডস</h3>
        <div  className='w-[90%] relative mx-auto'>
            <div className="circular_gradient right-[30%] bottom-[-10%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="circular_gradient left-[25%] top-[10%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="z-[4] relative  flex items-center justify-center  px-4 py-8 text-white">
                <div className="w-full max-w-lg space-y-5">

                    {/* --- Top Card --- */}
                    <TopPointCard
                        data={{
                            full_name: user?.full_name??'' ,
                            user_balance_point: userRewardData?.user_tier?.user_balance_point??0 ,
                            min_point:userRewardData?.user_tier?.min_point??0  ,
                            user_acquired_point:userRewardData?.user_tier?.user_acquired_point??0  ,
                            max_point: userRewardData?.user_tier?.max_point??0 ,
                            tier_name: userRewardData?.user_tier?.name??'',
                        }}
                    />

                    {/* --- Bottom Card --- */}
                    <div
                        className="rounded-2xl space-y-6"
                
                    >
                        <div className="flex justify-between items-center my-4">
                            <p className="font-semibold text-cn2 md:text-clg2">{decodeWord(reward?.title??'')}</p>
                            <Link href={`/profile/reward-point/${reward?.goto_page??'/'}`} className="text-cn md:text-clg">{decodeWord(reward?.trailing_title??'')}</Link>
                        </div>
                        <RewrdItems setNewPoint={setNewPoint} user_balance_point={userRewardData?.user_tier.user_balance_point??0} data={reward?.items}/>
                        {/* {reward?.items.map((item,key)=>(
                        ))} */}
                    </div>
                </div>
                
            </div>

            <div
                className="z-[3] relative flex w-[90%] mx-auto items-center justify-center px-4  text-white"
            >
                <div className="w-full max-w-lg  rounded-2xl overflow-hidden">
                    {/* Section 1 */}
                    {/* <div className="border-b border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <File className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">পয়েন্ট বিবরণী</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div> */}

                    {/* Section 2 */}
                    {/* <div className="border-b border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <FileChartLine className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">কিভাবে কাজ করে</p>
                        </div>
                        <div className="flex items-center space-x-1">
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">ভিডিও দেখুন</p>
                        <PlayCircle className="text-[#F2B5C2]" size={18} />
                        </div>
                    </div>
                    </div> */}

                    {/* Section 3 */}
                    {/* <div className="border-b border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <GitGraph className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">যেসব টাস্কে পয়েন্ট পাওয়া যাবে</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div> */}

                    {/* Task list */}
                    {userRewardData?.featureList?.map((item,index)=>item?.type_reward==='reward'?'':(
                        <div key={index} onClick={()=>router.push(`/profile/reward-point/${item?.goto_page}`)}  className="px-5 cursor-pointer py-4 border-b border-white/20  space-y-4">
                            <div className="flex items-start space-x-2">
                                <img className='max-w-5' src={item?.leading_icon}/>
                                <p className="text-cs sm:text-cs2 md:text-cn leading-snug">
                                {item?.title}
                                </p>
                            </div>
                            {item?.items?.map((subItems:any,index)=>(
                                <div key={index} className="flex items-start space-x-2">
                                    <img className='w-4' src={subItems?.leading_icon??''}/>
                                    <p className="text-cs sm:text-cs2 md:text-cn leading-snug">{subItems?.title}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* FAQ */}
                    {/* <div className="border-t border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <FileQuestion className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">সচরাচর জিজ্ঞাসা</p>
                        </div>
                    </div>
                    </div> */}

                    {/* Terms */}
                    {/* <div className="border-t border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <FileChartColumn className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">শর্তাবলী</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page