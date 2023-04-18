import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }

    return user;
  }
}
