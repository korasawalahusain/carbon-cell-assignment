import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  email: string;
  phone: string;
  fullname: string;
  lastname: string;
  firstname: string;
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
