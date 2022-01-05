import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const BoatDataGrid = ({ raceBoats }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const rows = [];
		console.log(raceBoats);
		raceBoats.map((e) => {
			rows.push({
				id: e.boats.id,
				boatName: e.boats.name,
				position: e.position,
				startTime: moment(e.starttime).format("MMM DD YYYY h:mm A"),
				finishTIme: moment(e.finishtime).format("MMM DD YYYY h:mm A"),
			});
		});
		setRows(rows);
	}, []);

	const columns = [
		{ field: "id", headerName: "Boat ID", width: 70, hide: true },
		{ field: "boatName", headerName: "Boat Name", flex: 0.25 },
		{ field: "position", headerName: "Finish Position", flex: 0.25 },
		{ field: "startTime", headerName: "Start Time", flex: 0.25 },
		{ field: "finishTIme", headerName: "Finish Time", flex: 0.25 },
	];

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[2]}
			/>
		</div>
	);
};

export default BoatDataGrid;
