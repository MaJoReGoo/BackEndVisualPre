import { PartialType } from '@nestjs/mapped-types';
import { CreateVisualDto } from './create-visual.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateVisualDto {
  @IsString()
  @IsOptional()
  serverName?: string;
  @IsString()
  @IsOptional()
  serverIp?: string;
  @IsInt()
  @IsOptional()
  serverPort?: number;
  @IsOptional()
    measurementType?: string;
}
