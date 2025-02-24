// src/measurement-types/entities/measurement-type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MeasurementVisual } from 'src/measurementVisual/entities/measurement-visual.entity';
import { MeasurementMetric } from 'src/measurement-metrics/entities/measurement-metric.entity'; // Corregido para importar MeasurementMemory

@Entity()
export class MeasurementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nombre del tipo de medición, por ejemplo 'Go GC Metrics'

  @OneToMany(
    () => MeasurementVisual,
    (measurementVisual) => measurementVisual.measurementType,
  )
  measurementVisuals: MeasurementVisual[]; // Relación OneToMany con MeasurementVisual

  @OneToMany(
    () => MeasurementMetric,  // Usar MeasurementMemory aquí
    (measurementMetric) => measurementMetric.measurementType, 
  )
  measurementMemoryRelations: MeasurementMetric[]; // Relación OneToMany con MeasurementMemory
}
