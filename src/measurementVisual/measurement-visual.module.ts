import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementVisualService } from './measurement-visual.service';
import { MeasurementVisualController } from './measurement-visual.controller';
import { MeasurementVisual } from './entities/measurement-visual.entity';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';
import { Visual } from 'src/visual/entities/visual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementVisual, MeasurementType, Visual])],
  providers: [MeasurementVisualService],
  controllers: [MeasurementVisualController],
})
export class MeasurementVisualModule {}
