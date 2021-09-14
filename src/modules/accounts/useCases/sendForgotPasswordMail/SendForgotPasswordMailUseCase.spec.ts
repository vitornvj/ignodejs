import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokenRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail ", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });
  it("Should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    // given
    await usersRepository.create({
      driver_license: "812159",
      email: "ci@wiwso.cn",
      name: "Violet Ford",
      password: "1234",
    });
    // when
    await sendForgotPasswordUseCase.execute("ci@wiwso.cn");
    // then
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does not exist ", async () => {
    await expect(
      sendForgotPasswordUseCase.execute("wili@mitlurvi.gq"),
    ).rejects.toEqual(new AppError("User does not exists!"));
  });
  it("Should be able to create an users tokens", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, "create");
    await usersRepository.create({
      driver_license: "174145",
      email: "noem@gekuhe.mn",
      name: "Alvin Schneider",
      password: "1234",
    });
    await sendForgotPasswordUseCase.execute("noem@gekuhe.mn");
    expect(generateTokenMail).toBeCalled();
  });
});
