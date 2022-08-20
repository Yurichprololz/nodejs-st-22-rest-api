import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.strategy';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return this.authService.login(req.user.dataValues);
  }
}
