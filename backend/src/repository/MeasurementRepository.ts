import { getMongoRepository, MongoRepository } from 'typeorm';
import Measurement from '../database/schemas/Measurement';

class MeasurementRepository{
    private ormRepository: MongoRepository<Measurement>;

    constructor(){
        this.ormRepository = getMongoRepository(Measurement, 'default');
    }

    public async list(): Promise<Measurement[]>{      
        const measurements = await this.ormRepository.find({
            order: { created_at: 'DESC' },
            take: 20
        });
        
        return measurements;
    }

    public async listByDate(date: Date): Promise<Measurement[]>{ 
        const parsedDate = date.toDateString();
        const measurements = await this.ormRepository.find({
            where: { date: parsedDate },
            order: { created_at: 'DESC' },
            take: 20
        })
       
        return measurements;
    }

    public async create(value: number): Promise<Measurement>{
        const measurement = this.ormRepository.create({
            value,
            date: new Date().toDateString()
        });

        await this.ormRepository.save(measurement);

        return measurement;
    }
}

export default MeasurementRepository;
