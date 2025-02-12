import { Module } from '@nestjs/common';
import { MeasurementTypesService } from './measurement-types.service';
import { MeasurementTypesController } from './measurement-types.controller';
import { MeasurementType } from './entities/measurement-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementType])],
  controllers: [MeasurementTypesController],
  providers: [MeasurementTypesService],
  exports: [TypeOrmModule]
})
export class MeasurementTypesModule {}
