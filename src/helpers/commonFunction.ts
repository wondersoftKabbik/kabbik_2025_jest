import React, { ReactHTMLElement } from 'react'
// import { createTranslation } from 'next-international';
import { toast, ToastPosition } from 'react-toastify';
import { TtoastType } from './commonTypes';
import { apiEndPoints } from '../utils/apiEndpoints';
import { TBooks } from '@/pageTypes/home.types';

export const StringToJSX=(str:string)=>{

    return str.replaceAll('\n','<br/>')
}

export const showToast=(
    message:string,
    type:TtoastType=TtoastType.success,
    autoclose=3000,
    position='top-right'
)=>{
    toast[type](message, {
      position:position as ToastPosition,
      autoClose: autoclose,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      toastId:"1500",
      theme: "dark",
    });
}

export function formatTime(seconds:number|string) {
    seconds=Number(seconds)
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function isValidBLNumber(number:string) {
  // Remove spaces, dashes, or any formatting
  const cleaned = number.replace(/[\s\-]/g, '');

  // Match Banglalink prefixes: 014 and 019
  const blRegex = /^(?:\+880|880|0|)?(14|19)\d{8}$/;

  return blRegex.test(cleaned);
}

export async function createBlPayment(
  phoneNumber:string, 
  selectedPack:any, 
  userId:string,
  setShowLoading:(b:boolean)=>void,
  handleNext:()=>void
) {
  if (
    phoneNumber &&
    phoneNumber.length === 10 &&
    (phoneNumber.startsWith("14") || phoneNumber.startsWith("19"))
  ) {
    try {
      // showLoading(); // Replace with your actual loader
      setShowLoading(true)
      const response = await fetch(apiEndPoints.blDcbPaymentApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msisdn: phoneNumber,
          userId: userId,
          packageId: selectedPack.subscriptionItemId,
          fromRenewal: selectedPack.isOnetime === 1 ? 0 : 1,
        }),
      });

      const data = await response.json();

      if (data?.responseCode === "1" || data?.responseCode === "0") {
        // Use your routing logic here, like react-router's navigate
        // navigate('/dcb-consent-verify', {
        //   state: { phone_number: phoneNumber },
        // });
        handleNext()
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      // hideLoading(); // Dismiss loader
      setShowLoading(false)
    }
  } else {
    showToast("Please enter a valid Banglalink number",TtoastType.error);
  }
}


export function normalizeBLNumber(input:string ) {
  // Remove non-digit characters (optional, in case of formatting like +880-19...)
  if(!input){
    return
  }
  const digits = input?.replace(/\D/g, '');

  // Remove leading +880 / 880 / 0
  let normalized = digits;

  if (normalized.startsWith('880')) {
    normalized = normalized.slice(3);
  } else if (normalized.startsWith('0')) {
    normalized = normalized.slice(1);
  }

  // Now should start with 19 or 14 and be 10 digits
  if ((normalized.startsWith('19') || normalized.startsWith('14')) && normalized.length === 10) {
    console.log(normalized)
    return normalized;
  }

  // Invalid BL number
  return null;
}


export async function verifyConsent(
  phoneNumber:string, 
  otp:string, 
  navigate:any, 
  showLoading:(b:boolean)=>void
  // getUserWithDetails
) {

  if (phoneNumber && phoneNumber.length === 10) {
    try {
      showLoading(true); // Show loader

      const response = await fetch(apiEndPoints.blDcbVerifyApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msisdn: phoneNumber,
          consent: otp,
        }),
      });

      const data = await response.json();

      if (data?.responseCode === "0") {
        navigate.push('/')
        setTimeout(()=>{window.location?.reload()},3000)
        showToast(data?.message , TtoastType.success);
        // await getUserWithDetails();
        // navigateToMainScreen(navigate); // Navigate to main screen
      } else {
        showToast(data?.message || "Something went wrong...", TtoastType.error);
      }
    } catch (error:any) {
      showToast(error?.message || "Server error", TtoastType.error);
    } finally {
      // hideLoading(); // Hide loader
      showLoading(false)
    }
  }
}


export function extractNumber(input:string) {
  if(!input){
    return ''
  }
  const match = input.match(/[\d,.]+/);
  if (!match) return null;

  // Remove commas and convert to float
  return parseFloat(match[0].replace(/,/g, ''));
}

export function add(a: number, b: number): number {
  return a+b;
}

export type TcatWiseData={data:TBooks[],name:string}

export const findCatwiseData=(arr:TcatWiseData[],catName:string):TcatWiseData | undefined=>{
  return arr.find((item)=>item.name===catName);
}

export const stopPropagation=(e:any)=>{
  e.stopPropagation();
  // e.preventDefault();
}



// export const {
//   useTranslation,
//   TranslationProvider,
//   getTranslation,
// } = createTranslation({
//   en: () => import('@/locales/en/common.json'),
//   bn: () => import('@/locales/bn/common.json'),
// });
