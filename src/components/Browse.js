import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {
        showGptSearch? (<GptSearch />) :
        <>
           <MainContainer />
           <SecondaryContainer />
        </> 
      }
     
     
      
      {/**
       * Main container
        -  videobackground
        - video title 
      Second Container
        - Movielist * n
          - cards * n
       */}
    </div>
  )
}

export default Browse