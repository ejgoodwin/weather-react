import React from 'react';
import './App.css';
import weatherApiKey from './apiKeys.js';
import SearchForm from './components/SearchForm.js';
import WeatherToday from './components/WeatherToday.js';
import WeatherForecast from './components/WeatherForecast.js';
import ErrorMessage from './components/ErrorMessage.js';

class  App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fullData: [],
			dailyData: [],
			inputValue: "",
			city: "",
			country: "",
			errorVisible: false,
			headerInputClass: "app-start",
			backgroundClass: "",
			lat: "",
			lon: "",
			weatherCurrent: ""
		}
	}

	// Change state for 'value' as input is typed
	handleInputChange = (event) => {
		this.setState({value: event.target.value});
	}

	cityToLatLong = (city) => {
		const geocodingURL = `http://api.positionstack.com/v1/forward?access_key=${weatherApiKey.positionStack}&query=${city}`;
	
		fetch(geocodingURL)
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				// set lat long, then get weather data
				this.setState({
					lat: data.data[0].latitude,
					lon: data.data[0].longitude
				}, () => this.getWeatherData())
			});
	}

	getWeatherData = () => {
		const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&exclude=hourly,minutely&appid=${weatherApiKey.openWeather}`;

		// Fetch weather data
		fetch(weatherURL)
			.then(res => res.json())
			.then(data => {
				// const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
				console.log(data);
				this.setState({
					// fullData: data.list,
					// dailyData: data.daily,
					// country: data.city.country, 	
					backgroundClass: data.current.weather[0].id,
					city: this.state.value,
					errorVisible: false,
					value: "",
					headerInputClass: "app-in-use",
					weatherCurrent: data.current,
					dailyData: data.daily
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
	}

	handleSubmit = (event) => {
		event.preventDefault();

		// convert city name to coordinates, then fetch weather
		this.cityToLatLong(this.state.value);
	}

	render() {
		return (
		  	<div className={`weather-${this.state.backgroundClass} app`}>
		  		<div className="app-background"></div>
			    <header>
			      <h1 className={`app-title ${this.state.headerInputClass}`}>Weather</h1>
			    </header>

			    <div className="main-container">
			    	<SearchForm 
			    		handleInputChange={this.handleInputChange}
			    		handleSubmit={this.handleSubmit}
			    		value={this.state.value}
			    		headerInputClass={this.state.headerInputClass}
			    		/>

			    	{this.state.dailyData.length > 0 ? <WeatherToday reading={this.state.weatherCurrent} city={this.state.city} country={this.state.country} /> : ""}
			   
		    		<div className="card-container">
		    			<WeatherForecast forecast={this.state.dailyData.slice(1,5)}  />
		    		</div>

		    		<ErrorMessage errorVisible={this.state.errorVisible} />
			    </div>
		  	</div>
		);
	}
  
}

export default App;
