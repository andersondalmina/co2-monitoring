import { Router } from "express";
import SensorController from "../controllers/SensorController";

const sensorController = new SensorController();

const sensorRouter = Router();
sensorRouter.get("/", sensorController.list);
sensorRouter.get("/:code", sensorController.find);
sensorRouter.post("/", sensorController.create);

export default sensorRouter;
