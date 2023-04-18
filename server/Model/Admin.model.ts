import mongoose from "mongoose";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
@pre<Admin>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  }
})
export class Admin {
  @prop({ required: true })
  firstname: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({
    required: true,
    default: crypto.randomUUID().toString(),
    unique: true,
  })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, unique: true, default: crypto.randomInt(99999) })
  otpToken: number;
  @prop({ required: true, unique: true, default: crypto.randomInt(99999) })
  resetPassword: number;

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public compareToken(token: number): Boolean {
    return token === this.resetPassword;
  }
}

export const AdminModel = getModelForClass(Admin, {
  schemaOptions: {
    timestamps: true,
  },
});
