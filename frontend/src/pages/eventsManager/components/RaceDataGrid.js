import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const RaceDataGrid = ({ event }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const rows = [];
		event.map((e) => {
			e.races.map((r) => {
				rows.push({
					id: r.id,
					startTime: r.starttime,
				});
			});
		});
		setRows(rows);
	}, [event]);

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "startTime", headerName: "startTime", flex: 0.8 },
		{
			field: "modifyEvent",
			headerName: "",
			flex: 0.2,
			renderCell: (cellValues) => {
				return (
					<Button variant="contained" color="primary" onClick={(event) => {}}>
						Modify Race
					</Button>
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
