import React from 'react';

const WeatherToday = (props) => {
	
	const weatherIcon = props.reading.weather[0].id;
	console.log(props);
	return (
		<div className="weather-today">
			<div className="weather-today__text-container">
				<span className="weather-today__today">Today</span>
				<p className="weather-today__text weather-today__text--capitalize">{props.city}</p>
				<p className="weather-today__text">{Math.round(props.reading.temp)}&deg;C</p>
				{<p className="weather-today__text">{props.reading.weather[0].description}</p>}
			</div>
			{<i className={weatherIcon}></i>}

			<div className="weather-today__icon">
				{<div className={`icon-${weatherIcon} custom-icon`}></div>}
			</div>
		</div>
	)
}

export default WeatherToday;