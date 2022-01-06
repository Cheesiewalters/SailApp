import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EventsTable from "./components/EventsTable";
import instance from "../../utils/axios";

const EventsSearch = () => {
	const [events, setEvents] = useState([]);
	const [textInput, settextInput] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const errors = [];

		if (textInput === "") {
			errors.push("The form is not valid, please provide a search value");
		}

		if (errors.length > 0) {
			alert(errors);
			return;
		}

		const eventsRes = (await instance.get(`/event/search/?q=${textInput}`))
			.data;
		setEvents(eventsRes);
		console.log(eventsRes);

		//Send a get request using the textIput to http://localhost:3001/event/search/?q=EDYC
		//using this to update the events array in state which is passed into the chil eventsTable component
		//this should re render the table every search if the events array changes
	};

	const handleChangeInput = (event) => {
		event.preventDefault();
		settextInput(event.target.value);
	};

	return (
		<div className="input-container-search">
			<form onSubmit={handleSubmit}>
				<Paper
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: 400,
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search by event name"
						onChange={handleChangeInput}
						value={textInput}
						inputProps={{ "aria-label": "search google maps" }}
					/>
					<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
				{events.length > 0 ? (
					<div>
						<EventsTable events={events} />
					</div>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "20px",
						}}
					>
						No event search results{" "}
					</div>
				)}
			</form>
		</div>
	);
};

export default EventsSearch;
