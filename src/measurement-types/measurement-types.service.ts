import { InjectRepository } from '@nestjs/typeorm';
import { CreateMeasurementTypeDto } from './dto/create-measurement-type.dto';
import { UpdateMeasurementTypeDto } from './dto/update-measurement-type.dto';
import { Repository } from 'typeorm';
import { MeasurementType } from './entities/measurement-type.entity';


export class MeasurementTypesService {


constructor(
  @InjectRepository(MeasurementType)
  private readonly measurementTypeRepository: Repository<MeasurementType>,
)
{}

 async create(createMeasurementTypeDto: CreateMeasurementTypeDto) {
    return await this.measurementTypeRepository.save(createMeasurementTypeDto);
  }

  async findAll() {
    return await this.measurementTypeRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} measurementType`;
  }

  async update(id: number, updateMeasurementTypeDto: UpdateMeasurementTypeDto) {
    return `This action updates a #${id} measurementType`;
  }

  async remove(id: number) {
    return `This action removes a #${id} measurementType`;
  }
}
