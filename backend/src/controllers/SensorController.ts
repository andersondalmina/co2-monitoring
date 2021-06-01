import { Request, Response } from "express";
import SensorService from "../services/SensorService";

export default class SensorController {
  async create(request: Request, response: Response): Promise<Response> {
    const { code, name } = request.body;

    const sensorService = new SensorService();
    const sensor = await sensorService.create(code, name);

    return response.json(sensor);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const sensorService = new SensorService();
    const sensors = await sensorService.list();

    return response.json(sensors);
  }

  async find(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const sensorService = new SensorService();
    const sensor = await sensorService.find(code);

    if (!sensor) {
      return response.sendStatus(404);
    }

    return response.json(sensor);
  }
}
