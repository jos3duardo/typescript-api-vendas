import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

class SendForgotPasswordForgotService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not Exist');
    }

    const token = await userTokensRepository.generate(user.id);
    console.log(token);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `https://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordForgotService;
