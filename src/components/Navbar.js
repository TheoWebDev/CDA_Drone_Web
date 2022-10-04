import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import './Button.css'
import { BsCart } from "react-icons/bs"
import { useCart } from "react-use-cart"
import { useGlobalState } from '../App'

const Navbar = () => {
  const navigate = useNavigate()
  const { isEmpty, totalItems } = useCart()
  const [click, setClick] = useState(false)
  const [, setButton] = useState(true)
  const [state, dispatch] = useGlobalState()
  const auth = localStorage.getItem('user')
  const authParsed = JSON.parse(auth)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  window.addEventListener('resize', showButton)
  const logOut = () => {
    localStorage.clear()
    dispatch({ auth: false })
    navigate('/')
  }

  //capitalize the first letter
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <>
      <nav className='myNavbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <span className="colorCompany">SKY</span>'DR<span className="colorCompany">O</span>NE
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Accueil
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                Drones
              </Link>
            </li>
            {
              state.auth ?
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <Link className='nav-links dropdown-toggle' to='/dashboard' id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Bonjour, {capitalize(authParsed.user.firstName_u ? authParsed.user.firstName_u : null)}</Link>
                      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><a href='/Dashboard' className='dropdown-item nav-links'>Mon compte</a></li>
                        <li><a href='/orders' className='dropdown-item nav-links'>Mes commandes en cours</a></li>
                        <li><a href='/ordershistory' className='dropdown-item nav-links'>Historique des commandes</a></li>
                        <li><a href='/userdetails' className='dropdown-item nav-links'>Gérer mes informations</a></li>
                        <li><a href='/' onClick={logOut} className='dropdown-item nav-links'>Déconnexion</a></li>
                      </ul>
                    </li>
                  </ul>
                  <li className='nav-item'>
                    <Link to='/cart' className='nav-links position-relative' onClick={closeMobileMenu}>
                      <BsCart />
                      <span className={isEmpty ? 'd-none' : 'notEmpty'}>{totalItems}</span>
                    </Link>
                  </li>
                </>
                :
                <>
                  <li><Link className='hiddenbtn' to='/sign-up'><button className='btnRegister'>Inscription</button></Link></li>
                  <li><Link className='hiddenbtn' to='/sign-in'><button className='myBtn'>Connexion</button></Link></li>
                  
                </>
            }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar