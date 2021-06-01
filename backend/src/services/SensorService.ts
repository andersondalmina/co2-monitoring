import Sensor from "../database/schemas/Sensor";
import SensorRepository from "../repository/SensorRepository";

class SensorService {
  private sensorRepository = new SensorRepository();

  public async create(code: string, name: string): Promise<Sensor> {
    return await this.sensorRepository.create(code, name);
  }

  public async list(): Promise<Sensor[]> {
    return await this.sensorRepository.getAll();
  }

  public async find(code: string): Promise<Sensor> {
    return await this.sensorRepository.find(code);
  }
}

export default SensorService;
