import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateVisualDto } from './dto/create-visual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visual } from './entities/visual.entity';
import { MeasurementType } from '../measurement-types/entities/measurement-type.entity';
import { MeasurementVisual } from '../measurementVisual/entities/measurement-visual.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/role.enum';
import { In } from 'typeorm';
import { UpdateVisualDto } from './dto/update-visual.dto';

@Injectable()
export class VisualService {
  constructor(
    @InjectRepository(Visual)
    private readonly visualRepository: Repository<Visual>,

    @InjectRepository(MeasurementType)
    private readonly measurementTypeRepository: Repository<MeasurementType>,

    @InjectRepository(MeasurementVisual)
    private readonly measurementVisualRepository: Repository<MeasurementVisual>,
  ) {}

  // Crear un nuevo Visual y asociarlo con MeasurementTypes
  async create(createVisualDto: CreateVisualDto, user: UserActiveInterface) {
    if (
      !createVisualDto.measurementTypeIds ||
      createVisualDto.measurementTypeIds.length === 0
    ) {
      throw new BadRequestException(
        'At least one measurement type is required',
      );
    }

    const measurementTypes = await this.measurementTypeRepository.find({
      where: { id: In(createVisualDto.measurementTypeIds) },
    });

    if (!measurementTypes || measurementTypes.length === 0) {
      throw new BadRequestException('Measurement types not found');
    }

    const newVisual = this.visualRepository.create({
      ...createVisualDto,
      serverPort: parseInt(createVisualDto.serverPort, 10), // Convertir a número
      userId: user.id,
    });

    // Save the Visual entity as a single object
    const visual = await this.visualRepository.save(newVisual);

    // Create relationships in the MeasurementVisual table
    for (const measurementType of measurementTypes) {
      const measurementVisual = new MeasurementVisual();
      measurementVisual.visual = visual; // Make sure visual is a single object here
      measurementVisual.measurementType = measurementType;
      await this.measurementVisualRepository.save(measurementVisual);
    }

    return visual;
  }

  // Obtener un solo Visual por ID
  async findOne(id: number, user: UserActiveInterface) {
    const visual = await this.visualRepository.findOne({
      where: { id },
      relations: ['measurementVisuals', 'measurementVisuals.measurementType'],
    });

    if (!visual) {
      throw new BadRequestException('Visual not found');
    }

    this.validateOwnership(visual, user);

    // Obtener solo los IDs de MeasurementVisuals
    const measurementVisualIds = visual.measurementVisuals.map(
      (measurementVisual) => measurementVisual.id,
    );
    console.log('Measurement Visual IDs:', measurementVisualIds);

    return visual;
  }

  // Obtener todos los Visuales
  findAll() {
    return this.visualRepository.find({
      relations: ['measurementVisuals', 'measurementVisuals.measurementType'],
    });
  }

  // Eliminar un Visual
  async remove(id: number, user: UserActiveInterface) {
    const visual = await this.findOne(id, user);

    // Eliminar las relaciones de MeasurementVisual asociadas
    await this.measurementVisualRepository.delete({ visual });

    // Eliminar el Visual
    return await this.visualRepository.softDelete({ id });
  }

  // Actualizar un Visual y sus relaciones con MeasurementTypes
  async update(
    id: number,
    updateVisualDto: UpdateVisualDto,
    user: UserActiveInterface,
  ) {
    // Buscar el Visual que queremos actualizar, con sus relaciones
    const visual = await this.visualRepository.findOne({
      where: { id },
      relations: ['measurementVisuals', 'measurementVisuals.measurementType'],
    });

    if (!visual) {
      throw new BadRequestException('Visual not found');
    }

    // Validar que el usuario tiene permisos para modificar el visual
    this.validateOwnership(visual, user);

    // Actualizar los campos básicos del Visual solo si no son null o undefined
    if (
      updateVisualDto.serverName !== undefined &&
      updateVisualDto.serverName !== null
    ) {
      visual.serverName = updateVisualDto.serverName;
    }

    if (
      updateVisualDto.serverIp !== undefined &&
      updateVisualDto.serverIp !== null
    ) {
      visual.serverIp = updateVisualDto.serverIp;
    }

    if (
      updateVisualDto.serverPort !== undefined &&
      updateVisualDto.serverPort !== null
    ) {
      visual.serverPort = updateVisualDto.serverPort;
    }

    // Obtener los nuevos MeasurementType IDs
    const measurementTypeIds = updateVisualDto.measurementTypeIds ?? [];

    if (measurementTypeIds.length > 0) {
      // Buscar los MeasurementTypes correspondientes
      const measurementTypes = await this.measurementTypeRepository.find({
        where: { id: In(measurementTypeIds) },
      });

      if (!measurementTypes || measurementTypes.length === 0) {
        throw new BadRequestException('Measurement types not found');
      }

      // Obtener las relaciones actuales entre Visual y MeasurementTypes
      const existingMeasurementVisuals =
        await this.measurementVisualRepository.find({
          where: { visual: { id: visual.id } },
          relations: ['measurementType'],
        });

      const existingMeasurementTypeIds = existingMeasurementVisuals.map(
        (rel) => rel.measurementType.id,
      );

      // Eliminar las relaciones que ya no están en la lista de nuevos MeasurementTypes
      const typesToDelete = existingMeasurementVisuals.filter(
        (existing) => !measurementTypeIds.includes(existing.measurementType.id),
      );

      if (typesToDelete.length > 0) {
        await this.measurementVisualRepository.remove(typesToDelete);
      }

      // Agregar las nuevas relaciones que no existen en la tabla intermedia MeasurementVisual
      for (const measurementType of measurementTypes) {
        if (!existingMeasurementTypeIds.includes(measurementType.id)) {
          const measurementVisual = new MeasurementVisual();
          measurementVisual.visual = visual; // Asegúrate de que el ID de Visual esté presente aquí
          measurementVisual.measurementType = measurementType;
          await this.measurementVisualRepository.save(measurementVisual);
        }
      }
    }

    // Guardamos el Visual actualizado
    return await this.visualRepository.save(visual);
  }

  // Validar que el usuario tenga permiso para modificar el Visual
  private validateOwnership(visual: Visual, user: UserActiveInterface) {
    if (user.rol !== Role.ADMIN && visual.userId !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to modify this visual',
      );
    }
  }
}
