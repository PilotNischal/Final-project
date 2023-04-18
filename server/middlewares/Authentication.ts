import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config";

interface JwtToken {
  username: string;
  iat: string;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == undefined) {
    return res.status(400).send("No token available");
  }
  try {
    const { username } = jwt.verify(
      token,
      config.ACCESS as string
    ) as unknown as JwtToken;

    if (!username) {
      return res.status(401).send("Invalid Token");
    }
    console.log("====================================");
    console.log(username);
    console.log("====================================");
    req.body.username = username;

    next();
  } catch (error) {
    return res.status(406).send("Login To continue");
  }
}

export function authenticateadmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) {
    return res.status(400).send("No token available");
  }
  console.log("====================================");
  console.log(token);
  console.log("====================================");
  try {
    const { username } = jwt.verify(
      token,
      config.ACCESS as string
    ) as unknown as JwtToken;

    if (!username) {
      return res.status(401).send("Invalid Token");
    }
    req.body.username = username;
    next();
  } catch (error) {
    return res.status(406).send("Login To continue");
  }
}

export function authenticateTokenSeller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) {
    return res.status(400);
  }
  try {
    const { username } = jwt.verify(
      token,
      config.ACCESS as string
    ) as unknown as JwtToken;
    req.body.seller = username;
    next();
  } catch {
    return res.status(406).send("Please login or register");
  }
}
