import { IsString } from "class-validator";

export class CreateMeasurementTypeDto {
    @IsString()
    name: string;
}
