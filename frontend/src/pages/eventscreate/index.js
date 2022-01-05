import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import instance from "../../utils/axios";
import { Paper, TextField, Typography } from "@mui/material";

const CreateEvents = () => {
	const [nameInput, setNameInput] = useState("");
	const [startTimeInput, setStartTimeInput] = useState("");
	const [endTimeInput, setEndTime] = useState("");
	const [description, setDescription] = useState("");
	const [selectedEventType, setSelectedEventType] = useState("");
	const [selectedYachtClub, setSelectedYC] = useState("");
	const [yachtClubs, setYachtClubs] = useState([]);
	const [eventTypes, setEventTypes] = useState([]);

	const getData = async () => {
		const clubs = (await instance.get("/club")).data;
		setYachtClubs(clubs);

		const eventTypes = (await instance.get("/event/types")).data;
		setEventTypes(eventTypes);
	};

	useEffect(() => {
		getData();
	}, []);

	const handleChangeName = (e) => {
		setNameInput(e.target.value);
	};

	const handleChangeStartTime = (e) => {
		setStartTimeInput(e.target.value);
	};

	const handleChangeEventType = (event) => {
		setSelectedEventType(event.target.value);
	};

	const handleChangeSelectedYC = (event) => {
		setSelectedYC(event.target.value);
	};

	const handleChangeEndTime = (event) => {
		setEndTime(event.target.value);
	};

	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = [];

		if (
			selectedEventType === "" ||
			nameInput === "" ||
			description === "" ||
			selectedYachtClub === "" ||
			startTimeInput === "" ||
			endTimeInput == ""
		) {
			errors.push(
				"The form is not valid, please ensure all values are present"
			);
		}

		if (errors.length > 0) {
			alert(errors);
			return;
		}

		try {
			axios
				.post("http://localhost:3001/event", {
					eventTypeId: selectedEventType,
					name: nameInput,
					description: description,
					clubId: selectedYachtClub,
					startTime: startTimeInput,
					endDate: endTimeInput,
				})
				.then(
					(response) => {
						console.log(response);
						alert("Event successfully created");
					},
					(error) => {
						console.log(error);
					}
				);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="events-create-container">
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexFlow: "column",
					justifyContent: "center",
					width: "90%",
				}}
			>
				<div className="events-create-input-container">
					<div className="events-create-text">
						<Typography variant="h3">Create Event</Typography>
					</div>
					<Paper
						style={{
							width: "80%",
							padding: "20px",
							display: "flex",
							flexFlow: "column",
							alignItems: "center",
						}}
					>
						<p>Event Name</p>
						<TextField
							id="filled-basic"
							variant="standard"
							onChange={handleChangeName}
							value={nameInput}
							style={{ width: "100%" }}
						/>
						<p>Start Time</p>
						<TextField
							id="filled-basic"
							variant="standard"
							type="datetime-local"
							onChange={handleChangeStartTime}
							value={startTimeInput}
							style={{ width: "100%" }}
						/>
						<p>End Time</p>
						<TextField
							id="filled-basic"
							variant="standard"
							type="datetime-local"
							onChange={handleChangeEndTime}
							value={endTimeInput}
							style={{ width: "100%" }}
						/>
						<p>Description</p>
						<TextField
							id="filled-basic"
							onChange={handleChangeDescription}
							multiline
							rows={4}
							value={description}
							style={{ width: "100%" }}
						/>

						<FormControl sx={{ m: 1, minWidth: 200, width: "48%" }}>
							<InputLabel id="demo-simple-select-autowidth-label">
								EventType
							</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={selectedEventType}
								onChange={handleChangeEventType}
								label="Event Type"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{eventTypes.map((e, index) => {
									return <MenuItem value={index + 1}>{e.name}</MenuItem>;
								})}
							</Select>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 200, width: "48%" }}>
							<InputLabel id="demo-simple-select-autowidth-label">
								Yacht Club
							</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={selectedYachtClub}
								onChange={handleChangeSelectedYC}
								label="Class"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{yachtClubs.map((e, index) => {
									return <MenuItem value={index + 1}>{e.name}</MenuItem>;
								})}
							</Select>
						</FormControl>
					</Paper>
				</div>
				<Button
					type="submit"
					variant="contained"
					style={{
						marginTop: "50px",
						marginRight: "100px",
						marginLeft: "100px",
						marginBottom: "25px",
					}}
				>
					Create Event
				</Button>
			</form>
		</div>
	);
};

export default CreateEvents;
