import React from 'react';

const DayCard = (props) => {

	const weatherIcon = props.reading.weather[0].id;
	// get date using timestamp and timezone offset
	const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const date = new Date((props.reading.dt + props.timezoneOffset) * 1000);
	const day = daysArr[date.getUTCDay()]

	return (
		<div className="card">
			<p className="card__day"> {day}</p>
			<p>{Math.round(props.reading.temp.max)}&deg;C</p>
			<div className={`icon-${weatherIcon} card__icon`}></div>
		</div>
	)
}

export default DayCard;