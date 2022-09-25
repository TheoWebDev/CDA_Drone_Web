
import React, { useState } from "react"
import '../App.css'
import './RegisterSection.css'
import { useNavigate } from "react-router-dom"
import { useGlobalState } from '../App'
import { notify, ToastRenderer } from '../components/ToastNotification'

const SignInSection = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [state, dispatch] = useGlobalState()
    const [message, setMessage] = useState({
        data: 'Email ou mot de passe incorrect',
        type: 'error'
    })
    const [validForm, setValidForm] = useState(true)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await fetch(`http://127.0.0.1:3000/api/v1/login`, {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await login.json()
            const hasError = result.status != null && result.status !== 'Connexion réussie'

            if (hasError) {
                localStorage.removeItem('user')
                dispatch({ auth: false })
                setValidForm(true)
                setMessage({
                    data: 'Email ou mot de passe incorrect',
                    type: 'error'
                })
                toastCall(message.type)
            }
            else {
                localStorage.setItem('user', JSON.stringify(result))
                dispatch({ auth: true })
                setMessage({
                    data: result.message,
                    type: 'success'
                })
                toastCall(message.type)
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }



    /**
     * Genere un toast selon l'etat du formulaire
     */
    const toastCall = (messageData, messageType) => {
        messageData = message.data
        messageType = message.type
        notify(messageData, messageType)
    }

    return (
        <>
            <div className="signin-container">
                <div className="test">
                    <h1 className="titleRegister">S'identifier</h1>
                    <div className="inputLoginTest">
                        <input
                            className="inputBox form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder="EMAIL"
                            required
                        />
                        <input
                            className="inputBox"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder="MOT DE PASSE"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center pt-5">
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="submitBox">
                            CONNEXION
                        </button>
                    </div>
                </div>
                <ToastRenderer />
            </div>
        </>
    )
}

export default SignInSection