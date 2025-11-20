"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import ModalExamplePage from "../ReactBootstrapCustomModal/ReactBootstrapCustomModal";
// import PaymentStatusLogin from "../../../components/auth/PaymentStatusLogin";
// import { toLocalMsisdn } from "@/helper/commonFunction";

interface PageProps {
//   referenceId: string;
//   statusId: string;
//   status:string;
//   message: string;
}

export default function PaymentStatusComponent({
//   referenceId,
//   statusId,
//   status,
//   message,
}: PageProps) {
  const searchParams = useSearchParams();
  const [showLoginModal,setShowLoginModal]=useState(false);
  const phone = searchParams.get('phone'); 
    const referenceId = searchParams.get('referenceId');
    const message = searchParams.get('message');


  useEffect(()=>{
    // alert(status)
    let token = Cookies.get("token")
    if(token==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyMCIsInJvbGUiOjEsImlhdCI6MTY2NTc0NjIyNX0.dSY47sipaGTI_OtsysFWw_kaKZKWHWRtp4vklstVgVc'){
      if(phone || Cookies.get('msisdn')){
        // alert(phone??'' + Cookies.get('msisdn'))
        setTimeout(()=>{setShowLoginModal(true)},1500)
      }else{
        window.location.href =(`http://api.kabbik.com/v3/bkash/bkash-redirect?reference=${referenceId}`)
      }
      // alert("kdjf")
    }
  },[])
  
  return (
    <>
        <div className="w-full max-w-md mx-auto mt-5">
        <div className="mt-5">
            <div className="text-center flex justify-center items-center mx-auto mb-2">
            {status?.toUpperCase() === "FAILED" ? (
                <Image
                src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/failed_logo.gif"
                height={200}
                width={200}
                alt=""
                />
            ) : (
                <Image
                src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/sucess.gif"
                height={200}
                width={200}
                alt=""
                />
            )}
            </div>

            <div>
            <p className="text-center mb-1 font-poppins text-white text-xl">
                {status?.toUpperCase() === "FAILED" ? "Failed" : "Success"} Transaction
            </p>
            </div>

            <div className="text-center text-white space-y-1">
            {referenceId && (
                <p className="font-poppins">Reference ID: {referenceId}</p>
            )}

            <p className="font-poppins">
                Status: {status?.toUpperCase() === "FAILED" ? "FAILED" : "SUCCESS"}
            </p>

            {message && <p className="font-poppins">Message: {message}</p>}
            </div>

            <div className="text-center text-white mt-4">
            {Cookies.get("token") ===
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyMCIsInJvbGUiOjEsImlhdCI6MTY2NTc0NjIyNX0.dSY47sipaGTI_OtsysFWw_kaKZKWHWRtp4vklstVgVc" ? (
                ""
            ) : (
                <Link href="/">
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md inline-flex items-center gap-2 transition"
                >
                    <i className="bi bi-house-fill text-white"></i>
                    Go Home
                </button>
                </Link>
            )}
            </div>
        </div>
        </div>
      {/* {showLoginModal?
      <ModalExamplePage onHide={()=>setShowLoginModal(false)} show={showLoginModal}>
        <PaymentStatusLogin onClose={()=>setShowLoginModal(false)} phoneNo={toLocalMsisdn(phone || Cookies.get('msisdn') )||''}/>
      </ModalExamplePage>:''} */}
    </>
  );
}
