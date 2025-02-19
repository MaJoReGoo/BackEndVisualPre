// src/measurement-type/entities/measurement-type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MeasurementVisual } from 'src/measurementVisual/entities/measurement-visual.entity';

@Entity()
export class MeasurementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Nombre del tipo de medición, por ejemplo 'Go GC Metrics'

  @Column('json', { nullable: true })
  metrics: Record<string, number>;  // Guardar las métricas como un objeto JSON, clave-valor

  @OneToMany(() => MeasurementVisual, (measurementVisual) => measurementVisual.measurementType)
  measurementVisuals: MeasurementVisual[];  // Relación OneToMany con MeasurementVisual
}
