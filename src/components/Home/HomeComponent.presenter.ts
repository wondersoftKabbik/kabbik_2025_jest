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
    const user=useAppSelector((store)=>store?.user?.userData)
    const categories=useAppSelector(store=>store.categories?.CategoriesData)
    const [userPreferdCats,setUserPreferdCats]=useState<string[]>([])
    const [topVideo,setTopVideo]=useState({video:StaticTexts?.home_video?.videos[0],index:0});
    const [middleVideo,setMiddleVideo]=useState({video:StaticTexts?.campaign_video?.videos[0],index:0});
    const [lastVideo,setLastVideo]=useState({video:StaticTexts?.nepal_tour_video?.videos[0],index:0});


    useEffect(()=>{
        setTopVideo({video:StaticTexts?.home_video?.videos[0],index:0});
        setMiddleVideo({video:StaticTexts?.campaign_video?.videos[0],index:0})
        setLastVideo({video:StaticTexts?.nepal_tour_video?.videos[0],index:0})
    },[StaticTexts])

    const goToNext=(type:'top'|'middle'|'last')=>{
        if(type==='top'){
            console.log({video:StaticTexts?.home_video?.videos[topVideo.index+1],index:topVideo.index+1})
            setTopVideo({video:StaticTexts?.home_video?.videos[topVideo.index+1],index:topVideo.index+1})
        }
        if(type==='middle'){
            console.log({video:StaticTexts?.campaign_video?.videos[middleVideo.index+1],index:middleVideo.index+1});
            setMiddleVideo({video:StaticTexts?.campaign_video?.videos[middleVideo.index+1],index:middleVideo.index+1})
        }
        if(type==='last'){
            console.log({video:StaticTexts?.nepal_tour_video?.videos[lastVideo.index+1],index:lastVideo.index+1})
           setLastVideo({video:StaticTexts?.nepal_tour_video?.videos[lastVideo.index+1],index:lastVideo.index+1})
        }
    }

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

   
  return {player,StaticTexts,setPlayer,videoRef,initialPlayer,setInitialPlayer,togglePlay,handleInitialPlay,setPlayer2,videoRef2,initialPlayer2,setInitialPlayer2,togglePlay2,handleInitialPlay2,player2,setPlayer3,videoRef3,initialPlayer3,setInitialPlayer3,togglePlay3,handleInitialPlay3,player3,userPreferdCats,topVideo,middleVideo,lastVideo,goToNext,user}
}

export default useHomeComponent