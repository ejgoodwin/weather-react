import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ErrorMessage from "../components/ErrorMessage.js";

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

it("gives class 'show' if errorVisible props is true, 'hide' if false", () => {
	act(() => {
		render(<ErrorMessage />, container);
	});
	expect(container.firstChild.className).toBe("error-message hide");

	act(() => {
		render(<ErrorMessage errorVisible={false} />, container);
	});
	expect(container.firstChild.className).toBe("error-message hide");

	act(() => {
		render(<ErrorMessage errorVisible={true} />, container);
	});
	expect(container.firstChild.className).toBe("error-message show");
});