// update-visual.dto.ts
import { IsOptional, IsString, IsInt, IsArray } from 'class-validator';

export class UpdateVisualDto {
  @IsOptional()
  @IsString()
  serverName?: string;

  @IsOptional()
  @IsString()
  serverIp?: string;

  @IsOptional()
  @IsInt()
  serverPort?: number;

  @IsArray()
  @IsOptional()
  measurementTypeIds?: number[];
}
