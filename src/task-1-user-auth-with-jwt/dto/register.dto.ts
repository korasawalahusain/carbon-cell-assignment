import {
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsBoolean()
  @IsOptional()
  newsletterSigned: boolean;

  @IsBoolean()
  @IsNotEmpty()
  termsAndConditions: boolean;
}
