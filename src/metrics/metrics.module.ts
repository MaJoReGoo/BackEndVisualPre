import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';  // Importa el HttpModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';
import { MeasurementVisual } from 'src/measurementVisual/entities/measurement-visual.entity';

@Module({
  imports: [
    HttpModule,  // Agrega HttpModule aquí
    TypeOrmModule.forFeature([MeasurementType, MeasurementVisual]),
  ],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
