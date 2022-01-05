import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import instance from "../../../utils/axios";
import { Link } from "react-router-dom";
import moment from "moment";

const RaceDataGrid = ({ event, getData }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		console.log(event);
		const rows = [];
		event.map((e) => {
			e.races.map((r) => {
				console.log(r);
				rows.push({
					id: r.id,
					startTime: moment(r.starttime).format("MMM DD YYYY h:mm A"),
					class: r.class.name,
				});
			});
		});
		setRows(rows);
	}, []);

	const columns = [
		{ field: "id", headerName: "ID", width: 70, hide: true },
		{ field: "startTime", headerName: "startTime", flex: 0.4 },
		{ field: "class", headerName: "Class", flex: 0.2 },
		{
			field: "modifyRace",
			headerName: "",
			flex: 0.2,
			renderCell: (cellValues) => {
				return (
					<Link
						to={`/race/${cellValues.id}/manage`}
						className="btn btn-primary"
					>
						Manage Race
					</Link>
				);
			},
		},
		{
			field: "deleteRace",
			headerName: "",
			flex: 0.2,
			renderCell: (cellValues) => {
				return (
					<div>
						<Button
							variant="contained"
							style={{ color: "primary", backgroundColor: "red" }}
							onClick={async () => {
								await instance
									.delete(`/race/${cellValues.id}`)
									.then()
									.catch((error) => {
										alert(error);
									});
							}}
						>
							Remove Race
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div style={{ height: 400, width: "80%" }}>
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
