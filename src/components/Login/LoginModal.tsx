import BdFlag from '@/svgs/BdFlag.svg'
import FaceBook from '@/svgs/FaceBook'
import Facebook from '@/svgs/Facebook.svg'
import Google from '@/svgs/Google.svg'
import React, { useState } from 'react'

const LoginModal = () => {
    const [showSignUp,setShowSignUp]=useState(false);
  return (
      <div className="w-full max-w-2xl  border border-gray-300 rounded-2xl shadow-lg p-5">
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl font-semibold">
              {showSignUp?"সাইন আপ":"লগইন করুন"}
            </h1>
            <p className="text-white ">
              {showSignUp?"অলরেডি হ্যাভ এন অ্যাকাউন্ট?":"ডোন্ট হ্যাভ এন অ্যাকাউন্ট?"}{" "}
                <span 
                    onClick={()=>{setShowSignUp(!showSignUp)}}
                    className="text-red-500 cursor-pointer hover:underline"
                >
                {!showSignUp?"সাইন আপ":"লগইন করুন"}
              </span>
            </p>
          </div>

          {/* Social Login Section */}
          <div className="flex flex-col justify-center gap-7">
            {/* <h2 className="text-white text-2xl md:text-3xl">লগইন করুন</h2> */}
            
            {/* Facebook Button */}
            <button className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-[4px] shadow-md py-2 px-4 flex items-center gap-8 md:gap-12">
                <div className='w-full flex justify-center'>
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                        <Facebook/>
                    </div>
                    <span className="text-black text-2xl font-semibold">
                        ফেসবুক
                    </span>
                </div>
            </button>

            {/* Google Button */}
            <button className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-[4px] shadow-md py-2 px-4 flex items-center gap-8 md:gap-12">
                <div className='w-full flex justify-center'>
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                        <Google/>
                    </div>
                    <span className="text-black text-2xl font-semibold">
                        গুগল
                    </span>
                </div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-lg px-4">অথবা</span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          {/* Phone Input Section */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium">
              ফোন নম্বর
            </label>
            
            <div className="relative">
              <div className="w-full border border-white  rounded-[4px] shadow-md bg-transparent">
                <div className="flex items-center">
                  {/* Country Code Section */}
                  <div className="flex items-center gap-2 px-1  py-2 border-r border-gray-300">
                    <div className="w-7 h-7 flex-shrink-0">
                      <BdFlag/>
                    </div>
                    <span className="text-white text-lg">+৮৮০</span>
                  </div>
                  
                  {/* Phone Input */}
                  <input
                    type="tel"
                    // value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 px-1 focus:outline-none"
                  />
                </div>
              </div>
              <p className='text-xs text-red-600'>আপনার নম্বর সঠিক নয়, দয়া করে 11 টি সংখ্যা প্রবেশ করুন</p>
            </div>
          </div>

          {/* Continue Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-[4px] shadow-md py-2 px-6">
            <span className="text-white text-lg font-medium">
              কন্টিনিউ
            </span>
          </button>
        </div>
      </div>
  )
}

export default LoginModal