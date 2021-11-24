const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api-doc.yml");
const { json, urlencoded } = require("body-parser");

const {
  eventRouter,
} = require('./routers');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/event', eventRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});