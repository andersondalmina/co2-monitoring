import MeasurementRepository from "../repository/MeasurementRepository";
import Measurement from "../database/schemas/Measurement";
import SensorRepository from "../repository/SensorRepository";

class MeasurementService {
  private measurementRepository = new MeasurementRepository();
  private sensorRepository = new SensorRepository();

  public async list(date?: Date): Promise<Measurement[] | []> {
    let list: Measurement[];

    if (date) {
      list = await this.measurementRepository.listByDate(date);
      return list;
    }

    list = await this.measurementRepository.list();
    return list;
  }

  public async create(sensorCode: string, value: number): Promise<Measurement> {
    const sensor = await this.sensorRepository.find(sensorCode);

    if (!sensor) {
      throw new Error("Sensor não encontrado");
    }

    const measurementDate = new Date();
    measurementDate.setHours(measurementDate.getHours() - 3);

    const measurement = {
      value,
      date: measurementDate,
    } as Measurement;

    sensor.measurements.push(measurement);

    await this.sensorRepository.update(sensor);

    return measurement;
  }
}

export default MeasurementService;
