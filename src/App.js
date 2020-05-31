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
			backgroundClass: ""
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
				const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
				console.log(data);
				this.setState({
					fullData: data.list,
					dailyData: dailyData,
					country: data.city.country,
					backgroundClass: dailyData[0].weather[0].id,
					city: this.state.value,
					errorVisible: false,
					value: "",
					headerInputClass: "app-in-use"
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

			    	{this.state.dailyData.length > 0 ? <WeatherToday reading={this.state.dailyData[0]} city={this.state.city} country={this.state.country} /> : ""}
			   
		    		<div className="card-container">
		    			<WeatherForecast forecast={this.state.dailyData.slice(1)}  />
		    		</div>

		    		<ErrorMessage errorVisible={this.state.errorVisible} />
			    </div>
		  	</div>
		);
	}
  
}

export default App;
