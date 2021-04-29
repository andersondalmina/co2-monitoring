import { Request, Response } from 'express';
import MeasurementService from '../services/MeasurementService';

export default class MeasurementController{
    async list(request: Request, response: Response) : Promise<Response>{
        const { date } = request.body;
        let parsedDate: Date;

        if(typeof date === "string"){
            const split = date.split("/");
            parsedDate = new Date(Number(split[2]), Number(split[1]) - 1, Number(split[0]));
        }else{
            parsedDate = date;
        }

        const measurementService = new MeasurementService();
        const measurements = await measurementService.list(parsedDate);

        return response.json(measurements);
    }
    async create(request: Request, response: Response) : Promise<Response>{
        const { value } = request.body;
        
        const measurementService = new MeasurementService();
        const measurement = await measurementService.create(value);

        return response.json(measurement);
    }
}