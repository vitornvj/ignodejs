import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { MailProviderInMemory };
