import { Router } from "express";
import measurementRouter from "./measurements.routes";
import sensorRouter from "./sensors.routes";

const routes = Router();

routes.use("/measurement", measurementRouter);
routes.use("/sensors", sensorRouter);

export default routes;
