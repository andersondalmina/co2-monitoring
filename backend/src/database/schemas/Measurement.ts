import { ObjectID, Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('measurements')
class Measurement {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    value: number;

    @Column()
    date: string;

    @CreateDateColumn()
    created_at: Date;
}

export default Measurement;