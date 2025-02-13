import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVisualDto } from './dto/create-visual.dto';
import { UpdateVisualDto } from './dto/update-visual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visual } from './entities/visual.entity';
import { Repository } from 'typeorm';
import { MeasurementType } from '../measurement-types/entities/measurement-type.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class VisualService {
  constructor(
    @InjectRepository(Visual)
    private readonly visualRepository: Repository<Visual>,

    @InjectRepository(MeasurementType)
    private readonly measurementTypeRepository: Repository<MeasurementType>,
  ) {}

  async create(createVisualDto: CreateVisualDto, user: UserActiveInterface) {
    if (!createVisualDto.measurementType) {
      throw new BadRequestException('Measurement type is required');
    }
    
    const measurementType = await this.validateMeasurementType(createVisualDto.measurementType);
    return await this.visualRepository.save({
      ...createVisualDto,
      measurementType: measurementType,
      userEmail: user.email,
    });
  }
  

  async findOne(id: number, user: UserActiveInterface) {
    const visual = await this.visualRepository.findOneBy({ id });

    if (!visual) {
      throw new BadRequestException('Visual not found');
    }

    this.validateOwnership(visual, user);
    return visual;
  }

  findAll() {
    return this.visualRepository.find();
  }

  async update(id: number, updateVisualDto: UpdateVisualDto, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.visualRepository.update(id, {
      ...updateVisualDto,
      measurementType: updateVisualDto.measurementType
        ? await this.validateMeasurementType(updateVisualDto.measurementType)
        : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.visualRepository.softDelete({ id });
  }

  private validateOwnership(visual: Visual, user: UserActiveInterface) {
    if (user.rol !== Role.ADMIN && visual.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateMeasurementType(measurementType: string) {
    const measurementTypeEntity = await this.measurementTypeRepository.findOneBy({
      name: measurementType,
    });

    if (!measurementTypeEntity) {
      throw new BadRequestException('Measurement type not found');
    }

    return measurementTypeEntity;
  }
}
