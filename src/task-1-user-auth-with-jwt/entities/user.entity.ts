import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ type: String, readOnly: true })
  id: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: String })
  fullname: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  profilePicture: string;

  @Exclude()
  password: string;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  createdAt: Date;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
