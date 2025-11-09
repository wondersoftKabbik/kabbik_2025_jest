'use client'
import { useAppSelector } from '@/store/store'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { container } from '../ui/static/tailwind.classes'
import { paths } from '@/utils/Paths'
import { useRouter } from 'next/navigation'

const CategoriesList = () => {
        const categories=useAppSelector((store)=>store?.categories?.CategoriesData)
        const router=useRouter();
  return (
    <div className={`${container('700px')}`}>
        <div className="">
      <div className='max-w-[450px] cursor-pointer mx-auto my-8'>
        {/* Main content grid */}
        {new Array(Math.ceil((categories?.length??0)/11)).fill(1).map((item,index)=>(
            <div className="flex flex-col gap-3 ">
          {/* First section */}
          <div className="flex flex-col gap-2 ">
            {/* Top row - large left image and two smaller right images */}
            <div className="grid grid-cols-2 gap-2">
              {/* Large image - কাব্যিক বিকেলবেডা */}
              <div className="relative group overflow-hidden rounded-[6px] border border-[#A7A4A4]">
                <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+0]?.name??''))} 
                  src={categories?.[index*11+0]?.thumb_path}
                  alt="কাব্যিক বিকেলবেডা"
                  className="w-full h-full aspect-square object-cover object-left-bottom"
                />
              </div>

              {/* Right column - two stacked images */}
              <div className="flex flex-col gap-1.5">
                {/* ব্রেইন কুইজশো */}
                <div className="relative group overflow-hidden rounded-[6px] border border-[#A8A8A8]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+1]?.name??''))} 
                    src={categories?.[index*11+1]?.thumb_path}
                    alt="ব্রেইন কুইজশো"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>

                {/* হুমায়ূন আহমেদ স্পেশাল */}
                <div className="relative group overflow-hidden rounded-[6px] border border-[#B2B2B2]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+2]?.name??''))} 
                    src={categories?.[index*11+2]?.thumb_path}
                    alt="হুমায়ূন আহমেদ স্পেশাল"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>
              </div>
            </div>

            {/* Wide image - ক্লাসিক */}
            <div className="relative group overflow-hidden rounded-[6px] border border-[#A7A4A4]">
              <img
                onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+3]?.name??''))} 
                src={categories?.[index*11+3]?.thumb_path} 
                alt="ক্লাসিক"
                className="w-full aspect-[2.56/1] object-cover object-left-bottom"
              />
            </div>
          </div>

          {/* Second section - similar layout */}
          <div className="flex flex-col gap-6 ">
            {/* Top row - large left image and two smaller right images */}
            <div className="grid grid-cols-2 gap-2 ">
              {/* Large image - ভৌতিক */}
              <div className="relative group overflow-hidden rounded-[6px] border border-[#A7A4A4]">
                <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+4]?.name??''))} 
                  src={categories?.[index*11+4]?.thumb_path}
                  alt="ভৌ���িক"
                  className="w-full h-full aspect-square object-cover object-left-bottom"
                />
              </div>

              {/* Right column - two stacked images */}
              <div className="flex flex-col gap-1.5">
                {/* ব্রেইন কুইজশো */}
                <div className="relative group overflow-hidden rounded-[6px] border border-[#A8A8A8]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+5]?.name??''))} 
                    src={categories?.[index*11+5]?.thumb_path} 
                    alt="ব্রেইন কুইজশো"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>

                {/* হুমায়ূন আহমেদ স্পেশাল */}
                <div className="relative group overflow-hidden rounded-[6px] border border-[#B2B2B2]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+6]?.name??''))} 
                    src={categories?.[index*11+6]?.thumb_path} 
                    alt="হুমায়ূন আহমেদ স্পেশাল"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Third section */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              {/* Wide image - দেশাত্মবোধক */}
              <div className="relative group overflow-hidden rounded-[6px] border border-[#A7A4A4]">
                <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+7]?.name??''))} 
                  src={categories?.[index*11+7]?.thumb_path}
                  alt="দেশাত্মবোধক"
                  className="w-full aspect-[2.56/1] object-cover object-left-bottom"
                />
              </div>

              {/* Two side-by-side images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {/* ভৌতিক */}
                <div className="relative group overflow-hidden rounded-[6px] border border-[#B2B2B2]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+8]?.name??''))} 
                    src={categories?.[index*11+8]?.thumb_path} 
                    alt="ভৌতিক"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>

                {/* RJ NIROB স্পেশাল */}
                {categories?.[index*11+9]?.thumb_path && <div className="relative group overflow-hidden rounded-[6px] border border-[#A8A8A8]">
                  <img
                    onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+9]?.name??''))} 
                    src={categories?.[index*11+9]?.thumb_path} 
                    alt="RJ NIROB স্পেশাল"
                    className="w-full aspect-[2/1] object-cover object-left-bottom"
                  />
                </div>}
              </div>
            </div>

            {/* Final wide image - দেশাত্মবোধক */}
            {categories?.[index*11+10]?.thumb_path && <div className="relative group overflow-hidden rounded-[6px] border border-[#A7A4A4] mb-2.5">
              <img
                onClick={()=>router.push(paths?.categoryWiseBooks(categories?.[index*11+10]?.name??''))} 
                src={categories?.[index*11+10]?.thumb_path}
                alt="দেশাত্মবোধক"
                className="w-full aspect-[2.56/1] object-cover object-left-bottom"
              />
            </div>}
          </div>
        </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CategoriesList