import { IsString, MinLength, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  farmerId: string;
}
