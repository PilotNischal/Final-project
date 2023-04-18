import mongoose from "mongoose";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true })
  firstname: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({
    required: true,
    default: crypto.randomUUID(),
    unique: true,
  })
  username: string;

  @prop({ required: true, default: 0 })
  otp: number;

  @prop({ required: true, default: false })
  verified: boolean;

  @prop({ required: true, default: crypto.randomUUID() })
  verification_token: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: crypto.randomBytes(12).toString("hex") })
  resetPassword: string;
  @prop({ required: false })
  profile: string;
  @prop({ required: false })
  bioImage: string;
  @prop({ required: false })
  bio: string;
  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public async compareOtp(otp: number): Promise<boolean> {
    return otp === this.otp;
  }
  public compareToken(token: string): Boolean {
    return token === this.resetPassword;
  }

  public compareVerificationToken(token: string): Boolean {
    return token === this.verification_token;
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
