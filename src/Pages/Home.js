import React from 'react'
import Card from '../Components/Card'
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Navbar from '../Components/Navbar';


export default function Home() {
	const [movies, setMovies] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [isGenrePending, setIsGenrePending] = useState(true);
	const [page, setPage] = useState(1);
	const [genres, setGenres] = useState(null);
	const [search, setSearch] = useState(null);


	const API = 'https://api.themoviedb.org/3/'
	const API_KEY = '22ba8bd425852e7ddc1cb9b4769b42d2'
	let url = `${API}movie/popular?page=${page}&api_key=${API_KEY}`;

	const handlePageChange = (event, number) => {
		window.scrollTo({
			top: 0,
			behavior: 'instant'
		});
		setPage(number);
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	}

	useEffect(() => {
		url = `${API}movie/popular?page=${page}&api_key=${API_KEY}`;
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch the data for that resource');
				}
				return res.json();
			})
			.then(data => {
				setMovies(data.results);
				setIsPending(false);
			})
			.catch(err => {
				setIsPending(false);
				console.error(err);
			})
	}, [page])

	useEffect(() => {
		url = `${API}genre/movie/list?api_key=${API_KEY}`
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch the data for that resource');
				}
				return res.json();
			})
			.then(data => {
				setGenres(data.genres);
				setIsGenrePending(false);
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	useEffect(() => {
		if (search) {
			setIsPending(true);
			const url = `${API}search/movie/?query=${search}&api_key=${API_KEY}`
			fetch(url)
				.then(res => {
					if (!res.ok) {
						throw Error('could not fetch the data for that resource');
					}
					return res.json();
				})
				.then(data => {
					if (data) {
						setMovies(data.results);
						setIsPending(false);
					}
					setIsGenrePending(false);
				})
				.catch(err => {
					console.err(err)
				})
		} else {
			setPage(1);
		}
	}, [search])

	return (
		<>
			<Navbar handleSearch={handleSearch} />
			<div className="container">
				<div className="content-wrapper">
					<h2 className="main-title">Movies</h2>
					{!isPending && !isGenrePending ?
						<>
							<div className="card-grid">
								{movies.map(movie => {
									return (
										<div key={movie.id} className="card-item">
											<Card
												id={movie.id}
												title={movie.title}
												release_date={movie.release_date}
												poster_path={movie.poster_path}
												genre_list={genres}
												genre_ids={movie.genre_ids}
											/>
										</div>
									)
								})}
							</div>
							<Stack className="pagination-wrapper">
								<Pagination
									size="large"
									count={500}
									color="primary"
									page={page}
									onChange={handlePageChange}
									shape="rounded"
									hideNextButton
									hidePrevButton
								/>
							</Stack>
						</>
						: (
							<div className="spinner-container">
								<Box className="loading-spinner">
									<CircularProgress />
								</Box>
							</div>
						)}
				</div>
			</div>
		</>
	)
}
