import "./index.css";
import { Route, Routes } from "react-router-dom";
import {
	Home,
	Events,
	Boats,
	CreateEvents,
	EventsManager,
	EventsView,
} from "./pages";
import { Navigation } from "./constants";
import { Navbar } from "./components";

function App() {
	return (
		<div className="app">
			<Navbar />
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
				<Route
					path={Navigation.REGISTERBOATS}
					caseSensitive={false}
					element={<Boats />}
				/>
				<Route
					path={Navigation.EVENTHOMEPAGE}
					caseSensitive={false}
					element={<Events />}
				/>
				<Route
					path={Navigation.EVENTCREATEPAGE}
					caseSensitive={false}
					element={<CreateEvents />}
				/>
				<Route
					path={Navigation.EVENTMANAGE}
					caseSensitive={false}
					element={<EventsManager />}
				></Route>
				<Route
					path={Navigation.EVENTVIEW}
					caseSensitive={false}
					element={<EventsView />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
