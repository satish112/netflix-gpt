import { useDispatch, useSelector } from "react-redux";
import { addUpComingdMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";



 // fetch data from TMDB API and update the store with all those movies
const useUpComingMovies = () =>{

    const dispatch = useDispatch()

    const UPComingMovies = useSelector(store=>store.movies.UpComingMovies);


  const getUpComingMovies = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);

    const json = await data.json();
    
    dispatch(addUpComingdMovies(json.results));
  };

  useEffect(()=> {
    !UPComingMovies && getUpComingMovies();
  }, [])
};

export default useUpComingMovies;