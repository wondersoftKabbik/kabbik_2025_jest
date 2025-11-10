import { useAppSelector } from "@/store/store";
import { useEffect, useState, useRef } from "react";
import Spinner from "../ui/Spinner.view";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function CustomReels({ targetId }: { targetId: string }) {
  const [players, setPlayers] = useState<any[]>([]);
  const [apiReady, setApiReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsData = useAppSelector((store) => store?.staticTexts?.data?.reels);

  // ✅ Load YouTube API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

  }, []);


  // ✅ Initialize YouTube players
  useEffect(() => {
    if (!apiReady || !reelsData?.length) return;

    const newPlayers: any[] = [];

    reelsData.forEach((reel, index) => {
      const player = new window.YT.Player(`yt-player-${index}`, {
        videoId: reel?.reelInfo?.reel_youtube_id,
        playerVars: {
          autoplay: targetId===reel?.reelInfo?.reel_youtube_id?1:0,
          mute: 0, // mute initially to allow autoplay
          controls: 1,
          rel: 0,
          playsinline: 1,
        },
      });
      newPlayers.push(player);
    });

    setPlayers(newPlayers);
  }, [apiReady, reelsData]);

  // ✅ Auto play/pause visible video only
  useEffect(() => {
    if (!players.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          const player = players[index];
          if (!player || typeof player.playVideo !== "function") return;

          if (entry.isIntersecting) {
            // Pause all others
            players.forEach((p, i) => {
              if (i !== index && p.pauseVideo) p.pauseVideo();
            });
            player.playVideo();
            // if (userInteracted) player.unMute();
          } else {
            player.pauseVideo();
          }
        });
      },
      { threshold: 0.8 }
    );

    const videos = document.querySelectorAll(".reel-video");
    videos.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [players, userInteracted]);

  // ✅ Scroll to target video & autoplay
  useEffect(() => {
    if (players.length === reelsData?.length) {
      const targetIndex = reelsData.findIndex((r) => r?.reelInfo?.reel_youtube_id === targetId);
      if (targetIndex !== -1) {
        const targetElement = document.querySelector(
          `[data-index="${targetIndex}"]`
        ) as HTMLElement;

        targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          const targetPlayer = players[targetIndex];
          if (targetPlayer && typeof targetPlayer.playVideo === "function") {
            targetPlayer.playVideo();
            // if (userInteracted) targetPlayer.unMute();
          }
        }, 1200);
      }
    }
  }, [players, reelsData, targetId, userInteracted]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen  overflow-y-scroll snap-y snap-mandatory bg-black text-white"
    >
      {reelsData?.map((reel, index) => (
        <div
          key={index}
          data-index={index}
          className="reel-video mx-auto  w-[95%] h-[97vh] my-[5vh] flex justify-center items-center snap-start"
        >
          {!apiReady?
            <picture className="relative">
              <img src={reel?.reelInfo?.thumb}/>
              <Spinner size="w-5 h-5 z-[5] relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </picture>
            :<div
              id={`yt-player-${index}`}
              className=" o h-[90%] md:h-full max-w-[98%] mx-auto w-[500px]"
            ></div>
          }
        </div>
      ))}
    </div>
  );
}
