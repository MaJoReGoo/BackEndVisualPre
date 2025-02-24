// src/visual/dto/create-visual.dto.ts

import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreateVisualDto {
  @IsNotEmpty()
  serverName: string;

  @IsNotEmpty()
  serverIp: string;

  @IsNotEmpty()
  serverPort: string;

  // Cambiar measurementTypeId a measurementTypeIds (un array de números)
  @IsArray()
  @IsInt({ each: true }) // Asegúrate de que cada elemento del array sea un número
  measurementTypeIds: number[];
}
