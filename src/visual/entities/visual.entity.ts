import { MeasurementVisual } from 'src/measurementVisual/entities/measurement-visual.entity';
import { User } from '../../users/entities/user.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';

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

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.visuals, { nullable: false })
  user: User;

  // Relación con MeasurementType a través de MeasurementVisual (OneToMany)
  @OneToMany(() => MeasurementVisual, (measurementVisual) => measurementVisual.visual)
  measurementVisuals: MeasurementVisual[];
}


