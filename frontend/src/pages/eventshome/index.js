import React from "react";
import { Table } from "../../components";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Events = () => {
	return (
		<div>
			<div className="home-text">Events Homepage</div>
			<div className="home-container">
				<div className="button-register-boat">
					<Button variant="outlined">
						<Link to="/event/create">Create Event</Link>
					</Button>
				</div>
				<div className="button-register-eventhome">
					<Button variant="outlined">
						<Link to="/event/search">Search all events</Link>
					</Button>
				</div>
			</div>
			<div className="table-container">
				<Table />
			</div>
		</div>
	);
};

export default Events;
