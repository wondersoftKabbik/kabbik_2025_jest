"use client";

import MyPlayList from '@/svgs/MyPlayList.svg'
import SpeedMeter from '@/svgs/SpeedMeter.svg'
import { Speaker, Timer, Volume, Volume2 } from 'lucide-react'
import styles from "./static/audioBook.module.css";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { Ads } from "./Ads";;
import { useRouter } from "next/navigation";
import { PageProps, TBigPlayerProps, UserProfileInfo } from "./static/audiobook.type";
import { ArrowUpIcon, BadgeCheck, BadgeCheckIcon, BookIcon, ChevronRight, Cross, Crosshair, Crown, Expand, ExpandIcon, HeadphoneOff, Lock, LockIcon, Menu, MenuIcon, Shrink, StarIcon, X } from "lucide-react";
import GoPrevious from "@/svgs/GoPrevious.svg";
import PauseIcon from "@/svgs/PauseIcon";
import PlayIcon from "@/svgs/PlayIcon";
import { formatNumber, formatTime, GetFloatNum, handleShare, numberTranslator, textSlice } from "@/helpers/commonFunction";
import Skeleton from "../ui/Skeleton.view";
import LoveIcon from "@/svgs/LoveIcon";
import LinkIcon from "@/svgs/LinkIcon.svg";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import PaymentOptions from "../ui/PaymentOptions/PaymentOptins.view";
import Tabs from "../ui/Tab/Tab.view";
import EpisodeList from "./EpisodeList.view";
import CastAndCrew from "./Cast&Crew.viw";
import Review from "./Review.view";
import ShareIcon from "@/svgs/ShareIcon.svg";
import Star from "@/svgs/Star.svg";
import GradientAudioPlayer from "../ui/AudioPlayer.view";
import { container, flexCenter } from "../ui/static/tailwind.classes";
import CrossIcon from "@/svgs/CrossIcon";
import ExpandableIcon from "@/svgs/ExpandableIcon";
import BigPlayerCards from "./BigPlayerCards.view";
import { useEffect, useState } from "react";
import PlayList from "./PlayList.view";


// AudioPlayer Configuration

const AudiobookComponent = ({
    bookId,
    audioBookData,
    togglePlayList,
    index,
    isPlaying,
    setIsPlaying,
    hasAccess,
    audioRef,
    epList,
    audioPlayer,
    currentTime ,
    setCurrentTime,
    setPlaybackRate,
    setTimerMin,
    playbackRate,
    timerMin,
    setShowBigPlayer,
    setShowSpeedModal,
    setShowSleeperModal
}: TBigPlayerProps) => {
  

    useEffect(()=>{console.log(audioBookData,"audioBookData")},[])
  
  return (
    <>
      <div className={"flex relative justify-around items-start "+ " "}>
        <div 
          className={"absolute top-3 z-40 right-3 cursor-pointer h-8 bg-[#535252] w-8 rounded-[50%]"+flexCenter}
          onClick={() => setShowBigPlayer(false)}
        >
          <X color="white" className="text-6xl"/>
        </div>
        <div 
          className={`absolute bottom-0 left-0 w-full h-[180vh] ${styles.audioBookBg}`}
          style={{
            backgroundImage: `url('${bookId ? audioBookData?.thumb_path : ""}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
          }}
        ></div>
        <div className="h-40 absolute bottom-[-80px] z-2 w-full blur_gradient opacity-70"></div>

       <div className={"flex my-20 rounded-[32px] items-start"+ " " + styles.bigPlayer}>
            <div className=" flex items-center z-[5] justify-center p-1">
            <div className="w-full min-w-[45vw]   mx-auto">
                {/* Main Card Container */}
                <div className=" rounded-[40px]  overflow-hidden">
                {/* Book Cover Section */}
                <div>
                    <figure className="m-4">
                        <img className="w-[45vw] h-[25vw] rounded-[10px]" src={audioBookData?.rect_banner ?? audioBookData?.thumb_path}/>
                    </figure>
                </div>
                    <div>
                        <GradientAudioPlayer 
                            toogleForWard={()=>togglePlayList(index+1,epList[index+1]?.id)} 
                            toogleBackWard={()=>togglePlayList(index-1,epList[index-1]?.id)}
                            isPlaying={isPlaying} 
                            isFirst={index===0}
                            isLast={index===epList.length-1}
                            setIsPlaying={(boolean)=>setIsPlaying(boolean)} 
                            src={audioPlayer} 
                            audioRef={audioRef}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            setPlaybackRate={setPlaybackRate}
                            setTimerMin={setTimerMin}
                            playbackRate={ playbackRate}
                            timerMin={timerMin }
                        />
                    </div>
                    <div className="flex  justify-between  items-center gap-6 lg:gap-8 px-4 max-w-5xl mx-auto">

                      {/* Left Controls */}
                      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {/* Speed Control */}
                        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setShowSpeedModal(true)}>
                          <div className="flex items-center justify-center min-w-[72px] h-8 bg-player-surface rounded-full px-3">
                            <span 
                              className="w-4 h-4 mr-2 fill-player-text" 
                              
                            >
                                <SpeedMeter/>
                            </span>
                            <span className="text-white text-sm font-medium">{playbackRate}</span>
                          </div>
                          <span className="text-white text-xs">Speed</span>
                        </div>

                        {/* Timer */}
                        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setShowSleeperModal(true)}>
                          <div 
                            className="w-6 h-6  rounded-full flex items-center text-white justify-center"
                            
                          >
                            <Timer/>
                          </div>
                          <span className="text-white text-sm">Timer</span>
                        </div>

                        {/* Background Music */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-xl" role="img" aria-label="speaker">
                            <Volume2 className='text-white'/>
                          </div>
                          <span className="text-white text-xs text-center">Background music</span>
                        </div>
                      </div>

                      {/* Right Controls */}
                      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {/* Like */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-5 h-5">
                            <LoveIcon/>
                          </div>
                          <span className="text-white text-xs">Like</span>
                        </div>

                        {/* Share */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-4 h-4">
                            <ShareIcon/>
                          </div>
                          <span className="text-white text-xs">Share</span>
                        </div>

                        {/* Add My Playlist */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-4 h-4">
                            <MyPlayList/>
                          </div>
                          <span className="text-white text-xs text-center">Add My Playlist</span>
                        </div>
                      </div>
                    </div>
                
                </div>
            </div>
            </div>
            <div className="min-h-screen z-[5]   py-4 md:py-8">
            <div className="max-w-2xl mx-auto px-4 space-y-8 md:space-y-16">
                {/* Header Section */}
            

                {/* Navigation Tabs */}
                <div className="flex gap-2 md:gap-4">
                    <PlayList 
                        hasAccess={hasAccess} 
                        book={audioBookData}
                        index={index}
                        isPlaying={isPlaying}
                        togglePlay={(i,episodeId)=>{
                            togglePlayList(i,episodeId)
                        }}
                    /> 
                    {/* <BigPlayerCards/> */}
                </div>

            </div>
            </div>
       </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(AudiobookComponent), {
  ssr: false,
});


