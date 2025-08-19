'use client'
import BootomTraingle from '@/svgs/BootomTraingle'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CommonButton from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { siteConfig } from '@/config/config'
import style from './static/style.module.css'
import { TNavbar } from './static/navbar.types'
import useNavbar from './Navbar.presenter'
import AudioBookIcon from '@/svgs/AudioBooksIcon'
import MenuIcons from '@/svgs/MenuIcons'
import { CustomDrawer } from '../ui/drawer'
import MobileNavbar from './MobileNavbar.view'
import { paths } from '@/utils/Paths'


const Navbar = (props:TNavbar) => {
    const {showCategories,setShowCategories,user: profile,categories,setMobileMenu,mobileMenu} = useNavbar();

    return (
    <nav className='w-full bg-[#D9D9D91A] relative z-10'>
        <div className='max-w-[1440px]  flex justify-between items-center px-4 py-2 mx-auto'>
            <div className='flex items-center gap-4'>
                <Link href={'/'} >
                    <figure className='mr-3'>
                        <img className='max-w-[138px] max-h-[54px] max-sm:max-w-[100px] max-:max-h-[46px]' src={'/assets/logo.png'} alt="Logo" />
                    </figure>
                </Link>
                <ul className={'text-white flex '+ style.navbarList}>
                    <li>
                        <Link href={'/'}>হোম</Link>
                    </li>
                    <li 
                        onClick={()=>setShowCategories(!showCategories)}
                        className='relative'
                    >
                        <Link href={'/'} className='flex' onClick={()=>{setShowCategories(!showCategories)}}>
                            ক্যাটাগরি
                            <span className='w-2.5 h-2.5 mt-[5px] ml-1 inline-block'>
                                <BootomTraingle/>
                            </span>
                        </Link>
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
            <div className='flex items-center gap-4 max-sm:gap-2'>
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
                <span onClick={()=>setMobileMenu(!mobileMenu)} className={'w-11 h-7 inline-block '+style.menuIcon}>
                    <MenuIcons color='white'/>
                </span>
            </div>
        </div>
        <CustomDrawer open={mobileMenu} position='left' onClose={()=>{setMobileMenu(!mobileMenu)}}>
            <MobileNavbar categories={categories} setMobileMenu={setMobileMenu}/>
        </CustomDrawer>
    </nav>
  )
}

export default Navbar