// store/slices/playlistSlice.ts
import { PlaylistAudioBook } from '@/components/MyPlayList/static/myplaylist.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState:{playlistData:PlaylistAudioBook[]} = { playlistData:[] };

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylistValue: (state,action) => { 
        return {playlistData:action.payload};
     },
    // decrement: (state) => { state.value -= 1 },
    // reset: (state) => { state.value = 0 },
  },
});

export const { setPlaylistValue } = playlistSlice.actions;
export default playlistSlice.reducer;
