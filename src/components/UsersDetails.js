import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './UsersDetails.css'

function UsersDetails() {
    const [users, setUsers] = useState([])
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

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
            <div className='detailsUsers text-white'>
                <h1 className='titleServices text-white my-5'>mes informations personnelles</h1>

                <div className='container'>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticLastname" className="col-3 col-md-2 col-form-label ">Nom</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticLastname"
                                placeholder={authParsed.user.lastName_u}
                                name="lastName_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticFirstname" className="col-3 col-md-2 col-form-label">Prénom</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticFirstname"
                                placeholder={authParsed.user.firstName_u}
                                name="firstName_u"
                                disabled

                            />
                        </div>
                    </div>


                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticEmail" className="col-3 col-md-2 col-form-label">Email</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="email"
                                className="form-control"
                                id="staticEmail"
                                placeholder={authParsed.user.email}
                                name="email"
                                disabled
                            />
                        </div>
                    </div>


                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticCompany" className="col-3 col-md-2 col-form-label">Entreprise</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticCompany"
                                placeholder={authParsed.user.company_u}
                                name="company_u"
                                disabled

                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticCompany" className="col-3 col-md-2 col-form-label">Siret</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticCompany"
                                placeholder={authParsed.user.siret_u}
                                name="siret_u"
                                disabled

                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticAddress" className="col-3 col-md-2 col-form-label">Adresse</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticAddress"
                                placeholder={authParsed.user.address_u}
                                name="address_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticAddress" className="col-3 col-md-2 col-form-label">Code Postale</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticAddress"
                                placeholder={authParsed.user.zipCode_u}
                                name="zipCode_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticAddress" className="col-3 col-md-2 col-form-label">Pays</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticAddress"
                                placeholder={authParsed.user.city_u}
                                name="city_u"
                                disabled
                            />
                        </div>
                    </div>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticPhone" className="col-3 col-md-2 col-form-label">Téléphone</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticPhone"
                                placeholder={authParsed.user.phone_u}
                                name="phone_u"
                                disabled

                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Link to='/updateuserdetails'>
                        <button
                            type="submit"
                            className="submitBox">modifier mes informations
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UsersDetails