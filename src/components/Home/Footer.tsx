'use client'
import { siteConfig } from "@/config/config";
import FaceBook from "@/svgs/FaceBook";
import InstagramIcon from "@/svgs/InstagramIcon";
import LinkedInIcon from "@/svgs/LinkedInIcon";
import Tiktok from "@/svgs/Tiktok.svg";
import Twiter from "@/svgs/Twiter.svg";
import Youtube from "@/svgs/Youtube.Icon";
import styles from "./static/Footer.module.css"
import { footer } from "./static/utils";
import AboutIcon from "@/svgs/AboutIcon";
import TermsIcon from "@/svgs/Terms&Policy.svg";
import PhoneIcon from "@/svgs/PhoneIcon";
import UkFlagIcon, { BdFlagIcon } from "@/svgs/UkFlag.svg";
import { use, useEffect, useState } from "react";
import { NewsLetterNotificationSubs } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner.view";

export default function Footer() {
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const user=useAppSelector((state)=>state.user.userData);

  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    await NewsLetterNotificationSubs(user?.id??0,email)
    setError("");
    toast.success("NewsLetter Subscribed Successfully");
    // Call API to submit email
    setEmail("");
    setLoading(false);
  }
  return (
    <footer className="bg-[#06152B] z-10 relative text-white mt-10">
      {/* Newsletter Section */}
      <div className="px-4 max-w-[1400px] w-[97%] mx-auto py-8">
        <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-8 ">
          {/* Newsletter Text */}
          <div className="flex-1 max-w-2xl">
            <h2 className="gradient-text lg:text-[24px] font-bold mb-3 font-inter">
              <span className="">
                আমাদের নিউজলেটারে সাবস্ক্রাইব করুন
              </span>
            </h2>
            <p className="text-lg md:text-lg text-white/90 font-inter">
              আপনার ইমেইল দিন, নিয়মিত আপডেট, আসন্ন ইভেন্ট এবং
              <br className="hidden lg:block " />
              বিশেষ অফার সম্পর্কে জানতে।
            </p>
          </div>

          {/* Newsletter Form */}
          <div className=" lg:w-auto lg:max-w-[520px] w-[35%]">
            <div className="flex bg-white rounded-[8px] p-2">
              <input
                type="email"
                placeholder="ইমেইল এড্রেস"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                className="flex-1 outline-none border-0 text-[#06152B]  placeholder:text-[#06152B]/50 focus-visible:ring-0 bg-transparent font-inter"
              />
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-b from-[#96256A] to-[#C84172] text-white px-4 py-2 font-semibold rounded hover:opacity-90 transition-opacity font-inter"
              >
                {loading ? <Spinner size = "w-4 h-4"/> : ""}
                সাবস্ক্রাইব
              </button>
            </div>
            <p className="text-cxs2 text-red-400">{error}</p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-[1px] bg-white/20"></div>

      {/* Main Footer Content */}
      <div className="flex justify-between max-w-[1400px] w-[97%] mx-auto py-12">
        <div className="flex flex-wrap justify-between w-[80%]">
          {/* Logo and Social Media */}
          <div className="flex-shrink-0 mb-5 min-w-[175px]">
            <div className="mb-8">
              <img
                src={siteConfig.logo}
                alt="Kabbik Logo"
                className="h-16 w-auto"
              />
            </div>

            {/* Social Media */}
            <div className="flex gap-2">
              {footer.map((social, index) => (
                <div key={social.name} className={styles.social_icons}>
                  <div className="p-1">
                    {social.icon}
                  </div>
                  <span className="text-[6px] text-white font-hind">{social.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links Grid */}
            {/* About Section */}
            <div className="space-y-4 mb-5 max-1350:hidden min-w-[110px]">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5">
                    <AboutIcon/>
                </span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                  About
                </h3>
              </div>
              <p className="text-white/90 font-hind">About Kabbik</p>
            </div>

            {/* Terms & Policies */}
            <div className="space-y-4 mb-5 min-w-[214px]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6"><TermsIcon/></span>
                
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                  Terms & Policies
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 font-hind">Terms and Conditions</p>
                <p className="text-white/90 font-hind">Privacy Policy</p>
                <p className="text-white/90 font-hind">Refund and Return Policy</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 mb-5 min-w-[267px]">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5">
                    <PhoneIcon/>
                </span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#B83970] to-[#96246A] bg-clip-text text-transparent font-hind">
                  Contact Us
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white/90 font-hind">Call or WhatsApp: +8801915225026</p>
                <p className="text-sm text-white/90 font-hind">Email: support@wondersoftsolution.com</p>

              </div>

              <div className="mb-5 1350:hidden min-w-[110px]">
              <div className="flex items-center">
                <span className="w-5 h-5 inline-block">
                    <AboutIcon/>
                </span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                  About
                </h3>
              </div>
              <p className="text-white/90 font-hind">About Kabbik</p>
            </div>
            </div>

          {/* Office Locations */}
          <div className="space-y-6 mb-5 max-w-[204px]">
            {/* UK Office */}
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 flex items-center justify-center">
                  <span className="w-6 h-4">
                    <UkFlagIcon/>
                  </span>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-[#CA4373] to-[#95246A] bg-clip-text text-transparent font-hind">
                  UK Office:
                </h4>
              </div>
              <p className="text-sm text-white/90 font-hind">
                167-169 Great Portland street, 5th Floor,London,United Kingdom W1W PF
              </p>
            </div>

            {/* Bangladesh Office */}
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 flex items-center justify-center">
                  <span className="w-6 h-4" >
                    <BdFlagIcon/>
                  </span>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-[#CA4373] to-[#95246A] bg-clip-text text-transparent font-hind">
                  Bangladesh Office:
                </h4>
              </div>
              <p className="text-sm text-white/90 font-hind">
                House: JA-70, 2nd Floor, Link Road, Gudaraghat,Dhaka-1212
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="flex justify-center  w-[18%]">
          <img
            src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/final2.gif"
            alt="Kabbik Logo"
            className="w-[100%] max-h-[193px]"
          />
        </div>

        {/* Bottom Separator */}
      </div>
    <div className="h-[1px] bg-white/20 mt-0"></div>

      {/* Copyright */}
      <div className="text-center py-4 text-gray-400">
        <p className="text-lg font-inter">© 2025 Kabbik Audiobook. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
