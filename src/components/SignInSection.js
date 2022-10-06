
import React, { useState } from "react"
import '../App.css'
import './RegisterSection.css'
import { useNavigate } from "react-router-dom"
import { useGlobalState } from '../App'
import { notify, ToastRenderer } from '../components/ToastNotification'
import { useForm } from "react-hook-form"

const SignInSection = () => {
    const [, dispatch] = useGlobalState()
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
            <div className="signup-container ">
            <h2 className="titleRegister">Connexion</h2>
                <form className="testform" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-label">Adresse email</label>
                    <input
                    className="form-control mb-2"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors?.email?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    <div className="d-flex justify-content-between align-items-end">
                        <label className="form-label">Mot de passe</label>
                        <a href="#" className="forgot"><p className="form-label">oublié ?</p></a>
                    </div>
                    <input
                    type='password'
                    className="form-control mb-2"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors?.password?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                        
                    <div className="d-flex justify-content-center">
                            <button type="submit" className="submitBox mt-3 w-100">Connexion</button>
                    </div>
                    
                </form>
                <ToastRenderer />
            </div>
        </>
    )
}

export default SignInSection