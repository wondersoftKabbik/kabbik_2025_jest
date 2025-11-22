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
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { ReduxShowLoginModal } from "@/store/slicers/LoginSlice";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/Paths";
// import { LuBadgeCheck } from "react-icons/lu";

interface SubscribePackageProps {
  data: DynamicSubscriptionPack;
  setTrialModal:()=>void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSubscriptionPackData: React.Dispatch<
    React.SetStateAction<
      DynamicSubscriptionPack 
    >
  >;
  paymentMethod: (packId: any, renewal: any) => Promise<void>;
}

const SubscribePackage = ({
  data,
  setTrialModal,
  setSubscriptionPackData,
  paymentMethod,
  setShowModal
}: SubscribePackageProps) => {
  const isLoggedIn = Cookies.get("isLogin") === "true";
  const dispatch=useAppDispatch();
  const pathnameWithLang = usePathname();
  // const loginModal=useAppSelector((store)=>store?.loginSlice?.value)
  const pathname = pathnameWithLang.replace(/^\/(en|bl)/, "");

  const handleClick = async () => {
    
    // const Modal = require("bootstrap/js/dist/modal");
    if (document) {
      if (!isLoggedIn && pathname!==paths.subscribe_cpa) {
        toast.error("Please login first");
        dispatch(ReduxShowLoginModal(true));
        return;
        // const loginModal = new Modal(document?.getElementById("loginModal")!, {
        //   keyboard: true,
        // });
        // loginModal.show();
      } else {
        setShowModal(true);
        setSubscriptionPackData({...data});
        if(data?.is_free_trail){
          setTrialModal();
        }
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

  // useEffect(()=>{
  //   console.log(data,"datasss");
    
  // },[])

  return (
    <div
      className="my-2 z-[3] relative"
      onClick={handleClick}
    >
       <div className={`p-1 md:p-3  ${styles.cardBg}`}>
      {data?.banner_name ?(
        <p className={styles.corner_highlight}>
        {decodeURIComponent(data?.banner_name ?? '')}
      </p>
      ):''}
      <div className={styles.pack_name}>
        <p >
          {normalizeBillingPeriod(data?.name)?.name}
        </p>
      </div>
      <div className={"relative w-full max-w-sm "}>
        {/* Main Card */}
        <div className={"rounded-[8px] md:rounded-3xl border border-gray-600 shadow-2xl overflow-hidden p-1 md:p-3 "+styles.mid_box_gradient}>
          {/* Price Section */}
          <div className="text-center  mb-3">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-cn md:text-c3xl2 font-bold text-white">
                {convertToBanglaDigits(data?.amount)}
              </span>
              <span className="text-red-400 text-cn md:text-2xl font-bold">TK</span>
            </div>
            <p className="text-gray-300 h-[20px] text-cs md:text-lg ">
              {data?.isOnetime === 0 && (
                <small>(অটো রিনিউয়াল)</small>
              )}
            </p>
          </div>
          <p className="text-cs line-clamp-1 md:text-cs2" style={{color:'white',height:'18px' , marginBottom:'4px'}}>{data.is_free_trail?data?.subtitle:' '}</p>
          {/* Features List */}
          <div className="space-y-1 md:space-y-3 mb-2">
            {/* Feature 1 */}
            {data?.benefit?.map((item,i)=>(
              <div key={i} className="flex items-center gap-1 md:gap-3">
                <div className="flex-shrink-0 mt-0">
                  <span className="w-4 h-4 inline-block"> 
                    <Tik/>
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-cxs md:text-cs leading-tight line-clamp-1">{item?.title}</h3>
                  {item?.sub_title?<p className="text-gray-400 text-cxs md:text-cs mt-1 line-clamp-1">{item?.sub_title}</p>:''}
                </div>
            </div>
            ))}
            
            
          </div>
          
          {/* Subscribe Button */}
          <button className="w-full bg-[#FF8798] gradient_subscribe2 text-white font-semibold text-cs md:text-cn  py-1 md:py-2.5 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
            সাবস্ক্রাইব
          </button>
        </div>
      </div>
      
      
      </div>
    </div>
  );
};

export default SubscribePackage;
