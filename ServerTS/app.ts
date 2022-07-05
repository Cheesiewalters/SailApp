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

/* initialise Express app */
const app = express();

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
