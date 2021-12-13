import React from "react";

const dropDownSelectedYachtClub = (clubs, selectedYachtClub) => {
	const handleChangeSelectedYC = (event) => {
		selectedYachtClub(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 200 }}>
			<InputLabel id="demo-simple-select-autowidth-label">
				Yacht Club
			</InputLabel>
			<Select
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				value={selectedYachtClub}
				onChange={handleChangeSelectedYC}
				label="Yacht Club"
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{clubs.map((e) => {
					return <MenuItem value={e.name}>{e.name}</MenuItem>;
				})}
			</Select>
		</FormControl>
	);
};

export default dropDownSelectedYachtClub;
