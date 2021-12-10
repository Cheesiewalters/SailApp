import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Events = () => {
	return (
		<div className="events">
			Events
			<Button variant="outlined">
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
};

export default Events;
