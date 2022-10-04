import React, { useState, useEffect } from 'react'
import './UsersDetails.css'
import { formatDate, getDays, removeDay } from './helper'


function UserOrders() {
    const [orders, setOrders] = useState([])
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/user/${authParsed.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authParsed.token}`
                }
            })
            const allOrders = await data.json()
            setOrders(allOrders)
        }
        fetchData()
    }, [authParsed.token, authParsed.user._id])

    if (orders) {
        return (
            <>
            <div className='hero'>
                <div className="hero_overlay">
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>Réservation en cours</h1>
            </div>
            
            {orders.length > 0 ?
                <div className="container mt-3">
                    <ul className='d-flex flex-column'>
                        {
                            orders.map(order => (
                                order.state_o === 'En attente de validation' ?
                                    <li className='d-flex flex-column card' key={order._id}>
                                        <div className='flex-row'>
                                            <div className='flex-column'>
                                                <h2 className='text-uppercase text-center'>{order.drone_id.name_d}</h2>
                                                <div className="item_image_history">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-5'>
                                                    <p> État : <span className='text-warning' > {order.state_o}</span></p>
                                                    <p>Merci pour votre demande de réservation!</p>
                                                    <p> Votre demande est actuellement à l'étude par nos équipes. Nous vous informerons de son status très prochainement sur cette page.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                    <div className='d-flex justify-content-between'>
                                                        <p>Pour toute autre demande, vous pouvez <a href="/">nous contacter</a></p>
                                                        <p>Dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''}.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                : order.state_o === 'Acceptée' ?
                                    <li className='d-flex flex-column card' key={order._id}>
                                        <div className='flex-row'>
                                            <div className='flex-column'>
                                                <h2 className='text-uppercase text-center'>{order.drone_id.name_d}</h2>
                                                <div className="item_image_history">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-5'>
                                                    <p>État : <span className='text-success'> {order.state_o}</span></p>
                                                    <p>Votre demande de réservation a été acceptée par notre équipe. Votre commande vous sera livré au plus tard le {formatDate(removeDay(order.startAt_o, 1))} à l'adresse suivante :</p>
                                                    <p>
                                                        {authParsed.user.firstName_u} <br />
                                                        {authParsed.user.company_u} <br />
                                                        {authParsed.user.address_u} <br />
                                                        Tel : {authParsed.user.phone_u} <br />
                                                    </p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                    <div className='d-flex justify-content-between'>
                                                        <p>Pour toute autre demande, vous pouvez <a href="/">nous contacter</a></p>
                                                        <p>Dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''}.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                : order.state_o === 'Rejetée' ?
                                    <li className='d-flex flex-column list-group-item' key={order._id}>
                                        <div className='d-flex flex-row'>
                                            <div className='d-flex flex-column'>
                                                <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                <div className="item_image">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-5'>
                                                    <p>État : <span className='text-danger'> {order.state_o}</span></p>
                                                    <p>Veuillez <a href='/'> nous contacter</a> pour plus de détails.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                : order.state_o === 'En cours' ?
                                    <li className='d-flex flex-column list-group-item' key={order._id}>
                                        <div className='d-flex flex-row'>
                                            <div className='d-flex flex-column'>
                                                <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                <div className="item_image">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-5'>
                                                    <p>État : <span className='text-info'> {order.state_o}</span></p>
                                                    <p>Il reste {getDays(Date.now(), order.endAt_o)} jours de location.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                </div>    
                                            </div>
                                        </div>
                                    </li>
                                : order.state_o === 'Terminée' ?
                                    null
                                :
                                    <li className='d-flex flex-column list-group-item' key={order._id}>
                                        <div className='d-flex flex-row'>
                                            <div className='d-flex flex-column'>
                                                <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                <div className="item_image">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-5'>
                                                    <p>État : <span className='text-danger'> {order.state_o}</span></p>
                                                    <p>Un probleme est survenu, nous allons vous contacter dans les plus brefs délais.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    :
                    <div className='container'>
                        <h1 className='text-center pt-5'>Aucune réservation en cours</h1>
                    </div>
                })
            </>
        )
    }
    else {
        return (
            <div className='container'>
                <h1 className='text-center pt-5'>Aucune réservation en cours</h1>
            </div>
        )
    }
}
export default UserOrders