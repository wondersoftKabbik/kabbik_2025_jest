'use client'
import React, { useCallback, useEffect, useState } from 'react';
import BookIcon from '@/svgs/bookIcon';
import LoveIcon from '@/svgs/LoveIcon';
import { Delete, GraduationCap, HandshakeIcon, InfoIcon, LogOut, PersonStandingIcon, StarIcon } from 'lucide-react';
import PlayIcon from '@/svgs/PlayIcon.svg';
import UserIcon from '@/svgs/UserIcon';
import TakaIcon from '@/svgs/TakaIcon.svg';
import DownloadIconWithBg from '@/svgs/DownloadIconWithBg';
import MyPlayList from '@/svgs/MyPlayList.svg';
import { cn } from '@/lib/utils';
import { clearSessionAndRedirect } from '@/helpers/commonFunction';
import { paths } from '@/utils/Paths';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { UserProfileInfo } from '../audiobook/static/audiobook.type';
import { UserSummaryInfo } from './static/profile.type';
import { bkashUnSubscribeUserApi, gpUnsubscribeApi, postBookRequest, redeemCodePostApi, robiUnSubscribeUserApi, updateProfile, userProfile, userSummary } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import TopSection from './TopSection.view';
import { useAppSelector } from '@/store/store';
import { MenuItem } from './MenuItem.view';
import CommonModal from '../ui/CommonModal/CommonModal.view';
import RobiNumberInput from './RobiNumberModal.view';
import CancelSubscriptionModal from './TakingConfirmation.view';
import BookInfoForm from './BookRequestModal.view';
import ReedemCodeActivate from './ReedemCode.view';
import ProfileInfoForm from './UpdateProfile.view';
import ContactUsModal from './ContactUsModal.view';
import SponsorFormModal from './SponsorShipModal.view';

export default function Profiles(profileData: any) {
  const router = useRouter();
  const [isLogin, setIsLogin]: any = useState();
  const user=useAppSelector((store)=>store.user.userData);
  const [showRobiNumberModal,setShowRobiNumberModal]=useState(false);
  const [showConfirmationModal,setShowConfirmationModal]=useState(false);
  const [showBookRequestModal,setShowBookRequestModal]=useState(false);
  const [showRedeemModal,setShowRedeemModal]=useState(false);
  const [profileInfoModal,setProfileInfoModal]=useState(false);
  const [showContactModal,setShowContactModal]=useState(false);
  const [sponsorShipModal,setSponsorShipModal]=useState(false);

  const isAuthenticated = useCallback(async () => {
    setIsLogin(Cookies.get("isLogin"));
    if (isLogin === "false") {
      window.location.replace("/");
    }
  }, [isLogin]);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  

  const [userName, setUserName] = useState("");
  const [bookName, setbookName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  


  const unSubscribeHandler = async () => {
    switch (user?.payment_method) {
      case "bKash":
        await bkashUnSubscribeUserApi(user?.subscription_id);
        router.push("/");
        break;
      case "Robi":
        setShowRobiNumberModal(true);
        break;
      case "GPDCB_SUBS":
        const result = await gpUnsubscribeApi();
        if (result?.success) {
          router.push("/");
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
        } else if(result){
          toast.error("Could not unsubscribe");
        }
        break;
    }
  };

  const robiUnsubscribed = async (robiMsisdn:string) => {
    await robiUnSubscribeUserApi(robiMsisdn);
    router.push("/");
  };

  

  /*-----------------GOOGLE AUTH LOGIN------------------*/

  const logOutHandle = () => {
    if (!profileData.session) {
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
      localStorage.clear();
      window.location.replace("/");
    } else {
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
      localStorage.clear();
      signOut({ callbackUrl: "/" });
    }
  };

  /*-----------------GOOGLE AUTH LOGIN------------------*/



  




  const menuItems = [
    // Row 1
    { title: 'বইয়ের অনুরোধ', icon: <BookIcon color="white" />, gradient: 'bg-blue-gradient', hasNewBadge: true, handleClick:()=>{setShowBookRequestModal(true)} },
    { title: 'রিডিম কোড', icon: <LoveIcon />, gradient: 'bg-red-gradient',handleClick:()=>{setShowRedeemModal(true)} },
    { title: 'পছন্দের তালিকা', icon: <PlayIcon />, gradient: 'bg-green-gradient' , handleClick:()=>{router.push(paths.favorites)} },

    // Row 2
    { title: 'রেন্ট বুক', icon: <UserIcon />, gradient: 'bg-purple-gradient', hasNewBadge: true, handleClick:()=>{router.push(paths.my_rents)} },
    { title: 'রেফার অ্যান্ড আর্ন', icon: <TakaIcon />, gradient: 'bg-orange-gradient' },
    { title: 'আমার কোর্স', icon: <GraduationCap />, gradient: 'bg-green-gradient', hasNewBadge: true,handleClick:()=>{router.push(paths.my_courses)} },

    // Row 3
    // { title: 'ডাউনলোড', icon: <DownloadIconWithBg />, gradient: 'bg-red-gradient' },
    { title: 'স্পনসরশিপ', icon: <HandshakeIcon />, gradient: 'bg-yellow-gradient', handleClick:()=>setSponsorShipModal(true) },
    { title: 'অ্যাকাউন্ট ডিঅ্যাকটিভেট', icon: <Delete />, gradient: 'bg-purple-gradient',handleClick:clearSessionAndRedirect },

    // Remaining items (to be shown in a single horizontal row)
    { title: 'আমার প্লে-লিস্ট', icon: <MyPlayList />, gradient: 'bg-teal-gradient' ,handleClick:()=>router.push(paths.myPlayList) },
    { title: 'অ্যাবাউট আস', icon: <InfoIcon />, gradient: 'bg-blue-gradient' ,handleClick:()=>router.push('/about')},
    { title: 'কন্ট্যাক্ট আস', icon: <PersonStandingIcon />, gradient: 'bg-purple-gradient',handleClick:()=>{setShowContactModal(true)} },
    { title: 'রেইট আস', icon: <StarIcon />, gradient: 'bg-red-gradient',handleClick:()=>router.push('/download-app') },
    { title: 'লগ আউট', icon: <LogOut />, gradient: 'bg-green-gradient',handleClick:clearSessionAndRedirect }
  ];

  const firstNine = menuItems.slice(0, 9);
  const remainder = menuItems.slice(9);

  return (
    <div>
      <TopSection editProfile={()=>{setProfileInfoModal(true)}} unSubscribeHandler={()=>{setShowConfirmationModal(true)}}/>
    <div className=" p-4">
      <div className="max-w-6xl mx-auto">
        {/* 3 columns x 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {firstNine.map((item, index) => (
            // <Link href={item.url??''} key={index} className=" flex-shrink-0">
            <MenuItem
              key={index}
              title={item.title}
              handleClick={item.handleClick??(()=>{})}
              icon={item.icon}
              gradient={item.gradient}
              hasNewBadge={item.hasNewBadge}
            />
            // </Link>
          ))}
        </div>

        {/* Remaining items in a single horizontal row */}
        {remainder.length > 0 && (
          <div className="mt-6">
            <div className="my grid gap-4">
              {remainder.map((item, idx) => (
                // <Link href={item.url??''} key={idx} className="w-full block my-3 flex-shrink-0">
                  <MenuItem
                    title={item.title}
                    icon={item.icon}
                    handleClick={item.handleClick}
                    gradient={item.gradient}
                    hasNewBadge={item.hasNewBadge}
                  />
                // </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <CommonModal
      isOpen={showRobiNumberModal}
      onClose={()=>setShowRobiNumberModal(false)}
    >
      <RobiNumberInput onSubmit={robiUnsubscribed}/>
    </CommonModal>
    <CommonModal
      isOpen={showConfirmationModal}
      onClose={()=>setShowConfirmationModal(false)}
    >
      <CancelSubscriptionModal onCancel={()=>setShowConfirmationModal(false)} onConfirm={unSubscribeHandler}/>
    </CommonModal>
    <CommonModal
      isOpen={showBookRequestModal}
      onClose={()=>{setShowBookRequestModal(false)}}
    >
      <BookInfoForm onclose={()=>{setShowBookRequestModal(false)}}/>
    </CommonModal>
    <CommonModal
      isOpen={showRedeemModal}
      onClose={()=>{setShowRedeemModal(false)}}
    >
      <ReedemCodeActivate onClose={()=>{setShowRedeemModal(false)}}/>
    </CommonModal>
    <CommonModal
      isOpen={profileInfoModal}
      onClose={()=>{setProfileInfoModal(false)}}
    >
      <ProfileInfoForm onclose={()=>{setProfileInfoModal(false)}}/>
    </CommonModal>
    <CommonModal
      isOpen={showContactModal}
      onClose={()=>{setShowContactModal(false)}}
    >
      <ContactUsModal/>
    </CommonModal>
     <CommonModal
      isOpen={sponsorShipModal}
      onClose={()=>{setSponsorShipModal(false)}}
    >
      <SponsorFormModal onClose={()=>{setSponsorShipModal(false)}}/>
    </CommonModal>
    </div>
  );
}
