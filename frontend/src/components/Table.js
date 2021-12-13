import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const handleClick = () => {};

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "eventName", headerName: "EventName", flex: 1 },
	{
		field: "viewEvent",
		headerName: "",
		flex: 0.5,
		renderCell: (cellValues) => {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={(event) => {
						handleClick(event, cellValues);
					}}
				>
					View Event
				</Button>
			);
		},
	},
];

const rows = [
	{ id: 1, eventName: "Event name" },
	{ id: 2, eventName: "Event name" },
	{ id: 3, eventName: "Event name" },
	{ id: 4, eventName: "Event name" },
	{ id: 5, eventName: "Event name" },
	{ id: 6, eventName: "Event name" },
	{ id: 7, eventName: "Event name" },
	{ id: 8, eventName: "Event name" },
	{ id: 9, eventName: "Event name" },
];

export default function Table() {
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
}
