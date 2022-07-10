import React, { Component } from 'react'
import { useRef } from 'react'
import Movie from '../Movie/Movie'
import Navbar from '../Navbar/Navbar'
import YouTube from 'react-youtube'
import Arrow from './arrow.png'


const API_DISCOVERY = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=106b004999aac7f831125bd58d56d57d&page=1`
const API_KEY = '106b004999aac7f831125bd58d56d57d'
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=106b004999aac7f831125bd58d56d57d&query="
const IMG_API = "https://image.tmdb.org/t/p/w400/"
const POSTER ="https://image.tmdb.org/t/p/w1280/"

let header = document.querySelector('.header')
let buttons = document.querySelector('#btn')
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: [],
          error: null,
          page: 1,
          isAuth: true,
          selectedMovie: {},
          button: true,
          position: null,
          first_Pos: null,
          input_value: null,
          logo: false,
          lastPage: false,
          tranding: null,
          indicator: true,
          trailer: '',
          yt_options: {
            height:'490',
            width: '840',
            playerWars: {
                autoplay: 1,
                origin: 'http://localhost:3000',
                controls: 0,
                autohide: 1,
                wmode: 'opaque',
            }
          },
          yt_options2: {
            height:'190',
            width: '340',
            playerWars: {
                autoplay: 1,
                origin: 'http://localhost:3000',
                controls: 0,
                autohide: 1,
                wmode: 'opaque',
            }
          },

          search_result: 1,
          Arrow_up: false
        };
       
      }
      

async componentDidMount(){
    try{
      
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=106b004999aac7f831125bd58d56d57d&page=${this.state.page}`)
        const data = await response.json()
      
        this.setState({movies: data.results, selectedMovie: data.results[0] })
      
       
    }
    catch(err){
       
    }
        }
        

        pageDecrement =()=> {

            if(this.state.tranding == false) {
                this.setState({page:this.state.page})
                
            }

            else {
            if(this.state.lastPage !=false){
                this.setState({page: 1})
            }
            else {
            if(this.state.page > 1 ) {
            this.setState((state,props)=> ({page: state.page - 1}))
            
            }
            else {
                this.setState((state,props)=> ({page: state.page}))
              
            }
            this.setState({isAuth: false}) } }
        }
          
        show_yt=() => {
            let youtube = document.querySelector('.youtube_container')
            youtube.style.display='block'
        }

        onVideoReady = () => {
            alert('keke')
        }

    pageIncrement =()=> {

       if (this.state.page >= 1 && this.state.page <500) {

        
        if (this.state.tranding == false) {
            this.setState({page:1})
        }
        else {
        if(this.state.lastPage != false)
        {
             this.setState({page:1})
        }
        else {
            this.setState((state)=> ({page: state.page +1})) 
            this.setState({isAuth: false})    }
        }
         
    }
}

        componentDidUpdate(prevState, prevProps) {
            if(!this.state.isAuth){
        fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=106b004999aac7f831125bd58d56d57d&page=${this.state.page}`)
        .then((response)=> response.json())
        .then((data)=> this.setState({movies: data.results, selectedMovie: data.results[0] }))
        .catch((err)=> this.setState({error: err}))
        this.setState({isAuth: true})     
        }

        

        if(this.state.tranding == true) {
            this.setState({page:1})
            fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        .then((response)=> response.json())
        .then((data)=> this.setState({movies: data.results, selectedMovie: data.results[0] }))
        .catch((err)=>this.setState({error: err}))
        this.setState({tranding: false})
        this.setState({lastPage: 1})
        }

        if(this.state.button == true) {
            if(this.state.search_result > 0){
           const header = document.querySelector('.header')
           header.className='header fadeout'
           header.style.display='none'

           const movie = document.querySelector('.movie_div')
           movie.style.display='flex'

           const navbar = document.querySelector('.navbar')
           navbar.style.display='flex'

           const Buttons = document.querySelector('.Buttons')
           Buttons.clientWidth>=528?  Buttons.style.display='flex' : Buttons.style.display='block'
          
           const youtube_trailer = document.querySelector('.youtube_container')
           youtube_trailer.style.display='none'
            }
        }

        if(this.state.button == false) {
            if(this.state.search_result > 0) {
            const movie = document.querySelector('.movie_div')
            movie.style.display='none'
            const header = document.querySelector('.header')
            {document.body.clientWidth>=970?  header.style.display='flex': header.style.display='block' }
           
            header.className='header animation'

            const navbar = document.querySelector('.navbar')
           navbar.style.display='none'

           const Buttons = document.querySelector('.Buttons')
           Buttons.style.display='none'
            }
        }

        if(this.state.position != 1) {
            window.scrollTo({
                top: this.state.position,
                behavior: 'smooth',
            });
            this.setState({position: 1})
        }

        if(this.state.input_value != null) {
            this.setState({lastPage: 1})
            this.setState({page: 1})
            this.state.movies =[]
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=106b004999aac7f831125bd58d56d57d&query=${this.state.input_value}`)
            .then((response)=> response.json())
            .then((data)=> this.setState({movies: data.results, selectedMovie: data.results[0], search_result:data.total_results }) & console.log(data))
            .catch((err)=>this.setState({error: err.message}) & console.log('kekekee'))
            this.setState({input_value: null})
        }

        if(!this.state.indicator) {
            fetch(`https://api.themoviedb.org/3/movie/${this.state.selectedMovie.id}?api_key=${API_KEY}&append_to_response=videos`)
        .then((response)=> response.json())
        .then((data)=> this.setState({trailer: data.videos.results[0].key}))
        .catch((err)=>this.setState({error: err}))
        this.setState({indicator: true})
        }

       window.addEventListener('scroll', () => {
        if(window.scrollY > 200) {
            this.setState({Arrow_up: true})
            let btn_up = document.querySelector('.btn_to_top')
            btn_up.style.display='block'
        }
        else {
            this.setState({Arrow_up: false})
            let btn_up = document.querySelector('.btn_to_top')
            btn_up.style.display='none'
        }
       })

            
    }
    
    
   
  render() {
    
    return (
       <div className='app_container'>
         <div className="btn_to_top" onClick={()=> {
             window.scrollTo({
                top:0,
                behavior: 'smooth',
            });
         }}>
            <img src={Arrow} alt=""  />
        </div>
                <Navbar  tranding={(tranding)=> {this.setState({tranding:tranding})}}  logoClick={(logo => {this.setState({lastPage: logo})})} inputvalue={(input_value)=>{this.setState({input_value: input_value})}} ></Navbar>

        {this.state.search_result > 0 ?
        <div>
        
       <div className='movie_div'>
        {this.state.movies.map(movie => 
        <Movie currPos={first_Pos => {this.setState({first_Pos: first_Pos})}} button={button =>{this.setState({button})}}  selectMovie={selectedMovie=>{this.setState({selectedMovie})}} header={header} movies={movie}  key={movie.id}></Movie>
       
        )}
        
         
         </div>
         <div className='Buttons' id='btn'>
         <div className="previous" onClick={()=> {this.pageDecrement()
            this.setState({position: 0})}}>Previous</div>
         <div className="page">Page: {this.state.page} / {!this.state.lastPage? 500: 1}</div>
         <div className="next" onClick={()=>{
        
        this.pageIncrement()
        this.setState({position: 0})}}>Next</div>
         </div>

         
        <div className="header">
            <div className="button_close" onClick={()=> {this.setState({button: true}) 
         this.setState({position: this.state.first_Pos})} }>X</div>
            <div className="overlay_img"></div>
        <img className='image_poster' src={POSTER+this.state.selectedMovie.backdrop_path} alt="" />
        
        <div className="movie_info_container">
        <div className="img_poster">
            <img src={IMG_API + this.state.selectedMovie.poster_path} alt="" />
            
        </div>
        <div className="movie_description">
            <div className="movie_title"><div>{this.state.selectedMovie.title? this.state.selectedMovie.title: this.state.selectedMovie.name}</div> <br />
            <div className='movie_overview'><p>{this.state.selectedMovie.overview}</p></div></div>
            <div className="movie_info">
                <div className="lang">{this.state.selectedMovie.original_language}</div>
                <div className="release">{this.state.selectedMovie.release_date? this.state.selectedMovie.release_date: this.state.selectedMovie.first_air_date}</div>
                <div className="vote">Vote Average: {this.state.selectedMovie.vote_average}</div>
                <div className='trailer' onClick={()=> {this.show_yt()
                    this.setState({indicator: false})}}>Trailer</div>
            </div>
        </div>
        
        </div>
        </div>

        <div className='youtube_container'>
            <div className='btn_cls' onClick={()=> {
                let yt_container = document.querySelector('.youtube_container')
                yt_container.style.display='none'
                let yt = document.querySelector('.yt_app')
                this.setState({trailer:null})
            }}>Close</div>
            <div className="yt_area"> {document.body.clientWidth > 850?  <YouTube className='yt_app' videoId={this.state.trailer} opts={this.state.yt_options} ></YouTube> :<YouTube className='yt_app' videoId={this.state.trailer} opts={this.state.yt_options2} ></YouTube> }</div>
           
        </div>

       
           
         </div> 
         : <div className='err'>U pretrazi nismo pronasli zeljeni rezultat!</div>}
         </div>
    )
  }
}

export default App