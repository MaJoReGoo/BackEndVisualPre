import { IsArray, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVisualDto {

  @IsString()
  serverName: string;
  @IsString()
  serverIp: string;
  @IsInt()
  serverPort: number;
  @IsOptional()
  @IsArray()
  measurementTypeIds?: number[];  // Cambiar de measurementType a measurementTypeIds
}
