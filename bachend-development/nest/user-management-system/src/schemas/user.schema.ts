import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 8 })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ min: 16, max: 60 })
  age: number;

  @Prop({
    length: 11,
    validate: {
      validator: (num: string) => /^01\d{9}$/.test(num),
      message: 'Mobile number not valid',
    },
  })
  mobileNumber: string;

  @Prop({ default: UserRole.user, enum: UserRole })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
