import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParallax } from 'react-scroll-parallax'

import './UsersDetails.css'

function UsersDetails() {
    const [users, setUsers] = useState([])
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)
    const { ref } = useParallax({ speed: -10 })
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}users/${authParsed.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authParsed.token}`
                }
            })
            const user = await data.json()
            setUsers(user)
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='detailsUsers '>
                <div className='hero'>
                    <div className="hero_overlay" ref={ref}>
                        <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                    </div>
                    <h1 className='titleDrone'>mes informations personnelles</h1>
                </div>
                <div className='container my-5'>
                    <div className=" d-flex flex-wrap">
                        <div className="me-3 mb-3">
                            <label htmlFor="lastName" className="form-label">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder={authParsed.user.lastName_u}
                                name="lastName_u"
                                disabled
                            />
                        </div>
                        <div className='me-3 mb-3'>
                            <label htmlFor="firstName" className="form-label">Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder={authParsed.user.firstName_u}
                                name="firstName_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className=" d-flex flex-wrap">
                        <div className="me-3 mb-3">
                            <label htmlFor="email" className="form-label">Adresse mail</label>
                            <input
                                    type="email"
                                    className="form-control w-auto"
                                    id="email"
                                    name="email"
                                    value={authParsed.user.email}
                                    disabled
                                />
                        </div>
                        <div className="me-3 mb-3">
                            <label htmlFor="phone" className="form-label">Téléphone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                placeholder={authParsed.user.phone_u}
                                name="phone_u"
                                disabled
                            />
                        </div>
                    </div>


                    <div className=" d-flex flex-wrap">
                        <div className="mb-3  me-3">
                            <label htmlFor="comanyName" className="form-label">Nom de l'entreprise</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comanyName"
                                placeholder={authParsed.user.company_u}
                                name="company_u"
                                disabled
                            />
                        </div>
                        <div className="mb-3 me-3">
                            <label htmlFor="siret" className="form-label">Siret de l'entreprise</label>
                            <input
                                type="text"
                                className="form-control"
                                id="siret"
                                placeholder={authParsed.user.siret_u}
                                name="siret_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className=" d-flex flex-wrap">
                        <div className="mb-3 me-3">
                            <label htmlFor="address" className="form-label">Adresse</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder={authParsed.user.address_u}
                                name="address_u"
                                disabled
                            />
                        </div>
                        <div className="mb-3 me-3">
                            <label htmlFor="zipcode" className="form-label">Code postale</label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipcode"
                                placeholder={authParsed.user.zipCode_u}
                                name="zipCode_u"
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Ville</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                placeholder={authParsed.user.city_u}
                                name="city_u"
                                disabled
                            />
                        </div>
                    </div>
                        <Link to='/updateuserdetails'>
                            <button
                                type="submit"
                                className="submitBox mt-3">modifier mes informations
                            </button>
                        </Link>
                </div>
            </div>
        </>
    )
}

export default UsersDetails