'use client';

import { useRef, useState, useEffect } from 'react';
import { Pause, Play, Maximize2, Minimize2 } from 'lucide-react';
import { TVideoPlayerProps } from './static/vidoPlayer.types';
import useVideoPlayer from './VideoPlayer.presenter';
import Plus10Sec from '@/svgs/Plus10Sec';
import Minus10Sec from '@/svgs/Minus10Sec';

export default function CustomVideoPlayer({
  height,
  width,
  url,
  playing,
  setPlaying,
  videoRef,
  togglePlay
}: TVideoPlayerProps) {
  const {
    containerRef,
    isFullWidth,
    isFullscreen,
    progress,
    toggleFullscreen,
    handleTimeUpdate,
    handleSeek
  } = useVideoPlayer(videoRef);

  // Skip video by seconds (positive = forward, negative = backward)
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        videoRef.current.duration
      );
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
      // setTimeout(()=>{
      //   if(video && 'current' in video)  videoRef.current.muted = false;
      // }, 1000)
      setPlaying(true)
    }
  };

  // function to handle pause
  const handlePause = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
      setPlaying(false)
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handlePause();
        }
      },
      { threshold: 0.5 } // 50% of video must be visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 bg-black
        ${isFullWidth ? 'w-screen max-w-none' : height ?? ' w-[60%] mx-auto '}
        ${isFullscreen ? 'h-screen max-h-none' : width ?? ' max-h-full '}`}
    >
      {/* <video
        onClick={togglePlay}
        ref={videoRef}
        src={url}
        muted
        // autoPlay={true}
        className="w-full h-full cursor-pointer rounded-[8px] object-cover"
        onEnded={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      /> */}

      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-[8px]">
        <video
          onClick={togglePlay}
          ref={videoRef}
          src={url}
          muted
          className="max-w-full max-h-full cursor-pointer rounded-[8px] object-contain bg-gray-800"
          onEnded={() => setPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* Gradient Control Bar */}
      <div className="absolute bottom-0 w-[95%]  px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-2">
          {/* Backward 10s */}
          <button
            onClick={() => skip(-10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-10 h-10 flex items-center justify-center"
            title="Rewind 10 seconds"
          >
            <span className='w-8 inline-block'>
              <Minus10Sec/>
            </span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-[#ca1571] hover:scale-110 transition-transform bg-white rounded-full p-2"
          >
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skip(10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-10 h-10 flex items-center justify-center"
            title="Forward 10 seconds"
          >
            <span className='w-8 inline-block'>
              <Plus10Sec/>
            </span>
          </button>
        </div>

        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-white h-1"
        />

        {/* Buttons row */}
        <div className="flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full p-2"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
