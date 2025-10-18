import { Model } from 'mongoose';

export type IUser = {
   name: string;
   role: string;
   email: string;
   password: string;
   avatar: string;
   isActive: boolean;
   lastLogin: Date;
   refreshToken?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
