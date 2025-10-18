import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
   {
      name: {
         type: String,
         required: [true, 'Name is required'],
         trim: true,
      },
      role: {
         type: String,
         enum: ['admin', 'employee'],
         default: 'employee',
      },
      email: {
         type: String,
         unique: true,
         required: [true, 'Email is required'],
         index: true,
         lowercase: true,
         trim: true,
         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      },
      password: {
         type: String,
         required: [true, 'Password is required'],
         minlength: [6, 'Password must be at least 6 characters'],
      },
      avatar: {
         public_id: String,
         url: String,
      },
      isActive: {
         type: Boolean,
         default: true,
      },
      lastLogin: {
         type: Date,
         default: null,
      },
      refreshToken: {
         type: String,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

userSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   this.password = bcrypt.hashSync(this.password, config.bcrypt_salt_rounds);
   next();
});

userSchema.methods.toJSON = function () {
   const userObject = this.toObject();
   delete userObject.password;
   delete userObject.refreshToken;
   return userObject;
};

export const User = model<IUser, UserModel>('User', userSchema);
