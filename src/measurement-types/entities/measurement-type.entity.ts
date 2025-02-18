import { MeasurementVisual } from 'src/measurementVisual/entities/measurement-visual.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MeasurementType {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  // Relación OneToMany con MeasurementVisual
  @OneToMany(() => MeasurementVisual, (measurementVisual) => measurementVisual.measurementType)
  measurementVisuals: MeasurementVisual[];
}
