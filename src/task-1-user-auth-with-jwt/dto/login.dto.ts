import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true })
  password: string;
}
