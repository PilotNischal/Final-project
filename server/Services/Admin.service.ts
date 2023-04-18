import bcrypt from "bcrypt";
import mongoose from "mongoose";
import crypto from "crypto";
import logger from "../config/logger/logger";
import { Admin, AdminModel } from "../Model/Admin.model";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {
  adminLoginBodyType,
  adminRegisterBodyType,
  adminresetPasswordType,
} from "../Schema/Admin.schema";
import { User, UserModel } from "../Model/User.model";
import { CarBooking, CarBookingModel } from "../Model/CarBooking.model";

export async function adminRegisterService({
  firstname,
  lastname,
  email,
  password,
}: Omit<adminRegisterBodyType, "confirmPassword">): Promise<{
  response: any;
  statusNumber: number;
  acessToken?: string;
  firstName?: string;
}> {
  try {
    const checkEmail = await findAdminService(email);

    if (checkEmail !== null) {
      return {
        response: "This email already exist",
        statusNumber: 400,
      };
    } else {
      const USERNAME = crypto.randomUUID();
      const registerAdminCommand = await AdminModel.create({
        _id: new mongoose.Types.ObjectId(),
        username: USERNAME,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      const { username } = registerAdminCommand;
      const accessToken = jwt.sign({ user_name: username }, config.ACCESS, {
        expiresIn: "300s",
      });
      return {
        response: "Admin registration sucessful",
        statusNumber: 200,
        acessToken: accessToken,
        firstName: registerAdminCommand.firstname,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

export async function adminLoginService({
  email,
  password,
}: adminLoginBodyType): Promise<{
  response: any;
  statusNumber: number;
  acessToken?: string;
  firstName?: string;
}> {
  try {
    const checkEmail = await findAdminService(email);

    if (checkEmail == null) {
      return {
        response: "Your email doesnot exist",
        statusNumber: 400,
      };
    } else if (await checkEmail.comparePassword(password)) {
      const username = checkEmail.username;

      const acessToken = jwt.sign({ username: username }, config.ACCESS, {
        expiresIn: "1hr",
      });
      return {
        response: "Admin Login Sucessfull",
        statusNumber: 200,
        acessToken: acessToken,
        firstName: checkEmail.firstname,
      };
    } else {
      return {
        response: "Incorrect Password",
        statusNumber: 400,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

export async function adminResetPasswordService({
  username,
  newPassword,
}: adminresetPasswordType): Promise<{ response: any; statusNumber: number }> {
  try {
    const resetPasswordCommand = await resetPasswordService(
      username,
      newPassword
    );

    if (resetPasswordCommand.modifiedCount > 0) {
      return {
        response: "Password reset Sucessful",
        statusNumber: 200,
      };
    } else {
      return {
        response: "Password reset Unsucessful",
        statusNumber: 400,
      };
    }
  } catch (error) {
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

async function findAdminService(email: Admin["email"]) {
  return await AdminModel.findOne({
    email,
  });
}

async function resetPasswordService(
  username: Admin["username"],
  newPassword: Admin["password"]
) {
  return await AdminModel.updateOne(
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

export async function totalCarDetailsService(): Promise<
  | {
      response: any;
      statusNumber: number;
    }
  | undefined
> {
  try {
    let totalCost: any = 0;
    const totalUser = await findTotalUsers(true);
    const totalBookings = await findTotalBookings(true);
    const totalCancelled = await findTotalCancelled(false);
    const costs = await findTotalEarnings(true);

    costs.forEach((cost) => {
      totalCost = totalCost + cost.cost;
    });

    return {
      response: {
        TotalUser: totalUser,
        totalBookings: totalBookings,
        TotalCancelled: totalCancelled,
        Earnings: totalCost,
      },
      statusNumber: 200,
    };
  } catch (error) {
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

async function findTotalUsers(verified: User["verified"]) {
  return await UserModel.find({ verified: verified }).count();
}

async function findTotalBookings(status: CarBooking["status"]) {
  return await CarBookingModel.find({ verified: status }).count();
}

async function findTotalCancelled(status: CarBooking["status"]) {
  return await CarBookingModel.find({ verified: status }).count();
}

async function findTotalEarnings(status: CarBooking["status"]) {
  return await CarBookingModel.find({ status: status }, { cost: 1, _id: 0 });
}
