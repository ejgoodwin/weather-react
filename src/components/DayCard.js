import React from 'react';

const DayCard = (props) => {
	// const weatherIcon = `owf owf-${props.reading.weather[0].id} owf-2x`;
	const weatherIcon = props.reading.weather[0].id;
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const day = days[new Date(props.reading.dt * 1000).getDay()];
	const d = new Date(props.reading.dt * 1000);
	return (
		<div className="card">
			<p>{d.toUTCString()}</p>
			<p>{Math.round(props.reading.temp.max)}&deg;C</p>
			{/*<i className={weatherIcon}></i>*/}
			<div className={`icon-${weatherIcon} card__icon`}></div>
		</div>
	)
}

export default DayCard;