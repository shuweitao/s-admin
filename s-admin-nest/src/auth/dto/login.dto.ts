import { IsNotEmpty } from 'class-validator';
import { IsExistsRule } from '@/comnon/rules/is-exists.rule';

export default class LoginDto {
  @IsExistsRule('user', { message: '帐号不存在' })
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
