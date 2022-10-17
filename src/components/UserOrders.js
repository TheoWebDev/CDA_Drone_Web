import React, { useState, useEffect } from 'react'
import { formatDate, getDays, removeDay, getDaysBetweenTwoDates } from './helper'
import './UsersDetails.css'


function UserOrders() {
    const [orders, setOrders] = useState('')
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)
    const [orderActive, setOrderActive] = useState(0)

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
    }, [])
    let order = orders[orderActive]

    const totalPrice = (date1, date2, price) => {
        let totalDays = getDaysBetweenTwoDates(date1, date2)
        return price * totalDays
    }

        return (
            <>
            <div className='hero'>
                <div className="hero_overlay">
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>Réservation en cours</h1>
            </div>
            
                <div className="container my-3 d-flex align-items-center justify-content-center flex-grow-1">
                    {orders ?
                    <div className="orderContainer row no-gutters d-flex flex-row align-items-start">
                        <div className="col-sm-4 leftSide">
                            <ul>
                            {orders.map((order, key )=> (
                                <li key={order._id} className={"miniOrder " + (orderActive == key ? "panel-active" : '')} onClick={e => setOrderActive(key)}>
                                    <h3 className='text-uppercase'>{order.drone_id.name_d}</h3>
                                    <p> <span>Date:</span> {formatDate(order.createdAt)} <span >Total: </span>{totalPrice(order.startAt_o, order.endAt_o, order.drone_id.pricePerDay_d)}€</p>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <ul className='d-flex flex-column rightSide col-sm-8'>
                        { order.state_o === 'En attente de validation' ?
                                    <li className='d-flex flex-column' key={order._id}>
                                        <div className='flex-row'>
                                            <div className='flex-column'>
                                                <h2 className='text-uppercase text-center'>{order.drone_id.name_d}</h2>
                                                <div className="item_image_history">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-6'>
                                                    <p> État : <span className='text-warning' > {order.state_o}</span></p>
                                                    <p>Merci pour votre demande de réservation!</p>
                                                    <p> Votre demande est actuellement à l'étude par nos équipes. Nous vous informerons de son status très prochainement sur cette page.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                    <div className='d-flex justify-content-between flex-wrap'>
                                                        <p>Pour toute autre demande, vous pouvez <a href="/">nous contacter</a></p>
                                                        <p>Dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''}.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                : order.state_o === 'Acceptée' ?
                                    <li className='d-flex flex-column' key={order._id}>
                                        <div className='flex-row'>
                                            <div className='flex-column'>
                                                <h2 className='text-uppercase text-center'>{order.drone_id.name_d}</h2>
                                                <div className="item_image_history">
                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                </div>
                                                <div className='fs-6'>
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
                                                    <div className='d-flex justify-content-between  flex-wrap'>
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
                                                <div className='fs-6'>
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
                                                <div className='fs-6'>
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
                                                <div className='fs-6'>
                                                    <p>État : <span className='text-danger'> {order.state_o}</span></p>
                                                    <p>Un probleme est survenu, nous allons vous contacter dans les plus brefs délais.</p>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                }
                        </ul>
                        </div>
                    :
                    <div className='container'>
                        <h1 className='text-center'>Aucune réservation en cours</h1>
                    </div>
                }
                </div>

            </>
        )
    }
export default UserOrders