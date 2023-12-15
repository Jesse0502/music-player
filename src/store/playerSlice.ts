import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import SpotifyPlayer from "react-spotify-web-playback";

export interface PlayerState {
  currentTrackURI: string | string[];
  currentPlayingTrack: string;
  gaySongWarning: boolean;
  isPlaying: boolean;
  accessToken: string;
  playerSettings: any;
}

const initialState: PlayerState = {
  currentTrackURI: "",
  currentPlayingTrack: "",
  gaySongWarning: false,
  isPlaying: false,
  accessToken: "",
  playerSettings: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addTrackToPlayer: (state, action) => {
      state.currentTrackURI = action.payload;
    },
    addPlaylistToPlayer: (state, action) => {
      state.currentTrackURI = action.payload;
    },
    setCurrentPlayingTrack: (state, action) => {
      state.currentPlayingTrack = action.payload;
    },
    sendGaySongWarning: (state, action) => {
      state.gaySongWarning = action.payload;
    },
    togglePlayerRuntime: (state, action) => {
      state.isPlaying = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    initializePlayerSettings: (state, action) => {
      state.playerSettings = action.payload;
    },
  },
});

export const {
  addPlaylistToPlayer,
  addTrackToPlayer,
  setCurrentPlayingTrack,
  sendGaySongWarning,
  togglePlayerRuntime,
  setAccessToken,
  initializePlayerSettings,
} = playerSlice.actions;

export default playerSlice.reducer;
