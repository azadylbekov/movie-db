import React from 'react'
import { Link } from 'react-router-dom'


export default function RecomCard({ id, title, release_date, poster_path }) {
	return (
		<Link to={`/detail/${id}`} className="recom-movie-card">
			<img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title} />
			<h5>{title} <span>{release_date.substring(0, 4)}</span></h5>
		</Link>
	)
}
