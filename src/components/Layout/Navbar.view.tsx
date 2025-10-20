'use client'
import BootomTraingle from '@/svgs/BootomTraingle'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CommonButton from '../ui/button'
import { SearchIcon } from 'lucide-react'
import style from './static/style.module.css'
import { TNavbar } from './static/navbar.types'
import useNavbar from './Navbar.presenter'
import AudioBookIcon from '@/svgs/AudioBooksIcon'
import MenuIcons from '@/svgs/MenuIcons'
import { CustomDrawer } from '../ui/drawer'
// import MobileNavbar from './MobileNavbar.view'
import { paths } from '@/utils/Paths'
import CommonModal from '../ui/CommonModal/CommonModal.view'
// import LoginModal from '../Login/LoginModal'
// import OTPVerification from '../Login/OtpComponent'
// import { PasswordCreationForm } from '../Login/PasswordCreationForm.view'
// import ShobderaJibonta from '../Login/ShobderaJibonta'
// import { PasswordLoginForm } from '../Login/PasswordLogin'
// import PasswordChangePhoneModal from '../Login/PassWordChangePhoneModal'
import Bell from '@/svgs/Bell.svg'
import Trophy from '@/svgs/Trophy.svg'
import { siteConfig } from '@/config/config'
// import  from ''
import dynamic from 'next/dynamic'
import Spinner from '../ui/Spinner.view'
// import  from 
// import OTPVerification from '../Login/OtpComponent'


const OTPVerification = dynamic(
        () => import(/* webpackChunkName: "OTPVerification" */'../Login/OtpComponent'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const LoginModal = dynamic(
        () => import(/* webpackChunkName: "LoginModal" */'../Login/LoginModal'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

// const CommonModal = dynamic(
//         () => import(/* webpackChunkName: "CommonModal" */'../ui/CommonModal/CommonModal.view'
//     ), {
//   ssr: false, // optional: disable server-side rendering
//   loading: () => <p></p>, // optional fallback
// });

const MobileNavbar = dynamic(
        () => import(/* webpackChunkName: "MobileNavbar" */'./MobileNavbar.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const PasswordCreationForm = dynamic(
  () => import("../Login/PasswordCreationForm.view").then((mod) => mod.PasswordCreationForm),
  {
    ssr: false, // disable SSR if needed
    loading: () => <Spinner/>, // optional fallback
  }
);

const PasswordLoginForm = dynamic(
  () => import("../Login/PasswordLogin").then((mod) => mod.PasswordLoginForm),
  {
    ssr: false, // disable SSR if needed
    loading: () => <Spinner/>, // optional fallback
  }
);

const AuthorModal = dynamic(() => import('../Preferences/AuthorModal'), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const CategoryPreferencesModal = dynamic(
        () => import(/* webpackChunkName: "category-preferences-modal" */'../Preferences/CategoryPreferencesModal'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const PasswordChangePhoneModal = dynamic(
        () => import(/* webpackChunkName: "PasswordChangePhoneModal" */'../Login/PassWordChangePhoneModal'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const ShobderaJibonta = dynamic(
        () => import(/* webpackChunkName: "ShobderaJibonta" */'../Login/ShobderaJibonta'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const Navbar = (props:TNavbar) => {
    const {showCategories,boxRef, setShowCategories, user: profile, categories, setMobileMenu, mobileMenu, showLoginModal, showOTPModal, showPasswordModal, showLoginPasswordModal, handleLoginClick, handleloginSubmit, handleVerifyOtp, closeLoginClick, closePasswordClick, closeOTPClick, handleSubmit, closeLoginPasswordClick,  handleShowPasswordModal, handlePhoneOfChangePassword, showPhoneOfChangePass, closeShowPhoneOfChangePass, handleClickForgetPassword, showPreferenceCatModal, showPreferenceAuthorModal,closePreferenceCatModal,closePreferenceAuthorModal,showPrepAuthorModal} = useNavbar();

    return (
    <nav className='w-full bg-[#D9D9D91A] relative z-[11]'>
        <div className='max-w-[1440px]  flex justify-between items-center px-4 py-2 mx-auto'>
            <div className='flex items-center gap-4'>
                <Link href={'/'} >
                    <figure className='mr-3'>
                        <img loading="lazy" className='max-w-[138px] max-h-[54px] max-sm:max-w-[100px] max-:max-h-[46px]' src={'/assets/logo.png'} alt="Logo" />
                    </figure>
                </Link>
                <ul  className={' text-white flex '+ style.navbarList}>
                    <li>
                        <Link href={'/'}>হোম</Link>
                    </li>
                    <li 
                        onClick={()=>setShowCategories(!showCategories)}
                        className='relative cursor-pointer'
                        ref={boxRef}
                    >
                        {/* <Link href={'/'} className='flex' onClick={()=>{setShowCategories(!showCategories)}}> */}
                            ক্যাটাগরি
                            <span className='w-2.5 h-2.5 mt-[5px] ml-1 inline-block'>
                                <BootomTraingle/>
                            </span>
                        {/* </Link> */}
                        {showCategories && <ul className={style.subCategories}>
                            { categories?.map((name: any, index: any) => (
                                <li key={name?.name} className="w-100">
                                    <Link
                                    // className="d-block"
                                        href={`/${name?.name}`}
                                    >
                                    <div className=" w-100">
                                        <span className='w-7 h-7 inline-block mr-2'>
                                            <AudioBookIcon/>
                                        </span>
                                        {name.name}
                                    </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>}
                    </li>
                    <li>
                        <Link href={paths.upcoming}>আপকামিং</Link>
                    </li>
                    <li>
                        <Link href={'/'}>রেফার এন্ড  আর্ন</Link>
                    </li>
                    <li>
                        <Link href={'/পডকাস্ট'}>পডকাস্ট</Link>
                    </li>
                    {/* <li>
                        <Link href={'/'}>মোর</Link>
                    </li> */}
                    <li>
                        <CommonButton
                            isLoading={false}
                            disabled={false}
                        >
                            স্টোর
                        </CommonButton>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-4 max-sm:gap-2'>
                <Link href={'/'} className='flex items-center gap-2'>
                    <span className='w-5 h-5 text-white inline-block'>
                        <SearchIcon/>
                    </span>
                </Link>
                {(!profile?.is_subscribed && profile?.id && profile?.id!==2820) ?<CommonButton
                    isLoading={false}
                    // handleClick={handleLoginClick}
                    disabled={false}
                >
                    <Link href={'/subscribe'}>সাবস্ক্রাইব</Link>
                </CommonButton>:''}
                {profile?.id && profile?.id!==2820?
                    <span className='cursor-pointer flex items-center gap-3'>
                        <Link href={paths.notification} className='w-5 h-5 inline-block cursor-pointer'>
                            <Bell/>
                        </Link>
                        <Link href={paths.profile} className='w-5 h-5 inline-block cursor-pointer'>
                            <Trophy/>
                        </Link>
                        {profile?.is_subscribed?'':<figure>
                            <Link href={paths.profile}>
                                <img loading="lazy" className='max-w-8 rounded-[50%] max-h-8' src={profile?.image_url ?? siteConfig.defaultProfilePic}/>
                            </Link>
                        </figure>}
                        {profile?.is_subscribed?<figure>
                            <Link href={paths.profile}>
                                <img loading="lazy" className='max-w-11 max-h-11 rounded-[50%] mt-[-14px]' src={profile?.image_url ?? siteConfig.defaultPremiumPic}/>
                            </Link>
                        </figure>:''}
                    </span>
                :<CommonButton
                    isLoading={false}
                    handleClick={handleLoginClick}
                    disabled={false}
                >
                    লগ ইন
                </CommonButton>}
                
                <span onClick={()=>setMobileMenu(!mobileMenu)} className={'w-11 h-7 inline-block '+style.menuIcon}>
                    <MenuIcons color='white'/>
                </span>
            </div>
        </div>
        <CustomDrawer open={mobileMenu} position='left' onClose={()=>{setMobileMenu(!mobileMenu)}}>
            <MobileNavbar categories={categories} setMobileMenu={setMobileMenu}/>
        </CustomDrawer>
        <CommonModal
            isOpen={showLoginModal}
            onClose={closeLoginClick}
        >
            <div className='bg-[#050F1E] p-4 px-8 relative  rounded-[8px] overflow-y-auto overflow-hidden'>
                <div className="circular_gradient2 right-[-80%] z-10   top-[-90%] w-[30vw] h-[30vw] absolute rounded-[50%] "></div>
                <ShobderaJibonta/>
                {showLoginModal?<LoginModal  handleSubmit={handleSubmit}/>:''}
            </div>
        </CommonModal>
        <CommonModal
            isOpen={showOTPModal}
            onClose={closeOTPClick}
        >
            <div className='bg-[#050F1E] p-4 px-8 rounded-[8px] overflow-y-auto '>
                <ShobderaJibonta/>
                {showOTPModal?<OTPVerification handleShowPasswordModal={handleShowPasswordModal} closeModal={closeOTPClick}/>:''}
            </div>
        </CommonModal>
        <CommonModal
            isOpen={showPasswordModal}
            // onClose={closePasswordClick}
            onClose={()=>{}}
        >
            <div className='bg-[#050F1E] p-4 px-8 rounded-[8px] overflow-y-auto '>
                <ShobderaJibonta/>
                 {showPasswordModal?<PasswordCreationForm  closeModal={closePasswordClick} />:''}
            </div>
        </CommonModal>
        <CommonModal
            isOpen={showLoginPasswordModal}
            onClose={closeLoginPasswordClick}
        >
            <div className='bg-[#050F1E] p-4 px-8 rounded-[8px] overflow-y-auto '>
                <ShobderaJibonta/>
                 {showLoginPasswordModal?<PasswordLoginForm handleClickForgetPassword={handleClickForgetPassword} closeModal={closeLoginPasswordClick}/>:''}
            </div>
        </CommonModal>
        <CommonModal
            isOpen={showPhoneOfChangePass}
            onClose={closeShowPhoneOfChangePass}
        >
            <div className='bg-[#050F1E] p-4 px-8 rounded-[8px] overflow-y-auto '>
                <ShobderaJibonta/>
                 {showPhoneOfChangePass?
                    <PasswordChangePhoneModal 
                        handleSubmit={handlePhoneOfChangePassword} 
                        closeShowPhoneOfChangePass={closeShowPhoneOfChangePass}
                    />:''}
            </div>
        </CommonModal>
        <CommonModal
            isOpen={showPreferenceCatModal}
            onClose={closePreferenceCatModal}
        >
            <div className='relative'>
                <img loading="lazy" className='absolute' src='/assets/gradientBG.png'/>
                {/* <div className='circular_gradient2 right-[-80%] z-40   top-[-90%] w-[30vw] h-[30vw] absolute rounded-[50%] '></div>  */}
                <img loading="lazy" className='absolute' src='/assets/wave.png'/>
                <div className='bg-[#050F1E] p-4 px-4 rounded-[8px] overflow-y-auto '>
                    <CategoryPreferencesModal closeModal={showPrepAuthorModal}/>
                </div>
            </div>
            
        </CommonModal>
        <CommonModal
            isOpen={showPreferenceAuthorModal}
            onClose={closePreferenceAuthorModal}
        >
            <div className='relative'>
                <img loading="lazy" className='absolute' src='/assets/gradientBG.png'/>
                {/* <div className='circular_gradient2 right-[-80%] z-40   top-[-90%] w-[30vw] h-[30vw] absolute rounded-[50%] '></div>  */}
                <img loading="lazy" className='absolute' src='/assets/wave.png'/>
                <div className='bg-[#050F1E] p-4 px-4 rounded-[8px] overflow-y-auto '>
                    <AuthorModal closeModal={closePreferenceAuthorModal}/>
                </div>
            </div>
            
        </CommonModal>
    </nav>
  )
}

export default Navbar