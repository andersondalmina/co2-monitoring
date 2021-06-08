import { getMongoRepository, MongoRepository } from "typeorm";
import Sensor from "../database/schemas/Sensor";

class SensorRepository {
  private ormRepository: MongoRepository<Sensor>;

  constructor() {
    this.ormRepository = getMongoRepository(Sensor, "default");
  }

  public async find(code: string): Promise<Sensor> {
    const sensor = await this.ormRepository.findOne({
      code,
    });

    return sensor!;
  }

  public async getAllWithoutMeasurements(): Promise<Sensor[]> {
    const sensors = await this.ormRepository.find({ select: ["id", "code", "name", "createdAt"] });
    return sensors;
  }

  public async create(code: string, name: string): Promise<Sensor> {
    const sensor = this.ormRepository.create({
      code,
      name,
    });

    sensor.measurements = [];

    await this.ormRepository.save(sensor);

    return sensor;
  }

  public async update(sensor: Sensor): Promise<Sensor> {
    await this.ormRepository.update(sensor.id, sensor);

    return sensor;
  }
}

export default SensorRepository;
