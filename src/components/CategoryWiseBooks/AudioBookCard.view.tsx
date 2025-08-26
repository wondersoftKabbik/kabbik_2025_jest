'use client'
import Link from 'next/link';
import { TAudiobookCardProps } from './static/category.types';
import { paths } from '@/utils/Paths';
import { useEffect } from 'react';

export function AudiobookCard({ audiobook, className = '',category }: TAudiobookCardProps) {
  useEffect(()=>{console.log(audiobook,"podcast")},[])
  return (
    <div className={`group  cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}>
      <div className="relative overflow-hidden rounded-[6px] border border-white/20 bg-black/20 backdrop-blur-sm">
        <Link href={paths.book_details(audiobook.id)}>
            <img
              src={audiobook.thumb_path}
              alt={audiobook.name}
              className="aspect-[3/4] max-w-full z-10 object-cover transition-transform duration-300 group-hover:scale-110"
            />
        
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        
        {/* Overlay content on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="space-y-1">
            <h3 className="font-bengali font-semibold text-lg leading-tight">
              {audiobook.name}
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
