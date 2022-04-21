import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar';
import { useState } from 'react';
import Card from '../Components/Card'

export default function Favorites() {
	const [favorites, setFavorites] = useState(null);

	useEffect(() => {
		let favoritesList = JSON.parse(localStorage.getItem('favorites'));
		if (favoritesList) {
			setFavorites(favoritesList);
		}
	}, [])

	const handleDelete = (list) => {
		setFavorites(list);
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="content-wrapper">
					<h2 className="main-title">Favorites</h2>
					{favorites ?
						<div className="card-grid">
							{favorites.map(movie => {
								return (
									<div key={movie.id} className="card-item">
										<Card
											id={movie.id}
											title={movie.title}
											release_date={movie.release_date}
											poster_path={movie.poster_path}
											genre_list={movie.genre_list}
											genre_ids={movie.genre_ids}
											handleDelete={handleDelete}
										/>
									</div>
								)
							})}
						</div>
						: (
							<h3>Favorites list is empty</h3>
						)}
				</div>
			</div>
		</>
	)
}
