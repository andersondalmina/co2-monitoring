import Measurement from "../database/schemas/Measurement";
import MeasurementRepository from "../repository/MeasurementRepository";
import SensorRepository from "../repository/SensorRepository";
import Sensor from "../database/schemas/Sensor";
import {startOfDay, endOfDay} from "date-fns";

class MeasurementService {
  private measurementRepository = new MeasurementRepository();
  private sensorRepository = new SensorRepository();

  public async list(sensorCode?: string, date?: Date): Promise<Sensor> {
    if (!sensorCode) 
      throw new Error("Informe o código do Sensor");

    const sensor = await this.sensorRepository.find(sensorCode);

    if (!sensor) 
      throw new Error("Sensor não encontrado");
    
    if(date){
      const startDay = startOfDay(date);
      const endDay = endOfDay(date);
      startDay.setHours(startDay.getHours() - 3);
      endDay.setHours(endDay.getHours() - 3);
      sensor.measurements = sensor.measurements.filter(measurement => startDay <= measurement.date && endDay >= measurement.date);
    }
    sensor.measurements = sensor.measurements.slice(-30);
    return sensor;
  }

  public async create(sensorCode: string, value: number): Promise<Measurement> {
    const sensor = await this.sensorRepository.find(sensorCode);

    if (!sensor) {
      throw new Error("Sensor não encontrado");
    }

    const measurementDate = new Date();
    measurementDate.setHours(measurementDate.getHours() - 3);

    const measurement = await this.measurementRepository.createWithoutSaving(value, measurementDate);

    sensor.measurements.push(measurement);

    await this.sensorRepository.update(sensor);

    return measurement;
  }
}

export default MeasurementService;
