import { RoleModule } from './../role/role.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [RoleModule],
})
export class UserModule {}
