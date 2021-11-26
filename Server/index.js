const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api-doc.yml");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const {
	eventRouter,
	boatRouter,
	raceRouter,
	teamRouter,
	memberRouter,
} = require("./routers");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/event", eventRouter);
app.use("/boat", boatRouter);
app.use("/race", raceRouter);
app.use("/team", teamRouter);
app.use("/member", memberRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
