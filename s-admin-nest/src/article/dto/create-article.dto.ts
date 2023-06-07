import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '请选择栏目' })
  category_id: number;

  id: number;
  image: string;
  desc: string;
  author: string;
  click: number;
  sort: number;
  status: number;
  abstract: string;
}
