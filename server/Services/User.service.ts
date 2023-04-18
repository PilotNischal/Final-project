import { UserModel, User } from "../Model/User.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import mongoose, { MongooseError } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {
  forgotPasswordBodyType,
  loginBodyType,
  registerBodyType,
  resendTokenBodyType,
  resetPasswordType,
  tokenBodyType,
  verifyfpotpBodyType,
} from "../Schema/User.schema";
import { response } from "express";
import { sendMail, sendMessageMail } from "../config/Mailer/Mailer";

export async function createUserService({
  email,
  password,
  firstname,
  lastname,
}: Omit<registerBodyType, "confirmPassword">): Promise<
  { response: string } | string | undefined
> {
  try {
    const username = crypto.randomUUID();
    const response = await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      firstname,
      lastname,
    });

    if (response) {
      const otp = Math.floor(Math.random() * 90000) + 10000;
      const resp = sendMail(otp, email, "nischal0407@xavier.edu.np");

      const setOtp = await UserModel.updateOne(
        { email: email },
        { $set: { otp: otp } }
      );

      if (setOtp) {
        return { response: "Code has been sent to your email" };
      }
    }
  } catch (error: any) {
    if (error.code && error.code === 11000) throw "User already exist" as const;
    throw "Error";
  }
}
export async function loginUserService({
  email,
  password,
}: loginBodyType): Promise<
  | {
      access: string;
      email: string;
      firstName: string;
    }
  | string
> {
  const user = await findUserService(email);
  if (!user || Object.entries(user).length === 0) {
    return "No User Found";
  } else if (await user.comparePassword(password)) {
    if (user.verified == true) {
      const username = user.username;
      const token = jwt.sign({ username: username }, config.ACCESS);
      return { access: token, email: email, firstName: user.firstname };
    } else {
      return "Account not verified";
    }
  } else {
    return "Password Incorrect";
  }
}

export async function verifyOtpService({ email, otp }: tokenBodyType): Promise<
  | {
      access: string;
      email: string;
      firstName: string;
    }
  | string
> {
  const searchUser = await UserModel.findOne({ email });
  if (!searchUser || Object.entries(searchUser).length === 0) {
    return "Invalid Verfication Token";
  } else if (await searchUser.compareOtp(otp)) {
    const verifyUser = await UserModel.updateOne(
      {
        email: email,
      },
      {
        $set: {
          verified: true,
          otp: Math.floor(Math.random() * 90000) + 10000,
        },
      }
    );
    if (verifyUser) {
      const token = jwt.sign({ username: searchUser.username }, config.ACCESS);
      return {
        access: token,
        email: searchUser.email,
        firstName: searchUser.firstname,
      };
    } else {
      return "Error";
    }
  } else {
    return "Otp is not correct";
  }
}

export async function resendOtpService({
  email,
}: resendTokenBodyType): Promise<any> {
  const user = await UserModel.findOne({ email });
  if (user) {
    const otp = Math.floor(Math.random() * 90000) + 10000;
    const resp = sendMail(otp, email, "nischal0407@xavier.edu.np");

    const setOtp = await UserModel.updateOne(
      { email: email },
      { $set: { otp: otp } }
    );
    if (setOtp) {
      return { response: "OTP has been sent" };
    } else {
      return "Error";
    }
  } else {
    return "Email not found";
  }
}

export async function forgotPasswordService({
  email,
}: forgotPasswordBodyType): Promise<any> {
  const user = await UserModel.findOne({ email });
  if (user) {
    if (user.verified) {
      const otp = Math.floor(Math.random() * 90000) + 10000;
      const resp = sendMail(otp, email, "nischal0407@xavier.edu.np");

      const setOtp = await UserModel.updateOne(
        { email: email },
        { $set: { otp: otp } }
      );
      if (setOtp) {
        return { response: "OTP has been sent to your email" };
      } else {
        return "Error";
      }
    } else {
      return "Account not verified";
    }
  } else {
    return "Account doesnot exist";
  }
}

export async function verifyFpOtpService({
  email,
  otp,
}: verifyfpotpBodyType): Promise<
  | {
      response: string;
    }
  | string
> {
  const searchUser = await UserModel.findOne({ email });
  if (!searchUser || Object.entries(searchUser).length === 0) {
    return "Invalid email sent";
  } else if (await searchUser.compareOtp(otp)) {
    const verifyUser = await UserModel.updateOne(
      {
        email: email,
      },
      {
        $set: {
          verified: true,
          otp: Math.floor(Math.random() * 90000) + 10000,
        },
      }
    );
    if (verifyUser) {
      return { response: "Otp verify successfull" };
    } else {
      return "Error";
    }
  } else {
    return "Otp is not correct";
  }
}

export async function resetPassswordService({
  email,
  newPassword,
}: Omit<resetPasswordType, "confirmPassword">): Promise<any> {
  if (email) {
    const resetPasswordCommand = await UserModel.updateOne(
      { email },
      { $set: { password: await bcrypt.hash(newPassword, 10) } }
    );
    if (resetPasswordCommand) {
      return { response: "Password reset Sucessful" };
    }
  } else {
    return "Email not found ";
  }
}

export async function findUserService(email: User["email"]) {
  return await UserModel.findOne({
    email,
  });
}

export async function getAllUserService() {
  return await UserModel.find();
}
export async function deleteUserService(username: User["username"]) {
  return UserModel.findOneAndDelete({
    username,
  });
}
export async function changePasswordService(
  username: User["username"],
  password: User["password"],
  newPassword: User["password"]
) {
  return UserModel.updateOne(
    {
      username,
    },
    {
      $set: {
        password: await bcrypt.hash(newPassword, 10),
      },
    }
  );
}

export async function sendMailService(
  title: string,
  message: string,
  email: string
): Promise<any> {
  const resp = sendMessageMail(
    (message = `From:${email} 
    message: ${message}`),
    title,
    "sagar.khadka2001@gmail.com",
    "nischal0407@xavier.edu.np"
  );

  return {
    response: "Message Sent check your email",
    statusNumber: 200,
  };
}
