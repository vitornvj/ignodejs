import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create a new user", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryMemo: UsersRepositoryInMemory;
  beforeEach(() => {
    usersRepositoryMemo = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryMemo);
  });
  it("Should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "User name",
      password: "12345",
      email: "user@teste.com",
      driver_license: "000123",
    };
    await createUserUseCase.execute(user);
    const result = await usersRepositoryMemo.findByEmail(user.email);
    expect(result).toHaveProperty("id");
  });
  it("Should not be able to create user when email already exists", async () => {
    const user: ICreateUserDTO = {
      name: "User name",
      password: "12345",
      email: "user@teste.com",
      driver_license: "000123",
    };
    const user2: ICreateUserDTO = {
      name: "User 2",
      password: "123456",
      email: "user@teste.com",
      driver_license: "0001234",
    };
    await createUserUseCase.execute(user);
    await expect(createUserUseCase.execute(user2)).rejects.toEqual(
      new AppError("User already exists!"),
    );
  });
});
