import React from 'react';
import DayCard from './DayCard.js';

const WeatherForecast = (props) => {
	return props.forecast.map( (reading) => <DayCard reading={reading} key={reading.dt} timezoneOffset={props.timezoneOffset} /> );
}

export default WeatherForecast;