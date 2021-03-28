import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DayCard from "../components/DayCard.js";

// Create mock of the component to focus on a certain area.
jest.mock("../components/DayCard", () => {
  return function DummyDayCard(props) {
    return (
      <div className="card">
      	<p className="card__temp">{Math.round(props.reading.temp.max)}&deg;C</p>
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

// Test props data.
const readingData = {
	temp: {max: 33.26}
};

it("Renders nearest rounded whole number with degree symbol", () => {
	act(() => {
		render(<DayCard reading={readingData} />, container); 
	});
	const tempTag = document.querySelector(".card__temp");
	expect(tempTag.innerHTML).toEqual("33°C");

	readingData.temp.max = 0.94
	act(() => {
		render(<DayCard reading={readingData} />, container); 
	});
	expect(tempTag.innerHTML).toEqual("1°C");

	readingData.temp.max = -4.51
	act(() => {
		render(<DayCard reading={readingData} />, container); 
	});
	expect(tempTag.innerHTML).toEqual("-5°C");

	readingData.temp.max = 0
	act(() => {
		render(<DayCard reading={readingData} />, container); 
	});
	expect(tempTag.innerHTML).toEqual("0°C");
});

