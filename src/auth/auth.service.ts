import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, // private userService: UserService,
    private userService: UserService,
  ) {}

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    const token = await this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { token };
  }

  async getUser(user: Partial<User>) {
    return await this.userService.findOne(user.id);
  }
}
