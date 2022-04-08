import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import './Button.css'
import { BsCalendarWeek } from "react-icons/bs";
import { useCart } from "react-use-cart";


function Navbar() {
  const {
    isEmpty,
    totalItems
  } = useCart();
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
	  if (window.innerWidth <= 960) {
		  setButton(false)
	  } else {
		  setButton(true)
	  }
  }

  useEffect(() => {
	  showButton()
  }, [])

  window.addEventListener('resize', showButton)

  const auth = localStorage.getItem('user')
  // const authParsed = JSON.parse(auth);
  const navigate = useNavigate()
  const logOut = () => {
	  localStorage.clear()
	  navigate('/')
    alert('Vous avez bien été déconnecté !')
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
                  <li className='nav-item'>
                    <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                      Aperçu
                    </Link>
                  </li>
                  

					{
						auth ? <li><Link className='nav-links' onClick={logOut} to='/'>DÉCONNEXION</Link></li>
						:
						<>
						<li><Link className='hiddenbtn' to='/sign-up'><button className='btnSignUp'>INSCRIPTION</button></Link></li>
						<li><Link className='hiddenbtn' to='/sign-in'><button className='myBtn'>CONNEXION</button></Link></li>
						</>
					}

          			{
						auth ? <li><Link className='nav-links' to='/dashboard'>MON COMPTE</Link></li>
						:
						<>
						</>
					}


				          <li className='nav-item'>
                    <Link to='/cart' className='nav-links position-relative' onClick={closeMobileMenu}>
                      <BsCalendarWeek />
                      <span className={isEmpty ? 'd-none' : 'notEmpty'}>{totalItems}</span>
                    </Link>
                  </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar