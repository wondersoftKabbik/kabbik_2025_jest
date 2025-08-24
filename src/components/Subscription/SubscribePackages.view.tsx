"use client";

import Image from "next/image";
// import { imageLoader } from "../../utils/globalfunction";
import styles from "./static/subscribe.module.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import DynamicSubscriptionPack from "./static/subscription.type";
import { BadgeCheck } from "lucide-react";
import { convertToBanglaDigits, normalizeBillingPeriod } from "@/helpers/commonFunction";
import Tik from "@/svgs/Tik.svg";
// import { LuBadgeCheck } from "react-icons/lu";

interface SubscribePackageProps {
  data: DynamicSubscriptionPack;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSubscriptionPackData: React.Dispatch<
    React.SetStateAction<
      DynamicSubscriptionPack & {
        reduce_price?: number;
        promo_code?: string;
      }
    >
  >;
  paymentMethod: (packId: any, renewal: any) => Promise<void>;
}

const SubscribePackage = ({
  data,
  setSubscriptionPackData,
  paymentMethod,
  setShowModal
}: SubscribePackageProps) => {
  const isLoggedIn = Cookies.get("isLogin") === "true";

  const handleClick = async () => {
    setShowModal(true);
    setSubscriptionPackData(data);
    // const Modal = require("bootstrap/js/dist/modal");
    if (document) {
      if (!isLoggedIn) {
        toast.error("Please login first");
        // const loginModal = new Modal(document?.getElementById("loginModal")!, {
        //   keyboard: true,
        // });
        // loginModal.show();
      } else {
        await paymentMethod(
          Number(data.subscriptionItemId),
          data.isOnetime ? 0 : 1
        );
        // const paymentModal = new Modal(
        //   document?.getElementById("paymentBackdrop")!,
        //   {
        //     keyboard: true,
        //   }
        // );
        // paymentModal.show();
      }
    }
  };

  return (
    <div
      // className={`col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`}
      className="my-2"
      onClick={handleClick}
    >
       <div className={` p-3  ${styles.cardBg}`}>
      {data?.banner_name ?(
        <p className={styles.corner_highlight}>
        {/* <picture><img src={dealIcon?.[data?.banner_name]}/></picture> */}
        {decodeURIComponent(data?.banner_name ?? '')}
      </p>
      ):''}
      <div className={styles.pack_name}>
        <p >
          {normalizeBillingPeriod(data?.name)?.name}
        </p>
        {/* <small>{normalizeBillingPeriod(data?.name)?.day}</small> */}
      </div>
      <div className={"relative w-full max-w-sm "}>
        {/* Main Card */}
        <div className={"rounded-3xl border border-gray-600 shadow-2xl overflow-hidden p-6 "+styles.mid_box_gradient}>
          {/* Price Section */}
          <div className="text-center space-y-3 mb-8">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-6xl font-bold text-white">
                {convertToBanglaDigits(data?.amount)}
              </span>
              <span className="text-red-400 text-2xl font-bold">TK</span>
            </div>
            <p className="text-gray-300 text-lg h-5">
              {data?.isOnetime === 0 && (
                <small>(অটো রিনিউয়াল)</small>
              )}
            </p>
          </div>
          
          {/* Features List */}
          <div className="space-y-5 mb-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="w-5 h-5 inline-block"> 
                  <Tik/>
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-base leading-tight">ননস্টপ এন্টারটেইনমেন্ট</h3>
                <p className="text-gray-400 text-sm mt-1">বিজ্ঞাপন বিরতি ছাড়াই অডিওবুক শুনুন</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="w-5 h-5 inline-block"> 
                  <Tik/>
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-base leading-tight">ডাউনলোড অপশন</h3>
                <p className="text-gray-400 text-sm mt-1">ডাউনলোড করে নেট ছাড়াই অডিওবুক<br />উপভোগ করুন</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="w-5 h-5 inline-block"> 
                  <Tik/>
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-base leading-tight">এক্সক্লুসিভ অডিওবুক এক্সেস</h3>
                <p className="text-gray-400 text-sm mt-1">এক্সক্লুসিভ অডিওবুক শুনুন সবার আগে</p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="w-5 h-5 inline-block"> 
                  <Tik/>
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-base leading-tight">বিলিং সাইকেল ১ দিন</h3>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="w-5 h-5 inline-block"> 
                  <Tik/>
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-base leading-tight">ইমিডিয়েট সাপোর্ট</h3>
              </div>
            </div>
          </div>
          
          {/* Subscribe Button */}
          <button className="w-full bg-[#FF8798] hover:bg-[#FF0500] text-white font-semibold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
            সাবস্ক্রাইব
          </button>
        </div>
      </div>
      
      {/* <div className={styles.pack_name}>
        <p >
          {normalizeBillingPeriod(data?.name)?.name}
        </p>
        <small>{normalizeBillingPeriod(data?.name)?.day}</small>
      </div>
      
      <div className={styles.middle_card}>
        <div
          className={''}
        >
          <p>{convertToBanglaDigits(data?.amount)}</p>
          {data?.isOnetime === 0 && (
            <small>(অটো রিনিউয়াল)</small>
          )}
        </div>
        <div
            className={`${styles.subscribeBtn}`}
          >
            সাবস্ক্রাইব
          </div>
          
        </div> */}
      </div>
    </div>
  );
};

export default SubscribePackage;
