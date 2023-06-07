import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  description: string; // 描述
  status: number; // 状态 0:未启用 1:已启用
  permissions: number[];
  users: number[];
}
