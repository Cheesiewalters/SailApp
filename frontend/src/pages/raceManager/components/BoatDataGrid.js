import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import instance from "../../../utils/axios";
import { Link } from "react-router-dom";
import moment from "moment";

const BoatDataGrid = ({ raceId, raceBoats, getData }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const rows = [];
		raceBoats.map((e) => {
			rows.push({
				id: e.id,
				boatid: e.boats.id,
				name: e.boats.name,
				startTime: moment(e.starttime).format("MMM DD YYYY h:mm A"),
				finishTime: moment(e.finishtime).format("MMM DD YYYY h:mm A"),
				position: e.position,
			});
		});
		setRows(rows);
	}, []);

	const columns = [
		{ field: "id", headerName: "ID", hide: true },
		{ field: "boatid", headerName: "ID", hide: true },
		{ field: "name", headerName: "Name", flex: 0.1 },
		{ field: "position", headerName: "position", flex: 0.1 },
		{ field: "startTime", headerName: "StartTime", flex: 0.3 },
		{ field: "finishTime", headerName: "FinishTime", flex: 0.3 },
		{
			field: "modifyBoat",
			headerName: "",
			flex: 0.1,
			renderCell: (cellValues) => {
				return (
					<Link
						to={`/race/${raceId}/boat/${cellValues.row.boatid}/manage`}
						className="btn btn-primary"
					>
						<Button
							variant="contained"
							style={{
								color: "primary",
								backgroundColor: "blue",
							}}
						>
							Update
						</Button>
					</Link>
				);
			},
		},
		{
			field: "deleteBoat",
			headerName: "",
			flex: 0.15,
			renderCell: (cellValues) => {
				return (
					<div>
						<Button
							variant="contained"
							style={{ color: "primary", backgroundColor: "red" }}
							onClick={async () => {
								console.log(cellValues);
								await instance
									.delete(
										`/race/${cellValues.id}/boat/${cellValues.row.boatid}`
									)
									.then()
									.catch((error) => {
										alert(error);
									});
							}}
						>
							Remove Boat
						</Button>
					</div>
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

export default BoatDataGrid;
