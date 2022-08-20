import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/auth')
@UseGuards(AuthGuard('local'))
export class AuthController {
  @Post()
  async login(@Req() req) {
    return req.user;
  }
}
