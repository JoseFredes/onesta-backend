import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class FarmDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  location: string;
}