import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(dto: { pageSize?: number; page?: number }) {
    console.log('swt', dto);
    const categoryFindManyArgs = {
      include: {
        articles: true,
      },
    };
    let row = this.configService.get('ARTICLE_PAGE_ROW');
    let page = 0;
    if (dto.pageSize && dto.page) {
      row = +dto.pageSize ?? this.configService.get('ARTICLE_PAGE_ROW');
      page = dto.page ? +dto.page : 1;
      categoryFindManyArgs['skip'] = (page - 1) * row;
      categoryFindManyArgs['take'] = +row;
    }

    const categorys = await this.prisma.category.findMany(categoryFindManyArgs);

    const total_count = await this.prisma.category.count();

    return {
      list: categorys,
      page_info: {
        current_page: page,
        current_row: +row,
        total_count,
        total_page: Math.ceil(total_count / row),
      },
    };
  }

  findOne(id: number) {
    return this.prisma.category.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
