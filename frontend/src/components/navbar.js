import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }} style={{ display: "flex" }}>
			<AppBar
				position="static"
				style={{ flexFlow: "row", justifyContent: "space-between" }}
			>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<div>
							<NavLink to="/">Sail app</NavLink>
						</div>
					</Typography>
				</Toolbar>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<div>
							<NavLink to="/login">Login as a user</NavLink>
						</div>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
