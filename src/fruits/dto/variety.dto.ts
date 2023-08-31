import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class VarietyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
