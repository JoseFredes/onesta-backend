import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVarietyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fruitId?: string;
}

export class UpdateVarietyDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  fruitId?: string;
}
