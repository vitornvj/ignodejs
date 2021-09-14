import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;
  // verificar se é administador ou não
  const usersRepository = new UsersRepository();
  const { isAdmin } = await usersRepository.findById(id);
  if (!isAdmin) {
    throw new AppError("You dont have enough permissions!");
  }

  return next();
}
