'use client';

import { useRef, useState, useEffect } from 'react';
import { Pause, Play, Maximize2, Minimize2 } from 'lucide-react';
import { TVideoPlayerProps } from './static/vidoPlayer.types';
import useVideoPlayer from './VideoPlayer.presenter';

export default function CustomVideoPlayer({url,playing,setPlaying,videoRef,togglePlay}:TVideoPlayerProps) {
  const {containerRef,isFullWidth,isFullscreen,progress,toggleFullscreen,handleTimeUpdate,handleSeek} = useVideoPlayer(videoRef)
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 bg-black
        ${isFullWidth ? 'w-screen max-w-none' : 'w-full'}
        ${isFullscreen ? 'h-screen max-h-none' : 'max-h-[550px]'}`}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Gradient Control Bar */}
      <div className="absolute bottom-0 w-full px-4 py-2  flex items-center gap-2">
        <div className="flex justify-between items-center">
          <button
            onClick={togglePlay}
            className="text-[#ca1571] hover:scale-110 transition-transform bg-white rounded-full p-2"
          >
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
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
