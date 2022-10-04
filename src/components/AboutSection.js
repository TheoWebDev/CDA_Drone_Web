import React from 'react'
import './AboutSection.css'
import ReactPlayer from 'react-player'

function AboutSection() {
	return (
		<>
			<div className='about'>
				<div className='container'>
				<h2>Notre Vision</h2>
				<div className="sectionPresentation">
					<div className="imgAbout">
						<ReactPlayer url='https://www.youtube.com/watch?v=7-4yOx1CnXE' />
					</div>
					<div className="contentAbout">
						<p className="textAbout">Si vous recherchez une location de matériel audiovisuel, SKY'DRONE vous accompagne dans la location de votre matériel vidéo et photo dans toute la France en vous conseillant en fonction de vos besoins et de vos projets audio/vidéo.
						</p>
						<p className="textAbout">Vous souhaitez louer un drone? Il vous suffit de sélectionner le produit qui vous intéresse et nous indiquer la durée de votre location. Notre magasin est capable de vous livrer le drone. Notre équipe répond à tous vos besoins en matière de photographie aérienne, de la simple photo vue du ciel au projet vidéo complet.</p>
						<p className='textAbout'>Sky'Drone s'efforce de vous répondre le plus rapidement possible en mettant en oeuvre toutes les compétences de ses équipes.</p>
					</div>
				</div>

				<div className='container-fluid'>
					<h2>Nos Références</h2>
					<div className='row  my-5'>
						<div className="sectionReferences col-6">
							<img src="images/AXA-logo.png" className="imgBio2" alt="AXA-logo"></img>
							<img src="images/Bouygues-logo.png" className="imgBio2" alt="Bouygues-logo"></img>
							<img src="images/eiffage-logo.png" className="imgBio2" alt="eiffage-logo"></img>
							<img src="images/ENEDIS-logo.png" className="imgBio2" alt="ENEDIS-logo"></img>
							<img src="images/ORANGE-logo.png" className="imgBio2" alt="ORANGE-logo"></img>
							<img src="images/SG-logo.jpg" className="imgBio2" alt="SG-logo"></img>
							<img src="images/VINCI-logo.png" className="imgBio2" alt="VINCI-logo"></img>
							<img src="images/WB-logo.png" className="imgBio2" alt="WB-logo"></img>
						</div>
						<div className="col-6 d-flex justify-content-center">
							<ReactPlayer url='https://www.youtube.com/watch?v=1U2aVQDbJ3o' />
						</div>
					</div>
				</div>
			</div>
			</div>

		</>
	)
}

export default AboutSection