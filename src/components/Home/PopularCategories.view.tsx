import { useAppSelector } from '@/store/store'
import React from 'react'
import common_cat_styles from "./static/category.module.css";
import RightArrowIcon from '@/svgs/RightArrowIcon';
import Link from 'next/link';
import { paths } from '@/utils/Paths';

const PopularCategories = () => {
    const PopularCategories=useAppSelector(store=>store.staticTexts.data?.popular_categories) ?? [];

    
  return (
    <div className='mt-12 z-20 text-white max-w-[1206px] mx-auto cursor-pointer w-[90%]'>
        <div className={common_cat_styles.heading_container}>
            <h3 className={common_cat_styles.heading}>মোস্ট পপুলার ক্যাটেগরিজ</h3>
            <Link href={'/categories'} className={common_cat_styles.see_all}>
                সব দেখুন
                <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
            </Link>
        </div>
        <div className='flex gap-6 mt-3'>
            <div className='w-[48.5%]'>
                <figure className='mb-6'>
                    <img loading="lazy" className='h-[40vh] w-full rounded-[8px] object-cover object-bottom' src={PopularCategories[0]?.img}/>
                </figure>
                <div className="  h-[18vh] mb-6 rounded-[4px] overflow-hidden border border-gray-300">
                    <Link href={paths.categoryWiseBooks(PopularCategories[6]?.path)}>
                        <img loading="lazy" src={PopularCategories[6]?.img} className=" h-[24.5vh] w-full object-cover object-bottom" />
                    </Link>
                    
                </div>
            </div>
            <div className='w-[48.5%]'>
                {PopularCategories.slice(2,5).map((item,index:number)=>(
                    <div key={index} className="  h-[18vh] mb-6 rounded-[4px] overflow-hidden border border-gray-300">
                            <Link href={paths.categoryWiseBooks(item.path)}>
                                <img loading="lazy" src={item.img} className=" h-[18vh] w-full object-cover object-bottom" />
                            </Link>
                        
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PopularCategories