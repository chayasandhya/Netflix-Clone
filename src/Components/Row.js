import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer"


const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
 
 
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {

    (async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    })();//fetchData()
       
  }, [fetchUrl]);

const handleClick=async (movie)=>{
  console.log(movie)
if(trailerUrl){
  setTrailerUrl('')
}
else{
    /*  movieTrailer(movie?.name|| "")
  .then((url)=>{
    const Url=new URL(url);
    const urlParms=new URLSearchParams(Url.search) ;   
    setTrailerUrl(urlParms.get("v"));
  })
  .catch((error)=>{console.log(error)})  */
  try{
   const url=await movieTrailer(movie?.name|| "")
   const Url=new URL(url);
   const urlParms=new URLSearchParams(Url.search) ;   
   setTrailerUrl(urlParms.get("v"));
} catch(err){
   console.log(err)
 }

 }


  
};

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={()=>handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              ></img>
          );
        })}
      </div>
      {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts}/>}
     
    </div>
  );
}

export default Row;
