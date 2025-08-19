'use client'
import Minus10Sec from "@/svgs/Minus10Sec";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { flexCenter } from "./static/tailwind.classes";
import Plus10Sec from "@/svgs/Plus10Sec";
import PlayIcon from "@/svgs/PlayIcon";
import PauseIcon from "@/svgs/PauseIcon";
import GoPrevious from "@/svgs/GoPrevious.svg";
import { clampAudio, formatTimeForAudio } from "@/helpers/commonFunction";
import { GradientAudioPlayerProps } from "./static/audioPlayer.type";

/**
 * GradientAudioPlayer
 * ------------------------------------------------------------
 * Features
 * 1) Gradient progress/seek bar with draggable thumb
 * 2) Play/Pause
 * 3) Skip ±10s (customizable)
 * 4) Playback speed control
 * 5) Sleep timer with live countdown (stops after selected time)
 * 6) Highly customizable via props
 *
 * Usage:
 * <GradientAudioPlayer
 *   src="/audio/sample.mp3"
 *   title="My Track"
 *   gradientFrom="#D14774"
 *   gradientTo="#851C68"
 *   thumbColor="#ffffff"
 *   trackBg="#1f2937" // fallback track color under gradient
 *   accent="#ffffff"
 *   skipSeconds={10}
 *   speeds={[0.75, 1, 1.25, 1.5, 1.75, 2]}
 *   timerOptions={[0, 5, 15, 30, 60]} // minutes; 0 = Off
 *   className="max-w-xl"
 * />
 */

const GradientAudioPlayer: React.FC<GradientAudioPlayerProps> = ({
  src,   // violet-400
  isPlaying ,
  setIsPlaying ,
  toogleForWard,
  toogleBackWard,
  isFirst,
  isLast,
  audioRef,
  currentTime = 0,
  setCurrentTime = () => {},
  thumbColor = "#ffffff",
  trackBg = "#111827",       // gray-900
  accent = "#ffffff",
  className = "",
  skipSeconds = 10,
  speeds = [0.75, 1, 1.25, 1.5, 1.75, 2],
  timerOptions = [0, 5, 15, 30, 60],
  defaultSpeed = 1,
  defaultTimerMin = 0,
  startMuted = false,
}) => {
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0); // seconds loaded
  const [dragging, setDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0..1
  const [playbackRate, setPlaybackRate] = useState(defaultSpeed);

  // Sleep timer state
  const [timerMin, setTimerMin] = useState(defaultTimerMin);
  const [timerEndsAt, setTimerEndsAt] = useState<number | null>(null);
  const timerTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const [, forceTick] = useState(0); // for rerender countdown every second

  // Setup audio element events
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => setIsPlaying(false);
    const onProgress = () => {
      try {
        const b = audio.buffered;
        if (b && b.length > 0) {
          const end = b.end(b.length - 1);
          setBuffered(end);
        }
      } catch {}
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("progress", onProgress);

    // initial mute/speed
    audio.muted = startMuted;
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("progress", onProgress);
    };
  }, [playbackRate, startMuted]);

  // Handle play/pause safely
  const togglePlay = async () => {
    const audio = audioRef?.current;
    console.log("togglePlay", audio, isPlaying);
    if (!audio) return;
    if (!isPlaying) {
      audio.pause();
      // setIsPlaying(false);
    } else {
      try {
        await audio.play();
        // setIsPlaying(true);
      } catch (e) {
        // autoplay might fail; ignore
      }
    }
  };

  useEffect(() => {
    togglePlay();
  }, [isPlaying]);

  // Skip helpers
  const skip = (secs: number) => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.currentTime = clampAudio(audio.currentTime + secs, 0, duration || audio.duration || 0);
  };

  // Seek based on clientX in bar
  const seekFromClientX = (clientX: number) => {
    const audio = audioRef?.current;
    const bar = barRef.current;
    if (!audio || !bar || duration === 0) return;
    const rect = bar.getBoundingClientRect();
    const p = clampAudio((clientX - rect.left) / rect.width, 0, 1);
    const t = p * duration;
    audio.currentTime = t;
    setCurrentTime(t);
  };

  // Drag handling
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (duration > 0) {
      const bar = barRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const p = clampAudio((e.clientX - rect.left) / rect.width, 0, 1);
      setDragProgress(p);
      seekFromClientX(e.clientX);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const p = clampAudio((e.clientX - rect.left) / rect.width, 0, 1);
    setDragProgress(p);
    seekFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
  };

  const progress = useMemo(() => {
    return duration > 0 ? (currentTime / duration) : 0;
  }, [currentTime, duration]);

  const bufferedPct = useMemo(() => {
    return duration > 0 ? clampAudio(buffered / duration, 0, 1) : 0;
  }, [buffered, duration]);

  // Speed control
  const setSpeed = (rate: number) => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // Sleep timer logic -------------------------------------------------
  const clearSleepTimer = () => {
    if (timerTimeoutRef.current) {
      window.clearTimeout(timerTimeoutRef.current);
      timerTimeoutRef.current = null;
    }
    if (tickIntervalRef.current) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
    setTimerEndsAt(null);
  };

  const startSleepTimer = (minutes: number) => {
    clearSleepTimer();
    if (!minutes || minutes <= 0) return; // Off
    const ms = minutes * 60 * 1000;
    const ends = Date.now() + ms;
    setTimerEndsAt(ends);

    timerTimeoutRef.current = window.setTimeout(() => {
      const audio = audioRef?.current;
      if (audio) {
        audio.pause();
      }
      setIsPlaying(false);
      clearSleepTimer();
    }, ms);

    // tick every 1s for countdown UI
    tickIntervalRef.current = window.setInterval(() => {
      forceTick((v) => v + 1);
    }, 1000);
  };

  // Apply timer when selection changes
  useEffect(() => {
    if (timerMin && timerMin > 0) {
      startSleepTimer(timerMin);
    } else {
      clearSleepTimer();
    }
    // cleanup on unmount
    return () => clearSleepTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerMin]);

  const countdownStr = useMemo(() => {
    if (!timerEndsAt) return "Off";
    const remaining = Math.max(0, timerEndsAt - Date.now());
    const totalSec = Math.ceil(remaining / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [timerEndsAt, currentTime]);

  // Cleanup on unmount
  useEffect(() => () => clearSleepTimer(), []);

  // Style helpers -----------------------------------------------------
  const gradientStyle = {
    background: `linear-gradient(90deg, #DC0277 0%, #004C99 100%)`,
  } as React.CSSProperties;

  const trackStyle = {
    background: trackBg,
  } as React.CSSProperties;

  const thumbStyle = {
    background: "linear-gradient(180deg, #A41580 0%, #DC0277 100%)",
    borderColor: thumbColor,
  } as React.CSSProperties;

  const accentStyle = {
    color: accent,
  } as React.CSSProperties;

  return (
    <div
      className={`w-full   p-4   ${className}`}
      style={{ color: accent }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="mt-0.5 text-xs text-white/60">
            {formatTimeForAudio(currentTime)} / {duration ? formatTimeForAudio(duration) : "0:00"}
          </p>
        </div>

       
      </div>

      {/* Progress / Seek Bar */}
      <div className="relative mb-4 select-none">
        <div
          ref={barRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={dragging ? (dragProgress * duration) : currentTime}
          aria-label="Seek"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") skip(5);
            if (e.key === "ArrowLeft") skip(-5);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="group relative h-3 w-full cursor-pointer touch-none rounded-full"
          style={trackStyle}
        >
          {/* Buffered layer */}
          <div
            className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full opacity-90"
            style={{ width: `${bufferedPct * 100}%`, background: "#ffffff" }}
          />

          {/* Played gradient */}
          <div
            className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full"
            style={{ width: `${(dragging ? dragProgress : progress) * 100}%`, ...gradientStyle }}
          />

          {/* Thumb */}
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full  ring-white/50 transition-transform duration-100 group-active:scale-110"
            style={{ left: `calc(${(dragging ? dragProgress : progress) * 100}% - 8px)`, ...thumbStyle }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-6">
            <button
                onClick={toogleBackWard}
                className={`${isFirst ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Rewind ${skipSeconds} seconds`}
                disabled={isFirst}
            >
            <span className="w-3 inline-block">
                <GoPrevious/>
            </span>
          </button>
          <button
            onClick={() => skip(-skipSeconds)}
            className={``}
            aria-label={`Rewind ${skipSeconds} seconds`}
          >
            <span className="w-5 inline-block">
                <Minus10Sec/>
            </span>
          </button>

          <button
            onClick={()=>setIsPlaying( !isPlaying)}
            aria-label={`Rewind ${skipSeconds} seconds`}
          >
            <span className="w-10 inline-block">
                {isPlaying ? <PauseIcon/> : <PlayIcon />   }
            </span>
          </button>

          <button
            onClick={() => skip(skipSeconds)}
            aria-label={`Rewind ${skipSeconds} seconds`}
          >
            <span className="w-5 inline-block">
                <Plus10Sec/>
            </span>
          </button>

          <button
                onClick={toogleForWard}
                className={`${isLast ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Rewind ${skipSeconds} seconds`}
                disabled={isLast}
            >
            <span className="w-3 rotate-180 inline-block">
                <GoPrevious/>
            </span>
          </button>
        </div>

        
      </div>
      <div>
        <div>
          {/* Speed */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-white/70">Speed</label>
            <select
              className="rounded-xl bg-white/10 px-2 py-1 text-sm text-white outline-none ring-1 ring-white/10 hover:bg-white/15"
              value={playbackRate}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              aria-label="Playback speed"
            >
              {speeds.map((s) => (
                <option key={s} value={s} className="bg-neutral-900 text-white">
                  {s.toFixed(2)}x
                </option>
              ))}
            </select>
          </div>
          {/* Sleep timer */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-white/70">Sleep</label>
            <select
              className="rounded-xl bg-white/10 px-2 py-1 text-sm text-white outline-none ring-1 ring-white/10 hover:bg-white/15"
              value={timerMin}
              onChange={(e) => setTimerMin(parseInt(e.target.value))}
              aria-label="Sleep timer"
            >
              {timerOptions.map((m) => (
                <option key={m} value={m} className="bg-neutral-900 text-white">
                  {m === 0 ? "Off" : `${m} min`}
                </option>
              ))}
            </select>
            <span className="text-xs text-white/60">{countdownStr}</span>
            {timerEndsAt && (
              <button
                onClick={() => setTimerMin(0)}
                className="rounded-xl bg-white/10 px-2 py-1 text-xs text-white ring-1 ring-white/10 hover:bg-white/15"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GradientAudioPlayer;
