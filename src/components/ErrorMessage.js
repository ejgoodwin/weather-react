import React from 'react';

	const ErrorMessage = (props) => {
		return (
			<div className={`error-message ${props.errorVisible ? "show" : "hide"}`}>
				<p className="error-message__text">Sorry, I don't recognise that city name</p>
			</div>
		)
	}

export default ErrorMessage;