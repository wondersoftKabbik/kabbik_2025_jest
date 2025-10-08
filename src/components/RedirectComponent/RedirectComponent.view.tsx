"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "@/components/RedirectComponent/static/Redirecting.module.css";
import { postGoogleLogin } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

interface PageProps {
  session: any;
  redirectRoute: string;
}

export default function RedirectComponent({
  session,
  redirectRoute,
}: PageProps) {
  const navigate = useRouter();
  const sessionData = session;

  const googleApi = useCallback(async () => {
    const gData = await postGoogleLogin(sessionData?.id_token);

    Cookies.set("token", gData.token,{
      expires: 365,secure: true,          
sameSite: 'None',
      
      
    });
    Cookies.set("id", gData.user?.id,{
      expires: 365,secure: true,          
sameSite: 'None',
      
      
    });
    Cookies.set("msisdn", gData.user?.phone_no,{
      expires: 365,secure: true,          
sameSite: 'None',
      
      
    });
    Cookies.set("isLogin", "true",{
      
      
    });
    if (
      Cookies.get("token") === "undefined" ||
      Cookies.get("token") === "" ||
      Cookies.get("token") === null
    )
      return true;
    else window.location.replace(`${redirectRoute}`);
    // navigate.push("/");
  }, [sessionData?.id_token, redirectRoute]);

  useEffect(() => {
    // googleApi();
    if (session) {
      googleApi();
    } else {
      // navigate.push("/");
      window.location.replace(`${redirectRoute}`);
    }
  }, [googleApi, session, redirectRoute]);

  /*-----------------GOOGLE AUTH LOGIN------------------*/

  return (
    <div className={`h-100 ${styles.redirectingPage}`}>
      <div className="d-flex justify-content-center align-items-center">
        <picture>
          <img src="/loading-gif.gif" alt="" />
        </picture>
      </div>
    </div>
  );
}
