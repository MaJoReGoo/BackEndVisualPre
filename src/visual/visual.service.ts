import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisualDto } from './dto/create-visual.dto';
import { UpdateVisualDto } from './dto/update-visual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visual } from './entities/visual.entity';
import { Repository } from 'typeorm';
import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';

@Injectable()
export class VisualService {
  constructor(
    @InjectRepository(Visual)
    private readonly visualRepository: Repository<Visual>,

    @InjectRepository(MeasurementType)
    private readonly measurementTypeRepository: Repository<MeasurementType>,
  ) {}

  async create(createVisualDto: CreateVisualDto) {
    const measurementType = await this.measurementTypeRepository.findOneBy({
      name: createVisualDto.measurementType,
    });
    if (!measurementType) {
      throw new BadRequestException('Measurement type not found');
    }

    /* return await this.visualRepository.save(createVisualDto); */
    return await this.visualRepository.save({
      ...createVisualDto,
      measurementType,
    });
  }

  async findAll() {
    return await this.visualRepository.find();
  }

  async findOne(id: number) {
    return await this.visualRepository.findOneBy({ id });
  }

  async update(id: number, updateVisualDto: UpdateVisualDto) {
    /* return await this.visualRepository.update(id, updateVisualDto); */
    return;
  }

  async remove(id: number) {
    return await this.visualRepository.softDelete({ id });
  }
}
