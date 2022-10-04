import React from 'react'
import './ProductPage.css'
import { useCart } from "react-use-cart"
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { addDays } from 'date-fns'
import { useState, useEffect } from 'react'
import * as locales from 'react-date-range/dist/locale'
import Modal from 'styled-react-modal'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

function toBase64(arr) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(
		arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
	)
}

const handleDragStart = (e) => e.preventDefault()

const ProductPage = ({ drone }) => {
	const [image, setImage] = useState([])
	const [load, setLoad] = useState(true)

	
	useEffect(() => {
		let arrImg = []
		fetch(`${process.env.REACT_APP_BASE_URL}/images/` + drone._id)
			.then(response => response.json())
			.then(data => {
				for (const element of data) {
					const url = `data:image/png;base64,${toBase64(element.img.data)}`
					arrImg.push(<img src={url} onDragStart={handleDragStart} alt="presentation" />)
				}
				setLoad(false)

			})

		setImage(arrImg)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const {
		items,
		updateItem
	} = useCart()

	const [state, setState] = useState({
		unique: true,
		change: null,
		selection: {
			startDate: new Date(),
			endDate: addDays(new Date(), 5),
			key: 'selection',
			showPreview: false,
			color: '#40be40',
		},
		compare: {
			startDate: new Date(),
			endDate: addDays(new Date(), 2),
			key: 'compare',
			showDateDisplay: false,
			autoFocus: false,
			color: '#FFE53B'
		},
	})
	
	useEffect(() => {
		items.forEach(item => {
			if (item._id === drone._id) {
				setState(prevState => ({
					...prevState,
					unique: false,
					selection: {
						...prevState.selection,
						startDate: new Date(item.startDate),
						endDate: new Date(item.endDate)
					}
				}))
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		drone.startDate = state.selection.startDate
		drone.endDate = state.selection.endDate
		items.forEach(item => {
			if (item._id === drone._id) {
				setState(prevState => ({
					...prevState,
					unique: false
				}))
			}
		})
	}, [state.selection])

	drone.id = drone._id
	drone.price = drone.pricePerDay_d

	const { addItem } = useCart()
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')

	let totalDay = (state.selection.endDate - state.selection.startDate) / (1000 * 60 * 60 * 24) + 1
	let startDate = state.selection.startDate ? state.selection.startDate.toLocaleDateString() : ''
	let endDate = state.selection.endDate ? state.selection.endDate.toLocaleDateString() : ''
	let locations = [[state.compare.startDate, state.compare.endDate]]

	const [isOpen, setIsOpen] = useState(false)
	const [modalSettings, setModalSettings] = useState({
		text: '',
		color: '',
		icon: null,
		state: ''
	})


	useEffect(() => {
		locations.forEach(loc => {
			if ((loc[0] > state.selection.endDate && loc[1] > state.selection.endDate) || (loc[0] < state.selection.startDate && loc[1] < state.selection.startDate)) {
				modalSettings.text = 'Votre drone a bien été ajouté au panier'
				modalSettings.color = '#40be40'
				modalSettings.icon = <BsFillCheckCircleFill />
				modalSettings.state = true
			} else {
				modalSettings.text = 'Date non disponible'
				modalSettings.color = 'red'
				modalSettings.icon = <BsFillXCircleFill />
				modalSettings.state = false
			}
		})
	}, [state.selection])

	function isValidDate() {
		toggleModal()
		if (modalSettings.state && state.unique) {
			addItem(drone)
		} else {
			updateItem(drone.id, drone)
		}
	}

	const StyledModal = Modal.styled`
		width: 20rem;
		height: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		border-radius: 0.5rem;
		border: none;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		background-color: white;
		.logo {
			font-size: 3rem;
			color: #40be40;
		}
		`

	function toggleModal(e) {
		setIsOpen(!isOpen)
	}

	return (
		<div className="cards_container m-auto d-flex my-5">
			<div className="productCarousel" >
			{load ?
				<ContentLoader
					height={200}
					backgroundColor="#f3f3f3"
					foregroundColor="#dddddd"
				>
					<rect x="30" y="30" rx="0" ry="0" width="100%" height="300" />
				</ContentLoader>
			:
				<AliceCarousel
					mouseTracking
					autoPlay
					infinite
					disableDotsControls
					disableButtonsControls
					autoPlayInterval={2000}
					animationDuration={1000}
					responsive={{
						0: { items: 1 },
						600: { items: 1 },
						1000: { items: 1 },
					}}
					items={image} />
			}
			</div>
			<div className="productDesc"  >
				<div className="cards__item__info">
					<h5 className="cards__item__text d-flex">{drone.name_d} <span className='ms-auto'>Catégorie : {category.name_cat ?? 'Inconnu'}</span></h5>
					<hr></hr>
					<p className="cards__item__desc">{drone.description_d}</p>
					<footer className='d-flex align-items-center'>
						<span className="cards__item__price">{drone.pricePerDay_d}€/jour</span>
						<span className="cards__item__dispo ms-auto">Drone Disponible</span>
						<span className="cards__item__res ms-2">Drone Réservé</span>
					</footer>
					{state.change &&
						<div className="total mt-3">
							<p><span className='fw-bold'>Période :</span> {startDate} au {endDate} </p>
							<p><span className='fw-bold'>Total :</span> {totalDay} {totalDay > 1 ? 'jours' : 'jour'}</p>
							<p><span className='fw-bold'>Prix Total :</span> {drone.pricePerDay_d * totalDay} €</p>
						</div>
					}
					<button className="btnRegister  mt-3" disabled={!state.change} onClick={() => isValidDate()}>Réserver</button>
					<StyledModal
						isOpen={isOpen}
						onBackgroundClick={toggleModal}
						onEscapeKeydown={toggleModal}>
						<div className='logo'>{modalSettings.icon}</div>
						<span>{modalSettings.text}</span>
						<div className='d-flex w-100'>
							<Link to="/cart" className='btn btn-outline-primary'>Acceder au panier</Link>
							<button className='btn btn-outline-secondary ms-auto' onClick={toggleModal}>Fermer</button>
						</div>
					</StyledModal>
				</div>
				<div className='datePicker'>
					<hr></hr>
					<DateRange
						onChange={item => setState({ ...state, ...item, change: true })}
						months={1}
						minDate={addDays(new Date(), 0)}
						maxDate={addDays(new Date(), 365)}
						direction="vertical"
						scroll={{ enabled: true }}
						ranges={[state.selection, state.compare]}
						locale={locales['fr']}
					/>
				</div>
			</div>
		</div>

	)
}

export default ProductPage
