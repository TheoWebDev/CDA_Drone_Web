import React from "react"
import '../App.css'
import './RegisterSection.css'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";


const RegisterSection = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        result = await result.json()
        if (result) {
            localStorage.setItem('user', JSON.stringify(result))
            alert('Compte crée avec succès. Connectez-vous dès à présent !')
            navigate('/sign-in')
        } else {
            alert("Une erreur est servenue, veuillez réessayer")
            navigate('/')
        }
    }

    return (
        <>
            <div className="signup-container ">
            <h2 className="titleRegister">Formulaire inscription</h2>

                <form className="testform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-wrap">
                        <div>
                            <label className="form-label">Votre nom</label>
                            <input
                                className="form-control mb-2 w-auto me-3"
                                {...register("lastName_u", {
                                    required: true,
                                    pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                                })}
                            />
                            {errors?.lastName_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                            {errors?.lastName_u?.type === "pattern" && (
                                <p className="text-error">Caractères alphabétiques uniquement</p>
                            )}
                        </div>
                        <div>
                            <label className="form-label">Votre prénom</label>
                            <input
                                className="form-control mb-2 w-auto me-2"
                                {...register("firstName_u", {
                                    required: true,
                                    pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                                })}
                            />
                            {errors?.firstName_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                            {errors?.firstName_u?.type === "pattern" && (
                                <p className="text-error">Caractères alphabétiques uniquement</p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        <div>
                        <label className="form-label">Nom de votre entreprise</label>
                        <input
                            className="form-control mb-2 w-auto me-3"
                            {...register("company_u", {
                                required: true,
                                pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                            })}
                        />
                        {errors?.company_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                        {errors?.company_u?.type === "pattern" && (
                            <p className="text-error">Caractères alphabétiques uniquement</p>
                        )}
                    </div>  
                    <div>
                        <label className="form-label">Siret</label>
                        <input
                            className="form-control mb-2 w-auto me-2"
                            {...register("siret_u", {
                                required: true,
                                minLength: 14,
                                maxLength: 14,
                                pattern: /^[0-9]+$/i
                            })}
                        />
                        {errors?.siret_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                        {errors?.siret_u?.type === "minLength" && (
                            <p className="text-error">Numéro de SIRET invalide</p>
                        )}
                        {errors?.siret_u?.type === "maxLength" && (
                            <p className="text-error">Numéro de SIRET invalide</p>
                        )}
                        {errors?.siret_u?.type === "pattern" && (
                            <p className="text-error">Caractères alphabétiques uniquement</p>
                        )}
                    </div>
                </div>
                
                            <label className="form-label">Adresse</label>
                            <input
                            className="form-control mb-2"
                                {...register("address_u", {
                                    required: true,
                                    pattern: /^[A-Za-z0-9 -]+$/i
                                })}
                            />
                            {errors?.address_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                            {errors?.address_u?.type === "pattern" && (
                                <p className="text-error">Caractères alphabétiques uniquement</p>
                            )}
                    <div className="d-flex flex-wrap">
                        <div>
                            <label className="form-label">Code postal</label>
                            <input
                            className="form-control mb-2 w-auto me-3"
                                {...register("zipCode_u", {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 5,
                                    pattern: /^[0-9]+$/i
                                })}
                            />
                            {errors?.zipCode_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                            {errors?.zipCode_u?.type === "minLength" && (
                                <p className="text-error">Code postale invalide</p>
                            )}
                            {errors?.zipCode_u?.type === "maxLength" && (
                                <p className="text-error">Code postale invalide</p>
                            )}
                            {errors?.zipCode_u?.type === "pattern" && (
                                <p className="text-error">Caractères alphabétiques uniquement</p>
                            )}
                        </div>
                        <div>
                    <label className="form-label">Ville</label>
                    <input
                    className="form-control mb-2 w-auto me-2"
                        {...register("city_u", {
                            required: true,
                            pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                        })}
                    />
                    {errors?.city_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.city_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}
                    </div>
                    </div>

                    <label className="form-label">Téléphone</label>
                    <input
                    className="form-control mb-2 w-auto"
                        {...register("phone_u", {
                            required: true,
                            minLength: 10,
                            maxLength: 10,
                            pattern: /^[0-9]+$/i
                        })}
                    />
                    {errors?.phone_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.phone_u?.type === "minLength" && (
                        <p className="text-error">Numéro de téléphone invalide.</p>
                    )}
                    {errors?.phone_u?.type === "maxLength" && (
                        <p className="text-error">Numéro de téléphone invalide.</p>
                    )}
                    {errors?.phone_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}

                    <label className="form-label">Adresse email</label>
                    <input
                    className="form-control mb-2"
                        {...register("email", {
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                        })}
                    />
                    {errors?.email?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.email?.type === "pattern" && (
                        <p className="text-error">Adresse email invalide.</p>
                    )}

                    <label className="form-label">Mot de passe</label>
                    <input
                    type='password'
                    className="form-control mb-2 w-auto"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors?.password?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.password?.type === "minLength" && (
                        <p className="text-error">Minimum 8 caractères.</p>
                    )}

                    <input
                        value={3}
                        type='hidden'
                        className="form-control mb-2"
                        {...register("key_r")
                        }
                    />
                        <button className="submitBox w-100 mt-3"
                            type="submit">
                            Inscription
                            </button>
                            
                    </form>
            </div>
        </>
    )
}

export default RegisterSection