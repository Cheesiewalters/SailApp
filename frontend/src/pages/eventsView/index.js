import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../utils/axios";
import RaceDataGrid from "./components/RaceDataGrid";

const EventsView = () => {
	const [name, setName] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [description, setDescription] = useState("");
	const [selectedEventType, setSelectedEventType] = useState("");
	const [selectedYachtClub, setSelectedYC] = useState("");
	const [yachtClubs, setYachtClubs] = useState([]);
	const [eventTypes, setEventTypes] = useState([]);
	const [event, setEvent] = useState([]);

	const params = useParams();

	const getData = async () => {
		try {
			const eventRes = (await instance.get(`/event/${params.id}`)).data;
			console.log(eventRes);
			setEvent(eventRes);
			setName(eventRes[0].name);
			setStartTime(eventRes[0].starttime);
			setEndTime(eventRes[0].enddate);
			setDescription(eventRes[0].description);
			setSelectedEventType(eventRes[0].eventtypes.name);
			setSelectedYC(eventRes[0].clubs.name);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{event.length > 0 ? (
				<div className="event-view-container">
					<div>Name: {name}</div>
					<div>StartTime: {startTime}</div>
					<div>EndTime: {endTime}</div>
					<div>Description: {description}</div>
					<div>Event Type: {selectedEventType}</div>
					<div>Event Club: {selectedYachtClub}</div>

					<div className="race-display-container">
						{event.length > 0 ? (
							<RaceDataGrid event={event} />
						) : (
							<div>No info to show</div>
						)}
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
};

export default EventsView;
