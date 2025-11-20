'use client'
import React, { useCallback, useEffect, useState } from 'react';
import BookIcon from '@/svgs/bookIcon';
import LoveIcon from '@/svgs/LoveIcon';
import { Delete, Edit, GraduationCap, HandshakeIcon, InfoIcon, LogOut, PersonStandingIcon, StarIcon } from 'lucide-react';
import PlayIcon from '@/svgs/PlayIcon.svg';
import UserIcon from '@/svgs/UserIcon';
import TakaIcon from '@/svgs/TakaIcon.svg';
import DownloadIconWithBg from '@/svgs/DownloadIconWithBg';
import MyPlayList from '@/svgs/MyPlayList.svg';
import { cn } from '@/lib/utils';
import { clearSessionAndRedirect } from '@/helpers/commonFunction';
import { paths } from '@/utils/Paths';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { UserProfileInfo } from '../audiobook/static/audiobook.type';
import { UserSummaryInfo } from './static/profile.type';
import { bkashUnSubscribeUserApi, gpUnsubscribeApi, postBookRequest, redeemCodePostApi, robiUnSubscribeUserApi, updateProfile, userProfile, userSummary } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import TopSection from './TopSection.view';
import { MenuItem } from './MenuItem.view';
import CommonModal from '../ui/CommonModal/CommonModal.view';
import RobiNumberInput from './RobiNumberModal.view';
import CancelSubscriptionModal from './TakingConfirmation.view';
import BookInfoForm from './BookRequestModal.view';
import ReedemCodeActivate from './ReedemCode.view';
import ProfileInfoForm from './UpdateProfile.view';
import ContactUsModal from './ContactUsModal.view';
import SponsorFormModal from './SponsorShipModal.view';
import SocialMediaSection from './SocialMediaSection.view';
import { Clock, BookOpen, CreditCard, Gift, Users, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { container } from '../ui/static/tailwind.classes';
import { useAppSelector } from '@/store/store';
import { siteConfig } from '@/config/config';
import { useRouter } from 'next/navigation';
import Trophy from '@/svgs/Trophy.svg';
import GoldPosition from '@/svgs/GoldPosition.svg';

export default function ProfileDashboard(profileData: any) {
    const router=useRouter();
    const user=useAppSelector((store)=>store?.user?.userData);
    const [isLogin, setIsLogin]: any = useState();
//   const user=useAppSelector((store)=>store.user.userData);
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
     const menuItems = [
    // Row 1
    { title: 'রিডিম কোড', color:'#A731EF', icon: <LoveIcon />, gradient: 'bg-red-gradient',handleClick:()=>{setShowRedeemModal(true)} },
    { title: 'রেফার অ্যান্ড আর্ন',color:'#FF7E17', icon: <TakaIcon />, gradient: 'bg-orange-gradient',hasNewBadge:true,handleClick:()=>router.push(paths.refer_earn) },
    { title: 'রিওয়ার্ড পয়েন্ট',color:'#FF7E17', icon: <Trophy />, gradient: 'bg-red-gradient',handleClick:()=>{router.push(paths.reward_point)},hasNewBadge: true },
    {title: 'লিডারবোর্ড',color:'#00B4E5', icon: <GoldPosition />, gradient: 'bg-red-gradient',handleClick:()=>{router.push(paths.leaderboard)},hasNewBadge: true },
    { title: 'আমার প্লে-লিস্ট',color:'#A731EF', icon: <MyPlayList />, gradient: 'bg-teal-gradient',hasNewBadge: true ,handleClick:()=>router.push(paths.myPlayList) },
    { title: 'পছন্দের তালিকা',color:'#00BDD5', icon: <PlayIcon />, gradient: 'bg-green-gradient' , handleClick:()=>{router.push(paths.favorites)} },
    { title: 'বইয়ের অনুরোধ',color:'#52C9FB', icon: <BookIcon color="white" />, gradient: 'bg-blue-gradient', handleClick:()=>{setShowBookRequestModal(true)} },

    // Row 2
    { title: 'রেন্ট বুক',color:'#E12D90', icon: <UserIcon />, gradient: 'bg-purple-gradient', handleClick:()=>{router.push(paths.my_rents)} },
    { title: 'আমার কোর্স',color:'#00D97D', icon: <GraduationCap />, gradient: 'bg-green-gradient',handleClick:()=>{router.push(paths.my_courses)} },

    // Row 3
    // { title: 'ডাউনলোড', icon: <DownloadIconWithBg />, gradient: 'bg-red-gradient' },
    { title: 'স্পনসরশিপ',color:'#FFBA00', icon: <HandshakeIcon />, gradient: 'bg-yellow-gradient', handleClick:()=>setSponsorShipModal(true) },
    { title: 'অ্যাকাউন্ট ডিঅ্যাকটিভেট',color:'#00BDD5', icon: <Delete />, gradient: 'bg-purple-gradient',handleClick:clearSessionAndRedirect },

    // Remaining items (to be shown in a single horizontal row)
    { title: 'অ্যাবাউট আস',color:'#FD4A30', icon: <InfoIcon />, gradient: 'bg-blue-gradient' ,handleClick:()=>router.push('/about')},
    { title: 'কন্ট্যাক্ট আস',color:'#00C29E', icon: <PersonStandingIcon />, gradient: 'bg-purple-gradient',handleClick:()=>{setShowContactModal(true)} },
    { title: 'রেইট আস',color:'#BB0F59', icon: <StarIcon />, gradient: 'bg-red-gradient',handleClick:()=>router.push('/download-app') },
    { title: 'লগ আউট',color:'#E12D90', icon: <LogOut />, gradient: 'bg-green-gradient',handleClick:clearSessionAndRedirect }
  ];

  const firstNine = menuItems.slice(0, 9);
  const remainder = menuItems.slice(9);
  return (
    <div className={`${container('1300px')} text-white`}>
      {/* Header */}
      <div className="flex justify-between items-center pt-4 md:pt-6 pb-1">
        <div className="flex-1"></div>
        <h1 className="text-xl md:text-2xl font-semibold">Profile</h1>
        <div className="flex-1 flex justify-end">
          <button onClick={()=>setProfileInfoModal(true)} className="p-2 hover:bg-white/10 rounded-lg transition">
            <Edit className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 md:px-4 pb-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4 md:mb-7">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-1 mb-2">
            <img
              src={user?.is_subscribed?siteConfig?.defaultPremiumPic:siteConfig.defaultProfilePic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-1">{user?.full_name}</h2>
          <p className="text-gray-400 text-sm">{user?.user_name}</p>
        </div>

        {/* Stats Cards - Mobile: 2 cols, Desktop: 3 cols in one line */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2.5 md:gap-4 mb-6">
          {/* Total Reading Time */}
          <div className="bg-gradient-to-br from-cyan-900/50 to-cyan-950/50 border border-cyan-700/50  rounded-[8px] md:rounded-2xl  p-1 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 md:p-2.5 bg-cyan-500/20 rounded-lg">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-cyan-400 text-cxs md:text-sm font-medium">Total Reading Time</p>
                <p className="text-gray-400 text-[10px] md:text-xs">2 Years</p>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
              248 <span className="text-cyan-400 text-base md:text-xl lg:text-2xl font-normal">hours</span>
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-400" />
              <span>~41 hours/month average</span>
            </p>
          </div>

          {/* Book Completed */}
          <div className="bg-gradient-to-br from-orange-900/50 to-orange-950/50 border border-orange-700/50  rounded-[8px] md:rounded-2xl  p-1 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 md:p-2.5 bg-orange-500/20 rounded-lg">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-orange-400 text-cxs md:text-sm font-medium">Book Completed</p>
                <p className="text-gray-400 text-[10px] md:text-xs">2 Years</p>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
              34 <span className="text-orange-400 text-base md:text-xl lg:text-2xl font-normal">books</span>
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-400" />
              <span>~3.6 books/month average</span>
            </p>
          </div>

          {/* Billing Cycle Card - Now part of the grid */}
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-700/50  rounded-[8px] md:rounded-2xl p-1.5 md:p-5 lg:p-6">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-2.5 bg-purple-500/20 rounded-lg">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-purple-400 text-xs md:text-sm font-medium">Billing Cycle</p>
                  <p className="text-gray-400 text-[10px] md:text-xs">Next Billing:</p>
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-gray-300">10 December 2025</p>
            </div>

            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                <p className="text-xs md:text-sm text-gray-300">Current Plan</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] md:text-xs text-gray-400 ml-5 md:ml-6">6 Month Subscription</p>
                <span className="text-[10px] md:text-xs bg-green-500/20 text-green-400 px-2 py-0.5 md:py-1 rounded">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition">
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-0.5">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Upgrade Plan</span>
                </div>
                <div className="text-[10px] md:text-xs opacity-80">Get more features and benefits</div>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition">
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-0.5">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Cancel Plan</span>
                </div>
                <div className="text-[10px] md:text-xs opacity-80">End your subscription</div>
              </button>
            </div>

            <p className="text-[10px] md:text-xs text-gray-400 flex items-start gap-1.5 md:gap-2">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>Your subscription will auto-renew on December 10,2025</span>
            </p>
          </div>
        </div>

        {/* Starred Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 px-1">Starred</h3>
          <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {firstNine.map((item)=>(
                <button key={item?.title} onClick={item?.handleClick} className={` w-full profile_btn_gradient2  rounded-[8px] md:rounded-[8px]  p-2 flex items-center gap-4 transition group`}>
                    <div style={{background:item?.color}} className={`bg-[${item?.color}] p-3 b w-10 h-10 rounded-xl`}>
                        {/* <Gift className="w-5 h-5 md:w-6 md:h-6" /> */}
                        <span className='w-5 h-5 inline-block' >{item?.icon}</span>
                    </div>
                    <span className="text-base md:text-lg font-medium">{item?.title}</span>
                </button>
            ))}
          </div>
        </div>

         <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 px-1">Action</h3>
          <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {remainder.map((item)=>(
                <button key={item?.title} onClick={item?.handleClick} className={` w-full profile_btn_gradient2  rounded-[8px] md:rounded-[8px]  p-2 flex items-center gap-4 transition group  `}>
                    <div style={{background:item?.color}} className={`bg-[${item?.color}] p-3 b w-10 h-10 rounded-xl flex items-center justify-center`}>
                        {/* <Gift className="w-5 h-5 md:w-6 md:h-6" /> */}
                        <span className='w-6 h-6 inline-block' >{item?.icon}</span>
                    </div>
                    <span className="text-base md:text-lg font-medium">{item?.title}</span>
                </button>
            ))}

            
          </div>
        </div>
      </div>
      <div>
        <SocialMediaSection/>

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