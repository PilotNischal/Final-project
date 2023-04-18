import logger from "../config/logger/logger";
import { Request, Response } from "express";
import {
  adminLoginBodyType,
  adminRegisterBodyType,
  adminresetPasswordType,
} from "../Schema/Admin.schema";
import {
  adminRegisterService,
  adminLoginService,
  adminResetPasswordService,
  totalCarDetailsService,
} from "../Services/Admin.service";

export const adminRegisterController = async (
  req: Request<{}, {}, Omit<adminRegisterBodyType, "confirmPassword">>,
  res: Response
): Promise<void> => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const { response, statusNumber, acessToken, firstName } =
      await adminRegisterService({
        firstname,
        lastname,
        email,
        password,
      });
    res.status(statusNumber).send({ response, acessToken, firstName });
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const adminLoginController = async (
  req: Request<{}, {}, adminLoginBodyType>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { response, statusNumber, acessToken, firstName } =
      await adminLoginService({
        email,
        password,
      });
    res.status(statusNumber).json({ response, acessToken, firstName });
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const adminResetPasswordController = async (
  req: Request<{}, {}, adminresetPasswordType>,
  res: Response
): Promise<void> => {
  try {
    const { newPassword, username } = req.body;
    const { response, statusNumber } = await adminResetPasswordService({
      newPassword,
      username,
    });
    res.status(statusNumber).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const totalCarDetailsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resp = await totalCarDetailsService();
  res.status(resp?.statusNumber as number).send(resp?.response);
};
