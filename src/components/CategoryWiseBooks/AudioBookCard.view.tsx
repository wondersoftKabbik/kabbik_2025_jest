'use client'
import Link from 'next/link';
import { TAudiobookCardProps } from './static/category.types';
import { paths } from '@/utils/Paths';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddIcon from '@/svgs/Add.svg';
import { addBooksToPlaylistFolders } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import Tik from '@/svgs/Tik.svg';
import GreenTik from '@/svgs/GreenTik.svg';
import Image from 'next/image';
import { siteConfig } from '@/config/config';

export function AudiobookCard({ audiobook, className = '',category,isInPlayList,handleAddToBookList }: TAudiobookCardProps) {
  const searchParams = useSearchParams();
  // const 
  let folders=searchParams.get('folders')

  const addToPlayList=async()=>{
    if(!folders)return;
      let result = await addBooksToPlaylistFolders(audiobook.id,folders)
      if(result.success===false){
        toast.error("Something Went wrong")
      }else{
        console.log(handleAddToBookList)
        handleAddToBookList && handleAddToBookList(audiobook.id,audiobook.name)
        toast.success("Book is added to your playlist")
      }
  }
  
  return (
    <div  className={`group  cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}>
      <div className="relative overflow-hidden rounded-[6px] border border-white/20 bg-black/20 backdrop-blur-sm">
        {folders?(
          !isInPlayList?
          <span onClick={addToPlayList} className='w-8 z-[1] h-8 inline-block absolute top-1 right-1'>
            <AddIcon />
          </span>:
          <span  className='w-7 z-[1] h-7 inline-block absolute top-1 right-1'>
            <GreenTik />
          </span>
        ):''}
        <Link href={paths.book_details(audiobook.id)}>
            {/* <img
              src={audiobook.thumb_path}
              alt={audiobook.name}
              loading='lazy'
              className="aspect-[3/4] max-w-full z-10 object-cover transition-transform duration-300 group-hover:scale-110"
            /> */}
            <Image
              src={audiobook.thumb_path || siteConfig.placeholderBook}
              alt={audiobook.name || "Audiobook cover"}
              width={300} // adjust based on your design
              height={400}
              placeholder="blur"
              blurDataURL={siteConfig.placeholderBook}
              loading="lazy"
              priority={false}
              className="aspect-[3/4] max-w-full object-left-top z-10 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = siteConfig.placeholderBook; // fallback if image fails
              }}
            />
        
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        
        {/* Overlay content on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="space-y-1">
            <h3 className="font-bengali font-semibold text-lg leading-tight">
              <Link href={paths.book_details(audiobook.id)}>
                {audiobook.name}
              </Link>
            </h3>
           
            {/* <p className="text-xs text-accent font-medium">
              {category}
            </p> */}
            {audiobook.author_name && (
              <p className="font-bengali text-xs text-white/70">
                {audiobook.author_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
