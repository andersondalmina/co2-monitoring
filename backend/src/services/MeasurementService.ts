import MeasurementRepository from '../repository/MeasurementRepository';
import Measurement from '../database/schemas/Measurement';

class MeasurementService {
    private measurementRepository = new MeasurementRepository();

    public async list(date?: Date) : Promise<Measurement[] | []>{
        let list: Measurement[];

        if (date)
        {
            list = await this.measurementRepository.listByDate(date);
            return list;
        }

        list = await this.measurementRepository.list();
        return list;
    }

    public async create(value: number) : Promise<Measurement>{
        const measurement = await this.measurementRepository.create(value);

        return measurement;
    }
}

export default MeasurementService;
