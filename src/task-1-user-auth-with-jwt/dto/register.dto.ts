import {
  IsEmail,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 1,
    },
    {
      message:
        'Password must contain atleast \n\n1 uppercare letter, \n1 lowercase letter, \n1 number, and \n1 special character',
    },
  )
  @ApiProperty({ type: String, required: true })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true })
  firstname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  lastname: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('IN')
  @ApiProperty({ type: String })
  phone: string;
}
