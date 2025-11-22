import { MutableRefObject, useCallback, useEffect, useState } from "react";
// import { formatPaymentName, imageLoader } from "../../utils/globalfunction";
import Image from "next/image";
import styles from "./static/PaymentOptions.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { Check, Disc, X } from "lucide-react";
import Spinner from "../ui/Spinner.view";
import Tik from "@/svgs/Tik.svg";
import Percentage from "@/svgs/Percentage.view";
import SecureShield from "@/svgs/SecureShield.svg";
import SinglePaymentCard from "./SinglePaymentCard.view";
import { findObj } from "@/helpers/commonFunction";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/Paths";
// import { TbDiscount2 } from "react-icons/tb";
// import { BiCheck, BiX } from "react-icons/bi";
// import { Spinner } from "react-bootstrap";

type Option = {
  methodName: string;
  logoUrl: string;
  apiUrl: string;
  vat: number;
};

type PaymentOptionsProps = {
  options: Option[];
  callback?: (methodName: string, apiUrl: string) => Promise<void>;
  callbacks?: { methodName: string; payment: () => Promise<void> }[];
  promoData?: string;
  isFreeTrial?:boolean;
  setPromoData?: React.Dispatch<React.SetStateAction<string>>;
  isPromocodeApplied?: boolean;
  addPromocodeHandler?: () => Promise<void>;
  removePromocodeHandler?: () => Promise<void>;
  price?: number;
  reducePrice?: number;
  isMsisdnSubmitted?: MutableRefObject<boolean>;
  setIsMsisdnTakerModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentOptions = ({
  options,
  callback,
  callbacks,
  promoData,
  setPromoData,
  isPromocodeApplied,
  addPromocodeHandler,
  removePromocodeHandler,
  price,
  isFreeTrial,
  reducePrice,
  isMsisdnSubmitted,
  setIsMsisdnTakerModalOpened,
}: PaymentOptionsProps) => {
  const [isLoading,setIsLoading]=useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);
  const pathnameWithLang = usePathname();
    // const loginModal=useAppSelector((store)=>store?.loginSlice?.value)
    const pathname = pathnameWithLang.replace(/^\/(en|bl)/, "");


  
  const payNow = useCallback(async () => {
    if (!termsPrivacyAgreed) {
      toast.error(
        "To continue payment you need to accept 'terms and condition' & 'refund policy'"
      );
      return;
    }
    setIsLoading(true)
    if (callback) {
      await callback?.(selectedOption?.methodName!, selectedOption?.apiUrl!);
    } else {
      switch (selectedOption?.methodName) {
        case "bkash":
          await callbacks?.find((v) => v.methodName === "bkash")?.payment?.();
          break;
        case "bkashOnetime":
          await callbacks
            ?.find((v) => v.methodName === "bkashOnetime")
            ?.payment?.();
          break;
        case "nagad":
          await callbacks?.find((v) => v.methodName === "nagad")?.payment?.();
          break;
        case "upay":
          await callbacks?.find((v) => v.methodName === "upay")?.payment?.();
          break;
        case "robi":
          await callbacks?.find((v) => v.methodName === "robi")?.payment?.();
          break;
        case "surjopay":
          await callbacks
            ?.find((v) => v.methodName === "surjopay")
            ?.payment?.();
          break;
        case "GPDCB":
          if (isMsisdnSubmitted?.current) {
            await callbacks?.find((v) => v.methodName === "GPDCB")?.payment?.();
          } else {
            setIsMsisdnTakerModalOpened?.(true);
          }
          break;
        case "BLDCB":
            await callbacks?.find((v) => v.methodName === "BLDCB")?.payment?.();
          
          break;
        case "stripe":
          toast.error("Try again later");
          break;
        default:
          toast.error("Select another payment method");
      }
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption,termsPrivacyAgreed]);

  const findAtLeastOne=(name:string)=>{
    if(name==='mobile_wallet'){
      if(findObj('bkash',options))return true
      if(findObj('nagad',options))return true
      if(findObj('upay',options))return true
    }
    if(name==='mobile_balance'){
      if(findObj('robi',options))return true
      if(findObj('gpdcb',options))return true
      if(findObj('bldcb',options))return true
    }
    if(name==='card'){
      if(findObj('surjopay',options))return true
      if(findObj('aamarpay',options))return true
    }
  }

  useEffect(()=>{  
    if(pathname!==paths.subscribe_cpa)return;
      
    options?.map((item)=>{
        if(item?.methodName==="bkash" || item?.methodName==="bkashOnetime"){
            setSelectedOption(item);
            setTermsPrivacyAgreed(true)
        }
    })
  },[options])


  return (
    <>
      {
      callbacks !== undefined 
      ? (
        <div className="text-white ">
          <div className="text-center mb-4 px-4">
            <h1 className="text-muted2 text-cs2 md:text-clg font-semibold my-4">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h1>
            
            {/* Promo Code Section */}
            <div className="flex rounded-[4px] md:rounded-[8px] bg-[#253252] flex-row items-center px-0.5 md:px-3 mb-2">
              <div className="flex items-center   rounded-3xl  flex-1 max-w-[94vw] md:max-w-md">
                <div className="w-2 md:w-4 h-4  rounded-2xl flex items-center justify-center">
                  <Percentage/>
                </div>
                <span className="text-muted2 text-cxs md:text-cn whitespace-nowrap font-medium md:ml-1">প্রোমো কোড</span>
              </div>
              
              <div className="bg-[#35405E] rounded-[4px] border border-[#515462] p-1 m-0.5 md:m-1.5 flex items-center  ">
                <input
                  type="text"
                  value={promoData}
                  onChange={(e) => setPromoData?.(e.target.value)}
                  className="bg-transparent text-cs md:text-cs2 text-white placeholder-gray-400 flex-1 outline-none"
                  placeholder="কোড লিখুন"
                />
                <button
                  onClick={
                    !isPromocodeApplied
                      ? addPromocodeHandler
                      : removePromocodeHandler
                  }
                  className="bg-[#23442F] text-white px-1 md:px-2 py-1 rounded-[3px] shadow-md text-cxs md:text-cs hover:bg-[#2a5236] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            {isPromocodeApplied ? (
              <div className="mt-0 fs-14 text-start mb-3">
                You are saving{" "}
                <span className="fw-bolder" style={{ color: "#11af37" }}>
                  {reducePrice}
                </span>{" "}
                Tk by using this promo code
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-4 px-4 ">
          <div className="bg-navyblue rounded-[4px] md:rounded-[8px] py-2 text-center mb-2">
            <h2 className="text-white text-cs md:text-cn font-medium">লোকাল পেমেন্ট মেথড</h2>
          </div>
          <p className="text-white text-cs md:text-cs2 text-center">
            (দয়া করে আপনার পেমেন্ট মেথড নির্বাচন করুন)
          </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={findAtLeastOne('mobile_wallet')?"px-4 border-t border-muted2":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2 md:mb-5">
          <div className="mb-0 md:mb-2 lg:mb-0 mt-4">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0 md:mb-2">মোবাইল ওয়ালেট</h3>
            <p className="text-white text-cs md:text-cs2 ">মোবাইল ওয়ালেটের মাধ্যমে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">SecurePayment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-1.5 md:mx-4 flex-column gap-0">
            {findObj('bkash',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bkash',options));
                  }}
              paymentName={findObj('bkash',options)?.methodName}
              img={findObj('bkash',options)?.logoUrl}
              amount={isFreeTrial?0:(price + (findObj('bkash',options)?.vat ?? 0))}
            />:''}
          {findObj('nagad',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('nagad',options));
                  }}
              paymentName={findObj('nagad',options)?.methodName}
              img={findObj('nagad',options)?.logoUrl}
              amount={price + (findObj('nagad',options)?.vat ?? 0)}
            />:''}
          {findObj('upay',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('upay',options));
                  }}
              paymentName={findObj('upay',options)?.methodName}
              img={findObj('upay',options)?.logoUrl}
              amount={price + (findObj('upay',options)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('mobile_balance')?"  px-1.5 md:px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2">
          <div className="md:mb-2 lg:mb-0 mt-2">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0.5 md:mb-2">মোবাইল ব্যালেন্স</h3>
            <p className="text-white text-cs md:text-cs2 "> মোবাইল ব্যালেন্স দিয়ে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="w-2.5 md:w-4 h-4 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">Secure Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-4 flex-column gap-2">
            {findObj('gpdcb',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('gpdcb',options));
                  }}
              paymentName={findObj('gpdcb',options)?.methodName}
              img={findObj('gpdcb',options)?.logoUrl}
              amount={price + (findObj('gpdcb',options)?.vat ?? 0)}
            />:''}
          {findObj('robi',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('robi',options));
                  }}
              paymentName={findObj('robi',options)?.methodName}
              img={findObj('robi',options)?.logoUrl}
              amount={price + (findObj('robi',options)?.vat ?? 0)}
            />:''}
          {findObj('bldcb',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bldcb',options));
                  }}
              paymentName={findObj('bldcb',options)?.methodName}
              img={findObj('bldcb',options)?.logoUrl}
              amount={price + (findObj('bldcb',options)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('card')?"px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2">
          <div className="md:mb-2 lg:mb-0 mt-2">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0.5 md:mb-2">ডেবিট/ক্রেডিট কার্ড</h3>
            <p className="text-white text-cs  md:text-cs2">পে ভিয়া ডেবিট/ ক্রেডিট কার্ড মেথড</p>
          </div>
          
          <div className="flex items-center gap-1 ">
            <span className="w-2.5 md:w-4 h-4 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">Secure Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 mx-4">
            {findObj("surjopay",options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("surjopay",options));
                  }}
              paymentName={findObj("surjopay",options)?.methodName}
              img={findObj("surjopay",options)?.logoUrl}
              amount={price + (findObj("surjopay",options)?.vat ?? 0)}
            />:''}

             {findObj("AamarPay",options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("AamarPay",options));
                  }}
              paymentName={findObj("AamarPay",options)?.methodName}
              img={findObj("AamarPay",options)?.logoUrl}
              amount={price + (findObj("AamarPay",options)?.vat ?? 0)}
            />:''}
      </div>
      
      <div className="flex items-center mt-4 mx-7">
        <input
          id="termsPrivacy"
          style={{  marginRight: "10px", marginTop: "3px",border:'1px solid' }}
          type="checkbox"
          checked={termsPrivacyAgreed}
          onChange={(evt) => setTermsPrivacyAgreed(!termsPrivacyAgreed)}
        />
        <label htmlFor="termsPrivacy" className="d-flex items-start">
          <div className="text-white text-cxs md:text-cs2">
            আমি{" "} 
            <Link href={"/terms&condition"} className="text-[#D24874]">
              শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link href={"/returnpolicy"} className="text-[#D24874]">
              রিফান্ড{" "}
            </Link>
            নীতির সাথে একমত
          </div>
        </label>
      </div>
        <button
          disabled={!selectedOption || isLoading}
          onClick={payNow}
          className={`w-[92%] mx-auto md:w-[95%] bg-[#0D244E] text-white flex justify-center items-center 
                     border border-muted2 
                      md:px-8 py-0.5  md:py-1.5 mb-4 md:mx-3 rounded-[6px]
                      transition-colors duration-200
                      ${(!selectedOption || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#132f63]'}`}
        >
          {isLoading ? (
            <Spinner size="w-5 h-5" />
          ) : null}
          <span className="ml-2">
            {!isMsisdnSubmitted?.current ? "পেমেন্ট করুন" : "Continue"}
          </span>
        </button>
    </>
  );
};

export default PaymentOptions;

{/* <>
      {
      callbacks !== undefined 
      ? (
        <div className="text-white ">
          <div className="text-center mb-8 px-4">
            <h1 className="text-muted2 text-2xl font-semibold my-8">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h1>
            
            <div className="flex flex-col rounded-[16px] bg-[#253252] md:flex-row items-center px-3 mb-2">
              <div className="flex items-center   rounded-3xl  flex-1 max-w-md">
                <div className="w-9 h-9  rounded-2xl flex items-center justify-center">
                  <Percentage/>
                </div>
                <span className="text-muted2 text-xl whitespace-nowrap font-medium ml-1">প্রোমো কোড</span>
              </div>
              
              <div className="bg-[#35405E] rounded-[8px] border border-[#515462] p-2 m-2 flex items-center  max-w-sm">
                <input
                  type="text"
                  value={promoData}
                  onChange={(e) => setPromoData?.(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none"
                  placeholder="কোড লিখুন"
                />
                <button
                  onClick={
                    !isPromocodeApplied
                      ? addPromocodeHandler
                      : removePromocodeHandler
                  }
                  className="bg-[#23442F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#2a5236] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            {isPromocodeApplied ? (
              <div className="mt-0 fs-14 text-start mb-6">
                You are saving{" "}
                <span className="fw-bolder" style={{ color: "#11af37" }}>
                  {reducePrice}
                </span>{" "}
                Tk by using this promo code
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-8 px-4 ">
          <div className="bg-navyblue rounded-[8px] py-3 text-center mb-4">
            <h2 className="text-white text-2xl font-medium">লোকাল পেমেন্ট মেথড</h2>
          </div>
          <p className="text-white text-lg text-center">
            (দয়া করে আপনার পেমেন্ট মেথড নির্বাচন করুন)
          </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={findAtLeastOne('mobile_wallet')?"px-4 border-t border-muted2":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-5">
          <div className="mb-6 lg:mb-0 mt-4">
            <h3 className="text-white text-2xl  text-left font-semibold mb-2">মোবাইল ওয়ালেট</h3>
            <p className="text-white  ">মোবাইল ওয়ালেটের মাধ্যমে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-lg">Secure<br/>Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-4 flex-column gap-2">
            {findObj('bkash',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bkash',options));
                  }}
              paymentName={findObj('bkash',options)?.methodName}
              img={findObj('bkash',options)?.logoUrl}
              amount={price + (findObj('bkash',options)?.vat ?? 0)}
            />:''}
          {findObj('nagad',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('nagad',options));
                  }}
              paymentName={findObj('nagad',options)?.methodName}
              img={findObj('nagad',options)?.logoUrl}
              amount={price + (findObj('nagad',options)?.vat ?? 0)}
            />:''}
          {findObj('upay',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('upay',options));
                  }}
              paymentName={findObj('upay',options)?.methodName}
              img={findObj('upay',options)?.logoUrl}
              amount={price + (findObj('upay',options)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('mobile_balance')?"px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-5">
          <div className="mb-6 lg:mb-0 mt-4">
            <h3 className="text-white text-2xl  text-left font-semibold mb-2">মোবাইল ব্যালেন্স</h3>
            <p className="text-white  "> মোবাইল ব্যালেন্স দিয়ে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-lg">Secure<br/>Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-4 flex-column gap-2">
            {findObj('gpdcb',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('gpdcb',options));
                  }}
              paymentName={findObj('gpdcb',options)?.methodName}
              img={findObj('gpdcb',options)?.logoUrl}
              amount={price + (findObj('gpdcb',options)?.vat ?? 0)}
            />:''}
          {findObj('robi',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('robi',options));
                  }}
              paymentName={findObj('robi',options)?.methodName}
              img={findObj('robi',options)?.logoUrl}
              amount={price + (findObj('robi',options)?.vat ?? 0)}
            />:''}
          {findObj('bldcb',options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bldcb',options));
                  }}
              paymentName={findObj('bldcb',options)?.methodName}
              img={findObj('bldcb',options)?.logoUrl}
              amount={price + (findObj('bldcb',options)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('card')?"px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-5">
          <div className="mb-6 lg:mb-0 mt-4">
            <h3 className="text-white text-2xl  text-left font-semibold mb-2">ডেবিট/ক্রেডিট কার্ড</h3>
            <p className="text-white  ">পে ভিয়া ডেবিট/ ক্রেডিট কার্ড মেথড</p>
          </div>
          
          <div className="flex items-center gap-3 ">
            <span className="w-6 h-6 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-lg">Secure<br/>Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 mx-4">
            {findObj("surjopay",options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("surjopay",options));
                  }}
              paymentName={findObj("surjopay",options)?.methodName}
              img={findObj("surjopay",options)?.logoUrl}
              amount={price + (findObj("surjopay",options)?.vat ?? 0)}
            />:''}

             {findObj("AamarPay",options)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("AamarPay",options));
                  }}
              paymentName={findObj("AamarPay",options)?.methodName}
              img={findObj("AamarPay",options)?.logoUrl}
              amount={price + (findObj("AamarPay",options)?.vat ?? 0)}
            />:''}
      </div>
      
      <div className="flex items-center mt-8 mx-7">
        <input
          id="termsPrivacy"
          style={{ transform: "scale(1.5)", marginRight: "10px", marginTop: "3px",border:'1px solid' }}
          type="checkbox"
          checked={termsPrivacyAgreed}
          onChange={(evt) => setTermsPrivacyAgreed(!termsPrivacyAgreed)}
        />
        <label htmlFor="termsPrivacy" className="d-flex items-start">
          <div className="text-white text-[20px]">
            আমি{" "} 
            <Link href={"/terms&condition"} className="text-[#0200FF]">
              শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link href={"/returnpolicy"} className="text-[#0200FF]">
              রিফান্ড{" "}
            </Link>
            নীতির সাথে একমত
          </div>
        </label>
      </div>
        <button
          disabled={!selectedOption || isLoading}
          onClick={payNow}
          className={`w-[95%] bg-[#0D244E] text-white flex justify-center items-center 
                     border border-muted2 
                      px-8 py-2 md:px-16 md:py-3 mb-4 mx-3 rounded-[6px]
                      transition-colors duration-200
                      ${(!selectedOption || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#132f63]'}`}
        >
          {isLoading ? (
            <Spinner size="w-5 h-5" />
          ) : null}
          <span className="ml-2">
            {!isMsisdnSubmitted?.current ? "পেমেন্ট করুন" : "Continue"}
          </span>
        </button>
    </> */}