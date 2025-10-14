'use client'
import BdFlag from '@/svgs/BdFlag.svg'
import FaceBook from '@/svgs/FaceBook'
import Facebook from '@/svgs/Facebook.svg'
import Google from '@/svgs/Google.svg'
import React, { MouseEvent, useState } from 'react'
import { signIn } from "next-auth/react";
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { postSendOtp } from '@/utils/apiServices'
import { isValidMsisdn } from '@/helpers/commonFunction'
import Spinner from '../ui/Spinner.view'
import { TLoginModal } from './static/login.type'
import { toast } from 'react-toastify'

const LoginModal = ({handleSubmit}:TLoginModal) => {
    const [showSignUp,setShowSignUp]=useState(false);
    const router = usePathname();
    const [phoneNumbers,setPhoneNumbers]=useState('')
    const [errors,setErrors]=useState('');
    const [submitLoader,setSubmitLoader]=useState(false);

    const googleBtn = async () => {
      await signIn("google", { callbackUrl: `/redirecting?route=${router}` });
    };

    const handleLogin=async(e:MouseEvent<HTMLButtonElement>)=>{
      if(!isValidMsisdn(phoneNumbers)){
        setErrors('আপনার নম্বর সঠিক নয়, দয়া করে ১১ টি সংখ্যা প্রবেশ করুন')
        return;
      }
      setSubmitLoader(true);
      await handleSubmit(e,phoneNumbers)
      setSubmitLoader(false);
    }

    

  return (
      <div className="w-full max-w-2xl  border border-gray-300 rounded-2xl shadow-lg p-5 ">
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-lg font-semibold">
              লগইন / সাইনআপ করুন
            </h1>
          </div>

          {/* Social Login Section */}
          <div className="flex flex-col justify-center gap-7">

            {/* Google Button */}
            <button onClick={googleBtn} className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-[4px] shadow-md py-1.5 px-4 flex items-center gap-8 md:gap-12">
                <div className='w-full flex justify-center'>
                    <div className="w-6 h-6 mr-4 flex-shrink-0">
                        <Google/>
                    </div>
                    <span className="text-black text-xl font-semibold">
                        গুগল
                    </span>
                </div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-sm px-4">অথবা</span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          {/* Phone Input Section */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
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
                    onChange={(e) => {setPhoneNumbers(e.target.value);setErrors('');}}
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-1 focus:outline-none"
                  />
                </div>
              </div>
              <p className='text-xs text-red-600'>{errors}</p>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-[4px] shadow-md py-1.5 px-6 flex items-center justify-center"
            disabled={submitLoader}
          >
            {submitLoader?<Spinner size='w-6 h-6'/>:''}
            <span className="text-white  font-medium">
              কন্টিনিউ
            </span>
          </button>
        </div>
      </div>
  )
}

export default LoginModal