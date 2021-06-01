import { endOfDay, startOfDay } from "date-fns";
import { getMongoRepository, MongoRepository } from "typeorm";
import Measurement from "../database/schemas/Measurement";
import Sensor from "../database/schemas/Sensor";

class MeasurementRepository {
  private ormRepository: MongoRepository<Measurement>;

  constructor() {
    this.ormRepository = getMongoRepository(Measurement, "default");
  }

  public async list(): Promise<Measurement[]> {
    const measurements = await this.ormRepository.find({
      order: { createdAt: "DESC" },
      take: 20,
    });

    return measurements;
  }

  public async listByDate(date: Date): Promise<Measurement[]> {
    var utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const measurements = await this.ormRepository.find({
      where: {
        created_at: { $gte: startOfDay(utc), $lte: endOfDay(utc) },
      },
      order: { createdAt: "DESC" },
      take: 20,
    });

    return measurements;
  }

  public async create(sensor: Sensor, value: number): Promise<Measurement> {
    const measurement = this.ormRepository.create({
      sensor,
      value,
    });

    await this.ormRepository.save(measurement);

    return measurement;
  }
}

export default MeasurementRepository;
