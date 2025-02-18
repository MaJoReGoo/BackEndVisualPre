import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MeasurementVisual } from './entities/measurement-visual.entity';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';
import { Visual } from 'src/visual/entities/visual.entity';
import { CreateMeasurementVisualDto } from './dto/create-measurement-visual.dto';
import { UpdateMeasurementVisualDto } from './dto/update-measurement-visual.dto';

@Injectable()
export class MeasurementVisualService {
  constructor(
    @InjectRepository(MeasurementVisual)
    private readonly measurementVisualRepository: Repository<MeasurementVisual>,
    @InjectRepository(MeasurementType)
    private readonly measurementTypeRepository: Repository<MeasurementType>,
    @InjectRepository(Visual)
    private readonly visualRepository: Repository<Visual>,
  ) {}

  // Crear la relación
  async create(createMeasurementVisualDto: CreateMeasurementVisualDto) {
    const { measurementTypeIds, visualId } = createMeasurementVisualDto;

    // Verificar si el Visual existe
    const visual = await this.visualRepository.findOneBy({ id: visualId });
    if (!visual) {
      throw new Error('Visual not found');
    }

    // Verificar si los MeasurementTypes existen
    const measurementTypes = await this.measurementTypeRepository.findBy({
      id: In(measurementTypeIds),
    });

    if (measurementTypes.length !== measurementTypeIds.length) {
      throw new Error('Some MeasurementTypes not found');
    }

    // Crear las relaciones de la tabla puente
    const measurementVisuals = measurementTypes.map((measurementType) =>
      this.measurementVisualRepository.create({
        visual,
        measurementType,
      }),
    );

    return this.measurementVisualRepository.save(measurementVisuals);
  }

  // Actualizar la relación (en este caso reemplazando los MeasurementTypes)
  async update(id: number, updateMeasurementVisualDto: UpdateMeasurementVisualDto) {
    const { measurementTypeIds, visualId } = updateMeasurementVisualDto;

    // Verificar si el Visual existe
    const visual = await this.visualRepository.findOneBy({ id: visualId });
    if (!visual) {
      throw new Error('Visual not found');
    }

    // Verificar si los MeasurementTypes existen
    const measurementTypes = await this.measurementTypeRepository.findBy({
      id: In(measurementTypeIds),
    });

    if (measurementTypes.length !== measurementTypeIds.length) {
      throw new Error('Some MeasurementTypes not found');
    }

    // Primero eliminar las relaciones existentes
    await this.measurementVisualRepository.delete({ visual: { id: visualId } });

    // Crear nuevas relaciones
    const measurementVisuals = measurementTypes.map((measurementType) =>
      this.measurementVisualRepository.create({
        visual,
        measurementType,
      }),
    );

    return this.measurementVisualRepository.save(measurementVisuals);
  }
}
