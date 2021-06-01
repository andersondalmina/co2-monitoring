import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
} from "typeorm";
import Measurement from "./Measurement";

@Entity("sensors")
class Sensor {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: "string" })
  code: string;

  @Column({ type: "string" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column((type) => Measurement)
  measurements: Measurement[];
}

export default Sensor;
