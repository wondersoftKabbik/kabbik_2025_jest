import React from 'react'
import { TAudioBookDetails, TEpisode } from './static/audiobook.type';
import PremiumCrownIcon from '@/svgs/PremiumIcon';
import Crown from '@/svgs/Crown.svg';
import LockIcon from '@/svgs/LockIcon.svg';
import PlayIcon from '@/svgs/PlayIcon';
import PauseIcon from '@/svgs/PauseIcon';

const EpisodeList = ({book,hasAccess,togglePlay,index,isPlaying}:{book:TAudioBookDetails,hasAccess:()=>boolean,togglePlay:(i:number,id:number)=>void,index:number,isPlaying:boolean}) => {

  return (
    <div>
        <div className="space-y-4">
          {book?.episodes.map((episode,i) => (
            <div
              onClick={()=>togglePlay(i,episode.id)}
              key={episode.id} className="bg-white cursor-pointer rounded-[6px] p-3 md:p-4 shadow-lg"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 md:w-7 md:h-7">
                      <Crown />
                    </div>
                  </div>
                  <img
                    src={book.thumb_path}
                    className="w-12 h-14 md:w-16 md:h-18 rounded-md object-cover flex-shrink-0"
                  />
                  <h3 className="text-lg md:text-[22px] text-black font-normal min-w-0 leading-tight">
                    {episode?.name}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10" >
                    {hasAccess() ? (
                      isPlaying && index === i ? <PauseIcon color='#98266B' /> : <PlayIcon  />
                     ) : <LockIcon />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default EpisodeList