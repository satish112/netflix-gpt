import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieID) =>{
    
    const dispatch = useDispatch();

    const MovieTrailer = useSelector(store=>store.movies.TrailerVideo);

   

    //fetch trailer video && updating the store with trailer video
    const getMovieVideos = async () =>{

        const data = await fetch("https://api.themoviedb.org/3/movie/"
            +movieID+
            "/videos?language=en-US", API_OPTIONS);

        const json = await data.json();
        
        const filterdata = json.results.filter(video => video.type === "Trailer");
        const trailer = filterdata.length ? filterdata[0] :json.results[0];
       
        dispatch(addTrailerVideo(trailer))
    };

    useEffect(()=>{
        !MovieTrailer && getMovieVideos();

    },[]);
};

export default useMovieTrailer;