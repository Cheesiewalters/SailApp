import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import instance from "../../../utils/axios";
const handleClick = () => {};

const RaceDataGrid = () => {
	const rows = [
		{ id: 1, startTime: "2021-04-26 16:00:00" },
		{ id: 2, startTime: "2021-04-26 16:00:00" },
	];

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "startTime", headerName: "startTime", flex: 0.8 },
		{
			field: "modifyEvent",
			headerName: "",
			flex: 0.2,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					>
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
