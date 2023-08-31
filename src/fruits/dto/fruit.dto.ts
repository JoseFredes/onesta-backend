import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class FruitDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
