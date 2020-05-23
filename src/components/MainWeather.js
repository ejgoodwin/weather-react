import React from 'react';
import weatherApiKey from '../apiKeys.js';
import cityListJson from '../city-list.json';

class MainWeather extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fullData: [],
			dailyData: [],
			inputValue: "",
			city: "",
			errorVisible: false
		}
	}

	// Change state for 'value' as input is typed
	handleInputChange = (event) => {
		this.setState({value: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		// Use input value for APi
		const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&appid=${weatherApiKey}`;
		
		// Fetch weather data for input value
		fetch(weatherURL)
			.then(res => res.json())
			.then(data => {
				const dailyData = data.list.filter(reading => reading.dt_txt.includes("03:00:00"))
				console.log(data);
				this.setState({
					fullData: data.list,
					dailyData: dailyData
				}, () => console.log(this.state))
			})
			.catch(error => {
				console.log("error" + error)
				this.setState({
					errorVisible: true,
					fullData: [],
					dailyData: []
				})
			}) 
		
		// Set state of city for the h2 title
		this.setState({
			city: this.state.value,
			errorVisible: false,
			value: ""
		});
	}

	render() {

		return (
			<div className="main-container">
				<form 
					className="weather-form" 
					onSubmit={this.handleSubmit}>
					<label className="weather-form__label">Enter a city</label>
					<div className="weather-form__input-container">
						<input 
							className="weather-form__input" 
							type="text" 
							name="name" 
							value={this.state.value} 
							onChange={this.handleInputChange} />
						<button 
							className="weather-form__submit" 
							type="submit">
								<i className="fas fa-search"></i>
						</button>
					</div>
					
				</form>

				{this.state.dailyData.length > 0 ? <WeatherToday reading={this.state.dailyData[0]} city={this.state.city} /> : ""}
				<div className="card-container">
					<WeatherForecast forecast={this.state.dailyData.slice(1)}  />
				</div>
				<Error errorVisible={this.state.errorVisible} />
			</div>
		)
	}
}

const Error = (props) => {
	return (
		<div className={`error-message ${props.errorVisible ? "show" : "hide"}`}>
			<p className="error-message__text">Sorry, I don't recognise that city name</p>
		</div>
	)
}

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

const WeatherForecast = (props) => {
	return props.forecast.map( (reading) => <DayCard reading={reading} key={reading.dt} /> );
}

const DayCard = (props) => {
	const weatherIcon = `owf owf-${props.reading.weather[0].id} owf-2x`;
	return (
		<div className="card">
			
			<p>{Math.round(props.reading.main.temp)}&deg;C</p>
			<i className={weatherIcon}></i>
		</div>
	)
}


export default MainWeather;