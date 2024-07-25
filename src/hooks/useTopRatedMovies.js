import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";



 // fetch data from TMDB API and update the store with all those movies
const useTopRatedMovies = () =>{

    const dispatch = useDispatch()

    const TopRatedMovies = useSelector(store=>store.movies.TopRatedMovies);


  const getTopRatedMovies = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);

    const json = await data.json();
    
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(()=> {
    !TopRatedMovies && getTopRatedMovies();
  }, [])
};

export default useTopRatedMovies;