import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ handleSearch }) {
	let timer;
	const handleInput = (event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			handleSearch(event)
		}, 1000)
	}

	return (
		<nav className="main-navbar">
			<div className="main-navbar-flex container">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to='/' className="nav-link logo">Movie DB</Link>
					</li>
					<li>
						<Link to='/favorites' className="nav-link">Избранные</Link>
					</li>
				</ul>
				<form className="main-search-form">
					<input type="text" placeholder="Search movies..." onChange={handleInput} />
				</form>
			</div>
		</nav>
	)
}
