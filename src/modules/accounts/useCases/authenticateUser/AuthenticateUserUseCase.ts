import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

type IResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
};
type IRequest = {
  email: string;
  password: string;
};
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const { secret_token, secret_refresh_token, expires_in_token } = auth;
    // verificar se o usuário existe
    if (!user) {
      throw new AppError("User or password incorrect!");
    }
    const passwordMatch = await compare(password, user.password);

    // verificar se a senha está correta
    if (!passwordMatch) {
      throw new AppError("User or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });
    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );
    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
