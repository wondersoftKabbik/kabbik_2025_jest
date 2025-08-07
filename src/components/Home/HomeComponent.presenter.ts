import { useAppSelector } from '@/store/store';
import React, { useRef, useState } from 'react'

const useHomeComponent = () => {
    const [player,setPlayer]=useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [initialPlayer,setInitialPlayer]=useState(false);
    const StaticTexts=useAppSelector((store)=>store.staticTexts?.data)
    
    const togglePlay = () => {
        if(!videoRef ){
            return;
        }
        const video =  videoRef.current;
        if (!video) return;

        if (video.paused) {
        video.play();
        setPlayer(true);
        } else {
        video.pause();
        setPlayer(false);
        }
    };

    const handleInitialPlay=()=>{
        setPlayer(true)
        setInitialPlayer(true)
        togglePlay()
    }

  return {player,StaticTexts,setPlayer,videoRef,initialPlayer,setInitialPlayer,togglePlay,handleInitialPlay}
}

export default useHomeComponent