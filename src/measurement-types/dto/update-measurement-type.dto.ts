import { IsString } from 'class-validator';

export class UpdateMeasurementTypeDto {
  @IsString()
  name: string;
}
