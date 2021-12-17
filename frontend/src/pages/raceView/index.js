import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../utils/axios";
import BoatDataGrid from "./components/BoatDataGrid";

const RaceView = () => {
	const [race, setRace] = useState([]);
	const [raceBoats, setRaceBoats] = useState([]);
	const [startTime, setStartTime] = useState("");
	const [id, setRaceId] = useState("");
	const params = useParams();

	const getData = async () => {
		try {
			const raceRes = (await instance.get(`/race/${params.id}`)).data;
			setRace(raceRes.race);
			console.log(raceRes.race[0].raceboats);
			setRaceBoats(raceRes.race[0].raceboats);
			setStartTime(raceRes.race[0].starttime);
			setRaceId(raceRes.race[0].id);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{race.length > 0 ? (
				<div className="event-view-container">
					<div>Race ID: {id}</div>
					<div>StartTime: {startTime}</div>
					<div className="boats-display-container">
						{raceBoats.length > 0 ? (
							<BoatDataGrid raceBoats={raceBoats} />
						) : (
							<div className="boat-display-error">No race info to show</div>
						)}
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
};

export default RaceView;
