import { Request, Response } from "express";
import MeasurementService from "../services/MeasurementService";

export default class MeasurementController {
  async list(request: Request, response: Response): Promise<Response> {
    const { date } = request.query;
    const parsedDate = date ? new Date(String(date)) : undefined;

    const measurementService = new MeasurementService();
    const measurements = await measurementService.list(parsedDate);

    return response.json(measurements);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { sensorCode, value } = request.body;

    const measurementService = new MeasurementService();
    const measurement = await measurementService.create(sensorCode, value);

    return response.json(measurement);
  }
}
