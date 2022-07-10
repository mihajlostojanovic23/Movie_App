import React from 'react'
import './navbar.css'
import Logo from './logo.png'
import Menu from './menu.png'
import { useState } from 'react'


function Navbar(props) {
const [statemant, setStatement] = useState(false)

  const fja = (e)=> {
    if(e.keyCode == 13) {
     let input_val = e.target.value
     console.log(input_val)
     if (input_val =='') {
     alert("Unesite zeljeni film") }
     else{
      props.inputvalue(input_val)}
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
         
        </div>
        </div>
        
        <div className="search">
            <input type="text" onKeyDown={(e)=>{fja(e)}} placeholder='Search' name="" id="movie_search" />
        </div>

        <div className="hamburger">
          <img src={Menu} alt="" onClick={()=> {
            let hamb_items = document.querySelector('.hamburger_items')
            if(statemant) {
              hamb_items.style.display='flex'
              setStatement(false)
            }
            else {
              hamb_items.style.display='none'
              setStatement(true)
            }
          }} />
        </div>
    </div>
    <div className="hamburger_items">
    <div onClick={()=> { props.tranding(null)}}><a href="/">Home</a></div>
          <div onClick={()=> {props.tranding(true)}}>Trending</div>
         
    </div>
    </div>
  )
}

export default Navbar