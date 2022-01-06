import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import instance from "../../../utils/axios";
import { Link } from "react-router-dom";

const EventsTable = (events) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		console.log(events.events);
		getRows();
	}, [events]);

	const getRows = () => {
		const rows = events.events.map((e) => {
			return {
				id: e.id,
				eventName: e.name,
				startTime: e.starttime,
			};
		});
		setRows(rows);
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 70, hide: true },
		{ field: "eventName", headerName: "Event name", flex: 1 },
		{ field: "startTime", headerName: "Start Time", flex: 0.5 },
		{
			field: "viewEvent",
			headerName: "",
			flex: 0.5,
			renderCell: (cellValues) => {
				return (
					<Link to={`/event/${cellValues.id}/view`} className="btn btn-primary">
						View Event
					</Link>
				);
			},
		},
	];

	return (
		<div
			style={{
				height: 400,
				width: "170%",
				marginLeft: "-40%",
				display: "flex",
				flexFlow: "column",
			}}
		>
			<h3 style={{}}>Events results:</h3>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[2]}
			/>
		</div>
	);
};

export default EventsTable;
