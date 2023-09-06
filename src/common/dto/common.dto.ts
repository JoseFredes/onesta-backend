import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
export class EmailDto {
  @IsEmail()
  email: string;
}

export class NameDto {
  @IsNotEmpty()
  name: string;
}

export class idDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
