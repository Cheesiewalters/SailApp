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
	clubRouter,
	authRouter,
} = require("./routers");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/event", eventRouter);
app.use("/boat", boatRouter);
app.use("/race", raceRouter);
app.use("/club", clubRouter);
app.use("/auth", authRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
	res.status(500).send(err);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
