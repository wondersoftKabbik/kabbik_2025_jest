'use client'
import { getCategoryData, getUserProfile } from "@/utils/apiServices"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { TCategoryItem, TUserProfile } from "../ui/static/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCategories } from "@/store/slicers/categoriesSlice";
import { setUser } from "@/store/slicers/userSlice";


const useNavbar = () => {
    const [showCategories,setShowCategories]=useState<boolean>(false)
    const [mobileMenu,setMobileMenu]=useState<boolean>(false);
    
    // const [categoriesData,setCategoriesData]=useState<TCategoryItem[] | null>(null)
    // const [userData,setUserData]=useState<TUserProfile | null>(null);
    // const [isSubscribed,setIsSubscribed]=useState<boolean>(false);
    const user=useAppSelector(store=>store.user?.userData)
    const categories=useAppSelector(store=>store.categories?.CategoriesData)
    const dispatch=useAppDispatch();

    const getCategories=async()=>{
      if(categories && categories.length){
        return;
      }
      const data:TCategoryItem[] | null = await getCategoryData()
      // setCategoriesData(data );
      dispatch(setCategories(data))
    }

    const getProfileData=async()=>{
      if(user?.id){
        return
      }
      const data:TUserProfile|null = await getUserProfile()
        if (data){ 
          dispatch(setUser(data))
          // setUserData(data);
          // setIsSubscribed((data && data?.is_subscribed) ? true : false);
          // Cookies.set("is_subscribed",(data && data?.is_subscribed) ?'1' : '0');
        }
    }

    useEffect(()=>{
      getCategories();
      getProfileData();
    },[])
  return {showCategories,setShowCategories,user,categories,setMobileMenu,mobileMenu}
}

export default useNavbar