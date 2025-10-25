'use client'
import React, { useEffect, useState } from 'react'
import { ChevronRight, Clock, File, FileChartColumn, FileChartLine, FileQuestion, GitGraph, PlayCircle, Users } from 'lucide-react'
import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
import CommonTabs from '@/components/CommonTabs/CommonTabs.view'
import CommonModal from '@/components/ui/CommonModal/CommonModal.view'
import LockedModal from '@/components/RewardPoint/LockedModal.view'
import CollectRewardModal from '@/components/RewardPoint/CollectRewardModal.view'
import MobileNumberForm from '@/components/RewardPoint/RewardForm.view'
import CongratsModal from '@/components/RewardPoint/CongratsModal.view'
import { useRouter } from 'next/navigation'
import { FeatureItems, RewardData, TiersResponse } from '../reward-point.type'
import { useAppSelector } from '@/store/store'
import { all_tier_reward, getUser_reward_profile } from '@/utils/apiServices'
import Link from 'next/link'
import { decodeWord } from '@/helpers/commonFunction'

const Page = () => {
    const router=useRouter();
    const [userRewardData,setUserRewardData]=useState<RewardData|null>(null);
    const user=useAppSelector(store=>store?.user?.userData)
    const [all_tier_rewards,setAllTierRewards]=useState<TiersResponse>([]);

    const getUserRewardData=async()=>{
        const result = await getUser_reward_profile(user?.id??'')
        setUserRewardData(result?.data?.data);
    }

    const get_all_tier_reward=async()=>{
        let result = await all_tier_reward(user?.id??'')
        setAllTierRewards(result?.data?.data??[]);
    }

    useEffect(()=>{
        if(user?.id){
            getUserRewardData();
            get_all_tier_reward()
        }
    },[user?.id])

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
            <div className="z-[4] max-w-[600px] mx-auto relative  flex items-center justify-center  md:px-4 py-3 md:py-8 text-white">
                <CommonTabs
                    tabs={all_tier_rewards.map((item,index)=>(
                        {
                            title:item.name,
                            component:(
                                <div className="w-full max-w-lg space-y-5">
                                    <TopPointCard data={{
                                        full_name: user?.full_name??'' ,
                                        user_balance_point: userRewardData?.user_tier?.user_balance_point??0 ,
                                        min_point:item?.min_point  ,
                                        user_acquired_point:userRewardData?.user_tier?.user_acquired_point??0  ,
                                        max_point: item?.max_point ,
                                        tier_name: item?.name ,
                                    }} />
                                    <div
                                        className="rounded-2xl space-y-6"
                                    >                        
                                        <div className="flex justify-between items-center my-4">
                                            {/* <p className="font-semibold text-cn2 md:text-clg2">{decodeWord(reward?.title??'')}</p> */}
                                            {/* <Link href={`/profile/reward-point/${reward?.goto_page??'/'}`} className="text-cn md:text-clg">{decodeWord(reward?.trailing_title??'')}</Link> */}
                                        </div>
                                        <RewrdItems setNewPoint={setNewPoint} isLocked={(userRewardData?.user_tier?.user_acquired_point??0)<item?.min_point} user_balance_point={userRewardData?.user_tier?.user_balance_point??0} data={item.rewards?.map(subItem=>{
                                            subItem['tier_id']=item?.id
                                            return subItem
                                        })} />
                                    </div>
                                </div>
                            )
                        }
                    ))}
                />
                
            </div>
        </div>
        
    </div>
  )
}

export default Page