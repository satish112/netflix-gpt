import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";



 // fetch data from TMDB API and update the store with all those movies
const usePopularMovies = () =>{

    const dispatch = useDispatch()

   
    const PopularMovies = useSelector(store=>store.movies.PopularMovies);

  const getPopularMovies = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);

    const json = await data.json();
    
    dispatch(addPopularMovies(json.results));
  };

  useEffect(()=> {
    !PopularMovies && getPopularMovies();
  }, [])
};

export default usePopularMovies;