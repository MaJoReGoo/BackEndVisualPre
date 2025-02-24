import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementType } from './entities/measurement-type.entity';
import { UpdateMeasurementTypeDto } from './dto/update-measurement-type.dto';
import { CreateMeasurementTypeDto } from './dto/create-measurement-type.dto';

@Injectable()
export class MeasurementTypesService {
  constructor(
    @InjectRepository(MeasurementType)
    private readonly measurementTypeRepository: Repository<MeasurementType>,
  ) {}

  // Método para recibir las métricas asociadas a un servidor

  // Método para ejecutar la inserción de las métricas (Seeder)

  // Crear un nuevo tipo de medición
  async create(createMeasurementTypeDto: CreateMeasurementTypeDto) {
    return await this.measurementTypeRepository.save(createMeasurementTypeDto);
  }

  // Obtener todos los tipos de medición
  async findAll() {
    return await this.measurementTypeRepository.find();
  }

  // Obtener un tipo de medición por su ID
  async findOne(id: number) {
    return await this.measurementTypeRepository.findOne({ where: { id } });
  }

  // Actualizar un tipo de medición por su ID
  async update(id: number, updateMeasurementTypeDto: UpdateMeasurementTypeDto) {
    const measurementType = await this.measurementTypeRepository.findOne({
      where: { id },
    });

    if (!measurementType) {
      throw new Error(`MeasurementType with id ${id} not found`);
    }

    Object.assign(measurementType, updateMeasurementTypeDto);
    return await this.measurementTypeRepository.save(measurementType);
  }

  // Eliminar un tipo de medición por su ID
  async remove(id: number) {
    const result = await this.measurementTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`MeasurementType with id ${id} not found`);
    }
    return `MeasurementType with id ${id} removed successfully`;
  }
}
