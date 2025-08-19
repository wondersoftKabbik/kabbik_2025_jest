import { useAppSelector } from '@/store/store'
import React from 'react'
import common_cat_styles from "./static/category.module.css";
import RightArrowIcon from '@/svgs/RightArrowIcon';

const PopularCategories = () => {
    const PopularCategories=useAppSelector(store=>store.staticTexts.data?.popular_categories) ?? [];

    
  return (
    <div className='mt-32 text-white max-w-[1206px] mx-auto cursor-pointer w-[95%]'>
        <div className={common_cat_styles.heading_container}>
            <h3 className={common_cat_styles.heading}>মোস্ট পপুলার ক্যাটেগরিজ</h3>
            <div className={common_cat_styles.see_all}>
                সব দেখুন
                <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
            </div>
        </div>
        <div className='flex gap-6 '>
            <div className=''>
                <figure className='mb-6'>
                    <img className='h-[53.5vh]' src={PopularCategories[0]?.img}/>
                </figure>
                <figure className='h-[25vh] overflow-hidden '>
                    <img className='w-[100%] rounded-[5px] h-[100%]' src={PopularCategories[6]?.img}/>
                </figure>
            </div>
            <div className='w-[48%]'>
                {PopularCategories.slice(2,5).map((item,index:number)=>(
                    <figure className='mb-6 h-[25vh] w-full overflow-hidden'>
                        <img className='rounded-[5px] w-[100%] h-[100%]' src={item?.img}/>
                    </figure>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PopularCategories