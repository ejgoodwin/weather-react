import React from 'react';

const WeatherToday = (props) => {
	const weatherIcon = `owf owf-${props.reading.weather[0].id} owf-5x`;
	return (
		<div className="weather-today">
			<span className="weather-today__today">Today</span>
			<p className="weather-today__text weather-today__text--capitalize">{props.city}</p>
			<p className="weather-today__text">{Math.round(props.reading.main.temp)}&deg;C</p>
			<p className="weather-today__text">{props.reading.weather[0].description}</p>
			<i className={weatherIcon}></i>
		</div>
	)
}

export default WeatherToday;