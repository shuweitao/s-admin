import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty({ message: '请选择菜单类型' })
  type: string; // C:菜单 M:目录 A:按钮

  @IsNotEmpty({ message: '请选择父级菜单' })
  pid: number; // 父id

  @IsNotEmpty({ message: '标题不能为空' })
  name: string;

  @IsNotEmpty({ message: '请输入路由路径' })
  path: string;

  icon: string; // 菜单图标

  description: string; // 描述
  hidden: boolean; // 是否显示  Boolean
  status: number; // 状态 0:未启用 1:已启用
  sort: number; // 排序
}
