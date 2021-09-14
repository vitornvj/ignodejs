import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.usersTokens.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );
  }
  async deleteById(id: string): Promise<void> {
    const findIndex = this.usersTokens.findIndex(u => u.id === id);
    this.usersTokens.splice(findIndex, 1);
  }
  async findByToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );
  }
}

export { UsersTokenRepositoryInMemory };
