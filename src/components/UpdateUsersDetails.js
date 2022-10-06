import React, { useState } from 'react'
import { useParallax } from 'react-scroll-parallax'
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
    const { ref } = useParallax({ speed: -10 })
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
        <><div className='detailsUsers '>
            <div className='hero'>
                    <div className="hero_overlay" ref={ref}>
                        <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                    </div>
                    <h1 className='titleDrone'>mes informations personnelles</h1>
                </div>
            <form onSubmit={event => handleSubmit(event)}>
                <div className='container my-5'>
                <div className="userContainer">
                    <div className=" d-flex flex-wrap">
                        <div className="me-3 mb-3">
                            <label htmlFor="lastName" className="form-label">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder={authParsed.user.lastName_u}
                                name="lastName_u"
                                value={formData.lastName_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.firstName_u}
                                onChange={event => handleInputChange(event)}
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
                                    value={formData.email}
                                    onChange={event => handleInputChange(event)}
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
                                value={formData.phone_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.company_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.siret_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.address_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.zipCode_u}
                                onChange={event => handleInputChange(event)}
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
                                value={formData.city_u}
                                onChange={event => handleInputChange(event)}
                            />
                        </div>
                    </div>

                    <div className="d-flex  align-items-center mt-3">
                    <a
                        type="button"
                        className="submitBox submitBoxCancel me-3"
                        href='/userdetails'
                    >Retour
                    </a>
                    <button
                        onClick={handleInputChange}
                        type="submit"
                        className="submitBox">sauvgarder
                    </button>
                </div>
                 
                </div>
                </div>


                
            </form>
        </div>
        </>
    )
}

export default UpdateUsersDetails