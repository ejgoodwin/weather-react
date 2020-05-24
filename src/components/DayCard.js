import React from 'react';

const DayCard = (props) => {
	const weatherIcon = `owf owf-${props.reading.weather[0].id} owf-2x`;
	return (
		<div className="card">
			
			<p>{Math.round(props.reading.main.temp)}&deg;C</p>
			<i className={weatherIcon}></i>
		</div>
	)
}

export default DayCard;