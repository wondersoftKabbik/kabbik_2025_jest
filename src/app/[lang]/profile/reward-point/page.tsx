import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
import { container } from '@/components/ui/static/tailwind.classes'
import { ChevronRight, Clock, File, FileChartColumn, FileChartLine, FileQuestion, GitGraph, PlayCircle, Users } from 'lucide-react'
import React from 'react'

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
            <div className="z-[4] relative  flex items-center justify-center  px-4 py-8 text-white">
                <div className="w-full max-w-lg space-y-5">

                    {/* --- Top Card --- */}
                    <TopPointCard/>

                    {/* --- Bottom Card --- */}
                    <div
                        className="rounded-2xl space-y-6"
                
                    >
                        <RewrdItems/>
                    </div>
                </div>
                
            </div>

            <div
                className="z-[3] relative flex w-[90%] mx-auto items-center justify-center px-4  text-white"
            >
                <div className="w-full max-w-lg  rounded-2xl overflow-hidden">
                    {/* Section 1 */}
                    <div className="border-b border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <File className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">পয়েন্ট বিবরণী</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div>

                    {/* Section 2 */}
                    <div className="border-b border-white/20">
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
                    </div>

                    {/* Section 3 */}
                    <div className="border-b border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <GitGraph className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">যেসব টাস্কে পয়েন্ট পাওয়া যাবে</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div>

                    {/* Task list */}
                    <div className="px-5 py-4 space-y-4">
                    <div className="flex items-start space-x-2">
                        <Users className="text-[#F2B5C2] mt-1" size={16} />
                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">
                        বন্ধুকে রেফার করে সাবস্ক্রিপশন করালে – ৫০ পয়েন্ট
                        </p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Clock className="text-[#F2B5C2] mt-1" size={16} />
                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">সপ্তাহে ৪০০ মিনিট শুনলে – ৩০ পয়েন্ট</p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Clock className="text-[#F2B5C2] mt-1" size={16} />
                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">মাসে ১০০০ মিনিট শুনলে – ৪০ পয়েন্ট</p>
                    </div>
                    </div>

                    {/* FAQ */}
                    <div className="border-t border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <FileQuestion className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">সচরাচর জিজ্ঞাসা</p>
                        </div>
                    </div>
                    </div>

                    {/* Terms */}
                    <div className="border-t border-white/20">
                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center space-x-2">
                        <FileChartColumn className="text-[#F2B5C2]" size={18} />
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">শর্তাবলী</p>
                        </div>
                        <ChevronRight size={18} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page