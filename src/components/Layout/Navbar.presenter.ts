'use client'
import { getCategoryData, getUserProfile } from "@/utils/apiServices"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { TCategoryItem, TUserProfile } from "../ui/static/types";


const useNavbar = () => {
    const [showCategories,setShowCategories]=useState<boolean>(false)
    const [categoriesData,setCategoriesData]=useState<TCategoryItem[] | null>(null)
    const [userData,setUserData]=useState<TUserProfile | null>(null);
    const [isSubscribed,setIsSubscribed]=useState<boolean>(false);

    const getCategories=async()=>{
      const data:TCategoryItem[] | null = await getCategoryData()
      setCategoriesData(data );
    }

    const getProfileData=async()=>{
      const data:TUserProfile|null = await getUserProfile()
        if (data){ 
          setUserData(data);
          setIsSubscribed((data && data?.is_subscribed) ? true : false);
          Cookies.set("is_subscribed",(data && data?.is_subscribed) ?'1' : '0');
        }
    }

    useEffect(()=>{
      getCategories();
      getProfileData();
    },[])
  return {showCategories,setShowCategories,categoriesData,userData,isSubscribed}
}

export default useNavbar