import { Request, Response, NextFunction, response } from "express";
import logger from "../config/logger/logger";

import {
  forgotPasswordBodyType,
  loginBodyType,
  registerBodyType,
  resendTokenBodyType,
  resetPasswordType,
  tokenBodyType,
  verifyfpotpBodyType,
} from "../Schema/User.schema";

import {
  createUserService,
  getAllUserService,
  findUserService,
  loginUserService,
  verifyOtpService,
  resendOtpService,
  forgotPasswordService,
  verifyFpOtpService,
  resetPassswordService,
  sendMailService,
} from "../Services/User.service";

export const registerUserController = async (
  req: Request<{}, {}, Omit<registerBodyType, "confirmPassword">>,
  res: Response
) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const response = await createUserService({
      email,
      password,
      firstname,
      lastname,
    });

    if (typeof response === "string") return res.send(response).status(400);

    return res.status(200).send({
      message: response?.response,
    });
  } catch (error: any) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }
    return res.status(400).send("Error while Registration");
  }
};

export const verifyOtpController = async (
  req: Request<{}, {}, tokenBodyType>,
  res: Response
) => {
  try {
    const { email, otp } = req.body;
    const response = await verifyOtpService({ email, otp });
    if (typeof response === "string") return res.send(response).status(400);

    return res.status(200).send({
      access: response.access,
      email: response.email,
      firstName: response.firstName,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }
    return res.status(400).send("Error while Verifying otp");
  }
};

export const resendOtpController = async (
  req: Request<{}, {}, resendTokenBodyType>,
  res: Response
) => {
  try {
    const { email } = req.body;
    const response = await resendOtpService({ email });
    if (typeof response === "string") return res.send(response).status(400);
    return res.status(200).send({
      message: response.response,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }

    return res.status(400).send("Error while resending otp");
  }
};

export const forgotPasswordController = async (
  req: Request<{}, {}, forgotPasswordBodyType>,
  res: Response
) => {
  try {
    const { email } = req.body;
    const response = await forgotPasswordService({ email });

    if (typeof response === "string") return res.status(400).send(response);
    return res.status(200).send({
      message: response.response,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }
    return res.status(400).send("Error while resending otp");
  }
};

export const verifyFpOtpController = async (
  req: Request<{}, {}, verifyfpotpBodyType>,
  res: Response
) => {
  try {
    const { email, otp } = req.body;
    const response = await verifyFpOtpService({ email, otp });
    if (typeof response === "string") return res.status(400).send(response);
    return res.status(200).send({
      message: response.response,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }
    return res.status(400).send("Error while resending otp");
  }
};

export const resetPasswordController = async (
  req: Request<{}, {}, Omit<resetPasswordType, "confirmPassword">>,
  res: Response
) => {
  try {
    const { email, newPassword } = req.body;
    const response = await resetPassswordService({ email, newPassword });
    if (typeof response === "string") return res.send(response).status(400);
    return res.status(200).send({
      message: response.response,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (typeof error === "string") {
      return res.status(400).send(error);
    }
    return res.status(400).send("Error while resending otp");
  }
};
export const getAllUsersContoller = async (req: Request, res: Response) => {
  try {
    const response = await getAllUserService();
    res.status(200).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send("Error");
  }
};
export const loginUsersContoller = async (
  req: Request<{}, {}, loginBodyType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const response = await loginUserService({ email, password });
    if (typeof response === "string") throw response;
    res.status(200).send({
      access: response.access,
      email: response.email,
      firstName: response.firstName,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const sendMailController = async (req: Request, res: Response) => {
  const { title, message, email } = req.body;
  const response = await sendMailService(title, message, email);

  res.status(response.statusNumber).send(response.response);
};
