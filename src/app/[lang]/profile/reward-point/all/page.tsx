'use client'
import React from 'react'
import { ChevronRight, Clock, File, FileChartColumn, FileChartLine, FileQuestion, GitGraph, PlayCircle, Users } from 'lucide-react'
import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
import CommonTabs from '@/components/CommonTabs/CommonTabs.view'
import CommonModal from '@/components/ui/CommonModal/CommonModal.view'
import LockedModal from '@/components/RewardPoint/LockedModal.view'
import CollectRewardModal from '@/components/RewardPoint/CollectRewardModal.view'
import MobileNumberForm from '@/components/RewardPoint/RewardForm.view'

const page = () => {
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
            <div className="z-[4] max-w-[600px] mx-auto relative  flex items-center justify-center  px-4 py-8 text-white">
                <CommonTabs
                    tabs={[
                        {
                            title:"abcdded",
                            component:(
                                <div className="w-full max-w-lg space-y-5">
                                    <TopPointCard/>
                                    <div
                                        className="rounded-2xl space-y-6"
                                    >                        
                                        <RewrdItems/>
                                    </div>
                                </div>
                            )
                        },
                        {
                            title:"dfjkdfdfhdf",
                            component:(
                                <div className="w-full max-w-lg space-y-5">
                                    <TopPointCard/>
                                    <div
                                        className="rounded-2xl space-y-6"
                                    >                        
                                        <RewrdItems/>
                                    </div>
                                </div>
                            )
                        },
                        {
                            title:"dfjkdfdfhdf",
                            component:(
                                <div className="w-full max-w-lg space-y-5">
                                    <TopPointCard/>
                                    <div
                                        className="rounded-2xl space-y-6"
                                    >                        
                                        <RewrdItems/>
                                    </div>
                                </div>
                            )
                        }

                    ]}
                />
                
            </div>
        </div>
        <CommonModal
            isOpen={false}
            onClose={()=>{}}
        >
            <LockedModal/>
        </CommonModal>
        <CommonModal
            isOpen={false}
            onClose={()=>{}}
        >
            <CollectRewardModal/>
        </CommonModal>
        <CommonModal
            isOpen={true}
            onClose={()=>{}}
        >
            <MobileNumberForm/>
        </CommonModal>
    </div>
  )
}

export default page