import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import instance from "../../utils/axios";
import { useParams } from "react-router";
import { TextField } from "@mui/material";

const BoatsManager = () => {
	const [startTimeInput, setStartTimeInput] = useState("");
	const [finishTimeInput, setFinishTimeInput] = useState("");
	const [position, setPosition] = useState("");
	const params = useParams();

	const getData = async () => {
		try {
			const boatRes = (
				await instance.get(`/race/${params.id}/boat/${params.id2}`)
			).data;
			console.log(boatRes[0]);
			setFinishTimeInput(boatRes[0].finishtime);
			setStartTimeInput(boatRes[0].starttime);
			setPosition(boatRes[0].position);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleChangeStartTime = (event) => {
		setStartTimeInput(event.target.value);
	};

	const handleChangeFinishTime = (event) => {
		setFinishTimeInput(event.target.value);
	};

	const handleChangePosition = (event) => {
		setPosition(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = [];

		if (startTimeInput === "" || finishTimeInput === "" || position === "") {
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
				.put(`http://localhost:3001/race/${parseInt(params.id)}/boat`, {
					boatId: parseInt(params.id2),
					startTime: startTimeInput,
					finishTime: finishTimeInput,
					position: parseInt(position),
				})
				.then(
					(response) => {
						alert("Boat successfully updated");
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
			<div>
				<Link to={`/race/${params.id}/manage`} className="btn btn-primary">
					Back to race
				</Link>
			</div>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexFlow: "column",
					justifyContent: "center",
					width: "70%",
				}}
			>
				<div className="events-manage-input-container">
					<div className="events-manage-text">Manage Boat</div>
					<div style={{ width: "50%" }}>
						<p>Start Time</p>
						<TextField
							id="filled-basic"
							variant="standard"
							onChange={handleChangeStartTime}
							value={startTimeInput}
							style={{ width: "100%" }}
						/>
					</div>
					<div style={{ width: "50%" }}>
						<p>Finish Time</p>
						<TextField
							id="filled-basic"
							variant="standard"
							onChange={handleChangeFinishTime}
							value={finishTimeInput}
							style={{ width: "100%" }}
						/>
					</div>
					<div style={{ width: "50%" }}>
						<p>Position</p>
						<TextField
							id="filled-basic"
							variant="standard"
							onChange={handleChangePosition}
							value={position}
							style={{ width: "100%" }}
						/>
					</div>
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
					Update Boat
				</Button>
			</form>
		</div>
	);
};

export default BoatsManager;
