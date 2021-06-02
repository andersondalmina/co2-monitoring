import { getMongoRepository, MongoRepository } from "typeorm";
import Measurement from "../database/schemas/Measurement";

class MeasurementRepository {
  private ormRepository: MongoRepository<Measurement>;

  constructor() {
    this.ormRepository = getMongoRepository(Measurement, "default");
  }

  public async createWithoutSaving(value: number, date: Date): Promise<Measurement> {
    const measurement = this.ormRepository.create({
      value,
      date
    });

    return measurement;
  }
}

export default MeasurementRepository;
