import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { transTree } from '@/helper';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prisma.permission.create({
      data: {
        ...createMenuDto,
        pid: +createMenuDto.pid,
      },
    });
  }

  async findAll() {
    const menus = await this.prisma.permission.findMany();

    return transTree(menus);
  }

  async findOne(id: number) {
    const menu = await this.prisma.permission.findFirst({
      where: {
        id,
      },
    });
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.prisma.permission.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
    return menu;
  }

  async remove(id: number) {
    const menu = await this.prisma.permission.delete({
      where: {
        id,
      },
    });
    return menu;
  }
}
