import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';
import {  fetchDataFromJson, upcomingList } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import { UpComingInfo } from '@/utils/types';
import { staticTextSlice } from '@/components/ui/static/types';
import Link from 'next/link';
import { paths } from '@/utils/Paths';

const CategoryPage = async({ params }: { params: { category: string,lang:'en'|'bl' } }) => {
  const { lang } = await params
    const dict = await getDictionary(lang) // en
    const staticTexts:staticTextSlice['data']=await fetchDataFromJson();
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         <div>
           <div>
               <CategorySelector/>
           </div>
            <div className="min-h-screen  p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Content Grid */}
            {staticTexts?new Array(Math.ceil(staticTexts.popular_categories.length/4),0).map((Item:any,index:number)=>(
                <div className="flex flex-col gap-8 my-8">
            
            {/* First Row - Creative Recommended + Right Column */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Large Creative Recommended Card */}
                    <div className="lg:w-1/2">
                    <div className="  h-[70vh] rounded-[4px] overflow-hidden border border-gray-300">
                        {staticTexts?.popular_categories?.[index*4+0]?.img?(
                            <Link href={paths.categoryWiseBooks(staticTexts?.popular_categories?.[index*4+0]?.path)}>
                                <img src={staticTexts?.popular_categories?.[index*4+0]?.img} className=" h-[70vh] object-cover object-left-bottom" />
                            </Link>
                        ):''}
                    </div>
                    </div>

                    {/* Right Column - Two smaller cards */}
                    <div className="lg:w-1/2 flex flex-col gap-5">
                    {/* Top right card */}
                    <div className="  h-[33vh] rounded-[4px] overflow-hidden border border-gray-300">
                        {staticTexts?.popular_categories?.[index*4+1]?.img?(
                            <Link href={paths.categoryWiseBooks(staticTexts?.popular_categories?.[index*4+1]?.path)}>
                                <img src={staticTexts?.popular_categories?.[index*4+1]?.img} className=" h-[33vh] w-full object-cover object-bottom" />
                            </Link>
                        ):''
                        }
                    </div>

                    {/* Bottom right card */}
                    <div className="  h-[33vh] rounded-[4px] overflow-hidden border border-gray-300">
                        {staticTexts?.popular_categories?.[index*4+2]?.img?(
                         <Link href={paths.categoryWiseBooks(staticTexts?.popular_categories?.[index*4+2]?.path)}>
                            <img src={staticTexts?.popular_categories?.[index*4+2]?.img} className=" h-[33vh] w-full object-cover object-bottom" />
                        </Link>
                        ):''}
                    </div>
                    </div>
                </div>

                {/* Full Width Classic Section */}
                <div className="  h-[55vh] rounded-[4px] overflow-hidden border border-gray-300">
                    {staticTexts?.popular_categories?.[index*4+3]?.img?(
                        <Link href={paths.categoryWiseBooks(staticTexts?.popular_categories?.[index*4+3]?.path)}>
                            <img src={staticTexts?.popular_categories?.[index*4+3]?.img} className=" h-[55vh] w-full object-cover object-bottom" />
                        </Link>
                    ):''}
                </div>
            </div>
            )):''}
        </div>
        </div>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage