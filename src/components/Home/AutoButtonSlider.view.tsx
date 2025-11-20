"use client";

import { paths } from "@/utils/Paths";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useRef, useEffect } from "react";



export default function AutoButtonSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const router=useRouter();

  const items = [
        {title:"ক্যাটাগরি",onclick:()=>{}},
        {title:"সাবস্ক্রাইব",onclick:()=>{router.push(paths.subscribe)}},
        {title:"রেফার এন্ড আর্ন",onclick:()=>{router.push(paths.refer_earn)},subscribedOnly:true},
        {title:"আপকামিং",onclick:()=>{router.push(paths.upcoming)}},
        {title:"পডকাস্ট",onclick:()=>{router.push(paths.upcoming)}},
        {title:"স্টোর ",onclick:()=>{router.push(paths.store)}},
    ];

//   useEffect(() => {
//     const container = sliderRef.current;
//     if (!container) return;

//     let scrollAmount = 0;
//     let animationId:any;

//     const scroll = () => {
//       if (!container) return;
      
//       scrollAmount += 0.5; // Adjust speed here (lower = slower)
//       container.scrollLeft = scrollAmount;

//       // Reset to start when we've scrolled past the first set of items
//       if (scrollAmount >= container.scrollWidth / 2) {
//         scrollAmount = 0;
//       }

//       animationId = requestAnimationFrame(scroll);
//     };

//     animationId = requestAnimationFrame(scroll);

//     // Pause on hover
//     const handleMouseEnter = () => cancelAnimationFrame(animationId);
//     const handleMouseLeave = () => {
//       animationId = requestAnimationFrame(scroll);
//     };

//     container.addEventListener("mouseenter", handleMouseEnter);
//     container.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       cancelAnimationFrame(animationId);
//       container.removeEventListener("mouseenter", handleMouseEnter);
//       container.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

  return (
    <div className="no__scrollbar  w-[800px]  py-6">
      <div
        ref={sliderRef}
        className="flex gap-3  overflow-x-auto"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate items multiple times for seamless loop */}
        {[...items,...items].map((item, i) => (
          <button
            key={i}
            className={`px-6 bg_water py-2 rounded-full text-white text-sm md:text-base border border-white/20 flex-shrink-0 transition-all hover:scale-105
              ${i % items.length === 0 ? "bg-gradient-to-r from-pink-600 to-purple-600" : "bg-transparent hover:bg-white/10"}
            `}
          >
            {item?.title??''}
          </button>
        ))}
      </div>
    </div>
  );
}