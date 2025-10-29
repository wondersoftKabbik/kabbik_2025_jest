'use client'
import { siteConfig } from '@/config/config'
import { formatDateToBengali, handleCopy, replacePlaceholder, shareContent } from '@/helpers/commonFunction'
import { useAppSelector } from '@/store/store'
import ClockIcon2 from '@/svgs/Clock.svg'
import GitIcon from '@/svgs/git.svg'
import Image from 'next/image'
import React from 'react'
import { ReferralData } from './static/refeAndEarn.type'
import { container } from '../ui/static/tailwind.classes'
import Link from 'next/link'
import { paths } from '@/utils/Paths'
import { LinkIcon } from 'lucide-react'

const SubscribedHomePage = ({data}:{data:ReferralData}) => {
    const user=useAppSelector(store=>store.user?.userData)
  return (
    <div>
      <div className={`${user?.is_subscribed?'':'hidden'} w-[95%] lg:w-[90%] mx-auto  text-gray-900 px-4 py-8 `}>
      <div className="max-w-7xl mx-auto w-full bg-transparent space-y-8">

        {/* Header */}
        <div className="profile_earn_gradients rounded-[8px] p-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 shadow-lg">
          {/* Left: avatar + name */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={siteConfig.defaultPremiumPic} alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">{user?.full_name}</h2>
              <p className="text-white/90 text-sm">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
            </div>
          </div>

          {/* Center pills: three small cards */}
          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 px-2">
            <div className="bg-white rounded-[6px] px-5 py-2 shadow-sm flex items-center gap-3 min-w-[170px]">
              <div className="w-9 h-9 text-white flex items-center justify-center">
                <GitIcon/>
              </div>
              <div>
                <p className="font-semibold">{user?.refer_code}</p>
              </div>
            </div>

            <div className="bg-white rounded-[6px] px-2 py-2 shadow-sm flex items-center gap-1 min-w-[170px]">
              <div className="w-9 h-9  text-white flex items-center justify-center">
                <ClockIcon2/>
              </div>
              <Link href={paths?.refer_dashboard}>
                <p className="font-semibold">পেমেন্ট হিস্ট্রি</p>
              </Link>
            </div>
          </div>

          {/* Right: small payment card */}
          <div className="flex-0">
            <div className="bg-white rounded-xl p-3 w-52 text-center shadow-md">
              <p className="text-xs text-gray-500">আপনার মোট আয়</p>
              <p className="text-xl font-bold mt-1">৳১১০০</p>
              <small> ৳১০০০-এর কম পরিমাণ আয় 
                আপনি ক্লেইম করতে পারবেন না</small>
              <button className="mt-3 w-full bg-red-600 text-white text-sm py-1 rounded">উইথড্র</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            {data?.benefit?.map((item,index:number)=>(
                <p key={index} className="text-cs2 md:text-cn2 leading-relaxed text-gray-100">
                {replacePlaceholder(item,user?.refer_code??'')}
                </p>
            ))}

            <div className="flex justify-end mt-2">
              <button onClick={()=>{
                shareContent({
                  text: replacePlaceholder(data?.sharable_content,user?.refer_code??''),
                  title: "কাব্যিক অডিওবুক — Referral Offer",
                  imageUrl:data?.sharable_image_url
                })
              }} className="flex items-center gap-3 profile_earn_gradients text-white font-semibold px-6 py-3 rounded-full hover:opacity-95 transition">
                <span className="text-sm">Share Now</span>
                <span className="text-xl mt-[-10px]">↗</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end items-start relative">
            <div className="  p-5 shadow-lg">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden ">
                <Image src={data?.animated_image} alt="Books and Phone" fill className="object-contain" />
              </div>
            </div>

            
          </div>
        </div>

      </div>
    </div>
    <div className={`${user?.is_subscribed?'':'hidden'}  flex items-center justify-center px-4`}>
      <div className="max-w-2xl w-full bg-[#1C1C2C] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <p className="text-[15px] sm:text-[16px] leading-relaxed mb-6">
          কবিবিক অফিসিয়াল অ্যাপ ডাউনলোড করুন, প্রিয়জনের রেফারেল কোডে সাইনআপ করে পান আকর্ষণীয় ছাড়! নিজের রেফারেল কোড নিন, বন্ধুদের শেয়ার করুন, আর নগদ টাকা উপার্জন শুরু করুন!
        </p>

        <div onClick={()=>handleCopy(replacePlaceholder(data?.sharable_content,user?.refer_code??''))} className="flex cursor-pointer items-start gap-3">
          <div className="flex-shrink-0">
            <LinkIcon className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-[15px] mb-1">
              <span className="font-medium text-gray-200">Refer code:</span>{" "}
              <span className="font-semibold text-white">{user?.refer_code}</span>
            </p>
            <a
              href="https://kabbik.com/download-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#A3A3FF] hover:underline break-all"
            >
              https://kabbik.com/download-app
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default SubscribedHomePage