import { IsNotEmpty, Length } from 'class-validator';
import { IsNotExistsRule } from '@/comnon/rules/is-not-exists.rule';
import { IsConfirm } from '@/comnon/rules/is-confirm.rule';

export default class RegitserDto {
  @IsNotExistsRule('user', { message: '用户已经注册' })
  @Length(2, 10, { message: '账号不能小于2个字' })
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @IsConfirm({ message: '两次密码不一致' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirm: string;
}
