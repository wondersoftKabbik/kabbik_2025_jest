"use client";

import styles from "./static/audioBook.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  deleteFavoritesApi,
  getCurrentEpisodePath,
  getDynamicPaymentMethods,
  getSessionInit,
  paymentForPurchaseAudiobook,
  postAudiobookPlayCountApi,
  postEpisodePlayCountApi,
  postFavoritesApi,
  postReview,
  userProfile,
} from "@/utils/apiServices";


import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rating } from "react-simple-star-rating";
;
import Image from "next/image";
import Cookies from "js-cookie";
import { Ads } from "./Ads";;
import { useRouter } from "next/navigation";
import { PageProps, UserProfileInfo } from "./static/audiobook.type";
import { ArrowUpIcon, BadgeCheck, BadgeCheckIcon, BookIcon, ChevronRight, Cross, Crosshair, Crown, Expand, ExpandIcon, HeadphoneOff, Lock, LockIcon, Menu, MenuIcon, Shrink, StarIcon, X } from "lucide-react";
import GoPrevious from "@/svgs/GoPrevious.svg";
import PauseIcon from "@/svgs/PauseIcon";
import PlayIcon from "@/svgs/PlayIcon";
import { formatNumber, formatTime, GetFloatNum, handleShare, numberTranslator, textSlice } from "@/helpers/commonFunction";
import Skeleton from "../ui/Skeleton.view";
import LoveIcon from "@/svgs/LoveIcon";
import LinkIcon from "@/svgs/LinkIcon.svg";
import CommonModal from "../ui/CommonModal/CommonModal.view";
// import PaymentOptions from "../ui/PaymentOptions/PaymentOptins.view";
import Tabs from "../ui/Tab/Tab.view";
import EpisodeList from "./EpisodeList.view";
import CastAndCrew from "./Cast&Crew.viw";
import Review from "./Review.view";
import ShareIcon from "@/svgs/ShareIcon.svg";
import Star from "@/svgs/Star.svg";
import GradientAudioPlayer from "../ui/AudioPlayer.view";
import { container } from "../ui/static/tailwind.classes";
import CrossIcon from "@/svgs/CrossIcon";
import ExpandableIcon from "@/svgs/ExpandableIcon";
import BigPlayerView from "./BigPlayer.view";
import SleeperTimer from "./SleeperTime.view";
import AudioSpeed from "./AudioSpeed.view";
import PaymentOptions from "../Subscription/PaymentOptions.view";


// AudioPlayer Configuration

const AudiobookComponent = ({
  bookId,
  audiobookData,
  authorDetailsData,
  castData,
  reviewDetailsData,
  episodeId,
  runningTime,
}: PageProps) => {
  const id = bookId;
  const audioBookDetailsData = audiobookData;
  const authorData = authorDetailsData?.data[0];
  const castCrewData = castData.data;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const reviewData = reviewDetailsData.data;
  const [expand,setExpand] = useState(false);
  const continueEpisodeId = episodeId;
  const continueRunningTime = runningTime;
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const isSubscribed = userData?.is_subscribed === 1 ? true : false;
  const [continueEpisodeData, setContinueEpisodeData] = useState<any[]>([]);
  const [isBigger, setIsBigger] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);
  const router = useRouter();
  const [showBigPlayer, setShowBigPlayer] = useState(false);
  const rentAvailable = audiobookData.for_rent && audioBookDetailsData?.price;
  const [playbackRate, setPlaybackRate] = useState(1);
  const [timerMin, setTimerMin] = useState(0);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showSleeperModal, setShowSleeperModal] = useState(false);
  const [showPayModal,setShowPayModal]=useState(false)
  const [showPaymentOptions,setShowPaymentOptions]=useState<boolean>(false);

  const toggleSize = () => {
    setIsBigger((prevSize) => !prevSize);
  };

  const [isFavBook, setIsfavBook] = useState(false);
  const [isAccordion, setIsAccordion] = useState(false);
  const [review, setreview] = useState("");
  const [star, setStar] = useState(5);
  const [isRunning, setIsRunning] = useState(true);

  const starHandler = (event: any) => {
    setStar(event);
  };

  const reviewHandler = (event: any) => {
    setreview(event.target.value);
  };

  //player!!!!!!!!
  const [audioPlayer,setAudioPlayer] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  // const progressBarRef: any = useRef(null);
  const [epList, setEpList]: any = useState(audioBookDetailsData?.episodes);
  const [currentPlay, setCurrentPlay]: any = useState({});
  const [index, setIndex] = useState(-1);
  const [isPlaying, setisPlaying] = useState(false);
  const [elapsed, setElapsed]: any = useState();
  const [duration, setDuration]: any = useState(0);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [audioBookCount, setAudioBookCount] = useState(false);
  const [isLogin, setIsLogin]: any = useState();
  const [isFree, setIsFree] = useState();

  const isNextAllowed =
    index < epList?.length - 1 &&
    (epList[index + 1].isfree === 1 ||
      (!audioBookDetailsData?.isSubRestricted && isSubscribed) || (audioBookDetailsData?.isSubRestricted && audioBookDetailsData?.for_rent===0 && isSubscribed) ||
      audioBookDetailsData?.isPurchased === 1);
  const isPrevAllowed = index > 0;

  const isAuthenticated = useCallback(async () => {
    setIsLogin(Cookies.get("isLogin"));
  }, []);



  useEffect(()=>{
    console.log("crewwww",reviewDetailsData)
  },[])
  const audioBookDetails = useCallback(async () => {
    setIsfavBook(audioBookDetailsData.is_favorite);
    setEpList(audioBookDetailsData.episodes);
  

    if (index == -1) {
      setIndex(0);
      setCurrentPlay(audioBookDetailsData.episodes[0]);
    }
  }, [index, audioBookDetailsData.episodes, audioBookDetailsData.is_favorite]);

  useEffect(() => {
    const input: any = document.querySelector("input[type='range']");

    function setBackgroundSize(input: any) {
      input?.style.setProperty(
        "--background-size",
        `${getBackgroundSize(input)}%`
      );
    }
    function getBackgroundSize(input: any) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;
      const size = ((value - min) / (max - min)) * 100;
      return size;
    }

    setBackgroundSize(input);
    input?.addEventListener("input", () => setBackgroundSize(input));
    return () => {
      input?.removeEventListener("input", () => setBackgroundSize(input));
    };
  }, []);

  useEffect(()=>{console.log(audioBookDetailsData,"dddddddddddddddddddddddddddddddddddd")},[audioBookDetailsData])

  useEffect(() => {
    audioBookDetails();
    isAuthenticated();
  }, [audioBookDetails, isAuthenticated]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userProfile();
      setUserData(userData);
    };
    fetchUserData();
    if (localStorage.getItem("continueListeningData"))
      setContinueEpisodeData(
        JSON.parse(localStorage.getItem("continueListeningData")!)
      );
  }, []);

  useEffect(() => {
    const divs = document.getElementsByClassName("modal-backdrop fade show");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].innerHTML === "") {
        divs[i].remove();
      }
    }
  });

  useEffect(() => {
    if (continueEpisodeId) {
      const indexNum = epList?.findIndex(
        (obj: any) => obj.id === continueEpisodeId
      );
      if (isRunning) {
        setIndex(indexNum);
        setAudioPlayer(
          epList[
            epList?.map((item: any) => item.id).indexOf(continueEpisodeId)
          ]?.file_path);

        setCurrentPlay(
          epList[epList?.map((item: any) => item.id).indexOf(continueEpisodeId)]
        );

        // audioPlayer.current.currentTime = continueRunningTime;
        if(
          hasAccess()
        ){
          setPlaying(true);
          // setisPlaying(true);
          // audioRef.current?.play()
          setShowMiniPlayer(true);
          setIsRunning(false);
        }
        
      }
    }
  }, [continueEpisodeId, isRunning, continueRunningTime, epList,audioBookDetailsData,isSubscribed]);

  const hasAccess=()=>{
    return (!audioBookDetailsData?.isSubRestricted && isSubscribed) || 
    (audioBookDetailsData?.isSubRestricted && audioBookDetailsData?.for_rent===0 && isSubscribed) || 
    audioBookDetailsData?.isPurchased === 1 ||
    audioBookDetailsData?.price === 0 ||
    epList[0].isfree
  }

  useEffect(() => {
    const initialize = async () => {
      // setGlobalState((prev) => ({
      //   ...prev,
      //   session: {
      //     type: isPlaying ? "Stream" : "Activity",
      //     audiobookId: isPlaying ? currentPlay?.audiobook_id : null,
      //     episodeId: isPlaying ? currentPlay?.id : null,
      //     isPlaying: !audioPlayer.current?.paused,
      //   },
      // }));
      if(isPlaying){
        getSessionInit(currentPlay?.audiobook_id, currentPlay?.id);
      }
    };
    initialize();
  }, [
    isPlaying,
    currentPlay?.id,
    currentPlay?.audiobook_id,
    currentPlay.episode_id,
    // setGlobalState,
  ]);

  const submitReviewForm = async (event: any) => {
    event.preventDefault();
    const reviewData = await postReview(id, star, review);

    toast.success("Rating & Review Added !", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };

  const favSubmit = async () => {
    if (isFavBook) {
      const fav = await deleteFavoritesApi(id);
      setIsfavBook(false);
      toast.info("Removed from favourites !", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      const fav = await postFavoritesApi(id);
      setIsfavBook(true);
      toast.success("Added to favourites !", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };

  // AudioPlayer Configuration

  const togglePlay = async () => {
    let isIconChanged = false;

    if (audioPlayer === "") {
      togglePlayList(0, epList[0].id);
      isIconChanged = true;
    }

    if (!isPlaying) {
      setIndex(index);

      // audioPlayer.current.play();
      setPlaying(true)
      setShowMiniPlayer(true);
      const audioBookPlayCount = async (id: any) => {
        setAudioBookCount(true);
        await postAudiobookPlayCountApi(id);
      };
      !audioBookCount ? await audioBookPlayCount(id) : "";
      await postEpisodePlayCountApi(currentPlay.id);
    } else {
      // audioPlayer.current.pause();
      setPlaying(false)
    }

    setCurrentPlay(epList[index]);

    // if (!isIconChanged) {
    //   setisPlaying((prev) => !prev);
    // }
  };

  const togglePlayList = async (ind: any, episodeId: number) => {
    setIndex(ind);
    const current = (
      await getCurrentEpisodePath(audioBookDetailsData.id, episodeId)
    )?.data;
    // audioPlayer.current.src = current;
    setAudioPlayer(current);
    setCurrentPlay(epList[ind]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // console.log("currentPlay", audioRef.current);
    setisPlaying(false)
    // if(index!==i || isPlaying===false){
      setTimeout(()=>{setisPlaying(true)},200)
    // }
    audioRef.current?.play()
    const audioBookPlayCount = async (id: any) => {
      setAudioBookCount(true);
      await postAudiobookPlayCountApi(id);
    };

    !audioBookCount ? await audioBookPlayCount(id) : "";
    await postEpisodePlayCountApi(currentPlay.id);
    showBigPlayer?"":setShowMiniPlayer(true);
  };

  const toggleSkipForward = async () => {
    setIndex((prev) => prev + 1);
    const current = (
      await getCurrentEpisodePath(audioBookDetailsData.id, epList[index + 1].id)
    ).data;
    // audioPlayer.current.src = current;
    setAudioPlayer(current);
    setCurrentPlay(epList[index + 1]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // audioRef.current?.play()
    await postEpisodePlayCountApi(currentPlay.id);
  };

  const toggleSkipBackward = async () => {
    setIndex((prev) => prev - 1);
    const current = (
      await getCurrentEpisodePath(audioBookDetailsData.id, epList[index - 1].id)
    ).data;
    // audioPlayer.current.src = current;
    setAudioPlayer(current);
    setCurrentPlay(epList[index - 1]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // audioRef.current?.play()
    await postEpisodePlayCountApi(currentPlay.id);
  };

  const toggleForward = () => {
    // audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    // audioPlayer.current.currentTime -= 10;
  };

  const onEnded = async () => {
    if (!isNextAllowed) {
      setisPlaying(false);
    } else {
      await toggleSkipForward();
    }
  };

  const handleBigPlayer = ()=>{
    console.log("big player clicked","dkfjdkfjdkdkfjdfj");
    setShowBigPlayer(!showBigPlayer);
    // audioRef.current?.pause()
    setShowMiniPlayer(false)
}


  const contuinueEpisodeFunction = useCallback(
    (elapsed_pass: any, duration_pass: any) => {
      const continueListening = {
        audiobookId: currentPlay?.audiobook_id,
        audiobookImg: audioBookDetailsData.thumb_path,
        episodeId: currentPlay?.id,
        episodeName: currentPlay?.name,
        runningTime: elapsed_pass,
        duration: duration_pass,
        isFree: currentPlay?.isfree,
      };

      if (continueEpisodeData.length <= 0) {
        continueEpisodeData.push(continueListening);
      } else {
        let aInd = 0;
        let inserted = 0;
        continueEpisodeData.forEach(function (data, index) {
          if (
            (!data.audiobookId && !currentPlay?.audiobook_id) ||
            data.audiobookId === currentPlay?.audiobook_id
          ) {
            inserted = 1;
            aInd = index;
          }
        });

        if (inserted === 0) {
          continueEpisodeData.push(continueListening);
        } else {
          continueEpisodeData[aInd] = {
            audiobookId: currentPlay?.audiobook_id,
            audiobookImg: audioBookDetailsData.thumb_path,
            episodeId: currentPlay?.id,
            episodeName: currentPlay?.name,
            runningTime: elapsed_pass,
            duration: duration_pass,
            isFree: currentPlay?.isfree,
          };
        }
      }
      localStorage.setItem(
        "continueListeningData",
        JSON.stringify(continueEpisodeData)
      );
    },
    [currentPlay, audioBookDetailsData, continueEpisodeData]
  );

  const CloseMiniPlayer=()=>{
    setShowMiniPlayer(false);
    setisPlaying(false);
    audioRef.current?.pause()
  }

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        // const _duration = Math.floor(audioPlayer?.current?.duration);
        // const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        // setDuration(_duration);
        // setElapsed(_elapsed);
        // contuinueEpisodeFunction(_elapsed, _duration);
      }, 100);
      contuinueEpisodeFunction(elapsed, duration);
    }
  }, [isPlaying, contuinueEpisodeFunction, elapsed, duration]);

  const handleMouseDown = () => {
    // audioPlayer.current.pause();
    setPlaying(false);
  };

  const handleMouseUp = (e: any) => {
    const newTime = e.target.value;
    // audioPlayer.current.currentTime = newTime;
    // if (isPlaying) audioPlayer.current.play();
  };

  const onPointerEnter = () => {};
  const onPointerLeave = () => {};
  const onPointerMove = (value: number, index: number) => {};

  const miniPlayerHandler = () => {
    // audioPlayer.current.pause();
    setPlaying(false);
    // setisPlaying(false);
    // audioRef.current?.pause()
    setShowMiniPlayer(false);
  };

  const makePayment = async (paymentName: string, url: string) => {
    let payload = {
      userId: userData?.id,
      name: userData?.full_name,
      // email: userData?.user_email,
      phone: userData?.phone_no,
      address: userData?.address,
      amount: audioBookDetailsData.price,
      audioBookId: audioBookDetailsData.id,
      type: "Audiobook",
      promo_code: "",
      productId: audioBookDetailsData.id,
      source: "Kabbik",
      platform: "web",
    };
    const result = await paymentForPurchaseAudiobook(url, payload);
    if (paymentName === "Bkash") {
      if (result.data.bkashURL) {
        window.location.href = result.data.bkashURL;
        return ;
      }
    } else {
      if (result.data.callBackUrl) {
        window.location.href = result.data.callBackUrl;
        return ;
      }
    }
    toast.error("Could not make payment");
  };

  const purchaseAudiobook = async () => {
    setShowPaymentOptions(true)
    const result = await getDynamicPaymentMethods("audiobook");
    const excludedPaymentMethods = 
    // JSON.parse(
      audioBookDetailsData.excluded_payment_methods as string
    // );
    console.log(audioBookDetailsData.excluded_payment_methods)
    if (result.success) {
      setPaymentOptions(
        result.data.filter(
          (p: any) => !excludedPaymentMethods.includes(p.method_name)
        )
      );
    }
  };

  const handleCloseBigPlayer=()=>{
    audioRef.current?.pause();
    console.log(audioRef.current,"audioRef.current");
    setShowBigPlayer(false);
    setTimeout(()=>{
      setisPlaying(false);
      setAudioPlayer("");
      // audioRef.current = null;
      setShowMiniPlayer(false);
    },1000)
  }
 
  return (
    <>
      <div className="w-full h-[100px] bg-[#0E1D3F] mt-[-100px]"></div>
      <ToastContainer />
      <div className={showBigPlayer?'hidden':"flex justify-around mt-7 items-start relative"}
        
      >
        <div 
          className={`absolute -top-7 left-0 w-full h-[270vh] ${styles.audioBookBg}`}
          style={{
            backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        ></div>
        {/* <div className="h-40 absolute bottom-[-80px] z-2 w-full blur_gradient opacity-90"></div> */}
        <div className="circular_gradient left-0 bottom-[-10%] w-[35vw] h-[35vw] absolute rounded-[50%] "></div>

        <div className=" flex items-center z-[5] justify-center p-1">
          <div className="w-full max-w-[45vw] mx-auto">
            {/* Main Card Container */}
            <div className="bg-white rounded-[40px]  overflow-hidden">
              {/* Book Cover Section */}
              <div className="relative m-7 mb-0">
                <div 
                  className="w-full aspect-[516/674] rounded-[12px]  overflow-hidden"
                  style={{
                    backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Top Icons */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000002] z-10 ">

                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer z-[100]">
                    <div className="w-8 h-8 bg-red-500/50 rounded-full flex items-center justify-center">
                      <span className="w-4 h-4 text-white fill-white" >
                        <LoveIcon />
                      </span>
                    </div>
                    <div onClick={handleShare} className="w-8 h-8 bg-gray-500/60 rounded-full flex items-center justify-center">
                      <span className="w-4 h-4 text-white inline-block" >
                        <ShareIcon />
                      </span>
                    </div>
                  </div>

                  {/* Book Title Overlay */}
                  <div className="absolute bg_opacity_gradient bottom-0 left-0 right-0 p-4  rounded-b-xl z-[200]">
                    {/* Bottom Stats positioned above title */}
                    <div className="text-center">
                      <h1 className=" text-[#f9f9f9] text-2xl font-bold leading-[34px] mb-1">
                        {audioBookDetailsData?.name}
                      </h1>
                      <p className="text-white text-[19px] leading-normal">
                        {audioBookDetailsData?.author_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Content Section */}
              <div className="bg_gradient_bg rounded-t-[32px]  p-9">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 ">
                    <span className="text-[23px] font-medium">{audiobookData?.play_count}</span>
                    <span className="text-[23px]">🎧</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className=" text-[22px] font-medium">{GetFloatNum(audiobookData?.rating,1)}</span>
                    <span className="w-6 h-6 fill-audio-gold text-audio-gold">
                      <Star  />
                    </span>
                  </div>
                </div>
                {/* Premium Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-black mb-2">
                    {isSubscribed ? (
                            <>প্রিমিয়াম ব্যবহারকারী</>
                        ) : audioBookDetailsData?.isPurchased === 1 ? (
                            <>কনটেন্ট কেনা হয়েছে</>
                        ) : audioBookDetailsData?.price === 0 ? (
                            <>ফ্রি</>
                        ) : (
                            <>প্রিমিয়াম কনটেন্ট</>
                        )}
                  </h2>
                  <div className="flex justify-center gap-3">
                    {[...Array(5)].map((_, i) => (
                      <span className="w-6 h-6 fill-audio-star text-audio-star">
                        <Star key={i}  />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subscription Options */}
                <div className="space-y-4 mb-8">
                  {/* Premium Subscription */}
                  <div className="red_gradient_bg rounded-[30px] py-3 flex justify-around shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="flex">
                          <ChevronRight className="w-5 h-5 text-[#7E1663]" />
                          <ChevronRight className="w-5 h-5 text-[#7E1663] -ml-3" />
                        </div>
                      </div>
                      <p className="text-white  text-[17px]  font-semibold leading-tight flex-1">
                       <Link href={'/subscribe'}> সাবস্ক্রাইব করুন অ্যাড-ফ্রি প্রিমিয়াম অ্যাক্সেসের জন্য</Link>
                      </p>
                    </div>
                  </div>

                  {/* Or Divider */}
                  <div className="text-center py-1">
                    <span className="text-black text-[26px] font-normal">অথবা</span>
                  </div>

                  {/* Rental Option */}
                  <div className="bg-[#7E1663] rounded-[30px] py-3 flex justify-around shadow-lg">
                    <div className="flex items-center justify-around gap-4">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="flex">
                          <ChevronRight className="w-5 h-5 text-[#7E1663]" />
                          <ChevronRight className="w-5 h-5 text-[#7E1663] -ml-3" />
                        </div>
                      </div>
                      <p className="text-white text-[21px] font-semibold leading-tight flex-1">
                        রেন্ট নিন ৬০ দিনের জন্য, মাত্র ৫০ টাকা
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-6">
                  {/* Voice Artists */}
                  <div>
                    <h3 className="text-black text-2xl font-bold mb-2">কণ্ঠ: </h3>
                    <p className="text-black text-[21px] leading-relaxed">
                      {audiobookData?.contributing_artists }
                    </p>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-black text-2xl font-bold mb-2">সংক্ষিপ্ত জীবনী:</h3>
                    <p 
                      onClick={()=>setExpand(!expand)}
                      className="text-black text-[21px] cursor-pointer leading-relaxed max-h-40 overflow-y-auto"
                    >
                      { expand? audiobookData?.description :
                        textSlice( audiobookData?.description,160, true,"এই বইটির সংক্ষিপ্ত বিবরণ এখানে দেওয়া হবে।") 
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen z-[5]  py-4 md:py-8">
          <div className="max-w-2xl mx-auto px-4 space-y-8 md:space-y-16">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#881D69] to-[#D34974] rounded-xl p-3 md:p-4 text-white">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-17 md:h-17 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  <img
                    src={authorData?.imageUrl??''}
                    alt="Sir Arthur Conan Doyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h1 className="text-xl md:text-2xl font-medium">{authorData?.name}</h1>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    <div className="flex items-center gap-2">
                      <BookIcon />
                      <span className="text-lg md:text-xl font-medium">{authorData?.total_audiobooks} অডিও বুক</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="bg-white text-black px-3 md:px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
                        আরও অডিওবুক শুনুন
                      </button>
                      <div className="bg-white w-8 rounded-full p-2 shadow-lg">
                        <LinkIcon color="black"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 md:gap-4">
              <Tabs tabs={[
                { name: 'এপিসোড', 
                  component: 
                    <EpisodeList 
                      hasAccess={hasAccess} 
                      book={audiobookData}
                      index={index}
                      isPlaying={isPlaying}
                      togglePlay={(i,episodeId)=>{
                        console.log("working")
                        if(hasAccess()){
                          togglePlayList(i,episodeId)
                        }else{
                          setShowPayModal(true)
                        }
                      }}
                    /> 
                  },
                { name: 'কলা কুশলীরা', 
                  component: <CastAndCrew
                                castCrewData={castCrewData}
                            /> 
                },
                { name: 'রিভিউ', component: <Review reviews={reviewDetailsData.data}/> },
              ]} />
            </div>

          </div>
        </div>
      </div>
        <div className={showBigPlayer?'':'hidden'}>
          <BigPlayerView
            bookId={bookId}
            audioBookData={audioBookDetailsData}
            togglePlayList={togglePlayList}
            index={index}
            isPlaying={isPlaying}
            setIsPlaying={(val:boolean)=>setisPlaying(val)}
            hasAccess= {hasAccess}
            audioPlayer={audioPlayer}
            audioRef={audioRef}
            epList={epList}
            currentTime={currentTime} 
            setCurrentTime={setCurrentTime}
            setPlaybackRate={setPlaybackRate}
            playbackRate={playbackRate}
            setTimerMin={setTimerMin}
            timerMin={timerMin}
            setShowBigPlayer={handleCloseBigPlayer}
            setShowSpeedModal={setShowSpeedModal}
            setShowSleeperModal={setShowSleeperModal}
          />
        </div>
      
      <div className={showMiniPlayer?"fixed bottom-0 left-0 min-w-[100vw] right-0 h-[210px] z-[100] bg-bg shadow-lg  ":'hidden'}>
        <div className={'w-full'}>
          <div className={container('1206px')}>
            <div className="absolute top-0 right-5 p-2 cursor-pointer" >
              <span className="w-5 h-5 inline-block mr-6" onClick={handleBigPlayer}>
                <ExpandIcon className="text-white w-[18px] " />
              </span>
              <span className="w-5 h-5 inline-block" onClick={CloseMiniPlayer}>
                  <X color="white" className="text-4xl"/>
              </span>
            </div>
            <div className="rounded-2xl flex  justify-center items-center  overflow-hidden ">
              {/* Banner */}
              {/* <img
                src={audiobookData?.thumb_path}
                alt={audiobookData?.name}
                className="max-w-[80px] object-cover"
              /> */}

              {/* Content */}
              <div className="p-3 space-y-1">
                {/* Book name (small) */}
                <h2 className="text-base font-semibold text-white">
                  {epList[index]?.name}
                </h2>
                <p className="text-xs text-gray-500">{audiobookData?.name}</p>

                {/* Episode name (bigger) */}
                

                {/* Author name */}
                <p className="text-sm text-gray-600 dark:text-gray-400">{audiobookData?.author_name}</p>
              </div>
            </div>
            <div>
              <GradientAudioPlayer 
                toogleForWard={()=>togglePlayList(index+1,epList[index+1]?.id)} 
                toogleBackWard={()=>togglePlayList(index-1,epList[index-1]?.id)}
                isPlaying={isPlaying} 
                isFirst={index===0}
                isLast={index===epList.length-1}
                setIsPlaying={(boolean)=>setisPlaying(boolean)} 
                src={audioPlayer} 
                audioRef={audioRef}
                currentTime={currentTime} 
                setCurrentTime={setCurrentTime}
                setPlaybackRate={setPlaybackRate}
                playbackRate={playbackRate}
                setTimerMin={setTimerMin}
                timerMin={timerMin}
              />
            </div>
            </div>
        </div>
      </div>
      {showSpeedModal?(
        <CommonModal 
          isOpen={showSpeedModal}
          onClose={()=>{setShowSpeedModal(false)}}
          container_class="rounded-[18px] w-[75vw]"
          modalClassName="max-w-[680px] w-[90vw] w-full h-auto"
        >
          <AudioSpeed value={playbackRate} handleChange={(val)=>{setPlaybackRate(val)}}/>
        </CommonModal>
      ):''}
      {showSleeperModal?(
        <CommonModal 
          isOpen={showSleeperModal}
          onClose={()=>{setShowSleeperModal(false)}}
          container_class="rounded-[18px] w-[75vw]"
          modalClassName="max-w-[680px] w-[90vw] w-full h-auto"
        >
          <SleeperTimer value={timerMin} handleChange={(val)=>{setTimerMin(val)}}/>
        </CommonModal>
      ):''}

      {showPayModal?(
        <CommonModal
          isOpen={showPayModal}
          onClose={()=>setShowPayModal(false)}
          modalClassName="max-w-[680px] w-[90vw] w-full h-auto"
        >
          <div className="w-full bg-[#0c1b3a] text-white py-8 px-4 rounded-[8px]">
          {/* Book Name */}
          <h2 className="text-center text-2xl font-semibold mb-10">{audiobookData?.name}</h2>

          <div className="flex items-center justify-center">
            {/* Subscribe */}
            {true && (
              <div onClick={() => router.push("/subscribe")} className="flex flex-col items-center text-center flex-1">
                <button className="px-6 py-2 bg-white text-black rounded-full shadow hover:bg-gray-100 transition">
                  Subscribe
                </button>
                <p className="text-xs text-gray-200 mt-2">
                  To listen unlimited audiobooks
                </p>
              </div>
            )}

            {/* Divider with Or */}
            {true && (
              <div className="flex flex-col items-center justify-center mx-6">
                <div className="w-px bg-gray-300 h-8" />
                <span className="my-1 text-gray-200 text-sm">Or</span>
                <div className="w-px bg-gray-300 h-8" />
              </div>
            )}

            {/* Rent */}
            {true && (
              <div onClick={purchaseAudiobook} className="flex flex-col items-center text-center flex-1">
                <button  className="px-6 py-2 bg-white text-black rounded-full shadow hover:bg-gray-100 transition">
                  Rent
                </button>
                <p className="text-xs text-gray-200 mt-2">
                  Rent this audiobook
                </p>
              </div>
            )}
          </div>
        </div>
        </CommonModal>
      ):''}
      <CommonModal
        isOpen={showPaymentOptions}
        onClose={()=>setShowPaymentOptions(false)}
      >
        <div className={`${styles.modalBody} bg-navyblue modal-body text-center max-h-[96vh] overflow-y-scroll`}>
          <PaymentOptions
            options={paymentOptions.map((option: any) => ({
              methodName: option.method_name,
              logoUrl: option.image_url,
              apiUrl: option.url,
              vat: option.vat,
            }))}
            callback={makePayment}
            price={audioBookDetailsData?.price}
          />
        </div>
      </CommonModal>
    </>
  );
};

export default dynamic(() => Promise.resolve(AudiobookComponent), {
  ssr: false,
});
