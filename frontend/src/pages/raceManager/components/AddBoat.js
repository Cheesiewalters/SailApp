import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const AddBoat = ({ raceId, onClose }) => {
	const [boats, setBoats] = useState([]);
	const [startTime, setStartTime] = useState("");
	const [finishTime, setFinishTime] = useState("");
	const [position, setPosition] = useState("");
	const [selectedBoat, setSelectedBoat] = useState("");

	const getData = async () => {
		const boats = (await instance.get("/boat/")).data;
		setBoats(boats.boats);
	};

	useEffect(() => {
		getData();
	}, []);

	const handleChangeSelectedBoat = (event) => {
		setSelectedBoat(event.target.value);
	};

	const handleChangeStartTime = (event) => {
		setStartTime(event.target.value);
	};

	const handleChangeFinshTime = (event) => {
		setFinishTime(event.target.value);
	};

	const handleChangePosition = (event) => {
		setPosition(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = [];

		if (
			startTime === "" ||
			finishTime === "" ||
			position === "" ||
			selectedBoat === ""
		) {
			errors.push(
				"The form is not valid, please ensure all values are present"
			);
		}

		if (errors.length > 0) {
			alert(errors);
			return;
		}

		instance
			.post(`http://localhost:3001/race/${raceId}/boat`, {
				boatId: selectedBoat,
				startTime: startTime,
				finishTime: finishTime,
				position: parseInt(position),
			})
			.then(
				(response) => {
					onClose();
				},
				(error) => {
					alert(error.message);
				}
			);
	};

	return (
		<div className="register-boat-container">
			<form onSubmit={handleSubmit}>
				<div className="boat-title-text">Add Boat to this race</div>
				<div className="boat-input-container">
					<div>
						<FormControl sx={{ m: 1, minWidth: 200 }}>
							<InputLabel id="demo-simple-select-autowidth-label">
								Boat
							</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={selectedBoat}
								onChange={handleChangeSelectedBoat}
								label="Class"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{boats.map((e, index) => {
									return <MenuItem value={index + 1}>{e.name}</MenuItem>;
								})}
							</Select>
						</FormControl>
					</div>

					<div>
						<p>Start Time</p>
						<input onChange={handleChangeStartTime} value={startTime}></input>
					</div>
					<div>
						<p>Finish Time</p>
						<input onChange={handleChangeFinshTime} value={finishTime}></input>
					</div>
					<div>
						<p>Position</p>
						<input onChange={handleChangePosition} value={position}></input>
					</div>

					<Button
						type="submit"
						variant="contained"
						style={{ marginTop: "15px" }}
					>
						Save Boat to race
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddBoat;
