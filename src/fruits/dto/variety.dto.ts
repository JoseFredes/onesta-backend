import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVarietyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fruit?: string;
}
