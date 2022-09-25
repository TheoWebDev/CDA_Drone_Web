import React, { useState } from "react"
import '../App.css'
import './RegisterSection.css'

import { useNavigate } from "react-router-dom"
import PasswordChecklist from "react-password-checklist"


const RegisterSection = () => {
    // const regexMail = /^[a-z0-9.-]+[@]{1}[a-z0-9.-]+[.]{1}[a-z]{2,4}$/
    const [lastName_u, setLastName] = useState('')
    const [firstName_u, setFirstName] = useState('')
    const [company_u, setCompany] = useState('')
    const [phone_u, setPhone] = useState('')
    const [address_u, setAdress] = useState('')
    const [zipCode_u, setZipCode] = useState('')
    const [country_u, setCountry] = useState('')
    const [siret_u, setSiret] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [key_r, setKey_r] = useState('3')
    const navigate = useNavigate()

    const collectData = async () => {
        let result = await fetch(`http://127.0.0.1:3000/api/v1/signup`, {
            method: 'post',
            body: JSON.stringify(
                {
                    lastName_u,
                    firstName_u,
                    company_u,
                    phone_u,
                    address_u,
                    zipCode_u,
                    country_u,
                    siret_u,
                    email,
                    password,
                    key_r
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        result = await result.json()
        if (result) {
            localStorage.setItem('user', JSON.stringify(result))
            alert('Votre compte a été crée avec succès !')
            navigate('/dashboard')
        } else {
            alert("NOPE")
            navigate('/')
        }
    }



    return (
        <>
            <div className="signup-container ">
                <h1 className="titleRegister">N'y allons pas par 4 chemins</h1>
                <div className="background d-flex justify-content-center">
                    <div className="inputLogin">
                        <input
                            className="inputBox"
                            name="lastName_u"
                            type='text'
                            value={lastName_u}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Votre Nom"
                        />
                        <input
                            className="inputBox"
                            name="firstName_u"
                            type='text'
                            value={firstName_u}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Votre Prénom"
                        />
                    </div>
                    <div className="inputLogin">
                        <input
                            className="inputBox"
                            name="company_u"
                            type='text'
                            value={company_u}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Raison sociale de l'entreprise"
                        />
                        <input
                            className="inputBox"
                            name="siret_u"
                            type='text'
                            value={siret_u}
                            onChange={(e) => setSiret(e.target.value)}
                            placeholder="SIRET"
                        />
                    </div>
                    <div className="inputLogin">
                        <input
                            className="inputBox"
                            type='text'
                            value={address_u}
                            name="address_u"
                            onChange={(e) => setAdress(e.target.value)}
                            placeholder="Adresse de votre entreprise"
                        />
                        <input
                            className="inputBox"
                            type='text'
                            value={zipCode_u}
                            name="zipCode_u"
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="CP"
                        />
                        <input
                            className="inputBox"
                            type='text'
                            value={country_u}
                            name="country_u"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Pays"
                        />
                    </div>
                    <div className="inputLogin">
                        <input
                            className="inputBox"
                            name="phone_u"
                            type='text'
                            value={phone_u}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Téléphone"
                        />
                        <input
                            className="inputBox"
                            name="email"
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresse e-mail"
                        />
                    </div>
                    <div className="inputLogin">
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="inputBox text-center"
                            placeholder="Mot de passe"
                        />
                        <input
                            type="password"
                            onChange={e => setPasswordAgain(e.target.value)}
                            className="inputBox"
                            placeholder="Confirmation mot de passe"
                        />
                        <input
                            type="hidden"
                            onChange={e => setKey_r(e.target.value)}
                        />

                    </div>
                </div>
                <PasswordChecklist
                    className="text-white d-flex flex-column align-items-center fs-5 mt-4"
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => { }}
                    messages={{
                        minLength: "Longueur de 8 caractères minimum.",
                        specialChar: "Un caractère spécial.",
                        number: "Un chiffre.",
                        capital: "Une lettre majuscule.",
                        match: "Match parnis les deux ;)"
                    }}
                />
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        onClick={collectData}
                        className="submitBox">pret à voler
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegisterSection