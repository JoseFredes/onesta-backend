import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHarvestDto {
  @IsUUID()
  @IsNotEmpty()
  farmer: string;

  @IsUUID()
  @IsNotEmpty()
  client: string;

  @IsUUID()
  @IsNotEmpty()
  farm: string;

  @IsUUID()
  @IsNotEmpty()
  fruit: string;

  @IsUUID()
  @IsNotEmpty()
  variety: string;
}
