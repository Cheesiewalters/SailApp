import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import instance from "../../utils/axios";
import RaceDataGrid from "./components/RaceDataGrid";
import PopupModal from "./components/PopupModal";
import { useParams } from "react-router";
import { Events } from "..";

const EventsManager = () => {
	const [nameInput, setNameInput] = useState("");
	const [startTimeInput, setStartTimeInput] = useState("");
	const [endTimeInput, setEndTime] = useState("");
	const [description, setDescription] = useState("");
	const [selectedEventType, setSelectedEventType] = useState("");
	const [selectedYachtClub, setSelectedYC] = useState("");
	const [yachtClubs, setYachtClubs] = useState([]);
	const [eventTypes, setEventTypes] = useState([]);
	const [event, setEvent] = useState([]);
	const [isOpen, setisOpen] = useState(false);

	const params = useParams();

	const getData = async () => {
		try {
			const clubs = (await instance.get("/club")).data;
			setYachtClubs(clubs);
			const eventTypes = (await instance.get("/event/types")).data;
			setEventTypes(eventTypes);
			const eventRes = (await instance.get(`/event/${params.id}`)).data;
			setEvent(eventRes);
			setNameInput(eventRes[0].name);
			setStartTimeInput(eventRes[0].starttime);
			setEndTime(eventRes[0].enddate);
			setDescription(eventRes[0].description);
			setSelectedEventType(eventRes[0].eventtypeid);
			setSelectedYC(eventRes[0].clubid);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleChangeName = (event) => {
		setNameInput(event.target.value);
	};

	const handleChangeStartTime = (event) => {
		setStartTimeInput(event.target.value);
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
			instance
				.put(`http://localhost:3001/event/${parseInt(params.id)}`, {
					eventTypeId: selectedEventType,
					name: nameInput,
					description: description,
					clubId: selectedYachtClub,
					startTime: startTimeInput,
					endDate: endTimeInput,
				})
				.then(
					(response) => {
						alert("Event successfully updated");
						console.log(response);
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
		<div className="events-manage-container">
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexFlow: "column",
					justifyContent: "center",
				}}
			>
				<div className="events-manage-input-container">
					<div className="events-manage-text">Manage Event</div>
					<div>
						<p>Event Name</p>
						<input onChange={handleChangeName} value={nameInput}></input>
					</div>
					<div>
						<p>Start Time</p>
						<input
							onChange={handleChangeStartTime}
							value={startTimeInput}
						></input>
					</div>
					<div>
						<p>End Time</p>
						<input onChange={handleChangeEndTime} value={endTimeInput}></input>
					</div>
					<div>
						<p>Description</p>
						<input
							onChange={handleChangeDescription}
							value={description}
						></input>
					</div>

					<div>
						<FormControl sx={{ m: 1, minWidth: 200 }}>
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
					</div>
					<div>
						<FormControl sx={{ m: 1, minWidth: 200 }}>
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
					</div>
				</div>
				<PopupModal
					open={isOpen}
					onClose={() => {
						getData();
						setisOpen(false);
					}}
					eventId={params.id}
				></PopupModal>
				<Button
					onClick={() => {
						setisOpen(true);
					}}
					variant="contained"
					style={{
						marginTop: "50px",
						marginRight: "100px",
						marginLeft: "100px",
						marginBottom: "25px",
					}}
				>
					Add Race
				</Button>
				<div className="race-display-container">
					{event.length > 0 ? (
						<RaceDataGrid event={event} />
					) : (
						<div>No info to show</div>
					)}
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
					Save Event
				</Button>
			</form>
		</div>
	);
};

export default EventsManager;
