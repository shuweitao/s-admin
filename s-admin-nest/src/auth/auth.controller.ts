import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import RegitserDto from "./dto/regitser.dto";
import LoginDto from "./dto/login.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  register(@Body() dto: RegitserDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

}
