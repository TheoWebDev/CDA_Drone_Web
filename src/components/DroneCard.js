import { React, useEffect, useState } from 'react'
import './Cards.css'
import ContentLoader from 'react-content-loader'

const DroneCard = ({ drone }) => {
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')
	const [image, setImage] = useState('')
	const [load, setLoad] = useState(true)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/images/` + drone._id)
			.then(response => response.json())
			.then(data => {
				const firstImage = data[0]
				let url = `data:image/png;base64,${toBase64(firstImage.img.data)}`
				setImage(url)
				setLoad(false)
			})
	}
		, [drone._id])

	function toBase64(arr) {
		// arr = new Uint8Array(arr) //if it's an ArrayBuffer
		return btoa(
			arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
		)
	}

	return (
		<div className="cards__item__link" key={drone._id}>
		<figure className="cards__item__pic-wrap" data-category={category.name_cat ?? 'Inconnu'}>
			{load ?
				<ContentLoader
					speed={2}
					viewBox="0 0 400 200"
					backgroundColor="#f3f3f3"
					foregroundColor="#dddddd"
				>
					<rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
				</ContentLoader>
				: (
					<img src={image} alt="" className='cards__item__img'></img>
				)}
		</figure>
		<div className="cards__item__info">
			<h5 className="cards__item__text">{drone.name_d}</h5>
			<hr></hr>
				<footer className='d-flex align-items-center justify-content-between'>
					<span className="cards__item__price">{drone.pricePerDay_d}€/jours</span>
					<span className="cards__item__dispo">En Stock</span>
				</footer>
			</div>
			<button className="btnRegister" >Réserver</button>
		</div>
	)
}

export default DroneCard