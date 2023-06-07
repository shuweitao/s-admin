import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GetArticleDto } from './dto/get-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        category_id: +createArticleDto.category_id,
      },
    });
  }

  async getGetArticleList(dto: GetArticleDto) {
    const row = +dto.pageSize ?? this.configService.get('ARTICLE_PAGE_ROW');
    const page = dto.page ? +dto.page : 1;
    console.log(dto);

    const whereData: any = {
      AND: [],
    };
    if (dto.title) {
      whereData['title'] = dto.title;
    }
    if (dto.cid) {
      whereData['cid'] = dto.cid;
    }
    if (dto.status != -1) {
      whereData['status'] = dto.status;
    }

    if (dto.created_at && dto.created_at.length) {
      whereData.AND.push({ created_at: { gte: new Date(dto.created_at[0]) } }); // 大于等于
      whereData.AND.push({ created_at: { lte: new Date(dto.created_at[1]) } }); // 小于等于
    }

    const categorys = await this.prisma.article.findMany({
      where: {
        ...whereData,
      },
      skip: (page - 1) * row,
      take: +row,
    });

    const total_count = await this.prisma.article.count({
      where: {
        ...whereData,
      },
    });

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

  async findAll(args: Record<string, any>) {
    const row = this.configService.get('ARTICLE_PAGE_ROW');
    const page = args.page ? +args.page : 1;
    console.log(row, page);
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: +row,
    });

    const total = await this.prisma.article.count();

    return {
      meta: {
        current_page: page,
        current_row: +row,
        total,
        total_page: Math.ceil(total / row),
      },
      data: articles,
    };
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        category_id: +updateArticleDto.category_id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
