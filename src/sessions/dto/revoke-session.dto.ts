import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RevokeSessionDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
