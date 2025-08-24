export type GradientAudioPlayerProps = {
  src: string;
  /** colors & appearance */
  toogleForWard: () => void;
  toogleBackWard?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  gradientFrom?: string;
  gradientTo?: string;
  thumbColor?: string;
  trackBg?: string;
  accent?: string;
  className?: string;
  currentTime:number;
  setCurrentTime: (currentTime: number) => void;
  /** behavior */
  skipSeconds?: number; // amount for ± buttons
  speeds?: number[];
  timerOptions?: number[]; // in minutes; include 0 for Off
  defaultSpeed?: number;
  defaultTimerMin?: number; // 0 = Off
  startMuted?: boolean;
  setPlaybackRate:(val: number) => void;
  setTimerMin:(val: number) => void;
  playbackRate: number;
  timerMin: number;
};
