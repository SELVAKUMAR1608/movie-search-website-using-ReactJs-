import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './omdb.css';
import Loader from'./Loader.jsx';
import image from'./assets/omdbImage/img.png';

function Omdb() {
    let initialState={
        movies:[],
        search:'',
        searchedMovie:'',
        loading:false,
        error:false,


    }
    let [movies,setmovies]=useState(initialState.movies)
    let [search,setsearch]=useState(initialState.search)
    let[searchedMovie,setsearchedmovie]=useState(initialState.searchedMovie);
    let[loading,setloading]=useState(initialState.loading);
    let [error,seterror]=useState(initialState.error);
    



    let fetchApi= async()=>{
        setloading(true);
        seterror(false)

        try {
            let {data:{Search} }=await axios.get(`https://www.omdbapi.com/?s=${searchedMovie}&apikey=891606f7`);
            setmovies(Search)
            setloading(false);
            
            
        } 
        catch(err) {
            console.log(err);
            seterror(true);
            setloading(false);
            
        }
        
    }

    let updateSearch=({target:{value}})=>{
        setsearch(value)
        // console.log(value);
        
    }
    let updateSearched=()=>{
        setsearchedmovie(search)
        // console.log(search);
        
    }
    useEffect(()=>{
        fetchApi()
    },[searchedMovie])
    // console.log(movies);d
    

  return (
    <section>
        <div className="search-container">
        <input type="search" placeholder='Enter movie name' onChange={updateSearch}/>
        <button onClick={updateSearched}>search</button>
        </div>
        <hr />

        <div className="display-container">
            {!searchedMovie && !loading &&  (
                 <img src={image} alt="no image" className='mainImage'/>
            )
                
            }
            {!loading && !movies && searchedMovie && <h2>OOPS....! MOVIE NOT FOUND</h2>}
          
           {loading && <Loader/>}
           {error && <h2>API ERROR...!</h2>}
        {!loading && movies?.map((movie)=>{
                 return(
                    <div key={movie.imdbID} className='imageContainer'>
                        <img src={movie.Poster} alt="" />
                    </div>
                 )
 
         })}
        {/* //  :!loading && <h2>OOPS....! MOVIE NOT FOUND</h2> */}

        </div>
        
        
      

    </section>
  )
}

export default Omdb