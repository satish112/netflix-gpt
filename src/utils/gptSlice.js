import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({

    name:'gpt',
    initialState: {
        showGPTSearch:false,
        movieResults:null,
        movieNames:null,
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGPTSearch = !state.showGPTSearch;
        },
        addGptMovieresult:(state, action) =>{
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults= movieResults;
        },

        
    }
});




export const{toggleGptSearchView, addGptMovieresult} = gptSlice.actions;
export default gptSlice.reducer;