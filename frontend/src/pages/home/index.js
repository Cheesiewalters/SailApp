import React from "react";
import Button from "@mui/material/Button";
import { Table } from "../../components";

const Home = () => {
	return (
		<div className="home-grid">
			<div className="home-text">HomePage</div>
			<div className="home-container">
				<div className="button-register-boat">
					<Button variant="contained">
						Register a new boat fron your club
					</Button>
				</div>
				<div className="button-register-eventhome">
					<Button variant="contained">
						Register a new boat fron your club
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
