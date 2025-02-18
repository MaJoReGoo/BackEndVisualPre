import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { MeasurementVisualService } from './measurement-visual.service';
import { CreateMeasurementVisualDto } from './dto/create-measurement-visual.dto';
import { UpdateMeasurementVisualDto } from './dto/update-measurement-visual.dto';

@Controller('measurement-visual')
export class MeasurementVisualController {
  constructor(private readonly measurementVisualService: MeasurementVisualService) {}

  // Endpoint para crear la relación
  @Post()
  async create(@Body() createMeasurementVisualDto: CreateMeasurementVisualDto) {
    return this.measurementVisualService.create(createMeasurementVisualDto);
  }

  // Endpoint para actualizar la relación
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMeasurementVisualDto: UpdateMeasurementVisualDto) {
    return this.measurementVisualService.update(id, updateMeasurementVisualDto);
  }
}
