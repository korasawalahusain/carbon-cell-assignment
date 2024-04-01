import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  @ApiProperty({ type: String, required: true })
  refreshToken: string;
}
