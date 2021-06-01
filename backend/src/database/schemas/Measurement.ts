import { ObjectIdColumn, Entity, Column, ObjectID } from "typeorm";

@Entity("measurements")
class Measurement {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  value: number;

  @Column()
  date: Date;
}

export default Measurement;
