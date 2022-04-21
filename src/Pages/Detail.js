import React from 'react'
import Navbar from '../Components/Navbar';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import RecomCard from '../Components/RecomCard';
import Button from '@mui/material/Button';


export default function Detail() {
	const [movie, setMovie] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [recom, setRecom] = useState(null);
	const [isRecomPending, setIsRecomPending] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);


	const { id } = useParams()
	const API = 'https://api.themoviedb.org/3/'
	const API_KEY = '22ba8bd425852e7ddc1cb9b4769b42d2'
	const endpoint = `/movie/${id}`;
	let url = `${API}${endpoint}?api_key=${API_KEY}`

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'instant'
		});
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch the data for that resource');
				}
				return res.json();
			})
			.then(data => {
				setMovie(data);

				let favorites = JSON.parse(localStorage.getItem('favorites'));
				if (favorites) {
					favorites.forEach(mov => {
						if (mov.id === data.id) {
							setIsFavorite(true)
						}
					})
				}

				setIsPending(false);
				fetchRecom();
			})
			.catch(err => {
				setIsPending(false);
				console.error(err);
			})
	}, [id])


	const fetchRecom = () => {
		url = `${API}/movie/${id}/recommendations?api_key=${API_KEY}`;
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch the data for that resource');
				}
				return res.json();
			})
			.then(data => {
				setRecom(data.results);
				setIsRecomPending(false);
			})
			.catch(err => {
				setIsRecomPending(false);
				console.error(err);
			})
	}

	const convertMinsToHrsMins = (minutes) => {
		let h = Math.floor(minutes / 60);
		let m = minutes % 60;
		h = h < 10 ? '0' + h : h;
		m = m < 10 ? '0' + m : m;
		return h + ':' + m;
	}

	const addFavorites = () => {
		let genre_ids = [];
		movie.genres.forEach(genre => {
			genre_ids.push(genre.id);
		})
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		if (favorites) {
			let found = false;
			favorites.forEach(mov => {
				if (mov.id === movie.id) {
					found = true;
				}
			})
			if (!found) {
				favorites.push({
					id: movie.id,
					title: movie.title,
					release_date: movie.release_date,
					poster_path: movie.poster_path,
					genre_list: movie.genres,
					genre_ids: genre_ids
				});
				localStorage.setItem('favorites', JSON.stringify(favorites))
				setIsFavorite(true)
			}
		} else {
			let favoritesList = [{
				id: movie.id,
				title: movie.title,
				release_date: movie.release_date,
				poster_path: movie.poster_path,
				genre_list: movie.genre,
				genre_ids: genre_ids
			}]
			localStorage.setItem('favorites', JSON.stringify(favoritesList))
			setIsFavorite(true)

		}
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="content-wrapper">
					{!isPending ?
						<>
							<h2>{movie.title} <small><i>({movie.release_date.substring(0, 4)})</i></small></h2>
							<div className="movie-detail-flex">
								<div className="flex-item">
									<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
									{isFavorite ?
										<h6><i>Фильм в избранных</i></h6>
										:
										<Button onClick={addFavorites} variant="contained">Добавить в избранные</Button>
									}
								</div>
								<div className="flex-item">
									<div className="info-table">
										<div className="info-flex">
											<div className="info-item">Original title:</div>
											<div className="info-item">{movie.original_title}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Tagline:</div>
											<div className="info-item">{movie.tagline}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Production countries:</div>
											<div className="info-item">{movie.production_countries.map(country => <p key={country.name}>{country.name}</p>)}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Production companies:</div>
											<div className="info-item">{movie.production_companies.map(company => <p key={company.name}>{company.name}</p>)}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Original language:</div>
											<div className="info-item">{movie.original_language}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Genres:</div>
											<div className="info-item">{movie.genres.map(genre => <p key={genre.name}>{genre.name}</p>)}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Release date:</div>
											<div className="info-item">{movie.release_date}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Budget:</div>
											<div className="info-item">{movie.budget}$</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Revenue:</div>
											<div className="info-item">{movie.revenue}$</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Status:</div>
											<div className="info-item">{movie.status}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Runtime:</div>
											<div className="info-item">{convertMinsToHrsMins(movie.runtime)} hours</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Homepage:</div>
											<div className="info-item"><a href={movie.homepage}>{movie.homepage}</a></div>
										</div>
										<div className="info-flex">
											<div className="info-item">Vote average:</div>
											<div className="info-item">{movie.vote_average}</div>
										</div>
										<div className="info-flex">
											<div className="info-item">Overview:</div>
											<div className="info-item">{movie.overview}</div>
										</div>
									</div>
								</div>
							</div>
						</>
						: (
							<div className="spinner-container">
								<Box className="loading-spinner">
									<CircularProgress />
								</Box>
							</div>
						)}
					{!isRecomPending ?
						<>
							<h4>Recommended movies</h4>
							<div className='recom-flex'>
								{recom.map(movie => {
									return (
										<div key={movie.id} className="recom-item">
											<RecomCard
												key={movie.id}
												id={movie.id}
												title={movie.title}
												release_date={movie.release_date}
												poster_path={movie.poster_path} />
										</div>
									)
								})}
							</div>
						</>
						: (
							<div className="spinner-container">
								<Box className="loading-spinner">
									<CircularProgress />
								</Box>
							</div>
						)
					}
				</div>
			</div>
		</>
	)
}
