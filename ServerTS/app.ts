import express, { Request, Response, NextFunction } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import {
  BoatRouter,
  EventRouter,
  RaceRouter,
  ClubRouter,
  AuthRouter,
} from "./routers";
// import { Authenticate } from "./middleware/authentication";

/* configure Swagger */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    baseUrl: "https://pitchem.com/api/v1/",
    title: "Sail API",
    version: "v1",
  },
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

/* initialise Express app */
const app = express();

/* setup Swagger Docs */
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

/* setup middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* authenticate all api requests */
// app.use("/api/*", Authenticate);

/* setup Express Routers */
app.use("/boat", BoatRouter);
app.use("/event", EventRouter);
app.use("/race", RaceRouter);
app.use("/club", ClubRouter);
app.use("/auth", AuthRouter);

/* redirect to API documentation */
app.get("/", (req, res) => res.redirect("/docs"));

/* error handling */
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  }

  return next();
});

export { app };
