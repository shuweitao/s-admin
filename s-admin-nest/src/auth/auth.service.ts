import { BadRequestException, Injectable } from '@nestjs/common';
import RegitserDto from './dto/regitser.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import LoginDto from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // 注册
  async register(dto: RegitserDto) {
    const user = await this.prisma.user.create({
      data: {
        account: dto.account,
        password: await hash(dto.password),
      },
    });
    return user;
  }

  async login(dto: LoginDto) {
    // 根据唯一索引name查询用户
    const user = await this.prisma.user.findUnique({
      where: {
        account: dto.account,
      },
    });
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException({
        code: 422,
        data: {
          password: '密码输入错误',
        },
      });
    }
    return this.token(user);
  }

  private async token({ id, account }) {
    return {
      id,
      token: await this.jwt.signAsync({
        account,
        sub: id,
      }),
    };
  }
}
