import { container } from '@/components/ui/static/tailwind.classes'
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
        <div className=" flex items-center justify-center bg-bg px-4 py-8 text-white">
        <div className="w-full max-w-md space-y-5">

            {/* --- Top Card --- */}
            <div
            className="rounded-2xl p-6"
            style={{
                background:
                "linear-gradient(150.34deg, #162751 22.16%, #985A8D 64.47%)",
            }}
            >
            <div className="flex justify-between mb-6">
                <p className="font-medium">মোঃ সুভন আলী</p>
                <p className="font-semibold">১১,৮৬০ পয়েন্ট</p>
            </div>

            {/* Progress bar */}
            <p className="text-sm mb-2">শ্রবণ সূচনা</p>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-2 bg-white/90 w-[85%]" />
            </div>

            <p className="text-xs mt-2 opacity-90">
                পয়েন্ট ব্যবহার করলে লেভেলের অগ্রগতির উপর কোনো প্রভাব পড়বে না
            </p>
            </div>

            {/* --- Bottom Card --- */}
            <div
            className="rounded-2xl space-y-6"
           
            >
            {/* Expiry Info */}
            {/* <div className="text-center">
                <p className="text-sm">
                <span className="font-semibold">৭৩১ পয়েন্ট</span> ৬ দিনের মধ্যে মেয়াদ শেষ হবে
                </p>
                <p className="text-sm mt-1">মেয়াদ শেষ হবে: ২৮/০২/২৫</p>
            </div> */}

            {/* Divider */}
            {/* <div className="border-t border-white/30" /> */}

            {/* Rewards Header */}
            <div className="flex justify-between items-center">
                <p className="font-semibold">কার্যকর রিওয়ার্ডস</p>
                <button className="text-sm">সবগুলো দেখুন</button>
            </div>

            {/* Rewards List */}
            <div className="space-y-4">
                {/* Reward 1 */}
                <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">
                <div>
                    <p className="text-sm font-medium">২০ টাকা মোবাইল রিচার্জ</p>
                    <p className="text-xs opacity-80">৬০০ পয়েন্ট</p>
                </div>
                <button className="bg-[#F2B5C2] text-black px-4 py-1.5 rounded-md text-sm font-medium">
                    সংরক্ষ করুন
                </button>
                </div>

                {/* Reward 2 */}
                <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">
                <div>
                    <p className="text-sm font-medium">৫০০ এমবি মোবাইল ডাটা</p>
                    <p className="text-xs opacity-80">১৫০০ পয়েন্ট</p>
                </div>
                <button className="bg-[#F2B5C2] text-black px-4 py-1.5 rounded-md text-sm font-medium">
                    সংরক্ষ করুন
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default page