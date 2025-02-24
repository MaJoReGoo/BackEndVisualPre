import { Module } from '@nestjs/common';
import { VisualService } from './visual.service';
import { VisualController } from './visual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visual } from './entities/visual.entity';
import { MeasurementTypesModule } from 'src/measurement-types/measurement-types.module';
import { MeasurementTypesService } from 'src/measurement-types/measurement-types.service';
import { MeasurementVisual } from '../measurementVisual/entities/measurement-visual.entity'; // Importa MeasurementVisual

@Module({
  imports: [
    TypeOrmModule.forFeature([Visual, MeasurementVisual]), // Agrega MeasurementVisual aquí
    MeasurementTypesModule,
  ],
  controllers: [VisualController],
  providers: [VisualService, MeasurementTypesService],
})
export class VisualModule {}
