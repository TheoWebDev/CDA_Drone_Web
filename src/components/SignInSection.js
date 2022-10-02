
import React, { useState } from "react"
import '../App.css'
import './RegisterSection.css'
import { useNavigate } from "react-router-dom"
import { useGlobalState } from '../App'
import { notify, ToastRenderer } from '../components/ToastNotification'
import { useForm } from "react-hook-form";

const SignInSection = () => {
    const [state, dispatch] = useGlobalState()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState({
        data: 'Email ou mot de passe incorrect',
        type: 'error'
    })
    
    const onSubmit = async (data) => {
        try {
            const login = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await login.json()
            const hasError = result.status != null && result.status !== 'Connexion réussie'

            if (hasError) {
                localStorage.removeItem('user')
                dispatch({ auth: false })
                setMessage({
                    data: 'Email ou mot de passe incorrect',
                    type: 'error'
                })
                toastCall(message.type)
            } else {
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

    // Genere un toast selon l'etat du formulaire
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>EMAIL</label>
                        <input
                            className="inputBox"
                            {...register("email", {
                            required: true,
                            maxLength: 20,
                            })}
                        />
                        {errors?.email?.type === "required" && <p>Champs requis</p>}
                        {/* {errors?.email?.type === "pattern" && (
                            <p>Adresse email non valide</p>
                        )} */}
                        <label>PASSWORD</label>
                        <input
                            className="inputBox"
                            type='password'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {/* {errors?.password?.type === "pattern" && (
                            <p>Mot de passe non valide</p>
                        )} */}
                         <div className="d-flex justify-content-center">
                             <input
                                className="submitBox"
                                type="submit"
                            />
                        </div>
                    </form>
                    </div>
                </div>
                <ToastRenderer />
            </div>
        </>
    )
}

export default SignInSection