'use client'
import { useAppSelector } from "@/store/store";
import ContentCard from "./contentCard.view";
import { useEffect, useState } from "react";
import Link from "next/link";
import { paths } from "@/utils/Paths";

export default function Categories({folders}:{folders:number|string}) {
    const categories=useAppSelector((store)=>store.categories.CategoriesData);
    const [totaldiv,setTotalDiv]=useState<number[]>([]); // a div consisted with three image

    useEffect(()=>{
        let totaldiv=Math.floor((categories??[])?.length/4);
        let i = 0;
        let arr = Array.from({ length: totaldiv }, () => i=i+4)
        setTotalDiv(arr);
    },[categories])

    
  return (
    <div className="max-h-[95vh] overflow-y-auto  relative bg-gray-50 p-1 sm:p-2 md:p-3">
      <div className=" mx-auto">
        {/* First Section */}
        {totaldiv.map((item)=>(
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2  relative gap-2 lg:gap-3 mb-3">
           
                <div className="  h-[185px] rounded-[4px] overflow-hidden border border-gray-300">
                    <Link href={`${paths.categoryWiseBooks(categories?.[item-4].name??'')}?folders=${folders}`}>
                        <img loading="lazy" src={categories?.[item-4].thumb_path ?? ''} className=" h-[185px] w-full object-cover object-left-bottom" />
                    </Link>                
                </div>

                {/* Right Column with Two Cards */}
                <div className="flex flex-col gap-2">
                    <div className="  h-[90px] rounded-[4px] overflow-hidden border border-gray-300">
                        <Link href={`${paths.categoryWiseBooks(categories?.[item-4+1].name??'')}?folders=${folders}`}>
                            <img loading="lazy" src={categories?.[item-4+1].thumb_path ?? ''} className=" h-[90px] w-full object-cover object-left-bottom" />
                        </Link>                
                    </div>
                    <div className="  h-[90px] rounded-[4px] overflow-hidden border border-gray-300">
                        <Link href={`${paths.categoryWiseBooks(categories?.[item-4+2].name??'')}?folders=${folders}`}>
                            <img loading="lazy" src={categories?.[item-4+2].thumb_path ?? ''} className=" h-[90px] w-full object-cover object-left-bottom" />
                        </Link>                
                    </div>
                    
                </div>
                
            </div>
            <div className="  h-[110px] w-full mb-3 rounded-[4px] overflow-hidden border border-gray-300">
                    <Link href={`${paths.categoryWiseBooks(categories?.[item-4+3].name??'')}?folders=${folders}`}>
                        <img loading="lazy" src={categories?.[item-4+3].thumb_path ?? ''} className=" h-[110px] w-full object-cover object-left-bottom" />
                    </Link>                
            </div>
            </>
        ))}
      </div>
    </div>
  );
}
