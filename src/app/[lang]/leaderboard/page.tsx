'use client'
import { useAppSelector } from "@/store/store";
import GoldPosition from "@/svgs/GoldPosition.svg";
import SecondPosition from "@/svgs/SecondPosition.svg";
import ThirdPosition from "@/svgs/ThirdPosition.svg";
import { leaderboard_top_listners } from "@/utils/apiServices";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserStreamingStatList } from "./static/leaderboard.type";

export default function Leaderboard() {
    const user= useAppSelector(store=>store?.user?.userData)
    const [leaderboardData,setLoaderboardData]=useState<UserStreamingStatList>([]);
    let getTopListners=async()=>{
        let result = await leaderboard_top_listners(user?.id??0);
        setLoaderboardData(result)
    }

    useEffect(()=>{
        getTopListners()
    },[])
  

    useEffect(()=>{
        console.log(leaderboardData?.find((item)=>item?.user_id===(user?.id || '')),"leader")
    },[leaderboardData])

  return (
    <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0  -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
            <h3 className='text-white mt-0 pt-8 text-cn2 md:text-clg2 font-semibold text-center'>এই মাসের শীর্ষ অডিওবুক শ্রোতারা</h3>
        </div>
        <div className="circular_gradient right-[-10%]  top-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        <div className=" flex flex-col  items-center justify-center px-4 pb-3 md:pb-6">
            <div className="circular_gradient_bluish right-[10%]  bottom-[0%] w-[85vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="flex z-[2] relative flex-row items-end justify-center gap-3 xs:gap-6 sm:gap-12">
                {/* {console.log(leaderboardData?.slice(0,2),"kdfdfkj")
                } */}
                {leaderboardData?.slice(0,3).map((p, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center text-white ${
                    p?.ranking === 1 ? "order-2 sm:order-2 mt-[-100px] " : p?.ranking === 2 ? "order-1 sm:order-1 mt-[100px]" : "order-3 mt-[100px] sm:order-3"
                    }`}
                >
                    {/* Podium Number */}
                    <div
                    className={`relative flex items-center justify-center   rounded-full bg-gradient-to-tr  shadow-xl`}
                    >
                    {p?.ranking === 1 && (
                        <div className=" w-16 xs:w-24 sm:w-32 md:w-44 lg:w-56">
                        <GoldPosition/>
                        </div>
                    )}
                    {p?.ranking === 2 && (
                        <div className=" w-16 xs:w-24 sm:w-32 md:w-44 lg:w-56">
                        <SecondPosition/>
                        </div>
                    )}
                    {p?.ranking === 3 && (
                        <div className=" w-16 xs:w-24 sm:w-32 md:w-44 lg:w-56">
                        <ThirdPosition/>
                        </div>
                    )}
                    </div>

                    {/* Name */}
                    <h2 className="mt-4 text-cs text-center xs:text-cs2 md:text-cn2 lg:text-lg2 font-normal xs:font-bold">{p?.full_name||'User'}</h2>

                    {/* Stats Box */}
                    <div className="mt-3 btn-gradient-2 rounded-[8px] px-4 py-2 text-center text-sm sm:text-base">
                    <div className="flex justify-between gap-6">
                        <div>
                        <p className="font-medium text-pink-300">ঘন্টা</p>
                        <p>{Math.floor(p?.total_streaming_time)}</p>
                        </div>
                        
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className=" text-white z-[2] relative flex flex-col items-center py-10 px-4">
            <div className="circular_gradient left-[-10%]  top-[10%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="w-full max-w-5xl btn_gradient_3 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-black/20 text-cs md:text-lg font-semibold border-b border-white/20">
                        <tr>
                            <th className="py-4">অবস্থান</th>
                            <th className="py-4 text-left pl-8">প্রোফাইল নাম</th>
                            <th className="py-4">ঘন্টা</th>
                            {/* <th className="py-4">বই</th> */}
                            {/* <th className="py-4">লেভেল</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData?.slice(3,14).map((user, index) => (
                            <tr
                            key={index}
                            className="border-b text-cs md:text-cn border-white/10 hover:bg-white/10 transition"
                            >
                                <td className="py-3 text-pink-300 font-semibold">#{user.ranking}</td>
                                <td className="py-3 flex items-center space-x-3 justify-start pl-8">
                                {/* <Image
                                src={user.photo}
                                alt={user.name}
                                width={35}
                                height={35}
                                className="rounded-full border border-white/30"
                                /> */}
                                <span className="font-medium text-white">{user.full_name||'User'}</span>
                                </td>
                                <td className="py-3">{Math.floor(user.total_streaming_time)}</td>
                                {/* <td className="py-3">{user.book}</td> */}
                                {/* <td className="py-3">
                                <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold inline-block ${
                                user.level === "গোল্ড"
                                ? "bg-yellow-300 text-black"
                                : user.level === "সিলভার"
                                ? "bg-gray-200 text-black"
                                : "bg-orange-500 text-white"
                                }`}
                                >
                                {user.level}
                                </span>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <div className="mt-3 font-bold text-cn md:text-clg"><h2>Your Current position is {leaderboardData?.find((item)=>item?.user_id===(user?.id?.toString() || ''))?.ranking}</h2></div>
        </div>
    </div>
  );
}
