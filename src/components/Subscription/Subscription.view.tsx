"use client";
import styles from "./static/style.module.css";
import Link from "next/link";
import OtpInput from "react-otp-input";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import {
  paymentMethodlist,
  getPromoCodeApi,
  userProfile,
  robiPostApi,
  upayPostApi,
  nagadPostApi,
  bkashOneTimePostApi,
  bkashPostApi,
  aamarpayPostApi,
  gpPostApi,
  blDcbVerifyApi,
} from "@/utils/apiServices";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import MsisdnTracker from "./MsisdnTracker.view";
import { createBlPayment, extractNumber, isValidBLNumber, normalizeBLNumber, verifyConsent } from "@/helpers/commonFunction";
import DynamicSubscriptionPack from "./static/subscription.type";
import { UserProfileInfo } from "../audiobook/static/audiobook.type";
import Spinner from "../ui/Spinner.view";
import SubscribePackage from "./SubscribePackages.view";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import PaymentOptions from "./PaymentOptions.view";
import { container } from "../ui/static/tailwind.classes";
import LeftAngle from "@/svgs/LeftAngle.svg";

const SubscribeComponent = ({
  subscriptionPackList,
  categoryListData,
}: {
  subscriptionPackList: DynamicSubscriptionPack[];
  categoryListData: any;
}) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const [loader,setLoader]=useState(true);
  const [isSubscribed,setIsSubscribed]=useState(true);

  const [promoData, setPromoData] = useState("");
  const [promoCode, setPromoCode]: any = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [subscriptionPackData, setSubscriptionPackData] = useState(
    {} as DynamicSubscriptionPack & {
      reduce_price?: number;
      promo_code?: string;
    }
  );
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [isMsisdnTakerModalOpened, setIsMsisdnTakerModalOpened] =
    useState(false);
  const isMsisdnSubmitted = useRef(false);
  const msisdnRef = useRef("");

  const isMsisdnValid = msisdn.length === 11;
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

  const [blNumberModal,setBlNumberModal]=useState({show:false,value:''});
  const [blOtpModal,setBlOtpModal]=useState({show:false,value:''})
  const [blLoader,setBlLoader]=useState(false)
  const navigate=useRouter();
  const [openPaymentModal,setOpenPaymentModal]=useState(false);


  const handleBlPayment=async()=>{
    if(isValidBLNumber(blNumberModal.value)){
      createBlPayment(
        normalizeBLNumber(blNumberModal.value ) ?? '', 
        subscriptionPackData, 
        userData?.id?userData?.id.toString():'' ,
        (value)=>{setBlLoader(value)},
        ()=>{
          setBlOtpModal({show:true,value:''});
          setBlNumberModal({...blNumberModal,show:false})
        }
      )
    }else{
      setBlNumberModal({show:true,value:''})
    }
  }

  useEffect(() => {
    let is_subscribed=Cookies.get('is_subscribed');
    if(is_subscribed==='1'){
      setIsSubscribed(true)
      router.push('/');
    }else{
      setIsSubscribed(false)
      setTimeout(()=>{
        let is_subscribed=Cookies.get('is_subscribed');
        if(is_subscribed==='1'){
          router.push('/');
          setIsSubscribed(true)
        }else{
          setIsSubscribed(false)
        }
        setLoader(false)
      },1000)
    }

  }, []);

  

  useEffect(() => {
    console.log(subscriptionPackList,"subscriptionPackList");
    
    // if (isMsisdnTakerModalOpened) {
    //   const Modal = require("bootstrap/js/dist/modal");
    //   const msisdnTakerModal = new Modal(
    //     document?.getElementById("msisdnTakerModal")!,
    //     {
    //       keyboard: false,
    //     }
    //   );
    //   msisdnTakerModal.show();
    // }
  }, [isMsisdnTakerModalOpened]);
  const [blDcbMsisdnModalOpen, setBlDcbMsisdnModalOpen] = useState(false);
  const [blDcbMsisdn, setBlDcbMsisdn] = useState("");
  const [showBlDcbOtpSubmitButton, setShowBlDcbOtpSubmitButton] =
    useState(false);
  const modalRef = useRef(null);
  const [blDcbOtp, setBlDcbOtp] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userProfile();
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  useEffect(()=>{console.log(subscriptionPackList,"subscriptionPackList")},[subscriptionPackList])

  useEffect(() => {
    const divs = document.getElementsByClassName("modal-backdrop fade show");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].innerHTML === "") {
        divs[i].remove();
      }
    }
  });

  const paymentMethod = async (packId: number, renewal: number = 1) => {
    const methodData = await paymentMethodlist(packId, renewal);
    setPaymentMethodData(
      methodData.data.filter(
        (v: any) => v.name !== "googlePay" && v.name !== "stripe"
      )
    );
  };

  const promocodeHandler = async () => {
    const promoCodeData = await getPromoCodeApi(
      subscriptionPackData.subscriptionItemId,
      promoData
    );
    if (promoCodeData.success === "false") {
      toast.error("Invalid promo code");
      return;
    }
    if (Object.keys(promoCodeData).length) {
      subscriptionPackData.reduce_price = promoCodeData.data.reduce_price;
      subscriptionPackData.promo_code = promoData;
      setPromoCode(promoCodeData.data);
      toast.success("Promo Code Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error("Invalid Promo Code!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const removeHandler = async () => {
    delete subscriptionPackData.reduce_price;
    setPromoData("");
    toast.info("Promo Code Removed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  const checkPromocodeCompatibility = (paymentType: string) => {
    console.log(paymentType,promoCode.allowedPaymentMethods)
    let allowed = true;
    if (
      promoCode.promo_type === "restricted" &&
      promoCode.allowedPaymentMethods
    ) {
      const isAllowed = promoCode.allowedPaymentMethods.filter(
        (p: any) => p.type.toLowerCase() === paymentType
      );
      allowed = isAllowed.length === 0 ? false : true;
    }
    return allowed;
  };

  const bkashPayment = async () => {
    if (checkPromocodeCompatibility("bkash")) {
      const bkashResponseData = await bkashPostApi(subscriptionPackData);
      router.push(bkashResponseData.data.redirectURL);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const bkashOneTimePayment = async () => {
    if (checkPromocodeCompatibility("bkash")) {
      const bkashOneTimeResponseData = await bkashOneTimePostApi(
        subscriptionPackData
      );
      router.push(bkashOneTimeResponseData.data.bkashURL);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const nagadPayment = async () => {
    if (checkPromocodeCompatibility("nagad")) {
      const nagadResponseData = await nagadPostApi(subscriptionPackData);
      router.push(nagadResponseData.data.callBackUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const upayPayment = async () => {
    if (checkPromocodeCompatibility("upay")) {
      const upayResponseData = await upayPostApi(subscriptionPackData);
      router.push(upayResponseData.data.data.gateway_url);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const aamarpayPayment = async () => {
    if (checkPromocodeCompatibility("surjo")) {
      const aamarpayResponseData = await aamarpayPostApi(
        subscriptionPackData,
        userData
      );
      router.push(aamarpayResponseData.data.callBackUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const robiPayment = async () => {
    if (checkPromocodeCompatibility("robi")) {
      const robiResponseData = await robiPostApi(subscriptionPackData);
      router.push(robiResponseData.data.redirectUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const gpPayment = async () => {
    if (checkPromocodeCompatibility("gpdcb")) {
      const gpResponseData = await gpPostApi({
        ...subscriptionPackData,
        msisdn: msisdnRef.current,
      });
      if (gpResponseData?.resultCode === "SUCCESS") {
        router.push(gpResponseData.url);
      } else {
        toast.error("Payment failed, please try again");
      }
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const submitBlDcbMsisdn = async (event: any) => {
    // event.preventDefault();
    // const payload = {
    //   msisdn: String(blDcbMsisdn).slice(-10),
    //   userId: Cookies.get("id"),
    //   packageId: subscriptionPackData.subscriptionItemId,
    //   fromRenewal: subscriptionPackData.from_autorenewal,
    // };
    // console.log(payload);
    // const result = await blDcbPostApi(payload);
    // if (result.success) {
    //   setShowBlDcbOtpSubmitButton(true);
    //   toast.success("OTP Sent!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //   });
    // } else {
    //   toast.error("Something went wrong, please try again.");
    // }
  };

  const submitBlDcbOtp = async (event: any) => {
    event.preventDefault();
    const payload = {
      msisdn: blDcbMsisdn,
      consent: blDcbOtp,
    };
    const result = await blDcbVerifyApi(payload);
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      router.push("/");
    } else {
      toast.error(result.message || "Something went wrong, please try again");
    }
  };

  return (
    <>
       <div className="w-full h-[100px] bg-[#0E1D3F] mt-[-100px]"></div>
      <div className="  relative ">
        {/* Back Arrow */}
        <div className="absolute left-4 md:left-4 md:top-1  ">
          <span 
            onClick={()=>{router.back()}}
            className="w-9 h-9 sm:w-12 sm:h-12 md:w-20 md:h-20 inline-block text-white "
          >
            <LeftAngle />
          </span>
        
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 md:px-8 flex flex-col justify-center  relative">
          
          {/* Main Heading */}
          <div className="text-center mb-2">
            <h1 className={"font-lexend font-bold text-[6vw] xl:leading-[10vw] "+styles.gradient_text}>
              সাবস্ক্রিপশন
            </h1>
          </div>

          {/* Hero Text */}
          <div className="text-center mb-8 md:mb-2 max-w-5xl mx-auto">
            <p className="font-bengali text-white text-lg sm:text-clg2  leading-[30px] font-normal">
              ৩০০০+ অডিওবুক ও এক্সক্লুসিভ কনটেন্ট আনলক করুন,<br className="hidden md:block" />
              যখন খুশি যেখানে খুশি!
            </p>
          </div>

          {/* Plan Selection Section */}
          <div className="text-center mb-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className={"font-bengali font-bold text-2xl sm:text-3xl md:text-cxl leading-tight  gradient-text mb-2 "+styles.gradient_para}>
                আপনার সেরা প্ল্যানটি বেছে নিন
              </h2>
              <p className="font-bengali text-white text-cn leading-tight md:leading-[2.005] font-normal max-w-2xl mx-auto">
                কাব্যিক-এর প্রিমিয়াম ফিচার উপভোগ করতে সাবস্ক্রাইব করুন
              </p>
            </div>
            <div className="circular_gradient right-[-20%] top-[-10%] w-[30vw] h-[30vw] absolute  "></div>
          </div>

          {/* Premium Package Text */}
          <div className="text-center">
            <p className="font-bengali text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] leading-tight md:leading-[2.005] font-semibold">
              প্রিমিয়াম প্যাকেজে পাচ্ছেন
            </p>
          </div>

        </div>
      </div>
    {loader?
      <div className="subscribe-loader"><Spinner/></div>
      :(
      <>
      <ToastContainer />
      <div className={`${styles.divBody}`}>
        <div className={"container relative "+container('1206px')}>
          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-4"}>
            <div className="circular_gradient left-[-20%] top-[10%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="circular_gradient right-[-20%] bottom-[0%] w-[30vw] h-[30vw] absolute  "></div>
            {subscriptionPackList?.map(
              (data: DynamicSubscriptionPack, index: number) => {
                return (
                  <React.Fragment key={`${data.id}-${index}`}>
                    {data.subscriptionItemId === "2" ? (
                      <>
                        <div 
                          onClick={()=>{setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          className={`col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`}
                        >
                          <SubscribePackage
                            key={`${data.id}-${index}-1`}
                            data={{ ...data, isOnetime: 0 }}
                            setSubscriptionPackData={setSubscriptionPackData}
                            paymentMethod={paymentMethod}
                            setShowModal={setOpenPaymentModal}
                          />
                        </div>
                        <div 
                          onClick={()=>{setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          className={`col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`}
                        >
                          <SubscribePackage
                            key={`${data.id}-${index}-2`}
                            data={{ ...data, isOnetime: 1 }}
                            setSubscriptionPackData={setSubscriptionPackData}
                            paymentMethod={paymentMethod}
                            setShowModal={setOpenPaymentModal}
                          />
                        </div>
                      </>
                    ) : (
                      <div 
                          className={`col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`} 
                          onClick={()=>{
                            setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          >
                        <SubscribePackage
                          key={data.id}
                          data={data}
                          setSubscriptionPackData={setSubscriptionPackData}
                          paymentMethod={paymentMethod}
                          setShowModal={setOpenPaymentModal}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          <CommonModal
            isOpen={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
            // className={(blNumberModal.show || blOtpModal.show )?styles.blPaymentBg:''}
          >
            <div className="bg-[#0E1D3F] inline-block h-[100%] rounded-[8px] max-h-[96vh] overflow-y-auto">
              {/* <h2>
                  {isMsisdnTakerModalOpened ?
                      "Enter your GP number" :
                      blNumberModal.show ? "Pay with your mobile balance":
                      blOtpModal.show ?"Enter Your OTP":
                      "Select Payment Method"
                  }
              </h2> */}
              {isMsisdnTakerModalOpened?(
                <MsisdnTracker
                  value={msisdnRef.current}
                  onChange={(e:any) => {
                    setMsisdn((prev) => e.target.value);
                    msisdnRef.current = e.target.value;
                    setIsNextButtonPressed(false);
                  }}
                  isMsisdnValid={isMsisdnValid}
                  isNextButtonPressed={isNextButtonPressed}
                  BtnBoxClass={' bg-[#18A7EF] '}
                  label={"Enter your GP number"}
                  errorMessage="Enter a valid grameen phone number!"
                  handleNext={() => {
                    setIsNextButtonPressed(true);
                    if (isMsisdnValid) {
                      gpPayment();
                      isMsisdnSubmitted.current = true;
                      // setIsMsisdnTakerModalOpened(false);
                    }
                  }}
                />
              ):blNumberModal.show?(
                <MsisdnTracker
                  value={blNumberModal.value}
                  onChange={(e:any) => {
                    setBlNumberModal({value: e.target.value,show:blNumberModal.show});
                    // msisdnRef.current = e.target.value;
                    setIsNextButtonPressed(false);
                  }}
                  isMsisdnValid={isValidBLNumber(blNumberModal.value)}
                  isNextButtonPressed={isNextButtonPressed}
                  errorMessage="Enter a valid Banglalink number!"
                  label={"Enter your Banglalink number"}
                  inputBoxClass={styles.blPaymentInputBg}
                  BtnBoxClass={styles.BtnBoxClass}
                  handleNext={() => {
                    setIsNextButtonPressed(true);
                    if (isValidBLNumber(blNumberModal.value)) {
                      handleBlPayment();
                      // isMsisdnSubmitted.current = true;
                      // setIsMsisdnTakerModalOpened(false);
                    }
                  }}
                />
              ):blOtpModal.show?(
               <div className="flex flex-col items-center justify-center p-6 bg-gray-900/70 rounded-2xl shadow-lg backdrop-blur-md text-white w-full max-w-md mx-auto">
                  <p className="text-center text-lg font-medium mb-4">
                    An OTP was sent to your number
                  </p>
                  <div className="mx-auto mb-6">
                    <OtpInput
                      value={blOtpModal.value}
                      onChange={(e) => setBlOtpModal({ value: e, show: blOtpModal.show })}
                      numInputs={5}
                      renderSeparator={<span className="me-2"></span>}
                      inputType="tel"
                      inputStyle={styles.otpInputField}
                      shouldAutoFocus={true}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-all duration-200 font-semibold shadow-md ${styles.BtnBoxClass}`}
                    onClick={() => {
                      verifyConsent(
                        normalizeBLNumber(blNumberModal.value) ?? "",
                        blOtpModal.value,
                        navigate,
                        (value) => {
                          setBlLoader(value);
                        }
                      );
                    }}
                  >
                    Submit OTP
                  </button>
                </div>
              ):
              (
              <div
                className="modal-body text-center d-flex flex-column"
                // style={{ gap: "1rem" }}
              >
                <PaymentOptions
                  options={paymentMethodData.map((option: any) => ({
                    methodName: option.name,
                    logoUrl: option.thumbnail,
                    apiUrl: option.url,
                    vat: Number(extractNumber(subscriptionPackData.amount) ?? 0) *  Number(option.vat_percentage),
                    extraChargeFor: option.extra_charge_for,
                  }))}
                  callbacks={[
                    { methodName: "bkash", payment: bkashPayment },
                    { methodName: "bkashOnetime", payment: bkashOneTimePayment },
                    { methodName: "nagad", payment: nagadPayment },
                    { methodName: "upay", payment: upayPayment },
                    { methodName: "surjopay", payment: aamarpayPayment },
                    { methodName: "robi", payment: robiPayment },
                    { methodName: "GPDCB", payment: gpPayment },
                    { methodName: "BLDCB", payment: handleBlPayment },
                    // { methodName: "stripe", payment: stripePayment }
                  ]}
                  promoData={promoData}
                  setPromoData={setPromoData}
                  isPromocodeApplied={"reduce_price" in subscriptionPackData}
                  addPromocodeHandler={promocodeHandler}
                  removePromocodeHandler={removeHandler}
                  price={
                    "reduce_price" in subscriptionPackData
                      ? subscriptionPackData.rawPrice -
                        subscriptionPackData.reduce_price!
                      : subscriptionPackData?.rawPrice
                  }
                  reducePrice={subscriptionPackData?.reduce_price}
                  isMsisdnSubmitted={isMsisdnSubmitted}
                  setIsMsisdnTakerModalOpened={setIsMsisdnTakerModalOpened}
                />
              </div>
              )}
            </div>
           
          </CommonModal>

          {/* <div className="text-center mt-3">
            <span className="bg-white px-3 py-2 rounded-2">
              মোস্ট পপুলার ক্যাটেগরিজ
            </span>
          </div> */}

          {/* {categoryListData && categoryListData.length ? (
            <ul className={`list-unstyled ${styles.categoriesList}`}>
              {categoryListData?.map((categorylist: any, index: any) => (
                <li key={categorylist?.id}>
                  <Link
                    href={`categoryItem_list/${categorylist?.id}/${categorylist?.name}`}
                  >
                    {categorylist.thumb_path ? (
                      <Image
                        // loader={imageLoader}
                        src={categorylist.thumb_path}
                        height={100}
                        width={100}
                        alt="audiobook-img"
                        className={`img-fluid round-16`}
                        quality={80}
                      />
                    ) : (
                      <Image
                        // loader={imageLoader}
                        src="/demo_book.jpg"
                        height={100}
                        width={100}
                        alt="audiobook-img"
                        className={`img-fluid round-16`}
                        quality={80}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )} */}
        </div>
      </div>
      
    </>
    )}</>
  );
};

export default dynamic(() => Promise.resolve(SubscribeComponent), {
  ssr: false,
});
