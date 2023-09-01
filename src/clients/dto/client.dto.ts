import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
