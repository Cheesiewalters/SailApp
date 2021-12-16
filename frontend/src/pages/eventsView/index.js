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
			const clubs = (await instance.get("/club")).data;
			setYachtClubs(clubs);
			const eventTypes = (await instance.get("/event/types")).data;
			setEventTypes(eventTypes);
			const eventRes = (await instance.get(`/event/${params.id}`)).data;
			setEvent(eventRes);
			setName(eventRes[0].name);
			setStartTime(eventRes[0].starttime);
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

	return (
		<div>
			{event.length > 0 ? (
				<div className="event-view-container">
					<div>{name}</div>
					<div>{startTime}</div>
					<div>{endTime}</div>
					<div>{description}</div>
					<div>Event Type</div>
					<div>Event Club</div>

					<div className="race-display-container">
						{event.length > 0 ? (
							<RaceDataGrid event={event} eventId={params.id} />
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
