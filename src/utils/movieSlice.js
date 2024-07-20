import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        addTrailerVideo:null,
    },

    reducers:{
        addNowPlayingMovies : (state, action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies : (state, action)=>{
            state.PopularMovies = action.payload;
        },
        addTrailerVideo : (state, action) => {
            state.addTrailerVideo = action.payload;
        }
    }
})


export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies} = movieSlice.actions;
export default movieSlice.reducer;