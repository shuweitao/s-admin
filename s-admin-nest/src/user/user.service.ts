import { formatUTC, success } from '@/helper';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { isArray } from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  delRoles(roles: any) {
    let rolesTemp = roles;
    if (!isArray(rolesTemp)) {
      rolesTemp = [rolesTemp];
    }

    return rolesTemp;
  }

  async create(dto: CreateUserDto) {
    console.log('swt', dto);
    let userRoles = this.delRoles(dto.roles);
    const user = await this.prisma.user.create({
      data: {
        account: dto.account,
        username: dto.username,
        status: dto.status,
        password: await hash(dto.password),
        roles: {
          connect: userRoles.map((id) => ({ id: +id })),
        }, // 通过connect来创建多对多关系
      },
    });
    return user;
  }

  async getRoleUserList(dto: GetUserDto) {
    const row = +dto.pageSize ?? this.configService.get('ARTICLE_PAGE_ROW');
    const page = dto.page ? +dto.page : 1;
    console.log(dto);

    const whereData: any = {
      roles: {
        some: {},
      },
      AND: [],
    };
    if (dto.account) {
      whereData['account'] = dto.account;
    }
    if (dto.username) {
      whereData['username'] = dto.username;
    }
    // if (dto.status) {
    whereData['status'] = dto.status;
    // }
    if (dto.roles) {
      whereData.roles.some.id = dto.roles;
    }

    if (dto.created_at && dto.created_at.length) {
      // const s_time = formatUTC(dto.created_at[0]);
      // const e_time = formatUTC(dto.created_at[1]);
      // console.log(s_time, e_time);
      whereData.AND.push({ created_at: { gte: new Date(dto.created_at[0]) } }); // 大于等于
      whereData.AND.push({ created_at: { lte: new Date(dto.created_at[1]) } }); // 小于等于
    }

    const users = await this.prisma.user.findMany({
      where: {
        ...whereData,
      },
      select: {
        id: true,
        account: true,
        username: true,
        status: true,
        created_at: true,
        updated_at: true,
        roles: true,
      },
      skip: (page - 1) * row,
      take: +row,
      // include: {
      //   roles: true,
      // },
    });

    const total_count = await this.prisma.user.count({
      where: {
        ...whereData,
      },
    });

    return {
      list: users,
      page_info: {
        current_page: page,
        current_row: +row,
        total_count,
        total_page: Math.ceil(total_count / row),
      },
    };
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: true, // 返回所有字段
      },
    });
  }

  findAllAndRole() {
    return this.prisma.user.findMany({
      where: {
        username: '尼克',
      },
      include: {
        roles: true, // 返回所有字段
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: +id },
      include: {
        roles: true,
      },
    });
    console.log('swt', user);
    if (!user)
      throw new HttpException(
        success('用户不存在', {}, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user: any = await this.findOne(id);
    const roleIds = user.roles.map((item) => item.id);
    let userRoles = this.delRoles(dto.roles);
    const userUpdate = await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        username: dto.username,
        status: dto.status,
        roles: {
          disconnect: roleIds.map((id) => ({ id })), // 先删除
          connect: userRoles.map((id) => ({ id: +id })), // 后新增
        },
      }, // 通过connect来创建多对多关系{,
    });

    return userUpdate;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    console.log('swt', user);
    if (!user)
      throw new HttpException(
        success('用户不存在', {}, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );

    return await this.prisma.user.delete({
      where: {
        id: +id,
      },
      include: {
        roles: true,
      }, // 通过connect来创建多对多关系{,
    });
  }
}
