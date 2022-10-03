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
                <form className="testform" onSubmit={handleSubmit(onSubmit)}>
                <legend className="titleRegister">Formulaire inscription</legend>
                    <label>Votre nom :</label>
                    <input
                        className="inputBox"
                        placeholder="NOM"
                        {...register("lastName_u", {
                            required: true,
                            pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                        })}
                    />
                    {errors?.lastName_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.lastName_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}

                    <label>Votre prénom :</label>
                    <input
                        className="inputBox"
                        placeholder="PRÉNOM"
                        {...register("firstName_u", {
                            required: true,
                            pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                        })}
                    />
                    {errors?.firstName_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.firstName_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}
                
                    <label>Nom de votre entreprise :</label>
                    <input
                        className="inputBox"
                        placeholder="RAISON SOCIALE"
                        {...register("company_u", {
                            required: true,
                            pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                        })}
                    />
                    {errors?.company_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.company_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}

                    <label>Siret :</label>
                    <input
                        className="inputBox"
                        placeholder="SIRET"
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
                
                    <label>Adresse :</label>
                    <input
                    className="inputBox"
                    placeholder="ADRESSE"
                        {...register("address_u", {
                            required: true,
                            pattern: /^[A-Za-z0-9 -]+$/i
                        })}
                    />
                    {errors?.address_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.address_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}

                    <label>Code postale :</label>
                    <input
                    className="inputBox"
                    placeholder="CODE POSTALE"
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

                    <label>Ville :</label>
                    <input
                    className="inputBox"
                    placeholder="VILLE"
                        {...register("city_u", {
                            required: true,
                            pattern: /^[A-Za-zèéêëôàáâä -]+$/i
                        })}
                    />
                    {errors?.city_u?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.city_u?.type === "pattern" && (
                        <p className="text-error">Caractères alphabétiques uniquement</p>
                    )}

                    <label>Téléphone :</label>
                    <input
                    className="inputBox"
                    placeholder="TÉLÉPHONE"
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

                    <label>Adresse email :</label>
                    <input
                    className="inputBox"
                    placeholder="EMAIL"
                        {...register("email", {
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                        })}
                    />
                    {errors?.email?.type === "required" && <p className="text-error">Ce champs est requis.</p>}
                    {errors?.email?.type === "pattern" && (
                        <p className="text-error">Adresse email invalide.</p>
                    )}

                    <label>Mot de passe :</label>
                    <input
                    type='password'
                    className="inputBox"
                    placeholder="MOT DE PASSE"
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
                        className="inputBox"
                        placeholder="key"
                        {...register("key_r")
                        }
                    />
                    <div className="d-flex justify-content-center">
                        <input
                            className="submitBox"
                            type="submit"
                            />
                    </div>
                    </form>
            </div>
        </>
    )
}

export default RegisterSection