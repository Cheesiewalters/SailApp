import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import instance from "../utils/axios";

const Table = () => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const eventsRes = (await instance.get("/event")).data;
		getRows(eventsRes);
	};

	const getRows = async (events) => {
		const rows = await Promise.all(
			events.map(async (e) => {
				const club = (await instance.get(`/club/${e.clubid}`)).data;
				return {
					id: e.id,
					eventName: e.name,
					startTime: e.starttime,
					eventClub: club[0].name,
				};
			})
		);
		console.log(rows);
		setRows(rows);
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "eventName", headerName: "EventName", flex: 0.5 },
		{ field: "eventClub", headerName: "EventHostClub", flex: 0.5 },
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

	const handleClick = () => {};

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

export default Table;
