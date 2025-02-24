// src/memory-ram/entities/memory-ram.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MeasurementMetric } from 'src/measurement-metrics/entities/measurement-metric.entity'; // Importación correcta

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metric: string; // Memoria disponible en bytes (windows_memory_available_bytes)

  @OneToMany(
    () => MeasurementMetric, // Usar MeasurementMemory
    (measurementMetric) => measurementMetric.metric,
  )
  measurementMemoryRelations: MeasurementMetric[];
}
