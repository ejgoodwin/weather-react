import React from 'react';
import './App.css';
import weatherApiKey from './apiKey.js';
import SearchForm from './components/SearchForm.js';
import WeatherToday from './components/WeatherToday.js';
import WeatherForecast from './components/WeatherForecast.js';
import ErrorMessage from './components/ErrorMessage.js';

class  App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dailyData: [],
			searchValue: "",
			city: "",
			errorVisible: false,
			headerInputClass: "app-start",
			backgroundClass: "",
			lat: "",
			lon: "",
			weatherCurrent: {},
			timezoneOffset: ""
		}
	}

	// Change state for 'searchValue' as input is typed
	handleInputChange = (event) => {
		this.setState({searchValue: event.target.value});
	}

	getWeatherData = () => {
		const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&exclude=hourly,minutely&appid=${weatherApiKey.openWeather}`;

		// Fetch weather data
		fetch(weatherURL)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({	
					backgroundClass: data.current.weather[0].id,
					city: this.state.searchValue,
					errorVisible: false,
					searchValue: "",
					headerInputClass: "app-in-use",
					weatherCurrent: data.current,
					dailyData: data.daily,
					timezoneOffset: data.timezone_offset
				}, () => console.log(this.state))
			})
			.catch(error => {
				console.log("error" + error)
				this.setState({
					errorVisible: true,
					dailyData: []
				})
			});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		// convert city name to coordinates
		const geocodingURL = `http://api.positionstack.com/v1/forward?access_key=${weatherApiKey.positionStack}&query=${this.state.searchValue}`;
		// fetch data if a value has been entered, then fetch weather
		if (this.state.searchValue !== "") {
			fetch(geocodingURL)
				.then(res => res.json())
				.then(data => {
					this.setState({
						lat: data.data[0].latitude,
						lon: data.data[0].longitude
					}, () => this.getWeatherData())
				})
				.catch(error => {
					console.log("error" + error)
					this.setState({
						errorVisible: true,
						dailyData: []
					})
				});
		} else {
			this.setState({
				errorVisible: true,
				dailyData: []
			});
		}
		
	}

	render() {
		return (
		  	<div className={`weather-${this.state.backgroundClass} app`}>
			    <div className="main-container">
			    	<h1 className={`app-title ${this.state.headerInputClass}`}>Weather</h1>
			    	<SearchForm 
			    		handleInputChange={this.handleInputChange}
			    		handleSubmit={this.handleSubmit}
			    		value={this.state.searchValue}
			    		headerInputClass={this.state.headerInputClass}
			    		/>

			    	{this.state.dailyData.length > 0 ? <WeatherToday reading={this.state.weatherCurrent} city={this.state.city} lat={this.state.lat} lon={this.state.lon} /> : ""}
			   
		    		<div className="card-container">
		    			<WeatherForecast forecast={this.state.dailyData.slice(1,5)} timezoneOffset={this.state.timezoneOffset}  />
		    		</div>

		    		<ErrorMessage errorVisible={this.state.errorVisible} />
			    </div>
		  	</div>
		);
	}
  
}

export default App;
