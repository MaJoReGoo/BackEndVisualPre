import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Visual } from '../../visual/entities/visual.entity';
import { MeasurementType } from '../../measurement-types/entities/measurement-type.entity';

@Entity()
export class MeasurementVisual {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Visual, (visual) => visual.measurementVisuals)
  @JoinColumn({ name: 'visualId', referencedColumnName: 'id' })
  visual: Visual;

  @ManyToOne(
    () => MeasurementType,
    (measurementType) => measurementType.measurementVisuals,
  )
  @JoinColumn({ name: 'measurementTypeId', referencedColumnName: 'id' })
  measurementType: MeasurementType;
}
