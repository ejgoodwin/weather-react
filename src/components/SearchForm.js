import React from 'react';

const SearchForm = (props) => {
	return (
		<form 
			className={`weather-form ${props.headerInputClass}`}
			onSubmit={props.handleSubmit}>
			<label className="weather-form__label">Enter a city</label>
			<div className="weather-form__input-container">
				<input 
					className="weather-form__input" 
					type="text" 
					name="name" 
					value={props.value} 
					onChange={props.handleInputChange} />
				<button 
					className="weather-form__submit" 
					type="submit">
						<i className="fas fa-search"></i>
				</button>
			</div>
			
		</form>
	)
}

export default SearchForm;