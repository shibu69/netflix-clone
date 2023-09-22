import React from 'react'
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import {ImSearch} from 'react-icons/im'

const Header = () => {
  return (
    <nav className='header'>
      <img src={logo} alt="NetFlix" />

      <div className='links'>
        <Link to='/tv_shows'> TV Shows</Link>
        <Link to='/movies'> Movies</Link>
        <Link to='/recently_added'>Recently Added</Link>
        <Link to='/my_list'> My List</Link>
      </div>

      <ImSearch/>
    </nav>
  )
}

export default Header
