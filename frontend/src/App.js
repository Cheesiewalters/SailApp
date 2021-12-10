import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Events } from "./pages";
import { Navigation } from "./constants";
import { Navbar } from "./components";

function App() {
	return (
		<div className="app">
			<Navbar />
			<Router>
				<Routes>
					<Route
						path={Navigation.HOME}
						caseSensitive={false}
						element={<Home />}
					/>
					<Route
						path={Navigation.EVENTS}
						caseSensitive={false}
						element={<Events />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
