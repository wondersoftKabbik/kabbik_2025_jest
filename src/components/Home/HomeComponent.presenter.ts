import { HomeInfo } from '@/pageTypes/home.types';
import { useAppSelector } from '@/store/store';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

const useHomeComponent = ({homeData}:{homeData:HomeInfo}) => {
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
    const userPreference=useAppSelector((store)=>store.userPreference?.userPreferenceData)
    const categories=useAppSelector(store=>store.categories?.CategoriesData)
    const [userPreferdCats,setUserPreferdCats]=useState<string[]>([])

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

    useEffect(()=>{
        
        let selectedCats:string[]=[];
        if(userPreference && categories && categories.length){
            if(userPreference && userPreference.categories && userPreference.categories.length){
                 userPreference.categories?.forEach((catId:number|string)=>{
                    let cat=categories.find(c=>c.id===catId);
                    if((cat?.name!=='নতুন') && (cat?.name !== 'শীর্ষ ১০') && (cat?.name!=='ট্রেন্ডিং') ){
                        selectedCats.push( cat?.name as string)
                    }
                })
            }
            
        }
        homeData.data.forEach((item)=>{
            if(!selectedCats.includes(item.name)){
                if((item?.name!=='নতুন') && (item?.name !== 'শীর্ষ ১০') && (item?.name!=='ট্রেন্ডিং') ){
                    selectedCats.push(item.name)
                }
            }
            if(selectedCats.length>=15){
                return;
            }
        })
        setUserPreferdCats(selectedCats)
        
    },[userPreference,categories])
    
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

  return {player,StaticTexts,setPlayer,videoRef,initialPlayer,setInitialPlayer,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2,setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3,userPreferdCats}
}

export default useHomeComponent