import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import moment from "moment";

const RaceDataGrid = ({ event }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const rows = [];
		event.map((e) => {
			e.races.map((r) => {
				rows.push({
					id: r.id,
					startTime: moment(r.starttime).format("MMM DD YYYY h:mm A"),
				});
			});
		});
		setRows(rows);
	}, [event]);

	const columns = [
		{ field: "id", headerName: "ID", width: 70, hide: true },
		{ field: "startTime", headerName: "startTime", flex: 0.8 },
		{
			field: "modifyEvent",
			headerName: "",
			flex: 0.2,
			renderCell: (cellValues) => {
				return (
					<Link to={`/race/${cellValues.id}/view`} className="btn btn-primary">
						View Race
					</Link>
				);
			},
		},
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

export default RaceDataGrid;
