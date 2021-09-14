import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";

import { AppError } from "../../../errors/AppError";

type Payload = {
  sub: string;
};
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }
  // "BEARER [..TOKEN]" , PARA SEPARAR A STRING BEARER DO TOKEN QUE A GENTE QUER USAMOS O SPLIT
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, auth.secret_token) as Payload;

    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
