'use client'
import BootomTraingle from '@/svgs/BootomTraingle'
import Link from 'next/link'
import React from 'react'
import CommonButton from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { siteConfig } from '@/config/config'
import style from './static/style.module.css'
import { TNavbar } from './static/navbar.types'
import useNavbar from './Navbar.presenter'


const Navbar = (props:TNavbar) => {
    // const { t } = useTranslation('common');
    const {categories}=props;
    const {showCategories,setShowCategories,categoriesData,userData,isSubscribed} = useNavbar();

  return (
    <nav className='w-full'>
        <div className='max-w-[1440px] bg-[#5f5f5f] flex justify-between items-center px-4 py-2 mx-auto'>
            <div className='flex items-center gap-4'>
                <Link href={'/'} >
                    <figure className='mr-3'>
                        <img className='max-w-[138px] max-h-[54px]' src={'/assets/logo.png'} alt="Logo" />
                    </figure>
                </Link>
                <ul className={'text-white flex '+ style.navbarList}>
                    <li>
                        <Link href={'/'}>হোম</Link>
                    </li>
                    <li className='relative'>
                        <Link href={'/'} className='flex' onClick={()=>{setShowCategories(!showCategories)}}>
                            ক্যাটাগরি
                            <span className='w-2.5 h-2.5 mt-[5px] ml-1 inline-block'>
                                <BootomTraingle/>
                            </span>
                        </Link>
                        {/* <ul>
                            {categories?.data?(
                                categories?.
                            ):''}
                        </ul> */}
                    </li>
                    <li>
                        <Link href={'/'}>আপকামিং</Link>
                    </li>
                    <li>
                        <Link href={'/'}>রেফার এন্ড  আর্ন</Link>
                    </li>
                    <li>
                        <Link href={'/'}>পডকাস্ট</Link>
                    </li>
                    <li>
                        <Link href={'/'}>মোর</Link>
                    </li>
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
            <div className='flex items-center gap-4'>
                <Link href={'/'} className='flex items-center gap-2'>
                    <span className='w-5 h-5 text-white inline-block'>
                        <SearchIcon/>
                    </span>
                </Link>
                <CommonButton
                    isLoading={false}
                    disabled={false}
                >
                    লগ ইন
                </CommonButton>
            </div>
        </div>
    </nav>
  )
}

export default Navbar