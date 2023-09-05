import { IsEmail, IsNotEmpty } from 'class-validator';
export class EmailDto {
  @IsEmail()
  email: string;
}

export class NameDto {
  @IsNotEmpty()
  name: string;
}
