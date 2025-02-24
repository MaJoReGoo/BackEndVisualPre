// src/measurement-memory/entities/measurement-memory.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';
import { Metric } from 'src/metrics/entities/metric.entity';

@Entity()
export class MeasurementMetric {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MeasurementType, (measurementType) => measurementType.measurementMemoryRelations)
  measurementType: MeasurementType; // Llave foránea de MeasurementType

  @ManyToOne(() => Metric, (metric) => metric.measurementMemoryRelations)
  metric: Metric; // Llave foránea de MemoryRAM
}
