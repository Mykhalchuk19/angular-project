import { StatusEnum } from './common';

export enum UserRoleEnum {
  ADMIN = 1,
  MANAGER = 2,
}

type Avatar = {
  id: string;
  fileName: string;
};

export type UserEntity = {
  id: number,
  username: string,
  name: string,
  surname: string,
  phone: string,
  email: string,
  role: UserRoleEnum,
  status: StatusEnum,
  createdAt: string,
  updatedAt: string,
  avatar: Avatar | null;
};

export type UsersList = UserEntity[];

export type UpdateUserValues = {
  name: string,
  surname: string,
  email: string,
  username: string,
  phone: string,
  status: StatusEnum,
  role: UserRoleEnum,
};
