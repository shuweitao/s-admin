import { map } from 'rxjs/operators';
import { getArrDifference, success, transTree } from '@/helper';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { isArray } from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  delPermissions(permissions: any) {
    let permissionsTemp = permissions;
    if (!isArray(permissionsTemp)) {
      permissionsTemp = [permissionsTemp];
    }

    return permissionsTemp;
  }

  async create(dto: CreateRoleDto) {
    let permissionsTemp = this.delPermissions(dto.permissions);

    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status,
        permissions: {
          connect: permissionsTemp.map((id) => ({ id: +id })),
        }, // 通过connect来创建多对多关系
      },
    });
    return role;
  }

  async getMenuByRoles(ids: number[]) {
    const role: any = await this.prisma.role.findFirst({
      where: { id: ids[0] },
      include: {
        permissions: true,
      },
    });
    console.log('swt', role);
    if (!role)
      throw new HttpException(
        success('角色不存在', {}, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );

    const permissions = transTree(role.permissions);
    role.permissions = permissions;
    return role;
  }

  async findAll(dto: { pageSize?: number; page?: number }) {
    console.log('swt', dto);
    const roleFindManyArgs = {
      include: {
        permissions: true,
      },
    };
    let row = this.configService.get('ARTICLE_PAGE_ROW');
    let page = 0;
    if (dto.pageSize && dto.page) {
      row = +dto.pageSize ?? this.configService.get('ARTICLE_PAGE_ROW');
      page = dto.page ? +dto.page : 1;
      roleFindManyArgs['skip'] = (page - 1) * row;
      roleFindManyArgs['take'] = +row;
    }

    const roles = await this.prisma.role.findMany(roleFindManyArgs);

    const total_count = await this.prisma.role.count();

    return {
      list: roles,
      page_info: {
        current_page: page,
        current_row: +row,
        total_count,
        total_page: Math.ceil(total_count / row),
      },
    };
  }

  async findOne(id: number) {
    const role: any = await this.prisma.role.findFirst({
      where: { id },
      include: {
        permissions: true,
      },
    });
    console.log('swt', role);
    if (!role)
      throw new HttpException(
        success('角色不存在', {}, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );

    const permissions = transTree(role.permissions);
    role.permissions = permissions;
    return role;
  }

  async findPrmissionByRoleId(id: number) {
    const role: any = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
    const prmissionIds = role.permissions.map((item) => item.id);
    return prmissionIds;
  }

  async update(id: number, dto: UpdateRoleDto) {
    const prmissionIds = await this.findPrmissionByRoleId(id);

    let permissionsTemp = this.delPermissions(dto.permissions);
    console.log('swt', prmissionIds);

    const roles = await this.prisma.role.update({
      where: {
        id: +id,
      },
      data: {
        description: dto.description,
        status: dto.status,
        permissions: {
          disconnect: prmissionIds.map((id) => ({ id })), // 先删除
          connect: permissionsTemp.map((id) => ({ id: +id })), // 后新增
        },
      }, // 通过connect来创建多对多关系{,
    });

    return roles;
  }

  async remove(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    console.log('swt', role);
    if (!role)
      throw new HttpException(
        success('角色不存在', {}, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );

    return await this.prisma.role.delete({
      where: {
        id: +id,
      },
      include: {
        permissions: true,
      }, // 通过connect来创建多对多关系{,
    });
  }
}
