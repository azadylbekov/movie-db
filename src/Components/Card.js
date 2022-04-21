import React from 'react'
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom'


export default function Card({ id, title, release_date, poster_path, genre_list, genre_ids, handleDelete }) {
	const [genres, setGenres] = useState(null);
	const [path, setPath] = useState(null);
	const location = useLocation();
	const [isFavorite, setIsFavorite] = useState(false);


	useEffect(() => {
		setPath(location.pathname);
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		if (favorites) {
			favorites.forEach(movie => {
				if (movie.id === id) {
					setIsFavorite(true)
				}
			})
		}
	}, [])


	useEffect(() => {
		let allGenres = [];
		genre_list.forEach(genre => {
			if (genre_ids.indexOf(genre.id) > -1) {
				allGenres.push(genre.name);
			}
		})
		setGenres(allGenres);
	}, [])

	const addFavorites = (event) => {
		event.stopPropagation();
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		if (favorites) {
			let found = false;
			favorites.forEach(movie => {
				if (movie.id === id) {
					found = true;
				}
			})
			if (!found) {
				favorites.push({
					id: id,
					title: title,
					release_date: release_date,
					poster_path: poster_path,
					genre_list: genre_list,
					genre_ids: genre_ids
				});
				localStorage.setItem('favorites', JSON.stringify(favorites))
				setIsFavorite(true)
			}
		} else {
			let favoritesList = [{
				id: id,
				title: title,
				release_date: release_date,
				poster_path: poster_path,
				genre_list: genre_list,
				genre_ids: genre_ids
			}]
			localStorage.setItem('favorites', JSON.stringify(favoritesList))
			setIsFavorite(true)
		}
	}

	const deleteFavorites = () => {
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		favorites = favorites.filter(movie => movie.id !== id);
		localStorage.setItem('favorites', JSON.stringify(favorites));
		handleDelete(favorites);
	}

	return (
		<div className="movie-card">
			<Link className="movie-card-link" to={`detail/${id}`}>
				{poster_path ?
					<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
					:
					<div class="no-image">No image</div>
				}
				<div className="content">
					<div>
						<h2>{title}</h2>
						<h4>{release_date}</h4>
						{genres && genres.map((genre, index) => {
							return (
								<Chip
									className="genre-badge"
									key={index}
									label={genre}
									color="primary"
									variant="outlined"
								/>
							)
						})}
					</div>
				</div>
			</Link>
			{path === '/favorites' ?
				<Button onClick={deleteFavorites} variant="contained" color="error">Удалить из избранных</Button>
				: (
					<div>
						{isFavorite && <h6><i>Фильм в избранных</i></h6>}
						<Button onClick={addFavorites} variant="contained">Добавить в избранные</Button>
					</div>
				)
			}
		</div>
	)
}
