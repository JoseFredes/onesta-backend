import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFruitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateFruitDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
