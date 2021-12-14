import React from "react";
import Button from "@mui/material/Button";
import { Table } from "../../components";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<div className="home-text">HomePage</div>
			<div className="home-container">
				<div className="button-register-boat">
					<Button variant="outlined">
						<Link to="/register-boat">Register a new boat from your club</Link>
					</Button>
				</div>
				<div className="button-register-eventhome">
					<Button variant="outlined">
						<Link to="/event/home">Event Homepage</Link>
					</Button>
				</div>
			</div>
			<div className="table-container">
				<Table />
			</div>
		</div>
	);
};

export default Home;
