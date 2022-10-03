import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import './RegisterSection.css'


const UpdateUsersDetails = () => {

    const navigate = useNavigate()
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    //gere l'etat initial du formulaire
    const [formData, setFormData] = useState(
        {
            email: authParsed.user.email,
            firstName_u: authParsed.user.firstName_u,
            lastName_u: authParsed.user.lastName_u,
            company_u: authParsed.user.company_u,
            phone_u: authParsed.user.phone_u,
            address_u: authParsed.user.address_u,
            zipCode_u: authParsed.user.zipCode_u,
            city_u: authParsed.user.city_u,
            siret_u: authParsed.user.siret_u,
        }
    )

    //gere les changements d'etat du formulaire
    function handleInputChange(event) {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //gere la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault()
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${authParsed.user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authParsed.token}`
                },
                body: JSON.stringify(formData)
            })
            const userUpdate = await data.json()

            //parse le localstorage pour modifier user
            const user = JSON.parse(localStorage.getItem('user'))
            user.user = userUpdate.user

            //ajoute le user et remet le token dans le localstorage
            localStorage.setItem('user', JSON.stringify({ token: authParsed.token, user: userUpdate.user }))

            //redirection
            navigate('/dashboard')
        }
        fetchData()
    }


    return (
        <><div className='detailsUsers text-white '>
            <h1 className="titleServices my-5">Modifier mes informations</h1>
            <form onSubmit={event => handleSubmit(event)}>
                <div className='container'>

                    <div className='row mb-3 justify-content-center fs-5'>
                        <label htmlFor="staticLastname" className="col-3 col-md-2 col-form-label">Nom</label>
                        <div className="col-9 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="staticLastname"
                                placeholder={authParsed.user.lastName_u}
                                name="lastName_u"
                                value={formData.lastName_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.firstName_u}
                                onChange={event => handleInputChange(event)}
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
                                name="email"
                                value={formData.email}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.company_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.siret_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.address_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.zipCode_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.city_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.phone_u}
                                onChange={event => handleInputChange(event)}
                            />
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-center align-items-center">
                    <a
                        type="button"
                        className="submitBoxCancel"
                        href='/userdetails'
                    >Retour
                    </a>
                    <button
                        onClick={handleInputChange}
                        type="submit"
                        className="submitBox">sauvgarder
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdateUsersDetails