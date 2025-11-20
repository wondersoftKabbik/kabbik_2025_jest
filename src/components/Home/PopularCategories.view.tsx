'use cleint'
import { useAppSelector } from '@/store/store'
import React, { useEffect, useState } from 'react'
import common_cat_styles from "./static/category.module.css";
import RightArrowIcon from '@/svgs/RightArrowIcon';
import Link from 'next/link';
import { paths } from '@/utils/Paths';
import { HomeInfo, TBooks } from '@/pageTypes/home.types';
import { TCategoryItem } from '../ui/static/types';

const PopularCategories = ({data}:{data:[{ name: string; data: TBooks[]; }]}) => {
    const popularCategories=useAppSelector(store=>store.staticTexts.data?.popular_categories) ?? [];
    const categories=useAppSelector((store)=>store?.categories?.CategoriesData)
    const [top12Cat,setTop12Cat]=useState<TCategoryItem[] | null>(null);


    const getTop12Cat=async()=>{
      let topCats:TCategoryItem[]=[];
        data?.forEach(async(item,i)=>{
            
            if(i>2 && i<16){
                if(item?.name!=='ফ্রি'){
                    let selected= categories?.find((cat)=>{
                        if(cat.name===item?.name){
                            return true;
                        }
                    })
                    if(selected){
                      topCats.push(selected)
                    }
                }
            }
        })
        setTop12Cat(topCats)
    }

    useEffect(()=>{
        if(!categories){
            return;
        }
        getTop12Cat()
        // console.log(topCats,"topCats")
    },[popularCategories])

    
  return (
    <div className='mt-12 z-[3] relative text-white max-w-[1300px] mx-auto cursor-pointer w-[97%] md:w-[90%]'>
        <div className={common_cat_styles.heading_container}>
            <h3 className={common_cat_styles.heading}>মোস্ট পপুলার ক্যাটেগরিজ</h3>
            <Link href={'/categories'} className={common_cat_styles.see_all}>
                সব দেখুন
                <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
            </Link>
        </div>
        <div className="grid mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap:0 sm:gap-2.5 md:gap-4">
          {top12Cat?.map((category, index) => (
            <div
              key={index}
              style={{background:category?.color}}
              className={` rounded-2xl p-1 sm:p-2 relative overflow-hidden  flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-2xl`}
            >
              {/* Category Name */}
              {/* <h3 className="text-white font-bold text-lg sm:text-xl z-10 relative drop-shadow-lg leading-tight">
                {category.name}
              </h3> */}

              

              {/* Book Image - positioned at bottom right with tilt */}
              <div className=" transform  z-0">
                <Link
                    href={paths?.categoryWiseBooks(category?.name)}
                >
                  <img
                    src={category.thumb_path}
                    alt={category.name}
                    className="w-full h-full aspect-[2/1] object-left-bottom  object-cover rounded-lg shadow-2xl border-2 border-white/30"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PopularCategories