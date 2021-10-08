import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not Exist');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not Exist');
    }

    const tokenCreatedAr = userToken.created_at;
    const compareDate = addHours(tokenCreatedAr, 2); //validade de criação do token

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }
    const passwordHas = await hash(password, 8);

    user.password = passwordHas;

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
