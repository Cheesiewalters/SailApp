import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{ display: "flex", alignItems: "flex-start" }}
			>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					></Typography>
					<Button>
						<NavLink to="/">Sail app</NavLink>
					</Button>
					<Button
						style={{
							display: "flex",
							alignItems: "flex-end",
							paddingLeft: "1500px",
						}}
						color="inherit"
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
