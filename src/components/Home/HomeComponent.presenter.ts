import { useAppSelector } from '@/store/store';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

const useHomeComponent = () => {
    const [player,setPlayer]=useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [initialPlayer,setInitialPlayer]=useState(false);
    const [player2,setPlayer2]=useState(false);
    const videoRef2 = useRef<HTMLVideoElement>(null);
    const [initialPlayer2,setInitialPlayer2]=useState(false);
    const [player3,setPlayer3]=useState(false);
    const videoRef3 = useRef<HTMLVideoElement>(null);
    const [initialPlayer3,setInitialPlayer3]=useState(false);
    const StaticTexts=useAppSelector((store)=>store.staticTexts?.data)

    const CommonTogglePlay=(videoRef:RefObject<HTMLVideoElement>,setObj:Dispatch<SetStateAction<boolean>>)=>{
        if(!videoRef ){
            return;
        }
        const video =  videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setObj(true);
        } else {
            video.pause();
            setObj(false);
        }
        if(videoRef && 'current' in videoRef)  videoRef.current.muted = false;
    }
    
    const togglePlay = () => {
        CommonTogglePlay(videoRef,setPlayer)
    };

    const handleInitialPlay=()=>{
        setPlayer(true)
        setInitialPlayer(true)
        togglePlay()
    }

    const togglePlay2 = () => {
        CommonTogglePlay(videoRef2,setPlayer2)
    };
    
    const togglePlay3 = () => {
        CommonTogglePlay(videoRef3,setPlayer3)
    };

    const handleInitialPlay2=()=>{
        setPlayer2(true)
        setInitialPlayer2(true)
        togglePlay2()
    }

    const handleInitialPlay3=()=>{
        setPlayer3(true)
        setInitialPlayer3(true)
        togglePlay3()
    }

    // useEffect(()=>{
    //     if ('Tawk_API' in window) {
    //         (window.Tawk_API as any).onLoad = function() {
    //             (window.Tawk_API as any).hideWidget();
    //         };
    //     }

    // },[])

  return {player,StaticTexts,setPlayer,videoRef,initialPlayer,setInitialPlayer,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2,setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3}
}

export default useHomeComponent