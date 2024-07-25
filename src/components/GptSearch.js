import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BACKGROUNG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className="absolute -z-10">
            <img 
                className="h-screen object-cover md:w-screen"
                src= {BACKGROUNG_URL}
                alt = "background"
            />
      </div>
    <div className="">
        
        <GptSearchBar/>
        <GptMovieSuggestion />

    </div>
    </>
  )
}

export default GptSearch