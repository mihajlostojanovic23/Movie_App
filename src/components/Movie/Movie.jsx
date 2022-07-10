import React from 'react'
import './movie.css'
import Logo from '../Navbar/logo.png'
import NotFoundImg from './notfound.png'
import Moviedetails from '../Movie_Details/moviedetails'
import { useState } from 'react'
import { useRef } from 'react'
import YouTube from 'react-youtube'

function Movie(props) {
  
    const IMG_API = "https://image.tmdb.org/t/p/w300/"
    
    
    return (

  <div className='movie' onClick={()=> {props.selectMovie(props.movies)
  props.currPos(window.scrollY)
  props.button(false)
}}>
       <div className="container">
        <div className="img">
        <div className="overlay"><button>Detaljnije</button>
        <div className="details">{props.movies.vote_average}</div></div>
        <img src={IMG_API + props.movies.poster_path} onError={(e)=> {
          e.target.onError=null;
          e.target.src=NotFoundImg
          e.target.className='image_err'
        }}  className="movie_img" alt="Picture" />
        </div>
        <div className="title">{props.movies.title? props.movies.title : props.movies.name}</div>
       </div>
    </div>
  )
}

export default Movie