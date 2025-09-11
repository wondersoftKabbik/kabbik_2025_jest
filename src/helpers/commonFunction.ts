import React, { ReactHTMLElement } from 'react'
// import { createTranslation } from 'next-international';
import { toast, ToastPosition } from 'react-toastify';
import { Edigit, TtoastType, TtranslatorNums } from './commonTypes';
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

export function isValidMsisdn(msisdn: string): boolean {
  // Ensure only digits
  if (!/^\d+$/.test(msisdn)) return false;

  // Check length (10 or 11)
  if (!(msisdn.length === 10 || msisdn.length === 11)) return false;

  // Check prefix
  if (!(msisdn.startsWith("01") || msisdn.startsWith("1"))) return false;

  return true;
}

export function normalizeMsisdn(input: string): string | null {
  // Remove spaces, dots, non-digits
  let msisdn = input.replace(/\D/g, "");

  // Case 1: Already in 8801XXXXXXXXX format (13 digits)
  if (/^8801\d{9}$/.test(msisdn)) {
    return msisdn;
  }

  // Case 2: Local 01XXXXXXXXX (11 digits)
  if (/^01\d{9}$/.test(msisdn)) {
    return "88" + msisdn;
  }

  // Case 3: Local 1XXXXXXXXX (10 digits, missing leading 0)
  if (/^1\d{9}$/.test(msisdn)) {
    return "880" + msisdn;
  }

  // Not valid
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

export function formatDate(dateString: string, lang: 'bn' | 'en' = 'en'): string {
  const date = new Date(dateString);

  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthsBn = ["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
                    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

  const enDigits = ['0','1','2','3','4','5','6','7','8','9'];
  const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (lang === 'bn') {
    const bnDay = day.toString().replace(/\d/g, d => bnDigits[+d]);
    const bnYear = year.toString().replace(/\d/g, d => bnDigits[+d]);
    return `${bnDay} ${monthsBn[monthIndex]} ${bnYear}`;
  } else {
    return `${day} ${monthsEn[monthIndex]} ${year}`;
  }
}


export  function decodeWord(encodedStr:string) {
  return decodeURIComponent(encodedStr);
}


export const numberTranslator=(num:number, map:any)=> {
  return String(num)
    .split('')
    .map(digit => map[digit as Edigit] || digit)
    .join('');
}


export const handleShare = async () => {
	if (navigator.share) {
		try {
			await navigator.share({
				title: document.title,
				text: 'Check this out!',
				url: window.location.href,
			});
		} catch (error) {
			console.error('Error sharing:', error);
		}
	} else {
		alert('Share not supported on this browser.');
	}
};

export function formatDateDDMMYY(dateStr: string): string {
  const date = new Date(dateStr.replace(" ", "T")); // Ensure ISO format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Last two digits
  return `${day}/${month}/${year}`;
}

export function formatTimeForAudio(secs: number) {
  if (!isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const clampAudio=(v: number, min: number, max: number) =>{
  return Math.max(min, Math.min(max, v));
}

export const formatNumber = (num: number): any => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num;
};

export const  GetFloatNum=(num:number|string,toPosition:number)=>{
  if( typeof num !== 'number' && typeof num !== 'string' || isNaN(Number(num)) || !isFinite(Number(num))) {
    return 0;
  } 
  return Number(Number(num).toFixed(toPosition));
}


export function textSlice(
  text: string,
  length: number,
  addEllipsis = true,
  defaultText = "N/A"
): string {
  if(!text)return '';
  if(text.length === 0) return defaultText;
  if (text.length <= length) return text
  return addEllipsis ? text.slice(0, length) + "…" : text.slice(0, length)
}


export function normalizeBillingPeriod(text: string) {
  const normalizedText = text.toLowerCase();

  if (/6[\s-]*month|half[\s-]*yearly/.test(normalizedText)) {
    return { name: "৬ মাস", day: "(১৮০ দিন)" };
  }
  if (/1[\s-]*year|yearly/.test(normalizedText)) {
    return { name: "ইয়ারলি", day: "(৩৬০ দিন)" };
  }

  

  if (/1[\s-]*month|monthly/.test(normalizedText)) {
    return { name: "মান্থলি", day: "(৩০ দিন)" };
  }

  if (/biweekly|2[\s-]*weeks|fortnight/.test(normalizedText)) {
    return { name: "বাই-উইকলি", day: "(১৫ দিন)" };
  }

  if (/weekly|1[\s-]*week/.test(normalizedText)) {
    return { name: "উইকলি", day: "(৭ দিন)" };
  }

  if (/daily|1[\s-]*day/.test(normalizedText)) {
    return { name: "ডেইলি", day: "(১ দিন)" };
  }
  console.log(text,)

  return {};
}


export function convertToBanglaDigits(input:string|number) {
  input=input.toString();
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return input.toString().split('').map((char:string) => {
    return /\d/.test(char) ? banglaDigits[Number(char)] : char;
  }).join('');
}

export const findObj=(name:string,arr:any)=>{
  let item = arr.find((item:any)=>item.methodName?.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
  return item;
}

export const  clearSessionAndRedirect=()=> {
  // 1. Clear all cookies
  document.cookie.split(";").forEach(cookie => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });

  // 2. Clear localStorage
  localStorage.clear();

  // 3. Redirect to home and reload
  window.location.reload();
  window.location.href = "/";
}
