import React from 'react'
import './navbar.css'
import Logo from './logo.png'
import Menu from './menu.png'
import { useState } from 'react'
import { useEffect } from 'react'


function Navbar(props) {
const [statemant, setStatement] = useState(true)
const [genre, setGenre] = useState([])
const [genre_action, setGenre_action] = useState(false)
const[category_indicator, setCategory_ind] = useState(null)

useEffect( function genres() {
  if(genre_action === false) {
    async function fetchGenre() {
      let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=106b004999aac7f831125bd58d56d57d&language=en-US')
      let data = await response.json()
      setGenre(data.genres)
      console.log(genre)
      setGenre_action(true)
    } 
    fetchGenre()
     
    }},[])
   


useEffect(
  () => {
    if(category_indicator) {
    document.querySelector('.category_items').style.display='block'  
    }
    else {
      document.querySelector('.category_items').style.display='none'  
    }
    
  }
)



  const fja = (e)=> {
    if(e.keyCode == 13) {
     let input_val = e.target.value
     console.log(input_val)
     if (input_val =='') {
     alert("Unesite zeljeni film") }
     else{
      props.inputvalue(input_val)
      let hamb_items = document.querySelector('.hamburger_items')
      hamb_items.style.display='none'
      e.target.value=''
      }
    }
  }
  return (
    <div className="navbar_container">
    <div className='navbar'>
        <div className="logo">
           <a href="/" onClick={()=> {props.logoClick(false) 
          props.tranding(null)}}> <img src={Logo} alt="" /> </a>
           <div className="items">
          <div onClick={()=> { props.tranding(null)}}><a href="/">Home</a></div>
          <div onClick={()=> {props.tranding(true)}}>Trending</div>
          <span className='category'>
            <div onClick={()=> {setCategory_ind(!category_indicator)}}>Category</div>
             <span className='category_items'>
           {genre.map((genr) => ( <span className='category_item' key={genr.id} value={genr.id}  data-id={genr.id} 
           onClick={()=>{props.movie_category(genr.id)
          props.movie_indicator(null)
          setCategory_ind(false)}}>{genr.name}</span> ))}
           </span>
           
            </span> 
         
        </div>
        </div>
        
        <div className="search">
            <input type="text" onKeyDown={(e)=>{fja(e)}} placeholder='Search' name="" id="movie_search" />
        </div>

        <div className="hamburger">
          <img src={Menu} alt="" onClick={()=>{
            let hamb_items = document.querySelector('.hamburger_items')
            hamb_items.style.display='flex'
          }}
           />
        </div>
    </div>
    <div className="hamburger_items">
    <div className="hamburger_search">
            <input type="text" onKeyDown={(e)=>{fja(e)}} placeholder='Search' name="" id="movie_search" />
        </div>
    <div onClick={()=> { props.tranding(null)}}><a href="/">Home</a></div>
          <div onClick={()=> {props.tranding(true) 
          let hamb_items = document.querySelector('.hamburger_items')
          hamb_items.style.display='none'}}>Trending</div>
        

         <div onClick={()=> {
        document.querySelector('.category_items_responsive').style.display='flex'
         }}>Category</div>


         <div className='close_hamburger' onClick={()=> {
          let hamb_items = document.querySelector('.hamburger_items')
          hamb_items.style.display='none'
          document.querySelector('.category_items_responsive').style.display='none'
         }}>Close</div>
    
    </div>

    <div className="category_items_responsive">
    {genre.map((genr) => ( <span className='cat_items' key={genr.id} value={genr.id}  data-id={genr.id} 
           onClick={()=>{props.movie_category(genr.id)
          props.movie_indicator(null)
          document.querySelector('.category_items_responsive').style.display='none'
          let hamb_items = document.querySelector('.hamburger_items')
          hamb_items.style.display='none'
          setCategory_ind(false)}}>{genr.name}</span> ))}
    </div>
    </div>
  )
}

export default Navbar