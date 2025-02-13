import { MeasurementType } from '../../measurement-types/entities/measurement-type.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class Visual {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  serverName: string;
  @Column()
  serverIp: string;
  @Column()
  serverPort: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => MeasurementType, (measurementType) => measurementType.id, {
    eager: true,
  })
  measurementType: MeasurementType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
