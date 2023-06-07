import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, Length } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(2, 10, { message: '账号不能小于2个字' })
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;
}
