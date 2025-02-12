import { Optional } from "@nestjs/common";
import { IsInt, IsString } from "class-validator";

export class CreateVisualDto {

  @IsString()
  serverName: string;
  @IsString()
  serverIp: string;
  @IsInt()
  serverPort: number;
  @IsString()
  @Optional()
  measurementType?: string;
}
